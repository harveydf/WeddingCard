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
