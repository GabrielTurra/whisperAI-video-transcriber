import { pipeline, env } from "@xenova/transformers";

env.allowLocalModels = false;
env.useBrowserCache = false;

export const transcribeAudio = async () => {
    const options = {
        chunk_length_s: 30, 
        stride_length_s: 5,
        language: "portuguese", 
        task: "transcribe",
        return_timestamps: true
    };

    try {
        console.time();
        console.log("[START_TRANSCRIBE]");

        const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small');
        const data = await transcriber("../audio.mp3", options);

        return data;
    } catch(err) {
        console.log("[ERROR_TRANSCRIBE]", err);
        throw new Error(err);
    } finally {
        console.timeEnd();
        console.log("[FINISH_TRANSCRIBE]");
    }
}