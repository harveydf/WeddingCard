/**
 * Created by harveydf on 2/08/14.
 */

var stage, circle, imgBman, bman;
var KEY_DOWN = 40;
var KEY_UP = 38;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;

var init = function () {
    stage = new createjs.Stage('canvas');

    imgBman = new Image();
//    imgBman.onload = handleImageLoad;
//    imgBman.onerror = handleImageError;
    imgBman.src = '/static/img/bman.png';

    var spriteSheet = new createjs.SpriteSheet({
        images: [imgBman],
        frames: {width: 32, height: 48},
        animations: {
            down: [0, 3, 'down', 0.2],
            up: [4, 7, 'up', 0.2],
            left: [8, 11, 'left', 0.2],
            right: [12, 15, 'right', 0.2],
            stand: [0]
        }
    });

    bman = new createjs.Sprite(spriteSheet, 'stand');
    bman.bounds = bman.getBounds();
    bman.speed = 7;
    stage.addChild(bman);

    createjs.Ticker.on('tick', tick);
    createjs.Ticker.setFPS(30);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
};

var tick = function () {
    stage.update();
};

var handleKeyDown = function (e) {
    if (!e) { e = window.event; }
    switch (e.keyCode) {
        case KEY_DOWN:
            bman.y += bman.speed;
            bman.play();
            if (bman.y + bman.bounds.height > stage.canvas.height) { bman.y = stage.canvas.height - bman.bounds.height;}
            if (bman.currentAnimation != 'down') { bman.gotoAndPlay('down'); }
            break;

        case KEY_UP:
            bman.y -= bman.speed;
            bman.play();
            if (bman.y < 0) { bman.y = 0}
            if (bman.currentAnimation != 'up') { bman.gotoAndPlay('up'); }
            break;

        case KEY_LEFT:
            bman.x -= bman.speed;
            bman.play();
            if (bman.x < 0) { bman.x = 0; }
            if (bman.currentAnimation != 'left') { bman.gotoAndPlay('left'); }
            break;

        case KEY_RIGHT:
            bman.x += bman.speed;
            bman.play();
            if (bman.x + bman.bounds.width > stage.canvas.width) { bman.x = stage.canvas.width - bman.bounds.width; }
            if (bman.currentAnimation != 'right') { bman.gotoAndPlay('right'); }
            break;
    }
};

var handleKeyUp = function (e) {
    if (!e) { e = window.event; }
    switch (e.keyCode) {
        case KEY_DOWN:
        case KEY_UP:
        case KEY_LEFT:
        case KEY_RIGHT:
            bman.stop();
            break;
    }
};