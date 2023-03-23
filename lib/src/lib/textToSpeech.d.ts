declare const textToSpeech: (text: string, voice_id: string, stability?: number, similarity_boost?: number, apiKey?: string) => Promise<Buffer>;
export default textToSpeech;
