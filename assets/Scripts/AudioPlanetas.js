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

    // use this for initialization
    onLoad: function () {
        // cc.audioEngine.setMaxWebAudioSize(1024*10);
    },
    
    update: function () { 
        var audio = this.audioSource;
    },
    
    play: function () {
        this.audioSource.play();
    },
    
    pause: function () {
        this.audioSource.pause();
    },
    
    stop: function () {
        this.audioSource.stop();
    },
    
    resume: function () {
        this.audioSource.resume();
    }
});

