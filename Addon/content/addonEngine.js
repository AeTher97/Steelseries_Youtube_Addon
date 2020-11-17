let hearthBeatInterval;
let mainLoopInterval;
let inactivityTime;
let setupSuccess = false;

const mainLoop = () => {
    collectData();

    if (performer.shouldMove) {
        moveText(performer, performerMaxWidth);
    }
    if (song.shouldMove) {
        moveText(song, titleMaxWidth);
    }
    if (song.name) {
        if (isPlaying()) {
            displayPlay(song.displayText, `${currentTime}/${length} ${performer.displayText}`, progress);
        } else {
            displayPause(song.displayText, `${currentTime}/${length} ${performer.displayText}`, progress);
        }
    } else {
        inactivityTime += 1;
        if (inactivityTime === 15) {
            displaySplash();
            inactivityTime = 0;
        }
    }
}

const registerIntervals = () => {
    hearthBeatInterval = setInterval(sendHearthBeat, 10000)
    mainLoopInterval = setInterval(mainLoop, 500)
}

const clearIntervals = () => {
    clearInterval(hearthBeatInterval);
    clearInterval(mainLoopInterval);
}

const registerListeners = () => {
    window.addEventListener("beforeunload", () => {
        displaySplash();
        clearIntervals();
    });


}


const initAddon = () => {
    registerAddon().then(() => {
        console.log('Setup complete');
        console.log("Initializing components");
        setupSuccess = true;
        displaySplash();
        registerListeners();
        registerIntervals();
        sendRequestToPopup({action: STATUS, status: WORKING});
        console.log('Addon started!')
        clearErrors();
    }).catch(e => {
        console.log(e.message);
    });


}

const startAddon = () => {
    console.log(`Starting addon on ${isYouTubeMusic() ? 'You Tube Music' : 'YouTube'}`);
    getEngineAddress().then(response => {
        if (response.address) {
            console.log('Steelseries Engine found on ' + response.address + ' Starting Steelseries Youtube addon')
            engineAddress = 'http://' + response.address;
            sendRequestToPopup({action: CHANGE_URL, engineAddress: engineAddress.replace('http://','')});
            initAddon();
        } else {
            errorMessage = 'Engine api error, stopping addon';
            errorOccurreed = true;
            sendRequestToPopup({action: STATUS, status: ERROR, error: errorMessage})
            console.error('Engine api error, stopping addon')
        }
    }).catch(e => {
        console.error('Error ' + e.message + ' engine api helper error, stopping addon');
        errorMessage = 'Error while communicating with api finder, make sure it\'s installed';
        errorOccurreed = true;
        sendRequestToPopup({action: STATUS, status: ERROR, error: 'Error while communicating with api finder, make sure it\'s installed'})
    })
}


chrome.runtime.onMessage.addListener(receivedPopupRequest);

startAddon();
