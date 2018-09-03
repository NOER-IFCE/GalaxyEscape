"use strict";
cc._RF.push(module, 'da4ffha8kZNXYgkJtHiwHng', 'SliderCtrl');
// Scripts/SliderCtrl.js

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
        slider: {
            default: null,
            type: cc.Slider
        },
        VelocidadeKms: {
            default: null,
            type: cc.Label
        }
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },
    onLoad: function onLoad() {
        this.slider.progress = 0.5;
        this._updateVelocidade(this.slider.progress);
    },
    _updateVelocidade: function _updateVelocidade(progress, velocidadeKms) {
        this.velocidade = progress * 255;
        this.VelocidadeKms.string = toString(this.velocidade);
    },
    OnSliderEvent: function OnSliderEvent(sender, eventType) {
        this._updateVelocidade(sender, progress);
    }
});

cc._RF.pop();