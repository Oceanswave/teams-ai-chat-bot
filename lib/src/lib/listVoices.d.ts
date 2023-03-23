/// <reference types="node" />
declare const textToSpeech: (text: string, voice_id: string, apiKey?: string) => Promise<Buffer>;
export default textToSpeech;
