import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Write the most engaging twitter thread.`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  try {
    const baseCompletion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${basePromptPrefix}${req.body.userInput}\n`,
      temperature: 0.7,
      max_tokens: 350,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
  } catch (error) {
    res.status(200).json({
      output: `Something bad happened! This is a test app so things can go wrong. Try again! <br> If this keeps repeating, it's highly probably I am ran out of the free tier of OpenAI API Key.`,
    });
  }
};

export default generateAction;
