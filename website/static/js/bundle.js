(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/harveydf/PycharmProjects/WeddingCard/website/static/js/bomb.js":[function(require,module,exports){
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

},{"./explosion":"/Users/harveydf/PycharmProjects/WeddingCard/website/static/js/explosion.js"}],"/Users/harveydf/PycharmProjects/WeddingCard/website/static/js/explosion.js":[function(require,module,exports){
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
},{}],"/Users/harveydf/PycharmProjects/WeddingCard/website/static/js/main.js":[function(require,module,exports){
/**
 * Created by harveydf on 2/08/14.
 */

var Player = require('./player'),
    Stage  = require('./stage');

$( document ).ready(function (){
    window.stage = new Stage('canvas');
    var bman = new Player({
        'imgSrc': '/static/img/bman.png',
        'frameSize': {
            'width': 41,
            'height': 62
        }
    });

    stage.addChild(bman.sprite);
    stage.setChildIndex(bman.sprite, 1);
    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.setFPS(30);

    createjs.Tween.get(bman.sprite)
        .call(bman.downAnimation)
        .to({y: 100}, 1000)
        .call(bman.stopAnimation)
        .call(bman.setBomb, [1, ['up']])
        .wait(500)
        .call(bman.upAnimation)
        .to({y: 0}, 1000)
        .call(bman.rightAnimation)
        .to({x: 100}, 1000)
        .call(bman.stopAnimation);
});

},{"./player":"/Users/harveydf/PycharmProjects/WeddingCard/website/static/js/player.js","./stage":"/Users/harveydf/PycharmProjects/WeddingCard/website/static/js/stage.js"}],"/Users/harveydf/PycharmProjects/WeddingCard/website/static/js/player.js":[function(require,module,exports){
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

},{"./bomb":"/Users/harveydf/PycharmProjects/WeddingCard/website/static/js/bomb.js"}],"/Users/harveydf/PycharmProjects/WeddingCard/website/static/js/stage.js":[function(require,module,exports){
/**
 * Created by harveydf on 21/08/14.
 */

var Stage = function (canvasId) {
    var stage = new createjs.Stage(canvasId);
    return stage;
};

module.exports = Stage;

},{}]},{},["/Users/harveydf/PycharmProjects/WeddingCard/website/static/js/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2hhcnZleWRmL1B5Y2hhcm1Qcm9qZWN0cy9XZWRkaW5nQ2FyZC93ZWJzaXRlL3N0YXRpYy9qcy9ib21iLmpzIiwiL1VzZXJzL2hhcnZleWRmL1B5Y2hhcm1Qcm9qZWN0cy9XZWRkaW5nQ2FyZC93ZWJzaXRlL3N0YXRpYy9qcy9leHBsb3Npb24uanMiLCIvVXNlcnMvaGFydmV5ZGYvUHljaGFybVByb2plY3RzL1dlZGRpbmdDYXJkL3dlYnNpdGUvc3RhdGljL2pzL21haW4uanMiLCIvVXNlcnMvaGFydmV5ZGYvUHljaGFybVByb2plY3RzL1dlZGRpbmdDYXJkL3dlYnNpdGUvc3RhdGljL2pzL3BsYXllci5qcyIsIi9Vc2Vycy9oYXJ2ZXlkZi9QeWNoYXJtUHJvamVjdHMvV2VkZGluZ0NhcmQvd2Vic2l0ZS9zdGF0aWMvanMvc3RhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhhcnZleWRmIG9uIDIyLzA4LzE0LlxuICovXG5cbnZhciBFeHBsb3Npb24gPSByZXF1aXJlKCcuL2V4cGxvc2lvbicpO1xuXG52YXIgQm9tYiA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICBpbWdCb21iID0gbmV3IEltYWdlKCk7XG4gICAgaW1nQm9tYi5zcmMgPSAnL3N0YXRpYy9pbWcvYm9tYi5wbmcnO1xuICAgIGZyYW1lcyA9IHt3aWR0aDogMzcsIGhlaWdodDogMzd9O1xuICAgIFxuICAgIHRoaXMuc3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoe1xuICAgICAgICBpbWFnZXM6IFtpbWdCb21iXSxcbiAgICAgICAgZnJhbWVzOiB7d2lkdGg6ZnJhbWVzLndpZHRoLCBoZWlnaHQ6IGZyYW1lcy5oZWlnaHR9LFxuICAgICAgICBhbmltYXRpb25zOiB7XG4gICAgICAgICAgICBsb2FkOiBbMCwgMywgJ2xvYWQnLCAwLjE1XVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgdGhpcy5zcHJpdGUgPSBuZXcgY3JlYXRlanMuU3ByaXRlKHRoaXMuc3ByaXRlU2hlZXQpO1xuICAgIHRoaXMuc3ByaXRlLndpZHRoID0gZnJhbWVzLndpZHRoO1xuICAgIHRoaXMuc3ByaXRlLmhlaWdodCA9IGZyYW1lcy5oZWlnaHQ7XG59O1xuXG5Cb21iLnByb3RvdHlwZS5sb2FkQW5pbWF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZ290b0FuZFBsYXkoJ2xvYWQnKTtcbn07XG5cbkJvbWIucHJvdG90eXBlLmV4cGxvZGVCb21iID0gZnVuY3Rpb24gKGJvbWJQb3NpdGlvbiwgc2l6ZSwgZGlyZWN0aW9ucykge1xuICAgIHZhciBleHBsb2RlQ2VudGVyID0gbmV3IEV4cGxvc2lvbigpO1xuXG4gICAgZXhwbG9kZUNlbnRlci5zcHJpdGUueCA9IGJvbWJQb3NpdGlvbi54O1xuICAgIGV4cGxvZGVDZW50ZXIuc3ByaXRlLnkgPSBib21iUG9zaXRpb24ueTtcbiAgICBzdGFnZS5hZGRDaGlsZChleHBsb2RlQ2VudGVyLnNwcml0ZSk7XG5cbiAgICBpZiAoZGlyZWN0aW9ucy5pbmRleE9mKCd1cCcpID49IDApIHtcbiAgICAgICAgdmFyIGV4cGxvZGVVcE1pZGRsZSA9IG5ldyBFeHBsb3Npb24oKTtcblxuICAgICAgICBleHBsb2RlVXBNaWRkbGUuc3ByaXRlLnggPSBleHBsb2RlQ2VudGVyLnNwcml0ZS54O1xuICAgICAgICBleHBsb2RlVXBNaWRkbGUuc3ByaXRlLnkgPSBleHBsb2RlQ2VudGVyLnNwcml0ZS55IC0gZXhwbG9kZVVwTWlkZGxlLnNwcml0ZS5oZWlnaHQ7XG5cbiAgICAgICAgdmFyIGV4cGxvZGVVcEVuZCA9IG5ldyBFeHBsb3Npb24oKTtcblxuICAgICAgICBleHBsb2RlVXBFbmQuc3ByaXRlLnggPSBleHBsb2RlVXBNaWRkbGUuc3ByaXRlLng7XG4gICAgICAgIGV4cGxvZGVVcEVuZC5zcHJpdGUueSA9IGV4cGxvZGVVcE1pZGRsZS5zcHJpdGUueSAtIGV4cGxvZGVVcEVuZC5zcHJpdGUuaGVpZ2h0O1xuXG4gICAgICAgIHN0YWdlLmFkZENoaWxkKGV4cGxvZGVVcE1pZGRsZS5zcHJpdGUpO1xuICAgICAgICBzdGFnZS5hZGRDaGlsZChleHBsb2RlVXBFbmQuc3ByaXRlKTtcblxuICAgICAgICBleHBsb2RlVXBNaWRkbGUudXBNaWRkbGVBbmltYXRpb24oKTtcbiAgICAgICAgZXhwbG9kZVVwRW5kLnVwRW5kQW5pbWF0aW9uKCk7XG5cbiAgICB9XG5cbiAgICBleHBsb2RlQ2VudGVyLmNlbnRlckFuaW1hdGlvbigpO1xuXG4gICAgY3JlYXRlanMuVHdlZW4uZ2V0KHRoaXMpXG4gICAgICAgIC53YWl0KDEwMDApXG4gICAgICAgIC5jYWxsKGV4cGxvc2lvbk92ZXIpO1xuXG4gICAgZnVuY3Rpb24gZXhwbG9zaW9uT3ZlciAoKSB7XG4gICAgICAgIHN0YWdlLnJlbW92ZUNoaWxkKGV4cGxvZGVDZW50ZXIuc3ByaXRlLCBleHBsb2RlVXBNaWRkbGUuc3ByaXRlLCBleHBsb2RlVXBFbmQuc3ByaXRlKTtcbiAgICB9XG59O1xuXG5Cb21iLnByb3RvdHlwZS5yZW1vdmVCb21iID0gZnVuY3Rpb24gKCkge1xuICAgIHN0YWdlLnJlbW92ZUNoaWxkKHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBCb21iO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhhcnZleWRmIG9uIDI3LzA4LzE0LlxuICovXG5cbnZhciBFeHBsb3Npb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgaW1nRXhwbG9zaW9uID0gbmV3IEltYWdlKCk7XG4gICAgaW1nRXhwbG9zaW9uLnNyYyA9ICcvc3RhdGljL2ltZy9ib21iLnBuZyc7XG4gICAgZnJhbWVzID0ge3dpZHRoOiAzNywgaGVpZ2h0OiAzNn07XG5cbiAgICB2YXIgc3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoe1xuICAgICAgICBpbWFnZXM6IFtpbWdFeHBsb3Npb25dLFxuICAgICAgICBmcmFtZXM6IGZyYW1lcyxcbiAgICAgICAgYW5pbWF0aW9uczoge1xuICAgICAgICAgICAgY2VudGVyOiB7XG4gICAgICAgICAgICAgICAgZnJhbWVzOiBbOCwgOSwgMTAsIDExLCAxMiwgMTEsIDEwLCA5LCA4XSxcbiAgICAgICAgICAgICAgICBzcGVlZDogMC4zXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBNaWRkbGU6IHtcbiAgICAgICAgICAgICAgICBmcmFtZXM6IFszMiwgMzMsIDM0LCAzNSwgMzYsIDM1LCAzNCwgMzMsIDMyXSxcbiAgICAgICAgICAgICAgICBzcGVlZDogMC4zXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBFbmQ6IHtcbiAgICAgICAgICAgICAgICBmcmFtZXM6IFsxNiwgMTcsIDE4LCAxOSwgMjAsIDE5LCAxOCwgMTcsIDE2XSxcbiAgICAgICAgICAgICAgICBzcGVlZDogMC4zXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuc3ByaXRlID0gbmV3IGNyZWF0ZWpzLlNwcml0ZShzcHJpdGVTaGVldCk7XG4gICAgdGhpcy5zcHJpdGUud2lkdGggPSBmcmFtZXMud2lkdGg7XG4gICAgdGhpcy5zcHJpdGUuaGVpZ2h0ID0gZnJhbWVzLmhlaWdodDtcbn07XG5cbkV4cGxvc2lvbi5wcm90b3R5cGUuY2VudGVyQW5pbWF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3ByaXRlLmdvdG9BbmRQbGF5KCdjZW50ZXInKTtcbn07XG5cbkV4cGxvc2lvbi5wcm90b3R5cGUudXBNaWRkbGVBbmltYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zcHJpdGUuZ290b0FuZFBsYXkoJ3VwTWlkZGxlJyk7XG59O1xuXG5FeHBsb3Npb24ucHJvdG90eXBlLnVwRW5kQW5pbWF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3ByaXRlLmdvdG9BbmRQbGF5KCd1cEVuZCcpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3Npb247IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhhcnZleWRmIG9uIDIvMDgvMTQuXG4gKi9cblxudmFyIFBsYXllciA9IHJlcXVpcmUoJy4vcGxheWVyJyksXG4gICAgU3RhZ2UgID0gcmVxdWlyZSgnLi9zdGFnZScpO1xuXG4kKCBkb2N1bWVudCApLnJlYWR5KGZ1bmN0aW9uICgpe1xuICAgIHdpbmRvdy5zdGFnZSA9IG5ldyBTdGFnZSgnY2FudmFzJyk7XG4gICAgdmFyIGJtYW4gPSBuZXcgUGxheWVyKHtcbiAgICAgICAgJ2ltZ1NyYyc6ICcvc3RhdGljL2ltZy9ibWFuLnBuZycsXG4gICAgICAgICdmcmFtZVNpemUnOiB7XG4gICAgICAgICAgICAnd2lkdGgnOiA0MSxcbiAgICAgICAgICAgICdoZWlnaHQnOiA2MlxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBzdGFnZS5hZGRDaGlsZChibWFuLnNwcml0ZSk7XG4gICAgc3RhZ2Uuc2V0Q2hpbGRJbmRleChibWFuLnNwcml0ZSwgMSk7XG4gICAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCBzdGFnZSk7XG4gICAgY3JlYXRlanMuVGlja2VyLnNldEZQUygzMCk7XG5cbiAgICBjcmVhdGVqcy5Ud2Vlbi5nZXQoYm1hbi5zcHJpdGUpXG4gICAgICAgIC5jYWxsKGJtYW4uZG93bkFuaW1hdGlvbilcbiAgICAgICAgLnRvKHt5OiAxMDB9LCAxMDAwKVxuICAgICAgICAuY2FsbChibWFuLnN0b3BBbmltYXRpb24pXG4gICAgICAgIC5jYWxsKGJtYW4uc2V0Qm9tYiwgWzEsIFsndXAnXV0pXG4gICAgICAgIC53YWl0KDUwMClcbiAgICAgICAgLmNhbGwoYm1hbi51cEFuaW1hdGlvbilcbiAgICAgICAgLnRvKHt5OiAwfSwgMTAwMClcbiAgICAgICAgLmNhbGwoYm1hbi5yaWdodEFuaW1hdGlvbilcbiAgICAgICAgLnRvKHt4OiAxMDB9LCAxMDAwKVxuICAgICAgICAuY2FsbChibWFuLnN0b3BBbmltYXRpb24pO1xufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaGFydmV5ZGYgb24gMjAvMDgvMTQuXG4gKi9cblxudmFyIEJvbWIgPSByZXF1aXJlKCcuL2JvbWInKTtcblxuLy8gRGVmaW5lIHRoZSBQbGF5ZXJcbnZhciBQbGF5ZXIgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgaW1nUGxheWVyID0gbmV3IEltYWdlKCk7XG4gICAgaW1nUGxheWVyLnNyYyA9IGNvbmZpZy5pbWdTcmM7XG4gICAgZnJhbWVzID0gY29uZmlnLmZyYW1lU2l6ZTtcblxuICAgIHZhciBzcHJpdGVTaGVldCA9IG5ldyBjcmVhdGVqcy5TcHJpdGVTaGVldCh7XG4gICAgICAgIGltYWdlczogW2ltZ1BsYXllcl0sXG4gICAgICAgIGZyYW1lczoge3dpZHRoOiBmcmFtZXMud2lkdGgsIGhlaWdodDogZnJhbWVzLmhlaWdodH0sXG4gICAgICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgICAgICAgIHVwOiBbMCwgMiwgJ3VwJywgMC4yXSxcbiAgICAgICAgICAgIGxlZnQ6IFszLCA1LCAnbGVmdCcsIDAuMl0sXG4gICAgICAgICAgICBkb3duOiBbNiwgOCwgJ2Rvd24nLCAwLjJdLFxuICAgICAgICAgICAgcmlnaHQ6IFs5LCAxMSwgJ3JpZ2h0JywgMC4yXSxcbiAgICAgICAgICAgIHN0YW5kOiBbN11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5zcHJpdGUgPSBuZXcgY3JlYXRlanMuU3ByaXRlKHNwcml0ZVNoZWV0LCAnc3RhbmQnKTtcbiAgICB0aGlzLnNwcml0ZS54ID0gMDtcbiAgICB0aGlzLnNwcml0ZS55ID0gMDtcbiAgICB0aGlzLnNwcml0ZS53aWR0aCA9IGZyYW1lcy53aWR0aDtcbiAgICB0aGlzLnNwcml0ZS5oZWlnaHQgPSBmcmFtZXMuaGVpZ2h0O1xufTtcblxuUGxheWVyLnByb3RvdHlwZS5zdG9wQW5pbWF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZ290b0FuZFN0b3AoKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUuZG93bkFuaW1hdGlvbiA9IGZ1bmN0aW9uICgpICB7XG4gICAgdGhpcy5nb3RvQW5kUGxheSgnZG93bicpO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS51cEFuaW1hdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmdvdG9BbmRQbGF5KCd1cCcpO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS5yaWdodEFuaW1hdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmdvdG9BbmRQbGF5KCdyaWdodCcpO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS5zZXRCb21iID0gZnVuY3Rpb24gKHNpemUsIGRpcmVjdGlvbnMpIHtcbiAgICB2YXIgYm9tYiA9IG5ldyBCb21iKCk7XG5cbiAgICBib21iLnNwcml0ZS54ID0gdGhpcy54O1xuICAgIGJvbWIuc3ByaXRlLnkgPSAodGhpcy55ICsgdGhpcy5oZWlnaHQpIC0gYm9tYi5zcHJpdGUuaGVpZ2h0O1xuXG4gICAgc3RhZ2UuYWRkQ2hpbGQoYm9tYi5zcHJpdGUpO1xuICAgIHN0YWdlLnNldENoaWxkSW5kZXgoYm9tYi5zcHJpdGUsIDApO1xuXG4gICAgY3JlYXRlanMuVHdlZW4uZ2V0KGJvbWIuc3ByaXRlKVxuICAgICAgICAuY2FsbChib21iLmxvYWRBbmltYXRpb24pXG4gICAgICAgIC53YWl0KDI1MDApXG4gICAgICAgIC5jYWxsKGJvbWIucmVtb3ZlQm9tYilcbiAgICAgICAgLmNhbGwoYm9tYi5leHBsb2RlQm9tYiwgW1xuICAgICAgICAgICAge3g6IGJvbWIuc3ByaXRlLngsIHk6IGJvbWIuc3ByaXRlLnl9LFxuICAgICAgICAgICAgc2l6ZSxcbiAgICAgICAgICAgIGRpcmVjdGlvbnNcbiAgICAgICAgXSk7XG59O1xuXG4vLyBleHBvcnQgdGhlIG1vZHVsZVxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXI7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaGFydmV5ZGYgb24gMjEvMDgvMTQuXG4gKi9cblxudmFyIFN0YWdlID0gZnVuY3Rpb24gKGNhbnZhc0lkKSB7XG4gICAgdmFyIHN0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKGNhbnZhc0lkKTtcbiAgICByZXR1cm4gc3RhZ2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YWdlO1xuIl19
