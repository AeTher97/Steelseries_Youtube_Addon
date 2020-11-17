let currentValue;
const statusDiv = document.getElementById('status');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    if (request.action === CHANGE_URL) {
        document.getElementById('url').value = request.engineAddress;
    } else if (request.action === STATUS) {
        if(request.status === ERROR){
            statusDiv.innerText = request.error;
            statusDiv.classList.remove('working');
            statusDiv.classList.add('error');
        } else {
            statusDiv.innerText = 'Working';
            statusDiv.classList.add('working');
            statusDiv.classList.remove('error');
        }
    } else {
        console.error('Unknown request type');
    }
});

document.addEventListener('DOMContentLoaded', () => {

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: QUERY}, (response) => {
            document.getElementById('url').value = response.engineAddress;
            if(response.status === ERROR){
                statusDiv.innerText = response.error;
                statusDiv.classList.remove('working');
                statusDiv.classList.add('error');
            } else {
                statusDiv.innerText = 'Working';
                statusDiv.classList.add('working');
                statusDiv.classList.remove('error');
            }
        });
    });

    console.log('registering')
    const button = document.getElementById('saveButton');
    button.addEventListener('click', () => {
        const newUrl = document.getElementById('url').value
        console.log(newUrl);
        currentValue = newUrl;
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: CHANGE_URL, engineAddress: newUrl});
        });
    }, false);
}, false);
