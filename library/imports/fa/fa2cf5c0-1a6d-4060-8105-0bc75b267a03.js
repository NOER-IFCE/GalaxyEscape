"use strict";
cc._RF.push(module, 'fa2cfXAGm1AYIEFC8dbJnoD', 'BotaoEvento');
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