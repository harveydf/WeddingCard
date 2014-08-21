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
//            createjs.Tween.get(self.sprite)
//                .call(self.rightAnimation)
//                .to({x:100, y:50}, 2000)
//                .call(self.stopAnimation);
};

Player.prototype.stopAnimation = function () {
    this.sprite.gotoAndStop('stand');
};

Player.prototype.moveTo = function (position, callback) {
    var self = this;

    createjs.Tween.get(this.sprite)
        .to({x: position.x, y: position.y}, 2000)
        .call(end);

    function end() {
        self.stopAnimation();
        callback();
    }
};

Player.prototype.downAnimation = function (position, callback)  {
    this.sprite.gotoAndPlay('down');

    this.moveTo(position, function () {
        callback();
    });
};

Player.prototype.rightAnimation = function (position, callback) {
    this.sprite.gotoAndPlay('right');

    this.moveTo(position, function () {
        callback();
    });
};

// export the module
module.exports = Player;
