(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/btn_martevoltar.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9b256FzmltF/4xSmtQIucX1', 'btn_martevoltar', __filename);
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
        //# sourceMappingURL=btn_martevoltar.js.map
        