// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        planeta: {
            default: null,
            type: cc.Node
        },
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad: function () {
    },

    lancamentoTerra: function(){
        cc.director.loadScene('TelaDeResultadoTerra')
    },

    lancamentoTerraOrbita: function(){
        cc.director.loadScene('TelaDeResultadoTerraOrbita')
    },

    lancamentoTerraExcessiva: function(){
        cc.director.loadScene('TelaDeResultadoTerraExcessiva')
    },

    lancamentoMarte: function(){
        cc.director.loadScene('TelaDeResultadoMarte')
    },

    lancamentoMarteOrbita: function(){
        cc.director.loadScene('TelaDeResultadoMarteOrbita')
    },

    lancamentoMarteExcessiva: function(){
        cc.director.loadScene('TelaDeResultadoMarteExcessiva')
    },
});
