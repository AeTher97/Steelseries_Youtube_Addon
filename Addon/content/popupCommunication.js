const receivedPopupRequest = (request, sender, sendResponse) => {
    if (request.action === QUERY) {
        sendResponse({
            engineAddress: engineAddress.replace('http://', ''),
            status: errorOccurreed ? ERROR : WORKING,
            error: errorMessage
        });
    } else if (request.action === CHANGE_URL) {
        checkIfEngineAvailable('http://' + request.engineAddress).then(() =>{
            clearIntervals();
            engineAddress = 'http://' + request.engineAddress;
            initAddon();
        }).catch( () =>{
            sendRequestToPopup({action: STATUS, status: ERROR, error: 'Invalid address, check it and make sure api finder is installed.'});
        })

    } else if(request.actions === REGISTER){
        broadcastPriority();
    } else {
        console.error('Unknown request type');
    }
}

const sendRequestToPopup = (request) => {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage(request, (response) => {
            resolve(response);
        })
    });
}

const clearErrors = () => {
    errorOccurreed = false;
    errorMessage = '';
    sendRequestToPopup({
        action: STATUS,
        status: WORKING
    })
}
