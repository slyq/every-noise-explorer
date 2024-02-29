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

document.addEventListener('DOMContentLoaded', async function() {
  tab = await getCurrentTab();
  document.getElementById('play-from').addEventListener('click', playFrom);
  document.getElementById('stop').addEventListener('click', stop)
  chrome.storage.sync.get(["genreId"]).then(({ genreId }) => {
    if (genreId) document.getElementById("genreId").value = genreId
  })
})
