cc.Class({
    extends: cc.Component,

    properties: {
        buttonAumentar: {
            default: null,
            type: cc.Button
        },
        buttonDiminuir:{
            default: null,
            type: cc.Button
        },
        massaLabel:{
            default: null,
            type: cc.Label
        },

        massa: 1,
    },

    onLoad(){
        this.massa = this.massaLabel.string.toInt();
        this.onBtnAumentarClicked(this.massa);
        this.onBtnDiminuirClicked(this.massa);
    },

    onBtnAumentarClicked(massa) {
        if(this.massa > 20){
            this.massa = 1
        }
        else{
            this.massa +=1
        }
        this.massaLabel.string = this.massa.toString();

        
    },

    onBtnDiminuirClicked(massa) {
        if(this.massa < 1){
            this.massa = 1
        }
        else{
            this.massa -=1
        }
        this.massaLabel.string = this.massa.toString();

       
    },
});

