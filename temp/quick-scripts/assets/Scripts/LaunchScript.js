(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/LaunchScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '06d48UYQW1MWYlNHzACB0vv', 'LaunchScript', __filename);
// Scripts/LaunchScript.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        massaText: {
            default: null,
            type: cc.Label
        },

        VelociadeInsuf: {
            default: null,
            type: cc.Node
        },

        VelocidadeKms: {
            default: null,
            type: cc.Label
        },

        LaunchButton: {
            default: null,
            type: cc.Button
        },
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        RaioPlaneta: 5.98 * Math.pow(10, 24),
        MassaPlaneta: 6.3781 * Math.pow(10, 6),
        erro: 1,
        G: 6.673e-11
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.VelociadeInsuf.active = false;
    },

    onLaunchActivated: function onLaunchActivated() {
        this.massadofoguete = this.massaText.string;
        this.velocidadedofoguete = parseInt(this.VelocidadeKms.string);
        //this.vescape = (2 * this.G * this.MassaPlaneta)/this.RaioPlaneta;
        //this.vorbita = this.vescape/2;
        //this.vescape = Math.sqrt(this.vescape)/1000;
        //this.vorbita = Math.sqrt(this.vorbita)/1000;
        this.vorbita = 7.81;
        this.vescape = 11.2;

        //this.Resultado.string = this.velocidadedofoguete + 'km/s';
        if (this.velocidadedofoguete >= this.vescape - this.erro && this.velocidadedofoguete <= this.vescape + this.erro) {
            //this.Resultado.string = ("Lançamento com velocidade suficiente para escapar da órbita. Muito bem!");
            cc.director.loadScene('TerraAnim');
            //cc.director.loadScene('TelaDeResultadoTerra');
        } else if (this.velocidadedofoguete > this.vescape + this.erro) {
            //this.Resultado.string = ("Lançamento com velocidade excessiva, gasto desnecessário de combustível");
            cc.director.loadScene('TerraAnimExcessiva');
            //cc.director.loadScene('TelaDeResultadoTerraExcessiva');
        } else if (this.velocidadedofoguete < this.vorbita) {
            this.VelociadeInsuf.active = true;
        } else if (this.velocidadedofoguete >= this.vorbita && this.velocidadedofoguete < this.vescape) {
            //this.Resultado.string = ('Lançamento com velocidade mínima de órbita, o foguete entra na órbita do Planeta');
            cc.director.loadScene('TerraAnimOrbita');
        };
    },

    onMarteLaunchActivated: function onMarteLaunchActivated() {
        this.massadofoguete = this.massaText.string;
        this.velocidadedofoguete = parseInt(this.VelocidadeKms.string);
        //this.vescape = (2 * this.G * this.MassaPlaneta)/this.RaioPlaneta;
        //this.vorbita = this.vescape/2;
        //this.vescape = Math.sqrt(this.vescape)/1000;
        //this.vorbita = Math.sqrt(this.vorbita)/1000;
        this.vorbitam = 3;
        this.vescapem = 5;

        //this.Resultado.string = this.velocidadedofoguete + 'km/s';
        if (this.velocidadedofoguete >= this.vescapem - this.erro && this.velocidadedofoguete <= this.vescapem + this.erro) {
            //this.Resultado.string = ("Lançamento com velocidade suficiente para escapar da órbita. Muito bem!");
            cc.director.loadScene('MarteAnim');
        } else if (this.velocidadedofoguete > this.vescapem + this.erro) {
            //this.Resultado.string = ("Lançamento com velocidade excessiva, gasto desnecessário de combustível");
            cc.director.loadScene('MarteAnimExcessiva');
        } else if (this.velocidadedofoguete < this.vorbitam) {
            this.VelociadeInsuf.active = true;
        } else if (this.velocidadedofoguete >= this.vorbitam && this.velocidadedofoguete < this.vescapem) {
            //this.Resultado.string = ('Lançamento com velocidade mínima de órbita, o foguete entra na órbita do Planeta');
            cc.director.loadScene('MarteAnimOrbita');
        };
    }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=LaunchScript.js.map
        