(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/BotaoEvento.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fa2cfXAGm1AYIEFC8dbJnoD', 'BotaoEvento', __filename);
// Scripts/BotaoEvento.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        buttonAumentar: cc.Button,
        buttonDiminuir: cc.Button,
        massaLabel: cc.Label
    },

    onBtnAumentarClicked: function onBtnAumentarClicked() {
        this.massaLabel.setString(ParseInt(this.massa += 1));
        if (this.massa > 20) {
            this.massaLabel.setString(ParseInt(this.massa = 1));
        }
        this.massaLabel.toString = this.massa;
        return;
    },

    onBtnDiminuirClicked: function onBtnDiminuirClicked() {
        this.massaLabel.setString(ParseInt(this.massa -= 1));
        if (this.massa < 1) {
            this.massaLabel.setString(ParseInt(this.massa = 1));
        }
        this.massaLabel.toString = this.massa;
        return;
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
        