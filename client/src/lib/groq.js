import axios from 'axios';

export async function groqChat({ prompt, model, temperature = 0.4, maxTokens = 400, signal }) {
  const apiKey = import.meta.env.VITE_GROQ_API;
  if (!apiKey) throw new Error('Missing VITE_GROQ_API in .env');

  const allowed = new Set(['mixtral-8x7b-32768','openai/gpt-oss-20b','openai/gpt-oss-20b','gemma2-9b-it']);
  const envModel = import.meta.env.VITE_GROQ_MODEL;
  const chosenModel = model || (allowed.has(envModel) ? envModel : 'openai/gpt-oss-20b');
  try {
    const res = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: chosenModel,
        messages: [
          { role: 'system', content: 'Return ONLY strict JSON. No prose, no markdown fences.' },
          { role: 'user', content: prompt },
        ],
        temperature,
        max_tokens: maxTokens,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        signal,
      }
    );

    const content = res.data?.choices?.[0]?.message?.content || '';
    return content.replace(/```json|```/g, '').trim();
  } catch (err) {
    const msg = err?.response?.data?.error?.message || err.message || 'Groq request failed';
    if (/decommissioned|not found|unsupported/i.test(msg) && chosenModel !== 'mixtral-8x7b-32768') {
      return await groqChat({ prompt, model: 'mixtral-8x7b-32768', temperature, maxTokens, signal });
    }
    throw new Error(msg);
  }
}