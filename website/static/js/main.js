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
