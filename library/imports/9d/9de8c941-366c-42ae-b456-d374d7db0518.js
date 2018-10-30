"use strict";
cc._RF.push(module, '9de8clBNmxCrrRW03TX2wUY', 'AudioMain');
// Scripts/AudioMain.js

"use strict";

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
            default: null,
            type: cc.AudioSource
        }

    },

    onLoad: function onLoad() {},

    play: function play() {
        this.audioSource.play();
    }
});

cc._RF.pop();