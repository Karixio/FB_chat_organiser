let availableChats = [];

document.addEventListener('DOMContentLoaded', function() {
  onDetect();
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
      const chatParent = document.querySelector('.x1ey2m1c.x78zum5.x164qtfw.xixxii4.x1vjfegm');
      const chatParentConfig = { attributes: false, childList: true, subtree: false };

      const callback = function(mutationsList, observer) {
        for(const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            availableChats = [];
            document.querySelectorAll('.x1ey2m1c.x78zum5.x164qtfw.xixxii4.x1vjfegm>div[data-visualcompletion="ignore"]').forEach((chatWindow, index) => {
              chatWindow.setAttribute('data-chat-order', index);
              availableChats.push(chatWindow);
              console.log(availableChats);
            });
            chrome.runtime.sendMessage({message: 'changed'});
          }
        }
      };
      const observer = new MutationObserver(callback);
      observer.observe(chatParent, chatParentConfig);
    }
  });
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