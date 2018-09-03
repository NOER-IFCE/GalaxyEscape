cc.Class({
    extends: cc.Component,

    properties: {
        buttonAumentar : cc.Button,
        buttonDiminuir : cc.Button,
        massaLabel: cc.Label
    },

    onBtnAumentarClicked: function() {
        this.massaLabel.setString(ParseInt(this.massa += 1))
        if(this.massa > 20){
            this.massaLabel.setString(ParseInt(this.massa = 1))
        }
        this.massaLabel.toString = this.massa;
        return
    },

    onBtnDiminuirClicked: function() {
        this.massaLabel.setString(ParseInt(this.massa -= 1))
        if(this.massa < 1){
            this.massaLabel.setString(ParseInt(this.massa = 1))
        }
        this.massaLabel.toString = this.massa;
        return
    },
});

