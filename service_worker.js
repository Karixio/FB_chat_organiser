document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('btn');
  button.addEventListener('click', onClick);
});

const onClick = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: () => {
      document.querySelectorAll('.x1ey2m1c.x78zum5.x164qtfw.xixxii4.x1vjfegm>div[data-visualcompletion="ignore"]').forEach((elem, index) => {
        elem.setAttribute('data-chat-order', index);
        elem.style.position = 'fixed';
        if(index === 0) {
          elem.style.left = '0';
          elem.style.bottom = '0';
        }
        console.log(elem);
      });
    }
  })
}