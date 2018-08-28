"use strict";
cc._RF.push(module, '2dda3HKVUJNa5YsNKyMZBG6', 'Game');
// Scripts/Game.js

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
        massaLabel: {
            default: null,
            type: cc.Label
        },
        velocidadeLabel: {
            default: null,
            type: cc.Label
        }
    },

    onLoad: function onLoad() {
        var self = this;
        self.scheduleOnce(function () {}, 2);
    }
});

cc._RF.pop();