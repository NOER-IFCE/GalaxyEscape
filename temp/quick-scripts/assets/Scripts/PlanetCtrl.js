(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/PlanetCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0d867hFYkRFSKLLQH1nVBCw', 'PlanetCtrl', __filename);
// Scripts/PlanetCtrl.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        terra: {
            default: null,
            type: cc.Button
        },
        marte: {
            default: null,
            type: cc.Button
        },
        venus: {
            default: null,
            type: cc.Button
        },

        retornar: {
            default: null,
            type: cc.Button
        },
        video: {
            default: null,
            type: cc.Button
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
        } },

    onTerraActivated: function onTerraActivated() {
        cc.director.loadScene('LancamentoTerra');
    },

    onMarteActivated: function onMarteActivated() {
        cc.director.loadScene('LancamentoMarte');
    },

    onVenusActivated: function onVenusActivated() {},

    onRetornarActivated: function onRetornarActivated() {
        cc.director.loadScene('CenaPrincipal');
    },

    onVideoActivated: function onVideoActivated() {
        cc.sys.openURL("https://youtu.be/lnFtztH3Vk4");
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
        //# sourceMappingURL=PlanetCtrl.js.map
        