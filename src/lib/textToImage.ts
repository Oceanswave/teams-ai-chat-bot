import { Configuration, OpenAIApi } from "openai";

async function textToImage(text: string): Promise<string[]> {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createImage({
    prompt: text,
    n: 1,
    size: '1024x1024',
  });
  
  if (response.status !== 200) {
    throw new Error(`Non-200 response: ${response.statusText}`)
  }

  const result: string[] = [];
  response.data.data.forEach((image, index) => {
    result.push(image.url)
  });

  return result;
}

export default textToImage;
