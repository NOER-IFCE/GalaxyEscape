"use strict";
cc._RF.push(module, 'dfd99H/VBlMXI/2kgAWZlsc', 'MenuCtrl');
// Scripts/MenuCtrl.js

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
        iniciar: {
            default: null,
            type: cc.Button
        },
        creditos: {
            default: null,
            type: cc.Button
        },
        ajustes: {
            default: null,
            type: cc.Button
        },
        closecred: {
            default: null,
            type: cc.Button
        },
        onmusic: {
            default: null,
            type: cc.Button
        },
        offmusic: {
            default: null,
            type: cc.Button
        },
        abacred: {
            default: null,
            type: cc.Node
        },

        guiaaluno: {
            default: null,
            type: cc.Button
        },
        musica: {
            default: null,
            type: cc.AudioSource
        },

        guiaprofessor: {
            default: null,
            type: cc.Button
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
        this.abacred.active = false;
    },

    onStartActivated: function onStartActivated() {
        cc.director.loadScene('TelaPlanetas');
    },

    onCreditosActivated: function onCreditosActivated() {
        this.abacred.active = true;
    },

    onAjustesActivated: function onAjustesActivated() {},

    onClosecredActivated: function onClosecredActivated() {
        this.abacred.active = false;
    },
    onGuiaAlunoActivated: function onGuiaAlunoActivated() {
        cc.sys.openURL("https://drive.google.com/open?id=1Y8zqv9yPHJSZ6lQjtFvYeKoMEZFWljHE");
    },
    onGuiaProfessorActivated: function onGuiaProfessorActivated() {
        cc.sys.openURL("https://drive.google.com/open?id=16JPi1OeF4Rg-slXwVU92UFQ84yyHMZFk");
    }

});

cc._RF.pop();