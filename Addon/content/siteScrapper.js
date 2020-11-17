const performer = {}
const song = {}
let currentTime;
let length;
let progress;

const isYouTubeMusic = () => {
    return window.location.href.includes('music.youtube.com')
}

const resetData = (dataHolder) => {
    dataHolder.currentStillTime = 0;
    dataHolder.divider = 0;
    dataHolder.moved = false;
    dataHolder.isStill = true;
}

function collectYouTubeMusicData() {
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

const collectYouTubeData = () => {
    let foundTitle = document.querySelector("#container > h1 > yt-formatted-string");
    let foundPerformerObj = document.querySelector("#text > a");
    if (foundPerformerObj !== null) {
        let foundPerformer = foundPerformerObj.innerText;
        if (foundPerformer !== performer.name) {
            console.log("New performer");
            resetData(performer);
            performer.name = foundPerformer;
            performer.displayText = foundPerformer;
            shouldTextMove(performer, performerMaxWidth);

        }
    }
    if (foundTitle.innerText !== song.name && foundTitle.innerText !== '') {
        console.log("New song");
        resetData(song)

        song.name = foundTitle.innerText;
        song.displayText = foundTitle.innerText;
        console.log("Now playing " + song.name + " by " + performer.name);
        shouldTextMove(song, titleMaxWidth);
    }


    let currentSeconds = Math.ceil(document.querySelector('video').currentTime);
    let minutes = ~~((currentSeconds % 3600) / 60);
    let secs = ~~currentSeconds % 60;
    currentTime = minutes + ':' + (secs < 10 ? "0" : "") + secs;
    let durationObject = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate > span.ytp-time-duration")
    length = durationObject.innerText;


    if (currentTime && length) {
        let up = parseInt(currentTime.split(":")[0]) * 60 + parseInt(currentTime.split(":")[1]);
        let down = parseInt(length.split(":")[0]) * 60 + parseInt(length.split(":")[1]);
        progress = Math.floor(up / down * 100);
    }

}

const collectData = () => {
    if (isYouTubeMusic()) {
        collectYouTubeMusicData();
    } else {
        collectYouTubeData();
    }
}

const isPlaying = () => {
    if(isYouTubeMusic()) {
        try {
            const playButtonAttribute = document.getElementsByClassName('play-pause-button').valueOf()[0].children[0].children[0].children[0].children[0].getAttribute('d');
            const playingAttribute = ('M6 19h4V5H6v14zm8-14v14h4V5h-4z');
            return playingAttribute === playButtonAttribute;

        } catch (e) {
            return false;
        }
    } else {
        const playButtonAttribute = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button");
        return playButtonAttribute.children[0].children[1].valueOf().getAttribute('d') === 'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z';
    }

}
