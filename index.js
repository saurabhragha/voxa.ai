const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();
const app = express();
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send({ error: 'Message is required' });

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });
    res.send({ reply: completion.data.choices[0].message.content });
  } catch (err) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

app.get('/', (req, res) => {
  res.send('VOXA.ai is live!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));