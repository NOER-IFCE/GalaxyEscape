__require = function t(e, o, s) {
function a(n, c) {
if (!o[n]) {
if (!e[n]) {
var r = n.split("/");
r = r[r.length - 1];
if (!e[r]) {
var l = "function" == typeof __require && __require;
if (!c && l) return l(r, !0);
if (i) return i(r, !0);
throw new Error("Cannot find module '" + n + "'");
}
}
var d = o[n] = {
exports: {}
};
e[n][0].call(d.exports, function(t) {
return a(e[n][1][t] || t);
}, d, d.exports, t, e, o, s);
}
return o[n].exports;
}
for (var i = "function" == typeof __require && __require, n = 0; n < s.length; n++) a(s[n]);
return a;
}({
ButtonCtrl: [ function(t, e, o) {
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
massa: 1
},
onLoad: function() {},
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
}
});
cc._RF.pop();
}, {} ],
LaunchScript: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "06d48UYQW1MWYlNHzACB0vv", "LaunchScript");
cc.Class({
extends: cc.Component,
properties: {
massaText: {
default: null,
type: cc.Label
},
Resultado: {
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
RaioPlaneta: 5.98 * Math.pow(10, 24),
MassaPlaneta: 6.3781 * Math.pow(10, 6),
erro: 1,
G: 6.673e-11
},
onLoad: function() {},
onLaunchActivated: function() {
this.massadofoguete = this.massaText.string;
this.velocidadedofoguete = parseInt(this.VelocidadeKms.string);
this.vorbita = 7.81;
this.vescape = 42.1;
if (this.velocidadedofoguete >= this.vescape - this.erro && this.velocidadedofoguete <= this.vescape + this.erro) {
this.Resultado.string = "Lançamento com velocidade suficiente para escapar da órbita. Muito bem!";
cc.director.loadScene("TelaDeResultadoTerra");
} else if (this.velocidadedofoguete > this.vescape + this.erro) {
this.Resultado.string = "Lançamento com velocidade excessiva, gasto desnecessário de combustível";
cc.director.loadScene("TelaDeResultadoTerra");
} else if (this.velocidadedofoguete < this.vorbita) this.Resultado.string = "Lançamento com velocidade inferior à velocidade de órbita, Abortar missão! Retornar à base!"; else if (this.velocidadedofoguete >= this.vorbita && this.velocidadedofoguete < this.vescape) {
this.Resultado.string = "Lançamento com velocidade mínima de órbita, o foguete entra na órbita do Planeta";
cc.director.loadScene("TelaDeResultadoTerraOrbita");
}
}
});
cc._RF.pop();
}, {} ],
ResultCtrl: [ function(t, e, o) {
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
SliderCtrl: [ function(t, e, o) {
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
this.velocidade = Math.floor(255 * t / 4);
this.VelocidadeKms.string = this.velocidade.toString();
},
OnSliderEvent: function(t, e) {
this._updateVelocidade(t.progress);
}
});
cc._RF.pop();
}, {} ],
btn_play: [ function(t, e, o) {
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
btn_terra: [ function(t, e, o) {
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
btn_voltar: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "b5c12RbUohH/7GIiHzfgpIp", "btn_voltar");
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
}, {} ]
}, {}, [ "ButtonCtrl", "LaunchScript", "ResultCtrl", "SliderCtrl", "btn_play", "btn_terra", "btn_voltar" ]);