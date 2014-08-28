/**
 * Created by harveydf on 20/08/14.
 */

var Bomb = require('./bomb');

// Define the Player
var Player = function (config) {
    imgPlayer = new Image();
    imgPlayer.src = config.imgSrc;
    frames = config.frameSize;

    var spriteSheet = new createjs.SpriteSheet({
        images: [imgPlayer],
        frames: {width: frames.width, height: frames.height},
        animations: {
            up: [0, 2, 'up', 0.2],
            left: [3, 5, 'left', 0.2],
            down: [6, 8, 'down', 0.2],
            right: [9, 11, 'right', 0.2],
            stand: [7]
        }
    });

    this.sprite = new createjs.Sprite(spriteSheet, 'stand');
    this.sprite.x = 0;
    this.sprite.y = 0;
    this.sprite.width = frames.width;
    this.sprite.height = frames.height;
};

Player.prototype.stopAnimation = function () {
    this.gotoAndStop();
};

Player.prototype.downAnimation = function ()  {
    this.gotoAndPlay('down');
};

Player.prototype.upAnimation = function () {
    this.gotoAndPlay('up');
};

Player.prototype.rightAnimation = function () {
    this.gotoAndPlay('right');
};

Player.prototype.setBomb = function (size, directions) {
    var bomb = new Bomb();

    bomb.sprite.x = this.x;
    bomb.sprite.y = (this.y + this.height) - bomb.sprite.height;

    stage.addChild(bomb.sprite);
    stage.setChildIndex(bomb.sprite, 0);

    createjs.Tween.get(bomb.sprite)
        .call(bomb.loadAnimation)
        .wait(2500)
        .call(bomb.removeBomb)
        .call(bomb.explodeBomb, [
            {x: bomb.sprite.x, y: bomb.sprite.y},
            size,
            directions
        ]);
};

// export the module
module.exports = Player;
