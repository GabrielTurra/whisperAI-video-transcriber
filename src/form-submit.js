import axios from "axios";
import { startLoading, stopLoading, setLoadMessage } from "./loading";

import { getYoutubeVideoIdFromUrl, loadYoutubeVideo } from './youtube-api';
import { transcribeAudio } from "./transcribe.js";
import { renderTranscription } from "./render.js";

const form = document.querySelector("#form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    try {
        startLoading();
        setLoadMessage("Iniciando a aplicação...");

        const formData = new FormData(form);
        const url = formData.get("url");

        const videoId = getYoutubeVideoIdFromUrl(url);

        setLoadMessage("Carregando vídeo do Youtube...");
        await loadYoutubeVideo(videoId);

        setLoadMessage("Baixando e convertendo o vídeo...");
        await axios.get(`http://localhost:3333/audio?v=${videoId}`);
        
        setLoadMessage("Transcrevendo o áudio...");
        const audioData = await transcribeAudio();

        renderTranscription(audioData);
    }
    catch(err) {
        console.log(`[SUBMIT ERROR]: ${err}`);
    } finally {
        stopLoading();
    }
});