window.__require = function t(e, c, o) {
function n(i, s) {
if (!c[i]) {
if (!e[i]) {
var u = i.split("/");
u = u[u.length - 1];
if (!e[u]) {
var l = "function" == typeof __require && __require;
if (!s && l) return l(u, !0);
if (a) return a(u, !0);
throw new Error("Cannot find module '" + i + "'");
}
}
var r = c[i] = {
exports: {}
};
e[i][0].call(r.exports, function(t) {
return n(e[i][1][t] || t);
}, r, r.exports, t, e, c, o);
}
return c[i].exports;
}
for (var a = "function" == typeof __require && __require, i = 0; i < o.length; i++) n(o[i]);
return n;
}({
AudioMain: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "9de8clBNmxCrrRW03TX2wUY", "AudioMain");
cc.Class({
extends: cc.Component,
properties: {
audioSource: {
default: null,
type: cc.AudioSource
}
},
onLoad: function() {},
play: function() {
this.audioSource.play();
}
});
cc._RF.pop();
}, {} ],
AudioPlanetas: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "c65f4PGVlVMTImVzfUWATRO", "AudioPlanetas");
cc.Class({
extends: cc.Component,
properties: {
audioSource: {
type: cc.AudioSource,
default: null
}
},
onLoad: function() {},
update: function() {
this.audioSource;
},
play: function() {
this.audioSource.play();
},
pause: function() {
this.audioSource.pause();
},
stop: function() {
this.audioSource.stop();
},
resume: function() {
this.audioSource.resume();
}
});
cc._RF.pop();
}, {} ],
ButtonCtrl: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "fa2cfXAGm1AYIEFC8dbJnoD", "ButtonCtrl");
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
onLoad: function() {
this.guias.active = !1;
this.ResultadoVelocInsuf.active = !1;
},
onAddButtonClick: function() {
this.massa += 1;
if (this.massa > 20) {
this.massa = 20;
this.massaText.string = this.massa.toString();
} else this.massaText.string = this.massa.toString();
},
onRemoveButtonClick: function() {
this.massa -= 1;
if (this.massa < 1) {
this.massa = 1;
this.massaText.string = this.massa.toString();
} else this.massaText.string = this.massa.toString();
},
onGuiaButtonClick: function() {
this.guias.active = !0;
},
onGuiaHideButtonClick: function() {
this.guias.active = !1;
},
onInstrucaoHideButtonClick: function() {
this.instrucao.active = !1;
},
onReturnButtonClick: function() {
cc.director.loadScene("TelaPlanetas");
},
onFecharResultClick: function() {
this.ResultadoVelocInsuf.active = !1;
}
});
cc._RF.pop();
}, {} ],
FogueteAnim: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "04ae8euMj9F7L85itpieY+l", "FogueteAnim");
cc.Class({
extends: cc.Component,
properties: {
planeta: {
default: null,
type: cc.Node
}
},
onLoad: function() {},
lancamentoTerra: function() {
cc.director.loadScene("TelaDeResultadoTerra");
},
lancamentoTerraOrbita: function() {
cc.director.loadScene("TelaDeResultadoTerraOrbita");
},
lancamentoTerraExcessiva: function() {
cc.director.loadScene("TelaDeResultadoTerraExcessiva");
},
lancamentoMarte: function() {
cc.director.loadScene("TelaDeResultadoMarte");
},
lancamentoMarteOrbita: function() {
cc.director.loadScene("TelaDeResultadoMarteOrbita");
},
lancamentoMarteExcessiva: function() {
cc.director.loadScene("TelaDeResultadoMarteExcessiva");
}
});
cc._RF.pop();
}, {} ],
LaunchScript: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "06d48UYQW1MWYlNHzACB0vv", "LaunchScript");
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
RaioPlaneta: 5.98 * Math.pow(10, 24),
MassaPlaneta: 6.3781 * Math.pow(10, 6),
erro: 1,
G: 6.673e-11
},
onLoad: function() {
this.VelociadeInsuf.active = !1;
},
onLaunchActivated: function() {
this.massadofoguete = this.massaText.string;
this.velocidadedofoguete = parseInt(this.VelocidadeKms.string);
this.vorbita = 7.81;
this.vescape = 11.2;
this.velocidadedofoguete >= this.vescape - this.erro && this.velocidadedofoguete <= this.vescape + this.erro ? cc.director.loadScene("TerraAnim") : this.velocidadedofoguete > this.vescape + this.erro ? cc.director.loadScene("TerraAnimExcessiva") : this.velocidadedofoguete < this.vorbita ? this.VelociadeInsuf.active = !0 : this.velocidadedofoguete >= this.vorbita && this.velocidadedofoguete < this.vescape && cc.director.loadScene("TerraAnimOrbita");
},
onMarteLaunchActivated: function() {
this.massadofoguete = this.massaText.string;
this.velocidadedofoguete = parseInt(this.VelocidadeKms.string);
this.vorbitam = 3;
this.vescapem = 5;
this.velocidadedofoguete >= this.vescapem - this.erro && this.velocidadedofoguete <= this.vescapem + this.erro ? cc.director.loadScene("MarteAnim") : this.velocidadedofoguete > this.vescapem + this.erro ? cc.director.loadScene("MarteAnimExcessiva") : this.velocidadedofoguete < this.vorbitam ? this.VelociadeInsuf.active = !0 : this.velocidadedofoguete >= this.vorbitam && this.velocidadedofoguete < this.vescapem && cc.director.loadScene("MarteAnimOrbita");
}
});
cc._RF.pop();
}, {} ],
MenuCtrl: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "dfd99H/VBlMXI/2kgAWZlsc", "MenuCtrl");
cc.Class({
extends: cc.Component,
properties: {
iniciar: {
default: null,
type: cc.Button
},
creditos: {
default: null,
type: cc.Button
},
ajustes: {
default: null,
type: cc.Button
},
closecred: {
default: null,
type: cc.Button
},
onmusic: {
default: null,
type: cc.Button
},
offmusic: {
default: null,
type: cc.Button
},
abacred: {
default: null,
type: cc.Node
},
guiaaluno: {
default: null,
type: cc.Button
},
musica: {
default: null,
type: cc.AudioSource
},
guiaprofessor: {
default: null,
type: cc.Button
}
},
onLoad: function() {
this.abacred.active = !1;
},
onStartActivated: function() {
cc.director.loadScene("TelaPlanetas");
},
onCreditosActivated: function() {
this.abacred.active = !0;
},
onAjustesActivated: function() {},
onClosecredActivated: function() {
this.abacred.active = !1;
},
onGuiaAlunoActivated: function() {
cc.sys.openURL("https://drive.google.com/open?id=1Y8zqv9yPHJSZ6lQjtFvYeKoMEZFWljHE");
},
onGuiaProfessorActivated: function() {
cc.sys.openURL("https://drive.google.com/open?id=16JPi1OeF4Rg-slXwVU92UFQ84yyHMZFk");
}
});
cc._RF.pop();
}, {} ],
PlanetCtrl: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "0d867hFYkRFSKLLQH1nVBCw", "PlanetCtrl");
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
retornar: {
default: null,
type: cc.Button
},
video: {
default: null,
type: cc.Button
}
},
onTerraActivated: function() {
cc.director.loadScene("LancamentoTerra");
},
onMarteActivated: function() {
cc.director.loadScene("LancamentoMarte");
},
onVenusActivated: function() {},
onRetornarActivated: function() {
cc.director.loadScene("CenaPrincipal");
},
onVideoActivated: function() {
cc.sys.openURL("https://youtu.be/lnFtztH3Vk4");
}
});
cc._RF.pop();
}, {} ],
ResultCtrl: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "42628jLCFVH4pht1By+nDdM", "ResultCtrl");
cc.Class({
extends: cc.Component,
properties: {
label: {
default: null,
type: cc.Label
}
},
onLoad: function() {}
});
cc._RF.pop();
}, {} ],
SliderCtrl: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "da4ffha8kZNXYgkJtHiwHng", "SliderCtrl");
cc.Class({
extends: cc.Component,
properties: {
slider: {
default: null,
type: cc.Slider
},
VelocidadeKms: {
default: null,
type: cc.Label
},
velocidade: 0
},
onLoad: function() {
this.slider.progress = .5;
this._updateVelocidade(this.slider.progress);
},
_updateVelocidade: function(t, e) {
this.velocidade = Math.floor(255 * t / 8);
this.VelocidadeKms.string = this.velocidade.toString();
},
OnSliderEvent: function(t, e) {
this._updateVelocidade(t.progress);
}
});
cc._RF.pop();
}, {} ],
btn_martevoltar: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "9b256FzmltF/4xSmtQIucX1", "btn_martevoltar");
cc.Class({
extends: cc.Component,
properties: {
voltarmarte: {
default: null,
type: cc.Button
}
},
onReturnMarteActivated: function() {
cc.director.loadScene("LancamentoMarte");
}
});
cc._RF.pop();
}, {} ],
btn_play: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "5e5960LNpRHFoDvVLr0wx8G", "btn_play");
cc.Class({
extends: cc.Component,
properties: {
text: {
default: "",
multiline: !0
}
},
onLoad: function() {
this.node.on("mousedown", function(t) {
cc.director.loadScene("TelaPlanetas");
});
}
});
cc._RF.pop();
}, {} ],
btn_terra: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "9bf28D6m+ZF1Ky+mkQVZfXZ", "btn_terra");
cc.Class({
extends: cc.Component,
properties: {
text: {
default: "",
multiline: !0
}
},
onLoad: function() {
this.node.on("mousedown", function(t) {
cc.director.loadScene("LancamentoTerra");
});
}
});
cc._RF.pop();
}, {} ],
btn_voltar: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "b5c12RbUohH/7GIiHzfgpIp", "btn_voltar");
cc.Class({
extends: cc.Component,
properties: {
voltar: {
default: null,
type: cc.Button
}
},
onReturnActivated: function() {
cc.director.loadScene("LancamentoTerra");
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "AudioMain", "AudioPlanetas", "ButtonCtrl", "FogueteAnim", "LaunchScript", "MenuCtrl", "PlanetCtrl", "ResultCtrl", "SliderCtrl", "btn_martevoltar", "btn_play", "btn_terra", "btn_voltar" ]);