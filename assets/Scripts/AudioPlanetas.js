// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
    },

    // função de inicialização
    onLoad: function () {

    },
    //a cada frame essa função é chamada
    update: function () { 
        var audio = this.audioSource;
    },
    //função play do audio
    play: function () {
        this.audioSource.play();
    },
    //função pause do audio
    pause: function () {
        this.audioSource.pause();
    },
    //função parada do audio
    stop: function () {
        this.audioSource.stop();
    },
    //função retomar do audio
    resume: function () {
        this.audioSource.resume();
    }
});

