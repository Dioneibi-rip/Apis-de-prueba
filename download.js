import ytdl from "ytdl-core";

export default async function handler(req, res) {
  try {
    const { key, url } = req.query;

    if (key !== "api") {
      return res.status(403).json({ status: false, error: "Invalid API key" });
    }
    if (!url || !ytdl.validateURL(url)) {
      return res.status(400).json({ status: false, error: "Invalid YouTube URL" });
    }

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;

    // link de descarga en tu mismo dominio
    const downloadUrl = `/api/stream?url=${encodeURIComponent(url)}`;

    res.json({
      status: true,
      title,
      format: "mp3",
      download: downloadUrl
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: "Internal server error" });
  }
}
