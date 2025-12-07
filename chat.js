export default async function handler(req, res) {
  try {
    const { prompt } = JSON.parse(req.body);

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "API KEY missing in Vercel" });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: "You are an advanced AI assistant." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "No response."
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
