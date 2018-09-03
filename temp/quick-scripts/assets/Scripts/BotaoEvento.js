(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/BotaoEvento.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fa2cfXAGm1AYIEFC8dbJnoD', 'BotaoEvento', __filename);
// Scripts/BotaoEvento.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        buttonAumentar: {
            default: null,
            type: cc.Button
        },
        buttonDiminuir: {
            default: null,
            type: cc.Button
        },
        massaLabel: {
            default: null,
            type: cc.Label
        },

        massa: 1
    },

    onLoad: function onLoad() {
        this.massa = this.massaLabel.string.toInt();
        this.onBtnAumentarClicked(this.massa);
        this.onBtnDiminuirClicked(this.massa);
    },
    onBtnAumentarClicked: function onBtnAumentarClicked(massa) {
        if (this.massa > 20) {
            this.massa = 1;
        } else {
            this.massa += 1;
        }
        this.massaLabel.string = this.massa.toString();
    },
    onBtnDiminuirClicked: function onBtnDiminuirClicked(massa) {
        if (this.massa < 1) {
            this.massa = 1;
        } else {
            this.massa -= 1;
        }
        this.massaLabel.string = this.massa.toString();
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
        //# sourceMappingURL=BotaoEvento.js.map
        