export default async function handler(req, res) {
  // CORSの設定（自分のサイトからのアクセスを許可）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const targetUrl = "https://youtube138.p.rapidapi.com/channel/videos/";

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'youtube138.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPID_API_KEY // Vercelの管理画面で設定
      },
      body: JSON.stringify({
        id: "UCJ5v_MCY6GNUBTO8-D3XoAg", // チャンネルID
        filter: "videos_latest",
        hl: "en",
        gl: "US"
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
