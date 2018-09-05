(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/ButtonCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fa2cfXAGm1AYIEFC8dbJnoD', 'ButtonCtrl', __filename);
// Scripts/ButtonCtrl.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {

        aumentar: {
            default: null,
            type: cc.Button
        },
        massaText: {
            default: null,
            type: cc.Label
        },
        diminuir: {
            default: null,
            type: cc.Button
        },
        massa: 1

    },

    onLoad: function onLoad() {},

    onAddButtonClick: function onAddButtonClick() {
        this.massa += 1;
        if (this.massa > 20) {
            this.massa = 20;
            this.massaText.string = this.massa.toString();
        } else {
            this.massaText.string = this.massa.toString();
        }
    },

    onRemoveButtonClick: function onRemoveButtonClick() {
        this.massa -= 1;
        if (this.massa < 1) {
            this.massa = 1;
            this.massaText.string = this.massa.toString();
        } else {
            this.massaText.string = this.massa.toString();
        }
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
        //# sourceMappingURL=ButtonCtrl.js.map
        