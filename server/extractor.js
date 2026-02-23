import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function extractJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

export async function extractFinancials(text) {
  const prompt = `
Extract income statement data.

Return ONLY JSON:
{
  "revenue": number or null,
  "operating_expenses": number or null,
  "net_income": number or null,
  "currency": string,
  "year": string
}

TEXT:
${text.slice(0, 10000)}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  return extractJSON(response.choices[0].message.content);
}