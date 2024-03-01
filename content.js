let current;
let playState = false;
const genres = Array.from(document.getElementsByClassName("genre"))
  .sort((g1, g2) => g1.offsetTop - g2.offsetTop)

chrome.runtime.onMessage.addListener((obj, sender, response) => {
  const { type } = obj
  if (type === "PLAY") {
    const { start } = obj
    if (!playState || start !== current) {
      playState = true;
      console.log("Playing from " + start)
      genres.slice(start).forEach((g, i) => {
        setTimeout(() => {
          current = start + i
          const info = {
            genre: g.innerText,
            song: g.title.slice(5),
            genreId: current
          }
          g.click();
          chrome.storage.sync.set(info)
          chrome.runtime.sendMessage({
            type: "CURRENT",
            ...info
          })
        }, i * 30000);
      });
    }
  } else if (type === "STOP") {
    if (playState) {
      genres[current].click()
      playState = false;
      let id = window.setInterval(function() { }, Number.MAX_SAFE_INTEGER);
      for (let i = 1; i < id; i++) {
        window.clearInterval(i);
      }
    }
  }
})
