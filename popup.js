let tab;

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function playFrom() {
  let start = document.getElementById("genreId").value
  start = parseInt(start)
  chrome.tabs.sendMessage(tab.id, {
    type: "PLAY",
    start
  })
}

function stop() {
  chrome.tabs.sendMessage(tab.id, {
    type: "STOP"
  })
}

chrome.runtime.onMessage.addListener((obj, sender, response) => {
  if (obj.type === "CURRENT") {
    const { genre, song, genreId } = obj;
    document.getElementById('genre').innerText = "Genre: " + genre;
    document.getElementById('song').innerText = "Song: " + song;
    document.getElementById('genreId').value = genreId;
  }
})

document.addEventListener('DOMContentLoaded', async function() {
  tab = await getCurrentTab();
  document.getElementById('play-from').addEventListener('click', playFrom);
  document.getElementById('stop').addEventListener('click', stop)
  chrome.storage.sync.get(["genre", "song", "genreId"]).then(({ genre, song, genreId }) => {
    if (genre) document.getElementById('genre').innerText = "Genre: " + genre;
    if (song) document.getElementById('song').innerText = "Song: " + song;
    if (genreId) document.getElementById("genreId").value = genreId
  })
})
