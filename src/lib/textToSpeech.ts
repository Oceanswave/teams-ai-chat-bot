import axios from 'axios';

const textToSpeech = async (text: string, voice_id: string, stability: number = 0.25, similarity_boost: number = 1, apiKey?: string) => {
  if (!stability) {
    stability = 0.25;
  }

  if (!similarity_boost) {
    similarity_boost = 1;
  }
  
  try {
    const xiTextToSpeechUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`;
    const response = await axios({
      method: 'POST',
      url: xiTextToSpeechUrl,
      data: { 
        text,
        voice_settings: {
          stability,
          similarity_boost
        }
      },
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': apiKey || process.env.XI_API_KEY,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer' 
    });
    return Buffer.from(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default textToSpeech;
