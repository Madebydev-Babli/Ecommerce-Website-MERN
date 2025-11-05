import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "https://api.groq.com/openai/v1", // ⚡ free Groq proxy key (acts like OpenAI)
  baseURL: "https://api.groq.com/openai/v1"
});

const test = async () => {
  try {
    const response = await openai.chat.completions.create({
      model: "llama-3.1-70b-versatile",
      messages: [{ role: "user", content: "Say hello from OpenAI" }],
    });

    console.log(response.choices[0].message.content);
  } catch (err) {
    console.error(err);
  }
};

test();