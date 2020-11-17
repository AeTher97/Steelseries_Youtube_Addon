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
        console.log('Addon started!')
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
            initAddon();
        } else {
            console.error('Engine api error, stopping addon')
        }
    }).catch(e => {
        console.error('Error ' + e.message + ' engine api helper error, stopping addon');
    })
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === 'query') {
            sendResponse(engineAddress.replace('http://', ''));
            return;
        }
        engineAddress = 'http://' + request.url;
        if (!setupSuccess) {
            initAddon();
        }
    });

startAddon();
