let currentValue;
document.addEventListener('DOMContentLoaded',() => {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'query'},(response) => {
            const newUrl = document.getElementById('url').value = response;
        });
    });

    console.log('registering')
    const button = document.getElementById('saveButton');
    button.addEventListener('click',() => {
        const newUrl = document.getElementById('url').value
        console.log(newUrl);
        currentValue = newUrl;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {url: newUrl});
        });
    },false);
},false);
