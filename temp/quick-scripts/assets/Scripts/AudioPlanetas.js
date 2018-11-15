(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/AudioPlanetas.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c65f4PGVlVMTImVzfUWATRO', 'AudioPlanetas', __filename);
// Scripts/AudioPlanetas.js

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
            type: cc.AudioSource,
            default: null
        }
    },

    // função de inicialização
    onLoad: function onLoad() {},
    //a cada frame essa função é chamada
    update: function update() {
        var audio = this.audioSource;
    },
    //função play do audio
    play: function play() {
        this.audioSource.play();
    },
    //função pause do audio
    pause: function pause() {
        this.audioSource.pause();
    },
    //função parada do audio
    stop: function stop() {
        this.audioSource.stop();
    },
    //função retomar do audio
    resume: function resume() {
        this.audioSource.resume();
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=AudioPlanetas.js.map
        