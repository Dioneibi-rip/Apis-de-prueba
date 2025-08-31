import ytdl from "ytdl-core";

export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url || !ytdl.validateURL(url)) {
      return res.status(400).json({ status: false, error: "Invalid YouTube URL" });
    }

    res.setHeader("Content-Disposition", 'attachment; filename="audio.mp3"');
    res.setHeader("Content-Type", "audio/mpeg");

    ytdl(url, { filter: "audioonly", quality: "highestaudio" }).pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: "Download error" });
  }
}
