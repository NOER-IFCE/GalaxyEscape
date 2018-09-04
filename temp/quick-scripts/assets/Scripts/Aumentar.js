(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Aumentar.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fa2cfXAGm1AYIEFC8dbJnoD', 'Aumentar', __filename);
// Scripts/Aumentar.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {

        aumentar: cc.Button,
        massaText: cc.Label
    },

    onLoad: function onLoad() {},

    onButtonClick: function onButtonClick() {
        this.massa = this.massaText.string.parseInt();
        this.massa += 1;
        this.massaText.string = this.massa.toString();
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
        //# sourceMappingURL=Aumentar.js.map
        