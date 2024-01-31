const renderChunk = ({ timestamp, text }) => `
    <div class="chunk flex">
        <time class="flex">${getMinutes(timestamp)}</time>
        <p>${separateTextGroups(text, timestamp)}</p>
    </div>`;


window.seek = function(e) {
    const seekTo = e.currentTarget.dataset.seekTo;

    window.YTPlayer.seekTo(seekTo);
    window.YTPlayer.playVideo();
}

const getMinutes = (timestamp) => {
    let date = new Date(null);
    date.setTime(timestamp[0] * 1000);

    return date.toISOString().slice(14, 19);
}

const separateTextGroups = (text, timestamp) => {
    const words = text.split(" ")

    const groups = []
    for(let idx = 0; idx < words.length; idx++) {
      if(idx % 3 === 0) {
        groups.push(words.slice(idx, idx + 3).join(" "));
      }
    }
  
    return groups.map((item, idx) => {
      const [initialTime, finalTime] = timestamp;

      const seekTo = idx == 0 
        ? initialTime 
        : (((finalTime - initialTime) / (groups.length - idx)) + initialTime);

        console.log(seekTo);
  
      return `<span onclick=seek(event) data-seek-to=${seekTo}>${item} </span>`
    }).join("");
}


export const renderTranscription = ({ chunks }) => {
    const formattedTranscription = chunks.map(renderChunk).join("");
    console.log(formattedTranscription)
    document.querySelector(".transcription .content").innerHTML = formattedTranscription;
}