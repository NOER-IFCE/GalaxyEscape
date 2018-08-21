cc.Class({
    extends: cc.Component,

    properties: {
        text: {
            default: '',
            multiline: true
        }
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

    // use this for initialization
    onLoad: function () {
        this.node.on('mousedown', function(event){
            cc.director.loadScene('TelaPlanetas');
        });
        
    },

    // called every frame
    // update: function (dt) {

    // },
});
