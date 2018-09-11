cc.Class({
    extends: cc.Component,

    properties: {
        massaText: {
            default: null,
            type: cc.Label
        },
        Resultado:  {
            default: null,
            type: cc.Label
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
        RaioPlaneta: 5.98 * Math.pow(10,24),
        MassaPlaneta: 6.3781 * Math.pow(10,6),
        erro: 1,
        G: 6.673e-11,
    },

    // use this for initialization
    onLoad: function () {

    },
    
    onLaunchActivated: function(){
        this.massadofoguete = (this.massaText.string);
        this.velocidadedofoguete = parseInt(this.VelocidadeKms.string);
        //this.vescape = (2 * this.G * this.MassaPlaneta)/this.RaioPlaneta;
        //this.vorbita = this.vescape/2;
        //this.vescape = Math.sqrt(this.vescape)/1000;
        //this.vorbita = Math.sqrt(this.vorbita)/1000;
        this.vorbita = 7.81
        this.vescape = 11.2

        //this.Resultado.string = this.velocidadedofoguete + 'km/s';
        if(this.velocidadedofoguete >= this.vescape - this.erro && this.velocidadedofoguete <= this.vescape + this.erro){
            //this.Resultado.string = ("Lançamento com velocidade suficiente para escapar da órbita. Muito bem!");
            cc.director.loadScene('TelaDeResultadoTerra');

        }else if(this.velocidadedofoguete > this.vescape + this.erro){
            //this.Resultado.string = ("Lançamento com velocidade excessiva, gasto desnecessário de combustível");
            cc.director.loadScene('TelaDeResultadoTerra');

        }else if(this.velocidadedofoguete < this.vorbita){
            this.Resultado.string = ('Lançamento com velocidade inferior à velocidade de órbita, Abortar missão! Retornar à base!');

        }else if(this.velocidadedofoguete >= this.vorbita && this.velocidadedofoguete < this.vescape){
            //this.Resultado.string = ('Lançamento com velocidade mínima de órbita, o foguete entra na órbita do Planeta');
            cc.director.loadScene('TelaDeResultadoTerraOrbita');

        };

        },

        
});
