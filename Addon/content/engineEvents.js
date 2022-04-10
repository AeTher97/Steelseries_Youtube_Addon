let failedCount= 0;

const registerExtension = async (engineAddress) => {

    const response = await fetch(engineAddress, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game: addonData.name,
            game_display_name: addonData.displayName,
            developer: addonData.developer
        })
    })
    if (response.status !== 200) {
        throw new Error('Failed to bind event');
    }
    return response;
}

const checkIfEngineAvailable = (engineAddress) => {

    return fetch(`${engineAddress}/game_event`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game: addonData.name,
            event: 'SPLASH',
            data: {}
        })
    })
}


const registerPlayingEvent = async (engineAddress) => {

    const response = await fetch(engineAddress, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game: addonData.name,
            event: 'PLAYING',
            value_optional: true,
            handlers: [
                {
                    ['device-type']: 'screened',
                    zone: 'one',
                    mode: 'screen',
                    datas: [
                        {
                            lines: [
                                {
                                    ['has-text']: true,
                                    ['context-frame-key']: "textvalue"
                                },
                                {
                                    ['has-text']: true,
                                    ['context-frame-key']: "timevalue"
                                },
                                {
                                    ['context-frame-key']: "numericalvalue",
                                    ['has-progress-bar']: true
                                }
                            ]
                        }
                    ]
                }

            ]
        })
    })
    if (response.status !== 200) {
        throw new Error('Failed to bind event');
    }
    return response;
}

const registerPauseEvent = async (engineAddress) => {

    const response = await fetch(engineAddress, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game: addonData.name,
            event: 'PAUSED',
            value_optional: true,
            handlers: [
                {
                    ['device-type']: 'screened',
                    zone: 'one',
                    mode: 'screen',
                    datas: [
                        {
                            lines: [
                                {
                                    prefix: 'Paused - ',
                                    ['has-text']: true,
                                    ['context-frame-key']: "timevalue"
                                },
                                {
                                    ['has-text']: true,
                                    ['context-frame-key']: "textvalue"
                                },
                                {
                                    ['context-frame-key']: "numericalvalue",
                                    ['has-progress-bar']: true
                                }
                            ]
                        }
                    ]
                }

            ]
        })
    })
    if (response.status !== 200) {
        throw new Error('Failed to bind event');
    }
    return response;
}

const registerSplashEvent = async () => {

    const response = await fetch(`${engineAddress}/register_game_event`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game: addonData.name,
            event: 'SPLASH',
            value_optional: true
        })
    })

    if (response.status !== 200) {
        throw new Error('Failed to bind event');
    }
    return response;
}

const checkIfAppInstalled = () => {

    return new Promise((resolve) => {
        chrome.storage.local.get(["installationData"], function (items) {
            try {
                resolve(items.installationData.installed && items.installationData.version === addonData.version);
            } catch (e) {
                resolve(false);
            }
        })
    });
}

const registerAddon = async () => {
    const bindingAddress = `${engineAddress}/bind_game_event`;

    if (!await checkIfAppInstalled()) {
        console.log('App is not installed on the engine installing now')
        console.log('Registering game');
        await registerExtension(`${engineAddress}/game_metadata`);
        console.log('Game registered');
        console.log('Registering playing event');
        await registerPlayingEvent(bindingAddress);
        console.log('Playing event registered');
        console.log('Registering pause event');
        await registerPauseEvent(bindingAddress);
        console.log('Pause event registered');
        console.log('Registering splash event');
        await registerSplashEvent();
        console.log('Splash event registered');
        console.log('Saving version data');
        chrome.storage.local.set({"installationData": {installed: true, version: addonData.version}});
        console.log('Binding events successful')
    } else {
        console.log('App is installed on the engine, skipping')
    }

}


const displaySplash = () => {
    if(failedCount>=5){
        connectionToEngineLost();
    }
    fetch(`${engineAddress}/game_event`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game: addonData.name,
            event: 'SPLASH',
            data: {
                frame: {
                    ['image-data-128x36']: splashScreenImage128x36,
                    ['image-data-128x40']: splashScreenImage128x40,
                    ['image-data-128x48']: splashScreenImage128x48,
                    ['image-data-128x52']: splashScreenImage128x52,
                }
            }
        })
    }).then(() =>{
        failedCount=0;
    }).catch(e => {
        failedCount++;
    })
}

const displayPlay = (title, time, progress) => {
    if(failedCount>=5){
        connectionToEngineLost();
    }
    fetch(`${engineAddress}/game_event`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game: addonData.name,
            event: 'PLAYING',
            data: {
                frame: {
                    timevalue: time,
                    textvalue: title,
                    numericalvalue: progress
                }
            }
        })
    }).then(() =>{
        failedCount=0;
    }).catch(e => {
        failedCount++;
    })
}

const displayPause = (title, time, progress) => {
    if(failedCount>=5){
        connectionToEngineLost();
    }
    fetch(`${engineAddress}/game_event`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game: addonData.name,
            event: 'PAUSED',
            data: {
                frame: {
                    textvalue: time,
                    timevalue: title,
                    numericalvalue: progress
                }
            }
        })
    }).then(() =>{
        failedCount=0;
    }).catch(e => {
        failedCount++;
    })
}

const sendHearthBeat = () => {
    if(failedCount>=5){
        connectionToEngineLost();
    }
    fetch(`${engineAddress}/game_heartbeat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game: addonData.name
        })
    }).then(() =>{
        failedCount=0;
    }).catch(e => {
        failedCount++;
    })
}
