cc.Class({
    extends: cc.Component,

    properties: {

        aumentar: cc.Button,
        massaText: cc.Label
    },

    onLoad: function(){
    },

    onButtonClick : function()
    {
        this.massa = this.massaText.string.parseInt();
        this.massa += 1;
        this.massaText.string = this.massa.toString();
    }
});