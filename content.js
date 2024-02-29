chrome.runtime.onMessage.addListener((obj, sender, response) => {
  const { type, start } = obj
  if (type === "PLAY") {
    console.log("Playing from " + start)
    const genres = Array.from(document.getElementsByClassName("genre"))
      .sort((g1, g2) => g1.offsetTop - g2.offsetTop)
    genres.slice(start).forEach((g, i) => {
      setTimeout(() => {
        g.click();
        let genreId = start + i
        chrome.storage.sync.set({ genreId })
      }, i * 30000);
    });
  } else if (type === "STOP") {
    let id = window.setInterval(function() { }, Number.MAX_SAFE_INTEGER);
    for (let i = 1; i < id; i++) {
      window.clearInterval(i);
    }
  }
})

