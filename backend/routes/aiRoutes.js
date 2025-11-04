const express = require('express');
const aiRouter = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
    const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const description = response.text();

    res.json({ description });
  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).json({ error: `AI description error ${err.message}` });
  }
});

module.exports = aiRouter;
