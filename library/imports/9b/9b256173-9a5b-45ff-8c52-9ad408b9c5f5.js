"use strict";
cc._RF.push(module, '9b256FzmltF/4xSmtQIucX1', 'btn_martevoltar');
// Scripts/btn_martevoltar.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        voltarmarte: {
            default: null,
            type: cc.Button
        }
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    onReturnMarteActivated: function onReturnMarteActivated() {
        cc.director.loadScene('LancamentoMarte');
    }

    // called every frame
    // update: function (dt) {

    // },
});

cc._RF.pop();