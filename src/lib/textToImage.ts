async function textToImage(text: string): Promise<Buffer[]> {
  const engineId = 'stable-diffusion-v1-5'
  const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
  const apiKey = process.env.STABILITY_API_KEY

  if (!apiKey) throw new Error('Missing Stability API key.')

  const response = await fetch(
    `${apiHost}/v1/generation/${engineId}/text-to-image`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text,
          },
        ],
        cfg_scale: 7,
        
        sampler: "K_DPMPP_2M",
        height: 512,
        width: 512,
        samples: 1,
        steps: 25,
      }),
    }
  )
  
  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`)
  }

  const responseJSON = (await response.json()) as GenerationResponse
  
  const result: Buffer[] = [];
  responseJSON.artifacts.forEach((image, index) => {
    result.push(Buffer.from(image.base64, 'base64'))
  });

  return result;
}

export default textToImage;

interface GenerationResponse {
  artifacts: Array<{
    base64: string
    seed: number
    finishReason: string
  }>
}
