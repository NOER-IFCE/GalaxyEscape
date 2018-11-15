cc.Class({
    extends: cc.Component,

    properties: {
        //declaração de nodes/variáveis.
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
        massa: 1,

        guias: {
            default: null,
            type: cc.Node
        },

        abrir: {
            default: null,
            type: cc.Button
        },

        fechar: {
            default: null,
            type: cc.Button
        },

        fecharResult: {
            default: null,
            type: cc.Button
        },
        ResultadoVelocInsuf: {
            default: null,
            type: cc.Node
        },

        instrucao: {
            default: null,
            type: cc.Node
        },
        instrucaofechar: {
            default: null,
            type: cc.Button
        },
        retornar: {
            default: null,
            type: cc.Button
        },

        
    },
    //função de inicialização a aba guias e resultadovelocinsuf iniciam desabilitadas.
    onLoad: function(){
        this.guias.active = false;
        this.ResultadoVelocInsuf.active = false;
    },

    //incrementador adiciona +1 a variável
    onAddButtonClick : function()
    {
        this.massa += 1;
        if(this.massa > 20){
            this.massa = 20;
            this.massaText.string = this.massa.toString();
        }
        else{
            this.massaText.string = this.massa.toString();
        }
        
    },
    //decrementador remove -1 da variável massa
    onRemoveButtonClick : function()
    {
        this.massa -= 1;
        if(this.massa < 1){
            this.massa = 1;
            this.massaText.string = this.massa.toString();
        }
        else{
            this.massaText.string = this.massa.toString();
        }
    },

    //ativar a aba guia
    onGuiaButtonClick : function(){
        this.guias.active = true;
    },

    //desativar aba guia
    onGuiaHideButtonClick : function(){
        this.guias.active = false;
    },

    //desativar aba instrução
    onInstrucaoHideButtonClick : function(){
        this.instrucao.active = false;
    },

    //botão para retornar a tela dos planetas
    onReturnButtonClick : function(){
        cc.director.loadScene('TelaPlanetas');
    },

    //botão para fechar aba de aviso de velocidade insuficiente
    onFecharResultClick : function(){
        this.ResultadoVelocInsuf.active = false;
    }
});