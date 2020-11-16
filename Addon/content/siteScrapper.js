const performer = {}
const song = {}
let currentTime;
let length;
let progress;

const resetData = (dataHolder) => {
    dataHolder.currentStillTime = 0;
    dataHolder.divider = 0;
    dataHolder.moved = false;
    dataHolder.isStill = true;
}

function collectData() {
    let foundTitle = document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > yt-formatted-string");
    let foundPerformerObj = document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string:nth-child(1)");
    if (foundPerformerObj !== null) {
        let foundPerformer = foundPerformerObj;
        foundPerformer = foundPerformer.title.split("•")[0];
        if (foundPerformer !== performer.name) {
            console.log("New performer");
            resetData(performer);
            performer.name = foundPerformer;
            performer.displayText = foundPerformer;
            shouldTextMove(performer, performerMaxWidth);

        }
    }
    if (foundTitle.title !== song.name && foundTitle.title !== '') {
        console.log("New song");
        resetData(song)

        song.name = foundTitle.title;
        song.displayText = foundTitle.title;
        console.log("Now playing " + song.name + " by " + performer.name);
        shouldTextMove(song, titleMaxWidth);
    }


    let foundTime = document.querySelector("#left-controls > span");
    currentTime = foundTime.innerText.split("/")[0].trim();
    if (foundTime.innerText.split("/")[1] !== undefined) {
        length = foundTime.innerText.split("/")[1].trim();
    }

    if (currentTime && length) {
        let up = parseInt(currentTime.split(":")[0]) * 60 + parseInt(currentTime.split(":")[1]);
        let down = parseInt(length.split(":")[0]) * 60 + parseInt(length.split(":")[1]);
        progress = Math.floor(up / down * 100);
    }

}

const isPlaying = () => {
    try {
        const playButtonAttribute = document.getElementsByClassName('play-pause-button').valueOf()[0].children[0].children[0].children[0].children[0].getAttribute('d');
        const playingAttribute = ('M6 19h4V5H6v14zm8-14v14h4V5h-4z');

        return playingAttribute === playButtonAttribute;
    } catch (e) {
        return false;
    }

}
