import ffmpegStatic from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";

export const createMP3 = () => new Promise((resolve, reject) => {
    console.log('[START_AUDIO_CONVERSION]');
    ffmpeg.setFfmpegPath(ffmpegStatic);

    ffmpeg()
        .input('video.mp4')
        .outputOptions('-ab', '20k')
        .saveToFile('audio.mp3')
        .on('end', () => {
            console.log('[FINISH_AUDIO_CONVERSION]');
            resolve();
        })
        .on('error', (err) => {
            console.log(`[ERROR_AUDIO_CONVERSION]: ${err}`);
            reject(err);
        });
});