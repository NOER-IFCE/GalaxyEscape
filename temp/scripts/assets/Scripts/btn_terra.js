"use strict";
cc._RF.push(module, '9bf28D6m+ZF1Ky+mkQVZfXZ', 'btn_terra');
// Scripts/btn_terra.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        text: {
            default: '',
            multiline: true
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

    // use this for initialization
    onLoad: function onLoad() {
        this.node.on('mousedown', function (event) {
            cc.director.loadScene('LancamentoTerra');
        });
    }

});

cc._RF.pop();