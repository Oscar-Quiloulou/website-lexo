// /src/core/api.js

const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = "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";

export async function askAI(prompt) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    if (!res.ok) {
      console.error("Erreur API:", await res.text());
      return "Erreur IA.";
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "Erreur IA.";
  } catch (e) {
    console.error(e);
    return "Erreur de connexion à l’IA.";
  }
}
