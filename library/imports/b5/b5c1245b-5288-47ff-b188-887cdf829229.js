"use strict";
cc._RF.push(module, 'b5c12RbUohH/7GIiHzfgpIp', 'btn_voltar');
// Scripts/btn_voltar.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        text: {
            default: '',
            multiline: true
            // foo: {
            //    default: null,
            //    url: cc.Texture2D,  // optional, default is typeof default
            //    serializable: true, // optional, default is true
            //    visible: true,      // optional, default is true
            //    displayName: 'Foo', // optional
            //    readonly: false,    // optional, default is false
            // },
            // ...
        } },

    // use this for initialization
    onLoad: function onLoad() {
        this.node.on('mousedown', function (event) {
            cc.director.loadScene('LancamentoTerra');
        });
    }

    // called every frame
    // update: function (dt) {

    // },
});

cc._RF.pop();