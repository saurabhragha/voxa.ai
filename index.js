const express = require("express");
const OpenAI = require("openai");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    const botReply = response.choices[0].message.content;
    res.json({ reply: botReply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to VOXA.ai chatbot!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
