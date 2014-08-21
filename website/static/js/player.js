/**
 * Created by harveydf on 20/08/14.
 */

// Define the Player
var Player = function (config) {
    imgPlayer = new Image();
    imgPlayer.src = config.imgSrc;
    frames = config.frameSize;

    var spriteSheet = new createjs.SpriteSheet({
        images: [imgPlayer],
        frames: {width: frames.width, height: frames.height},
        animations: {
            down: [0, 3, 'down', 0.2],
            up: [4, 7, 'up', 0.2],
            left: [8, 11, 'left', 0.2],
            right: [12, 15, 'right', 0.2],
            stand: [0]
        }
    });

    this.sprite = new createjs.Sprite(spriteSheet, 'stand');
};

Player.prototype.startPlaying = function () {
    var self = this;
    createjs.Tween.get(this.sprite)
        .call(this.downAnimation)
        .to({x:0, y:50}, 2000)
        .call(function () {
            createjs.Tween.get(self.sprite)
                .call(self.rightAnimation)
                .to({x:100, y:50}, 2000)
                .call(self.stopAnimation);
        });
};

Player.prototype.stopAnimation = function () {
    this.gotoAndStop('stand');
};

Player.prototype.downAnimation = function () {
    this.gotoAndPlay('down');
};

Player.prototype.rightAnimation = function () {
    this.gotoAndPlay('right');
};

// export the module
module.exports = Player;
