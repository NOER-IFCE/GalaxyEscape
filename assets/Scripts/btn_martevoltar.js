cc.Class({
    extends: cc.Component,

    properties: {
        voltarmarte: {
            default: null,
            type: cc.Button
        },
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    
    onReturnMarteActivated:function(){
        cc.director.loadScene('LancamentoMarte')
    },

    // called every frame
    // update: function (dt) {

    // },
});