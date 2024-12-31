let availableChats = [];

document.addEventListener('DOMContentLoaded', function() {
  const buttonDetectChats = document.getElementById('detectBtn');
  buttonDetectChats.addEventListener('click', onDetect);
  const buttonLeft = document.getElementById('btn');
  buttonLeft.addEventListener('click', goLeft);

  chrome.runtime.onMessage.addListener((request) => {
    console.log(request)
  });

});

const onDetect = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: () => {
      availableChats = [];
      document.querySelectorAll('.x1ey2m1c.x78zum5.x164qtfw.xixxii4.x1vjfegm>div[data-visualcompletion="ignore"]').forEach((chatWindow, index) => {
        chatWindow.setAttribute('data-chat-order', index);
        availableChats.push(chatWindow);
        console.log(availableChats);
      });
    }
  })
  chrome.tabs.sendMessage(tab.id, {availableChats: availableChats});
}

const goLeft = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: () => {
      document.querySelectorAll('.x1ey2m1c.x78zum5.x164qtfw.xixxii4.x1vjfegm>div[data-visualcompletion="ignore"]').forEach((chatWindow, index) => {
        chatWindow.setAttribute('data-chat-order', index);
        chatWindow.style.position = 'fixed';
        chatWindow.style.bottom = '0';
        chatWindow.style.left = '0';
      });
    }
  })
}