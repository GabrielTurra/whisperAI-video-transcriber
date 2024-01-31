import ytdl from "ytdl-core";
import fs from "fs";

export const downloader = (videoId) => new Promise((resolve, reject) => {
    const videoUrl = `https://youtube.com/watch?v=${videoId}`; 
    console.log(`[START_DOWNLOAD_VIDEO]: ${videoUrl}`);

    ytdl(videoUrl, {
        quality: "lowestaudio",
        filter: "audioonly"
    })
    .on("end", () => {
        console.log(`[FINISH_DOWNLOAD_VIDEO]`);
        resolve();
    })
    .on("error", (err) => {
        console.log(`[ERROR_DOWNLOAD_VIDEO]: ${err}`);
        reject(err);
    })
    .pipe(fs.createWriteStream("video.mp4"));
});