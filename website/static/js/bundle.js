(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/harveydf/PycharmProjects/WeddingCard/website/static/js/main.js":[function(require,module,exports){
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

    bman.startPlaying();
});

},{"./player":"/Users/harveydf/PycharmProjects/WeddingCard/website/static/js/player.js","./stage":"/Users/harveydf/PycharmProjects/WeddingCard/website/static/js/stage.js"}],"/Users/harveydf/PycharmProjects/WeddingCard/website/static/js/player.js":[function(require,module,exports){
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

},{}],"/Users/harveydf/PycharmProjects/WeddingCard/website/static/js/stage.js":[function(require,module,exports){
/**
 * Created by harveydf on 21/08/14.
 */

var Stage = function (canvasId) {
    var stage = new createjs.Stage(canvasId);
    return stage;
};

module.exports = Stage;

},{}]},{},["/Users/harveydf/PycharmProjects/WeddingCard/website/static/js/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2hhcnZleWRmL1B5Y2hhcm1Qcm9qZWN0cy9XZWRkaW5nQ2FyZC93ZWJzaXRlL3N0YXRpYy9qcy9tYWluLmpzIiwiL1VzZXJzL2hhcnZleWRmL1B5Y2hhcm1Qcm9qZWN0cy9XZWRkaW5nQ2FyZC93ZWJzaXRlL3N0YXRpYy9qcy9wbGF5ZXIuanMiLCIvVXNlcnMvaGFydmV5ZGYvUHljaGFybVByb2plY3RzL1dlZGRpbmdDYXJkL3dlYnNpdGUvc3RhdGljL2pzL3N0YWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQ3JlYXRlZCBieSBoYXJ2ZXlkZiBvbiAyLzA4LzE0LlxuICovXG5cbnZhciBQbGF5ZXIgPSByZXF1aXJlKCcuL3BsYXllcicpLFxuICAgIFN0YWdlICA9IHJlcXVpcmUoJy4vc3RhZ2UnKTtcblxuJCggZG9jdW1lbnQgKS5yZWFkeShmdW5jdGlvbiAoKXtcbiAgICB2YXIgc3RhZ2UgPSBuZXcgU3RhZ2UoJ2NhbnZhcycpO1xuICAgIHZhciBibWFuID0gbmV3IFBsYXllcih7XG4gICAgICAgICdpbWdTcmMnOiAnL3N0YXRpYy9pbWcvYm1hbi5wbmcnLFxuICAgICAgICAnZnJhbWVTaXplJzoge1xuICAgICAgICAgICAgJ3dpZHRoJzogMzIsXG4gICAgICAgICAgICAnaGVpZ2h0JzogNDhcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3RhZ2UuYWRkQ2hpbGQoYm1hbi5zcHJpdGUpO1xuICAgIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKCd0aWNrJywgc3RhZ2UpO1xuICAgIGNyZWF0ZWpzLlRpY2tlci5zZXRGUFMoMzApO1xuXG4gICAgYm1hbi5zdGFydFBsYXlpbmcoKTtcbn0pO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhhcnZleWRmIG9uIDIwLzA4LzE0LlxuICovXG5cbi8vIERlZmluZSB0aGUgUGxheWVyXG52YXIgUGxheWVyID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIGltZ1BsYXllciA9IG5ldyBJbWFnZSgpO1xuICAgIGltZ1BsYXllci5zcmMgPSBjb25maWcuaW1nU3JjO1xuICAgIGZyYW1lcyA9IGNvbmZpZy5mcmFtZVNpemU7XG5cbiAgICB2YXIgc3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoe1xuICAgICAgICBpbWFnZXM6IFtpbWdQbGF5ZXJdLFxuICAgICAgICBmcmFtZXM6IHt3aWR0aDogZnJhbWVzLndpZHRoLCBoZWlnaHQ6IGZyYW1lcy5oZWlnaHR9LFxuICAgICAgICBhbmltYXRpb25zOiB7XG4gICAgICAgICAgICBkb3duOiBbMCwgMywgJ2Rvd24nLCAwLjJdLFxuICAgICAgICAgICAgdXA6IFs0LCA3LCAndXAnLCAwLjJdLFxuICAgICAgICAgICAgbGVmdDogWzgsIDExLCAnbGVmdCcsIDAuMl0sXG4gICAgICAgICAgICByaWdodDogWzEyLCAxNSwgJ3JpZ2h0JywgMC4yXSxcbiAgICAgICAgICAgIHN0YW5kOiBbMF1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5zcHJpdGUgPSBuZXcgY3JlYXRlanMuU3ByaXRlKHNwcml0ZVNoZWV0LCAnc3RhbmQnKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUuc3RhcnRQbGF5aW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBjcmVhdGVqcy5Ud2Vlbi5nZXQodGhpcy5zcHJpdGUpXG4gICAgICAgIC5jYWxsKHRoaXMuZG93bkFuaW1hdGlvbilcbiAgICAgICAgLnRvKHt4OjAsIHk6NTB9LCAyMDAwKVxuICAgICAgICAuY2FsbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjcmVhdGVqcy5Ud2Vlbi5nZXQoc2VsZi5zcHJpdGUpXG4gICAgICAgICAgICAgICAgLmNhbGwoc2VsZi5yaWdodEFuaW1hdGlvbilcbiAgICAgICAgICAgICAgICAudG8oe3g6MTAwLCB5OjUwfSwgMjAwMClcbiAgICAgICAgICAgICAgICAuY2FsbChzZWxmLnN0b3BBbmltYXRpb24pO1xuICAgICAgICB9KTtcbn07XG5cblBsYXllci5wcm90b3R5cGUuc3RvcEFuaW1hdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmdvdG9BbmRTdG9wKCdzdGFuZCcpO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS5kb3duQW5pbWF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZ290b0FuZFBsYXkoJ2Rvd24nKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUucmlnaHRBbmltYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5nb3RvQW5kUGxheSgncmlnaHQnKTtcbn07XG5cbi8vIGV4cG9ydCB0aGUgbW9kdWxlXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBoYXJ2ZXlkZiBvbiAyMS8wOC8xNC5cbiAqL1xuXG52YXIgU3RhZ2UgPSBmdW5jdGlvbiAoY2FudmFzSWQpIHtcbiAgICB2YXIgc3RhZ2UgPSBuZXcgY3JlYXRlanMuU3RhZ2UoY2FudmFzSWQpO1xuICAgIHJldHVybiBzdGFnZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhZ2U7XG4iXX0=
