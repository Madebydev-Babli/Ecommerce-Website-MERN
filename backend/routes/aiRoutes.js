const express = require('express');
const aiRouter = express.Router();
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

aiRouter.post('/generate-description', async (req, res) => {
  const { name, category, subCategory, sizes, bestSeller } = req.body;

  const prompt = `
    Write a detailed, catchy, and attractive ecommerce product description for:
    - Name: ${name}
    - Category: ${category}
    - Subcategory: ${subCategory}
    - Sizes available: ${sizes && sizes.length ? sizes.join(", ") : "Not specified"}
    ${bestSeller ? "- This is a best seller!" : ""}
    Keep it 2-3 sentences, friendly and persuasive.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });

    const description = response.choices[0].message.content;
    res.json({ description });
  } catch (err) {
    console.error("Groq AI error:", err);
    res.status(500).json({ error: `AI description error: ${err.message}` });
  }
});

module.exports = aiRouter;