cc.Class({
    extends: cc.Component,

    properties: {
        terra: {
            default: null,
            type: cc.Button
        },
        marte: {
            default: null,
            type: cc.Button
        },
        venus: {
            default: null,
            type: cc.Button
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

    onTerraActivated: function(){
        cc.director.loadScene('LancamentoTerra')

    },

    onMarteActivated:function(){

    },

    onVenusActivated:function(){

    },
});