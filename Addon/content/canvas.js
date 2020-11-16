const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.id = "my-canvas";
canvas.width = 128;
canvas.height = 40;
ctx.font = "10px Roboto";
canvas.style.top = '0px';
canvas.style.position = "absolute";
canvas.style.zIndex = 999;
document.body.appendChild(canvas);

const clearCanvas = () => {
    ctx.clearRect(0, 0, 128, 40);
}

const measureText = (text) => {
    return ctx.measureText(text).width;
}

const shouldTextMove = (object, maxWidth) => {
    object.shouldMove = ctx.measureText(object.name).width > maxWidth;
    object.width = measureText(object.name);
}

const incrementStillTimer = (object) =>{
    if (object.isStill) {
        object.currentStillTime += 1;
    }
}

const startMovement = (object) =>{
    if (!object.moved && object.currentStillTime > howLongToBeStill) {
        object.isStill = false;
    }
}

const moveTextIfMoving = (object) => {
    if (!object.moved && !object.isStill) {
        object.displayText = object.displayText.substring(1);
    }
}

const stopTextIfShortEnough = (object, width, maxWidth) => {
    if (width < maxWidth) {
        object.isStill = true;
        object.moved = true;
    }
}

const resetMovement = (object) =>{
    if (object.moved && object.currentStillTime > 3 * howLongToBeStill) {
        object.isStill = true;
        object.moved = false;
        object.currentStillTime = 0;
        object.displayText = object.name;
    }
}

const moveText = (object, maxWidth) => {
    const width = ctx.measureText(object.displayText).width;

    incrementStillTimer(object);
    startMovement(object);
    moveTextIfMoving(object);
    stopTextIfShortEnough(object,width,maxWidth);
    resetMovement(object);

}
