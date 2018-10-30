"use strict";
cc._RF.push(module, 'fa2cfXAGm1AYIEFC8dbJnoD', 'ButtonCtrl');
// Scripts/ButtonCtrl.js

'use strict';

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
        }

    },

    onLoad: function onLoad() {
        this.guias.active = false;
        this.ResultadoVelocInsuf.active = false;
    },

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
    },

    onGuiaButtonClick: function onGuiaButtonClick() {
        this.guias.active = true;
    },

    onGuiaHideButtonClick: function onGuiaHideButtonClick() {
        this.guias.active = false;
    },

    onInstrucaoHideButtonClick: function onInstrucaoHideButtonClick() {
        this.instrucao.active = false;
    },

    onReturnButtonClick: function onReturnButtonClick() {
        cc.director.loadScene('TelaPlanetas');
    },

    onFecharResultClick: function onFecharResultClick() {
        this.ResultadoVelocInsuf.active = false;
    }
});

cc._RF.pop();