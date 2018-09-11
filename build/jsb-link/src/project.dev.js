window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  ButtonCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fa2cfXAGm1AYIEFC8dbJnoD", "ButtonCtrl");
    "use strict";
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
      onLoad: function onLoad() {},
      onAddButtonClick: function onAddButtonClick() {
        this.massa += 1;
        if (this.massa > 20) {
          this.massa = 20;
          this.massaText.string = this.massa.toString();
        } else this.massaText.string = this.massa.toString();
      },
      onRemoveButtonClick: function onRemoveButtonClick() {
        this.massa -= 1;
        if (this.massa < 1) {
          this.massa = 1;
          this.massaText.string = this.massa.toString();
        } else this.massaText.string = this.massa.toString();
      }
    });
    cc._RF.pop();
  }, {} ],
  LaunchScript: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "06d48UYQW1MWYlNHzACB0vv", "LaunchScript");
    "use strict";
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
      onLoad: function onLoad() {},
      onLaunchActivated: function onLaunchActivated() {
        this.massadofoguete = this.massaText.string;
        this.velocidadedofoguete = parseInt(this.VelocidadeKms.string);
        this.vorbita = 7.81;
        this.vescape = 11.2;
        this.velocidadedofoguete >= this.vescape - this.erro && this.velocidadedofoguete <= this.vescape + this.erro ? cc.director.loadScene("TelaDeResultadoTerra") : this.velocidadedofoguete > this.vescape + this.erro ? cc.director.loadScene("TelaDeResultadoTerra") : this.velocidadedofoguete < this.vorbita ? this.Resultado.string = "Lan\xe7amento com velocidade inferior \xe0 velocidade de \xf3rbita, Abortar miss\xe3o! Retornar \xe0 base!" : this.velocidadedofoguete >= this.vorbita && this.velocidadedofoguete < this.vescape && cc.director.loadScene("TelaDeResultadoTerraOrbita");
      }
    });
    cc._RF.pop();
  }, {} ],
  ResultCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "42628jLCFVH4pht1By+nDdM", "ResultCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        label: {
          default: null,
          type: cc.Label
        }
      },
      onLoad: function onLoad() {}
    });
    cc._RF.pop();
  }, {} ],
  SliderCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "da4ffha8kZNXYgkJtHiwHng", "SliderCtrl");
    "use strict";
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
      onLoad: function onLoad() {
        this.slider.progress = .5;
        this._updateVelocidade(this.slider.progress);
      },
      _updateVelocidade: function _updateVelocidade(progress, VelocidadeKms) {
        this.velocidade = Math.floor(255 * progress / 4);
        this.VelocidadeKms.string = this.velocidade.toString();
      },
      OnSliderEvent: function OnSliderEvent(sender, eventType) {
        this._updateVelocidade(sender.progress);
      }
    });
    cc._RF.pop();
  }, {} ],
  btn_play: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5e5960LNpRHFoDvVLr0wx8G", "btn_play");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        text: {
          default: "",
          multiline: true
        }
      },
      onLoad: function onLoad() {
        this.node.on("mousedown", function(event) {
          cc.director.loadScene("TelaPlanetas");
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  btn_terra: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9bf28D6m+ZF1Ky+mkQVZfXZ", "btn_terra");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        text: {
          default: "",
          multiline: true
        }
      },
      onLoad: function onLoad() {
        this.node.on("mousedown", function(event) {
          cc.director.loadScene("LancamentoTerra");
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  btn_voltar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b5c12RbUohH/7GIiHzfgpIp", "btn_voltar");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        text: {
          default: "",
          multiline: true
        }
      },
      onLoad: function onLoad() {
        this.node.on("mousedown", function(event) {
          cc.director.loadScene("LancamentoTerra");
        });
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "ButtonCtrl", "LaunchScript", "ResultCtrl", "SliderCtrl", "btn_play", "btn_terra", "btn_voltar" ]);