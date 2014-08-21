(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/harveydavidforeropenaranda/Documents/Django/weddingcard/WeddingCard/website/static/js/main.js":[function(require,module,exports){
/**
 * Created by harveydf on 2/08/14.
 */

var Player = require('./player'),
    Stage  = require('./stage');

$( document ).ready(function (){
    var stage = new Stage('canvas');
    var bman = new Player({
        'imgSrc': '/static/img/bman.png',
        'frameSize': {
            'width': 32,
            'height': 48
        }
    });

    stage.addChild(bman.sprite);
    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.setFPS(30);

//    bman.startPlaying();
    bman.downAnimation({
        'x': 0,
        'y': 100
    }, function () {
        bman.rightAnimation({
            'x': 100,
            'y': 100
        }, function () {
            console.log('done');
        })
    })
});

},{"./player":"/Users/harveydavidforeropenaranda/Documents/Django/weddingcard/WeddingCard/website/static/js/player.js","./stage":"/Users/harveydavidforeropenaranda/Documents/Django/weddingcard/WeddingCard/website/static/js/stage.js"}],"/Users/harveydavidforeropenaranda/Documents/Django/weddingcard/WeddingCard/website/static/js/player.js":[function(require,module,exports){
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

},{}],"/Users/harveydavidforeropenaranda/Documents/Django/weddingcard/WeddingCard/website/static/js/stage.js":[function(require,module,exports){
/**
 * Created by harveydf on 21/08/14.
 */

var Stage = function (canvasId) {
    var stage = new createjs.Stage(canvasId);
    return stage;
};

module.exports = Stage;

},{}]},{},["/Users/harveydavidforeropenaranda/Documents/Django/weddingcard/WeddingCard/website/static/js/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2hhcnZleWRhdmlkZm9yZXJvcGVuYXJhbmRhL0RvY3VtZW50cy9EamFuZ28vd2VkZGluZ2NhcmQvV2VkZGluZ0NhcmQvd2Vic2l0ZS9zdGF0aWMvanMvbWFpbi5qcyIsIi9Vc2Vycy9oYXJ2ZXlkYXZpZGZvcmVyb3BlbmFyYW5kYS9Eb2N1bWVudHMvRGphbmdvL3dlZGRpbmdjYXJkL1dlZGRpbmdDYXJkL3dlYnNpdGUvc3RhdGljL2pzL3BsYXllci5qcyIsIi9Vc2Vycy9oYXJ2ZXlkYXZpZGZvcmVyb3BlbmFyYW5kYS9Eb2N1bWVudHMvRGphbmdvL3dlZGRpbmdjYXJkL1dlZGRpbmdDYXJkL3dlYnNpdGUvc3RhdGljL2pzL3N0YWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQ3JlYXRlZCBieSBoYXJ2ZXlkZiBvbiAyLzA4LzE0LlxuICovXG5cbnZhciBQbGF5ZXIgPSByZXF1aXJlKCcuL3BsYXllcicpLFxuICAgIFN0YWdlICA9IHJlcXVpcmUoJy4vc3RhZ2UnKTtcblxuJCggZG9jdW1lbnQgKS5yZWFkeShmdW5jdGlvbiAoKXtcbiAgICB2YXIgc3RhZ2UgPSBuZXcgU3RhZ2UoJ2NhbnZhcycpO1xuICAgIHZhciBibWFuID0gbmV3IFBsYXllcih7XG4gICAgICAgICdpbWdTcmMnOiAnL3N0YXRpYy9pbWcvYm1hbi5wbmcnLFxuICAgICAgICAnZnJhbWVTaXplJzoge1xuICAgICAgICAgICAgJ3dpZHRoJzogMzIsXG4gICAgICAgICAgICAnaGVpZ2h0JzogNDhcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3RhZ2UuYWRkQ2hpbGQoYm1hbi5zcHJpdGUpO1xuICAgIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKCd0aWNrJywgc3RhZ2UpO1xuICAgIGNyZWF0ZWpzLlRpY2tlci5zZXRGUFMoMzApO1xuXG4vLyAgICBibWFuLnN0YXJ0UGxheWluZygpO1xuICAgIGJtYW4uZG93bkFuaW1hdGlvbih7XG4gICAgICAgICd4JzogMCxcbiAgICAgICAgJ3knOiAxMDBcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJtYW4ucmlnaHRBbmltYXRpb24oe1xuICAgICAgICAgICAgJ3gnOiAxMDAsXG4gICAgICAgICAgICAneSc6IDEwMFxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZG9uZScpO1xuICAgICAgICB9KVxuICAgIH0pXG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBoYXJ2ZXlkZiBvbiAyMC8wOC8xNC5cbiAqL1xuXG4vLyBEZWZpbmUgdGhlIFBsYXllclxudmFyIFBsYXllciA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICBpbWdQbGF5ZXIgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWdQbGF5ZXIuc3JjID0gY29uZmlnLmltZ1NyYztcbiAgICBmcmFtZXMgPSBjb25maWcuZnJhbWVTaXplO1xuXG4gICAgdmFyIHNwcml0ZVNoZWV0ID0gbmV3IGNyZWF0ZWpzLlNwcml0ZVNoZWV0KHtcbiAgICAgICAgaW1hZ2VzOiBbaW1nUGxheWVyXSxcbiAgICAgICAgZnJhbWVzOiB7d2lkdGg6IGZyYW1lcy53aWR0aCwgaGVpZ2h0OiBmcmFtZXMuaGVpZ2h0fSxcbiAgICAgICAgYW5pbWF0aW9uczoge1xuICAgICAgICAgICAgZG93bjogWzAsIDMsICdkb3duJywgMC4yXSxcbiAgICAgICAgICAgIHVwOiBbNCwgNywgJ3VwJywgMC4yXSxcbiAgICAgICAgICAgIGxlZnQ6IFs4LCAxMSwgJ2xlZnQnLCAwLjJdLFxuICAgICAgICAgICAgcmlnaHQ6IFsxMiwgMTUsICdyaWdodCcsIDAuMl0sXG4gICAgICAgICAgICBzdGFuZDogWzBdXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuc3ByaXRlID0gbmV3IGNyZWF0ZWpzLlNwcml0ZShzcHJpdGVTaGVldCwgJ3N0YW5kJyk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnN0YXJ0UGxheWluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4vLyAgICAgICAgICAgIGNyZWF0ZWpzLlR3ZWVuLmdldChzZWxmLnNwcml0ZSlcbi8vICAgICAgICAgICAgICAgIC5jYWxsKHNlbGYucmlnaHRBbmltYXRpb24pXG4vLyAgICAgICAgICAgICAgICAudG8oe3g6MTAwLCB5OjUwfSwgMjAwMClcbi8vICAgICAgICAgICAgICAgIC5jYWxsKHNlbGYuc3RvcEFuaW1hdGlvbik7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnN0b3BBbmltYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zcHJpdGUuZ290b0FuZFN0b3AoJ3N0YW5kJyk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLm1vdmVUbyA9IGZ1bmN0aW9uIChwb3NpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBjcmVhdGVqcy5Ud2Vlbi5nZXQodGhpcy5zcHJpdGUpXG4gICAgICAgIC50byh7eDogcG9zaXRpb24ueCwgeTogcG9zaXRpb24ueX0sIDIwMDApXG4gICAgICAgIC5jYWxsKGVuZCk7XG5cbiAgICBmdW5jdGlvbiBlbmQoKSB7XG4gICAgICAgIHNlbGYuc3RvcEFuaW1hdGlvbigpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH1cbn07XG5cblBsYXllci5wcm90b3R5cGUuZG93bkFuaW1hdGlvbiA9IGZ1bmN0aW9uIChwb3NpdGlvbiwgY2FsbGJhY2spICB7XG4gICAgdGhpcy5zcHJpdGUuZ290b0FuZFBsYXkoJ2Rvd24nKTtcblxuICAgIHRoaXMubW92ZVRvKHBvc2l0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnJpZ2h0QW5pbWF0aW9uID0gZnVuY3Rpb24gKHBvc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuc3ByaXRlLmdvdG9BbmRQbGF5KCdyaWdodCcpO1xuXG4gICAgdGhpcy5tb3ZlVG8ocG9zaXRpb24sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbn07XG5cbi8vIGV4cG9ydCB0aGUgbW9kdWxlXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBoYXJ2ZXlkZiBvbiAyMS8wOC8xNC5cbiAqL1xuXG52YXIgU3RhZ2UgPSBmdW5jdGlvbiAoY2FudmFzSWQpIHtcbiAgICB2YXIgc3RhZ2UgPSBuZXcgY3JlYXRlanMuU3RhZ2UoY2FudmFzSWQpO1xuICAgIHJldHVybiBzdGFnZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhZ2U7XG4iXX0=
