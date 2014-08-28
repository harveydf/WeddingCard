/**
 * Created by harveydf on 22/08/14.
 */

var Explosion = require('./explosion');

var Bomb = function (config) {
    imgBomb = new Image();
    imgBomb.src = '/static/img/bomb.png';
    frames = {width: 37, height: 37};
    
    this.spriteSheet = new createjs.SpriteSheet({
        images: [imgBomb],
        frames: {width:frames.width, height: frames.height},
        animations: {
            load: [0, 3, 'load', 0.15]
        }
    });
    
    this.sprite = new createjs.Sprite(this.spriteSheet);
    this.sprite.width = frames.width;
    this.sprite.height = frames.height;
};

Bomb.prototype.loadAnimation = function () {
    this.gotoAndPlay('load');
};

Bomb.prototype.explodeBomb = function (bombPosition, size, directions) {
    var explodeCenter = new Explosion();

    explodeCenter.sprite.x = bombPosition.x;
    explodeCenter.sprite.y = bombPosition.y;
    stage.addChild(explodeCenter.sprite);

    if (directions.indexOf('up') >= 0) {
        var explodeUpMiddle = new Explosion();

        explodeUpMiddle.sprite.x = explodeCenter.sprite.x;
        explodeUpMiddle.sprite.y = explodeCenter.sprite.y - explodeUpMiddle.sprite.height;

        var explodeUpEnd = new Explosion();

        explodeUpEnd.sprite.x = explodeUpMiddle.sprite.x;
        explodeUpEnd.sprite.y = explodeUpMiddle.sprite.y - explodeUpEnd.sprite.height;

        stage.addChild(explodeUpMiddle.sprite);
        stage.addChild(explodeUpEnd.sprite);

        explodeUpMiddle.upMiddleAnimation();
        explodeUpEnd.upEndAnimation();

    }

    explodeCenter.centerAnimation();

    createjs.Tween.get(this)
        .wait(1000)
        .call(explosionOver);

    function explosionOver () {
        stage.removeChild(explodeCenter.sprite, explodeUpMiddle.sprite, explodeUpEnd.sprite);
    }
};

Bomb.prototype.removeBomb = function () {
    stage.removeChild(this);
};

module.exports = Bomb;
