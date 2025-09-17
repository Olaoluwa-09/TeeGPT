// services/chatgpt.js
import { OPENAI_API_KEY } from '@env';

const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";

/**
 * askChatGPT(prompt, history)
 * - prompt: string (user message)
 * - history: array of { role: 'user'|'assistant', text: '...' }   (optional)
 *
 * Returns assistant reply string.
 */
export async function askChatGPT(prompt, history = []) {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY missing. Add it to your .env file.');
  }

  const messages = [
    { role: 'system', content: 'You are TeeGPT, a helpful assistant.' },
    // convert history to API format if given
    ...history.map(m => ({ role: m.role, content: m.text })),
    { role: 'user', content: prompt }
  ];

  const body = {
    model: 'gpt-3.5-turbo', // or 'gpt-4o-mini' if you have access
    messages,
    max_tokens: 400
  };

  const res = await fetch(OPENAI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI API error ${res.status}: ${txt}`);
  }

  const json = await res.json();
  // guard against structural differences
  const reply = json?.choices?.[0]?.message?.content;
  return (typeof reply === 'string') ? reply.trim() : JSON.stringify(json);
}
