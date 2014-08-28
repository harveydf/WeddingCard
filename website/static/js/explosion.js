/**
 * Created by harveydf on 27/08/14.
 */

var Explosion = function () {
    imgExplosion = new Image();
    imgExplosion.src = '/static/img/bomb.png';
    frames = {width: 37, height: 36};

    var spriteSheet = new createjs.SpriteSheet({
        images: [imgExplosion],
        frames: frames,
        animations: {
            center: {
                frames: [8, 9, 10, 11, 12, 11, 10, 9, 8],
                speed: 0.3
            },
            upMiddle: {
                frames: [32, 33, 34, 35, 36, 35, 34, 33, 32],
                speed: 0.3
            },
            upEnd: {
                frames: [16, 17, 18, 19, 20, 19, 18, 17, 16],
                speed: 0.3
            }
        }
    });

    this.sprite = new createjs.Sprite(spriteSheet);
    this.sprite.width = frames.width;
    this.sprite.height = frames.height;
};

Explosion.prototype.centerAnimation = function () {
    this.sprite.gotoAndPlay('center');
};

Explosion.prototype.upMiddleAnimation = function () {
    this.sprite.gotoAndPlay('upMiddle');
};

Explosion.prototype.upEndAnimation = function () {
    this.sprite.gotoAndPlay('upEnd');
};

module.exports = Explosion;