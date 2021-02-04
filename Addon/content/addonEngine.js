let hearthBeatInterval;
let mainLoopInterval;
let inactivityTime;
let setupSuccess = false;
let unloadListener;

const broadcastChannel = new BroadcastChannel('yt_music_addon_channel');
broadcastChannel.onmessage = (message) => {
    if (message.data.action === REGISTER) {
        console.log("New tab registered. Shutting down extension!")
        clearIntervals();
        clearListeners();
    }
}

const broadcastPriority = () => {
    broadcastChannel.postMessage({action: REGISTER});
}

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
    unloadListener = window.addEventListener("beforeunload", () => {
        displaySplash();
        clearIntervals();
    });
}

const clearListeners = () => {
    window.removeEventListener("beforeunload", unloadListener);
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
            sendRequestToPopup({action: CHANGE_URL, engineAddress: engineAddress.replace('http://', '')});
            console.log("Notifying other tabs")
            broadcastPriority();

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
        sendRequestToPopup({
            action: STATUS,
            status: ERROR,
            error: 'Error while communicating with api finder, make sure it\'s installed'
        })
    })
}


chrome.runtime.onMessage.addListener(receivedPopupRequest);

startAddon();
