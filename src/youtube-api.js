const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.YTPlayer = null;

export const loadYoutubeVideo = (videoId) => {
    return new Promise((resolve, reject) => {
        window.YTPlayer = new YT.Player("youtubeVideo", {
            videoId,
            host: "https://www.youtube.com",
            events: {
                "onReady": () => resolve(),
                "onError": () => reject(),
            }
        });
    });
}

export const getYoutubeVideoIdFromUrl = (url) => {
    const [_, urlParams] = url.split("?v=");
    const [videoId, __] = urlParams.split("&");

    return videoId;
} 