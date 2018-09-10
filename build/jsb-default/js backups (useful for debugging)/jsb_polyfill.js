(function() {
(function(i, n, o) {
var r = "function" == ("object" === (e = typeof require) ? t(require) : e) && require;
function s(o, c) {
var a = n[o];
if (!a) {
var l = i[o];
if (!l) {
var h = "function" == ("object" === (e = typeof require) ? t(require) : e) && require;
if (!c && h) return h(o, !0);
if (r) return r(o, !0);
var u = new Error("Cannot find module '" + o + "'");
u.code = "MODULE_NOT_FOUND";
throw u;
}
var d = {};
a = n[o] = {
exports: d
};
l[0]((function(t) {
return s(l[1][t] || t);
}), a, d);
}
return a.exports;
}
for (var c = 0; c < o.length; c++) s(o[c]);
})({
1: [ (function(t, e, i) {}), {} ],
2: [ (function(t, e, i) {
var n = t("./cocos2d/core/platform/CCEnum");
cc.DebugMode = n({
NONE: 0,
INFO: 1,
WARN: 2,
ERROR: 3,
INFO_FOR_WEB_PAGE: 4,
WARN_FOR_WEB_PAGE: 5,
ERROR_FOR_WEB_PAGE: 6
});
cc._initDebugSetting = function(t) {
cc.log = cc.warn = cc.error = cc.assert = function() {};
if (t !== cc.DebugMode.NONE) {
if (console && console.log.apply) {
console.error || (console.error = console.log);
console.warn || (console.warn = console.log);
console.error.bind ? cc.error = console.error.bind(console) : cc.error = console.error;
cc.assert = function(t, e) {
if (!t) {
e && (e = cc.js.formatStr.apply(null, cc.js.shiftArguments.apply(null, arguments)));
0;
throw new Error(e);
}
};
}
t !== cc.DebugMode.ERROR && (console.warn.bind ? cc.warn = console.warn.bind(console) : cc.warn = console.warn);
if (t === cc.DebugMode.INFO) {
"JavaScriptCore" === scriptEngineType ? cc.log = function() {
return console.log.apply(console, arguments);
} : cc.log = console.log;
cc.info = "JavaScriptCore" === scriptEngineType ? function() {
(console.info || console.log).apply(console, arguments);
} : console.info || console.log;
}
}
};
cc._throw = function(t) {
var e = t.stack;
e ? cc.error(t + "\n" + e) : cc.error(t);
};
t("./DebugInfos");
var o = "https://github.com/cocos-creator/engine/blob/master/EngineErrorMap.md";
function r(t) {
return function() {
var e = arguments[0], i = t + " " + e + ", please go to " + o + "#" + e + " to see details.";
if (1 === arguments.length) return i;
if (2 === arguments.length) return i + " Arguments: " + arguments[1];
var n = cc.js.shiftArguments.apply(null, arguments);
return i + " Arguments: " + n.join(", ");
};
}
var s = r("Log");
cc.logID = function() {
cc.log(s.apply(null, arguments));
};
var c = r("Warning");
cc.warnID = function() {
cc.warn(c.apply(null, arguments));
};
var a = r("Error");
cc.errorID = function() {
cc.error(a.apply(null, arguments));
};
var l = r("Assert");
cc.assertID = function(t) {
"use strict";
t || cc.assert(!1, l.apply(null, cc.js.shiftArguments.apply(null, arguments)));
};
cc._getError = r("ERROR");
cc._initDebugSetting(cc.DebugMode.INFO);
}), {
"./DebugInfos": 1,
"./cocos2d/core/platform/CCEnum": 130
} ],
3: [ (function(i, n, o) {
var r = cc.js, s = i("./playable"), c = i("./animation-curves").DynamicAnimCurve, a = i("./animation-curves").quickFindIndex, l = i("./motion-path-helper").sampleMotionPaths, h = i("./animation-curves").EventAnimCurve, u = i("./animation-curves").EventInfo, d = i("./types").WrapModeMask, f = i("../core/utils/binary-search").binarySearchEpsilon;
function _(t, e) {
s.call(this);
this.target = t;
this.animation = e;
this._anims = new r.array.MutableForwardIterator([]);
}
r.extend(_, s);
var p = _.prototype;
p.playState = function(i, n) {
if (i.clip) {
i.curveLoaded || g(this.target, i);
i.animator = this;
i.play();
"number" === ("object" === (e = typeof n) ? t(n) : e) && i.setTime(n);
this.play();
}
};
p.stopStatesExcept = function(t) {
var e = this._anims, i = e.array;
for (e.i = 0; e.i < i.length; ++e.i) {
var n = i[e.i];
n !== t && this.stopState(n);
}
};
p.addAnimation = function(t) {
-1 === this._anims.array.indexOf(t) && this._anims.push(t);
t._setListeners(this.animation);
};
p.removeAnimation = function(t) {
var e = this._anims.array.indexOf(t);
if (e >= 0) {
this._anims.fastRemoveAt(e);
0 === this._anims.array.length && this.stop();
} else cc.errorID(3908);
t.animator = null;
};
p.sample = function() {
var t = this._anims, e = t.array;
for (t.i = 0; t.i < e.length; ++t.i) {
e[t.i].sample();
}
};
p.stopState = function(t) {
t && t.stop();
};
p.pauseState = function(t) {
t && t.pause();
};
p.resumeState = function(t) {
t && t.resume();
this.isPaused && this.resume();
};
p.setStateTime = function(t, e) {
if (void 0 !== e) {
if (t) {
t.setTime(e);
t.sample();
}
} else {
e = t;
for (var i = this._anims.array, n = 0; n < i.length; ++n) {
var o = i[n];
o.setTime(e);
o.sample();
}
}
};
p.onStop = function() {
var t = this._anims, e = t.array;
for (t.i = 0; t.i < e.length; ++t.i) {
e[t.i].stop();
}
};
p.onPause = function() {
for (var t = this._anims.array, e = 0; e < t.length; ++e) {
var i = t[e];
i.pause();
i.animator = null;
}
};
p.onResume = function() {
for (var t = this._anims.array, e = 0; e < t.length; ++e) {
var i = t[e];
i.animator = this;
i.resume();
}
};
p._reloadClip = function(t) {
g(this.target, t);
};
0;
function g(i, n) {
var o = n.clip, r = n.curves;
r.length = 0;
n.duration = o.duration;
n.speed = o.speed;
n.wrapMode = o.wrapMode;
n.frameRate = o.sample;
(n.wrapMode & d.Loop) === d.Loop ? n.repeatCount = Infinity : n.repeatCount = 1;
function s(t) {
if (!Array.isArray(t)) return !1;
for (var e = 0, i = t.length; e < i; e++) {
var n = t[e];
if (!Array.isArray(n) || 6 !== n.length) return !1;
}
return !0;
}
function _(i, r, h) {
var u, d = i instanceof cc.Node && "position" === r, _ = [], p = new c();
p.target = i;
var g = r.indexOf(".");
-1 !== g ? i[u = r.slice(0, g)] : u = r;
p.prop = u;
p.subProps = (function(t) {
var e = t.split(".");
e.shift();
return e.length > 0 ? e : null;
})(r);
for (var v = 0, y = h.length; v < y; v++) {
var m = h[v], C = m.frame / n.duration;
p.ratios.push(C);
if (d) {
var T = m.motionPath;
if (T && !s(T)) {
cc.errorID(3904, i.name, r, v);
T = null;
}
_.push(T);
}
var b = m.value;
p.values.push(b);
var S = m.curve;
if (S) {
if ("string" === ("object" === (e = typeof S) ? t(S) : e)) {
p.types.push(S);
continue;
}
if (Array.isArray(S)) {
S[0] === S[1] && S[2] === S[3] ? p.types.push(c.Linear) : p.types.push(c.Bezier(S));
continue;
}
}
p.types.push(c.Linear);
}
d && l(_, p, o.duration, o.sample);
for (var E, x, A = p.ratios, N = !0, O = 1, w = A.length; O < w; O++) {
E = A[O] - A[O - 1];
if (1 === O) x = E; else if (Math.abs(E - x) > 1e-6) {
N = !1;
break;
}
}
p._findFrameIndex = N ? a : f;
return p;
}
function p(t, e) {
var i = e.props, n = e.comps;
if (i) for (var o in i) {
var s = _(t, o, i[o]);
r.push(s);
}
if (n) for (var c in n) {
var a = t.getComponent(c);
if (a) {
var l = n[c];
for (var o in l) {
s = _(a, o, l[o]);
r.push(s);
}
}
}
}
var g = o.curveData, v = g.paths;
p(i, g);
for (var y in v) {
var m = cc.find(y, i);
if (m) {
p(m, v[y]);
}
}
var C = o.events;
if (C) for (var T, b = 0, S = C.length; b < S; b++) {
if (!T) {
(T = new h()).target = i;
r.push(T);
}
var E, x = C[b], A = x.frame / n.duration, N = f(T.ratios, A);
if (N >= 0) E = T.events[N]; else {
E = new u();
T.ratios.push(A);
T.events.push(E);
}
E.add(x.func, x.params);
}
}
0;
n.exports = _;
}), {
"../core/utils/binary-search": 152,
"./animation-curves": 5,
"./motion-path-helper": 11,
"./playable": 12,
"./types": 13
} ],
4: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.AnimationClip",
extends: cc.Asset,
properties: {
_duration: {
default: 0,
type: "Float"
},
duration: {
get: function() {
return this._duration;
}
},
sample: {
default: 60
},
speed: {
default: 1
},
wrapMode: {
default: cc.WrapMode.Normal
},
curveData: {
default: {},
visible: !1
},
events: {
default: [],
visible: !1
}
},
statics: {
createWithSpriteFrames: function(t, e) {
if (!Array.isArray(t)) {
cc.errorID(3905);
return null;
}
var i = new n();
i.sample = e || i.sample;
i._duration = t.length / i.sample;
for (var o = [], r = 1 / i.sample, s = 0, c = t.length; s < c; s++) o[s] = {
frame: s * r,
value: t[s]
};
i.curveData = {
comps: {
"cc.Sprite": {
spriteFrame: o
}
}
};
return i;
}
}
});
cc.AnimationClip = e.exports = n;
}), {} ],
5: [ (function(i, n, o) {
var r = i("./bezier").bezierByTime, s = i("../core/utils/binary-search").binarySearchEpsilon, c = i("./types").WrapModeMask, a = i("./types").WrappedInfo;
function l(i, n) {
if ("string" === ("object" === (e = typeof n) ? t(n) : e)) {
var o = cc.Easing[n];
o ? i = o(i) : cc.errorID(3906, n);
} else Array.isArray(n) && (i = r(n, i));
return i;
}
var h = cc.Class({
name: "cc.AnimCurve",
sample: function(t, e, i) {},
onTimeChangedManually: void 0
});
var u = cc.Class({
name: "cc.DynamicAnimCurve",
extends: h,
properties: {
target: null,
prop: "",
values: [],
ratios: [],
types: [],
subProps: null
},
_findFrameIndex: s,
sample: function(i, n, o) {
var r = this.values, s = this.ratios, c = s.length;
if (0 !== c) {
var a, h = this._findFrameIndex(s, n);
if (h < 0) if ((h = ~h) <= 0) a = r[0]; else if (h >= c) a = r[c - 1]; else {
var u = r[h - 1], d = "number" === ("object" === (e = typeof u) ? t(u) : e), f = u && u.lerp;
if (d || f) {
var _ = s[h - 1], p = s[h], g = this.types[h - 1], v = (n - _) / (p - _);
g && (v = l(v, g));
var y = r[h];
d ? a = u + (y - u) * v : f && (a = u.lerp(y, v));
} else a = u;
} else a = r[h];
var m = this.subProps;
if (m) {
for (var C = this.target[this.prop], T = C, b = 0; b < m.length - 1; b++) {
var S = m[b];
if (!T) return;
T = T[S];
}
var E = m[m.length - 1];
if (!T) return;
T[E] = a;
a = C;
}
this.target[this.prop] = a;
}
}
});
u.Linear = null;
u.Bezier = function(t) {
return t;
};
var d = function() {
this.events = [];
};
d.prototype.add = function(t, e) {
this.events.push({
func: t || "",
params: e || []
});
};
var f = cc.Class({
name: "cc.EventAnimCurve",
extends: h,
properties: {
target: null,
ratios: [],
events: [],
_wrappedInfo: {
default: function() {
return new a();
}
},
_lastWrappedInfo: null,
_ignoreIndex: NaN
},
_wrapIterations: function(t) {
t - (0 | t) == 0 && (t -= 1);
return 0 | t;
},
sample: function(t, e, i) {
var n = this.ratios.length, o = i.getWrappedInfo(i.time, this._wrappedInfo), r = o.direction, l = s(this.ratios, o.ratio);
if (l < 0) {
l = ~l - 1;
r < 0 && (l += 1);
}
this._ignoreIndex !== l && (this._ignoreIndex = NaN);
o.frameIndex = l;
if (this._lastWrappedInfo) {
var h = i.wrapMode, u = this._wrapIterations(o.iterations), d = this._lastWrappedInfo, f = this._wrapIterations(d.iterations), _ = d.frameIndex, p = d.direction, g = -1 !== f && u !== f;
if (_ === l && g && 1 === n) this._fireEvent(0); else if (_ !== l || g) {
r = p;
do {
if (_ !== l) {
if (-1 === r && 0 === _ && l > 0) {
(h & c.PingPong) === c.PingPong ? r *= -1 : _ = n;
f++;
} else if (1 === r && _ === n - 1 && l < n - 1) {
(h & c.PingPong) === c.PingPong ? r *= -1 : _ = -1;
f++;
}
if (_ === l) break;
if (f > u) break;
}
_ += r;
cc.director.getAnimationManager().pushDelayEvent(this, "_fireEvent", [ _ ]);
} while (_ !== l && _ > -1 && _ < n);
}
this._lastWrappedInfo.set(o);
} else {
this._fireEvent(l);
this._lastWrappedInfo = new a(o);
}
},
_fireEvent: function(t) {
if (!(t < 0 || t >= this.events.length || this._ignoreIndex === t)) {
var e = this.events[t].events;
if (this.target.isValid) for (var i = this.target._components, n = 0; n < e.length; n++) for (var o = e[n], r = o.func, s = 0; s < i.length; s++) {
var c = i[s], a = c[r];
a && a.apply(c, o.params);
}
}
},
onTimeChangedManually: function(t, e) {
this._lastWrappedInfo = null;
this._ignoreIndex = NaN;
var i = e.getWrappedInfo(t, this._wrappedInfo), n = i.direction, o = s(this.ratios, i.ratio);
if (o < 0) {
o = ~o - 1;
n < 0 && (o += 1);
this._ignoreIndex = o;
}
}
});
0;
n.exports = {
AnimCurve: h,
DynamicAnimCurve: u,
EventAnimCurve: f,
EventInfo: d,
computeRatioByType: l,
quickFindIndex: function(t, e) {
var i = t.length - 1;
if (0 === i) return 0;
var n = t[0];
if (e < n) return 0;
var o = t[i];
if (e > o) return i;
var r = (e = (e - n) / (o - n)) / (1 / i), s = 0 | r;
return r - s < 1e-6 ? s : ~(s + 1);
}
};
}), {
"../core/utils/binary-search": 152,
"./bezier": 8,
"./types": 13
} ],
6: [ (function(t, e, n) {
var o = cc.js, r = cc.Class({
ctor: function() {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this._anims = new o.array.MutableForwardIterator([]);
this._delayEvents = [];
},
update: function(t) {
var e = this._anims, n = e.array;
for (e.i = 0; e.i < n.length; ++e.i) {
var o = n[e.i];
o._isPlaying && !o._isPaused && o.update(t);
}
var r = this._delayEvents;
for (i = 0, l = r.length; i < l; i++) {
var s = r[i];
s.target[s.func].apply(s.target, s.args);
}
r.length = 0;
},
destruct: function() {},
addAnimation: function(t) {
-1 === this._anims.array.indexOf(t) && this._anims.push(t);
},
removeAnimation: function(t) {
var e = this._anims.array.indexOf(t);
e >= 0 ? this._anims.fastRemoveAt(e) : cc.errorID(3907);
},
pushDelayEvent: function(t, e, i) {
this._delayEvents.push({
target: t,
func: e,
args: i
});
}
});
cc.AnimationManager = e.exports = r;
}), {} ],
7: [ (function(t, e, i) {
var n = cc.js, o = t("./playable"), r = t("./types"), s = r.WrappedInfo, c = r.WrapMode, a = r.WrapModeMask;
function l(t, e) {
o.call(this);
cc.EventTarget.call(this);
this._currentFramePlayed = !1;
this._delay = 0;
this._delayTime = 0;
this._wrappedInfo = new s();
this._lastWrappedInfo = null;
this._process = u;
this._clip = t;
this._name = e || t && t.name;
this.animator = null;
this.curves = [];
this.delay = 0;
this.repeatCount = 1;
this.duration = 1;
this.speed = 1;
this.wrapMode = c.Normal;
this.time = 0;
this._emit = this.emit;
this.emit = function() {
for (var t = new Array(arguments.length), e = 0, i = t.length; e < i; e++) t[e] = arguments[e];
cc.director.getAnimationManager().pushDelayEvent(this, "_emit", t);
};
}
n.extend(l, o);
var h = l.prototype;
cc.js.mixin(h, cc.EventTarget.prototype);
h._setListeners = function(t) {
this._capturingListeners = t ? t._capturingListeners : null;
this._bubblingListeners = t ? t._bubblingListeners : null;
this._hasListenerCache = t ? t._hasListenerCache : null;
};
h.onPlay = function() {
this.setTime(0);
this._delayTime = this._delay;
cc.director.getAnimationManager().addAnimation(this);
this.animator && this.animator.addAnimation(this);
this.emit("play", this);
};
h.onStop = function() {
this.isPaused || cc.director.getAnimationManager().removeAnimation(this);
this.animator && this.animator.removeAnimation(this);
this.emit("stop", this);
};
h.onResume = function() {
cc.director.getAnimationManager().addAnimation(this);
this.emit("resume", this);
};
h.onPause = function() {
cc.director.getAnimationManager().removeAnimation(this);
this.emit("pause", this);
};
h.setTime = function(t) {
this._currentFramePlayed = !1;
this.time = t || 0;
for (var e = this.curves, i = 0, n = e.length; i < n; i++) {
var o = e[i];
o.onTimeChangedManually && o.onTimeChangedManually(t, this);
}
};
function u() {
var t = this.sample(), e = this._hasListenerCache;
if (e && e.lastframe) {
var i;
i = this._lastWrappedInfo ? this._lastWrappedInfo : this._lastWrappedInfo = new s(t);
this.repeatCount > 1 && (0 | t.iterations) > (0 | i.iterations) && this.emit("lastframe", this);
i.set(t);
}
if (t.stopped) {
this.stop();
this.emit("finished", this);
}
}
function d() {
var t = this.time, e = this.duration;
t > e ? 0 === (t %= e) && (t = e) : t < 0 && 0 !== (t %= e) && (t += e);
for (var i = t / e, n = this.curves, o = 0, r = n.length; o < r; o++) {
n[o].sample(t, i, this);
}
var s = this._hasListenerCache;
if (s && s.lastframe) {
void 0 === this._lastIterations && (this._lastIterations = i);
(this.time > 0 && this._lastIterations > i || this.time < 0 && this._lastIterations < i) && this.emit("lastframe", this);
this._lastIterations = i;
}
}
h.update = function(t) {
if (this._delayTime > 0) {
this._delayTime -= t;
if (this._delayTime > 0) return;
}
this._currentFramePlayed ? this.time += t * this.speed : this._currentFramePlayed = !0;
this._process();
};
h._needRevers = function(t) {
var e = this.wrapMode, i = !1;
if ((e & a.PingPong) === a.PingPong) {
t - (0 | t) == 0 && t > 0 && (t -= 1);
1 & t && (i = !i);
}
(e & a.Reverse) === a.Reverse && (i = !i);
return i;
};
h.getWrappedInfo = function(t, e) {
e = e || new s();
var i = !1, n = this.duration, o = this.repeatCount, r = t > 0 ? t / n : -t / n;
if (r >= o) {
r = o;
i = !0;
var c = o - (0 | o);
0 === c && (c = 1);
t = c * n * (t > 0 ? 1 : -1);
}
if (t > n) {
var l = t % n;
t = 0 === l ? n : l;
} else t < 0 && 0 !== (t %= n) && (t += n);
var h = !1, u = this._wrapMode & a.ShouldWrap;
u && (h = this._needRevers(r));
var d = h ? -1 : 1;
this.speed < 0 && (d *= -1);
u && h && (t = n - t);
e.ratio = t / n;
e.time = t;
e.direction = d;
e.stopped = i;
e.iterations = r;
return e;
};
h.sample = function() {
for (var t = this.getWrappedInfo(this.time, this._wrappedInfo), e = this.curves, i = 0, n = e.length; i < n; i++) {
e[i].sample(t.time, t.ratio, this);
}
return t;
};
n.get(h, "clip", (function() {
return this._clip;
}));
n.get(h, "name", (function() {
return this._name;
}));
n.obsolete(h, "AnimationState.length", "duration");
n.getset(h, "curveLoaded", (function() {
return this.curves.length > 0;
}), (function() {
this.curves.length = 0;
}));
n.getset(h, "wrapMode", (function() {
return this._wrapMode;
}), (function(t) {
this._wrapMode = t;
0;
this.time = 0;
t & a.Loop ? this.repeatCount = Infinity : this.repeatCount = 1;
}));
n.getset(h, "repeatCount", (function() {
return this._repeatCount;
}), (function(t) {
this._repeatCount = t;
var e = this._wrapMode & a.ShouldWrap, i = (this.wrapMode & a.Reverse) === a.Reverse;
this._process = Infinity !== t || e || i ? u : d;
}));
n.getset(h, "delay", (function() {
return this._delay;
}), (function(t) {
this._delayTime = this._delay = t;
}));
cc.AnimationState = e.exports = l;
}), {
"./playable": 12,
"./types": 13
} ],
8: [ (function(t, e, i) {
function n(t, e, i, n, o) {
var r = 1 - o;
return t * r * r * r + 3 * e * r * r * o + 3 * i * r * o * o + n * o * o * o;
}
var o = Math.cos, r = Math.acos, s = Math.max, c = 2 * Math.PI, a = Math.sqrt;
function l(t) {
return t < 0 ? -Math.pow(-t, 1 / 3) : Math.pow(t, 1 / 3);
}
function h(t, e) {
var i = (function(t, e) {
var i, n, h, u, d = e - 0, f = e - t[0], _ = 3 * d, p = 3 * f, g = 3 * (e - t[2]), v = 1 / (-d + p - g + (e - 1)), y = (_ - 6 * f + g) * v, m = y * (1 / 3), C = (-_ + p) * v, T = 1 / 3 * (3 * C - y * y), b = T * (1 / 3), S = (2 * y * y * y - 9 * y * C + d * v * 27) / 27, E = S / 2, x = E * E + b * b * b;
if (x < 0) {
var A = 1 / 3 * -T, N = a(A * A * A), O = -S / (2 * N), w = r(O < -1 ? -1 : O > 1 ? 1 : O), I = 2 * l(N);
n = I * o(w * (1 / 3)) - m;
h = I * o((w + c) * (1 / 3)) - m;
u = I * o((w + 2 * c) * (1 / 3)) - m;
return 0 <= n && n <= 1 ? 0 <= h && h <= 1 ? 0 <= u && u <= 1 ? s(n, h, u) : s(n, h) : 0 <= u && u <= 1 ? s(n, u) : n : 0 <= h && h <= 1 ? 0 <= u && u <= 1 ? s(h, u) : h : u;
}
if (0 === x) {
h = -(i = E < 0 ? l(-E) : -l(E)) - m;
return 0 <= (n = 2 * i - m) && n <= 1 ? 0 <= h && h <= 1 ? s(n, h) : n : h;
}
var L = a(x);
return n = (i = l(-E + L)) - l(E + L) - m;
})(t, e), n = 1 - i;
return 0 * n * n * n + 3 * t[1] * i * n * n + 3 * t[3] * i * i * n + 1 * i * i * i;
}
0;
e.exports = {
bezier: n,
bezierByTime: h
};
}), {} ],
9: [ (function(t, e, i) {
var n = {
constant: function() {
return 0;
},
linear: function(t) {
return t;
},
quadIn: function(t) {
return t * t;
},
quadOut: function(t) {
return t * (2 - t);
},
quadInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);
},
cubicIn: function(t) {
return t * t * t;
},
cubicOut: function(t) {
return --t * t * t + 1;
},
cubicInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
},
quartIn: function(t) {
return t * t * t * t;
},
quartOut: function(t) {
return 1 - --t * t * t * t;
},
quartInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
},
quintIn: function(t) {
return t * t * t * t * t;
},
quintOut: function(t) {
return --t * t * t * t * t + 1;
},
quintInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
},
sineIn: function(t) {
return 1 - Math.cos(t * Math.PI / 2);
},
sineOut: function(t) {
return Math.sin(t * Math.PI / 2);
},
sineInOut: function(t) {
return .5 * (1 - Math.cos(Math.PI * t));
},
expoIn: function(t) {
return 0 === t ? 0 : Math.pow(1024, t - 1);
},
expoOut: function(t) {
return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
},
expoInOut: function(t) {
return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)));
},
circIn: function(t) {
return 1 - Math.sqrt(1 - t * t);
},
circOut: function(t) {
return Math.sqrt(1 - --t * t);
},
circInOut: function(t) {
return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
},
elasticIn: function(t) {
var e, i = .1;
if (0 === t) return 0;
if (1 === t) return 1;
if (!i || i < 1) {
i = 1;
e = .1;
} else e = .4 * Math.asin(1 / i) / (2 * Math.PI);
return -i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4);
},
elasticOut: function(t) {
var e, i = .1;
if (0 === t) return 0;
if (1 === t) return 1;
if (!i || i < 1) {
i = 1;
e = .1;
} else e = .4 * Math.asin(1 / i) / (2 * Math.PI);
return i * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / .4) + 1;
},
elasticInOut: function(t) {
var e, i = .1;
if (0 === t) return 0;
if (1 === t) return 1;
if (!i || i < 1) {
i = 1;
e = .1;
} else e = .4 * Math.asin(1 / i) / (2 * Math.PI);
return (t *= 2) < 1 ? i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * -.5 : i * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * .5 + 1;
},
backIn: function(t) {
var e = 1.70158;
return t * t * ((e + 1) * t - e);
},
backOut: function(t) {
var e = 1.70158;
return --t * t * ((e + 1) * t + e) + 1;
},
backInOut: function(t) {
var e = 2.5949095;
return (t *= 2) < 1 ? t * t * ((e + 1) * t - e) * .5 : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
},
bounceOut: function(t) {
return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
},
smooth: function(t) {
return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
},
fade: function(t) {
return t <= 0 ? 0 : t >= 1 ? 1 : t * t * t * (t * (6 * t - 15) + 10);
}
};
function o(t, e) {
return function(i) {
return i < .5 ? e(2 * i) / 2 : t(2 * i - 1) / 2 + .5;
};
}
n.quadOutIn = o(n.quadIn, n.quadOut);
n.cubicOutIn = o(n.cubicIn, n.cubicOut);
n.quartOutIn = o(n.quartIn, n.quartOut);
n.quintOutIn = o(n.quintIn, n.quintOut);
n.sineOutIn = o(n.sineIn, n.sineOut);
n.expoOutIn = o(n.expoIn, n.expoOut);
n.circOutIn = o(n.circIn, n.circOut);
n.backOutIn = o(n.backIn, n.backOut);
n.backOutIn = o(n.backIn, n.backOut);
n.bounceIn = function(t) {
return 1 - n.bounceOut(1 - t);
};
n.bounceInOut = function(t) {
return t < .5 ? .5 * n.bounceIn(2 * t) : .5 * n.bounceOut(2 * t - 1) + .5;
};
n.bounceOutIn = o(n.bounceIn, n.bounceOut);
cc.Easing = e.exports = n;
}), {} ],
10: [ (function(t, e, i) {
t("./bezier");
t("./easing");
t("./types");
t("./motion-path-helper");
t("./animation-curves");
t("./animation-clip");
t("./animation-manager");
t("./animation-state");
t("./animation-animator");
}), {
"./animation-animator": 3,
"./animation-clip": 4,
"./animation-curves": 5,
"./animation-manager": 6,
"./animation-state": 7,
"./bezier": 8,
"./easing": 9,
"./motion-path-helper": 11,
"./types": 13
} ],
11: [ (function(t, e, i) {
var n = t("./animation-curves").DynamicAnimCurve, o = t("./animation-curves").computeRatioByType, r = t("./bezier").bezier, s = t("../core/utils/binary-search").binarySearchEpsilon, c = cc.v2;
function a(t) {
this.points = t || [];
this.beziers = [];
this.ratios = [];
this.progresses = [];
this.length = 0;
this.computeBeziers();
}
a.prototype.computeBeziers = function() {
this.beziers.length = 0;
this.ratios.length = 0;
this.progresses.length = 0;
this.length = 0;
for (var t, e = 1; e < this.points.length; e++) {
var i = this.points[e - 1], n = this.points[e];
(t = new l()).start = i.pos;
t.startCtrlPoint = i.out;
t.end = n.pos;
t.endCtrlPoint = n.in;
this.beziers.push(t);
this.length += t.getLength();
}
var o = 0;
for (e = 0; e < this.beziers.length; e++) {
t = this.beziers[e];
this.ratios[e] = t.getLength() / this.length;
this.progresses[e] = o += this.ratios[e];
}
return this.beziers;
};
function l() {
this.start = c();
this.end = c();
this.startCtrlPoint = c();
this.endCtrlPoint = c();
}
l.prototype.getPointAt = function(t) {
var e = this.getUtoTmapping(t);
return this.getPoint(e);
};
l.prototype.getPoint = function(t) {
var e = r(this.start.x, this.startCtrlPoint.x, this.endCtrlPoint.x, this.end.x, t), i = r(this.start.y, this.startCtrlPoint.y, this.endCtrlPoint.y, this.end.y, t);
return new c(e, i);
};
l.prototype.getLength = function() {
var t = this.getLengths();
return t[t.length - 1];
};
l.prototype.getLengths = function(t) {
t || (t = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200);
if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1) return this.cacheArcLengths;
var e, i, n = [], o = this.getPoint(0), r = 0;
n.push(0);
for (i = 1; i <= t; i++) {
e = this.getPoint(i / t);
r += cc.pDistance(e, o);
n.push(r);
o = e;
}
this.cacheArcLengths = n;
return n;
};
l.prototype.getUtoTmapping = function(t, e) {
var i, n = this.getLengths(), o = 0, r = n.length;
i = e || t * n[r - 1];
for (var s, c = 0, a = r - 1; c <= a; ) if ((s = n[o = Math.floor(c + (a - c) / 2)] - i) < 0) c = o + 1; else {
if (!(s > 0)) {
a = o;
break;
}
a = o - 1;
}
if (n[o = a] === i) {
return o / (r - 1);
}
var l = n[o];
return (o + (i - l) / (n[o + 1] - l)) / (r - 1);
};
function h(t, e, i, r) {
function l(t) {
return t instanceof cc.Vec2 ? {
in: t,
pos: t,
out: t
} : Array.isArray(t) && 6 === t.length ? {
in: c(t[2], t[3]),
pos: c(t[0], t[1]),
out: c(t[4], t[5])
} : {
in: cc.Vec2.ZERO,
pos: cc.Vec2.ZERO,
out: cc.Vec2.ZERO
};
}
var h = e.values;
if (0 !== t.length && 0 !== h.length) if (1 !== (h = h.map((function(t) {
return c(t[0], t[1]);
}))).length) {
for (var u = e.types, d = e.ratios, f = e.values = [], _ = e.types = [], p = e.ratios = [], g = 0, v = n.Linear, y = 0, m = t.length; y < m - 1; y++) {
var C, T = t[y], b = d[y], S = d[y + 1] - b, E = h[y], x = h[y + 1], A = u[y], N = [], O = g / S, w = 1 / (S * i * r);
if (T && T.length > 0) {
var I = [];
I.push(l(E));
for (var L = 0, R = T.length; L < R; L++) {
var P = l(T[L]);
I.push(P);
}
I.push(l(x));
var D = new a(I);
D.computeBeziers();
for (var B = D.progresses; 1 - O > 1e-6; ) {
var M, F, z, j;
if ((C = o(C = O, A)) < 0) {
j = (0 - C) * (F = D.beziers[0]).getLength();
z = F.start.sub(F.endCtrlPoint).normalize();
M = F.start.add(z.mul(j));
} else if (C > 1) {
j = (C - 1) * (F = D.beziers[D.beziers.length - 1]).getLength();
z = F.end.sub(F.startCtrlPoint).normalize();
M = F.end.add(z.mul(j));
} else {
var V = s(B, C);
V < 0 && (V = ~V);
C -= V > 0 ? B[V - 1] : 0;
C /= D.ratios[V];
M = D.beziers[V].getPointAt(C);
}
N.push(M);
O += w;
}
} else for (;1 - O > 1e-6; ) {
C = o(C = O, A);
N.push(E.lerp(x, C));
O += w;
}
v = "constant" === A ? A : n.Linear;
for (L = 0, R = N.length; L < R; L++) {
var k = b + g + w * L * S;
G(N[L], v, k);
}
g = Math.abs(O - 1) > 1e-6 ? (O - 1) * S : 0;
}
d[d.length - 1] !== p[p.length - 1] && G(h[h.length - 1], v, d[d.length - 1]);
} else e.values = h;
function G(t, e, i) {
f.push(t);
_.push(e);
p.push(i);
}
}
0;
e.exports = {
sampleMotionPaths: h,
Curve: a,
Bezier: l
};
}), {
"../core/utils/binary-search": 152,
"./animation-curves": 5,
"./bezier": 8
} ],
12: [ (function(t, e, i) {
var n = cc.js;
function o() {
this._isPlaying = !1;
this._isPaused = !1;
this._stepOnce = !1;
}
var r = o.prototype;
n.get(r, "isPlaying", (function() {
return this._isPlaying;
}), !0);
n.get(r, "isPaused", (function() {
return this._isPaused;
}), !0);
var s = function() {};
r.onPlay = s;
r.onPause = s;
r.onResume = s;
r.onStop = s;
r.onError = s;
r.play = function() {
if (this._isPlaying) if (this._isPaused) {
this._isPaused = !1;
this.onResume();
} else this.onError(cc._getError(3912)); else {
this._isPlaying = !0;
this.onPlay();
}
};
r.stop = function() {
if (this._isPlaying) {
this._isPlaying = !1;
this.onStop();
this._isPaused = !1;
}
};
r.pause = function() {
if (this._isPlaying && !this._isPaused) {
this._isPaused = !0;
this.onPause();
}
};
r.resume = function() {
if (this._isPlaying && this._isPaused) {
this._isPaused = !1;
this.onResume();
}
};
r.step = function() {
this.pause();
this._stepOnce = !0;
this._isPlaying || this.play();
};
e.exports = o;
}), {} ],
13: [ (function(t, e, i) {
cc.js;
var n = {
Loop: 2,
ShouldWrap: 4,
PingPong: 22,
Reverse: 36
}, o = cc.Enum({
Default: 0,
Normal: 1,
Reverse: n.Reverse,
Loop: n.Loop,
LoopReverse: n.Loop | n.Reverse,
PingPong: n.PingPong,
PingPongReverse: n.PingPong | n.Reverse
});
cc.WrapMode = o;
function r(t) {
if (t) this.set(t); else {
this.ratio = 0;
this.time = 0;
this.direction = 1;
this.stopped = !0;
this.iterations = 0;
this.frameIndex = void 0;
}
}
r.prototype.set = function(t) {
this.ratio = t.ratio;
this.time = t.time;
this.direction = t.direction;
this.stopped = t.stopped;
this.iterations = t.iterations;
this.frameIndex = t.frameIndex;
};
e.exports = {
WrapModeMask: n,
WrapMode: o,
WrappedInfo: r
};
}), {} ],
14: [ (function(t, e, i) {
var n = cc.js;
i.removed = function(t) {
function e() {
cc.errorID(1403);
}
n.getset(t, "willPlayMusic", e, e);
};
i.deprecated = function(t) {
n.get(t, "rewindMusic", (function() {
cc.warnID(1400, "audioEngine.rewindMusic", "audioEngine.setCurrentTime");
return function() {
t.setCurrentTime(-1, 0);
return -1;
};
}));
n.get(t, "unloadEffect", (function() {
cc.warnID(1400, "audioEngine.unloadEffect", "audioEngine.stop");
return function(e) {
return t.stop(e);
};
}));
0;
};
}), {} ],
15: [ (function(i, n, o) {
"use strict";
var r = i("./utils/prefab-helper"), s = i("./utils/scene-graph-helper"), c = i("./event-manager"), a = cc.Object.Flags, l = a.Destroying, h = i("./utils/misc"), u = i("./event/event"), d = !!cc.ActionManager, f = function() {}, _ = cc.Enum({
TOUCH_START: "touchstart",
TOUCH_MOVE: "touchmove",
TOUCH_END: "touchend",
TOUCH_CANCEL: "touchcancel",
MOUSE_DOWN: "mousedown",
MOUSE_MOVE: "mousemove",
MOUSE_ENTER: "mouseenter",
MOUSE_LEAVE: "mouseleave",
MOUSE_UP: "mouseup",
MOUSE_WHEEL: "mousewheel"
}), p = [ _.TOUCH_START, _.TOUCH_MOVE, _.TOUCH_END, _.TOUCH_CANCEL ], g = [ _.MOUSE_DOWN, _.MOUSE_ENTER, _.MOUSE_MOVE, _.MOUSE_LEAVE, _.MOUSE_UP, _.MOUSE_WHEEL ], v = null, y = function(t, e) {
var i = t.getLocation(), n = this.owner;
if (n._hitTest(i, this)) {
(e = u.EventTouch.pool.get(e)).type = _.TOUCH_START;
e.touch = t;
e.bubbles = !0;
n.dispatchEvent(e);
e.touch = null;
e._touches = null;
u.EventTouch.pool.put(e);
return !0;
}
return !1;
}, m = function(t, e) {
e = u.EventTouch.pool.get(e);
var i = this.owner;
e.type = _.TOUCH_MOVE;
e.touch = t;
e.bubbles = !0;
i.dispatchEvent(e);
e.touch = null;
e._touches = null;
u.EventTouch.pool.put(e);
}, C = function(t, e) {
e = u.EventTouch.pool.get(e);
var i = t.getLocation(), n = this.owner;
n._hitTest(i, this) ? e.type = _.TOUCH_END : e.type = _.TOUCH_CANCEL;
e.touch = t;
e.bubbles = !0;
n.dispatchEvent(e);
e.touch = null;
e._touches = null;
u.EventTouch.pool.put(e);
}, T = function(t, e) {
e = u.EventTouch.pool.get(e);
t.getLocation();
var i = this.owner;
e.type = _.TOUCH_CANCEL;
e.touch = t;
e.bubbles = !0;
i.dispatchEvent(e);
e.touch = null;
e._touches = null;
u.EventTouch.pool.put(e);
}, b = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.stopPropagation();
(t = u.EventMouse.pool.get(t)).type = _.MOUSE_DOWN;
t.bubbles = !0;
i.dispatchEvent(t);
u.EventMouse.pool.put(t);
}
}, S = function(t) {
var e = t.getLocation(), i = this.owner, n = i._hitTest(e, this);
if (n || this._previousIn) {
t.stopPropagation();
t = u.EventMouse.pool.get(t);
}
if (n) {
if (!this._previousIn) {
if (v) {
t.type = _.MOUSE_LEAVE;
v.dispatchEvent(t);
v._mouseListener._previousIn = !1;
}
v = this.owner;
t.type = _.MOUSE_ENTER;
i.dispatchEvent(t);
this._previousIn = !0;
}
t.type = _.MOUSE_MOVE;
t.bubbles = !0;
i.dispatchEvent(t);
} else {
if (!this._previousIn) return;
t.type = _.MOUSE_LEAVE;
i.dispatchEvent(t);
this._previousIn = !1;
v = null;
}
u.EventMouse.pool.put(t);
}, E = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.stopPropagation();
(t = u.EventMouse.pool.get(t)).type = _.MOUSE_UP;
t.bubbles = !0;
i.dispatchEvent(t);
u.EventMouse.pool.put(t);
}
}, x = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.stopPropagation();
(t = u.EventMouse.pool.get(t)).type = _.MOUSE_WHEEL;
t.bubbles = !0;
i.dispatchEvent(t);
u.EventMouse.pool.put(t);
}
};
function A(t) {
var e = cc.Mask;
if (e) for (var i = 0, n = t; n && cc.Node.isNode(n); n = n._parent, ++i) if (n.getComponent(e)) return {
index: i,
node: n
};
return null;
}
var N = cc.Class({
name: "cc.Node",
extends: i("./utils/base-node"),
properties: {
_opacity: 255,
_color: cc.Color.WHITE,
_cascadeOpacityEnabled: !0,
_anchorPoint: cc.p(.5, .5),
_contentSize: cc.size(0, 0),
_rotationX: 0,
_rotationY: 0,
_scaleX: 1,
_scaleY: 1,
_position: cc.p(0, 0),
_skewX: 0,
_skewY: 0,
_localZOrder: 0,
_globalZOrder: 0,
_opacityModifyRGB: !1,
groupIndex: {
default: 0,
type: cc.Integer
},
group: {
get: function() {
return cc.game.groupList[this.groupIndex] || "";
},
set: function(t) {
this.groupIndex = cc.game.groupList.indexOf(t);
this.emit("group-changed");
}
},
x: {
get: function() {
return this._position.x;
},
set: function(t) {
var e = this._position;
if (t !== e.x) {
e.x = t;
this._sgNode.setPositionX(t);
var i = this._hasListenerCache;
i && i["position-changed"] && this.emit("position-changed");
}
}
},
y: {
get: function() {
return this._position.y;
},
set: function(t) {
var e = this._position;
if (t !== e.y) {
e.y = t;
this._sgNode.setPositionY(t);
var i = this._hasListenerCache;
i && i["position-changed"] && this.emit("position-changed");
}
}
},
rotation: {
get: function() {
this._rotationX !== this._rotationY && cc.logID(1602);
return this._rotationX;
},
set: function(t) {
if (this._rotationX !== t || this._rotationY !== t) {
this._rotationX = this._rotationY = t;
this._sgNode.rotation = t;
var e = this._hasListenerCache;
e && e["rotation-changed"] && this.emit("rotation-changed");
}
}
},
rotationX: {
get: function() {
return this._rotationX;
},
set: function(t) {
if (this._rotationX !== t) {
this._rotationX = t;
this._sgNode.rotationX = t;
var e = this._hasListenerCache;
e && e["rotation-changed"] && this.emit("rotation-changed");
}
}
},
rotationY: {
get: function() {
return this._rotationY;
},
set: function(t) {
if (this._rotationY !== t) {
this._rotationY = t;
this._sgNode.rotationY = t;
var e = this._hasListenerCache;
e && e["rotation-changed"] && this.emit("rotation-changed");
}
}
},
scaleX: {
get: function() {
return this._scaleX;
},
set: function(t) {
if (this._scaleX !== t) {
this._scaleX = t;
this._sgNode.scaleX = t;
var e = this._hasListenerCache;
e && e["scale-changed"] && this.emit("scale-changed");
}
}
},
scaleY: {
get: function() {
return this._scaleY;
},
set: function(t) {
if (this._scaleY !== t) {
this._scaleY = t;
this._sgNode.scaleY = t;
var e = this._hasListenerCache;
e && e["scale-changed"] && this.emit("scale-changed");
}
}
},
skewX: {
get: function() {
return this._skewX;
},
set: function(t) {
this._skewX = t;
this._sgNode.skewX = t;
}
},
skewY: {
get: function() {
return this._skewY;
},
set: function(t) {
this._skewY = t;
this._sgNode.skewY = t;
}
},
opacity: {
get: function() {
return this._opacity;
},
set: function(t) {
if (this._opacity !== t) {
this._opacity = t;
this._sgNode.setOpacity(t);
if (!this._cascadeOpacityEnabled) {
var e = this._sizeProvider;
e instanceof _ccsg.Node && e !== this._sgNode && e.setOpacity(t);
}
}
},
range: [ 0, 255 ]
},
cascadeOpacity: {
get: function() {
return this._cascadeOpacityEnabled;
},
set: function(t) {
if (this._cascadeOpacityEnabled !== t) {
this._cascadeOpacityEnabled = t;
this._sgNode.cascadeOpacity = t;
var e = t ? 255 : this._opacity, i = this._sizeProvider;
i instanceof _ccsg.Node && i.setOpacity(e);
}
}
},
color: {
get: function() {
return this._color.clone();
},
set: function(t) {
if (!this._color.equals(t)) {
this._color.fromColor(t);
0;
this._sizeProvider instanceof _ccsg.Node && this._sizeProvider.setColor(t);
}
}
},
anchorX: {
get: function() {
return this._anchorPoint.x;
},
set: function(t) {
var e = this._anchorPoint;
if (e.x !== t) {
e.x = t;
var i = this._sizeProvider;
i instanceof _ccsg.Node && i.setAnchorPoint(e);
this.emit("anchor-changed");
}
}
},
anchorY: {
get: function() {
return this._anchorPoint.y;
},
set: function(t) {
var e = this._anchorPoint;
if (e.y !== t) {
e.y = t;
var i = this._sizeProvider;
i instanceof _ccsg.Node && i.setAnchorPoint(e);
this.emit("anchor-changed");
}
}
},
width: {
get: function() {
if (this._sizeProvider) {
var t = this._sizeProvider._getWidth();
this._contentSize.width = t;
return t;
}
return this._contentSize.width;
},
set: function(t) {
if (t !== this._contentSize.width) {
var e = this._sizeProvider;
e && e.setContentSize(t, e._getHeight());
this._contentSize.width = t;
this.emit("size-changed");
}
}
},
height: {
get: function() {
if (this._sizeProvider) {
var t = this._sizeProvider._getHeight();
this._contentSize.height = t;
return t;
}
return this._contentSize.height;
},
set: function(t) {
if (t !== this._contentSize.height) {
var e = this._sizeProvider;
e && e.setContentSize(e._getWidth(), t);
this._contentSize.height = t;
this.emit("size-changed");
}
}
},
zIndex: {
get: function() {
return this._localZOrder;
},
set: function(t) {
if (this._localZOrder !== t) {
this._localZOrder = t;
this._sgNode.zIndex = t;
this._parent && (function(t) {
t._parent._delaySort();
})(this);
}
}
}
},
ctor: function(t) {
var e = this._sgNode = new _ccsg.Node();
e._entity = this;
e.onEnter = function() {
_ccsg.Node.prototype.onEnter.call(this);
if (this._entity && !this._entity._active) {
d && cc.director.getActionManager().pauseTarget(this);
c.pauseTarget(this);
}
};
cc.game._isCloning || (e.cascadeOpacity = !0);
this._sizeProvider = null;
this._reorderChildDirty = !1;
this._widget = null;
this._touchListener = null;
this._mouseListener = null;
},
statics: {
isNode: function(t) {
return t instanceof N && (t.constructor === N || !(t instanceof cc.Scene));
}
},
_onSetParent: function(t) {
var e = this._sgNode;
e.parent && e.parent.removeChild(e, !1);
if (t) {
t._sgNode.addChild(e);
t._delaySort();
}
},
_onSiblingIndexChanged: function(t) {
var e, i = this._parent, n = i._children, o = 0, r = n.length;
if (cc.runtime) for (;o < r; o++) {
var s = (e = n[o]._sgNode).getLocalZOrder();
e.setLocalZOrder(s + 1);
e.setLocalZOrder(s);
} else {
i._sgNode.removeChild(this._sgNode, !1);
if (t + 1 < n.length) {
var c = n[t + 1], a = this._sgNode.getLocalZOrder();
i._sgNode.insertChildBefore(this._sgNode, c._sgNode);
a !== this._sgNode.getLocalZOrder() && this._sgNode.setLocalZOrder(a);
} else i._sgNode.addChild(this._sgNode);
}
},
_onPreDestroy: function() {
var t = this._onPreDestroyBase();
d && cc.director.getActionManager().removeAllActionsFromTarget(this);
v === this && (v = null);
if (this._touchListener) {
this._touchListener.owner = null;
this._touchListener.mask = null;
this._touchListener = null;
}
if (this._mouseListener) {
this._mouseListener.owner = null;
this._mouseListener.mask = null;
this._mouseListener = null;
}
this._reorderChildDirty && cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
c.removeListeners(this);
if (t) {
this._sgNode._entity = null;
this._sgNode = null;
} else {
this._removeSgNode();
0;
}
},
_onPostActivated: function(t) {
var e = d ? cc.director.getActionManager() : null;
if (t) {
e && e.resumeTarget(this);
c.resumeTarget(this);
if (this._touchListener) {
var i = this._touchListener.mask = A(this);
this._mouseListener && (this._mouseListener.mask = i);
} else this._mouseListener && (this._mouseListener.mask = A(this));
} else {
e && e.pauseTarget(this);
c.pauseTarget(this);
}
},
_onHierarchyChanged: function(t) {
this._onHierarchyChangedBase(t);
cc._widgetManager._nodesOrderDirty = !0;
},
_onBatchCreated: function() {
var t = this._prefab;
if (t && t.sync && t.root === this) {
0;
r.syncWithPrefab(this);
}
this._updateDummySgNode();
this._parent && this._parent._sgNode.addChild(this._sgNode);
if (!this._activeInHierarchy) {
d && cc.director.getActionManager().pauseTarget(this);
c.pauseTarget(this);
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) e[i]._onBatchCreated();
},
_onBatchRestored: function() {
this._updateDummySgNode();
this._parent && this._parent._sgNode.addChild(this._sgNode);
if (!this._activeInHierarchy) {
d && cc.director.getActionManager().pauseTarget(this);
c.pauseTarget(this);
}
for (var t = this._children, e = 0, i = t.length; e < i; e++) t[e]._onBatchRestored();
},
on: function(t, e, i, n) {
var o = !1;
if (-1 !== p.indexOf(t)) {
if (!this._touchListener) {
this._touchListener = cc.EventListener.create({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
owner: this,
mask: A(this),
onTouchBegan: y,
onTouchMoved: m,
onTouchEnded: C,
onTouchCancelled: T
});
c.addListener(this._touchListener, this);
o = !0;
}
} else if (-1 !== g.indexOf(t) && !this._mouseListener) {
this._mouseListener = cc.EventListener.create({
event: cc.EventListener.MOUSE,
_previousIn: !1,
owner: this,
mask: A(this),
onMouseDown: b,
onMouseMove: S,
onMouseUp: E,
onMouseScroll: x
});
c.addListener(this._mouseListener, this);
o = !0;
}
o && !this._activeInHierarchy && cc.director.getScheduler().schedule((function() {
this._activeInHierarchy || c.pauseTarget(this);
}), this, 0, 0, 0, !1);
return this._EventTargetOn(t, e, i, n);
},
off: function(t, e, i, n) {
this._EventTargetOff(t, e, i, n);
-1 !== p.indexOf(t) ? this._checkTouchListeners() : -1 !== g.indexOf(t) && this._checkMouseListeners();
},
targetOff: function(t) {
this._EventTargetTargetOff(t);
this._checkTouchListeners();
this._checkMouseListeners();
},
pauseSystemEvents: function(t) {
c.pauseTarget(this, t);
},
resumeSystemEvents: function(t) {
c.resumeTarget(this, t);
},
_checkTouchListeners: function() {
if (!(this._objFlags & l) && this._touchListener) {
var t = 0;
if (this._bubblingListeners) for (;t < p.length; ++t) if (this._bubblingListeners.has(p[t])) return;
if (this._capturingListeners) for (;t < p.length; ++t) if (this._capturingListeners.has(p[t])) return;
c.removeListener(this._touchListener);
this._touchListener = null;
}
},
_checkMouseListeners: function() {
if (!(this._objFlags & l) && this._mouseListener) {
var t = 0;
if (this._bubblingListeners) for (;t < g.length; ++t) if (this._bubblingListeners.has(g[t])) return;
if (this._capturingListeners) for (;t < g.length; ++t) if (this._capturingListeners.has(g[t])) return;
v === this && (v = null);
c.removeListener(this._mouseListener);
this._mouseListener = null;
}
},
_hitTest: function(t, e) {
var i = this.width, n = this.height, o = t, r = cc.Camera;
r && r.main && r.main.containsNode(this) && (o = r.main.getCameraToWorldPoint(o));
var s = cc.affineTransformInvertIn(this._sgNode.getNodeToWorldTransform());
(o = cc.pointApplyAffineTransform(o, s)).x += this._anchorPoint.x * i;
o.y += this._anchorPoint.y * n;
var c = o.x, a = i - o.x, l = o.y, h = n - o.y;
if (c >= 0 && a >= 0 && h >= 0 && l >= 0) {
if (e && e.mask) {
for (var u = e.mask, d = this, f = 0; d && f < u.index; ++f, d = d.parent) ;
if (d === u.node) {
var _ = d.getComponent(cc.Mask);
return !_ || !_.enabledInHierarchy || _._hitTest(t);
}
e.mask = null;
return !0;
}
return !0;
}
return !1;
},
_getCapturingTargets: function(t, e) {
for (var i = this.parent; i; ) {
i.hasEventListener(t, !0) && e.push(i);
i = i.parent;
}
},
_getBubblingTargets: function(t, e) {
for (var i = this.parent; i; ) {
i.hasEventListener(t) && e.push(i);
i = i.parent;
}
},
isRunning: function() {
return this._activeInHierarchy;
},
runAction: d ? function(t) {
if (this.active) {
cc.assertID(t, 1618);
this._sgNode._owner = this;
cc.director.getActionManager().addAction(t, this, !1);
return t;
}
} : f,
pauseAllActions: d ? function() {
cc.director.getActionManager().pauseTarget(this);
} : f,
resumeAllActions: d ? function() {
cc.director.getActionManager().resumeTarget(this);
} : f,
stopAllActions: d ? function() {
cc.director.getActionManager().removeAllActionsFromTarget(this);
} : f,
stopAction: d ? function(t) {
cc.director.getActionManager().removeAction(t);
} : f,
stopActionByTag: d ? function(t) {
t !== cc.Action.TAG_INVALID ? cc.director.getActionManager().removeActionByTag(t, this) : cc.logID(1612);
} : f,
getActionByTag: d ? function(t) {
if (t === cc.Action.TAG_INVALID) {
cc.logID(1613);
return null;
}
return cc.director.getActionManager().getActionByTag(t, this);
} : function() {
return null;
},
getNumberOfRunningActions: d ? function() {
return cc.director.getActionManager().getNumberOfRunningActionsInTarget(this);
} : function() {
return 0;
},
setTag: function(t) {
this._tag = t;
this._sgNode.tag = t;
},
getPosition: function() {
return new cc.Vec2(this._position);
},
setPosition: function(i, n) {
var o;
if ("undefined" === ("object" === (e = typeof n) ? t(n) : e)) {
o = i.x;
n = i.y;
} else o = i;
var r = this._position;
if (r.x !== o || r.y !== n) {
r.x = o;
r.y = n;
this._sgNode.setPosition(o, n);
var s = this._hasListenerCache;
s && s["position-changed"] && this.emit("position-changed");
}
},
getScale: function() {
this._scaleX !== this._scaleY && cc.logID(1603);
return this._scaleX;
},
setScale: function(i, n) {
if ("object" === ("object" === (e = typeof i) ? t(i) : e)) {
n = i.y;
i = i.x;
} else n = n || 0 === n ? n : i;
if (this._scaleX !== i || this._scaleY !== n) {
this._scaleX = i;
this._scaleY = n;
this._sgNode.setScale(i, n);
var o = this._hasListenerCache;
o && o["scale-changed"] && this.emit("scale-changed");
}
},
getContentSize: function(t) {
if (this._sizeProvider && !t) {
var e = this._sizeProvider.getContentSize();
this._contentSize = e;
return cc.size(e);
}
return cc.size(this._contentSize);
},
setContentSize: function(t, e) {
var i = this._contentSize;
if (void 0 === e) {
if (t.width === i.width && t.height === i.height) return;
0;
i.width = t.width;
i.height = t.height;
} else {
if (t === i.width && e === i.height) return;
0;
i.width = t;
i.height = e;
}
this._sizeProvider && this._sizeProvider.setContentSize(i);
this.emit("size-changed");
},
setOpacityModifyRGB: function(t) {
if (this._opacityModifyRGB !== t) {
this._opacityModifyRGB = t;
this._sgNode.setOpacityModifyRGB(t);
var e = this._sizeProvider;
e instanceof _ccsg.Node && e !== this._sgNode && e.setOpacityModifyRGB(t);
}
},
isOpacityModifyRGB: function() {
return this._opacityModifyRGB;
},
setGlobalZOrder: function(t) {
this._globalZOrder = t;
this._sgNode.setGlobalZOrder(t);
},
getGlobalZOrder: function() {
this._globalZOrder = this._sgNode.getGlobalZOrder();
return this._globalZOrder;
},
getAnchorPoint: function() {
return cc.p(this._anchorPoint);
},
setAnchorPoint: function(t, e) {
var i = this._anchorPoint;
if (void 0 === e) {
if (t.x === i.x && t.y === i.y) return;
i.x = t.x;
i.y = t.y;
} else {
if (t === i.x && e === i.y) return;
i.x = t;
i.y = e;
}
var n = this._sizeProvider;
n instanceof _ccsg.Node && n.setAnchorPoint(i);
this.emit("anchor-changed");
},
getAnchorPointInPoints: function() {
return this._sgNode.getAnchorPointInPoints();
},
getDisplayedOpacity: function() {
return this._sgNode.getDisplayedOpacity();
},
_updateDisplayedOpacity: function(t) {
this._sgNode.updateDisplayedOpacity(t);
},
getDisplayedColor: function() {
return this._sgNode.getDisplayedColor();
},
getNodeToParentTransformAR: function() {
var t = this.getContentSize(), e = this._sgNode.getNodeToParentTransform();
if (!this._isSgTransformArToMe(t)) {
var i = this._anchorPoint.x * t.width, n = this._anchorPoint.y * t.height, o = cc.affineTransformMake(1, 0, 0, 1, i, n);
e = cc.affineTransformConcatIn(o, e);
}
return e;
},
getBoundingBox: function() {
var t = this.getContentSize(), e = cc.rect(0, 0, t.width, t.height);
return cc._rectApplyAffineTransformIn(e, this.getNodeToParentTransform());
},
getBoundingBoxToWorld: function() {
var t;
this.parent && (t = this.parent.getNodeToWorldTransformAR());
return this._getBoundingBoxTo(t);
},
_getBoundingBoxTo: function(t) {
var e = this.getContentSize(), i = e.width, n = e.height, o = cc.rect(-this._anchorPoint.x * i, -this._anchorPoint.y * n, i, n), r = cc.affineTransformConcat(this.getNodeToParentTransformAR(), t);
cc._rectApplyAffineTransformIn(o, r);
if (!this._children) return o;
for (var s = this._children, c = 0; c < s.length; c++) {
var a = s[c];
if (a && a.active) {
var l = a._getBoundingBoxTo(r);
l && (o = cc.rectUnion(o, l));
}
}
return o;
},
getNodeToParentTransform: function() {
var t = this.getContentSize(), e = this._sgNode.getNodeToParentTransform();
if (this._isSgTransformArToMe(t)) {
var i = -this._anchorPoint.x * t.width, n = -this._anchorPoint.y * t.height, o = cc.affineTransformMake(1, 0, 0, 1, i, n);
e = cc.affineTransformConcatIn(o, e);
}
return e;
},
getNodeToWorldTransform: function() {
var t = this.getContentSize();
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
var e = this._sgNode.getNodeToWorldTransform();
if (this._isSgTransformArToMe(t)) {
var i = -this._anchorPoint.x * t.width, n = -this._anchorPoint.y * t.height, o = cc.affineTransformMake(1, 0, 0, 1, i, n);
e = cc.affineTransformConcatIn(o, e);
}
return e;
},
getNodeToWorldTransformAR: function() {
var t = this.getContentSize();
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
var e = this._sgNode.getNodeToWorldTransform();
if (!this._isSgTransformArToMe(t)) {
var i = this._anchorPoint.x * t.width, n = this._anchorPoint.y * t.height, o = cc.affineTransformMake(1, 0, 0, 1, i, n);
e = cc.affineTransformConcatIn(o, e);
}
return e;
},
getParentToNodeTransform: function() {
return this._sgNode.getParentToNodeTransform();
},
getWorldToNodeTransform: function() {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
return this._sgNode.getWorldToNodeTransform();
},
_isSgTransformArToMe: function(t) {
var e = this._sgNode.getContentSize();
return 0 === e.width && 0 === e.height && (0 !== t.width || 0 !== t.height) || !!this._sgNode.isIgnoreAnchorPointForPosition();
},
convertToNodeSpace: function(t) {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
var e = this._sgNode.convertToNodeSpace(t);
return cc.pAdd(e, cc.p(this._anchorPoint.x * this._contentSize.width, this._anchorPoint.y * this._contentSize.height));
},
convertToWorldSpace: function(t) {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
var e = t.x - this._anchorPoint.x * this._contentSize.width, i = t.y - this._anchorPoint.y * this._contentSize.height;
return cc.v2(this._sgNode.convertToWorldSpace(cc.v2(e, i)));
},
convertToNodeSpaceAR: function(t) {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
return this._sgNode.isIgnoreAnchorPointForPosition() ? cc.v2(this._sgNode.convertToNodeSpace(t)) : this._sgNode.convertToNodeSpaceAR(t);
},
convertToWorldSpaceAR: function(t) {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
return this._sgNode.isIgnoreAnchorPointForPosition() ? cc.v2(this._sgNode.convertToWorldSpace(t)) : cc.v2(this._sgNode.convertToWorldSpaceAR(t));
},
convertTouchToNodeSpace: function(t) {
return this.convertToNodeSpace(t.getLocation());
},
convertTouchToNodeSpaceAR: function(t) {
return this.convertToNodeSpaceAR(t.getLocation());
},
setNodeDirty: function() {
this._sgNode.setNodeDirty();
},
addChild: function(i, n, o) {
n = void 0 === n ? i._localZOrder : n;
var r, s = !1;
if ("undefined" === ("object" === (e = typeof o) ? t(o) : e)) {
o = void 0;
r = i._name;
} else if (cc.js.isString(o)) {
r = o;
o = void 0;
} else if (cc.js.isNumber(o)) {
s = !0;
r = "";
}
0;
cc.assertID(i, 1606);
cc.assertID(null === i._parent, 1605);
i.parent = this;
i.zIndex = n;
s ? i.setTag(o) : i.setName(r);
},
cleanup: function() {
d && cc.director.getActionManager().removeAllActionsFromTarget(this);
c.removeListeners(this);
var t, e, i = this._children.length;
for (t = 0; t < i; ++t) (e = this._children[t]) && e.cleanup();
},
sortAllChildren: function() {
if (this._reorderChildDirty) {
this._reorderChildDirty = !1;
var t = this._children;
if (t.length > 1) {
var e, i, n, o = t.length;
for (e = 1; e < o; e++) {
n = t[e];
i = e - 1;
for (;i >= 0; ) {
if (n._localZOrder < t[i]._localZOrder) t[i + 1] = t[i]; else {
if (!(n._localZOrder === t[i]._localZOrder && n._sgNode._arrivalOrder < t[i]._sgNode._arrivalOrder)) break;
t[i + 1] = t[i];
}
i--;
}
t[i + 1] = n;
}
this.emit("child-reorder");
}
cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
}
},
_delaySort: function() {
if (!this._reorderChildDirty) {
this._reorderChildDirty = !0;
cc.director.__fastOn(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
}
},
_updateDummySgNode: function() {
var t = this._sgNode;
t.setPosition(this._position);
t.setRotationX(this._rotationX);
t.setRotationY(this._rotationY);
t.setScale(this._scaleX, this._scaleY);
t.setSkewX(this._skewX);
t.setSkewY(this._skewY);
var e = t._arrivalOrder;
t.setLocalZOrder(this._localZOrder);
t._arrivalOrder = e;
t.setGlobalZOrder(this._globalZOrder);
t.setColor(this._color);
t.setOpacity(this._opacity);
t.setOpacityModifyRGB(this._opacityModifyRGB);
t.setCascadeOpacityEnabled(this._cascadeOpacityEnabled);
t.setTag(this._tag);
},
_updateSgNode: function() {
this._updateDummySgNode();
var t = this._sgNode;
t.setAnchorPoint(this._anchorPoint);
t.setVisible(this._active);
t.setColor(this._color);
var e = d ? cc.director.getActionManager() : null;
if (this._activeInHierarchy) {
e && e.resumeTarget(this);
c.resumeTarget(this);
} else {
e && e.pauseTarget(this);
c.pauseTarget(this);
}
},
_removeSgNode: s.removeSgNode,
onRestore: !1
}), O = function() {
this._activeInHierarchy || c.pauseTarget(this);
};
cc.js.getset(N.prototype, "_sgNode", (function() {
return this.__sgNode;
}), (function(t) {
this.__sgNode = t;
if (this._touchListener || this._mouseListener) {
if (this._touchListener) {
c.removeListener(this._touchListener);
c.addListener(this._touchListener, this);
}
if (this._mouseListener) {
c.removeListener(this._mouseListener);
c.addListener(this._mouseListener, this);
}
cc.director.once(cc.Director.EVENT_BEFORE_UPDATE, O, this);
}
}), !0);
h.propertyDefine(N, [ "parent", "tag", "skewX", "skewY", "position", "rotation", "rotationX", "rotationY", "scale", "scaleX", "scaleY", "opacity", "color" ], {
x: [ "getPositionX", "setPositionX" ],
y: [ "getPositionY", "setPositionY" ],
zIndex: [ "getLocalZOrder", "setLocalZOrder" ],
opacityModifyRGB: [ "isOpacityModifyRGB", "setOpacityModifyRGB" ],
cascadeOpacity: [ "isCascadeOpacityEnabled", "setCascadeOpacityEnabled" ]
});
N.EventType = _;
cc.Node = n.exports = N;
}), {
"./event-manager": 77,
"./event/event": 80,
"./utils/base-node": 151,
"./utils/misc": 155,
"./utils/prefab-helper": 157,
"./utils/scene-graph-helper": 158
} ],
16: [ (function(t, e, i) {
cc.Scene = cc.Class({
name: "cc.Scene",
extends: t("./CCNode"),
properties: {
autoReleaseAssets: {
default: void 0,
type: cc.Boolean
}
},
ctor: function() {
(this._sgNode = new _ccsg.Scene()).setAnchorPoint(0, 0);
this._anchorPoint.x = 0;
this._anchorPoint.y = 0;
this._activeInHierarchy = !1;
this._inited = !cc.game._isCloning;
0;
this.dependAssets = null;
},
destroy: function() {
this._super();
this._activeInHierarchy = !1;
},
_onHierarchyChanged: function() {},
_instantiate: null,
_load: function() {
if (!this._inited) {
0;
this._onBatchCreated();
this._inited = !0;
}
},
_activate: function(t) {
t = !1 !== t;
0;
cc.director._nodeActivator.activateNode(this, t);
}
});
e.exports = cc.Scene;
}), {
"./CCNode": 15
} ],
17: [ (function(t, e, i) {
var n = t("./CCRawAsset");
cc.Asset = cc.Class({
name: "cc.Asset",
extends: n,
ctor: function() {
this.loaded = !0;
},
properties: {
nativeUrl: {
get: function() {
if (this._native) {
var t = this._native;
if (47 === t.charCodeAt(0)) return t.slice(1);
if (cc.AssetLibrary) {
var e = cc.AssetLibrary.getLibUrlNoExt(this._uuid, !0);
return 46 === t.charCodeAt(0) ? e + t : e + "/" + t;
}
cc.errorID(6400);
}
return "";
},
visible: !1
},
_native: "",
_nativeAsset: {
get: function() {},
set: function(t) {}
}
},
statics: {
deserialize: !1,
preventDeferredLoadDependents: !1,
preventPreloadNativeObject: !1
},
toString: function() {
return this.nativeUrl;
},
serialize: !1,
createNode: null,
_setRawAsset: function(t, e) {
this._native = !1 !== e ? t || void 0 : "/" + t;
}
});
e.exports = cc.Asset;
}), {
"./CCRawAsset": 24
} ],
18: [ (function(t, e, i) {
var n = t("./CCAsset"), o = t("../event/event-target"), r = cc.Enum({
WEB_AUDIO: 0,
DOM_AUDIO: 1
}), s = cc.Class({
name: "cc.AudioClip",
extends: n,
mixins: [ o ],
ctor: function() {
this.loaded = !1;
this._audio = null;
},
properties: {
loadMode: {
default: r.WEB_AUDIO,
type: r
},
_nativeAsset: {
get: function() {
return this._audio;
},
set: function(t) {
this._audio = t;
if (t) {
this.loaded = !0;
this.emit("load");
}
},
override: !0
}
},
statics: {
LoadMode: r,
_loadByUrl: function(t, e) {
var i = cc.loader.getItem(t) || cc.loader.getItem(t + "?useDom=1");
i && i.complete ? i._owner instanceof s ? e(null, i._owner) : e(null, i.content) : cc.loader.load(t, (function(n, o) {
if (n) return e(n);
i = cc.loader.getItem(t) || cc.loader.getItem(t + "?useDom=1");
e(null, i.content);
}));
}
},
destroy: function() {
cc.audioEngine.uncache(this);
this._super();
}
});
cc.AudioClip = s;
e.exports = s;
}), {
"../event/event-target": 79,
"./CCAsset": 17
} ],
19: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.BitmapFont",
extends: cc.Font,
properties: {
fntDataStr: {
default: ""
},
spriteFrame: {
default: null,
type: cc.SpriteFrame
},
fontSize: {
default: -1
},
_fntConfig: null
}
});
cc.BitmapFont = n;
e.exports = n;
}), {} ],
20: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Font",
extends: cc.Asset
});
cc.Font = e.exports = n;
}), {} ],
21: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.JsonAsset",
extends: cc.Asset,
properties: {
json: null
}
});
e.exports = cc.JsonAsset = n;
}), {} ],
22: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.LabelAtlas",
extends: cc.BitmapFont
});
cc.LabelAtlas = n;
e.exports = n;
}), {} ],
23: [ (function(t, e, i) {
var n = cc.Enum({
AUTO: 0,
SINGLE_INSTANCE: 1,
MULTI_INSTANCE: 2
}), o = cc.Class({
name: "cc.Prefab",
extends: cc.Asset,
ctor: function() {
this._createFunction = null;
this._instantiatedTimes = 0;
},
properties: {
data: null,
optimizationPolicy: n.AUTO,
asyncLoadAssets: !1
},
statics: {
OptimizationPolicy: n,
OptimizationPolicyThreshold: 3
},
createNode: !1,
compileCreateFunction: function() {
var e = t("../platform/instantiate-jit");
this._createFunction = e.compile(this.data);
},
_doInstantiate: function(t) {
this.data._prefab ? this.data._prefab._synced = !0 : cc.warnID(3700);
this._createFunction || this.compileCreateFunction();
return this._createFunction(t);
},
_instantiate: function() {
var t;
if (this.optimizationPolicy !== n.SINGLE_INSTANCE && (this.optimizationPolicy === n.MULTI_INSTANCE || this._instantiatedTimes + 1 >= o.OptimizationPolicyThreshold)) {
t = this._doInstantiate();
this.data._instantiate(t);
} else {
this.data._prefab._synced = !0;
t = this.data._instantiate();
}
++this._instantiatedTimes;
return t;
}
});
cc.Prefab = e.exports = o;
cc.js.obsolete(cc, "cc._Prefab", "Prefab");
}), {
"../platform/instantiate-jit": 141
} ],
24: [ (function(t, e, i) {
var n = t("../platform/CCObject"), o = t("../platform/js");
cc.RawAsset = cc.Class({
name: "cc.RawAsset",
extends: n,
ctor: function() {
Object.defineProperty(this, "_uuid", {
value: "",
writable: !0
});
}
});
o.value(cc.RawAsset, "isRawAssetType", (function(t) {
return cc.isChildClassOf(t, cc.RawAsset) && !cc.isChildClassOf(t, cc.Asset);
}));
o.value(cc.RawAsset, "wasRawAssetType", (function(t) {
return t === cc.Texture2D || t === cc.AudioClip || t === cc.ParticleAsset || t === cc.Asset;
}));
e.exports = cc.RawAsset;
}), {
"../platform/CCObject": 132,
"../platform/js": 143
} ],
25: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.SceneAsset",
extends: cc.Asset,
properties: {
scene: null,
asyncLoadAssets: void 0
}
});
cc.SceneAsset = n;
e.exports = n;
}), {} ],
26: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Script",
extends: cc.Asset
});
cc._Script = n;
var o = cc.Class({
name: "cc.JavaScript",
extends: n
});
cc._JavaScript = o;
var r = cc.Class({
name: "cc.CoffeeScript",
extends: n
});
cc._CoffeeScript = r;
var s = cc.Class({
name: "cc.TypeScript",
extends: n
});
cc._TypeScript = s;
}), {} ],
27: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.SpriteAtlas",
extends: cc.Asset,
properties: {
_spriteFrames: {
default: {}
}
},
getTexture: function() {
var t = Object.keys(this._spriteFrames);
if (t.length > 0) {
var e = this._spriteFrames[t[0]];
return e ? e.getTexture() : null;
}
return null;
},
getSpriteFrame: function(t) {
var e = this._spriteFrames[t];
if (!e) return null;
e.name || (e.name = t);
return e;
},
getSpriteFrames: function() {
var t = [], e = this._spriteFrames;
for (var i in e) t.push(this.getSpriteFrame(i));
return t;
}
});
cc.SpriteAtlas = n;
e.exports = n;
}), {} ],
28: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.TTFFont",
extends: cc.Font,
statics: {
preventPreloadNativeObject: !0
}
});
cc.TTFFont = e.exports = n;
}), {} ],
29: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.TextAsset",
extends: cc.Asset,
properties: {
text: ""
},
toString: function() {
return this.text;
}
});
e.exports = cc.TextAsset = n;
}), {} ],
30: [ (function(t, e, i) {
t("./CCRawAsset");
t("./CCAsset");
t("./CCFont");
t("./CCPrefab");
t("./CCAudioClip");
t("./CCScripts");
t("./CCSceneAsset");
t("../sprites/CCSpriteFrame");
t("../textures/CCTexture2D");
t("./CCTTFFont");
t("./CCSpriteAtlas");
t("./CCBitmapFont");
t("./CCLabelAtlas");
t("./CCTextAsset");
t("./CCJsonAsset");
}), {
"../sprites/CCSpriteFrame": 148,
"../textures/CCTexture2D": 149,
"./CCAsset": 17,
"./CCAudioClip": 18,
"./CCBitmapFont": 19,
"./CCFont": 20,
"./CCJsonAsset": 21,
"./CCLabelAtlas": 22,
"./CCPrefab": 23,
"./CCRawAsset": 24,
"./CCSceneAsset": 25,
"./CCScripts": 26,
"./CCSpriteAtlas": 27,
"./CCTTFFont": 28,
"./CCTextAsset": 29
} ],
31: [ (function(t, e, i) {
var n = t("../event-manager"), o = 56, r = 7, s = cc.Enum({
ONCE: 0,
ON_WINDOW_RESIZE: 1,
ALWAYS: 2
});
function c(t) {
return t instanceof cc.Scene ? cc.visibleRect : !t._sizeProvider || t._sizeProvider instanceof _ccsg.Node ? t._contentSize : t.getContentSize();
}
function a(t, e, i, n) {
for (var o = t._parent._scaleX, r = t._parent._scaleY, s = 0, c = 0, a = t._parent; ;) {
var l = a._position;
s += l.x;
c += l.y;
if (!(a = a._parent)) {
i.x = i.y = 0;
n.x = n.y = 1;
return;
}
if (a === e) break;
var h = a._scaleX, u = a._scaleY;
s *= h;
c *= u;
o *= h;
r *= u;
}
n.x = 0 !== o ? 1 / o : 1;
n.y = 0 !== r ? 1 / r : 1;
i.x = -s;
i.y = -c;
}
var l = cc.Vec2.ZERO, h = cc.Vec2.ONE;
function u(t, e) {
var i, n, s, u = e._target;
u ? a(t, i = u, n = l, s = h) : i = t._parent;
var d = c(i), f = i._anchorPoint, _ = i instanceof cc.Scene, p = t._position.x, g = t._position.y, v = t._anchorPoint;
if (e._alignFlags & o) {
var y, m, C = d.width;
if (_) {
y = cc.visibleRect.left.x;
m = cc.visibleRect.right.x;
} else m = (y = -f.x * C) + C;
y += e._isAbsLeft ? e._left : e._left * C;
m -= e._isAbsRight ? e._right : e._right * C;
if (u) {
y += n.x;
y *= s.x;
m += n.x;
m *= s.x;
}
var T, b = v.x, S = t._scaleX;
if (S < 0) {
b = 1 - b;
S = -S;
}
if (e.isStretchWidth) {
T = m - y;
0 !== S && (t.width = T / S);
p = y + b * T;
} else {
T = t.width * S;
if (e.isAlignHorizontalCenter) {
var E = e._isAbsHorizontalCenter ? e._horizontalCenter : e._horizontalCenter * C, x = (.5 - f.x) * d.width;
if (u) {
E *= s.x;
x += n.x;
x *= s.x;
}
p = x + (b - .5) * T + E;
} else p = e.isAlignLeft ? y + b * T : m + (b - 1) * T;
}
}
if (e._alignFlags & r) {
var A, N, O = d.height;
if (_) {
N = cc.visibleRect.bottom.y;
A = cc.visibleRect.top.y;
} else A = (N = -f.y * O) + O;
N += e._isAbsBottom ? e._bottom : e._bottom * O;
A -= e._isAbsTop ? e._top : e._top * O;
if (u) {
N += n.y;
N *= s.y;
A += n.y;
A *= s.y;
}
var w, I = v.y, L = t._scaleY;
if (L < 0) {
I = 1 - I;
L = -L;
}
if (e.isStretchHeight) {
w = A - N;
0 !== L && (t.height = w / L);
g = N + I * w;
} else {
w = t.height * L;
if (e.isAlignVerticalCenter) {
var R = e._isAbsVerticalCenter ? e._verticalCenter : e._verticalCenter * O, P = (.5 - f.y) * d.height;
if (u) {
R *= s.y;
P += n.y;
P *= s.y;
}
g = P + (I - .5) * w + R;
} else g = e.isAlignBottom ? N + I * w : A + (I - 1) * w;
}
}
t.setPosition(p, g);
}
function d() {
var t = cc.director.getScene();
if (t) {
_.isAligning = !0;
if (_._nodesOrderDirty) {
f.length = 0;
(function t(e) {
var i = e._widget;
if (i) {
u(e, i);
i.alignMode !== s.ALWAYS ? i.enabled = !1 : f.push(i);
}
for (var n = e._children, o = 0; o < n.length; o++) {
var r = n[o];
r._active && t(r);
}
})(t);
_._nodesOrderDirty = !1;
} else {
var e, i = _._activeWidgetsIterator;
for (i.i = 0; i.i < f.length; ++i.i) u((e = f[i.i]).node, e);
}
_.isAligning = !1;
}
0;
}
var f = [];
var _ = cc._widgetManager = e.exports = {
_AlignFlags: {
TOP: 1,
MID: 2,
BOT: 4,
LEFT: 8,
CENTER: 16,
RIGHT: 32
},
isAligning: !1,
_nodesOrderDirty: !1,
_activeWidgetsIterator: new cc.js.array.MutableForwardIterator(f),
init: function(t) {
t.on(cc.Director.EVENT_BEFORE_VISIT, d);
n.addListener(cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: "window-resize",
callback: this.onResized.bind(this)
}), 1);
},
add: function(t) {
t.node._widget = t;
this._nodesOrderDirty = !0;
0;
},
remove: function(t) {
t.node._widget = null;
this._activeWidgetsIterator.remove(t);
0;
},
onResized: function() {
var t = cc.director.getScene();
t && this.refreshWidgetOnResized(t);
},
refreshWidgetOnResized: function(t) {
var e = cc.Node.isNode(t) && t.getComponent(cc.Widget);
e && e.alignMode === s.ON_WINDOW_RESIZE && (e.enabled = !0);
for (var i = t._children, n = 0; n < i.length; n++) {
var o = i[n];
this.refreshWidgetOnResized(o);
}
},
updateAlignment: function t(e) {
var i = e._parent;
cc.Node.isNode(i) && t(i);
var n = e._widget || e.getComponent(cc.Widget);
n && u(e, n);
},
AlignMode: s
};
0;
}), {
"../event-manager": 77
} ],
32: [ (function(t, e, i) {
0;
var n = cc.Class({
name: "cc.Camera",
extends: cc._RendererUnderSG,
ctor: function() {
this.viewMatrix = cc.affineTransformMake();
this.invertViewMatrix = cc.affineTransformMake();
this._lastViewMatrix = cc.affineTransformMake();
this._sgTarges = [];
this._checkedTimes = 0;
this.visibleRect = {
left: cc.v2(),
right: cc.v2(),
top: cc.v2(),
bottom: cc.v2()
};
this.viewPort = cc.rect();
},
editor: !1,
properties: {
_targets: {
default: [],
type: cc.Node,
visible: !0
},
zoomRatio: 1
},
statics: {
main: null
},
_createSgNode: function() {
if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
cc.errorID(8301);
var t = new _ccsg.Node();
t.setTransform = t.addTarget = t.removeTarget = function() {};
return t;
}
return new _ccsg.CameraNode();
},
_initSgNode: function() {
this._sgNode.setContentSize(this.node.getContentSize(!0));
},
_addSgTargetInSg: function(t) {
var e;
t instanceof cc.Node ? e = t._sgNode : t instanceof _ccsg.Node && (e = t);
if (e && !e._cameraInfo) {
e._cameraInfo = {
touched: this._checkedTimes
};
this._sgNode.addTarget(e);
this._sgTarges.push(e);
}
},
_removeTargetInSg: function(t) {
var e;
t instanceof cc.Node ? e = t._sgNode : t instanceof _ccsg.Node && (e = t);
if (e && e._cameraInfo) {
this._sgNode.removeTarget(e);
delete e._cameraInfo;
cc.js.array.remove(this._sgTarges, e);
}
},
onEnable: function() {
if (n.main) cc.errorID(8300); else {
n.main = this;
this._sgNode.setEnable(!0);
for (var t = this._targets, e = 0, i = t.length; e < i; e++) this._addSgTargetInSg(t[e]);
}
},
onDisable: function() {
if (n.main === this) {
n.main = null;
this._sgNode.setEnable(!1);
for (var t = this._sgTarges, e = t.length - 1; e >= 0; e--) this._removeTargetInSg(t[e]);
}
},
addTarget: function(t) {
if (-1 === this._targets.indexOf(t)) {
this._addSgTargetInSg(t);
this._targets.push(t);
}
},
removeTarget: function(t) {
if (-1 !== this._targets.indexOf(t)) {
this._removeTargetInSg(t);
cc.js.array.remove(this._targets, t);
}
},
getTargets: function() {
return this._targets;
},
getNodeToCameraTransform: function(t) {
var e = t.getNodeToWorldTransform();
this.containsNode(t) && (e = cc.affineTransformConcatIn(e, cc.Camera.main.viewMatrix));
return e;
},
getCameraToWorldPoint: function(t) {
cc.Camera.main && (t = cc.pointApplyAffineTransform(t, cc.Camera.main.invertViewMatrix));
return t;
},
containsNode: function(t) {
t instanceof cc.Node && (t = t._sgNode);
for (var e = this._sgTarges; t; ) {
if (-1 !== e.indexOf(t)) return !0;
t = t.parent;
}
return !1;
},
_setSgNodesCullingDirty: function() {
for (var t = this._sgTarges, e = 0; e < t.length; e++) t[e].markCullingDirty();
},
_checkSgTargets: function() {
for (var t = this._targets, e = this._sgTarges, i = ++this._checkedTimes, n = 0, o = t.length; n < o; n++) {
var r = t[n], s = r;
r instanceof cc.Node && (s = r._sgNode) && !s._cameraInfo && this._addSgTargetInSg(s);
s && (s._cameraInfo.touched = i);
}
for (var c = e.length - 1; c >= 0; c--) {
var a = e[c];
a._cameraInfo.touched !== i && this._removeTargetInSg(a);
}
},
lateUpdate: function() {
this._checkSgTargets();
var t = this.viewMatrix, e = this.invertViewMatrix, i = this.viewPort, n = cc.visibleRect, o = this.visibleRect, r = this.node.getNodeToWorldTransformAR(), s = .5 * -(Math.atan2(r.b, r.a) + Math.atan2(-r.c, r.d)), c = 1, a = 0, l = 0, h = 1;
if (s) {
l = Math.sin(s);
c = h = Math.cos(s);
a = -l;
}
var u = this.zoomRatio;
c *= u;
a *= u;
l *= u;
h *= u;
t.a = c;
t.b = a;
t.c = l;
t.d = h;
var d = n.center;
t.tx = d.x - (c * r.tx + l * r.ty);
t.ty = d.y - (a * r.tx + h * r.ty);
cc.affineTransformInvertOut(t, e);
i.x = n.bottomLeft.x;
i.y = n.bottomLeft.y;
i.width = n.width;
i.height = n.height;
cc._rectApplyAffineTransformIn(i, e);
o.left.x = i.xMin;
o.right.x = i.xMax;
o.bottom.y = i.yMin;
o.top.y = i.yMax;
this._sgNode.setTransform(c, a, l, h, t.tx, t.ty);
var f = this._lastViewMatrix;
if (f.a !== t.a || f.b !== t.b || f.c !== t.c || f.d !== t.d || f.tx !== t.tx || f.ty !== t.ty) {
this._setSgNodesCullingDirty();
f.a = t.a;
f.b = t.b;
f.c = t.c;
f.d = t.d;
f.tx = t.tx;
f.ty = t.ty;
}
}
});
n.flags = cc.Enum({
InCamera: 1,
ParentInCamera: 2
});
e.exports = cc.Camera = n;
}), {
"./CCSGCameraNode": 1
} ],
33: [ (function(t, e, i) {
cc.Collider.Box = cc.Class({
properties: {
_offset: cc.v2(0, 0),
_size: cc.size(100, 100),
offset: {
tooltip: !1,
get: function() {
return this._offset;
},
set: function(t) {
this._offset = t;
},
type: cc.Vec2
},
size: {
tooltip: !1,
get: function() {
return this._size;
},
set: function(t) {
this._size.width = t.width < 0 ? 0 : t.width;
this._size.height = t.height < 0 ? 0 : t.height;
},
type: cc.Size
}
},
resetInEditor: !1
});
var n = cc.Class({
name: "cc.BoxCollider",
extends: cc.Collider,
mixins: [ cc.Collider.Box ],
editor: !1
});
cc.BoxCollider = e.exports = n;
}), {} ],
34: [ (function(t, e, i) {
cc.Collider.Circle = cc.Class({
properties: {
_offset: cc.v2(0, 0),
_radius: 50,
offset: {
get: function() {
return this._offset;
},
set: function(t) {
this._offset = t;
},
type: cc.Vec2
},
radius: {
tooltip: !1,
get: function() {
return this._radius;
},
set: function(t) {
this._radius = t < 0 ? 0 : t;
}
}
},
resetInEditor: !1
});
var n = cc.Class({
name: "cc.CircleCollider",
extends: cc.Collider,
mixins: [ cc.Collider.Circle ],
editor: !1
});
cc.CircleCollider = e.exports = n;
}), {} ],
35: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Collider",
extends: cc.Component,
properties: {
editing: {
default: !1,
serializable: !1,
tooltip: !1
},
tag: {
tooltip: !1,
default: 0,
range: [ 0, 1e7 ],
type: cc.Integer
}
},
onDisable: function() {
cc.director.getCollisionManager().removeCollider(this);
},
onEnable: function() {
cc.director.getCollisionManager().addCollider(this);
}
});
cc.Collider = e.exports = n;
}), {} ],
36: [ (function(t, e, i) {
var n = t("./CCContact"), o = n.CollisionType, r = cc.rect(), s = cc.v2(), c = cc.Class({
mixins: [ cc.EventTarget ],
properties: {
enabled: !1,
enabledDrawBoundingBox: !1
},
ctor: function() {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this._contacts = [];
this._colliders = [];
this._debugDrawer = null;
this._enabledDebugDraw = !1;
},
update: function(t) {
if (this.enabled) {
var e, i, n = this._colliders;
for (e = 0, i = n.length; e < i; e++) this.updateCollider(n[e]);
var r = this._contacts, s = [];
for (e = 0, i = r.length; e < i; e++) {
var c = r[e].updateState();
c !== o.None && s.push([ c, r[e] ]);
}
for (e = 0, i = s.length; e < i; e++) {
var a = s[e];
this._doCollide(a[0], a[1]);
}
this.drawColliders();
}
},
_doCollide: function(t, e) {
var i;
switch (t) {
case o.CollisionEnter:
i = "onCollisionEnter";
break;

case o.CollisionStay:
i = "onCollisionStay";
break;

case o.CollisionExit:
i = "onCollisionExit";
}
var n, r, s, c = e.collider1, a = e.collider2, l = c.node._components, h = a.node._components;
for (n = 0, r = l.length; n < r; n++) (s = l[n])[i] && s[i](a, c);
for (n = 0, r = h.length; n < r; n++) (s = h[n])[i] && s[i](c, a);
},
shouldCollide: function(t, e) {
var i = t.node, n = e.node, o = cc.game.collisionMatrix;
return i !== n && o[i.groupIndex][n.groupIndex];
},
initCollider: function(t) {
if (!t.world) {
var e = t.world = {};
e.aabb = cc.rect();
e.preAabb = cc.rect();
e.radius = 0;
if (t instanceof cc.BoxCollider) {
e.position = null;
e.points = [ cc.v2(), cc.v2(), cc.v2(), cc.v2() ];
} else if (t instanceof cc.PolygonCollider) {
e.position = null;
e.points = t.points.map((function(t) {
return cc.v2(t.x, t.y);
}));
} else if (t instanceof cc.CircleCollider) {
e.position = cc.v2();
e.points = null;
}
}
},
updateCollider: function(t) {
var e = t.offset, i = t.world, n = i.aabb, o = i.transform = t.node.getNodeToWorldTransformAR(), c = i.preAabb;
c.x = n.x;
c.y = n.y;
c.width = n.width;
c.height = n.height;
if (t instanceof cc.BoxCollider) {
var a = t.size;
r.x = e.x - a.width / 2;
r.y = e.y - a.height / 2;
r.width = a.width;
r.height = a.height;
var l = i.points, h = l[0], u = l[1], d = l[2], f = l[3];
cc.obbApplyAffineTransform(r, o, h, u, d, f);
var _ = Math.min(h.x, u.x, d.x, f.x), p = Math.min(h.y, u.y, d.y, f.y), g = Math.max(h.x, u.x, d.x, f.x), v = Math.max(h.y, u.y, d.y, f.y);
n.x = _;
n.y = p;
n.width = g - _;
n.height = v - p;
} else if (t instanceof cc.CircleCollider) {
var y = cc.pointApplyAffineTransform(t.offset, o);
i.position.x = y.x;
i.position.y = y.y;
o.tx = o.ty = 0;
s.x = t.radius;
s.y = 0;
var m = cc.pointApplyAffineTransform(s, o), C = Math.sqrt(m.x * m.x + m.y * m.y);
i.radius = C;
n.x = y.x - C;
n.y = y.y - C;
n.width = 2 * C;
n.height = 2 * C;
} else if (t instanceof cc.PolygonCollider) {
var T = t.points, b = i.points;
b.length = T.length;
_ = 1e6, p = 1e6, g = -1e6, v = -1e6;
for (var S = 0, E = T.length; S < E; S++) {
b[S] || (b[S] = cc.v2());
s.x = T[S].x + e.x;
s.y = T[S].y + e.y;
y = cc.pointApplyAffineTransform(s, o);
b[S].x = y.x;
b[S].y = y.y;
y.x > g && (g = y.x);
y.x < _ && (_ = y.x);
y.y > v && (v = y.y);
y.y < p && (p = y.y);
}
n.x = _;
n.y = p;
n.width = g - _;
n.height = v - p;
}
},
addCollider: function(t) {
var e = this._colliders;
if (-1 === e.indexOf(t)) {
for (var i = 0, o = e.length; i < o; i++) {
var r = e[i];
if (this.shouldCollide(t, r)) {
var s = new n(t, r);
this._contacts.push(s);
}
}
e.push(t);
this.initCollider(t);
}
t.node.on("group-changed", this.onNodeGroupChanged, this);
},
removeCollider: function(t) {
var e = this._colliders, i = e.indexOf(t);
if (i >= 0) {
e.splice(i, 1);
for (var n = this._contacts, r = n.length - 1; r >= 0; r--) {
var s = n[r];
if (s.collider1 === t || s.collider2 === t) {
s.touching && this._doCollide(o.CollisionExit, s);
n.splice(r, 1);
}
}
t.node.off("group-changed", this.onNodeGroupChanged, this);
} else cc.errorID(6600);
},
attachDebugDrawToCamera: function(t) {
this._debugDrawer && t.addTarget(this._debugDrawer);
},
detachDebugDrawFromCamera: function(t) {
this._debugDrawer && t.removeTarget(this._debugDrawer);
},
onNodeGroupChanged: function(t) {
for (var e = t.currentTarget.getComponents(cc.Collider), i = 0, n = e.length; i < n; i++) {
this.removeCollider(e[i]);
this.addCollider(e[i]);
}
},
drawColliders: function() {
var t = this._debugDrawer;
if (this._enabledDebugDraw && t) {
t.clear();
for (var e = this._colliders, i = 0, n = e.length; i < n; i++) {
var o = e[i];
if (o instanceof cc.BoxCollider || o instanceof cc.PolygonCollider) {
var r = o.world.points;
if (r.length > 0) {
t.strokeColor = cc.Color.WHITE;
t.moveTo(r[0].x, r[0].y);
for (var s = 1; s < r.length; s++) t.lineTo(r[s].x, r[s].y);
t.close();
t.stroke();
}
} else if (o instanceof cc.CircleCollider) {
t.circle(o.world.position.x, o.world.position.y, o.world.radius);
t.stroke();
}
if (this.enabledDrawBoundingBox) {
var c = o.world.aabb;
t.strokeColor = cc.Color.BLUE;
t.moveTo(c.xMin, c.yMin);
t.lineTo(c.xMin, c.yMax);
t.lineTo(c.xMax, c.yMax);
t.lineTo(c.xMax, c.yMin);
t.close();
t.stroke();
}
}
}
},
onSceneLaunched: function() {
if (this._enabledDebugDraw && this._debugDrawer) {
this._debugDrawer.removeFromParent();
cc.director.getScene()._sgNode.addChild(this._debugDrawer);
}
}
});
cc.js.getset(c.prototype, "enabledDebugDraw", (function() {
return this._enabledDebugDraw;
}), (function(t) {
if (t && !this._enabledDebugDraw) {
this._debugDrawer || (this._debugDrawer = new _ccsg.GraphicsNode());
cc.director.getScene()._sgNode.addChild(this._debugDrawer);
cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this.onSceneLaunched, this);
} else if (!t && this._enabledDebugDraw) {
this._debugDrawer.clear();
this._debugDrawer.removeFromParent(!1);
cc.director.off(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this.onSceneLaunched, this);
}
this._enabledDebugDraw = t;
}));
cc.CollisionManager = e.exports = c;
}), {
"./CCContact": 37
} ],
37: [ (function(t, e, i) {
var n = t("./CCIntersection"), o = cc.Enum({
None: 0,
CollisionEnter: 1,
CollisionStay: 2,
CollisionExit: 3
});
function r(t, e) {
this.collider1 = t;
this.collider2 = e;
this.touching = !1;
var i = t instanceof cc.BoxCollider || t instanceof cc.PolygonCollider, o = e instanceof cc.BoxCollider || e instanceof cc.PolygonCollider, r = t instanceof cc.CircleCollider, s = e instanceof cc.CircleCollider;
if (i && o) this.testFunc = n.polygonPolygon; else if (r && s) this.testFunc = n.circleCircle; else if (i && s) this.testFunc = n.polygonCircle; else if (r && o) {
this.testFunc = n.polygonCircle;
this.collider1 = e;
this.collider2 = t;
} else cc.errorID(6601, cc.js.getClassName(t), cc.js.getClassName(e));
}
r.prototype.test = function() {
var t = this.collider1.world, e = this.collider2.world;
return !!t.aabb.intersects(e.aabb) && (this.testFunc === n.polygonPolygon ? this.testFunc(t.points, e.points) : this.testFunc === n.circleCircle ? this.testFunc(t, e) : this.testFunc === n.polygonCircle && this.testFunc(t.points, e));
};
r.prototype.updateState = function() {
var t = this.test(), e = o.None;
if (t && !this.touching) {
this.touching = !0;
e = o.CollisionEnter;
} else if (t && this.touching) e = o.CollisionStay; else if (!t && this.touching) {
this.touching = !1;
e = o.CollisionExit;
}
return e;
};
r.CollisionType = o;
e.exports = r;
}), {
"./CCIntersection": 38
} ],
38: [ (function(t, e, i) {
var n = {};
function o(t, e, i, n) {
var o = (n.x - i.x) * (t.y - i.y) - (n.y - i.y) * (t.x - i.x), r = (e.x - t.x) * (t.y - i.y) - (e.y - t.y) * (t.x - i.x), s = (n.y - i.y) * (e.x - t.x) - (n.x - i.x) * (e.y - t.y);
if (0 !== s) {
var c = o / s, a = r / s;
if (0 <= c && c <= 1 && 0 <= a && a <= 1) return !0;
}
return !1;
}
n.lineLine = o;
n.lineRect = function(t, e, i) {
var n = new cc.Vec2(i.x, i.y), r = new cc.Vec2(i.x, i.yMax), s = new cc.Vec2(i.xMax, i.yMax), c = new cc.Vec2(i.xMax, i.y);
return !!(o(t, e, n, r) || o(t, e, r, s) || o(t, e, s, c) || o(t, e, c, n));
};
function r(t, e, i) {
for (var n = i.length, r = 0; r < n; ++r) {
if (o(t, e, i[r], i[(r + 1) % n])) return !0;
}
return !1;
}
n.linePolygon = r;
n.rectRect = function(t, e) {
var i = t.x, n = t.y, o = t.x + t.width, r = t.y + t.height, s = e.x, c = e.y, a = e.x + e.width, l = e.y + e.height;
return i <= a && o >= s && n <= l && r >= c;
};
n.rectPolygon = function(t, e) {
var i, n, o = new cc.Vec2(t.x, t.y), c = new cc.Vec2(t.x, t.yMax), a = new cc.Vec2(t.xMax, t.yMax), l = new cc.Vec2(t.xMax, t.y);
if (r(o, c, e)) return !0;
if (r(c, a, e)) return !0;
if (r(a, l, e)) return !0;
if (r(l, o, e)) return !0;
for (i = 0, n = e.length; i < n; ++i) if (s(e[i], t)) return !0;
return !!(s(o, e) || s(c, e) || s(a, e) || s(l, e));
};
n.polygonPolygon = function(t, e) {
var i, n;
for (i = 0, n = t.length; i < n; ++i) if (r(t[i], t[(i + 1) % n], e)) return !0;
for (i = 0, n = e.length; i < n; ++i) if (s(e[i], t)) return !0;
for (i = 0, n = t.length; i < n; ++i) if (s(t[i], e)) return !0;
return !1;
};
n.circleCircle = function(t, e) {
return t.position.sub(e.position).mag() < t.radius + e.radius;
};
n.polygonCircle = function(t, e) {
var i = e.position;
if (s(i, t)) return !0;
for (var n = 0, o = t.length; n < o; n++) if (c(i, 0 === n ? t[t.length - 1] : t[n - 1], t[n], !0) < e.radius) return !0;
return !1;
};
function s(t, e) {
for (var i = !1, n = t.x, o = t.y, r = e.length, s = 0, c = r - 1; s < r; c = s++) {
var a = e[s].x, l = e[s].y, h = e[c].x, u = e[c].y;
l > o != u > o && n < (h - a) * (o - l) / (u - l) + a && (i = !i);
}
return i;
}
n.pointInPolygon = s;
function c(t, e, i, n) {
var o, r = i.x - e.x, s = i.y - e.y, c = r * r + s * s, a = ((t.x - e.x) * r + (t.y - e.y) * s) / c;
o = n ? c ? a < 0 ? e : a > 1 ? i : cc.v2(e.x + a * r, e.y + a * s) : e : cc.v2(e.x + a * r, e.y + a * s);
r = t.x - o.x;
s = t.y - o.y;
return Math.sqrt(r * r + s * s);
}
n.pointLineDistance = c;
cc.Intersection = e.exports = n;
}), {} ],
39: [ (function(t, e, i) {
cc.Collider.Polygon = cc.Class({
properties: {
threshold: {
default: 1,
serializable: !1,
visible: !1
},
_offset: cc.v2(0, 0),
offset: {
get: function() {
return this._offset;
},
set: function(t) {
this._offset = t;
},
type: cc.Vec2
},
points: {
tooltip: !1,
default: function() {
return [ cc.v2(-50, -50), cc.v2(50, -50), cc.v2(50, 50), cc.v2(-50, 50) ];
},
type: [ cc.Vec2 ]
}
},
resetPointsByContour: !1
});
var n = cc.Class({
name: "cc.PolygonCollider",
extends: cc.Collider,
mixins: [ cc.Collider.Polygon ],
editor: !1
});
cc.PolygonCollider = e.exports = n;
}), {} ],
40: [ (function(t, e, i) {
t("./CCCollisionManager");
t("./CCCollider");
t("./CCBoxCollider");
t("./CCCircleCollider");
t("./CCPolygonCollider");
}), {
"./CCBoxCollider": 33,
"./CCCircleCollider": 34,
"./CCCollider": 35,
"./CCCollisionManager": 36,
"./CCPolygonCollider": 39
} ],
41: [ (function(i, n, o) {
i("./platform/CCClass");
var r = i("./platform/CCObject").Flags, s = i("./platform/js").array, c = r.IsStartCalled, a = r.IsOnEnableCalled, l = (r.IsEditorOnEnableCalled, 
"c.start();c._objFlags|=" + c), h = "c.update(dt)", u = "c.lateUpdate(dt)";
function d(t, e) {
for (var i = e.constructor._executionOrder, n = e.__instanceId, o = 0, r = t.length - 1, s = r >>> 1; o <= r; s = o + r >>> 1) {
var c = t[s], a = c.constructor._executionOrder;
if (a > i) r = s - 1; else if (a < i) o = s + 1; else {
var l = c.__instanceId;
if (l > n) r = s - 1; else {
if (!(l < n)) return s;
o = s + 1;
}
}
}
return ~o;
}
function f(t, e) {
for (var i = t.array, n = t.i + 1; n < i.length; ) {
var o = i[n];
if (o._enabled && o.node._activeInHierarchy) ++n; else {
t.removeAt(n);
e && (o._objFlags &= ~e);
}
}
}
var _ = cc.Class({
__ctor__: function(t) {
var e = s.MutableForwardIterator;
this._zero = new e([]);
this._neg = new e([]);
this._pos = new e([]);
0;
this._invoke = t;
},
statics: {
stableRemoveInactive: f
},
add: null,
remove: null,
invoke: null
});
function p(t, e) {
return t.constructor._executionOrder - e.constructor._executionOrder;
}
var g = cc.Class({
extends: _,
add: function(t) {
var e = t.constructor._executionOrder;
(0 === e ? this._zero : e < 0 ? this._neg : this._pos).array.push(t);
},
remove: function(t) {
var e = t.constructor._executionOrder;
(0 === e ? this._zero : e < 0 ? this._neg : this._pos).fastRemove(t);
},
cancelInactive: function(t) {
f(this._zero, t);
f(this._neg, t);
f(this._pos, t);
},
invoke: function() {
var t = this._neg;
if (t.array.length > 0) {
t.array.sort(p);
this._invoke(t);
t.array.length = 0;
}
this._invoke(this._zero);
this._zero.array.length = 0;
var e = this._pos;
if (e.array.length > 0) {
e.array.sort(p);
this._invoke(e);
e.array.length = 0;
}
}
}), v = cc.Class({
extends: _,
add: function(t) {
var e = t.constructor._executionOrder;
if (0 === e) this._zero.array.push(t); else {
var i = e < 0 ? this._neg.array : this._pos.array, n = d(i, t);
n < 0 && i.splice(~n, 0, t);
}
},
remove: function(t) {
var e = t.constructor._executionOrder;
if (0 === e) this._zero.fastRemove(t); else {
var i = e < 0 ? this._neg : this._pos, n = d(i.array, t);
n >= 0 && i.removeAt(n);
}
},
invoke: function(t) {
this._neg.array.length > 0 && this._invoke(this._neg, t);
this._invoke(this._zero, t);
this._pos.array.length > 0 && this._invoke(this._pos, t);
}
});
function y(i, n) {
if ("function" === ("object" === (e = typeof i) ? t(i) : e)) return n ? function(t, e) {
var n = t.array;
for (t.i = 0; t.i < n.length; ++t.i) {
var o = n[t.i];
i(o, e);
}
} : function(t) {
var e = t.array;
for (t.i = 0; t.i < e.length; ++t.i) {
var n = e[t.i];
i(n);
}
};
var o = "var a=it.array;for(it.i=0;it.i<a.length;++it.i){var c=a[it.i];" + i + "}";
return n ? Function("it", "dt", o) : Function("it", o);
}
function m() {
this.startInvoker = new g(y(l));
this.updateInvoker = new v(y(h, !0));
this.lateUpdateInvoker = new v(y(u, !0));
this.scheduleInNextFrame = [];
this._updating = !1;
}
var C = cc.Class({
ctor: m,
unscheduleAll: m,
statics: {
LifeCycleInvoker: _,
OneOffInvoker: g,
createInvokeImpl: y,
invokeOnEnable: function(t) {
var e = cc.director._compScheduler, i = t.array;
for (t.i = 0; t.i < i.length; ++t.i) {
var n = i[t.i];
if (n._enabled) {
n.onEnable();
!n.node._activeInHierarchy || e._onEnabled(n);
}
}
}
},
_onEnabled: function(t) {
cc.director.getScheduler().resumeTarget(t);
t._objFlags |= a;
this._updating ? this.scheduleInNextFrame.push(t) : this._scheduleImmediate(t);
},
_onDisabled: function(t) {
cc.director.getScheduler().pauseTarget(t);
t._objFlags &= ~a;
var e = this.scheduleInNextFrame.indexOf(t);
if (e >= 0) s.fastRemoveAt(this.scheduleInNextFrame, e); else {
!t.start || t._objFlags & c || this.startInvoker.remove(t);
t.update && this.updateInvoker.remove(t);
t.lateUpdate && this.lateUpdateInvoker.remove(t);
}
},
enableComp: function(t, e) {
if (!(t._objFlags & a)) {
if (t.onEnable) {
if (e) {
e.add(t);
return;
}
t.onEnable();
if (!t.node._activeInHierarchy) return;
}
this._onEnabled(t);
}
},
disableComp: function(t) {
if (t._objFlags & a) {
t.onDisable && t.onDisable();
this._onDisabled(t);
}
},
_scheduleImmediate: function(t) {
!t.start || t._objFlags & c || this.startInvoker.add(t);
t.update && this.updateInvoker.add(t);
t.lateUpdate && this.lateUpdateInvoker.add(t);
},
_deferredSchedule: function() {
for (var t = this.scheduleInNextFrame, e = 0, i = t.length; e < i; e++) {
var n = t[e];
this._scheduleImmediate(n);
}
t.length = 0;
},
startPhase: function() {
this._updating = !0;
this.scheduleInNextFrame.length > 0 && this._deferredSchedule();
this.startInvoker.invoke();
},
updatePhase: function(t) {
this.updateInvoker.invoke(t);
},
lateUpdatePhase: function(t) {
this.lateUpdateInvoker.invoke(t);
this._updating = !1;
}
});
n.exports = C;
}), {
"./platform/CCClass": 128,
"./platform/CCObject": 132,
"./platform/js": 143,
"./utils/misc": 155
} ],
42: [ (function(t, e, i) {
var n = t("../../animation/animation-animator"), o = t("../../animation/animation-clip");
function r(t, e) {
return t === e || t && e && (t.name === e.name || t._uuid === e._uuid);
}
var s = cc.Class({
name: "cc.Animation",
extends: t("./CCComponent"),
mixins: [ cc.EventTarget ],
editor: !1,
ctor: function() {
cc.EventTarget.call(this);
this._animator = null;
this._nameToState = {};
this._didInit = !1;
this._currentClip = null;
},
properties: {
_defaultClip: {
default: null,
type: o
},
defaultClip: {
type: o,
get: function() {
return this._defaultClip;
},
set: function(t) {},
tooltip: !1
},
currentClip: {
get: function() {
return this._currentClip;
},
set: function(t) {
this._currentClip = t;
},
type: o,
visible: !1
},
_clips: {
default: [],
type: [ o ],
tooltip: !1,
visible: !0
},
playOnLoad: {
default: !1,
tooltip: !1
}
},
start: function() {
if (this.playOnLoad && this._defaultClip) {
if (!(this._animator && this._animator.isPlaying)) {
var t = this.getAnimationState(this._defaultClip.name);
this._animator.playState(t);
}
}
},
onEnable: function() {
this._animator && this._animator.resume();
},
onDisable: function() {
this._animator && this._animator.pause();
},
onDestroy: function() {
this.stop();
},
getClips: function() {
return this._clips;
},
play: function(t, e) {
var i = this.playAdditive(t, e);
this._animator.stopStatesExcept(i);
return i;
},
playAdditive: function(t, e) {
this._init();
var i = this.getAnimationState(t || this._defaultClip && this._defaultClip.name);
if (i) {
this.enabled = !0;
var n = this._animator;
if (n.isPlaying && i.isPlaying) if (i.isPaused) n.resumeState(i); else {
n.stopState(i);
n.playState(i, e);
} else n.playState(i, e);
this.enabledInHierarchy || n.pause();
this.currentClip = i.clip;
}
return i;
},
stop: function(t) {
if (this._didInit) if (t) {
var e = this._nameToState[t];
e && this._animator.stopState(e);
} else this._animator.stop();
},
pause: function(t) {
if (this._didInit) if (t) {
var e = this._nameToState[t];
e && this._animator.pauseState(e);
} else this.enabled = !1;
},
resume: function(t) {
if (this._didInit) if (t) {
var e = this._nameToState[t];
e && this._animator.resumeState(e);
} else this.enabled = !0;
},
setCurrentTime: function(t, e) {
this._init();
if (e) {
var i = this._nameToState[e];
i && this._animator.setStateTime(i, t);
} else this._animator.setStateTime(t);
},
getAnimationState: function(t) {
this._init();
var e = this._nameToState[t];
0;
e && !e.curveLoaded && this._animator._reloadClip(e);
return e || null;
},
addClip: function(t, e) {
if (t) {
this._init();
cc.js.array.contains(this._clips, t) || this._clips.push(t);
e = e || t.name;
var i = this._nameToState[e];
if (i) {
if (i.clip === t) return i;
var n = this._clips.indexOf(i.clip);
-1 !== n && this._clips.splice(n, 1);
}
var o = new cc.AnimationState(t, e);
this._nameToState[e] = o;
return o;
}
cc.warnID(3900);
},
removeClip: function(t, e) {
if (t) {
this._init();
var i;
for (var n in this._nameToState) {
if ((i = this._nameToState[n]).clip === t) break;
}
if (t === this._defaultClip) {
if (!e) {
cc.warnID(3902);
return;
}
this._defaultClip = null;
}
if (i && i.isPlaying) {
if (!e) {
cc.warnID(3903);
return;
}
this.stop(i.name);
}
this._clips = this._clips.filter((function(e) {
return e !== t;
}));
i && delete this._nameToState[i.name];
} else cc.warnID(3901);
},
sample: function(t) {
this._init();
if (t) {
var e = this._nameToState[t];
e && e.sample();
} else this._animator.sample();
},
on: function(t, e, i, n) {
this._init();
for (var o = cc.EventTarget.prototype.on.call(this, t, e, i, n), r = this._animator._anims.array, s = 0; s < r.length; ++s) r[s]._setListeners(this);
return o;
},
off: function(t, e, i, n) {
this._init();
cc.EventTarget.prototype.off.call(this, t, e, i, n);
var o = this._nameToState;
for (var r in o) {
o[r]._setListeners(null);
}
},
_init: function() {
if (!this._didInit) {
this._didInit = !0;
this._animator = new n(this.node, this);
this._createStates();
}
},
_createStates: function() {
this._nameToState = {};
for (var t = null, e = !1, i = 0; i < this._clips.length; ++i) {
var n = this._clips[i];
if (n) {
t = new cc.AnimationState(n);
0;
this._nameToState[t.name] = t;
r(this._defaultClip, n) && (e = t);
}
}
if (this._defaultClip && !e) {
t = new cc.AnimationState(this._defaultClip);
0;
this._nameToState[t.name] = t;
}
}
});
cc.Animation = e.exports = s;
}), {
"../../animation/animation-animator": 3,
"../../animation/animation-clip": 4,
"./CCComponent": 47
} ],
43: [ (function(i, n, o) {
var r = cc.Audio, s = i("../assets/CCAudioClip"), c = cc.Class({
name: "cc.AudioSource",
extends: i("./CCComponent"),
editor: !1,
ctor: function() {
this.audio = new r();
},
properties: {
_clip: {
default: null,
type: s
},
_volume: 1,
_mute: !1,
_loop: !1,
_pausedFlag: {
default: !1,
serializable: !1
},
isPlaying: {
get: function() {
return this.audio.getState() === cc.Audio.State.PLAYING;
},
visible: !1
},
clip: {
get: function() {
return this._clip;
},
set: function(i) {
var n = this;
if ("string" === ("object" === (e = typeof i) ? t(i) : e)) {
var o = (function() {
cc.warnID(8401, "cc.AudioSource", "cc.AudioClip", "AudioClip", "cc.AudioClip", "audio");
var t = n;
s._loadByUrl(i, (function(e, i) {
i && (t.clip = i);
}));
return {
v: void 0
};
})();
if ("object" === ("object" === (e = typeof o) ? t(o) : e)) return o.v;
}
if (i !== this._clip) {
this._clip = i;
this.audio.stop();
this.preload && (this.audio.src = this._clip);
}
},
type: s,
tooltip: !1,
animatable: !1
},
volume: {
get: function() {
return this._volume;
},
set: function(t) {
t = cc.clamp01(t);
this._volume = t;
this._mute || this.audio.setVolume(t);
return t;
},
tooltip: !1
},
mute: {
get: function() {
return this._mute;
},
set: function(t) {
this._mute = t;
this.audio.setVolume(t ? 0 : this._volume);
return t;
},
animatable: !1,
tooltip: !1
},
loop: {
get: function() {
return this._loop;
},
set: function(t) {
this._loop = t;
this.audio.setLoop(t);
return t;
},
animatable: !1,
tooltip: !1
},
playOnLoad: {
default: !1,
tooltip: !1,
animatable: !1
},
preload: {
default: !1,
animatable: !1
}
},
_ensureDataLoaded: function() {
this.audio.src !== this._clip && (this.audio.src = this._clip);
},
_pausedCallback: function() {
if (!this.audio.paused) {
this.audio.pause();
this._pausedFlag = !0;
}
},
_restoreCallback: function() {
this._pausedFlag && this.audio.resume();
this._pausedFlag = !1;
},
onLoad: function() {
this.audio.setVolume(this._mute ? 0 : this._volume);
this.audio.setLoop(this._loop);
},
onEnable: function() {
this.preload && (this.audio.src = this._clip);
this.playOnLoad && this.play();
cc.game.on(cc.game.EVENT_HIDE, this._pausedCallback, this);
cc.game.on(cc.game.EVENT_SHOW, this._restoreCallback, this);
},
onDisable: function() {
this.stop();
cc.game.off(cc.game.EVENT_HIDE, this._pausedCallback, this);
cc.game.off(cc.game.EVENT_SHOW, this._restoreCallback, this);
},
onDestroy: function() {
this.stop();
this.audio.destroy();
cc.audioEngine.uncache(this._clip);
},
play: function() {
if (this._clip) {
var t = this.audio;
this._clip.loaded && t.stop();
this._ensureDataLoaded();
t.setCurrentTime(0);
t.play();
}
},
stop: function() {
this.audio.stop();
},
pause: function() {
this.audio.pause();
},
resume: function() {
this._ensureDataLoaded();
this.audio.resume();
},
rewind: function() {
this.audio.setCurrentTime(0);
},
getCurrentTime: function() {
return this.audio.getCurrentTime();
},
setCurrentTime: function(t) {
this.audio.setCurrentTime(t);
return t;
},
getDuration: function() {
return this.audio.getDuration();
}
});
cc.AudioSource = n.exports = c;
}), {
"../../audio/CCAudio": 1,
"../assets/CCAudioClip": 18,
"./CCComponent": 47
} ],
44: [ (function(t, e, i) {
var n = [ "touchstart", "touchmove", "touchend", "mousedown", "mousemove", "mouseup", "mouseenter", "mouseleave", "mousewheel" ];
function o(t) {
t.stopPropagation();
}
var r = cc.Class({
name: "cc.BlockInputEvents",
extends: t("./CCComponent"),
editor: {
menu: "i18n:MAIN_MENU.component.ui/Block Input Events",
inspector: "packages://inspector/inspectors/comps/block-input-events.js",
help: "i18n:COMPONENT.help_url.block-input-events"
},
onEnable: function() {
for (var t = 0; t < n.length; t++) this.node.on(n[t], o, this);
},
onDisable: function() {
for (var t = 0; t < n.length; t++) this.node.off(n[t], o, this);
}
});
cc.BlockInputEvents = e.exports = r;
}), {
"./CCComponent": 47
} ],
45: [ (function(t, e, i) {
var n = cc.Enum({
NONE: 0,
COLOR: 1,
SPRITE: 2,
SCALE: 3
}), o = cc.Class({
name: "cc.Button",
extends: t("./CCComponent"),
ctor: function() {
this._resetState();
this._fromColor = null;
this._toColor = null;
this._time = 0;
this._transitionFinished = !0;
this._fromScale = 1;
this._toScale = 1;
this._originalScale = 1;
this._sprite = null;
0;
},
_resetState: function() {
this._pressed = !1;
this._hovered = !1;
},
editor: !1,
properties: {
interactable: {
default: !0,
tooltip: !1,
notify: function(t) {
0;
this._updateState();
this.interactable || this._resetState();
},
animatable: !1
},
_resizeToTarget: {
animatable: !1,
set: function(t) {
t && this._resizeNodeToTargetNode();
}
},
enableAutoGrayEffect: {
default: !1,
tooltip: !1,
notify: function() {
this._updateDisabledState();
}
},
transition: {
default: n.NONE,
tooltip: !1,
type: n,
animatable: !1
},
normalColor: {
default: cc.color(214, 214, 214),
displayName: "Normal",
tooltip: !1,
notify: function() {
this._updateState();
}
},
pressedColor: {
default: cc.color(211, 211, 211),
displayName: "Pressed",
tooltip: !1
},
hoverColor: {
default: cc.Color.WHITE,
displayName: "Hover",
tooltip: !1
},
disabledColor: {
default: cc.color(124, 124, 124),
displayName: "Disabled",
tooltip: !1,
notify: function() {
this._updateState();
}
},
duration: {
default: .1,
range: [ 0, 10 ],
tooltip: !1
},
zoomScale: {
default: 1.2,
tooltip: !1
},
normalSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Normal",
tooltip: !1,
notify: function() {
this._updateState();
}
},
pressedSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Pressed",
tooltip: !1,
formerlySerializedAs: "pressedSprite",
notify: function() {
this._updateState();
}
},
hoverSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Hover",
tooltip: !1,
formerlySerializedAs: "hoverSprite",
notify: function() {
this._updateState();
}
},
disabledSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Disabled",
tooltip: !1,
notify: function() {
this._updateState();
}
},
target: {
default: null,
type: cc.Node,
tooltip: !1,
notify: function() {
this._applyTarget();
}
},
clickEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
}
},
statics: {
Transition: n
},
__preload: function() {
this.target || (this.target = this.node);
this._applyTarget();
this._updateState();
},
onEnable: function() {
this.normalSprite && this.normalSprite.ensureLoadTexture();
this.hoverSprite && this.hoverSprite.ensureLoadTexture();
this.pressedSprite && this.pressedSprite.ensureLoadTexture();
this.disabledSprite && this.disabledSprite.ensureLoadTexture();
this._registerEvent();
},
update: function(t) {
var e = this.target;
if (!this._transitionFinished && (this.transition === n.COLOR || this.transition === n.SCALE)) {
this.time += t;
var i = 1;
this.duration > 0 && (i = this.time / this.duration);
if (i >= 1) {
i = 1;
this._transitionFinished = !0;
}
this.transition === n.COLOR ? e.color = this._fromColor.lerp(this._toColor, i) : this.transition === n.SCALE && (e.scale = cc.lerp(this._fromScale, this._toScale, i));
}
},
_registerEvent: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
this.node.on(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
this.node.on(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
},
_getTargetSprite: function(t) {
var e = null;
t && (e = t.getComponent(cc.Sprite));
return e;
},
_applyTarget: function() {
this._sprite = this._getTargetSprite(this.target);
this.target && (this._originalScale = this.target.scale);
},
_onTouchBegan: function(t) {
if (this.interactable && this.enabledInHierarchy) {
this._pressed = !0;
this._updateState();
t.stopPropagation();
}
},
_onTouchMove: function(t) {
if (this.interactable && this.enabledInHierarchy && this._pressed) {
var e = t.touch, i = this.node._hitTest(e.getLocation());
if (this.transition === n.SCALE && this.target) if (i) {
this._fromScale = this._originalScale;
this._toScale = this._originalScale * this.zoomScale;
this._transitionFinished = !1;
} else {
this.time = 0;
this._transitionFinished = !0;
this.target.scale = this._originalScale;
} else {
var o;
o = i ? "pressed" : "normal";
this._applyTransition(o);
}
t.stopPropagation();
}
},
_onTouchEnded: function(t) {
if (this.interactable && this.enabledInHierarchy) {
if (this._pressed) {
cc.Component.EventHandler.emitEvents(this.clickEvents, t);
this.node.emit("click", this);
}
this._pressed = !1;
this._updateState();
t.stopPropagation();
}
},
_zoomUp: function() {
this._fromScale = this._originalScale;
this._toScale = this._originalScale * this.zoomScale;
this.time = 0;
this._transitionFinished = !1;
},
_zoomBack: function() {
this._fromScale = this.target.scale;
this._toScale = this._originalScale;
this.time = 0;
this._transitionFinished = !1;
},
_onTouchCancel: function() {
if (this.interactable && this.enabledInHierarchy) {
this._pressed = !1;
this._updateState();
}
},
_onMouseMoveIn: function() {
if (!this._pressed && this.interactable && this.enabledInHierarchy && (this.transition !== n.SPRITE || this.hoverSprite) && !this._hovered) {
this._hovered = !0;
this._updateState();
}
},
_onMouseMoveOut: function() {
if (this._hovered) {
this._hovered = !1;
this._updateState();
}
},
_updateState: function() {
var t = this._getButtonState();
this._applyTransition(t);
this._updateDisabledState();
},
onDisable: function() {
this._hovered = !1;
this._pressed = !1;
this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
this.node.off(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
this.node.off(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
},
_getButtonState: function() {
return this.interactable ? this._pressed ? "pressed" : this._hovered ? "hover" : "normal" : "disabled";
},
_updateColorTransition: function(t) {
var e = this[t + "Color"], i = this.target;
this._fromColor = i.color.clone();
this._toColor = e;
this.time = 0;
this._transitionFinished = !1;
},
_updateSpriteTransition: function(t) {
var e = this[t + "Sprite"];
this._sprite && e && (this._sprite.spriteFrame = e);
},
_updateScaleTransition: function(t) {
"pressed" === t ? this._zoomUp() : this._zoomBack();
},
_applyTransition: function(t) {
var e = this.transition;
e === n.COLOR ? this._updateColorTransition(t) : e === n.SPRITE ? this._updateSpriteTransition(t) : e === n.SCALE && this._updateScaleTransition(t);
},
_resizeNodeToTargetNode: !1,
_updateDisabledState: function() {
this._sprite && this._sprite._sgNode.setState(0);
this.enableAutoGrayEffect && this.transition !== n.COLOR && (this.transition === n.SPRITE && this.disabledSprite || this._sprite && !this.interactable && this._sprite._sgNode.setState(1));
}
});
cc.Button = e.exports = o;
}), {
"./CCComponent": 47
} ],
46: [ (function(t, e, i) {
var n = t("../event-manager"), o = {
getContentSize: function() {
return cc.visibleRect;
},
setContentSize: function(t) {},
_getWidth: function() {
return this.getContentSize().width;
},
_getHeight: function() {
return this.getContentSize().height;
}
}, r = cc.Class({
name: "cc.Canvas",
extends: t("./CCComponent"),
editor: !1,
resetInEditor: !1,
statics: {
instance: null
},
properties: {
_designResolution: cc.size(960, 640),
designResolution: {
get: function() {
return cc.size(this._designResolution);
},
set: function(t) {
this._designResolution.width = t.width;
this._designResolution.height = t.height;
this.applySettings();
},
tooltip: !1
},
_fitWidth: !1,
_fitHeight: !0,
fitHeight: {
get: function() {
return this._fitHeight;
},
set: function(t) {
if (this._fitHeight !== t) {
this._fitHeight = t;
this.applySettings();
}
},
tooltip: !1
},
fitWidth: {
get: function() {
return this._fitWidth;
},
set: function(t) {
if (this._fitWidth !== t) {
this._fitWidth = t;
this.applySettings();
}
},
tooltip: !1
}
},
ctor: function() {
this._thisOnResized = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: "window-resize",
callback: this.onResized.bind(this)
});
},
__preload: function() {
if (r.instance) return cc.errorID(6700, this.node.name, r.instance.node.name);
r.instance = this;
if (this.node._sizeProvider) {
} else this.node._sizeProvider = o;
cc.director.on(cc.Director.EVENT_BEFORE_VISIT, this.alignWithScreen, this);
n.addListener(this._thisOnResized, 1);
this.applySettings();
this.onResized();
},
onDestroy: function() {
this.node._sizeProvider === o && (this.node._sizeProvider = null);
cc.director.off(cc.Director.EVENT_BEFORE_VISIT, this.alignWithScreen, this);
n.removeListener(this._thisOnResized);
r.instance === this && (r.instance = null);
},
alignWithScreen: function() {
var t, e = cc.visibleRect, i = 0, n = 0;
if (!this.fitHeight && !this.fitWidth) {
i = .5 * ((t = cc.view.getDesignResolutionSize()).width - e.width);
n = .5 * (t.height - e.height);
}
this.node.setPosition(.5 * e.width + i, .5 * e.height + n);
},
onResized: function() {
this.alignWithScreen();
},
applySettings: function() {
var t, e = cc.ResolutionPolicy;
t = this.fitHeight && this.fitWidth ? e.SHOW_ALL : this.fitHeight || this.fitWidth ? this.fitWidth ? e.FIXED_WIDTH : e.FIXED_HEIGHT : e.NO_BORDER;
var i = this._designResolution;
cc.view.setDesignResolutionSize(i.width, i.height, t);
}
});
cc.Canvas = e.exports = r;
}), {
"../event-manager": 77,
"./CCComponent": 47
} ],
47: [ (function(i, n, o) {
var r = i("../platform/CCObject"), s = i("../platform/js"), c = new (i("../platform/id-generater"))("Comp"), a = r.Flags.IsOnEnableCalled, l = r.Flags.IsOnLoadCalled, h = cc.Class({
name: "cc.Component",
extends: r,
ctor: function() {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this.__eventTargets = [];
},
properties: {
node: {
default: null,
visible: !1
},
name: {
get: function() {
if (this._name) return this._name;
var t = cc.js.getClassName(this), e = t.lastIndexOf(".");
e >= 0 && (t = t.slice(e + 1));
return this.node.name + "<" + t + ">";
},
set: function(t) {
this._name = t;
},
visible: !1
},
_id: {
default: "",
serializable: !1
},
uuid: {
get: function() {
var t = this._id;
if (!t) {
t = this._id = c.getNewId();
0;
}
return t;
},
visible: !1
},
__scriptAsset: !1,
_enabled: !0,
enabled: {
get: function() {
return this._enabled;
},
set: function(t) {
if (this._enabled !== t) {
this._enabled = t;
if (this.node._activeInHierarchy) {
var e = cc.director._compScheduler;
t ? e.enableComp(this) : e.disableComp(this);
}
}
},
visible: !1
},
enabledInHierarchy: {
get: function() {
return (this._objFlags & a) > 0;
},
visible: !1
},
_isOnLoadCalled: {
get: function() {
return this._objFlags & l;
}
}
},
update: null,
lateUpdate: null,
__preload: null,
onLoad: null,
start: null,
onEnable: null,
onDisable: null,
onDestroy: null,
onFocusInEditor: null,
onLostFocusInEditor: null,
resetInEditor: null,
addComponent: function(t) {
return this.node.addComponent(t);
},
getComponent: function(t) {
return this.node.getComponent(t);
},
getComponents: function(t) {
return this.node.getComponents(t);
},
getComponentInChildren: function(t) {
return this.node.getComponentInChildren(t);
},
getComponentsInChildren: function(t) {
return this.node.getComponentsInChildren(t);
},
_getLocalBounds: null,
onRestore: null,
destroy: function() {
this._super() && this._enabled && this.node._activeInHierarchy && cc.director._compScheduler.disableComp(this);
},
_onPreDestroy: function() {
this.unscheduleAllCallbacks();
for (var t = this.__eventTargets, e = 0, i = t.length; e < i; ++e) {
var n = t[e];
n && n.targetOff(this);
}
t.length = 0;
0;
cc.director._nodeActivator.destroyComp(this);
this.node._removeComponent(this);
0;
},
_instantiate: function(t) {
t || (t = cc.instantiate._clone(this, this));
t.node = null;
return t;
},
isRunning: function() {
return this.enabledInHierarchy;
},
schedule: function(t, e, i, n) {
cc.assertID(t, 1619);
cc.assertID(e >= 0, 1620);
e = e || 0;
i = isNaN(i) ? cc.macro.REPEAT_FOREVER : i;
n = n || 0;
var o = cc.director.getScheduler(), r = o.isTargetPaused(this);
o.schedule(t, this, e, i, n, r);
},
scheduleOnce: function(t, e) {
this.schedule(t, 0, 0, e);
},
unschedule: function(t) {
t && cc.director.getScheduler().unschedule(t, this);
},
unscheduleAllCallbacks: function() {
cc.director.getScheduler().unscheduleAllForTarget(this);
}
});
h._requireComponent = null;
h._executionOrder = 0;
0;
s.value(h, "_registerEditorProps", (function(i, n) {
var o = n.requireComponent;
o && (i._requireComponent = o);
var r = n.executionOrder;
r && "number" === ("object" === (e = typeof r) ? t(r) : e) && (i._executionOrder = r);
}));
h.prototype.__scriptUuid = "";
cc.Component = n.exports = h;
}), {
"../platform/CCObject": 132,
"../platform/id-generater": 139,
"../platform/js": 143
} ],
48: [ (function(i, n, o) {
cc.Component.EventHandler = cc.Class({
name: "cc.ClickEvent",
properties: {
target: {
default: null,
type: cc.Node
},
component: {
default: ""
},
handler: {
default: ""
},
customEventData: {
default: ""
}
},
statics: {
emitEvents: function(t) {
"use strict";
var e, i, n;
if (arguments.length > 0) for (i = 0, n = (e = new Array(arguments.length - 1)).length; i < n; i++) e[i] = arguments[i + 1];
for (i = 0, n = t.length; i < n; i++) {
var o = t[i];
o instanceof cc.Component.EventHandler && o.emit(e);
}
}
},
emit: function(i) {
var n = this.target;
if (cc.isValid(n)) {
var o = n.getComponent(this.component);
if (cc.isValid(o)) {
var r = o[this.handler];
if ("function" === ("object" === (e = typeof r) ? t(r) : e)) {
null != this.customEventData && "" !== this.customEventData && (i = i.slice()).push(this.customEventData);
r.apply(o, i);
}
}
}
}
});
}), {} ],
49: [ (function(t, e, i) {
t("../editbox/CCSGEditBox");
var n = _ccsg.EditBox.KeyboardReturnType, o = _ccsg.EditBox.InputMode, r = _ccsg.EditBox.InputFlag, s = cc.Class({
name: "cc.EditBox",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_useOriginalSize: !0,
_string: "",
string: {
tooltip: !1,
get: function() {
return this._sgNode.string;
},
set: function(t) {
this._sgNode.string = this._string = t;
}
},
backgroundImage: {
tooltip: !1,
default: null,
type: cc.SpriteFrame,
notify: function() {
var t = this._sgNode, e = t.getBackgroundSprite();
if (this.backgroundImage) {
this._createBackgroundSprite().setContentSize(t.getContentSize());
} else e.removeFromParent();
}
},
returnType: {
default: n.DEFAULT,
tooltip: !1,
displayName: "KeyboardReturnType",
type: n,
notify: function() {
this._sgNode.returnType = this.returnType;
}
},
inputFlag: {
tooltip: !1,
default: r.DEFAULT,
type: r,
notify: function() {
this._sgNode.inputFlag = this.inputFlag;
}
},
inputMode: {
tooltip: !1,
default: o.ANY,
type: o,
notify: function() {
this._sgNode.inputMode = this.inputMode;
}
},
fontSize: {
tooltip: !1,
default: 20,
notify: function() {
this._sgNode.fontSize = this.fontSize;
}
},
lineHeight: {
tooltip: !1,
default: 40,
notify: function() {
this._sgNode.setLineHeight(this.lineHeight);
}
},
fontColor: {
tooltip: !1,
default: cc.Color.WHITE,
notify: function() {
this._sgNode.fontColor = this.fontColor;
}
},
placeholder: {
tooltip: !1,
default: "Enter text here...",
notify: function() {
this._sgNode.placeholder = this.placeholder;
}
},
placeholderFontSize: {
tooltip: !1,
default: 20,
notify: function() {
this._sgNode.placeholderFontSize = this.placeholderFontSize;
}
},
placeholderFontColor: {
tooltip: !1,
default: cc.Color.GRAY,
notify: function() {
this._sgNode.placeholderFontColor = this.placeholderFontColor;
}
},
maxLength: {
tooltip: !1,
default: 20,
notify: function() {
this._sgNode.maxLength = this.maxLength;
}
},
stayOnTop: {
tooltip: !1,
default: !1,
notify: function() {
0;
}
},
_tabIndex: 0,
tabIndex: {
tooltip: !1,
get: function() {
return this._tabIndex;
},
set: function(t) {
this._tabIndex = t;
this._sgNode.setTabIndex(t);
}
},
editingDidBegan: {
default: [],
type: cc.Component.EventHandler
},
textChanged: {
default: [],
type: cc.Component.EventHandler
},
editingDidEnded: {
default: [],
type: cc.Component.EventHandler
},
editingReturn: {
default: [],
type: cc.Component.EventHandler
}
},
statics: {
KeyboardReturnType: n,
InputFlag: r,
InputMode: o
},
_applyCapInset: function(t) {
var e = this.backgroundImage;
t.setInsetTop(e.insetTop);
t.setInsetBottom(e.insetBottom);
t.setInsetRight(e.insetRight);
t.setInsetLeft(e.insetLeft);
},
_createSgNode: function() {
return new _ccsg.EditBox(cc.size(160, 40));
},
_createBackgroundSprite: function() {
var t = this._sgNode, e = new cc.Scale9Sprite();
e.setRenderingType(cc.Scale9Sprite.RenderingType.SLICED);
if (this.backgroundImage) {
this.backgroundImage.ensureLoadTexture();
e.setSpriteFrame(this.backgroundImage);
this._applyCapInset(e);
}
t.initWithSizeAndBackgroundSprite(cc.size(160, 40), e);
return e;
},
_initSgNode: function() {
var t = this._sgNode;
0;
this._createBackgroundSprite();
t.setContentSize(this.node.getContentSize());
t.inputMode = this.inputMode;
t.maxLength = this.maxLength;
t.string = this._string;
t.fontSize = this.fontSize;
t.fontColor = this.fontColor;
t.placeholder = this.placeholder;
t.placeholderFontSize = this.placeholderFontSize;
t.placeholderFontColor = this.placeholderFontColor;
t.inputFlag = this.inputFlag;
t.returnType = this.returnType;
t.setLineHeight(this.lineHeight);
t.stayOnTop(this.stayOnTop);
t.setTabIndex(this.tabIndex);
t.setDelegate(this);
},
editBoxEditingDidBegan: function() {
cc.Component.EventHandler.emitEvents(this.editingDidBegan, this);
this.node.emit("editing-did-began", this);
},
editBoxEditingDidEnded: function() {
cc.Component.EventHandler.emitEvents(this.editingDidEnded, this);
this.node.emit("editing-did-ended", this);
},
editBoxTextChanged: function(t, e) {
cc.Component.EventHandler.emitEvents(this.textChanged, e, this);
this.node.emit("text-changed", this);
},
editBoxEditingReturn: function() {
cc.Component.EventHandler.emitEvents(this.editingReturn, this);
this.node.emit("editing-return", this);
},
onDestroy: function() {
this._sgNode.setDelegate(null);
this._super();
},
__preload: function() {
this._super();
this._registerEvent();
},
_registerEvent: function() {
0;
},
_onTouchBegan: function(t) {
this._sgNode && this._sgNode._onTouchBegan(t.touch);
t.stopPropagation();
},
_onTouchEnded: function(t) {
this._sgNode && this._sgNode._onTouchEnded();
t.stopPropagation();
},
setFocus: function() {
this._sgNode && this._sgNode.setFocus();
},
isFocused: function() {
var t = !1;
this._sgNode && (t = this._sgNode.isFocused());
return t;
}
});
s.prototype.editBoxEditingDidBegin = function(t) {
this.editBoxEditingDidBegan(t);
};
s.prototype.editBoxEditingDidEnd = function(t) {
this.editBoxEditingDidEnded(t);
};
cc.EditBox = e.exports = s;
}), {
"../editbox/CCSGEditBox": 1
} ],
50: [ (function(i, n, o) {
i("../label/CCSGLabel");
i("../label/CCSGLabelCanvasRenderCmd");
i("../label/CCSGLabelWebGLRenderCmd");
var r = cc.TextAlignment, s = cc.VerticalTextAlignment, c = _ccsg.Label.Overflow;
var a = cc.Class({
name: "cc.Label",
extends: cc._RendererUnderSG,
ctor: function() {
0;
},
editor: !1,
_updateSgNodeString: function() {
this._sgNode.setString(this.string);
this._updateNodeSize();
},
_updateSgNodeFontSize: function() {
if (this._sgNode) {
this._sgNode.setFontSize(this._fontSize);
this._updateNodeSize();
}
},
properties: {
_useOriginalSize: !0,
string: {
default: "Label",
multiline: !0,
tooltip: !1,
notify: function() {
this._sgNode && this._updateSgNodeString();
}
},
horizontalAlign: {
default: r.LEFT,
type: r,
tooltip: !1,
notify: function() {
this._sgNode && this._sgNode.setHorizontalAlign(this.horizontalAlign);
},
animatable: !1
},
verticalAlign: {
default: s.TOP,
type: s,
tooltip: !1,
notify: function() {
this._sgNode && this._sgNode.setVerticalAlign(this.verticalAlign);
},
animatable: !1
},
_actualFontSize: {
default: 40
},
actualFontSize: {
displayName: "Actual Font Size",
animatable: !1,
readonly: !0,
get: function() {
this._sgNode && (this._actualFontSize = this._sgNode.getFontSize());
return this._actualFontSize;
}
},
_fontSize: 40,
fontSize: {
get: function() {
return this._fontSize;
},
set: function(t) {
this._fontSize = t;
this._updateSgNodeFontSize();
},
tooltip: !1
},
fontFamily: {
default: "Arial",
tooltip: !1,
notify: function() {
this._sgNode && this._sgNode.setFontFamily(this.fontFamily);
},
animatable: !1
},
_lineHeight: 40,
lineHeight: {
get: function() {
this._sgNode && (this._lineHeight = this._sgNode.getLineHeight());
return this._lineHeight;
},
set: function(t) {
this._lineHeight = t;
if (this._sgNode) {
this._sgNode.setLineHeight(t);
this._updateNodeSize();
}
},
tooltip: !1
},
overflow: {
default: c.NONE,
type: c,
tooltip: !1,
notify: function() {
if (this._sgNode) {
this._sgNode.setOverflow(this.overflow);
this._updateNodeSize();
}
},
animatable: !1
},
_enableWrapText: !0,
enableWrapText: {
get: function() {
this._sgNode && (this._enableWrapText = this._sgNode.isWrapTextEnabled());
return this._enableWrapText;
},
set: function(t) {
this._enableWrapText = t;
this._sgNode && this._sgNode.enableWrapText(t);
},
animatable: !1,
tooltip: !1
},
_N$file: null,
font: {
get: function() {
return this._N$file;
},
set: function(i) {
i || (this._isSystemFontUsed = !0);
0;
this._N$file = i;
this._bmFontOriginalSize = -1;
i && this._isSystemFontUsed && (this._isSystemFontUsed = !1);
if (this._sgNode) {
"string" === ("object" === (e = typeof i) ? t(i) : e) && cc.warnID(4e3);
var n = this.font;
if (n instanceof cc.BitmapFont) if (n.spriteFrame) if (n.spriteFrame.textureLoaded()) this._sgNode.setFontAsset(n); else {
cc.warnID(4012, n.name);
this._sgNode.setFontFamily("");
} else {
cc.warnID(4011, n.name);
this._sgNode.setFontFamily("");
} else this._sgNode.setFontAsset(n);
}
i instanceof cc.BitmapFont && (this._bmFontOriginalSize = i.fontSize);
},
type: cc.Font,
tooltip: !1,
animatable: !1
},
_isSystemFontUsed: !0,
useSystemFont: {
get: function() {
return this._isSystemFontUsed;
},
set: function(t) {
0;
this._isSystemFontUsed = !!t;
if (t) {
this.font = null;
this._sgNode && this._sgNode.setFontFamily(this.fontFamily);
}
},
animatable: !1,
tooltip: !1
},
_bmFontOriginalSize: {
displayName: "BMFont Original Size",
default: -1,
serializable: !1,
readonly: !0,
visible: !0,
animatable: !1
},
_spacingX: 0,
spacingX: {
get: function() {
return this._spacingX;
},
set: function(t) {
this._spacingX = t;
if (this._sgNode) {
this._sgNode.setSpacingX(this.spacingX);
this._updateNodeSize();
}
}
}
},
statics: {
HorizontalAlign: r,
VerticalAlign: s,
Overflow: c
},
__preload: function() {
this._super();
0;
this._updateNodeSize();
},
_createSgNode: function() {
return null;
},
_initSgNode: function() {
var i, n = this.font;
"string" === ("object" === (e = typeof n) ? t(n) : e) && cc.warnID(4e3);
if (n instanceof cc.BitmapFont) if (n.spriteFrame) if (n.spriteFrame.textureLoaded()) i = this._sgNode = new _ccsg.Label(this.string, JSON.stringify(n._fntConfig), n.spriteFrame); else {
cc.warnID(4012, n.name);
i = this._sgNode = new _ccsg.Label(this.string, null, null, this._fontSize);
} else {
cc.warnID(4011, n.name);
i = this._sgNode = _ccsg.Label.pool.get(this.string);
} else i = this._sgNode = _ccsg.Label.pool.get(this.string, n, null, this._fontSize);
n instanceof cc.BitmapFont && (this._bmFontOriginalSize = n.fontSize);
i.setVisible(!1);
i.setHorizontalAlign(this.horizontalAlign);
i.setVerticalAlign(this.verticalAlign);
i.setFontSize(this._fontSize);
this.useSystemFont && i.setFontFamily(this.fontFamily);
i.setOverflow(this.overflow);
i.enableWrapText(this._enableWrapText);
i.setLineHeight(this._lineHeight);
i.setString(this.string);
n instanceof cc.BitmapFont && i.setSpacingX(this.spacingX);
0;
i.setContentSize(this.node.getContentSize());
i.setColor(this.node.color);
},
_updateNodeSize: function() {
this._sgNode && this._sgNode.parent && (this.overflow !== c.NONE && this.overflow !== c.RESIZE_HEIGHT || this.node.setContentSize(this._sgNode.getContentSize()));
},
onDestroy: function() {
var t = this._sgNode;
this._super();
if (t) {
t.removeFromParent(!0);
_ccsg.Label.pool.put(t);
}
}
});
cc.Label = n.exports = a;
}), {
"../label/CCSGLabel": 1,
"../label/CCSGLabelCanvasRenderCmd": 1,
"../label/CCSGLabelWebGLRenderCmd": 1
} ],
51: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.LabelOutline",
extends: t("./CCComponent"),
editor: !1,
ctor: function() {
this._labelSGNode = null;
},
properties: {
_color: cc.color(255, 255, 255, 255),
_width: 1,
color: {
get: function() {
return this._color;
},
set: function(t) {
this._color = cc.color(t);
this._labelSGNode && this._labelSGNode.setOutlineColor(cc.color(this._color));
}
},
width: {
get: function() {
return this._width;
},
set: function(t) {
this._width = t;
if (this._labelSGNode) {
this._labelSGNode.setOutlineWidth(t);
this._labelSGNode.setMargin(t);
}
}
}
},
onEnable: function() {
var t = this.node.getComponent("cc.Label"), e = this._labelSGNode = t && t._sgNode;
if (this._labelSGNode) {
e.setOutlined(!0);
e.setOutlineColor(cc.color(this._color));
e.setOutlineWidth(this._width);
e.setMargin(this._width);
}
},
onDisable: function() {
if (this._labelSGNode) {
this._labelSGNode.setOutlined(!1);
this._labelSGNode.setMargin(0);
}
this._labelSGNode = null;
}
});
cc.LabelOutline = e.exports = n;
}), {
"./CCComponent": 47
} ],
52: [ (function(t, e, i) {
var n = cc.Enum({
NONE: 0,
HORIZONTAL: 1,
VERTICAL: 2,
GRID: 3
}), o = cc.Enum({
NONE: 0,
CONTAINER: 1,
CHILDREN: 2
}), r = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1
}), s = cc.Enum({
BOTTOM_TO_TOP: 0,
TOP_TO_BOTTOM: 1
}), c = cc.Enum({
LEFT_TO_RIGHT: 0,
RIGHT_TO_LEFT: 1
}), a = cc.Class({
name: "cc.Layout",
extends: t("./CCComponent"),
editor: !1,
properties: {
_layoutSize: cc.size(300, 200),
_layoutDirty: {
default: !0,
serializable: !1
},
_resize: o.NONE,
_N$layoutType: n.NONE,
type: {
type: n,
get: function() {
return this._N$layoutType;
},
set: function(t) {
this._N$layoutType = t;
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
},
resizeMode: {
type: o,
tooltip: !1,
animatable: !1,
get: function() {
return this._resize;
},
set: function(t) {
if (this.type !== n.NONE || t !== o.CHILDREN) {
this._resize = t;
this._doLayoutDirty();
}
}
},
cellSize: {
default: cc.size(40, 40),
tooltip: !1,
type: cc.Size,
notify: function() {
this._doLayoutDirty();
}
},
startAxis: {
default: r.HORIZONTAL,
tooltip: !1,
type: r,
notify: function() {
this._doLayoutDirty();
},
animatable: !1
},
_N$padding: {
default: 0
},
paddingLeft: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingRight: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingTop: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingBottom: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
spacingX: {
default: 0,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1
},
spacingY: {
default: 0,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1
},
verticalDirection: {
default: s.TOP_TO_BOTTOM,
type: s,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
},
horizontalDirection: {
default: c.LEFT_TO_RIGHT,
type: c,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
}
},
statics: {
Type: n,
VerticalDirection: s,
HorizontalDirection: c,
ResizeMode: o,
AxisDirection: r
},
_migratePaddingData: function() {
this.paddingLeft = this._N$padding;
this.paddingRight = this._N$padding;
this.paddingTop = this._N$padding;
this.paddingBottom = this._N$padding;
this._N$padding = 0;
},
onEnable: function() {
this._addEventListeners();
cc.sizeEqualToSize(this.node.getContentSize(), cc.size(0, 0)) && this.node.setContentSize(this._layoutSize);
0 !== this._N$padding && this._migratePaddingData();
this._doLayoutDirty();
},
onDisable: function() {
this._removeEventListeners();
},
_doLayoutDirty: function() {
this._layoutDirty = !0;
},
_addEventListeners: function() {
cc.director.on(cc.Director.EVENT_BEFORE_VISIT, this.updateLayout, this);
this.node.on("size-changed", this._resized, this);
this.node.on("anchor-changed", this._doLayoutDirty, this);
this.node.on("child-added", this._childAdded, this);
this.node.on("child-removed", this._childRemoved, this);
this.node.on("child-reorder", this._doLayoutDirty, this);
this._addChildrenEventListeners();
},
_removeEventListeners: function() {
cc.director.off(cc.Director.EVENT_BEFORE_VISIT, this.updateLayout, this);
this.node.off("size-changed", this._resized, this);
this.node.off("anchor-changed", this._doLayoutDirty, this);
this.node.off("child-added", this._childAdded, this);
this.node.off("child-removed", this._childRemoved, this);
this.node.off("child-reorder", this._doLayoutDirty, this);
this._removeChildrenEventListeners();
},
_addChildrenEventListeners: function() {
for (var t = this.node.children, e = 0; e < t.length; ++e) {
var i = t[e];
i.on("size-changed", this._doLayoutDirty, this);
i.on("position-changed", this._doLayoutDirty, this);
i.on("anchor-changed", this._doLayoutDirty, this);
i.on("active-in-hierarchy-changed", this._doLayoutDirty, this);
}
},
_removeChildrenEventListeners: function() {
for (var t = this.node.children, e = 0; e < t.length; ++e) {
var i = t[e];
i.off("size-changed", this._doLayoutDirty, this);
i.off("position-changed", this._doLayoutDirty, this);
i.off("anchor-changed", this._doLayoutDirty, this);
i.off("active-in-hierarchy-changed", this._doLayoutDirty, this);
}
},
_childAdded: function(t) {
var e = t.detail;
e.on("size-changed", this._doLayoutDirty, this);
e.on("position-changed", this._doLayoutDirty, this);
e.on("anchor-changed", this._doLayoutDirty, this);
e.on("active-in-hierarchy-changed", this._doLayoutDirty, this);
this._doLayoutDirty();
},
_childRemoved: function(t) {
var e = t.detail;
e.off("size-changed", this._doLayoutDirty, this);
e.off("position-changed", this._doLayoutDirty, this);
e.off("anchor-changed", this._doLayoutDirty, this);
e.off("active-in-hierarchy-changed", this._doLayoutDirty, this);
this._doLayoutDirty();
},
_resized: function() {
this._layoutSize = this.node.getContentSize();
this._doLayoutDirty();
},
_doLayoutHorizontally: function(t, e, i, r) {
var a = this.node.getAnchorPoint(), l = this.node.children, h = 1, u = this.paddingLeft, d = -a.x * t;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
h = -1;
d = (1 - a.x) * t;
u = this.paddingRight;
}
for (var f = d + h * u - h * this.spacingX, _ = 0, p = 0, g = 0, v = 0, y = 0, m = 0, C = 0, T = 0; T < l.length; ++T) {
(S = l[T]).activeInHierarchy && C++;
}
var b = this.cellSize.width;
this.type !== n.GRID && this.resizeMode === o.CHILDREN && (b = (t - (this.paddingLeft + this.paddingRight) - (C - 1) * this.spacingX) / C);
for (T = 0; T < l.length; ++T) {
var S;
if ((S = l[T]).activeInHierarchy) {
if (this._resize === o.CHILDREN) {
S.width = b;
this.type === n.GRID && (S.height = this.cellSize.height);
}
var E = S.anchorX;
g > p && (p = g);
if (S.height >= p) {
g = p;
p = S.height;
m = S.getAnchorPoint().y;
}
this.horizontalDirection === c.RIGHT_TO_LEFT && (E = 1 - S.anchorX);
f = f + h * E * S.width + h * this.spacingX;
var x = h * (1 - E) * S.width;
if (e) {
var A = f + x + h * (h > 0 ? this.paddingRight : this.paddingLeft), N = this.horizontalDirection === c.LEFT_TO_RIGHT && A > (1 - a.x) * t, O = this.horizontalDirection === c.RIGHT_TO_LEFT && A < -a.x * t;
if (N || O) {
if (S.height >= p) {
0 === g && (g = p);
_ += g;
g = p;
} else {
_ += p;
g = S.height;
p = 0;
}
f = d + h * (u + E * S.width);
v++;
}
}
var w = i(S, _, v);
t >= S.width + this.paddingLeft + this.paddingRight && r && S.setPosition(cc.p(f, w));
var I, L = 1, R = 0 === p ? S.height : p;
if (this.verticalDirection === s.TOP_TO_BOTTOM) {
y = y || this.node._contentSize.height;
(I = w + (L = -1) * (R * m + this.paddingBottom)) < y && (y = I);
} else {
y = y || -this.node._contentSize.height;
(I = w + L * (R * m + this.paddingTop)) > y && (y = I);
}
f += x;
}
}
return y;
},
_getVerticalBaseHeight: function(t) {
var e = 0, i = 0;
if (this.resizeMode === o.CONTAINER) {
for (var n = 0; n < t.length; ++n) {
var r = t[n];
if (r.activeInHierarchy) {
i++;
e += r.height;
}
}
e += (i - 1) * this.spacingY + this.paddingBottom + this.paddingTop;
} else e = this.node.getContentSize().height;
return e;
},
_doLayoutVertically: function(t, e, i, r) {
var a = this.node.getAnchorPoint(), l = this.node.children, h = 1, u = this.paddingBottom, d = -a.y * t;
if (this.verticalDirection === s.TOP_TO_BOTTOM) {
h = -1;
d = (1 - a.y) * t;
u = this.paddingTop;
}
for (var f = d + h * u - h * this.spacingY, _ = 0, p = 0, g = 0, v = 0, y = 0, m = 0, C = 0, T = 0; T < l.length; ++T) {
(S = l[T]).activeInHierarchy && C++;
}
var b = this.cellSize.height;
this.type !== n.GRID && this.resizeMode === o.CHILDREN && (b = (t - (this.paddingTop + this.paddingBottom) - (C - 1) * this.spacingY) / C);
for (T = 0; T < l.length; ++T) {
var S;
if ((S = l[T]).activeInHierarchy) {
if (this.resizeMode === o.CHILDREN) {
S.height = b;
this.type === n.GRID && (S.width = this.cellSize.width);
}
var E = S.anchorY;
g > p && (p = g);
if (S.width >= p) {
g = p;
p = S.width;
m = S.getAnchorPoint().x;
}
this.verticalDirection === s.TOP_TO_BOTTOM && (E = 1 - S.anchorY);
f = f + h * E * S.height + h * this.spacingY;
var x = h * (1 - E) * S.height;
if (e) {
var A = f + x + h * (h > 0 ? this.paddingTop : this.paddingBottom), N = this.verticalDirection === s.BOTTOM_TO_TOP && A > (1 - a.y) * t, O = this.verticalDirection === s.TOP_TO_BOTTOM && A < -a.y * t;
if (N || O) {
if (S.width >= p) {
0 === g && (g = p);
_ += g;
g = p;
} else {
_ += p;
g = S.width;
p = 0;
}
f = d + h * (u + E * S.height);
v++;
}
}
var w = i(S, _, v);
t >= S.height + (this.paddingTop + this.paddingBottom) && r && S.setPosition(cc.p(w, f));
var I, L = 1, R = 0 === p ? S.width : p;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
L = -1;
y = y || this.node._contentSize.width;
(I = w + L * (R * m + this.paddingLeft)) < y && (y = I);
} else {
y = y || -this.node._contentSize.width;
(I = w + L * (R * m + this.paddingRight)) > y && (y = I);
}
f += x;
}
}
return y;
},
_doLayoutBasic: function() {
for (var t = this.node.children, e = null, i = 0; i < t.length; ++i) {
var n = t[i];
n.activeInHierarchy && (e = e ? cc.rectUnion(e, n.getBoundingBoxToWorld()) : n.getBoundingBoxToWorld());
}
if (e) {
var o = this.node.parent.convertToNodeSpaceAR(cc.p(e.x, e.y));
o = cc.pAdd(o, cc.p(-this.paddingLeft, -this.paddingBottom));
var r = this.node.parent.convertToNodeSpaceAR(cc.p(e.x + e.width, e.y + e.height));
r = cc.pAdd(r, cc.p(this.paddingRight, this.paddingTop));
var s = cc.size(parseFloat((r.x - o.x).toFixed(2)), parseFloat((r.y - o.y).toFixed(2))), c = this.node.getPosition(), a = (c.x - o.x) / s.width, l = (c.y - o.y) / s.height, h = cc.p(parseFloat(a.toFixed(2)), parseFloat(l.toFixed(2)));
this.node.setAnchorPoint(h);
this.node.setContentSize(s);
}
},
_doLayoutGridAxisHorizontal: function(t, e) {
var i = e.width, n = 1, r = -t.y * e.height, c = this.paddingBottom;
if (this.verticalDirection === s.TOP_TO_BOTTOM) {
n = -1;
r = (1 - t.y) * e.height;
c = this.paddingTop;
}
var a = function(t, e, i) {
return r + n * (e + t.anchorY * t.height + c + i * this.spacingY);
}.bind(this), l = 0;
if (this.resizeMode === o.CONTAINER) {
var h = this._doLayoutHorizontally(i, !0, a, !1);
(l = r - h) < 0 && (l *= -1);
r = -t.y * l;
if (this.verticalDirection === s.TOP_TO_BOTTOM) {
n = -1;
r = (1 - t.y) * l;
}
}
this._doLayoutHorizontally(i, !0, a, !0);
this.resizeMode === o.CONTAINER && this.node.setContentSize(i, l);
},
_doLayoutGridAxisVertical: function(t, e) {
var i = e.height, n = 1, r = -t.x * e.width, s = this.paddingLeft;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
n = -1;
r = (1 - t.x) * e.width;
s = this.paddingRight;
}
var a = function(t, e, i) {
return r + n * (e + t.anchorX * t.width + s + i * this.spacingX);
}.bind(this), l = 0;
if (this.resizeMode === o.CONTAINER) {
var h = this._doLayoutVertically(i, !0, a, !1);
(l = r - h) < 0 && (l *= -1);
r = -t.x * l;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
n = -1;
r = (1 - t.x) * l;
}
}
this._doLayoutVertically(i, !0, a, !0);
this.resizeMode === o.CONTAINER && this.node.setContentSize(l, i);
},
_doLayoutGrid: function() {
var t = this.node.getAnchorPoint(), e = this.node.getContentSize();
this.startAxis === r.HORIZONTAL ? this._doLayoutGridAxisHorizontal(t, e) : this.startAxis === r.VERTICAL && this._doLayoutGridAxisVertical(t, e);
},
_getHorizontalBaseWidth: function(t) {
var e = 0, i = 0;
if (this.resizeMode === o.CONTAINER) {
for (var n = 0; n < t.length; ++n) {
var r = t[n];
if (r.activeInHierarchy) {
i++;
e += r.width;
}
}
e += (i - 1) * this.spacingX + this.paddingLeft + this.paddingRight;
} else e = this.node.getContentSize().width;
return e;
},
_doLayout: function() {
if (this.type === n.HORIZONTAL) {
var t = this._getHorizontalBaseWidth(this.node.children);
this._doLayoutHorizontally(t, !1, (function(t) {
return t.y;
}), !0);
this.node.width = t;
} else if (this.type === n.VERTICAL) {
var e = this._getVerticalBaseHeight(this.node.children);
this._doLayoutVertically(e, !1, (function(t) {
return t.x;
}), !0);
this.node.height = e;
} else this.type === n.NONE ? this.resizeMode === o.CONTAINER && this._doLayoutBasic() : this.type === n.GRID && this._doLayoutGrid();
},
updateLayout: function() {
if (this._layoutDirty && this.node.children.length > 0) {
this._doLayout();
this._layoutDirty = !1;
}
}
});
Object.defineProperty(a.prototype, "padding", {
get: function() {
cc.warnID(4100);
return this.paddingLeft;
},
set: function(t) {
this._N$padding = t;
this._migratePaddingData();
this._doLayoutDirty();
}
});
cc.Layout = e.exports = a;
}), {
"./CCComponent": 47
} ],
53: [ (function(t, e, i) {
t("../../clipping-nodes/CCClippingNode");
t("../../clipping-nodes/CCClippingNodeCanvasRenderCmd");
t("../../clipping-nodes/CCClippingNodeWebGLRenderCmd");
t("../../shape-nodes/CCDrawNode");
var n = cc._RendererInSG, o = cc.Enum({
RECT: 0,
ELLIPSE: 1,
IMAGE_STENCIL: 2
}), r = cc.Class({
name: "cc.Mask",
extends: n,
editor: !1,
properties: {
_clippingStencil: {
default: null,
serializable: !1
},
_type: o.RECT,
type: {
get: function() {
return this._type;
},
set: function(t) {
this._type = t;
this._refreshStencil();
},
type: o,
tooltip: !1
},
spriteFrame: {
default: null,
type: cc.SpriteFrame,
tooltip: !1,
notify: function() {
this._refreshStencil();
}
},
alphaThreshold: {
default: 1,
type: cc.Float,
range: [ 0, 1, .1 ],
slide: !0,
tooltip: !1,
notify: function() {
cc._renderType !== cc.game.RENDER_TYPE_CANVAS ? this._sgNode.setAlphaThreshold(this.alphaThreshold) : cc.warnID(4201);
}
},
inverted: {
default: !1,
type: cc.Boolean,
tooltip: !1,
notify: function() {
cc._renderType !== cc.game.RENDER_TYPE_CANVAS ? this._sgNode.setInverted(this.inverted) : cc.warnID(4202);
}
},
_segements: 64,
segements: {
get: function() {
return this._segements;
},
set: function(t) {
this._segements = cc.clampf(t, 3, 1e4);
this._refreshStencil();
},
tooltip: !1
},
_resizeToTarget: {
animatable: !1,
set: function(t) {
t && this._resizeNodeToTargetNode();
}
}
},
statics: {
Type: o
},
_resizeNodeToTargetNode: !1,
_initSgNode: function() {},
_createSgNode: function() {
return new cc.ClippingNode();
},
_hitTest: function(t) {
var e = this.node.getContentSize(), i = e.width, n = e.height, r = this.node.getNodeToWorldTransform();
if (this.type === o.RECT || this.type === o.IMAGE_STENCIL) {
var s = cc.rect(0, 0, i, n);
cc._rectApplyAffineTransformIn(s, r);
var c = t.x - s.x, a = s.x + s.width - t.x, l = t.y - s.y, h = s.y + s.height - t.y;
return c >= 0 && a >= 0 && h >= 0 && l >= 0;
}
if (this.type === o.ELLIPSE) {
var u = i / 2, d = n / 2, f = r.a * u + r.c * d + r.tx, _ = r.b * u + r.d * d + r.ty, p = t.x - f, g = t.y - _;
return p * p / (u * u) + g * g / (d * d) < 1;
}
},
onEnable: function() {
this._super();
this.spriteFrame && this.spriteFrame.ensureLoadTexture();
this._refreshStencil();
this.node.on("size-changed", this._refreshStencil, this);
this.node.on("anchor-changed", this._refreshStencil, this);
},
onDisable: function() {
this._super();
this.node.off("size-changed", this._refreshStencil, this);
this.node.off("anchor-changed", this._refreshStencil, this);
},
_calculateCircle: function(t, e, i) {
for (var n = [], o = 2 * Math.PI / i, r = 0; r < i; ++r) n.push(cc.v2(e.x * Math.cos(o * r) + t.x, e.y * Math.sin(o * r) + t.y));
return n;
},
_refreshStencil: function() {
this.type === o.IMAGE_STENCIL && (cc._renderType, cc.game.RENDER_TYPE_WEBGL), 0;
var t = this.node.getContentSize(), e = this.node.getAnchorPoint(), i = this._clippingStencil;
if (this._type === o.IMAGE_STENCIL) {
if (!(i instanceof cc.Scale9Sprite) || i._spriteFrame !== this.spriteFrame) {
(i = new cc.Scale9Sprite()).setSpriteFrame(this.spriteFrame);
this._sgNode.setStencil(i);
}
i.setContentSize(t);
i.setAnchorPoint(e);
this._sgNode.setAlphaThreshold(this.alphaThreshold);
} else {
if (!(i instanceof cc.DrawNode)) {
i = new cc.DrawNode();
this._sgNode.setStencil(i);
}
var n = t.width, r = t.height, s = -n * e.x, c = -r * e.y, a = cc.color(255, 255, 255, 0);
i.clear();
if (this._type === o.RECT) {
var l = [ cc.v2(s, c), cc.v2(s + n, c), cc.v2(s + n, c + r), cc.v2(s, c + r) ];
i.drawPoly(l, a, 0, a);
} else if (this._type === o.ELLIPSE) {
var h = cc.v2(s + n / 2, c + r / 2), u = {
x: n / 2,
y: r / 2
};
i.drawPoly(this._calculateCircle(h, u, this._segements), a, 0, a);
}
}
this._sgNode.setInverted(this.inverted);
this._clippingStencil = i;
0;
}
});
r.prototype.__superOnDestroy = n.prototype.onDestroy;
r.prototype.onDestroy = function() {
this.__superOnDestroy();
this._clippingStencil && (this._clippingStencil = null);
};
cc.Mask = e.exports = r;
}), {
"../../clipping-nodes/CCClippingNode": 1,
"../../clipping-nodes/CCClippingNodeCanvasRenderCmd": 1,
"../../clipping-nodes/CCClippingNodeWebGLRenderCmd": 1,
"../../shape-nodes/CCDrawNode": 1
} ],
54: [ (function(t, e, i) {
var n = cc.Enum({
Unified: 0,
Free: 1
}), o = cc.Enum({
Horizontal: 0,
Vertical: 1
}), r = cc.Enum({
PAGE_TURNING: 0
}), s = cc.Class({
name: "cc.PageView",
extends: cc.ScrollView,
editor: !1,
ctor: function() {
this._curPageIdx = 0;
this._lastPageIdx = 0;
this._pages = [];
this._scrollCenterOffsetX = [];
this._scrollCenterOffsetY = [];
},
properties: {
sizeMode: {
default: n.Unified,
type: n,
tooltip: !1,
notify: function() {
this._syncSizeMode();
}
},
direction: {
default: o.Horizontal,
type: o,
tooltip: !1,
notify: function() {
this._syncScrollDirection();
}
},
scrollThreshold: {
default: .5,
type: cc.Float,
slide: !0,
range: [ 0, 1, .01 ],
tooltip: !1
},
autoPageTurningThreshold: {
default: 100,
type: cc.Float,
tooltip: !1
},
pageTurningEventTiming: {
default: .1,
type: cc.Float,
range: [ 0, 1, .01 ],
tooltip: !1
},
indicator: {
default: null,
type: cc.PageViewIndicator,
tooltip: !1,
notify: function() {
this.indicator && this.indicator.setPageView(this);
}
},
pageTurningSpeed: {
default: .3,
type: cc.Float,
tooltip: !1
},
pageEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
}
},
statics: {
SizeMode: n,
Direction: o,
EventType: r
},
__preload: function() {
this.node.on("size-changed", this._updateAllPagesSize, this);
},
onEnable: function() {
this._super();
this.node.on("scroll-ended-with-threshold", this._dispatchPageTurningEvent, this);
},
onDisable: function() {
this._super();
this.node.off("scroll-ended-with-threshold", this._dispatchPageTurningEvent, this);
},
onLoad: function() {
this._initPages();
this.indicator && this.indicator.setPageView(this);
},
onDestroy: function() {
this.node.off("size-changed", this._updateAllPagesSize, this);
},
getCurrentPageIndex: function() {
return this._curPageIdx;
},
setCurrentPageIndex: function(t) {
this.scrollToPage(t, !0);
},
getPages: function() {
return this._pages;
},
addPage: function(t) {
if (t && -1 === this._pages.indexOf(t) && this.content) {
this.content.addChild(t);
this._pages.push(t);
this._updatePageView();
}
},
insertPage: function(t, e) {
if (!(e < 0) && t && -1 === this._pages.indexOf(t) && this.content) {
if (e >= this._pages.length) this.addPage(t); else {
this._pages.splice(e, 0, t);
this.content.addChild(t);
this._updatePageView();
}
}
},
removePage: function(t) {
if (t && this.content) {
var e = this._pages.indexOf(t);
-1 !== e ? this.removePageAtIndex(e) : cc.warnID(4300, t.name);
}
},
removePageAtIndex: function(t) {
var e = this._pages;
if (!(t < 0 || t >= e.length)) {
var i = e[t];
if (i) {
this.content.removeChild(i);
e.splice(t, 1);
this._updatePageView();
}
}
},
removeAllPages: function() {
if (this.content) {
for (var t = this._pages, e = 0, i = t.length; e < i; e++) this.content.removeChild(t[e]);
this._pages.length = 0;
this._updatePageView();
}
},
scrollToPage: function(t, e) {
if (!(t < 0 || t >= this._pages.length)) {
e = void 0 !== e ? e : .3;
this._curPageIdx = t;
this.scrollToOffset(this._moveOffsetValue(t), e, !0);
this.indicator && this.indicator._changedState();
}
},
getScrollEndedEventTiming: function() {
return this.pageTurningEventTiming;
},
_syncScrollDirection: function() {
this.horizontal = this.direction === o.Horizontal;
this.vertical = this.direction === o.Vertical;
},
_syncSizeMode: function() {
if (this.content) {
var t = this.content.getComponent(cc.Layout);
if (t) {
if (0 === this._pages.length) t.padding = 0; else {
var e = this._pages[this._pages.length - 1];
if (this.sizeMode === n.Free) if (this.direction === o.Horizontal) {
t.paddingLeft = (this.node.width - this._pages[0].width) / 2;
t.paddingRight = (this.node.width - e.width) / 2;
} else if (this.direction === o.Vertical) {
t.paddingTop = (this.node.height - this._pages[0].height) / 2;
t.paddingBottom = (this.node.height - e.height) / 2;
}
}
t.updateLayout();
}
}
},
_updatePageView: function() {
var t = this._pages.length;
if (this._curPageIdx >= t) {
this._curPageIdx = 0 === t ? 0 : t - 1;
this._lastPageIdx = this._curPageIdx;
}
for (var e = 0; e < t; ++e) {
this._pages[e].setSiblingIndex(e);
this.direction === o.Horizontal ? this._scrollCenterOffsetX[e] = Math.abs(this.content.x + this._pages[e].x) : this._scrollCenterOffsetY[e] = Math.abs(this.content.y + this._pages[e].y);
}
var i = this.content.getComponent(cc.Layout);
i && i.enabled && i.updateLayout();
this.indicator && this.indicator._refresh();
},
_updateAllPagesSize: function() {
if (this.sizeMode === n.Unified) for (var t = this._pages, e = this.node.getContentSize(), i = 0, o = t.length; i < o; i++) t[i].setContentSize(e);
},
_initPages: function() {
if (this.content) {
for (var t = this.content.children, e = 0; e < t.length; ++e) {
var i = t[e];
this._pages.indexOf(i) >= 0 || this._pages.push(i);
}
this._syncScrollDirection();
this._syncSizeMode();
this._updatePageView();
}
},
_dispatchPageTurningEvent: function() {
if (this._lastPageIdx !== this._curPageIdx) {
this._lastPageIdx = this._curPageIdx;
cc.Component.EventHandler.emitEvents(this.pageEvents, this, r.PAGE_TURNING);
this.node.emit("page-turning", this);
}
},
_isScrollable: function(t, e, i) {
if (this.sizeMode === n.Free) {
var r, s;
if (this.direction === o.Horizontal) {
r = this._scrollCenterOffsetX[e];
s = this._scrollCenterOffsetX[i];
return Math.abs(t.x) >= Math.abs(r - s) * this.scrollThreshold;
}
if (this.direction === o.Vertical) {
r = this._scrollCenterOffsetY[e];
s = this._scrollCenterOffsetY[i];
return Math.abs(t.y) >= Math.abs(r - s) * this.scrollThreshold;
}
} else {
if (this.direction === o.Horizontal) return Math.abs(t.x) >= this.node.width * this.scrollThreshold;
if (this.direction === o.Vertical) return Math.abs(t.y) >= this.node.height * this.scrollThreshold;
}
},
_isQuicklyScrollable: function(t) {
if (this.direction === o.Horizontal) {
if (Math.abs(t.x) > this.autoPageTurningThreshold) return !0;
} else if (this.direction === o.Vertical && Math.abs(t.y) > this.autoPageTurningThreshold) return !0;
return !1;
},
_moveOffsetValue: function(t) {
var e = cc.p(0, 0);
this.sizeMode === n.Free ? this.direction === o.Horizontal ? e.x = this._scrollCenterOffsetX[t] : this.direction === o.Vertical && (e.y = this._scrollCenterOffsetY[t]) : this.direction === o.Horizontal ? e.x = t * this.node.width : this.direction === o.Vertical && (e.y = t * this.node.height);
return e;
},
_getDragDirection: function(t) {
return this.direction === o.Horizontal ? 0 === t.x ? 0 : t.x > 0 ? 1 : -1 : this.direction === o.Vertical ? 0 === t.y ? 0 : t.y < 0 ? 1 : -1 : void 0;
},
_handleReleaseLogic: function(t) {
var e = this._startBounceBackIfNeeded(), i = cc.pSub(this._touchBeganPosition, this._touchEndPosition);
if (e) {
var n = this._getDragDirection(i);
if (0 === n) return;
this._curPageIdx = n > 0 ? this._pages.length - 1 : 0;
this.indicator && this.indicator._changedState();
} else {
var o = this._curPageIdx, r = o + this._getDragDirection(i), s = this.pageTurningSpeed * Math.abs(o - r);
if (r < this._pages.length) {
if (this._isScrollable(i, o, r)) {
this.scrollToPage(r, s);
return;
}
var c = this._calculateTouchMoveVelocity();
if (this._isQuicklyScrollable(c)) {
this.scrollToPage(r, s);
return;
}
}
this.scrollToPage(o, s);
}
},
_onTouchBegan: function(t, e) {
this._touchBeganPosition = t.touch.getLocation();
this._super(t, e);
},
_onTouchMoved: function(t, e) {
this._super(t, e);
},
_onTouchEnded: function(t, e) {
this._touchEndPosition = t.touch.getLocation();
this._super(t, e);
},
_onTouchCancelled: function(t, e) {
this._touchEndPosition = t.touch.getLocation();
this._super(t, e);
},
_onMouseWheel: function() {}
});
cc.PageView = e.exports = s;
}), {} ],
55: [ (function(t, e, i) {
var n = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1
}), o = cc.Class({
name: "cc.PageViewIndicator",
extends: t("./CCComponent"),
editor: !1,
properties: {
_layout: null,
_pageView: null,
_indicators: [],
spriteFrame: {
default: null,
type: cc.SpriteFrame,
tooltip: !1
},
direction: {
default: n.HORIZONTAL,
type: n,
tooltip: !1
},
cellSize: {
default: cc.size(20, 20),
tooltip: !1
},
spacing: {
default: 0,
tooltip: !1
}
},
statics: {
Direction: n
},
onLoad: function() {
this._updateLayout();
},
setPageView: function(t) {
this._pageView = t;
this._refresh();
},
_updateLayout: function() {
this._layout = this.getComponent(cc.Layout);
this._layout || (this._layout = this.addComponent(cc.Layout));
if (this.direction === n.HORIZONTAL) {
this._layout.type = cc.Layout.Type.HORIZONTAL;
this._layout.spacingX = this.spacing;
} else if (this.direction === n.VERTICAL) {
this._layout.type = cc.Layout.Type.VERTICAL;
this._layout.spacingY = this.spacing;
}
this._layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
},
_createIndicator: function() {
var t = new cc.Node();
t.addComponent(cc.Sprite).spriteFrame = this.spriteFrame;
t.parent = this.node;
t.width = this.cellSize.width;
t.height = this.cellSize.height;
return t;
},
_changedState: function() {
var t = this._indicators;
if (0 !== t.length) {
var e = this._pageView._curPageIdx;
if (!(e >= t.length)) {
for (var i = 0; i < t.length; ++i) {
t[i].opacity = 127.5;
}
t[e].opacity = 255;
}
}
},
_refresh: function() {
if (this._pageView) {
var t = this._indicators, e = this._pageView.getPages();
if (e.length !== t.length) {
var i = 0;
if (e.length > t.length) for (i = 0; i < e.length; ++i) t[i] || (t[i] = this._createIndicator()); else {
for (i = t.length - e.length; i > 0; --i) {
var n = t[i - 1];
this.node.removeChild(n);
t.splice(i - 1, 1);
}
}
this._layout && this._layout.enabledInHierarchy && this._layout.updateLayout();
this._changedState();
}
}
}
});
cc.PageViewIndicator = e.exports = o;
}), {
"./CCComponent": 47
} ],
56: [ (function(t, e, i) {
var n = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1,
FILLED: 2
}), o = cc.Class({
name: "cc.ProgressBar",
extends: t("./CCComponent"),
editor: !1,
_initBarSprite: function() {
if (this.barSprite) {
var t = this.barSprite.node;
if (!t) return;
var e = this.node.getContentSize(), i = this.node.getAnchorPoint(), o = t.getContentSize();
t.parent === this.node && this.node.setContentSize(o);
this.barSprite.fillType === cc.Sprite.FillType.RADIAL && (this.mode = n.FILLED);
var r = t.getContentSize();
this.mode === n.HORIZONTAL ? this.totalLength = r.width : this.mode === n.VERTICAL ? this.totalLength = r.height : this.totalLength = this.barSprite.fillRange;
if (t.parent === this.node) {
var s = -e.width * i.x;
t.setPosition(cc.p(s, 0));
}
}
},
_updateBarStatus: function() {
if (this.barSprite) {
var t = this.barSprite.node;
if (!t) return;
var e, i, o, r = t.getAnchorPoint(), s = t.getContentSize(), c = t.getPosition(), a = cc.p(0, .5), l = cc.clamp01(this.progress), h = this.totalLength * l;
switch (this.mode) {
case n.HORIZONTAL:
this.reverse && (a = cc.p(1, .5));
e = cc.size(h, s.height);
i = this.totalLength;
o = s.height;
break;

case n.VERTICAL:
a = this.reverse ? cc.p(.5, 1) : cc.p(.5, 0);
e = cc.size(s.width, h);
i = s.width;
o = this.totalLength;
}
if (this.mode === n.FILLED) if (this.barSprite.type !== cc.Sprite.Type.FILLED) cc.warn("ProgressBar FILLED mode only works when barSprite's Type is FILLED!"); else {
this.reverse && (h *= -1);
this.barSprite.fillRange = h;
} else if (this.barSprite.type !== cc.Sprite.Type.FILLED) {
var u = a.x - r.x, d = a.y - r.y, f = cc.p(i * u, o * d);
t.setPosition(cc.pAdd(c, f));
t.setAnchorPoint(a);
t.setContentSize(e);
} else cc.warn("ProgressBar non-FILLED mode only works when barSprite's Type is non-FILLED!");
}
},
properties: {
barSprite: {
default: null,
type: cc.Sprite,
tooltip: !1,
notify: function() {
this._initBarSprite();
},
animatable: !1
},
mode: {
default: n.HORIZONTAL,
type: n,
tooltip: !1,
notify: function() {
if (this.barSprite) {
var t = this.barSprite.node;
if (!t) return;
var e = t.getContentSize();
this.mode === n.HORIZONTAL ? this.totalLength = e.width : this.mode === n.VERTICAL ? this.totalLength = e.height : this.mode === n.FILLED && (this.totalLength = this.barSprite.fillRange);
}
},
animatable: !1
},
_N$totalLength: 1,
totalLength: {
range: [ 0, Number.MAX_VALUE ],
tooltip: !1,
get: function() {
return this._N$totalLength;
},
set: function(t) {
this.mode === n.FILLED && (t = cc.clamp01(t));
this._N$totalLength = t;
this._updateBarStatus();
}
},
progress: {
default: 1,
type: "Float",
range: [ 0, 1, .1 ],
slide: !0,
tooltip: !1,
notify: function() {
this._updateBarStatus();
}
},
reverse: {
default: !1,
tooltip: !1,
notify: function() {
this.barSprite && (this.barSprite.fillStart = 1 - this.barSprite.fillStart);
this._updateBarStatus();
},
animatable: !1
}
},
statics: {
Mode: n
}
});
cc.ProgressBar = e.exports = o;
}), {
"./CCComponent": 47
} ],
57: [ (function(t, e, i) {
var n = cc.Class({
extends: t("./CCSGComponent"),
name: "cc._RendererInSG",
ctor: function() {
var t = this._sgNode = this._createSgNode();
t.setVisible(!1);
0;
this._plainNode = new _ccsg.Node();
},
__preload: function() {
this._initSgNode();
},
onEnable: function() {
if (cc.director._actionManager && cc.director._actionManager.getNumberOfRunningActionsInTarget(this.node) > 0) {
cc.errorID(1629, this.node.name);
cc.errorID(1630);
cc.errorID(1631);
}
this._replaceSgNode(this._sgNode);
},
onDisable: function() {
this._replaceSgNode(this._plainNode);
},
onDestroy: function() {
this._removeSgNode();
var t = this.node._sgNode;
this._plainNode !== t && (this._plainNode = null);
},
_replaceSgNode: function(t) {
0;
var e = this.node, i = e._sgNode;
i._entity = null;
0;
var n = i.getChildren().slice();
i.removeAllChildren(!1);
if (t.getChildrenCount() > 0) {
0;
t.removeAllChildren(!1);
}
for (var o = 0, r = n.length; o < r; ++o) t.addChild(n[o]);
var s = i.getParent();
if (s) if (cc.runtime) {
s.removeChild(i, !1);
s.addChild(t);
t.arrivalOrder = i.arrivalOrder;
} else {
s.insertChildBefore(t, i);
s.removeChild(i, !1);
}
e._sgNode = t;
e._sgNode._entity = e;
e._updateSgNode();
}
});
cc._RendererInSG = e.exports = n;
}), {
"./CCSGComponent": 60
} ],
58: [ (function(t, e, i) {
var n = cc.Class({
extends: t("./CCSGComponent"),
name: "cc._RendererUnderSG",
ctor: function() {
var t = this._sgNode = this._createSgNode();
if (t) {
t.retain();
t.setVisible(!1);
}
},
__preload: function() {
this._initSgNode();
this._registSizeProvider();
this._appendSgNode(this._sgNode);
},
onEnable: function() {
this._sgNode && this._sgNode.setVisible(!0);
},
onDisable: function() {
this._sgNode && this._sgNode.setVisible(!1);
},
onDestroy: function() {
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
this._removeSgNode();
},
_appendSgNode: function(t) {
if (t) {
var e = this.node;
t.setColor(e._color);
e._cascadeOpacityEnabled || t.setOpacity(e._opacity);
t.setAnchorPoint(e._anchorPoint);
t.setOpacityModifyRGB(e._opacityModifyRGB);
t.setLocalZOrder(-1);
e._sgNode.addChild(t);
}
}
});
cc._RendererUnderSG = e.exports = n;
}), {
"./CCSGComponent": 60
} ],
59: [ (function(t, e, i) {
t("../label/CCHtmlTextParser");
t("../label/CCTextUtils");
var n = cc.TextAlignment, o = cc.VerticalTextAlignment;
var r = cc.Class({
name: "cc.RichText",
extends: cc._RendererUnderSG,
ctor: function() {
this._textArray = null;
this._labelSegments = [];
this._labelSegmentsCache = [];
this._linesWidth = [];
this._resetState();
this._updateRichTextStatus = this._updateRichText;
},
editor: !1,
properties: {
string: {
default: "<color=#00ff00>Rich</c><color=#0fffff>Text</color>",
multiline: !0,
tooltip: !1,
notify: function() {
this._updateRichTextStatus();
}
},
horizontalAlign: {
default: n.LEFT,
type: n,
tooltip: !1,
animatable: !1,
notify: function(t) {
if (this.horizontalAlign !== t) {
this._layoutDirty = !0;
this._updateRichTextStatus();
}
}
},
fontSize: {
default: 40,
tooltip: !1,
notify: function(t) {
if (this.fontSize !== t) {
this._layoutDirty = !0;
this._updateRichTextStatus();
}
}
},
font: {
default: null,
type: cc.TTFFont,
tooltip: !1,
notify: function(t) {
if (this.font !== t) {
this._layoutDirty = !0;
0;
this._updateRichTextStatus();
}
}
},
maxWidth: {
default: 0,
tooltip: !1,
notify: function(t) {
if (this.maxWidth !== t) {
this._layoutDirty = !0;
this._updateRichTextStatus();
}
}
},
lineHeight: {
default: 40,
tooltip: !1,
notify: function(t) {
if (this.lineHeight !== t) {
this._layoutDirty = !0;
this._updateRichTextStatus();
}
}
},
imageAtlas: {
default: null,
type: cc.SpriteAtlas,
tooltip: !1,
notify: function(t) {
if (this.imageAtlas !== t) {
this._layoutDirty = !0;
this._updateRichTextStatus();
}
}
},
handleTouchEvent: {
default: !0,
tooltip: !1,
notify: function(t) {
this.handleTouchEvent !== t && this.enabledInHierarchy && (this.handleTouchEvent ? this._addEventListeners() : this._removeEventListeners());
}
}
},
statics: {
HorizontalAlign: n,
VerticalAlign: o
},
onEnable: function() {
this._super();
this.handleTouchEvent && this._addEventListeners();
},
onDisable: function() {
this._super();
this.handleTouchEvent && this._removeEventListeners();
},
_addEventListeners: function() {
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
},
_removeEventListeners: function() {
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
},
_createSgNode: function() {
var t = new _ccsg.Node();
t.setCascadeOpacityEnabled(!0);
var e = this;
t.setColor = function() {
e._updateLabelSegmentTextAttributes();
};
t._setContentSize = t.setContentSize;
t.setContentSize = function() {};
return t;
},
_updateLabelSegmentTextAttributes: function() {
this._labelSegments.forEach(function(t) {
this._applyTextAttribute(t);
}.bind(this));
},
_initSgNode: function() {
this._updateRichText();
0;
},
_createFontLabel: function(t) {
return _ccsg.Label.pool.get(t, this.font, null, this.fontSize);
},
_getFontRawUrl: function() {
return this.font instanceof cc.TTFFont ? this.font.nativeUrl : "";
},
_onTTFLoaded: function() {
var t = this._getFontRawUrl();
if (t) {
var e = this;
cc.CustomFontLoader.loadTTF(t, (function() {
e._layoutDirty = !0;
e._updateRichText();
}));
}
},
_measureText: function(t, e) {
var i = this, n = function(e) {
var n;
if (0 === i._labelSegmentsCache.length) {
n = i._createFontLabel(e);
i._labelSegmentsCache.push(n);
} else (n = i._labelSegmentsCache[0]).setString(e);
n._styleIndex = t;
i._applyTextAttribute(n);
return n.getContentSize().width;
};
return e ? n(e) : n;
},
_onTouchEnded: function(t) {
for (var e = this.node.getComponents(cc.Component), i = 0; i < this._labelSegments.length; ++i) {
var n = this._labelSegments[i], o = n._clickHandler;
if (o && this._containsTouchLocation(n, t.touch.getLocation())) {
e.forEach((function(e) {
e.enabledInHierarchy && e[o] && e[o](t);
}));
t.stopPropagation();
}
}
},
_containsTouchLocation: function(t, e) {
var i = t.getBoundingBoxToWorld();
return cc.rectContainsPoint(i, e);
},
_resetState: function() {
var t = this._sgNode;
t && t.removeAllChildren();
this._labelSegments.length = 0;
this._labelSegmentsCache.length = 0;
this._linesWidth.length = 0;
this._lineOffsetX = 0;
this._lineCount = 1;
this._labelWidth = 0;
this._labelHeight = 0;
this._layoutDirty = !0;
},
_addLabelSegment: function(t, e) {
var i;
0 === this._labelSegmentsCache.length ? i = this._createFontLabel(t) : (i = this._labelSegmentsCache.pop()).setString(t);
i._styleIndex = e;
i._lineCount = this._lineCount;
this._applyTextAttribute(i);
i.setAnchorPoint(0, 0);
this._sgNode.addChild(i);
this._labelSegments.push(i);
i.setOverflow(1);
var n = i.getContentSize();
i.enableWrap(!1);
i.setDimensions(n.width, this.lineHeight);
return i;
},
_updateRichTextWithMaxWidth: function(t, e, i) {
var n = e;
if (this._lineOffsetX > 0 && n + this._lineOffsetX > this.maxWidth) for (var o = 0; this._lineOffsetX <= this.maxWidth; ) {
var r = this._getFirstWordLen(t, o, t.length), s = t.substr(o, r), c = this._measureText(i, s);
if (!(this._lineOffsetX + c <= this.maxWidth)) {
if (o > 0) {
var a = t.substr(0, o);
this._addLabelSegment(a, i);
t = t.substr(o, t.length);
n = this._measureText(i, t);
}
this._updateLineInfo();
break;
}
this._lineOffsetX += c;
o += r;
}
if (n > this.maxWidth) for (var l = cc.TextUtils.fragmentText(t, n, this.maxWidth, this._measureText(i)), h = 0; h < l.length; ++h) {
var u = l[h], d = this._addLabelSegment(u, i).getContentSize();
this._lineOffsetX += d.width;
l.length > 1 && h < l.length - 1 && this._updateLineInfo();
} else {
this._lineOffsetX += n;
this._addLabelSegment(t, i);
}
},
_isLastComponentCR: function(t) {
return t.length - 1 === t.lastIndexOf("\n");
},
_updateLineInfo: function() {
this._linesWidth.push(this._lineOffsetX);
this._lineOffsetX = 0;
this._lineCount++;
},
_needsUpdateTextLayout: function(t) {
if (this._layoutDirty || !this._textArray || !t) return !0;
if (this._textArray.length !== t.length) return !0;
for (var e = 0; e < this._textArray.length; ++e) {
var i = this._textArray[e], n = t[e];
if (i.text != n.text) return !0;
if (i.style) {
if (n.style) {
if (i.style.size !== n.style.size || i.style.italic !== n.style.italic || i.style.isImage !== n.style.isImage) return !0;
if (i.style.isImage === n.style.isImage && i.style.src !== n.style.src) return !0;
} else if (i.style.size || i.style.italic || i.style.isImage) return !0;
} else if (n.style && (n.style.size || n.style.italic || n.style.isImage)) return !0;
}
return !1;
},
_onSpriteFrameLoaded: function(t, e) {
var i;
(i = e || t.target).__sprite.setSpriteFrame(i);
},
_applySpriteFrame: function(t) {
if (t) if (t.textureLoaded()) this._onSpriteFrameLoaded(null, t); else {
t.once("load", this._onSpriteFrameLoaded, this);
t.ensureLoadTexture();
}
},
_addRichTextImageElement: function(t) {
var e = t.style.src, i = this.imageAtlas.getSpriteFrame(e);
if (i) {
var n = new cc.Scale9Sprite();
n.setAnchorPoint(0, 0);
i.__sprite = n;
this._sgNode.addChild(n);
this._labelSegments.push(n);
var o = i.getRect(), r = 1, s = o.width, c = o.height, a = t.style.imageWidth, l = t.style.imageHeight;
if (l > 0 && l < this.lineHeight) {
s *= r = l / c;
c *= r;
} else {
s *= r = this.lineHeight / c;
c *= r;
}
a > 0 && (s = a);
if (this.maxWidth > 0) {
this._lineOffsetX + s > this.maxWidth && this._updateLineInfo();
this._lineOffsetX += s;
} else {
this._lineOffsetX += s;
this._lineOffsetX > this._labelWidth && (this._labelWidth = this._lineOffsetX);
}
this._applySpriteFrame(i);
n.setContentSize(s, c);
n._lineCount = this._lineCount;
t.style.event && t.style.event.click && (n._clickHandler = t.style.event.click);
} else cc.warnID(4400);
},
_updateRichText: function() {
if (this.enabled) {
var t = cc.htmlTextParser.parse(this.string);
if (this._needsUpdateTextLayout(t)) {
this._textArray = t;
this._resetState();
for (var e, i = !1, n = 0; n < this._textArray.length; ++n) {
var o = this._textArray[n], r = o.text;
if ("" === r) {
if (o.style && o.style.newline) {
this._updateLineInfo();
continue;
}
if (o.style && o.style.isImage && this.imageAtlas) {
this._addRichTextImageElement(o);
continue;
}
}
for (var s = r.split("\n"), c = 0; c < s.length; ++c) {
var a = s[c];
if ("" !== a) {
i = !1;
if (this.maxWidth > 0) {
var l = this._measureText(n, a);
this._updateRichTextWithMaxWidth(a, l, n);
s.length > 1 && c < s.length - 1 && this._updateLineInfo();
} else {
e = this._addLabelSegment(a, n).getContentSize();
this._lineOffsetX += e.width;
this._lineOffsetX > this._labelWidth && (this._labelWidth = this._lineOffsetX);
s.length > 1 && c < s.length - 1 && this._updateLineInfo();
}
} else {
if (this._isLastComponentCR(r) && c == s.length - 1) continue;
this._updateLineInfo();
i = !0;
}
}
}
i || this._linesWidth.push(this._lineOffsetX);
this.maxWidth > 0 && (this._labelWidth = this.maxWidth);
this._labelHeight = this._lineCount * this.lineHeight;
this.node.setContentSize(this._labelWidth, this._labelHeight);
this._sgNode._setContentSize(this._labelWidth, this._labelHeight);
this._updateRichTextPosition();
this._layoutDirty = !1;
} else {
this._textArray = t;
this._updateLabelSegmentTextAttributes();
}
}
},
_getFirstWordLen: function(t, e, i) {
var n = t.charAt(e);
if (cc.TextUtils.isUnicodeCJK(n) || cc.TextUtils.isUnicodeSpace(n)) return 1;
for (var o = 1, r = e + 1; r < i; ++r) {
n = t.charAt(r);
if (cc.TextUtils.isUnicodeSpace(n) || cc.TextUtils.isUnicodeCJK(n)) break;
o++;
}
return o;
},
_updateRichTextPosition: function() {
for (var t = 0, e = 1, i = this._lineCount, n = 0; n < this._labelSegments.length; ++n) {
var o = this._labelSegments[n], r = o._lineCount;
if (r > e) {
t = 0;
e = r;
}
var s = 0;
switch (this.horizontalAlign) {
case cc.TextAlignment.LEFT:
s = 0;
break;

case cc.TextAlignment.CENTER:
s = (this._labelWidth - this._linesWidth[r - 1]) / 2;
break;

case cc.TextAlignment.RIGHT:
s = this._labelWidth - this._linesWidth[r - 1];
}
o.setPositionX(t + s);
var c = o.getContentSize(), a = (i - r) * this.lineHeight;
o instanceof cc.Scale9Sprite && (a += (this.lineHeight - o.getContentSize().height) / 2);
o.setPositionY(a);
r === e && (t += c.width);
}
},
_convertLiteralColorValue: function(t) {
var e = t.toUpperCase();
return cc.Color[e] ? cc.Color[e] : cc.hexToColor(t);
},
_applyTextAttribute: function(t) {
if (!(t instanceof cc.Scale9Sprite)) {
var e = t._styleIndex;
t.setLineHeight(this.lineHeight);
t.setVerticalAlign(o.CENTER);
var i = null;
this._textArray[e] && (i = this._textArray[e].style);
i && i.color ? t.setColor(this._convertLiteralColorValue(i.color)) : t.setColor(this.node.color);
i && i.bold ? t.enableBold(!0) : t.enableBold(!1);
i && i.italic ? t.enableItalics(!0) : t.enableItalics(!1);
i && i.underline ? t.enableUnderline(!0) : t.enableUnderline(!1);
if (i && i.outline) {
t.setOutlined(!0);
t.setOutlineColor(this._convertLiteralColorValue(i.outline.color));
t.setOutlineWidth(i.outline.width);
t.setMargin(i.outline.width);
} else {
t.setOutlined(!1);
t.setMargin(0);
}
i && i.size ? t.setFontSize(i.size) : t.setFontSize(this.fontSize);
i && i.event && i.event.click && (t._clickHandler = i.event.click);
}
},
onDestroy: function() {
this._super();
for (var t = 0; t < this._labelSegments.length; ++t) {
this._labelSegments[t].removeFromParent(!0);
_ccsg.Label.pool.put(this._labelSegments[t]);
}
this._resetState();
}
});
cc.RichText = e.exports = r;
}), {
"../label/CCHtmlTextParser": 87,
"../label/CCTextUtils": 88
} ],
60: [ (function(t, e, i) {
var n = t("../utils/scene-graph-helper"), o = cc.Class({
extends: t("./CCComponent"),
name: "cc._SGComponent",
editor: !1,
properties: {
_sgNode: {
default: null,
serializable: !1
}
},
_createSgNode: null,
_initSgNode: null,
_removeSgNode: n.removeSgNode,
_registSizeProvider: function() {
if (this.node._sizeProvider) {
} else this.node._sizeProvider = this._sgNode;
}
});
cc._SGComponent = e.exports = o;
}), {
"../utils/scene-graph-helper": 158,
"./CCComponent": 47
} ],
61: [ (function(t, e, i) {
var n = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1
}), o = cc.Class({
name: "cc.Scrollbar",
extends: t("./CCComponent"),
editor: !1,
properties: {
_scrollView: null,
_touching: !1,
_autoHideRemainingTime: {
default: 0,
serializable: !1
},
_opacity: 255,
handle: {
default: null,
type: cc.Sprite,
tooltip: !1,
notify: function() {
this._onScroll(cc.p(0, 0));
},
animatable: !1
},
direction: {
default: n.HORIZONTAL,
type: n,
tooltip: !1,
notify: function() {
this._onScroll(cc.p(0, 0));
},
animatable: !1
},
enableAutoHide: {
default: !0,
animatable: !1,
tooltip: !1
},
autoHideTime: {
default: 1,
animatable: !1,
tooltip: !1
}
},
statics: {
Direction: n
},
setTargetScrollView: function(t) {
this._scrollView = t;
},
_convertToScrollViewSpace: function(t) {
var e = t.convertToWorldSpace(cc.p(0, 0));
return this._scrollView.node.convertToNodeSpace(e);
},
_setOpacity: function(t) {
this.handle && this.node.setOpacity(t);
},
_onScroll: function(t) {
if (this._scrollView) {
var e = this._scrollView.content;
if (e) {
var i = e.getContentSize(), o = this._scrollView.node.getContentSize(), r = this.node.getContentSize();
if (this._conditionalDisableScrollBar(i, o)) return;
if (this.enableAutoHide) {
this._autoHideRemainingTime = this.autoHideTime;
this._setOpacity(this._opacity);
}
var s = 0, c = 0, a = 0, l = 0, h = 0;
if (this.direction === n.HORIZONTAL) {
s = i.width;
c = o.width;
h = r.width;
a = t.x;
l = -this._convertToScrollViewSpace(e).x;
} else if (this.direction === n.VERTICAL) {
s = i.height;
c = o.height;
h = r.height;
a = t.y;
l = -this._convertToScrollViewSpace(e).y;
}
var u = this._calculateLength(s, c, h, a), d = this._calculatePosition(s, c, h, l, a, u);
this._updateLength(u);
this._updateHanlderPosition(d);
}
}
},
_updateHanlderPosition: function(t) {
if (this.handle) {
var e = this._fixupHandlerPosition();
this.handle.node.setPosition(cc.pAdd(t, e));
}
},
_fixupHandlerPosition: function() {
var t = this.node.getContentSize(), e = this.node.getAnchorPoint(), i = this.handle.node.getContentSize(), o = this.handle.node.parent, r = this.node.convertToWorldSpaceAR(cc.p(-t.width * e.x, -t.height * e.y)), s = o.convertToNodeSpaceAR(r);
this.direction === n.HORIZONTAL ? s = cc.pAdd(s, cc.p(0, (t.height - i.height) / 2)) : this.direction === n.VERTICAL && (s = cc.pAdd(s, cc.p((t.width - i.width) / 2, 0)));
this.handle.node.setPosition(s);
return s;
},
_onTouchBegan: function() {
this.enableAutoHide && (this._touching = !0);
},
_conditionalDisableScrollBar: function(t, e) {
return t.width <= e.width && this.direction === n.HORIZONTAL || t.height <= e.height && this.direction === n.VERTICAL;
},
_onTouchEnded: function() {
if (this.enableAutoHide) {
this._touching = !1;
if (!(this.autoHideTime <= 0)) {
if (this._scrollView) {
var t = this._scrollView.content;
if (t) {
var e = t.getContentSize(), i = this._scrollView.node.getContentSize();
if (this._conditionalDisableScrollBar(e, i)) return;
}
}
this._autoHideRemainingTime = this.autoHideTime;
}
}
},
_calculateLength: function(t, e, i, n) {
var o = t;
n && (o += 20 * (n > 0 ? n : -n));
return i * (e / o);
},
_calculatePosition: function(t, e, i, o, r, s) {
var c = t - e;
r && (c += Math.abs(r));
var a = 0;
if (c) {
a = o / c;
a = cc.clamp01(a);
}
var l = (i - s) * a;
return this.direction === n.VERTICAL ? cc.p(0, l) : cc.p(l, 0);
},
_updateLength: function(t) {
if (this.handle) {
var e = this.handle.node, i = e.getContentSize();
e.setAnchorPoint(cc.p(0, 0));
this.direction === n.HORIZONTAL ? e.setContentSize(t, i.height) : e.setContentSize(i.width, t);
}
},
_processAutoHide: function(t) {
if (this.enableAutoHide && !(this._autoHideRemainingTime <= 0) && !this._touching) {
this._autoHideRemainingTime -= t;
if (this._autoHideRemainingTime <= this.autoHideTime) {
this._autoHideRemainingTime = Math.max(0, this._autoHideRemainingTime);
var e = this._opacity * (this._autoHideRemainingTime / this.autoHideTime);
this._setOpacity(e);
}
}
},
start: function() {
this.enableAutoHide && this._setOpacity(0);
},
hide: function() {
this._autoHideRemainingTime = 0;
this._setOpacity(0);
},
show: function() {
this._autoHideRemainingTime = this.autoHideTime;
this._setOpacity(this._opacity);
},
update: function(t) {
this._processAutoHide(t);
}
});
cc.Scrollbar = e.exports = o;
}), {
"./CCComponent": 47
} ],
62: [ (function(t, e, i) {
var n = function() {
return new Date().getMilliseconds();
}, o = cc.Enum({
SCROLL_TO_TOP: 0,
SCROLL_TO_BOTTOM: 1,
SCROLL_TO_LEFT: 2,
SCROLL_TO_RIGHT: 3,
SCROLLING: 4,
BOUNCE_TOP: 5,
BOUNCE_BOTTOM: 6,
BOUNCE_LEFT: 7,
BOUNCE_RIGHT: 8,
SCROLL_ENDED: 9,
TOUCH_UP: 10,
AUTOSCROLL_ENDED_WITH_THRESHOLD: 11,
SCROLL_BEGAN: 12
}), r = {
"scroll-to-top": o.SCROLL_TO_TOP,
"scroll-to-bottom": o.SCROLL_TO_BOTTOM,
"scroll-to-left": o.SCROLL_TO_LEFT,
"scroll-to-right": o.SCROLL_TO_RIGHT,
scrolling: o.SCROLLING,
"bounce-bottom": o.BOUNCE_BOTTOM,
"bounce-left": o.BOUNCE_LEFT,
"bounce-right": o.BOUNCE_RIGHT,
"bounce-top": o.BOUNCE_TOP,
"scroll-ended": o.SCROLL_ENDED,
"touch-up": o.TOUCH_UP,
"scroll-ended-with-threshold": o.AUTOSCROLL_ENDED_WITH_THRESHOLD,
"scroll-began": o.SCROLL_BEGAN
}, s = cc.Class({
name: "cc.ScrollView",
extends: t("./CCViewGroup"),
editor: !1,
ctor: function() {
this._topBoundary = 0;
this._bottomBoundary = 0;
this._leftBoundary = 0;
this._rightBoundary = 0;
this._touchMoveDisplacements = [];
this._touchMoveTimeDeltas = [];
this._touchMovePreviousTimestamp = 0;
this._touchMoved = !1;
this._autoScrolling = !1;
this._autoScrollAttenuate = !1;
this._autoScrollStartPosition = cc.p(0, 0);
this._autoScrollTargetDelta = cc.p(0, 0);
this._autoScrollTotalTime = 0;
this._autoScrollAccumulatedTime = 0;
this._autoScrollCurrentlyOutOfBoundary = !1;
this._autoScrollBraking = !1;
this._autoScrollBrakingStartPosition = cc.p(0, 0);
this._outOfBoundaryAmount = cc.p(0, 0);
this._outOfBoundaryAmountDirty = !0;
this._stopMouseWheel = !1;
this._mouseWheelEventElapsedTime = 0;
this._isScrollEndedWithThresholdEventFired = !1;
this._scrollEventEmitMask = 0;
this._isBouncing = !1;
this._scrolling = !1;
},
properties: {
content: {
default: void 0,
type: cc.Node,
tooltip: !1
},
horizontal: {
default: !0,
animatable: !1,
tooltip: !1
},
vertical: {
default: !0,
animatable: !1,
tooltip: !1
},
inertia: {
default: !0,
tooltip: !1
},
brake: {
default: .5,
type: "Float",
range: [ 0, 1, .1 ],
tooltip: !1
},
elastic: {
default: !0,
animatable: !1,
tooltip: !1
},
bounceDuration: {
default: 1,
range: [ 0, 10 ],
tooltip: !1
},
horizontalScrollBar: {
default: void 0,
type: cc.Scrollbar,
tooltip: !1,
notify: function() {
if (this.horizontalScrollBar) {
this.horizontalScrollBar.setTargetScrollView(this);
this._updateScrollBar(0);
}
},
animatable: !1
},
verticalScrollBar: {
default: void 0,
type: cc.Scrollbar,
tooltip: !1,
notify: function() {
if (this.verticalScrollBar) {
this.verticalScrollBar.setTargetScrollView(this);
this._updateScrollBar(0);
}
},
animatable: !1
},
scrollEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
},
cancelInnerEvents: {
default: !0,
animatable: !1,
tooltip: !1
}
},
statics: {
EventType: o
},
scrollToBottom: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(0, 0),
applyToHorizontal: !1,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i, !0);
},
scrollToTop: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(0, 1),
applyToHorizontal: !1,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToLeft: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(0, 0),
applyToHorizontal: !0,
applyToVertical: !1
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToRight: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(1, 0),
applyToHorizontal: !0,
applyToVertical: !1
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToTopLeft: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(0, 1),
applyToHorizontal: !0,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToTopRight: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(1, 1),
applyToHorizontal: !0,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToBottomLeft: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(0, 0),
applyToHorizontal: !0,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToBottomRight: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(1, 0),
applyToHorizontal: !0,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToOffset: function(t, e, i) {
var n = this.getMaxScrollOffset(), o = cc.p(0, 0);
0 === n.x ? o.x = 0 : o.x = t.x / n.x;
0 === n.y ? o.y = 1 : o.y = (n.y - t.y) / n.y;
this.scrollTo(o, e, i);
},
getScrollOffset: function() {
var t = this._getContentTopBoundary() - this._topBoundary, e = this._getContentLeftBoundary() - this._leftBoundary;
return cc.p(e, t);
},
getMaxScrollOffset: function() {
var t = this.node.getContentSize(), e = this.content.getContentSize(), i = e.width - t.width, n = e.height - t.height;
i = i >= 0 ? i : 0;
n = n >= 0 ? n : 0;
return cc.p(i, n);
},
scrollToPercentHorizontal: function(t, e, i) {
var n = this._calculateMovePercentDelta({
anchor: cc.p(t, 0),
applyToHorizontal: !0,
applyToVertical: !1
});
e ? this._startAutoScroll(n, e, !1 !== i) : this._moveContent(n);
},
scrollTo: function(t, e, i) {
var n = this._calculateMovePercentDelta({
anchor: t,
applyToHorizontal: !0,
applyToVertical: !0
});
e ? this._startAutoScroll(n, e, !1 !== i) : this._moveContent(n);
},
scrollToPercentVertical: function(t, e, i) {
var n = this._calculateMovePercentDelta({
anchor: cc.p(0, t),
applyToHorizontal: !1,
applyToVertical: !0
});
e ? this._startAutoScroll(n, e, !1 !== i) : this._moveContent(n);
},
stopAutoScroll: function() {
this._autoScrolling = !1;
this._autoScrollAccumulatedTime = this._autoScrollTotalTime;
},
setContentPosition: function(t) {
if (!cc.pFuzzyEqual(t, this.getContentPosition(), 1e-4)) {
this.content.setPosition(t);
this._outOfBoundaryAmountDirty = !0;
}
},
getContentPosition: function() {
return this.content.getPosition();
},
isScrolling: function() {
return this._scrolling;
},
isAutoScrolling: function() {
return this._autoScrolling;
},
_registerEvent: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this, !0);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, !0);
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this, !0);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, !0);
this.node.on(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, !0);
},
_unregisterEvent: function() {
this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this, !0);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, !0);
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this, !0);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, !0);
this.node.off(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, !0);
},
_onMouseWheel: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
var i = cc.p(0, 0), n = -.1;
n = -7;
this.vertical ? i = cc.p(0, t.getScrollY() * n) : this.horizontal && (i = cc.p(t.getScrollY() * n, 0));
this._mouseWheelEventElapsedTime = 0;
this._processDeltaMove(i);
if (!this._stopMouseWheel) {
this._handlePressLogic();
this.schedule(this._checkMouseWheel, 1 / 60);
this._stopMouseWheel = !0;
}
this._stopPropagationIfTargetIsMe(t);
}
},
_checkMouseWheel: function(t) {
var e = this._getHowMuchOutOfBoundary();
if (cc.pFuzzyEqual(e, cc.p(0, 0), 1e-4)) {
this._mouseWheelEventElapsedTime += t;
if (this._mouseWheelEventElapsedTime > .1) {
this._onScrollBarTouchEnded();
this.unschedule(this._checkMouseWheel);
this._stopMouseWheel = !1;
}
} else {
this._processInertiaScroll();
this.unschedule(this._checkMouseWheel);
this._stopMouseWheel = !1;
}
},
_calculateMovePercentDelta: function(t) {
var e = t.anchor, i = t.applyToHorizontal, n = t.applyToVertical;
this._calculateBoundary();
e = cc.pClamp(e, cc.p(0, 0), cc.p(1, 1));
var o = this.node.getContentSize(), r = this.content.getContentSize(), s = this._getContentBottomBoundary() - this._bottomBoundary;
s = -s;
var c = this._getContentLeftBoundary() - this._leftBoundary;
c = -c;
var a = cc.p(0, 0), l = 0;
if (i) {
l = r.width - o.width;
a.x = c - l * e.x;
}
if (n) {
l = r.height - o.height;
a.y = s - l * e.y;
}
return a;
},
_moveContentToTopLeft: function(t) {
var e = this.content.getContentSize(), i = this._getContentBottomBoundary() - this._bottomBoundary;
i = -i;
var n = cc.p(0, 0), o = 0, r = this._getContentLeftBoundary() - this._leftBoundary;
r = -r;
if (e.height < t.height) {
o = e.height - t.height;
n.y = i - o;
this.verticalScrollBar && this.verticalScrollBar.hide();
} else this.verticalScrollBar && this.verticalScrollBar.show();
if (e.width < t.width) {
o = e.width - t.width;
n.x = r;
this.horizontalScrollBar && this.horizontalScrollBar.hide();
} else this.horizontalScrollBar && this.horizontalScrollBar.show();
this._moveContent(n);
this._adjustContentOutOfBoundary();
},
_calculateBoundary: function() {
if (this.content) {
var t = this.content.getComponent(cc.Layout);
t && t.enabledInHierarchy && t.updateLayout();
var e = this.node.getContentSize(), i = this._convertToContentParentSpace(cc.p(0, 0));
this._leftBoundary = i.x;
this._bottomBoundary = i.y;
var n = this._convertToContentParentSpace(cc.p(e.width, e.height));
this._rightBoundary = n.x;
this._topBoundary = n.y;
this._moveContentToTopLeft(e);
}
},
_convertToContentParentSpace: function(t) {
var e = this.node.convertToWorldSpace(t);
return this.content.parent.convertToNodeSpaceAR(e);
},
_hasNestedViewGroup: function(t, e) {
if (t.eventPhase === cc.Event.CAPTURING_PHASE) {
if (e) for (var i = 0; i < e.length; ++i) {
var n = e[i];
if (this.node === n) return !!t.target.getComponent(cc.ViewGroup);
if (n.getComponent(cc.ViewGroup)) return !0;
}
return !1;
}
},
_stopPropagationIfTargetIsMe: function(t) {
t.eventPhase === cc.Event.AT_TARGET && t.target === this.node && t.stopPropagation();
},
_onTouchBegan: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
var i = t.touch;
this.content && this._handlePressLogic(i);
this._touchMoved = !1;
this._stopPropagationIfTargetIsMe(t);
}
},
_onTouchMoved: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
var i = t.touch;
this.content && this._handleMoveLogic(i);
if (this.cancelInnerEvents) {
var n = cc.pSub(i.getLocation(), i.getStartLocation());
if (cc.pLength(n) > 7 && !this._touchMoved && t.target !== this.node) {
var o = new cc.Event.EventTouch(t.getTouches(), t.bubbles);
o.type = cc.Node.EventType.TOUCH_CANCEL;
o.touch = t.touch;
o.simulate = !0;
t.target.dispatchEvent(o);
this._touchMoved = !0;
}
this._stopPropagationIfTargetIsMe(t);
}
}
},
_onTouchEnded: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
this._dispatchEvent("touch-up");
var i = t.touch;
this.content && this._handleReleaseLogic(i);
this._touchMoved ? t.stopPropagation() : this._stopPropagationIfTargetIsMe(t);
}
},
_onTouchCancelled: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
if (!t.simulate) {
var i = t.touch;
this.content && this._handleReleaseLogic(i);
}
this._stopPropagationIfTargetIsMe(t);
}
},
_processDeltaMove: function(t) {
this._scrollChildren(t);
this._gatherTouchMove(t);
},
_handleMoveLogic: function(t) {
var e = t.getDelta();
this._processDeltaMove(e);
},
_scrollChildren: function(t) {
var e, i = t = this._clampDelta(t);
if (this.elastic) {
e = this._getHowMuchOutOfBoundary();
i.x *= 0 === e.x ? 1 : .5;
i.y *= 0 === e.y ? 1 : .5;
}
if (!this.elastic) {
e = this._getHowMuchOutOfBoundary(i);
i = cc.pAdd(i, e);
}
var n = -1;
if (i.y > 0) {
this.content.y - this.content.anchorY * this.content.height + i.y > this._bottomBoundary && (n = "scroll-to-bottom");
} else if (i.y < 0) {
this.content.y - this.content.anchorY * this.content.height + this.content.height + i.y <= this._topBoundary && (n = "scroll-to-top");
} else if (i.x < 0) {
this.content.x - this.content.anchorX * this.content.width + this.content.width + i.x <= this._rightBoundary && (n = "scroll-to-right");
} else if (i.x > 0) {
this.content.x - this.content.anchorX * this.content.width + i.x >= this._leftBoundary && (n = "scroll-to-left");
}
this._moveContent(i, !1);
if (0 !== i.x || 0 !== i.y) {
if (!this._scrolling) {
this._scrolling = !0;
this._dispatchEvent("scroll-began");
}
this._dispatchEvent("scrolling");
}
-1 !== n && this._dispatchEvent(n);
},
_handlePressLogic: function() {
this._autoScrolling && this._dispatchEvent("scroll-ended");
this._autoScrolling = !1;
this._isBouncing = !1;
this._touchMovePreviousTimestamp = n();
this._touchMoveDisplacements.length = 0;
this._touchMoveTimeDeltas.length = 0;
this._onScrollBarTouchBegan();
},
_clampDelta: function(t) {
var e = this.content.getContentSize(), i = this.node.getContentSize();
e.width < i.width && (t.x = 0);
e.height < i.height && (t.y = 0);
return t;
},
_gatherTouchMove: function(t) {
t = this._clampDelta(t);
for (;this._touchMoveDisplacements.length >= 5; ) {
this._touchMoveDisplacements.shift();
this._touchMoveTimeDeltas.shift();
}
this._touchMoveDisplacements.push(t);
var e = n();
this._touchMoveTimeDeltas.push((e - this._touchMovePreviousTimestamp) / 1e3);
this._touchMovePreviousTimestamp = e;
},
_startBounceBackIfNeeded: function() {
if (!this.elastic) return !1;
var t = this._getHowMuchOutOfBoundary();
t = this._clampDelta(t);
if (cc.pFuzzyEqual(t, cc.p(0, 0), 1e-4)) return !1;
var e = Math.max(this.bounceDuration, 0);
this._startAutoScroll(t, e, !0);
if (!this._isBouncing) {
t.y > 0 && this._dispatchEvent("bounce-top");
t.y < 0 && this._dispatchEvent("bounce-bottom");
t.x > 0 && this._dispatchEvent("bounce-right");
t.x < 0 && this._dispatchEvent("bounce-left");
this._isBouncing = !0;
}
return !0;
},
_processInertiaScroll: function() {
if (!this._startBounceBackIfNeeded() && this.inertia) {
var t = this._calculateTouchMoveVelocity();
!cc.pFuzzyEqual(t, cc.p(0, 0), 1e-4) && this.brake < 1 && this._startInertiaScroll(t);
}
this._onScrollBarTouchEnded();
},
_handleReleaseLogic: function(t) {
var e = t.getDelta();
this._gatherTouchMove(e);
this._processInertiaScroll();
if (this._scrolling) {
this._scrolling = !1;
this._autoScrolling || this._dispatchEvent("scroll-ended");
}
},
_isOutOfBoundary: function() {
var t = this._getHowMuchOutOfBoundary();
return !cc.pFuzzyEqual(t, cc.p(0, 0), 1e-4);
},
_isNecessaryAutoScrollBrake: function() {
if (this._autoScrollBraking) return !0;
if (this._isOutOfBoundary()) {
if (!this._autoScrollCurrentlyOutOfBoundary) {
this._autoScrollCurrentlyOutOfBoundary = !0;
this._autoScrollBraking = !0;
this._autoScrollBrakingStartPosition = this.getContentPosition();
return !0;
}
} else this._autoScrollCurrentlyOutOfBoundary = !1;
return !1;
},
getScrollEndedEventTiming: function() {
return 1e-4;
},
_processAutoScrolling: function(t) {
var e = this._isNecessaryAutoScrollBrake(), i = e ? .05 : 1;
this._autoScrollAccumulatedTime += t * (1 / i);
var n = Math.min(1, this._autoScrollAccumulatedTime / this._autoScrollTotalTime);
this._autoScrollAttenuate && (n = (function(t) {
return (t -= 1) * t * t * t * t + 1;
})(n));
var o = cc.pAdd(this._autoScrollStartPosition, cc.pMult(this._autoScrollTargetDelta, n)), r = Math.abs(n - 1) <= 1e-4;
if (Math.abs(n - 1) <= this.getScrollEndedEventTiming() && !this._isScrollEndedWithThresholdEventFired) {
this._dispatchEvent("scroll-ended-with-threshold");
this._isScrollEndedWithThresholdEventFired = !0;
}
if (this.elastic) {
var s = cc.pSub(o, this._autoScrollBrakingStartPosition);
e && (s = cc.pMult(s, i));
o = cc.pAdd(this._autoScrollBrakingStartPosition, s);
} else {
var c = cc.pSub(o, this.getContentPosition()), a = this._getHowMuchOutOfBoundary(c);
if (!cc.pFuzzyEqual(a, cc.p(0, 0), 1e-4)) {
o = cc.pAdd(o, a);
r = !0;
}
}
r && (this._autoScrolling = !1);
var l = cc.pSub(o, this.getContentPosition());
this._moveContent(this._clampDelta(l), r);
this._dispatchEvent("scrolling");
if (!this._autoScrolling) {
this._isBouncing = !1;
this._dispatchEvent("scroll-ended");
}
},
_startInertiaScroll: function(t) {
var e = cc.pMult(t, .7);
this._startAttenuatingAutoScroll(e, t);
},
_calculateAttenuatedFactor: function(t) {
return this.brake <= 0 ? 1 - this.brake : (1 - this.brake) * (1 / (1 + 14e-6 * t + t * t * 8e-9));
},
_startAttenuatingAutoScroll: function(t, e) {
var i = this._calculateAutoScrollTimeByInitalSpeed(cc.pLength(e)), n = cc.pNormalize(t), o = this.content.getContentSize(), r = this.node.getContentSize(), s = o.width - r.width, c = o.height - r.height, a = this._calculateAttenuatedFactor(s), l = this._calculateAttenuatedFactor(c);
n = cc.p(n.x * s * (1 - this.brake) * a, n.y * c * l * (1 - this.brake));
var h = cc.pLength(t), u = cc.pLength(n) / h;
n = cc.pAdd(n, t);
if (this.brake > 0 && u > 7) {
u = Math.sqrt(u);
n = cc.pAdd(cc.pMult(t, u), t);
}
this.brake > 0 && u > 3 && (i *= u = 3);
0 === this.brake && u > 1 && (i *= u);
this._startAutoScroll(n, i, !0);
},
_calculateAutoScrollTimeByInitalSpeed: function(t) {
return Math.sqrt(Math.sqrt(t / 5));
},
_startAutoScroll: function(t, e, i) {
var n = this._flattenVectorByDirection(t);
this._autoScrolling = !0;
this._autoScrollTargetDelta = n;
this._autoScrollAttenuate = i;
this._autoScrollStartPosition = this.getContentPosition();
this._autoScrollTotalTime = e;
this._autoScrollAccumulatedTime = 0;
this._autoScrollBraking = !1;
this._isScrollEndedWithThresholdEventFired = !1;
this._autoScrollBrakingStartPosition = cc.p(0, 0);
var o = this._getHowMuchOutOfBoundary();
if (!cc.pFuzzyEqual(o, cc.p(0, 0), 1e-4)) {
this._autoScrollCurrentlyOutOfBoundary = !0;
var r = this._getHowMuchOutOfBoundary(n);
(o.x * r.x > 0 || o.y * r.y > 0) && (this._autoScrollBraking = !0);
}
},
_calculateTouchMoveVelocity: function() {
var t = 0;
if ((t = this._touchMoveTimeDeltas.reduce((function(t, e) {
return t + e;
}), t)) <= 0 || t >= .5) return cc.p(0, 0);
var e = cc.p(0, 0);
e = this._touchMoveDisplacements.reduce((function(t, e) {
return cc.pAdd(t, e);
}), e);
return cc.p(e.x * (1 - this.brake) / t, e.y * (1 - this.brake) / t);
},
_flattenVectorByDirection: function(t) {
var e = t;
e.x = this.horizontal ? e.x : 0;
e.y = this.vertical ? e.y : 0;
return e;
},
_moveContent: function(t, e) {
var i = this._flattenVectorByDirection(t), n = cc.pAdd(this.getContentPosition(), i);
this.setContentPosition(n);
var o = this._getHowMuchOutOfBoundary();
this._updateScrollBar(o);
this.elastic && e && this._startBounceBackIfNeeded();
},
_getContentLeftBoundary: function() {
return this.getContentPosition().x - this.content.getAnchorPoint().x * this.content.getContentSize().width;
},
_getContentRightBoundary: function() {
var t = this.content.getContentSize();
return this._getContentLeftBoundary() + t.width;
},
_getContentTopBoundary: function() {
var t = this.content.getContentSize();
return this._getContentBottomBoundary() + t.height;
},
_getContentBottomBoundary: function() {
return this.getContentPosition().y - this.content.getAnchorPoint().y * this.content.getContentSize().height;
},
_getHowMuchOutOfBoundary: function(t) {
t = t || cc.p(0, 0);
if (cc.pFuzzyEqual(t, cc.p(0, 0), 1e-4) && !this._outOfBoundaryAmountDirty) return this._outOfBoundaryAmount;
var e = cc.p(0, 0);
this._getContentLeftBoundary() + t.x > this._leftBoundary ? e.x = this._leftBoundary - (this._getContentLeftBoundary() + t.x) : this._getContentRightBoundary() + t.x < this._rightBoundary && (e.x = this._rightBoundary - (this._getContentRightBoundary() + t.x));
this._getContentTopBoundary() + t.y < this._topBoundary ? e.y = this._topBoundary - (this._getContentTopBoundary() + t.y) : this._getContentBottomBoundary() + t.y > this._bottomBoundary && (e.y = this._bottomBoundary - (this._getContentBottomBoundary() + t.y));
if (cc.pFuzzyEqual(t, cc.p(0, 0), 1e-4)) {
this._outOfBoundaryAmount = e;
this._outOfBoundaryAmountDirty = !1;
}
return e = this._clampDelta(e);
},
_updateScrollBar: function(t) {
this.horizontalScrollBar && this.horizontalScrollBar._onScroll(t);
this.verticalScrollBar && this.verticalScrollBar._onScroll(t);
},
_onScrollBarTouchBegan: function() {
this.horizontalScrollBar && this.horizontalScrollBar._onTouchBegan();
this.verticalScrollBar && this.verticalScrollBar._onTouchBegan();
},
_onScrollBarTouchEnded: function() {
this.horizontalScrollBar && this.horizontalScrollBar._onTouchEnded();
this.verticalScrollBar && this.verticalScrollBar._onTouchEnded();
},
_dispatchEvent: function(t) {
if ("scroll-ended" === t) this._scrollEventEmitMask = 0; else if ("scroll-to-top" === t || "scroll-to-bottom" === t || "scroll-to-left" === t || "scroll-to-right" === t) {
var e = 1 << r[t];
if (this._scrollEventEmitMask & e) return;
this._scrollEventEmitMask |= e;
}
cc.Component.EventHandler.emitEvents(this.scrollEvents, this, r[t]);
this.node.emit(t, this);
},
_adjustContentOutOfBoundary: function() {
this._outOfBoundaryAmountDirty = !0;
if (this._isOutOfBoundary()) {
var t = this._getHowMuchOutOfBoundary(cc.p(0, 0)), e = cc.pAdd(this.getContentPosition(), t);
if (this.content) {
this.content.setPosition(e);
this._updateScrollBar(0);
}
}
},
start: function() {
this._calculateBoundary();
this.content && cc.director.once(cc.Director.EVENT_AFTER_VISIT, this._adjustContentOutOfBoundary, this);
},
_hideScrollbar: function() {
this.horizontalScrollBar && this.horizontalScrollBar.hide();
this.verticalScrollBar && this.verticalScrollBar.hide();
},
_showScrollbar: function() {
this.horizontalScrollBar && this.horizontalScrollBar.show();
this.verticalScrollBar && this.verticalScrollBar.show();
},
onDisable: function() {
this._unregisterEvent();
this.node.off("size-changed", this._calculateBoundary, this);
this.node.off("scale-changed", this._calculateBoundary, this);
if (this.content) {
this.content.off("size-changed", this._calculateBoundary, this);
this.content.off("scale-changed", this._calculateBoundary, this);
}
this._hideScrollbar();
this.stopAutoScroll();
},
onEnable: function() {
this._registerEvent();
this.node.on("size-changed", this._calculateBoundary, this);
this.node.on("scale-changed", this._calculateBoundary, this);
if (this.content) {
this.content.on("size-changed", this._calculateBoundary, this);
this.content.on("scale-changed", this._calculateBoundary, this);
}
this._showScrollbar();
},
update: function(t) {
this._autoScrolling && this._processAutoScrolling(t);
}
});
cc.ScrollView = e.exports = s;
}), {
"./CCViewGroup": 71
} ],
63: [ (function(t, e, i) {
var n = cc.Enum({
Horizontal: 0,
Vertical: 1
}), o = cc.Class({
name: "cc.Slider",
extends: t("./CCComponent"),
editor: !1,
ctor: function() {
this._offset = cc.p();
this._touchHandle = !1;
this._dragging = !1;
},
properties: {
handle: {
default: null,
type: cc.Button,
tooltip: !1,
notify: function() {
0;
}
},
direction: {
default: n.Horizontal,
type: n,
tooltip: !1
},
progress: {
default: .5,
type: cc.Float,
range: [ 0, 1, .1 ],
slide: !0,
tooltip: !1,
notify: function() {
this._updateHandlePosition();
}
},
slideEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
}
},
statics: {
Direction: n
},
__preload: function() {
this._updateHandlePosition();
},
onEnable: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this);
if (this.handle && this.handle.isValid) {
this.handle.node.on(cc.Node.EventType.TOUCH_START, this._onHandleDragStart, this);
this.handle.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.handle.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
}
},
onDisable: function() {
this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this);
if (this.handle && this.handle.isValid) {
this.handle.node.off(cc.Node.EventType.TOUCH_START, this._onHandleDragStart, this);
this.handle.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.handle.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
}
},
_onHandleDragStart: function(t) {
this._dragging = !0;
this._touchHandle = !0;
this._offset = this.handle.node.convertTouchToNodeSpaceAR(t.touch);
t.stopPropagation();
},
_onTouchBegan: function(t) {
if (this.handle) {
this._dragging = !0;
this._touchHandle || this._handleSliderLogic(t.touch);
t.stopPropagation();
}
},
_onTouchMoved: function(t) {
if (this._dragging) {
this._handleSliderLogic(t.touch);
t.stopPropagation();
}
},
_onTouchEnded: function(t) {
this._dragging = !1;
this._touchHandle = !1;
this._offset = cc.p();
t.stopPropagation();
},
_onTouchCancelled: function(t) {
this._dragging = !1;
t.stopPropagation();
},
_handleSliderLogic: function(t) {
this._updateProgress(t);
this._emitSlideEvent();
},
_emitSlideEvent: function() {
cc.Component.EventHandler.emitEvents(this.slideEvents, this);
this.node.emit("slide", this);
},
_updateProgress: function(t) {
if (this.handle) {
var e = this.node.convertTouchToNodeSpaceAR(t);
this.direction === n.Horizontal ? this.progress = cc.clamp01(.5 + (e.x - this._offset.x) / this.node.width) : this.progress = cc.clamp01(.5 + (e.y - this._offset.y) / this.node.height);
}
},
_updateHandlePosition: function() {
if (this.handle) {
var t;
t = this.direction === n.Horizontal ? cc.p(-this.node.width * this.node.anchorX + this.progress * this.node.width, 0) : cc.p(0, -this.node.height * this.node.anchorY + this.progress * this.node.height);
var e = this.node.convertToWorldSpaceAR(t);
this.handle.node.position = this.handle.node.parent.convertToNodeSpaceAR(e);
}
}
});
cc.Slider = e.exports = o;
}), {
"./CCComponent": 47
} ],
64: [ (function(t, e, i) {
var n = t("./CCRendererUnderSG"), o = cc.Scale9Sprite.RenderingType, r = cc.Scale9Sprite.FillType, s = cc.BlendFunc.BlendFactor, c = cc.Enum({
CUSTOM: 0,
TRIMMED: 1,
RAW: 2
}), a = cc.Class({
name: "cc.Sprite",
extends: n,
editor: !1,
ctor: function() {
this._blendFunc = new cc.BlendFunc(this._srcBlendFactor, this._dstBlendFactor);
},
properties: {
_spriteFrame: {
default: null,
type: cc.SpriteFrame
},
_type: o.SIMPLE,
_sizeMode: c.TRIMMED,
_fillType: 0,
_fillCenter: cc.v2(0, 0),
_fillStart: 0,
_fillRange: 0,
_isTrimmedMode: !0,
_srcBlendFactor: s.SRC_ALPHA,
_dstBlendFactor: s.ONE_MINUS_SRC_ALPHA,
_atlas: {
default: null,
type: cc.SpriteAtlas,
tooltip: !1,
editorOnly: !0,
visible: !0,
animatable: !1
},
spriteFrame: {
get: function() {
return this._spriteFrame;
},
set: function(t, e) {
var i = this._spriteFrame;
if (i !== t) {
this._spriteFrame = t;
this._applySpriteFrame(i);
0;
}
},
type: cc.SpriteFrame
},
type: {
get: function() {
return this._type;
},
set: function(t) {
this._type = t;
this._sgNode.setRenderingType(t);
},
type: o,
animatable: !1,
tooltip: !1
},
fillType: {
get: function() {
return this._fillType;
},
set: function(t) {
this._fillType = t;
this._sgNode && this._sgNode.setFillType(t);
},
type: r,
tooltip: !1
},
fillCenter: {
get: function() {
return this._fillCenter;
},
set: function(t) {
this._fillCenter = cc.v2(t);
this._sgNode && this._sgNode.setFillCenter(this._fillCenter);
},
tooltip: !1
},
fillStart: {
get: function() {
return this._fillStart;
},
set: function(t) {
this._fillStart = cc.clampf(t, -1, 1);
this._sgNode && this._sgNode.setFillStart(t);
},
tooltip: !1
},
fillRange: {
get: function() {
return this._fillRange;
},
set: function(t) {
this._fillRange = cc.clampf(t, -1, 1);
this._sgNode && this._sgNode.setFillRange(t);
},
tooltip: !1
},
trim: {
get: function() {
return this._isTrimmedMode;
},
set: function(t) {
if (this._isTrimmedMode !== t) {
this._isTrimmedMode = t;
this._sgNode.enableTrimmedContentSize(t);
}
},
animatable: !1,
tooltip: !1
},
srcBlendFactor: {
get: function() {
return this._srcBlendFactor;
},
set: function(t) {
this._srcBlendFactor = t;
this._blendFunc.src = t;
this._sgNode.setBlendFunc(this._blendFunc);
},
animatable: !1,
type: s,
tooltip: !1
},
dstBlendFactor: {
get: function() {
return this._dstBlendFactor;
},
set: function(t) {
this._dstBlendFactor = t;
this._blendFunc.dst = t;
this._sgNode.setBlendFunc(this._blendFunc);
},
animatable: !1,
type: s,
tooltip: !1
},
sizeMode: {
get: function() {
return this._sizeMode;
},
set: function(t) {
this._sizeMode = t;
t !== c.CUSTOM && this._applySpriteSize();
},
animatable: !1,
type: c,
tooltip: !1
}
},
statics: {
FillType: r,
Type: o,
SizeMode: c
},
setVisible: function(t) {
this.enabled = t;
},
setInsetLeft: function(t) {
this._sgNode.setInsetLeft(t);
},
getInsetLeft: function() {
return this._sgNode.getInsetLeft();
},
setInsetTop: function(t) {
this._sgNode.setInsetTop(t);
},
getInsetTop: function() {
return this._sgNode.getInsetTop();
},
setInsetRight: function(t) {
this._sgNode.setInsetRight(t);
},
getInsetRight: function() {
return this._sgNode.getInsetRight();
},
setInsetBottom: function(t) {
this._sgNode.setInsetBottom(t);
},
getInsetBottom: function() {
return this._sgNode.getInsetBottom();
},
onEnable: function() {
this._sgNode && this._spriteFrame && this._spriteFrame.textureLoaded() && this._sgNode.setVisible(!0);
},
_applyAtlas: !1,
_applySpriteFrameInsets: function() {
var t = this._spriteFrame, e = this._sgNode;
e.setInsetTop(t.insetTop);
e.setInsetBottom(t.insetBottom);
e.setInsetRight(t.insetRight);
e.setInsetLeft(t.insetLeft);
},
_applySpriteSize: function() {
if (this._spriteFrame) if (c.RAW === this._sizeMode) {
var t = this._spriteFrame.getOriginalSize();
this.node.setContentSize(t);
} else if (c.TRIMMED === this._sizeMode) {
var e = this._spriteFrame.getRect();
this.node.setContentSize(e.width, e.height);
}
},
_onTextureLoaded: function(t) {
if (this.isValid) {
var e = this._sgNode;
e.setSpriteFrame(this._spriteFrame);
this._applySpriteSize();
this.enabledInHierarchy && !e.isVisible() && e.setVisible(!0);
}
},
_applySpriteFrame: function(t, e) {
var i = this._sgNode;
t && t.off && t.off("load", this._onTextureLoaded, this);
var n = this._spriteFrame;
if (n) {
e || this._applySpriteFrameInsets();
if (n.textureLoaded()) this._onTextureLoaded(null); else {
n.once("load", this._onTextureLoaded, this);
n.ensureLoadTexture();
}
} else {
i.setSpriteFrame(null);
i.setVisible(!1);
}
0;
},
_createSgNode: function() {
return new cc.Scale9Sprite();
},
_initSgNode: function() {
var t = this._sgNode, e = 0 !== t.getInsetLeft() || 0 !== t.getInsetRight() || 0 !== t.getInsetTop() || 0 !== t.getInsetBottom();
this._applySpriteFrame(null, e);
t.setContentSize(this.node.getContentSize(!0));
this._applySpriteSize();
t.setRenderingType(this._type);
t.setFillType(this._fillType);
t.setFillCenter(this._fillCenter);
t.setFillStart(this._fillStart);
t.setFillRange(this._fillRange);
t.enableTrimmedContentSize(this._isTrimmedMode);
this._blendFunc.src = this._srcBlendFactor;
this._blendFunc.dst = this._dstBlendFactor;
t.setBlendFunc(this._blendFunc);
},
_resized: !1
});
0;
t("../utils/misc").propertyDefine(a, [ "insetLeft", "insetTop", "insetRight", "insetBottom" ], {
type: [ null, "setRenderingType" ]
});
cc.Sprite = e.exports = a;
}), {
"../utils/misc": 155,
"./CCRendererUnderSG": 58
} ],
65: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.SpriteDistortion",
extends: t("./CCComponent"),
editor: !1,
ctor: function() {
this._spriteSGNode = null;
},
properties: {
_distortionOffset: cc.v2(0, 0),
offset: {
get: function() {
return this._distortionOffset;
},
set: function(t) {
this._distortionOffset.x = t.x;
this._distortionOffset.y = t.y;
this._spriteSGNode && this._spriteSGNode.setDistortionOffset(this._distortionOffset);
}
},
_distortionTiling: cc.v2(1, 1),
tiling: {
get: function() {
return this._distortionTiling;
},
set: function(t) {
this._distortionTiling.x = t.x;
this._distortionTiling.y = t.y;
this._spriteSGNode && this._spriteSGNode.setDistortionTiling(this._distortionTiling);
}
}
},
onEnable: function() {
var t = this.node.getComponent("cc.Sprite"), e = this._spriteSGNode = t && t._sgNode;
if (this._spriteSGNode) {
e.setState(cc.Scale9Sprite.state.DISTORTION);
e.setDistortionOffset(this._distortionOffset);
e.setDistortionTiling(this._distortionTiling);
}
},
onDisable: function() {
this._spriteSGNode && this._spriteSGNode.setState(cc.Scale9Sprite.state.NORMAL);
this._spriteSGNode = null;
}
});
cc.SpriteDistortion = e.exports = n;
}), {
"./CCComponent": 47
} ],
66: [ (function(t, e, i) {
var n = cc.Enum({
NONE: 0,
CHECKBOX: 1,
TEXT_ATLAS: 2,
SLIDER_BAR: 3,
LIST_VIEW: 4,
PAGE_VIEW: 5
}), o = cc.Enum({
VERTICAL: 0,
HORIZONTAL: 1
}), r = cc.Enum({
TOP: 0,
CENTER: 1,
BOTTOM: 2
}), s = cc.Enum({
LEFT: 0,
CENTER: 1,
RIGHT: 2
}), c = cc.Class({
name: "cc.StudioComponent",
extends: cc.Component,
editor: !1,
properties: !1,
statics: {
ComponentType: n,
ListDirection: o,
VerticalAlign: r,
HorizontalAlign: s
}
}), a = t("../utils/prefab-helper");
c.PlaceHolder = cc.Class({
name: "cc.StudioComponent.PlaceHolder",
extends: cc.Component,
properties: {
_baseUrl: "",
nestedPrefab: cc.Prefab
},
onLoad: function() {
this.nestedPrefab && this._replaceWithNestedPrefab();
},
_replaceWithNestedPrefab: function() {
var t = this.node, e = t._prefab;
e.root = t;
e.asset = this.nestedPrefab;
a.syncWithPrefab(t);
}
});
cc.StudioComponent = e.exports = c;
}), {
"../utils/prefab-helper": 157
} ],
67: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Toggle",
extends: t("./CCButton"),
editor: !1,
properties: {
isChecked: {
default: !0,
tooltip: !1,
notify: function() {
this._updateCheckMark();
}
},
toggleGroup: {
default: null,
tooltip: !1,
type: t("./CCToggleGroup")
},
checkMark: {
default: null,
type: cc.Sprite,
tooltip: !1
},
checkEvents: {
default: [],
type: cc.Component.EventHandler
},
_resizeToTarget: {
animatable: !1,
set: function(t) {
t && this._resizeNodeToTargetNode();
}
}
},
onEnable: function() {
this._super();
this._registerToggleEvent();
this.toggleGroup && this.toggleGroup.enabled && this.toggleGroup.addToggle(this);
},
onDisable: function() {
this._super();
this._unregisterToggleEvent();
this.toggleGroup && this.toggleGroup.enabled && this.toggleGroup.removeToggle(this);
},
_updateCheckMark: function() {
this.checkMark && (this.checkMark.node.active = !!this.isChecked);
},
_updateDisabledState: function() {
this._super();
this.checkMark && this.checkMark._sgNode.setState(0);
this.enableAutoGrayEffect && this.checkMark && !this.interactable && this.checkMark._sgNode.setState(1);
},
_registerToggleEvent: function() {
this.node.on("click", this.toggle, this);
},
_unregisterToggleEvent: function() {
this.node.off("click", this.toggle, this);
},
toggle: function(t) {
var e = this.toggleGroup || this._toggleContainer;
if (!(e && e.enabled && this.isChecked) || e.allowSwitchOff) {
this.isChecked = !this.isChecked;
this._updateCheckMark();
e && e.enabled && e.updateToggles(this);
this._emitToggleEvents(t);
}
},
_emitToggleEvents: function() {
this.node.emit("toggle", this);
this.checkEvents && cc.Component.EventHandler.emitEvents(this.checkEvents, this);
},
check: function() {
var t = this.toggleGroup || this._toggleContainer;
if (!(t && t.enabled && this.isChecked) || t.allowSwitchOff) {
this.isChecked = !0;
t && t.enabled && t.updateToggles(this);
this._emitToggleEvents();
}
},
uncheck: function() {
var t = this.toggleGroup || this._toggleContainer;
if (!(t && t.enabled && this.isChecked) || t.allowSwitchOff) {
this.isChecked = !1;
this._emitToggleEvents();
}
}
});
cc.Toggle = e.exports = n;
t("../platform/js").get(n.prototype, "_toggleContainer", (function() {
var t = this.node.parent;
return cc.Node.isNode(t) ? t.getComponent(cc.ToggleContainer) : null;
}));
}), {
"../platform/js": 143,
"./CCButton": 45,
"./CCToggleGroup": 69
} ],
68: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.ToggleContainer",
extends: cc.Component,
editor: !1,
properties: {
allowSwitchOff: {
tooltip: !1,
default: !1
}
},
updateToggles: function(t) {
this.toggleItems.forEach((function(e) {
t.isChecked && e !== t && (e.isChecked = !1);
}));
},
_allowOnlyOneToggleChecked: function() {
var t = !1;
this.toggleItems.forEach((function(e) {
t ? e.isChecked = !1 : e.isChecked && (t = !0);
}));
return t;
},
_makeAtLeastOneToggleChecked: function() {
if (!this._allowOnlyOneToggleChecked() && !this.allowSwitchOff) {
var t = this.toggleItems;
t.length > 0 && t[0].check();
}
},
onEnable: function() {
this.node.on("child-added", this._allowOnlyOneToggleChecked, this);
this.node.on("child-removed", this._makeAtLeastOneToggleChecked, this);
},
onDisable: function() {
this.node.off("child-added", this._allowOnlyOneToggleChecked, this);
this.node.off("child-removed", this._makeAtLeastOneToggleChecked, this);
},
start: function() {
this._makeAtLeastOneToggleChecked();
}
});
t("../platform/js").get(n.prototype, "toggleItems", (function() {
return this.node.getComponentsInChildren(cc.Toggle);
}));
cc.ToggleContainer = e.exports = n;
}), {
"../platform/js": 143
} ],
69: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.ToggleGroup",
extends: cc.Component,
ctor: function() {
this._toggleItems = [];
},
editor: !1,
properties: {
allowSwitchOff: {
tooltip: !1,
default: !1
},
toggleItems: {
get: function() {
return this._toggleItems;
}
}
},
updateToggles: function(t) {
this.enabledInHierarchy && this._toggleItems.forEach((function(e) {
t.isChecked && e !== t && e.isChecked && e.enabled && (e.isChecked = !1);
}));
},
addToggle: function(t) {
-1 === this._toggleItems.indexOf(t) && this._toggleItems.push(t);
this._allowOnlyOneToggleChecked();
},
removeToggle: function(t) {
var e = this._toggleItems.indexOf(t);
e > -1 && this._toggleItems.splice(e, 1);
this._makeAtLeastOneToggleChecked();
},
_allowOnlyOneToggleChecked: function() {
var t = !1;
this._toggleItems.forEach((function(e) {
t && e.enabled && (e.isChecked = !1);
e.isChecked && e.enabled && (t = !0);
}));
return t;
},
_makeAtLeastOneToggleChecked: function() {
this._allowOnlyOneToggleChecked() || this.allowSwitchOff || this._toggleItems.length > 0 && (this._toggleItems[0].isChecked = !0);
},
start: function() {
this._makeAtLeastOneToggleChecked();
}
}), o = (t("../platform/js"), !1);
cc.js.get(cc, "ToggleGroup", (function() {
if (!o) {
cc.logID(1405, "cc.ToggleGroup", "cc.ToggleContainer");
o = !0;
}
return n;
}));
cc.ToggleGroup = e.exports = n;
}), {
"../platform/js": 143
} ],
70: [ (function(i, n, o) {
i("../videoplayer/CCSGVideoPlayer");
var r = _ccsg.VideoPlayer.EventType, s = cc.Enum({
REMOTE: 0,
LOCAL: 1
}), c = cc.Class({
name: "cc.VideoPlayer",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_resourceType: s.REMOTE,
resourceType: {
tooltip: !1,
type: s,
set: function(t) {
this._resourceType = t;
this._updateVideoSource();
},
get: function() {
return this._resourceType;
}
},
_remoteURL: "",
remoteURL: {
tooltip: !1,
type: cc.String,
set: function(t) {
this._remoteURL = t;
this._updateVideoSource();
},
get: function() {
return this._remoteURL;
}
},
_clip: {
default: null,
type: cc.Asset
},
clip: {
tooltip: !1,
get: function() {
return this._clip;
},
set: function(i) {
if ("string" === ("object" === (e = typeof i) ? t(i) : e)) {
cc.errorID(8401, "cc.VideoPlayer", "cc.Asset", "Asset", "cc.Asset", "video");
i = {
nativeUrl: i
};
}
this._clip = i;
this._updateVideoSource();
},
type: cc.Asset
},
currentTime: {
tooltip: !1,
type: cc.Float,
set: function(t) {
this._sgNode && this._sgNode.seekTo(t);
},
get: function() {
return this._sgNode ? this._sgNode.currentTime() : -1;
}
},
_volume: 1,
volume: {
get: function() {
return this._volume;
},
set: function(t) {
this._volume = t;
this.isPlaying() && !this._mute && this._syncVolume();
},
range: [ 0, 1 ],
type: cc.Float,
tooltip: !1
},
_mute: !1,
mute: {
get: function() {
return this._mute;
},
set: function(t) {
this._mute = t;
this._syncVolume();
},
tooltip: !1
},
keepAspectRatio: {
tooltip: !1,
default: !0,
type: cc.Boolean,
notify: function() {
this._sgNode.setKeepAspectRatioEnabled(this.keepAspectRatio);
}
},
isFullscreen: {
tooltip: !1,
default: !1,
type: cc.Boolean,
notify: function() {
this._sgNode.setFullScreenEnabled(this.isFullscreen);
}
},
videoPlayerEvent: {
default: [],
type: cc.Component.EventHandler
}
},
statics: {
EventType: r,
ResourceType: s
},
onLoad: function() {
cc.sys.os !== cc.sys.OS_OSX && cc.sys.os !== cc.sys.OS_WINDOWS || (this.enabled = !1);
},
_syncVolume: function() {
var t = this._sgNode;
if (t) {
var e = this._mute ? 0 : this._volume;
t.setVolume(e);
}
},
_createSgNode: function() {
if (cc.sys.os === cc.sys.OS_OSX || cc.sys.os === cc.sys.OS_WINDOWS) {
console.log("VideoPlayer is not supported on Mac and Windows!");
return null;
}
return new _ccsg.VideoPlayer();
},
_updateVideoSource: function() {
var t = this._sgNode, e = "";
this.resourceType === s.REMOTE ? e = this.remoteURL : this._clip && (e = this._clip.nativeUrl || "");
e && cc.loader.md5Pipe && (e = cc.loader.md5Pipe.transformURL(e));
t.setURL(e);
},
_initSgNode: function() {
var t = this._sgNode;
if (t) {
0;
this._updateVideoSource();
t.seekTo(this.currentTime);
t.setKeepAspectRatioEnabled(this.keepAspectRatio);
t.setFullScreenEnabled(this.isFullscreen);
t.setContentSize(this.node.getContentSize());
this.pause();
t.setEventListener(r.PLAYING, this.onPlaying.bind(this));
t.setEventListener(r.PAUSED, this.onPasued.bind(this));
t.setEventListener(r.STOPPED, this.onStopped.bind(this));
t.setEventListener(r.COMPLETED, this.onCompleted.bind(this));
t.setEventListener(r.META_LOADED, this.onMetaLoaded.bind(this));
t.setEventListener(r.CLICKED, this.onClicked.bind(this));
t.setEventListener(r.READY_TO_PLAY, this.onReadyToPlay.bind(this));
}
},
onReadyToPlay: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.READY_TO_PLAY);
this.node.emit("ready-to-play", this);
},
onMetaLoaded: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.META_LOADED);
this.node.emit("meta-loaded", this);
},
onClicked: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.CLICKED);
this.node.emit("clicked", this);
},
onPlaying: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.PLAYING);
this.node.emit("playing", this);
},
onPasued: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.PAUSED);
this.node.emit("paused", this);
},
onStopped: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.STOPPED);
this.node.emit("stopped", this);
},
onCompleted: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.COMPLETED);
this.node.emit("completed", this);
},
play: function() {
if (this._sgNode) {
this._syncVolume();
this._sgNode.play();
}
},
resume: function() {
if (this._sgNode) {
this._syncVolume();
this._sgNode.resume();
}
},
pause: function() {
this._sgNode && this._sgNode.pause();
},
stop: function() {
this._sgNode && this._sgNode.stop();
},
getDuration: function() {
return this._sgNode ? this._sgNode.duration() : -1;
},
isPlaying: function() {
return !!this._sgNode && this._sgNode.isPlaying();
}
});
cc.VideoPlayer = n.exports = c;
}), {
"../videoplayer/CCSGVideoPlayer": 1
} ],
71: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.ViewGroup",
extends: t("./CCComponent")
});
cc.ViewGroup = e.exports = n;
}), {
"./CCComponent": 47
} ],
72: [ (function(t, e, i) {
t("../webview/CCSGWebView");
var n = _ccsg.WebView.EventType;
function o() {}
var r = cc.Class({
name: "cc.WebView",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_useOriginalSize: !0,
_url: "",
url: {
type: String,
tooltip: !1,
get: function() {
return this._url;
},
set: function(t) {
this._url = t;
var e = this._sgNode;
e && e.loadURL(t);
}
},
webviewEvents: {
default: [],
type: cc.Component.EventHandler
}
},
statics: {
EventType: n
},
onLoad: function() {
cc.sys.os !== cc.sys.OS_OSX && cc.sys.os !== cc.sys.OS_WINDOWS || (this.enabled = !1);
},
_createSgNode: function() {
if (cc.sys.os === cc.sys.OS_OSX || cc.sys.os === cc.sys.OS_WINDOWS) {
console.log("WebView is not supported on Mac and Windows!");
return null;
}
return new _ccsg.WebView();
},
_initSgNode: function() {
var t = this._sgNode;
if (t) {
0;
t.loadURL(this._url);
t.setContentSize(this.node.getContentSize());
}
},
onEnable: function() {
this._super();
var t = this._sgNode;
t.setEventListener(n.LOADED, this._onWebViewLoaded.bind(this));
t.setEventListener(n.LOADING, this._onWebViewLoading.bind(this));
t.setEventListener(n.ERROR, this._onWebViewLoadError.bind(this));
},
onDisable: function() {
this._super();
var t = this._sgNode;
t.setEventListener(n.LOADED, o);
t.setEventListener(n.LOADING, o);
t.setEventListener(n.ERROR, o);
},
_onWebViewLoaded: function() {
cc.Component.EventHandler.emitEvents(this.webviewEvents, this, n.LOADED);
this.node.emit("loaded", this);
},
_onWebViewLoading: function() {
cc.Component.EventHandler.emitEvents(this.webviewEvents, this, n.LOADING);
this.node.emit("loading", this);
return !0;
},
_onWebViewLoadError: function() {
cc.Component.EventHandler.emitEvents(this.webviewEvents, this, n.ERROR);
this.node.emit("error", this);
},
setJavascriptInterfaceScheme: function(t) {
this._sgNode && this._sgNode.setJavascriptInterfaceScheme(t);
},
setOnJSCallback: function(t) {
this._sgNode && this._sgNode.setOnJSCallback(t);
},
evaluateJS: function(t) {
this._sgNode && this._sgNode.evaluateJS(t);
}
});
cc.WebView = e.exports = r;
}), {
"../webview/CCSGWebView": 1
} ],
73: [ (function(t, e, i) {
var n = t("../base-ui/CCWidgetManager"), o = n.AlignMode, r = n._AlignFlags, s = r.TOP, c = r.MID, a = r.BOT, l = r.LEFT, h = r.CENTER, u = r.RIGHT, d = s | a, f = l | u, _ = cc.Class({
name: "cc.Widget",
extends: t("./CCComponent"),
editor: !1,
properties: {
target: {
get: function() {
return this._target;
},
set: function(t) {
this._target = t;
0;
},
type: cc.Node,
tooltip: !1
},
isAlignTop: {
get: function() {
return (this._alignFlags & s) > 0;
},
set: function(t) {
this._setAlign(s, t);
},
animatable: !1,
tooltip: !1
},
isAlignVerticalCenter: {
get: function() {
return (this._alignFlags & c) > 0;
},
set: function(t) {
if (t) {
this.isAlignTop = !1;
this.isAlignBottom = !1;
this._alignFlags |= c;
} else this._alignFlags &= ~c;
},
animatable: !1,
tooltip: !1
},
isAlignBottom: {
get: function() {
return (this._alignFlags & a) > 0;
},
set: function(t) {
this._setAlign(a, t);
},
animatable: !1,
tooltip: !1
},
isAlignLeft: {
get: function() {
return (this._alignFlags & l) > 0;
},
set: function(t) {
this._setAlign(l, t);
},
animatable: !1,
tooltip: !1
},
isAlignHorizontalCenter: {
get: function() {
return (this._alignFlags & h) > 0;
},
set: function(t) {
if (t) {
this.isAlignLeft = !1;
this.isAlignRight = !1;
this._alignFlags |= h;
} else this._alignFlags &= ~h;
},
animatable: !1,
tooltip: !1
},
isAlignRight: {
get: function() {
return (this._alignFlags & u) > 0;
},
set: function(t) {
this._setAlign(u, t);
},
animatable: !1,
tooltip: !1
},
isStretchWidth: {
get: function() {
return (this._alignFlags & f) === f;
},
visible: !1
},
isStretchHeight: {
get: function() {
return (this._alignFlags & d) === d;
},
visible: !1
},
top: {
get: function() {
return this._top;
},
set: function(t) {
this._top = t;
},
tooltip: !1
},
bottom: {
get: function() {
return this._bottom;
},
set: function(t) {
this._bottom = t;
},
tooltip: !1
},
left: {
get: function() {
return this._left;
},
set: function(t) {
this._left = t;
},
tooltip: !1
},
right: {
get: function() {
return this._right;
},
set: function(t) {
this._right = t;
},
tooltip: !1
},
horizontalCenter: {
get: function() {
return this._horizontalCenter;
},
set: function(t) {
this._horizontalCenter = t;
},
tooltip: !1
},
verticalCenter: {
get: function() {
return this._verticalCenter;
},
set: function(t) {
this._verticalCenter = t;
},
tooltip: !1
},
isAbsoluteHorizontalCenter: {
get: function() {
return this._isAbsHorizontalCenter;
},
set: function(t) {
this._isAbsHorizontalCenter = t;
},
animatable: !1
},
isAbsoluteVerticalCenter: {
get: function() {
return this._isAbsVerticalCenter;
},
set: function(t) {
this._isAbsVerticalCenter = t;
},
animatable: !1
},
isAbsoluteTop: {
get: function() {
return this._isAbsTop;
},
set: function(t) {
this._isAbsTop = t;
},
animatable: !1
},
isAbsoluteBottom: {
get: function() {
return this._isAbsBottom;
},
set: function(t) {
this._isAbsBottom = t;
},
animatable: !1
},
isAbsoluteLeft: {
get: function() {
return this._isAbsLeft;
},
set: function(t) {
this._isAbsLeft = t;
},
animatable: !1
},
isAbsoluteRight: {
get: function() {
return this._isAbsRight;
},
set: function(t) {
this._isAbsRight = t;
},
animatable: !1
},
alignMode: {
default: o.ON_WINDOW_RESIZE,
type: o,
tooltip: !1
},
_wasAlignOnce: {
default: void 0,
formerlySerializedAs: "isAlignOnce"
},
_target: null,
_alignFlags: 0,
_left: 0,
_right: 0,
_top: 0,
_bottom: 0,
_verticalCenter: 0,
_horizontalCenter: 0,
_isAbsLeft: !0,
_isAbsRight: !0,
_isAbsTop: !0,
_isAbsBottom: !0,
_isAbsHorizontalCenter: !0,
_isAbsVerticalCenter: !0,
_originalWidth: 0,
_originalHeight: 0
},
statics: {
AlignMode: o
},
onLoad: function() {
if (void 0 !== this._wasAlignOnce) {
this.alignMode = this._wasAlignOnce ? o.ONCE : o.ALWAYS;
this._wasAlignOnce = void 0;
}
},
onEnable: function() {
n.add(this);
},
onDisable: function() {
n.remove(this);
},
_setAlign: function(t, e) {
if (e != (this._alignFlags & t) > 0) {
var i = (t & f) > 0;
if (e) {
this._alignFlags |= t;
if (i) {
this.isAlignHorizontalCenter = !1;
if (this.isStretchWidth) {
this._originalWidth = this.node.width;
0;
}
} else {
this.isAlignVerticalCenter = !1;
if (this.isStretchHeight) {
this._originalHeight = this.node.height;
0;
}
}
0;
} else {
i ? this.isStretchWidth && (this.node.width = this._originalWidth) : this.isStretchHeight && (this.node.height = this._originalHeight);
this._alignFlags &= ~t;
}
}
},
updateAlignment: function() {
n.updateAlignment(this.node);
}
});
Object.defineProperty(_.prototype, "isAlignOnce", {
get: function() {
0;
return this.alignMode === o.ONCE;
},
set: function(t) {
0;
this.alignMode = t ? o.ONCE : o.ALWAYS;
}
});
cc.Widget = e.exports = _;
}), {
"../base-ui/CCWidgetManager": 31,
"./CCComponent": 47
} ],
74: [ (function(t, e, i) {
t("./CCComponent");
t("./CCRendererInSG");
t("./CCRendererUnderSG");
t("./CCComponentEventHandler");
t("./missing-script");
e.exports = [ t("./CCSprite"), t("./CCWidget"), t("./CCCanvas"), t("./CCAudioSource"), t("./CCAnimation"), t("./CCButton"), t("./CCLabel"), t("./CCProgressBar"), t("./CCMask"), t("./CCScrollBar"), t("./CCScrollView"), t("./CCPageViewIndicator"), t("./CCPageView"), t("./CCSlider"), t("./CCLayout"), t("./CCEditBox"), t("./CCVideoPlayer"), t("./CCWebView"), t("./CCSpriteDistortion"), t("./CCLabelOutline"), t("./CCRichText"), t("./CCToggleContainer"), t("./CCToggleGroup"), t("./CCToggle"), t("./CCBlockInputEvents") ];
}), {
"./CCAnimation": 42,
"./CCAudioSource": 43,
"./CCBlockInputEvents": 44,
"./CCButton": 45,
"./CCCanvas": 46,
"./CCComponent": 47,
"./CCComponentEventHandler": 48,
"./CCEditBox": 49,
"./CCLabel": 50,
"./CCLabelOutline": 51,
"./CCLayout": 52,
"./CCMask": 53,
"./CCPageView": 54,
"./CCPageViewIndicator": 55,
"./CCProgressBar": 56,
"./CCRendererInSG": 57,
"./CCRendererUnderSG": 58,
"./CCRichText": 59,
"./CCScrollBar": 61,
"./CCScrollView": 62,
"./CCSlider": 63,
"./CCSprite": 64,
"./CCSpriteDistortion": 65,
"./CCToggle": 67,
"./CCToggleContainer": 68,
"./CCToggleGroup": 69,
"./CCVideoPlayer": 70,
"./CCWebView": 72,
"./CCWidget": 73,
"./missing-script": 75
} ],
75: [ (function(t, e, i) {
var n = cc.js, o = t("../utils/misc").BUILTIN_CLASSID_RE, r = cc.Class({
name: "cc.MissingClass",
properties: {
_$erialized: {
default: null,
visible: !1,
editorOnly: !0
}
}
}), s = cc.Class({
name: "cc.MissingScript",
extends: cc.Component,
editor: {
inspector: "packages://inspector/inspectors/comps/missing-script.js"
},
properties: {
compiled: {
default: !1,
serializable: !1
},
_$erialized: {
default: null,
visible: !1,
editorOnly: !0
}
},
ctor: !1,
statics: {
safeFindClass: function(t, e) {
var i = n._getClassById(t);
if (i) return i;
if (t) {
cc.deserialize.reportMissingClass(t);
return s.getMissingWrapper(t, e);
}
return null;
},
getMissingWrapper: function(t, e) {
return e.node && (/^[0-9a-zA-Z+/]{23}$/.test(t) || o.test(t)) ? s : r;
}
},
onLoad: function() {
cc.warnID(4600, this.node.name);
}
});
cc._MissingScript = e.exports = s;
}), {
"../utils/misc": 155
} ],
76: [ (function(t, e, i) {
var n = cc.js;
t("../event/event");
var o = function(t, e) {
cc.Event.call(this, cc.Event.MOUSE, e);
this._eventType = t;
this._button = 0;
this._x = 0;
this._y = 0;
this._prevX = 0;
this._prevY = 0;
this._scrollX = 0;
this._scrollY = 0;
};
n.extend(o, cc.Event);
var r = o.prototype;
r.setScrollData = function(t, e) {
this._scrollX = t;
this._scrollY = e;
};
r.getScrollX = function() {
return this._scrollX;
};
r.getScrollY = function() {
return this._scrollY;
};
r.setLocation = function(t, e) {
this._x = t;
this._y = e;
};
r.getLocation = function() {
return cc.v2(this._x, this._y);
};
r.getLocationInView = function() {
return cc.v2(this._x, cc.view._designResolutionSize.height - this._y);
};
r._setPrevCursor = function(t, e) {
this._prevX = t;
this._prevY = e;
};
r.getPreviousLocation = function() {
return cc.v2(this._prevX, this._prevY);
};
r.getDelta = function() {
return cc.v2(this._x - this._prevX, this._y - this._prevY);
};
r.getDeltaX = function() {
return this._x - this._prevX;
};
r.getDeltaY = function() {
return this._y - this._prevY;
};
r.setButton = function(t) {
this._button = t;
};
r.getButton = function() {
return this._button;
};
r.getLocationX = function() {
return this._x;
};
r.getLocationY = function() {
return this._y;
};
o.NONE = 0;
o.DOWN = 1;
o.UP = 2;
o.MOVE = 3;
o.SCROLL = 4;
o.BUTTON_LEFT = 0;
o.BUTTON_RIGHT = 2;
o.BUTTON_MIDDLE = 1;
o.BUTTON_4 = 3;
o.BUTTON_5 = 4;
o.BUTTON_6 = 5;
o.BUTTON_7 = 6;
o.BUTTON_8 = 7;
var s = function(t, e) {
cc.Event.call(this, cc.Event.TOUCH, e);
this._eventCode = 0;
this._touches = t || [];
this.touch = null;
this.currentTouch = null;
};
n.extend(s, cc.Event);
(r = s.prototype).getEventCode = function() {
return this._eventCode;
};
r.getTouches = function() {
return this._touches;
};
r._setEventCode = function(t) {
this._eventCode = t;
};
r._setTouches = function(t) {
this._touches = t;
};
r.setLocation = function(t, e) {
this.touch && this.touch.setTouchInfo(this.touch.getID(), t, e);
};
r.getLocation = function() {
return this.touch ? this.touch.getLocation() : cc.v2();
};
r.getLocationInView = function() {
return this.touch ? this.touch.getLocationInView() : cc.v2();
};
r.getPreviousLocation = function() {
return this.touch ? this.touch.getPreviousLocation() : cc.v2();
};
r.getStartLocation = function() {
return this.touch ? this.touch.getStartLocation() : cc.v2();
};
r.getID = function() {
return this.touch ? this.touch.getID() : null;
};
r.getDelta = function() {
return this.touch ? this.touch.getDelta() : cc.v2();
};
r.getDeltaX = function() {
return this.touch ? this.touch.getDelta().x : 0;
};
r.getDeltaY = function() {
return this.touch ? this.touch.getDelta().y : 0;
};
r.getLocationX = function() {
return this.touch ? this.touch.getLocationX() : 0;
};
r.getLocationY = function() {
return this.touch ? this.touch.getLocationY() : 0;
};
s.MAX_TOUCHES = 5;
s.BEGAN = 0;
s.MOVED = 1;
s.ENDED = 2;
s.CANCELED = 3;
var c = function(t, e) {
cc.Event.call(this, cc.Event.ACCELERATION, e);
this.acc = t;
};
n.extend(c, cc.Event);
var a = function(t, e, i) {
cc.Event.call(this, cc.Event.KEYBOARD, i);
this.keyCode = t;
this.isPressed = e;
};
n.extend(a, cc.Event);
cc.Event.EventMouse = o;
cc.Event.EventTouch = s;
cc.Event.EventAcceleration = c;
cc.Event.EventKeyboard = a;
e.exports = cc.Event;
}), {
"../event/event": 80
} ],
77: [ (function(t, e, i) {
t("./CCEvent");
var n;
n = cc.eventManager;
e.exports = n;
0;
}), {
"./CCEvent": 76,
"./CCEventListener": 1,
"./CCEventManager": 1,
"./CCTouch": 1
} ],
78: [ (function(t, e, i) {
var n = cc.js, o = t("../platform/callbacks-invoker").CallbacksHandler;
function r() {
o.call(this);
}
n.extend(r, o);
r.prototype.invoke = function(t, e) {
var i = t.type, n = this._callbackTable[i];
if (n) {
var o = !n.isInvoking;
n.isInvoking = !0;
for (var r = n.callbacks, s = n.targets, c = 0, a = r.length; c < a; ++c) {
var l = r[c];
if (l) {
var h = s[c] || t.currentTarget;
l.call(h, t, e);
if (t._propagationImmediateStopped) break;
}
}
if (o) {
n.isInvoking = !1;
n.containCanceled && n.purgeCanceled();
}
}
};
e.exports = r;
0;
}), {
"../platform/callbacks-invoker": 136
} ],
79: [ (function(i, n, o) {
var r = i("./event-listeners");
i("./event");
var s = cc.js.array.fastRemove, c = new Array(16);
c.length = 0;
function a() {
this._capturingListeners = null;
this._bubblingListeners = null;
this._hasListenerCache = null;
}
var l = a.prototype;
l._addEventFlag = function(t, e, i) {
var n = this._hasListenerCache;
n || (n = this._hasListenerCache = cc.js.createMap());
void 0 === n[t] && (n[t] = 0);
var o = i ? 2 : 4;
n[t] |= o;
};
l._purgeEventFlag = function(t, e, i) {
var n = this._hasListenerCache;
if (n && !e.has(t)) {
var o = i ? 2 : 4;
n[t] &= ~o;
0 === n[t] && delete n[t];
}
};
l._resetFlagForTarget = function(t, e, i) {
var n = this._hasListenerCache;
if (n) {
var o = i ? 2 : 4;
for (var r in n) if (!e.has(r)) {
n[r] &= ~o;
0 === n[r] && delete n[r];
}
}
};
l.hasEventListener = function(t, e) {
var i = this._hasListenerCache;
if (!i) return !1;
var n = e ? 2 : 4;
return (i[t] & n) > 0;
};
l.on = function(i, n, o, s) {
if ("boolean" === ("object" === (e = typeof o) ? t(o) : e)) {
s = o;
o = void 0;
} else s = !!s;
if (n) {
var c = null;
if (!(c = s ? this._capturingListeners = this._capturingListeners || new r() : this._bubblingListeners = this._bubblingListeners || new r()).has(i, n, o)) {
c.add(i, n, o);
o && o.__eventTargets && o.__eventTargets.push(this);
this._addEventFlag(i, c, s);
}
return n;
}
cc.errorID(6800);
};
l.off = function(i, n, o, r) {
if ("boolean" === ("object" === (e = typeof o) ? t(o) : e)) {
r = o;
o = void 0;
} else r = !!r;
if (n) {
var c = r ? this._capturingListeners : this._bubblingListeners;
if (c) {
c.remove(i, n, o);
o && o.__eventTargets && s(o.__eventTargets, this);
this._purgeEventFlag(i, c, r);
}
} else {
this._capturingListeners && this._capturingListeners.removeAll(i);
this._bubblingListeners && this._bubblingListeners.removeAll(i);
this._hasListenerCache && delete this._hasListenerCache[i];
}
};
l.targetOff = function(t) {
if (this._capturingListeners) {
this._capturingListeners.removeAll(t);
this._resetFlagForTarget(t, this._capturingListeners, !0);
}
if (this._bubblingListeners) {
this._bubblingListeners.removeAll(t);
this._resetFlagForTarget(t, this._bubblingListeners, !1);
}
};
l.once = function(t, e, i, n) {
var o = "__ONCE_FLAG:" + t, r = n ? this._capturingListeners : this._bubblingListeners;
if (!(r && r.has(o, e, i))) {
var s = this, c = function(a) {
s.off(t, c, i, n);
r.remove(o, e, i);
e.call(this, a);
};
this.on(t, c, i, n);
r || (r = n ? this._capturingListeners : this._bubblingListeners);
r.add(o, e, i);
}
};
l.dispatchEvent = function(t) {
(function(t, e) {
var i, n;
e.target = t;
c.length = 0;
t._getCapturingTargets(e.type, c);
e.eventPhase = 1;
for (n = c.length - 1; n >= 0; --n) if ((i = c[n])._isTargetActive(e.type) && i._capturingListeners) {
e.currentTarget = i;
i._capturingListeners.invoke(e, c);
if (e._propagationStopped) {
c.length = 0;
return;
}
}
c.length = 0;
if (t._isTargetActive(e.type)) {
e.eventPhase = 2;
e.currentTarget = t;
t._capturingListeners && t._capturingListeners.invoke(e);
!e._propagationImmediateStopped && t._bubblingListeners && t._bubblingListeners.invoke(e);
}
if (!e._propagationStopped && e.bubbles) {
t._getBubblingTargets(e.type, c);
e.eventPhase = 3;
for (n = 0; n < c.length; ++n) if ((i = c[n])._isTargetActive(e.type) && i._bubblingListeners) {
e.currentTarget = i;
i._bubblingListeners.invoke(e);
if (e._propagationStopped) {
c.length = 0;
return;
}
}
}
c.length = 0;
})(this, t);
c.length = 0;
};
l.emit = function(t, e) {
0;
var i = this._hasListenerCache;
if (i) {
var n = i[t];
if (n) {
var o = cc.Event.EventCustom.get(t);
o.detail = e;
o.eventPhase = 2;
o.target = o.currentTarget = this;
var r = this._capturingListeners;
r && 2 & n && r.invoke(o);
var s = this._bubblingListeners;
s && 4 & n && !o._propagationImmediateStopped && s.invoke(o);
o.detail = null;
cc.Event.EventCustom.put(o);
}
}
};
l._isTargetActive = function(t) {
return !0;
};
l._getCapturingTargets = function(t, e) {};
l._getBubblingTargets = function(t, e) {};
a.prototype._EventTargetOn = a.prototype.on;
a.prototype._EventTargetOnce = a.prototype.once;
a.prototype._EventTargetOff = a.prototype.off;
a.prototype._EventTargetTargetOff = a.prototype.targetOff;
cc.EventTarget = n.exports = a;
}), {
"./event": 80,
"./event-listeners": 78
} ],
80: [ (function(t, e, i) {
var n = t("../platform/js");
cc.Event = function(t, e) {
this.type = t;
this.bubbles = !!e;
this.target = null;
this.currentTarget = null;
this.eventPhase = 0;
this._propagationStopped = !1;
this._propagationImmediateStopped = !1;
};
cc.Event.prototype = {
constructor: cc.Event,
unuse: function() {
this.type = cc.Event.NO_TYPE;
this.target = null;
this.currentTarget = null;
this.eventPhase = cc.Event.NONE;
this._propagationStopped = !1;
this._propagationImmediateStopped = !1;
},
reuse: function(t, e) {
this.type = t;
this.bubbles = e || !1;
},
stopPropagation: function() {
this._propagationStopped = !0;
},
stopPropagationImmediate: function() {
this._propagationImmediateStopped = !0;
},
isStopped: function() {
return this._propagationStopped || this._propagationImmediateStopped;
},
getCurrentTarget: function() {
return this.currentTarget;
},
getType: function() {
return this.type;
}
};
cc.Event.NO_TYPE = "no_type";
cc.Event.TOUCH = "touch";
cc.Event.MOUSE = "mouse";
cc.Event.KEYBOARD = "keyboard";
cc.Event.ACCELERATION = "acceleration";
cc.Event.NONE = 0;
cc.Event.CAPTURING_PHASE = 1;
cc.Event.AT_TARGET = 2;
cc.Event.BUBBLING_PHASE = 3;
var o = function(t, e) {
cc.Event.call(this, t, e);
this.detail = null;
};
n.extend(o, cc.Event);
o.prototype.reset = o;
o.prototype.setUserData = function(t) {
this.detail = t;
};
o.prototype.getUserData = function() {
return this.detail;
};
o.prototype.getEventName = cc.Event.prototype.getType;
var r = new n.Pool(10);
o.put = function(t) {
r.put(t);
};
o.get = function(t, e) {
var i = r._get();
i ? i.reset(t, e) : i = new o(t, e);
return i;
};
cc.Event.EventCustom = o;
e.exports = cc.Event;
}), {
"../platform/js": 143
} ],
81: [ (function(t, e, i) {
t("./event");
t("./event-listeners");
t("./event-target");
t("./system-event");
}), {
"./event": 80,
"./event-listeners": 78,
"./event-target": 79,
"./system-event": 82
} ],
82: [ (function(t, e, i) {
var n, o = t("../event/event-target"), r = t("../event-manager");
n = cc.inputManager;
var s = cc.Enum({
KEY_DOWN: "keydown",
KEY_UP: "keyup",
DEVICEMOTION: "devicemotion"
}), c = null, a = null, l = 0, h = cc.Class({
name: "SystemEvent",
extends: o,
statics: {
EventType: s
},
setAccelerometerEnabled: function(t) {
n.setAccelerometerEnabled(t);
},
setAccelerometerInterval: function(t) {
n.setAccelerometerInterval(t);
},
on: function(t, e, i, n) {
this._super(t, e, i, n);
if (t === s.KEY_DOWN || t === s.KEY_UP) {
c || (c = cc.EventListener.create({
event: cc.EventListener.KEYBOARD,
onKeyPressed: function(t, e) {
e.type = s.KEY_DOWN;
e.keyCode = t;
e.isPressed = !0;
cc.systemEvent.dispatchEvent(e);
},
onKeyReleased: function(t, e) {
e.type = s.KEY_UP;
e.keyCode = t;
e.isPressed = !1;
cc.systemEvent.dispatchEvent(e);
}
}));
if (!r.hasEventListener(cc._EventListenerKeyboard.LISTENER_ID)) {
var o = cc.director.getTotalFrames();
if (o !== l) {
r.addListener(c, 1);
l = o;
}
}
}
if (t === s.DEVICEMOTION) {
a || (a = cc.EventListener.create({
event: cc.EventListener.ACCELERATION,
callback: function(t, e) {
e.type = s.DEVICEMOTION;
e.acc = t;
cc.systemEvent.dispatchEvent(e);
}
}));
r.hasEventListener(cc._EventListenerAcceleration.LISTENER_ID) || r.addListener(a, 1);
}
},
off: function(t, e, i, n) {
this._super(t, e, i, n);
if (c && (t === s.KEY_DOWN || t === s.KEY_UP)) {
var o = this.hasEventListener(s.KEY_DOWN), l = this.hasEventListener(s.KEY_UP);
o || l || r.removeListener(c);
}
a && t === s.DEVICEMOTION && r.removeListener(a);
}
});
cc.SystemEvent = e.exports = h;
cc.systemEvent = new cc.SystemEvent();
}), {
"../event-manager": 77,
"../event/event-target": 79,
"../platform/CCInputManager": 1
} ],
83: [ (function(t, e, i) {
var n = t("./types").LineCap, o = t("./types").LineJoin, r = cc.Class({
name: "cc.Graphics",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_lineWidth: 1,
_strokeColor: cc.Color.BLACK,
_lineJoin: o.MITER,
_lineCap: n.BUTT,
_fillColor: cc.Color.WHITE,
_miterLimit: 10,
lineWidth: {
get: function() {
return this._lineWidth;
},
set: function(t) {
this._sgNode.lineWidth = this._lineWidth = t;
}
},
lineJoin: {
get: function() {
return this._lineJoin;
},
set: function(t) {
this._sgNode.lineJoin = this._lineJoin = t;
},
type: o
},
lineCap: {
get: function() {
return this._lineCap;
},
set: function(t) {
this._sgNode.lineCap = this._lineCap = t;
},
type: n
},
strokeColor: {
get: function() {
return this._strokeColor;
},
set: function(t) {
this._sgNode.strokeColor = this._strokeColor = t;
}
},
fillColor: {
get: function() {
return this._fillColor;
},
set: function(t) {
this._sgNode.fillColor = this._fillColor = t;
}
},
miterLimit: {
get: function() {
return this._miterLimit;
},
set: function(t) {
this._sgNode.miterLimit = this._miterLimit = t;
}
}
},
statics: {
LineJoin: o,
LineCap: n
},
_createSgNode: function() {
if (!_ccsg.GraphicsNode) {
var t = new _ccsg.Node(), e = function() {};
[ "moveTo", "lineTo", "bezierCurveTo", "quadraticCurveTo", "arc", "ellipse", "circle", "rect", "roundRect", "fillRect", "clear", "close", "stroke", "fill" ].forEach((function(i) {
t[i] = e;
}));
return t;
}
return new _ccsg.GraphicsNode();
},
_initSgNode: function() {
var t = this._sgNode;
t.lineWidth = this._lineWidth;
t.lineJoin = this._lineJoin;
t.lineCap = this._lineCap;
t.strokeColor = this._strokeColor;
t.fillColor = this._fillColor;
t.miterLimit = this._miterLimit;
t.setContentSize(this.node.getContentSize(!0));
},
moveTo: function(t, e) {
this._sgNode.moveTo(t, e);
},
lineTo: function(t, e) {
this._sgNode.lineTo(t, e);
},
bezierCurveTo: function(t, e, i, n, o, r) {
this._sgNode.bezierCurveTo(t, e, i, n, o, r);
},
quadraticCurveTo: function(t, e, i, n) {
this._sgNode.quadraticCurveTo(t, e, i, n);
},
arc: function(t, e, i, n, o, r) {
r = r || !1;
this._sgNode.arc(t, e, i, n, o, r);
},
ellipse: function(t, e, i, n) {
this._sgNode.ellipse(t, e, i, n);
},
circle: function(t, e, i) {
this._sgNode.circle(t, e, i);
},
rect: function(t, e, i, n) {
this._sgNode.rect(t, e, i, n);
},
roundRect: function(t, e, i, n, o) {
this._sgNode.roundRect(t, e, i, n, o);
},
fillRect: function(t, e, i, n) {
this._sgNode.fillRect(t, e, i, n);
},
clear: function(t) {
this._sgNode.clear(!!t);
},
close: function() {
this._sgNode.close();
},
stroke: function() {
this._sgNode.stroke();
},
fill: function() {
this._sgNode.fill();
}
});
cc.Graphics = e.exports = r;
}), {
"./types": 85
} ],
84: [ (function(t, e, i) {
"use strict";
var n;
if (n = _ccsg.GraphicsNode = cc.GraphicsNode) {
t("../utils/misc").propertyDefine(n, [ "lineWidth", "lineCap", "lineJoin", "miterLimit", "strokeColor", "fillColor" ], {});
}
t("./graphics");
}), {
"../utils/misc": 155,
"./graphics": 83,
"./graphics-node": 1
} ],
85: [ (function(t, e, i) {
"use strict";
var n = cc.Enum({
BUTT: 0,
ROUND: 1,
SQUARE: 2
}), o = cc.Enum({
BEVEL: 0,
ROUND: 1,
MITER: 2
});
e.exports = {
LineCap: n,
LineJoin: o
};
}), {} ],
86: [ (function(t, e, i) {
t("./platform");
t("./assets");
t("./CCNode");
t("./CCScene");
t("./components");
t("./graphics");
t("./collider");
t("./collider/CCIntersection");
t("./physics");
t("./camera/CCCamera");
t("./base-ui/CCWidgetManager");
}), {
"./CCNode": 15,
"./CCScene": 16,
"./assets": 30,
"./base-ui/CCWidgetManager": 31,
"./camera/CCCamera": 32,
"./collider": 40,
"./collider/CCIntersection": 38,
"./components": 74,
"./graphics": 84,
"./physics": 116,
"./platform": 140
} ],
87: [ (function(t, e, i) {
var n = /^(click)(\s)*=/, o = /(\s)*src(\s)*=|(\s)*height(\s)*=|(\s)*width(\s)*=|(\s)*click(\s)*=/;
cc.HtmlTextParser = function() {
this._parsedObject = {};
this._specialSymbolArray = [];
this._specialSymbolArray.push([ /&lt;/g, "<" ]);
this._specialSymbolArray.push([ /&gt;/g, ">" ]);
this._specialSymbolArray.push([ /&amp;/g, "&" ]);
this._specialSymbolArray.push([ /&quot;/g, '"' ]);
this._specialSymbolArray.push([ /&apos;/g, "'" ]);
};
cc.HtmlTextParser.prototype = {
constructor: cc.HtmlTextParser,
parse: function(t) {
this._resultObjectArray = [];
this._stack = [];
for (var e = 0, i = t.length; e < i; ) {
var n = t.indexOf("<", e);
if (n < 0) {
this._stack.pop();
this._processResult(t.substring(e));
e = i;
} else {
this._processResult(t.substring(e, n));
var o = t.indexOf(">", e);
-1 === o ? o = n : "/" === t.charAt(n + 1) ? this._stack.pop() : this._addToStack(t.substring(n + 1, o));
e = o + 1;
}
}
return this._resultObjectArray;
},
_attributeToObject: function(t) {
var e, i, n, r, s = {}, c = (t = t.trim()).match(/^(color|size)(\s)*=/);
if (c) {
e = c[0];
if ("" === (t = t.substring(e.length).trim())) return s;
i = t.indexOf(" ");
switch (e[0]) {
case "c":
s.color = i > -1 ? t.substring(0, i).trim() : t;
break;

case "s":
s.size = parseInt(t);
}
if (i > -1) {
r = t.substring(i + 1).trim();
n = this._processEventHandler(r);
s.event = n;
}
return s;
}
if ((c = t.match(/^(br(\s)*\/)/)) && c[0].length > 0 && (e = c[0].trim()).startsWith("br") && "/" === e[e.length - 1]) {
s.isNewLine = !0;
this._resultObjectArray.push({
text: "",
style: {
newline: !0
}
});
return s;
}
if ((c = t.match(/^(img(\s)*src(\s)*=[^>]+\/)/)) && c[0].length > 0 && (e = c[0].trim()).startsWith("img") && "/" === e[e.length - 1]) {
c = t.match(o);
for (var a, l = !1; c; ) {
e = (t = t.substring(t.indexOf(c[0]))).substr(0, c[0].length);
u = (i = (a = t.substring(e.length).trim()).indexOf(" ")) > -1 ? a.substr(0, i) : a;
e = (e = e.replace(/[^a-zA-Z]/g, "").trim()).toLocaleLowerCase();
t = a.substring(i).trim();
if ("src" === e) {
s.isImage = !0;
u.endsWith("/") && (u = u.substring(0, u.length - 1));
if (0 === u.indexOf("'")) {
l = !0;
u = u.substring(1, u.length - 1);
} else if (0 === u.indexOf('"')) {
l = !0;
u = u.substring(1, u.length - 1);
}
s.src = u;
} else "height" === e ? s.imageHeight = parseInt(u) : "width" === e ? s.imageWidth = parseInt(u) : "click" === e && (s.event = this._processEventHandler(e + "=" + u));
c = t.match(o);
}
l && s.isImage && this._resultObjectArray.push({
text: "",
style: s
});
return {};
}
if (c = t.match(/^(outline(\s)*[^>]*)/)) {
var h = {
color: "#ffffff",
width: 1
};
if (t = c[0].substring("outline".length).trim()) {
var u, d = /(\s)*color(\s)*=|(\s)*width(\s)*=|(\s)*click(\s)*=/;
c = t.match(d);
for (;c; ) {
e = (t = t.substring(t.indexOf(c[0]))).substr(0, c[0].length);
u = (i = (a = t.substring(e.length).trim()).indexOf(" ")) > -1 ? a.substr(0, i) : a;
e = (e = e.replace(/[^a-zA-Z]/g, "").trim()).toLocaleLowerCase();
t = a.substring(i).trim();
"click" === e ? s.event = this._processEventHandler(e + "=" + u) : "color" === e ? h.color = u : "width" === e && (h.width = parseInt(u));
c = t.match(d);
}
}
s.outline = h;
}
if ((c = t.match(/^(on|u|b|i)(\s)*/)) && c[0].length > 0) {
e = c[0];
t = t.substring(e.length).trim();
switch (e[0]) {
case "u":
s.underline = !0;
break;

case "i":
s.italic = !0;
break;

case "b":
s.bold = !0;
}
if ("" === t) return s;
n = this._processEventHandler(t);
s.event = n;
}
return s;
},
_processEventHandler: function(t) {
for (var e = 0, i = {}, o = t.match(n), r = !1; o; ) {
var s = o[0], c = "";
r = !1;
if ('"' === (t = t.substring(s.length).trim()).charAt(0)) {
if ((e = t.indexOf('"', 1)) > -1) {
c = t.substring(1, e).trim();
r = !0;
}
e++;
} else if ("'" === t.charAt(0)) {
if ((e = t.indexOf("'", 1)) > -1) {
c = t.substring(1, e).trim();
r = !0;
}
e++;
} else {
var a = t.match(/(\S)+/);
e = (c = a ? a[0] : "").length;
}
r && (i[s = s.substring(0, s.length - 1).trim()] = c);
o = (t = t.substring(e).trim()).match(n);
}
return i;
},
_addToStack: function(t) {
var e = this._attributeToObject(t);
if (0 === this._stack.length) this._stack.push(e); else {
if (e.isNewLine || e.isImage) return;
var i = this._stack[this._stack.length - 1];
for (var n in i) e[n] || (e[n] = i[n]);
this._stack.push(e);
}
},
_processResult: function(t) {
if ("" !== t) {
t = this._escapeSpecialSymbol(t);
this._stack.length > 0 ? this._resultObjectArray.push({
text: t,
style: this._stack[this._stack.length - 1]
}) : this._resultObjectArray.push({
text: t
});
}
},
_escapeSpecialSymbol: function(t) {
for (var e = 0; e < this._specialSymbolArray.length; ++e) {
var i = this._specialSymbolArray[e][0], n = this._specialSymbolArray[e][1];
t = t.replace(i, n);
}
return t;
}
};
cc.htmlTextParser = new cc.HtmlTextParser();
}), {} ],
88: [ (function(t, e, i) {
var n = function() {
this._status = "unloaded";
this._observers = [];
this._isLoadWithCSS = !1;
};
n.prototype.onLoaded = function() {
this._status = "loaded";
this._observers.forEach((function(t) {
t();
}));
};
n.prototype.isLoaded = function() {
return "loaded" === this._status;
};
n.prototype.addHandler = function(t) {
-1 === this._observers.indexOf(t) && this._observers.push(t);
};
var o = {
_fontCache: {},
_fontWidthCache: {},
_canvasContext: null,
_testString: "BESbswy",
_allFontsLoaded: !1,
_intervalId: 0,
loadTTF: function(t, e) {
var i = this._getFontFamily(t), n = cc.loader.md5Pipe;
n && (t = n.transformURL(t, !0));
var o = cc.sys.browserType !== cc.sys.BROWSER_TYPE_BAIDU && cc.sys.browserType !== cc.sys.BROWSER_TYPE_BAIDU_APP && cc.sys.browserType !== cc.sys.BROWSER_TYPE_MOBILE_QQ;
window.FontFace && o ? this._loadWithFontFace(i, t, e) : this._loadWithCSS(i, t, e);
0 === this._intervalId && (this._intervalId = setInterval(this._checkFontLoaded.bind(this), 100));
},
_checkFontLoaded: function() {
this._allFontsLoaded = !0;
for (var t in this._fontCache) {
var e = this._fontCache[t];
if (!e.isLoaded() && e._isLoadWithCSS) {
var i = this._fontWidthCache[t];
this._canvasContext.font = "40px " + t;
i !== this._canvasContext.measureText(this._testString).width ? e.onLoaded() : this._allFontsLoaded = !1;
}
}
if (this._allFontsLoaded) {
clearInterval(this._intervalId);
this._intervalId = 0;
}
},
_loadWithFontFace: function(t, e, i) {
var o = this._fontCache[t];
if (o) o.isLoaded() || o.addHandler(i); else {
var r = new FontFace(t, "url('" + e + "')");
document.fonts.add(r);
(o = new n()).addHandler(i);
this._fontCache[t] = o;
r.loaded.then((function() {
o.onLoaded();
}));
}
},
_loadWithCSS: function(t, e, i) {
var o = this._fontCache[t];
if (o) o.isLoaded() || o.addHandler(i); else {
var r = document, s = document.createElement("style");
s.type = "text/css";
r.body.appendChild(s);
var c = "";
isNaN(t - 0) ? c += "@font-face { font-family:" + t + "; src:" : c += "@font-face { font-family:'" + t + "'; src:";
c += "url('" + e + "');";
s.textContent = c + "}";
var a = document.createElement("div"), l = a.style;
l.fontFamily = t;
a.innerHTML = ".";
l.position = "absolute";
l.left = "-100px";
l.top = "-100px";
r.body.appendChild(a);
(o = new n()).addHandler(i);
this._fontCache[t] = o;
o._isLoadWithCSS = !0;
if (!this._canvasContext) {
var h = document.createElement("canvas");
h.width = 100;
h.height = 100;
this._canvasContext = h.getContext("2d");
}
var u = "40px " + t;
this._canvasContext.font = u;
var d = this._canvasContext.measureText(this._testString).width;
this._fontWidthCache[t] = d;
var f = this;
s.onload = function() {
setTimeout((function() {
if (!f._allFontsLoaded) {
cc.logID(4004);
o.onLoaded();
cc.director.getScheduler().unschedule(this._checkFontLoaded, this);
}
}), 2e4);
};
}
},
_getFontFamily: function(t) {
var e = t.lastIndexOf(".ttf");
if (-1 === e) return t;
var i = t.lastIndexOf("/");
return -1 === i ? t.substring(0, e) + "_LABEL" : t.substring(i + 1, e) + "_LABEL";
}
};
cc.TextUtils = e.exports = {
label_wordRex: /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûа-яА-ЯЁё]+|\S)/,
label_symbolRex: /^[!,.:;'}\]%\?>、‘“》？。，！]/,
label_lastWordRex: /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]+|\S)$/,
label_lastEnglish: /[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]+$/,
label_firstEnglish: /^[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]/,
label_wrapinspection: !0,
isUnicodeCJK: function(t) {
return /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/.test(t) || /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g.test(t) || /^[\u1100-\u11FF]|[\u3130-\u318F]|[\uA960-\uA97F]|[\uAC00-\uD7AF]|[\uD7B0-\uD7FF]+$/.test(t);
},
isUnicodeSpace: function(t) {
return (t = t.charCodeAt(0)) >= 9 && t <= 13 || 32 === t || 133 === t || 160 === t || 5760 === t || t >= 8192 && t <= 8202 || 8232 === t || 8233 === t || 8239 === t || 8287 === t || 12288 === t;
},
fragmentText: function(t, e, i, n) {
var o = [];
if (0 === t.length || i < 0) {
o.push("");
return o;
}
for (var r = t; e > i && r.length > 1; ) {
for (var s = r.length * (i / e) | 0, c = r.substr(s), a = e - n(c), l = c, h = 0, u = 0; a > i && u++ < 10; ) {
s *= i / a;
s |= 0;
a = e - n(c = r.substr(s));
}
u = 0;
for (;a <= i && u++ < 10; ) {
if (c) {
var d = this.label_wordRex.exec(c);
h = d ? d[0].length : 1;
l = c;
}
s += h;
a = e - n(c = r.substr(s));
}
if (0 == (s -= h)) {
s = 1;
l = l.substr(1);
}
var f, _ = r.substr(0, s);
if (this.label_wrapinspection && this.label_symbolRex.test(l || c)) {
0 == (s -= (f = this.label_lastWordRex.exec(_)) ? f[0].length : 0) && (s = 1);
l = r.substr(s);
_ = r.substr(0, s);
}
if (this.label_firstEnglish.test(l) && (f = this.label_lastEnglish.exec(_)) && _ !== f[0]) {
s -= f[0].length;
l = r.substr(s);
_ = r.substr(0, s);
}
0 === o.length ? o.push(_) : (_ = _.trim()).length > 0 && o.push(_);
e = n(r = l || c);
}
0 === o.length ? o.push(r) : (r = r.trim()).length > 0 && o.push(r);
return o;
}
};
cc.CustomFontLoader = e.exports = o;
}), {} ],
89: [ (function(i, n, o) {
var r = i("../platform/js"), s = i("./pipeline"), c = i("./loading-items"), a = i("./asset-loader"), l = i("./downloader"), h = i("./loader"), u = i("./asset-table"), d = i("../platform/utils").callInNextTick, f = i("./auto-release-utils"), _ = new u();
var p = {
url: null,
raw: !1
};
function g(i) {
var n, o, r;
if ("object" === ("object" === (e = typeof i) ? t(i) : e)) {
o = i;
if (i.url) return o;
n = i.uuid;
} else {
o = {};
n = i;
}
r = o.type ? "uuid" === o.type : cc.AssetLibrary._uuidInSettings(n);
cc.AssetLibrary._getAssetInfoInRuntime(n, p);
o.url = r ? p.url : n;
if (p.url && "uuid" === o.type && p.raw) {
o.type = null;
o.isRawAsset = !0;
} else r || (o.isRawAsset = !0);
return o;
}
var v = [], y = [];
function m() {
var t = new a(), e = new l(), i = new h();
s.call(this, [ t, e, i ]);
this.assetLoader = t;
this.downloader = e;
this.loader = i;
this.onProgress = null;
this._autoReleaseSetting = {};
0;
}
r.extend(m, s);
var C = m.prototype;
C.init = function(t) {};
C.getXMLHttpRequest = function() {
return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP");
};
C.addDownloadHandlers = function(t) {
this.downloader.addHandlers(t);
};
C.addLoadHandlers = function(t) {
this.loader.addHandlers(t);
};
C.load = function(t, e, i) {
0;
if (void 0 === i) {
i = e;
e = this.onProgress || null;
}
var n = this, o = !1;
if (!(t instanceof Array)) {
o = !0;
t = t ? [ t ] : [];
}
v.length = 0;
for (var r = 0; r < t.length; ++r) {
var s = t[r];
if (s && s.id) {
cc.warnID(4920, s.id);
s.uuid || s.url || (s.url = s.id);
}
var a = g(s);
if (a.url || a.uuid) {
var l = this._cache[a.url];
v.push(l || a);
}
}
var h = c.create(this, e, (function(t, e) {
d((function() {
if (i) {
if (o) {
var r = a.url;
i.call(n, e.getError(r), e.getContent(r));
} else i.call(n, t, e);
i = null;
}
e.destroy();
}));
}));
c.initQueueDeps(h);
h.append(v);
v.length = 0;
};
C.flowInDeps = function(t, e, i) {
y.length = 0;
for (var n = 0; n < e.length; ++n) {
var o = g(e[n]);
if (o.url || o.uuid) {
var r = this._cache[o.url];
r ? y.push(r) : y.push(o);
}
}
var s = c.create(this, t ? function(t, e, i) {
this._ownerQueue && this._ownerQueue.onProgress && this._ownerQueue._childOnProgress(i);
} : null, (function(e, n) {
i(e, n);
t && t.deps && (t.deps.length = 0);
n.destroy();
}));
if (t) {
var a = c.getQueue(t);
s._ownerQueue = a._ownerQueue || a;
}
var l = s.append(y, t);
y.length = 0;
return l;
};
C._resources = _;
C._getResUuid = function(t, e, i) {
if (!t) return null;
var n = t.indexOf("?");
-1 !== n && (t = t.substr(0, n));
var o = _.getUuid(t, e);
if (!o) {
var r = cc.path.extname(t);
if (r) {
t = t.slice(0, -r.length);
(o = _.getUuid(t, e)) && !i && cc.warnID(4901, t, r);
}
}
return o;
};
C._getReferenceKey = function(i) {
var n;
"object" === ("object" === (e = typeof i) ? t(i) : e) ? n = i._uuid || null : "string" === ("object" === (e = typeof i) ? t(i) : e) && (n = this._getResUuid(i, null, !0) || i);
if (!n) {
cc.warnID(4800, i);
return n;
}
cc.AssetLibrary._getAssetInfoInRuntime(n, p);
return this._cache[p.url] ? p.url : n;
};
C._urlNotFound = function(t, e, i) {
d((function() {
t = cc.url.normalize(t);
var n = (e ? r.getClassName(e) : "Asset") + ' in "resources/' + t + '" does not exist.';
i && i(new Error(n), []);
}));
};
C._parseLoadResArgs = function(t, e, i) {
if (void 0 === i) {
var n = cc.isChildClassOf(t, cc.RawAsset);
if (e) {
i = e;
n && (e = this.onProgress || null);
} else if (void 0 === e && !n) {
i = t;
e = this.onProgress || null;
t = null;
}
if (void 0 !== e && !n) {
e = t;
t = null;
}
}
return {
type: t,
onProgress: e,
onComplete: i
};
};
C.loadRes = function(t, e, i, n) {
var o = this._parseLoadResArgs(e, i, n);
e = o.type;
i = o.onProgress;
n = o.onComplete;
var r = this, s = r._getResUuid(t, e);
s ? this.load({
type: "uuid",
uuid: s
}, i, (function(t, e) {
e && r.setAutoReleaseRecursively(s, !1);
n && n(t, e);
})) : r._urlNotFound(t, e, n);
};
C._loadResUuids = function(t, e, i, n) {
if (t.length > 0) {
var o = this, r = t.map((function(t) {
return {
type: "uuid",
uuid: t
};
}));
this.load(r, e, (function(t, e) {
if (i) {
for (var s = [], c = n && [], a = 0; a < r.length; ++a) {
var l = r[a].uuid, h = this._getReferenceKey(l), u = e.getContent(h);
if (u) {
o.setAutoReleaseRecursively(l, !1);
s.push(u);
c && c.push(n[a]);
}
}
n ? i(t, s, c) : i(t, s);
}
}));
} else i && d((function() {
n ? i(null, [], []) : i(null, []);
}));
};
C.loadResArray = function(t, e, i, n) {
var o = this._parseLoadResArgs(e, i, n);
e = o.type;
i = o.onProgress;
n = o.onComplete;
for (var r = [], s = 0; s < t.length; s++) {
var c = t[s], a = this._getResUuid(c, e);
if (!a) {
this._urlNotFound(c, e, n);
return;
}
r.push(a);
}
this._loadResUuids(r, i, n);
};
C.loadResDir = function(t, e, i, n) {
var o = this._parseLoadResArgs(e, i, n);
e = o.type;
i = o.onProgress;
n = o.onComplete;
var r = [], s = _.getUuidArray(t, e, r);
this._loadResUuids(s, i, (function(t, e, i) {
for (var o = e.length, r = 0; r < o; ++r) if (e[r] instanceof cc.SpriteAtlas) {
var s = e[r].getSpriteFrames();
for (var c in s) {
var a = s[c];
e.push(a);
i && i.push(i[r] + "/" + a.name);
}
}
n && n(t, e, i);
}), r);
};
C.getRes = function(t, e) {
var i = this._cache[t];
if (!i) {
var n = this._getResUuid(t, e, !0);
if (!n) return null;
var o = this._getReferenceKey(n);
i = this._cache[o];
}
i && i.alias && (i = i.alias);
return i && i.complete ? i.content : null;
};
C.getResCount = function() {
return Object.keys(this._cache).length;
};
C.getDependsRecursively = function(t) {
if (t) {
var e = this._getReferenceKey(t), i = f.getDependsRecursively(e);
i.push(e);
return i;
}
return [];
};
C.release = function(t) {
if (Array.isArray(t)) for (var e = 0; e < t.length; e++) {
var i = t[e];
this.release(i);
} else if (t) {
var n = this._getReferenceKey(t), o = this.getItem(n);
if (o) {
this.removeItem(n);
t = o.content;
if (cc.Class.isInstanceOf(t, cc.Asset)) {
t.nativeUrl && this.release(t.nativeUrl);
t.destroy();
}
0;
}
}
};
C.releaseAsset = function(t) {
var e = t._uuid;
e && this.release(e);
};
C.releaseRes = function(t, e) {
var i = this._getResUuid(t, e);
i ? this.release(i) : cc.errorID(4914, t);
};
C.releaseResDir = function(t, e) {
for (var i = _.getUuidArray(t, e), n = 0; n < i.length; n++) {
var o = i[n];
this.release(o);
}
};
C.releaseAll = function() {
for (var t in this._cache) this.release(t);
};
C.removeItem = function(t) {
var e = s.prototype.removeItem.call(this, t);
delete this._autoReleaseSetting[t];
return e;
};
C.setAutoRelease = function(t, e) {
var i = this._getReferenceKey(t);
i && (this._autoReleaseSetting[i] = !!e);
};
C.setAutoReleaseRecursively = function(t, e) {
e = !!e;
var i = this._getReferenceKey(t);
if (i) {
this._autoReleaseSetting[i] = e;
for (var n = f.getDependsRecursively(i), o = 0; o < n.length; o++) {
var r = n[o];
this._autoReleaseSetting[r] = e;
}
} else 0;
};
C.isAutoRelease = function(t) {
var e = this._getReferenceKey(t);
return !!e && !!this._autoReleaseSetting[e];
};
cc.loader = new m();
0;
n.exports = cc.loader;
}), {
"../platform/js": 143,
"../platform/utils": 147,
"./asset-loader": 90,
"./asset-table": 91,
"./auto-release-utils": 92,
"./downloader": 93,
"./loader": 95,
"./loading-items": 96,
"./pipeline": 99,
"./released-asset-checker": 100
} ],
90: [ (function(t, e, i) {
var n = t("../utils/CCPath"), o = t("./pipeline"), r = t("./loading-items"), s = "AssetLoader", c = function(t) {
this.id = s;
this.async = !0;
this.pipeline = null;
};
c.ID = s;
var a = [];
c.prototype.handle = function(t, e) {
var i = t.uuid;
if (!i) return t.content ? t.content : null;
cc.AssetLibrary.queryAssetInfo(i, (function(o, s, c) {
if (o) e(o); else {
t.url = t.rawUrl = s;
t.isRawAsset = c;
if (c) {
var l = n.extname(s).toLowerCase();
if (!l) {
e(new Error(cc._getError(4931, i, s)));
return;
}
l = l.substr(1);
var h = r.getQueue(t);
a[0] = {
queueId: t.queueId,
id: s,
url: s,
type: l,
error: null,
alias: t,
complete: !0
};
0;
h.append(a);
t.type = l;
e(null, t.content);
} else {
t.type = "uuid";
e(null, t.content);
}
}
}));
};
o.AssetLoader = e.exports = c;
}), {
"../utils/CCPath": 150,
"./loading-items": 96,
"./pipeline": 99
} ],
91: [ (function(t, e, i) {
var n = t("../utils/misc").pushToMap;
function o() {
this._pathToUuid = {};
}
function r(t, e) {
if (t.length > e.length) {
var i = t.charCodeAt(e.length);
return 46 === i || 47 === i;
}
return !0;
}
var s = o.prototype;
s.getUuid = function(t, e) {
t = cc.url.normalize(t);
var i = this._pathToUuid[t];
if (i) if (Array.isArray(i)) {
if (!e) return i[0].uuid;
for (var n = 0; n < i.length; n++) {
var o = i[n];
if (cc.isChildClassOf(o.type, e)) return o.uuid;
}
} else {
if (!e || cc.isChildClassOf(i.type, e)) return i.uuid;
0;
}
return "";
};
s.getUuidArray = function(t, e, i) {
"/" === (t = cc.url.normalize(t))[t.length - 1] && (t = t.slice(0, -1));
var n = this._pathToUuid, o = [], s = cc.isChildClassOf;
for (var c in n) if (c.startsWith(t) && r(c, t) || !t) {
var a = n[c];
if (Array.isArray(a)) for (var l = 0; l < a.length; l++) {
var h = a[l];
if (!e || s(h.type, e)) {
o.push(h.uuid);
i && i.push(c);
} else 0;
} else if (!e || s(a.type, e)) {
o.push(a.uuid);
i && i.push(c);
} else 0;
}
0;
return o;
};
s.add = function(t, e, i, o) {
t = t.substring(0, t.length - cc.path.extname(t).length);
var r = new function(t, e) {
this.uuid = t;
this.type = e;
}(e, i);
n(this._pathToUuid, t, r, o);
};
s._getInfo_DEBUG = !1;
s.reset = function() {
this._pathToUuid = {};
};
e.exports = o;
}), {
"../utils/misc": 155
} ],
92: [ (function(i, n, o) {
var r = i("../platform/js");
function s(t, e) {
var i = cc.loader.getItem(t);
if (i) {
var n = i.dependKeys;
if (n) for (var o = 0; o < n.length; o++) {
var r = n[o];
if (!e[r]) {
e[r] = !0;
s(r, e);
}
}
}
}
function c(t, e) {
var i = cc.loader._getReferenceKey(t);
if (!e[i]) {
e[i] = !0;
s(i, e);
}
}
function a(i, n) {
for (var o = Object.getOwnPropertyNames(i), r = 0; r < o.length; r++) {
var s = i[o[r]];
if ("object" === ("object" === (e = typeof s) ? t(s) : e) && s) if (Array.isArray(s)) for (var a = 0; a < s.length; a++) {
var l = s[a];
cc.Class.isInstanceOf(l, cc.RawAsset) && c(l, n);
} else if (s.constructor && s.constructor !== Object) cc.Class.isInstanceOf(s, cc.RawAsset) && c(s, n); else for (var h = Object.getOwnPropertyNames(s), u = 0; u < h.length; u++) {
var d = s[h[u]];
cc.Class.isInstanceOf(d, cc.RawAsset) && c(d, n);
}
}
}
function l(t, e) {
for (var i = 0; i < t._components.length; i++) a(t._components[i], e);
for (var n = 0; n < t._children.length; n++) l(t._children[n], e);
}
n.exports = {
autoRelease: function(t, e, i) {
var n = cc.loader._autoReleaseSetting, o = r.createMap();
if (e) for (var s = 0; s < e.length; s++) o[e[s]] = !0;
for (var c = 0; c < i.length; c++) l(i[c], o);
if (t) for (var a = 0; a < t.length; a++) {
var h = t[a];
!1 === n[h] || o[h] || cc.loader.release(h);
}
for (var u = Object.keys(n), d = 0; d < u.length; d++) {
var f = u[d];
!0 !== n[f] || o[f] || cc.loader.release(f);
}
},
getDependsRecursively: function(t) {
var e = {};
s(t, e);
return Object.keys(e);
}
};
}), {
"../platform/js": 143
} ],
93: [ (function(t, e, i) {
var n, o = t("../platform/js"), r = t("../platform/CCSys"), s = t("../utils/CCPath"), c = t("../utils/misc"), a = t("./pipeline"), l = t("./pack-downloader"), h = t("./text-downloader"), u = t("./utils").urlAppendTimestamp;
function d(e, i, n) {
if (r.platform !== r.WECHAT_GAME) {
var o = e.url, s = document, c = document.createElement("script");
c.async = n;
c.src = u(o);
c.addEventListener("load", a, !1);
c.addEventListener("error", l, !1);
s.body.appendChild(c);
} else {
t(e.url);
i(null, e.url);
}
function a() {
c.parentNode.removeChild(c);
c.removeEventListener("load", a, !1);
c.removeEventListener("error", l, !1);
i(null, o);
}
function l() {
c.parentNode.removeChild(c);
c.removeEventListener("load", a, !1);
c.removeEventListener("error", l, !1);
i(new Error(cc._getError(4928, o)));
}
}
function f(t, e, i, n) {
void 0 === i && (i = !0);
var o = u(t.url);
n = n || c.imagePool.get();
i && "file:" !== window.location.protocol ? n.crossOrigin = "anonymous" : n.crossOrigin = null;
if (n.complete && n.naturalWidth > 0 && n.src === o) return n;
(function() {
function i() {
n.removeEventListener("load", i);
n.removeEventListener("error", r);
e(null, n);
}
function r() {
n.removeEventListener("load", i);
n.removeEventListener("error", r);
"https:" !== window.location.protocol && n.crossOrigin && "anonymous" === n.crossOrigin.toLowerCase() ? f(t, e, !1, n) : e(new Error(cc._getError(4930, o)));
}
n.addEventListener("load", i);
n.addEventListener("error", r);
n.src = o;
})();
}
var _ = {
".eot": "embedded-opentype",
".ttf": "truetype",
".ttc": "truetype",
".woff": "woff",
".svg": "svg"
};
function p(t, e, i) {
var n = document, o = document.createElement("style");
o.type = "text/css";
n.body.appendChild(o);
var r = "";
isNaN(t - 0) ? r += "@font-face { font-family:" + t + "; src:" : r += "@font-face { font-family:'" + t + "'; src:";
if (e instanceof Array) for (var c = 0, a = e.length; c < a; c++) {
var l = e[c];
i = s.extname(l).toLowerCase();
r += "url('" + e[c] + "') format('" + _[i] + "')";
r += c === a - 1 ? ";" : ",";
} else {
i = i.toLowerCase();
r += "url('" + e + "') format('" + _[i] + "');";
}
o.textContent += r + "}";
var h = document.createElement("div"), u = h.style;
u.fontFamily = t;
h.innerHTML = ".";
u.position = "absolute";
u.left = "-100px";
u.top = "-100px";
n.body.appendChild(h);
}
function g(t, e) {
var i = t.url, n = t.type, o = t.name, r = t.srcs;
if (o && r) {
-1 === r.indexOf(i) && r.push(i);
p(o, r);
} else {
n = s.extname(i);
p(o = s.basename(i, n), i, n);
}
if (!document.fonts) return null;
document.fonts.load("1em " + o).then((function() {
e(null, null);
}), (function(t) {
e(t);
}));
}
var v = {
js: d,
png: f,
jpg: f,
bmp: f,
jpeg: f,
gif: f,
ico: f,
tiff: f,
webp: function(t, e, i, n) {
return cc.sys.capabilities.webp ? f(t, e, i, n) : new Error(cc._getError(4929, t.url));
},
image: f,
mp3: n = t("./audio-downloader"),
ogg: n,
wav: n,
m4a: n,
txt: h,
xml: h,
vsh: h,
fsh: h,
atlas: h,
tmx: h,
tsx: h,
json: h,
ExportJson: h,
plist: h,
fnt: h,
font: g,
eot: g,
ttf: g,
woff: g,
svg: g,
ttc: g,
uuid: function(t, e) {
var i = l.load(t, e);
return void 0 === i ? this.extMap.json(t, e) : i || void 0;
},
default: h
}, y = "Downloader", m = function(t) {
this.id = y;
this.async = !0;
this.pipeline = null;
this._curConcurrent = 0;
this._loadQueue = [];
this._subpackages = {};
this.extMap = o.mixin(t, v);
};
m.ID = y;
m.PackDownloader = l;
m.prototype.addHandlers = function(t) {
o.mixin(this.extMap, t);
};
m.prototype._handleLoadQueue = function() {
for (;this._curConcurrent < cc.macro.DOWNLOAD_MAX_CONCURRENT; ) {
var t = this._loadQueue.shift();
if (!t) break;
var e = this.handle(t.item, t.callback);
void 0 !== e && (e instanceof Error ? t.callback(e) : t.callback(null, e));
}
};
m.prototype.handle = function(t, e) {
var i = this, n = this.extMap[t.type] || this.extMap.default, o = void 0;
if (this._curConcurrent < cc.macro.DOWNLOAD_MAX_CONCURRENT) {
this._curConcurrent++;
if (void 0 !== (o = n.call(this, t, (function(t, n) {
i._curConcurrent = Math.max(0, i._curConcurrent - 1);
i._handleLoadQueue();
e && e(t, n);
})))) {
this._curConcurrent = Math.max(0, this._curConcurrent - 1);
this._handleLoadQueue();
return o;
}
} else if (t.ignoreMaxConcurrency) {
if (void 0 !== (o = n.call(this, t, e))) return o;
} else this._loadQueue.push({
item: t,
callback: e
});
};
m.prototype.loadSubpackage = function(t, e) {
var i = this._subpackages[t];
i ? i.loaded ? e && e() : d({
url: i.path
}, (function(t) {
t || (i.loaded = !0);
e && e(t);
})) : e && e(new Error("Can't find subpackage " + t));
};
a.Downloader = e.exports = m;
}), {
"../platform/CCSys": 133,
"../platform/js": 143,
"../utils/CCPath": 150,
"../utils/misc": 155,
"./audio-downloader": 1,
"./pack-downloader": 98,
"./pipeline": 99,
"./text-downloader": 101,
"./utils": 103
} ],
94: [ (function(t, e, i) {
t("./downloader");
t("./loader");
t("./loading-items");
t("./pipeline");
t("./CCLoader");
}), {
"./CCLoader": 89,
"./downloader": 93,
"./loader": 95,
"./loading-items": 96,
"./pipeline": 99
} ],
95: [ (function(i, n, o) {
var r = i("../platform/js"), s = i("./pipeline"), c = i("../textures/CCTexture2D"), a = i("./uuid-loader");
function l(i, n) {
if ("string" !== ("object" === (e = typeof i.content) ? t(i.content) : e)) return new Error("JSON Loader: Input item doesn't contain string content");
try {
return JSON.parse(i.content);
} catch (t) {
return new Error("JSON Loader: Parse json [" + i.id + "] failed : " + t);
}
}
function h(t, e) {
if (cc.Class.isInstanceOf(t._owner, cc.Asset)) return null;
var i = t.content;
if (!(i instanceof Image)) return new Error("Image Loader: Input item doesn't contain Image content");
var n = t.rawUrl, o = cc.textureCache.getTextureForKey(n) || new c();
o.url = n;
o._setRawAsset(n, !1);
o._nativeAsset = i;
cc.textureCache.cacheImage(n, o);
return o;
}
function u(t, e) {
if (cc.Class.isInstanceOf(t._owner, cc.Asset)) return null;
var i = new cc.AudioClip();
i._setRawAsset(t.rawUrl, !1);
i._nativeAsset = t.content;
return i;
}
var d = {
png: h,
jpg: h,
bmp: h,
jpeg: h,
gif: h,
ico: h,
tiff: h,
webp: h,
image: h,
mp3: u,
ogg: u,
wav: u,
m4a: u,
json: l,
ExportJson: l,
plist: function(i, n) {
if ("string" !== ("object" == (e = typeof i.content) ? t(i.content) : e)) return new Error("Plist Loader: Input item doesn't contain string content");
var o = cc.plistParser.parse(i.content);
return o || new Error("Plist Loader: Parse [" + i.id + "] failed");
},
uuid: a,
prefab: a,
fire: a,
scene: a,
default: function(t, e) {
return null;
}
}, f = function(t) {
this.id = "Loader";
this.async = !0;
this.pipeline = null;
this.extMap = r.mixin(t, d);
};
f.ID = "Loader";
f.prototype.addHandlers = function(t) {
this.extMap = r.mixin(this.extMap, t);
};
f.prototype.handle = function(t, e) {
return (this.extMap[t.type] || this.extMap.default).call(this, t, e);
};
s.Loader = n.exports = f;
}), {
"../platform/js": 143,
"../textures/CCTexture2D": 149,
"./pipeline": 99,
"./uuid-loader": 104
} ],
96: [ (function(i, n, o) {
var r = i("../platform/callbacks-invoker"), s = i("../utils/CCPath"), c = i("../platform/js"), a = 0 | 998 * Math.random(), l = {}, h = [], u = {
WORKING: 1,
COMPLETE: 2,
ERROR: 3
}, d = {};
function f(i) {
var n = i.url || i;
return "string" === ("object" === (e = typeof n) ? t(n) : e);
}
function _(i, n) {
var o = "object" === ("object" === (e = typeof i) ? t(i) : e) ? i.url : i, r = {
queueId: n,
id: o,
url: o,
rawUrl: void 0,
urlParam: (function(t) {
if (t) {
var e = t.split("?");
if (e && e[0] && e[1]) {
var i = {};
e[1].split("&").forEach((function(t) {
var e = t.split("=");
i[e[0]] = e[1];
}));
return i;
}
}
})(o),
type: "",
error: null,
content: null,
complete: !1,
states: {},
deps: null
};
if ("object" === ("object" === (e = typeof i) ? t(i) : e)) {
c.mixin(r, i);
if (i.skips) for (var a = 0; a < i.skips.length; a++) {
var l = i.skips[a];
r.states[l] = u.COMPLETE;
}
}
r.rawUrl = r.url;
o && !r.type && (r.type = s.extname(o).toLowerCase().substr(1));
return r;
}
var p = [];
function g(t, e, i) {
if (!t || !e) return !1;
var n = !1;
p.push(e.id);
if (e.deps) {
var o, r, s = e.deps;
for (o = 0; o < s.length; o++) {
if ((r = s[o]).id === t.id) {
n = !0;
break;
}
if (!(p.indexOf(r.id) >= 0) && (r.deps && g(t, r, !0))) {
n = !0;
break;
}
}
}
i || (p.length = 0);
return n;
}
var v = function(t, e, i, n) {
r.call(this);
this._id = ++a;
l[this._id] = this;
this._pipeline = t;
this._errorUrls = [];
this._appending = !1;
this._ownerQueue = null;
this.onProgress = i;
this.onComplete = n;
this.map = {};
this.completed = {};
this.totalCount = 0;
this.completedCount = 0;
this._pipeline ? this.active = !0 : this.active = !1;
e && (e.length > 0 ? this.append(e) : this.allComplete());
};
v.ItemState = new cc.Enum(u);
v.create = function(i, n, o, r) {
if (void 0 === o) {
if ("function" === ("object" === (e = typeof n) ? t(n) : e)) {
r = n;
n = o = null;
}
} else if (void 0 === r) if ("function" === ("object" === (e = typeof n) ? t(n) : e)) {
r = o;
o = n;
n = null;
} else {
r = o;
o = null;
}
var s = h.pop();
if (s) {
s._pipeline = i;
s.onProgress = o;
s.onComplete = r;
l[s._id] = s;
s._pipeline && (s.active = !0);
n && s.append(n);
} else s = new v(i, n, o, r);
return s;
};
v.getQueue = function(t) {
return t.queueId ? l[t.queueId] : null;
};
v.itemComplete = function(t) {
var e = l[t.queueId];
e && e.itemComplete(t.id);
};
v.initQueueDeps = function(t) {
var e = d[t._id];
if (e) {
e.completed.length = 0;
e.deps.length = 0;
} else e = d[t._id] = {
completed: [],
deps: []
};
};
v.registerQueueDep = function(t, e) {
var i = t.queueId || t;
if (!i) return !1;
var n = d[i];
if (n) -1 === n.deps.indexOf(e) && n.deps.push(e); else if (t.id) for (var o in d) {
var r = d[o];
-1 !== r.deps.indexOf(t.id) && -1 === r.deps.indexOf(e) && r.deps.push(e);
}
};
v.finishDep = function(t) {
for (var e in d) {
var i = d[e];
-1 !== i.deps.indexOf(t) && -1 === i.completed.indexOf(t) && i.completed.push(t);
}
};
var y = v.prototype;
c.mixin(y, r.prototype);
y.append = function(t, e) {
if (!this.active) return [];
e && !e.deps && (e.deps = []);
this._appending = !0;
var i, n, o, r = [];
for (i = 0; i < t.length; ++i) if (!(n = t[i]).queueId || this.map[n.id]) {
if (f(n)) {
var s = (o = _(n, this._id)).id;
if (!this.map[s]) {
this.map[s] = o;
this.totalCount++;
e && e.deps.push(o);
v.registerQueueDep(e || this._id, s);
r.push(o);
}
}
} else {
this.map[n.id] = n;
e && e.deps.push(n);
if (n.complete || g(e, n)) {
this.totalCount++;
this.itemComplete(n.id);
continue;
}
var c = this, a = l[n.queueId];
if (a) {
this.totalCount++;
v.registerQueueDep(e || this._id, n.id);
a.addListener(n.id, (function(t) {
c.itemComplete(t.id);
}));
}
}
this._appending = !1;
this.completedCount === this.totalCount ? this.allComplete() : this._pipeline.flowIn(r);
return r;
};
y._childOnProgress = function(t) {
if (this.onProgress) {
var e = d[this._id];
this.onProgress(e ? e.completed.length : this.completedCount, e ? e.deps.length : this.totalCount, t);
}
};
y.allComplete = function() {
var t = 0 === this._errorUrls.length ? null : this._errorUrls;
this.onComplete && this.onComplete(t, this);
};
y.isCompleted = function() {
return this.completedCount >= this.totalCount;
};
y.isItemCompleted = function(t) {
return !!this.completed[t];
};
y.exists = function(t) {
return !!this.map[t];
};
y.getContent = function(t) {
var e = this.map[t], i = null;
e && (e.content ? i = e.content : e.alias && (i = e.alias.content));
return i;
};
y.getError = function(t) {
var e = this.map[t], i = null;
e && (e.error ? i = e.error : e.alias && (i = e.alias.error));
return i;
};
y.addListener = r.prototype.add;
y.hasListener = r.prototype.has;
y.removeListener = r.prototype.remove;
y.removeAllListeners = r.prototype.removeAll;
y.removeItem = function(t) {
var e = this.map[t];
if (e && this.completed[e.alias || t]) {
delete this.completed[t];
delete this.map[t];
if (e.alias) {
delete this.completed[e.alias.id];
delete this.map[e.alias.id];
}
this.completedCount--;
this.totalCount--;
}
};
y.itemComplete = function(t) {
var e = this.map[t];
if (e) {
var i = this._errorUrls.indexOf(t);
e.error && -1 === i ? this._errorUrls.push(t) : e.error || -1 === i || this._errorUrls.splice(i, 1);
this.completed[t] = e;
this.completedCount++;
v.finishDep(e.id);
if (this.onProgress) {
var n = d[this._id];
this.onProgress(n ? n.completed.length : this.completedCount, n ? n.deps.length : this.totalCount, e);
}
this.invoke(t, e);
this.removeAll(t);
!this._appending && this.completedCount >= this.totalCount && this.allComplete();
}
};
y.destroy = function() {
this.active = !1;
this._appending = !1;
this._pipeline = null;
this._ownerQueue = null;
this._errorUrls.length = 0;
this.onProgress = null;
this.onComplete = null;
this.map = {};
this.completed = {};
this.totalCount = 0;
this.completedCount = 0;
r.call(this);
l[this._id] = null;
if (d[this._id]) {
d[this._id].completed.length = 0;
d[this._id].deps.length = 0;
}
-1 === h.indexOf(this) && h.length < 10 && h.push(this);
};
cc.LoadingItems = n.exports = v;
}), {
"../platform/callbacks-invoker": 136,
"../platform/js": 143,
"../utils/CCPath": 150
} ],
97: [ (function(t, e, i) {
var n = t("./pipeline"), o = "MD5Pipe", r = /(\.[^.\n\\/]*)$/, s = function(t, e, i) {
this.id = o;
this.async = !1;
this.pipeline = null;
this.md5AssetsMap = t;
this.libraryBase = e;
this.rawAssetsBase = i;
};
s.ID = o;
s.prototype.handle = function(t) {
t.url = this.transformURL(t.url);
return t;
};
s.prototype.transformURL = function(t, e) {
var i = t.indexOf("?"), n = t;
-1 !== i && (n = t.substr(0, i));
if (n.startsWith(this.libraryBase)) n = n.slice(this.libraryBase.length); else {
if (!n.startsWith(this.rawAssetsBase)) return t;
n = n.slice(this.rawAssetsBase.length);
}
var o = this.md5AssetsMap[n];
if (o) if (e) {
var s = cc.path.dirname(t), c = cc.path.basename(t);
t = s + "." + o + "/" + c;
} else {
var a = !1;
t = t.replace(r, (function(t, e) {
a = !0;
return "." + o + e;
}));
a || (t = t + "." + o);
}
return t;
};
n.MD5Pipe = e.exports = s;
}), {
"./pipeline": 99
} ],
98: [ (function(i, n, o) {
var r = i("./unpackers"), s = i("../utils/misc").pushToMap, c = {
Invalid: 0,
Removed: 1,
Downloading: 2,
Loaded: 3
};
function a() {
this.unpacker = null;
this.state = c.Invalid;
}
var l = {}, h = {}, u = {};
function d(t, e) {
return new Error("Can not retrieve " + t + " from packer " + e);
}
n.exports = {
initPacks: function(t) {
h = t;
for (var e in t) for (var i = t[e], n = 0; n < i.length; n++) {
var o = i[n], r = 1 === i.length;
s(l, o, e, r);
}
},
_loadNewPack: function(t, e, i) {
var n = this, o = cc.AssetLibrary.getLibUrlNoExt(e) + ".json";
cc.loader.load({
url: o,
ignoreMaxConcurrency: !0
}, (function(o, r) {
if (o) {
cc.errorID(4916, t);
return i(o);
}
var s = n._doLoadNewPack(t, e, r);
s ? i(null, s) : i(d(t, e));
}));
},
_doPreload: function(t, e) {
var i = u[t];
i || ((i = u[t] = new a()).state = c.Downloading);
if (i.state !== c.Loaded) {
i.unpacker = new r.JsonUnpacker();
i.unpacker.load(h[t], e);
i.state = c.Loaded;
}
},
_doLoadNewPack: function(i, n, o) {
var s = u[n];
if (s.state !== c.Loaded) {
"string" === ("object" === (e = typeof o) ? t(o) : e) && (o = JSON.parse(o));
Array.isArray(o) ? s.unpacker = new r.JsonUnpacker() : o.type === r.TextureUnpacker.ID && (s.unpacker = new r.TextureUnpacker());
s.unpacker.load(h[n], o);
s.state = c.Loaded;
}
return s.unpacker.retrieve(i);
},
_selectLoadedPack: function(t) {
for (var e = c.Invalid, i = "", n = 0; n < t.length; n++) {
var o = t[n], r = u[o];
if (r) {
var s = r.state;
if (s === c.Loaded) return o;
if (s > e) {
e = s;
i = o;
}
}
}
return e !== c.Invalid ? i : t[0];
},
load: function(t, e) {
var i = t.uuid, n = l[i];
if (n) {
Array.isArray(n) && (n = this._selectLoadedPack(n));
var o = u[n];
if (o && o.state === c.Loaded) {
var r = o.unpacker.retrieve(i);
return r || d(i, n);
}
if (!o) {
console.log("Create unpacker %s for %s", n, i);
(o = u[n] = new a()).state = c.Downloading;
}
this._loadNewPack(i, n, e);
return null;
}
}
};
0;
}), {
"../utils/misc": 155,
"./unpackers": 102
} ],
99: [ (function(t, e, i) {
t("../platform/js");
var n = t("./loading-items"), o = n.ItemState;
function r(t, e) {
var i = t.id, n = e.states[i], s = t.next, c = t.pipeline;
if (!e.error && n !== o.WORKING && n !== o.ERROR) if (n === o.COMPLETE) s ? r(s, e) : c.flowOut(e); else {
e.states[i] = o.WORKING;
var a = t.handle(e, (function(t, n) {
if (t) {
e.error = t;
e.states[i] = o.ERROR;
c.flowOut(e);
} else {
n && (e.content = n);
e.states[i] = o.COMPLETE;
s ? r(s, e) : c.flowOut(e);
}
}));
if (a instanceof Error) {
e.error = a;
e.states[i] = o.ERROR;
c.flowOut(e);
} else if (void 0 !== a) {
null !== a && (e.content = a);
e.states[i] = o.COMPLETE;
s ? r(s, e) : c.flowOut(e);
}
}
}
var s = function(t) {
this._pipes = t;
this._cache = {};
for (var e = 0; e < t.length; ++e) {
var i = t[e];
if (i.handle && i.id) {
i.pipeline = this;
i.next = e < t.length - 1 ? t[e + 1] : null;
}
}
};
s.ItemState = o;
var c = s.prototype;
c.insertPipe = function(t, e) {
if (!t.handle || !t.id || e > this._pipes.length) cc.warnID(4921); else if (this._pipes.indexOf(t) > 0) cc.warnID(4922); else {
t.pipeline = this;
var i = null;
e < this._pipes.length && (i = this._pipes[e]);
var n = null;
e > 0 && (n = this._pipes[e - 1]);
n && (n.next = t);
t.next = i;
this._pipes.splice(e, 0, t);
}
};
c.insertPipeAfter = function(t, e) {
var i = this._pipes.indexOf(t);
i < 0 || this.insertPipe(e, i + 1);
};
c.appendPipe = function(t) {
if (t.handle && t.id) {
t.pipeline = this;
t.next = null;
this._pipes.length > 0 && (this._pipes[this._pipes.length - 1].next = t);
this._pipes.push(t);
}
};
c.flowIn = function(t) {
var e, i, n = this._pipes[0];
if (n) {
for (e = 0; e < t.length; e++) {
i = t[e];
this._cache[i.id] = i;
}
for (e = 0; e < t.length; e++) r(n, i = t[e]);
} else for (e = 0; e < t.length; e++) this.flowOut(t[e]);
};
c.flowInDeps = function(t, e, i) {
return n.create(this, (function(t, e) {
i(t, e);
e.destroy();
})).append(e, t);
};
c.flowOut = function(t) {
t.error ? delete this._cache[t.id] : this._cache[t.id] || (this._cache[t.id] = t);
t.complete = !0;
n.itemComplete(t);
};
c.copyItemStates = function(t, e) {
if (e instanceof Array) for (var i = 0; i < e.length; ++i) e[i].states = t.states; else e.states = t.states;
};
c.isFlowing = function() {
return !0;
};
c.getItems = function() {
return null;
};
c.getItem = function(t) {
var e = this._cache[t];
if (!e) return e;
e.alias && (e = e.alias);
return e;
};
c.removeItem = function(t) {
var e = this._cache[t];
e && e.complete && delete this._cache[t];
return e;
};
c.clear = function() {
for (var t in this._cache) {
var e = this._cache[t];
delete this._cache[t];
if (!e.complete) {
e.error = new Error("Canceled manually");
this.flowOut(e);
}
}
};
cc.Pipeline = e.exports = s;
}), {
"../platform/js": 143,
"./loading-items": 96
} ],
100: [ (function(t, e, i) {}), {
"../platform/js": 143
} ],
101: [ (function(i, n, o) {
i("../platform/CCSys");
n.exports = function(i, n) {
var o = i.url, r = jsb.fileUtils.getStringFromFile(o);
return "string" === ("object" === (e = typeof r) ? t(r) : e) && r ? r : new Error("Download text failed: " + o);
};
}), {
"../platform/CCSys": 133,
"./utils": 103
} ],
102: [ (function(t, e, i) {
var n = t("../textures/CCTexture2D"), o = t("../platform/js");
function r() {
this.jsons = {};
}
r.prototype.load = function(t, e) {
e.length !== t.length && cc.errorID(4915);
for (var i = 0; i < t.length; i++) {
var n = t[i], o = e[i];
this.jsons[n] = o;
}
};
r.prototype.retrieve = function(t) {
return this.jsons[t] || null;
};
function s() {
this.contents = {};
}
s.ID = o._getClassId(n);
s.prototype.load = function(t, e) {
var i = e.data.split("|");
i.length !== t.length && cc.errorID(4915);
for (var n = 0; n < t.length; n++) this.contents[t[n]] = i[n];
};
s.prototype.retrieve = function(t) {
var e = this.contents[t];
return e ? {
__type__: s.ID,
content: e
} : null;
};
0;
e.exports = {
JsonUnpacker: r,
TextureUnpacker: s
};
}), {
"../platform/js": 143,
"../textures/CCTexture2D": 149
} ],
103: [ (function(i, n, o) {
var r = /\?/;
n.exports = {
urlAppendTimestamp: function(i) {
cc.game.config.noCache && "string" === ("object" === (e = typeof i) ? t(i) : e) && (r.test(i) ? i += "&_t=" + (new Date() - 0) : i += "?_t=" + (new Date() - 0));
return i;
}
};
}), {} ],
104: [ (function(i, n, o) {
var r = i("../platform/js");
i("../platform/deserialize");
var s = i("./loading-items");
function c(t) {
return t && (t[0] && "cc.Scene" === t[0].__type__ || t[1] && "cc.Scene" === t[1].__type__ || t[0] && "cc.Prefab" === t[0].__type__);
}
function a(i, n) {
0;
var o, a;
if ("string" === ("object" === (e = typeof i.content) ? t(i.content) : e)) try {
o = JSON.parse(i.content);
} catch (t) {
return new Error(cc._getError(4923, i.id, t.stack));
} else {
if ("object" !== ("object" === (e = typeof i.content) ? t(i.content) : e)) return new Error(cc._getError(4924));
o = i.content;
}
var l = c(o);
a = l ? cc._MissingScript.safeFindClass : function(t) {
var e = r._getClassById(t);
if (e) return e;
cc.warnID(4903, t);
return Object;
};
var h, u = cc.deserialize.Details.pool.get();
try {
h = cc.deserialize(o, u, {
classFinder: a,
target: i.existingAsset,
customEnv: i
});
} catch (t) {
cc.deserialize.Details.pool.put(u);
var d = t + "\n" + t.stack;
return new Error(cc._getError(4925, i.id, d));
}
h._uuid = i.uuid;
0;
var f = (function(t, e, i, n) {
var o, r, s, c = i.uuidList, a = i.uuidObjList, l = i.uuidPropList, h = i._stillUseUrl, u = t.dependKeys = [];
if (n) {
o = [];
for (r = 0; r < c.length; r++) {
s = c[r];
var d = a[r], f = l[r], _ = cc.AssetLibrary._getAssetInfoInRuntime(s);
if (_.raw) {
var p = _.url;
d[f] = p;
u.push(p);
} else o.push({
type: "uuid",
uuid: s,
deferredLoadRaw: !0,
_owner: d,
_ownerProp: f,
_stillUseUrl: h[r]
});
}
} else {
o = new Array(c.length);
for (r = 0; r < c.length; r++) {
s = c[r];
o[r] = {
type: "uuid",
uuid: s,
_owner: a[r],
_ownerProp: l[r],
_stillUseUrl: h[r]
};
}
e._native && !e.constructor.preventPreloadNativeObject && o.push({
url: e.nativeUrl,
_owner: e,
_ownerProp: "_nativeAsset"
});
}
return o;
})(i, h, u, !1);
cc.deserialize.Details.pool.put(u);
if (0 === f.length) return n(null, h);
(function(t, e, i, n, o) {
e.content = i;
var r = e.dependKeys;
t.flowInDeps(e, n, (function(t, e) {
var c, a = e.map;
for (var l in a) (c = a[l]).uuid && c.content && (c.content._uuid = c.uuid);
for (var h = 0; h < n.length; h++) {
var u = n[h], d = u.uuid, f = u.url;
u._owner, u._ownerProp;
if (c = a[f]) {
var _ = u;
if (c.complete || c.content) c.error ? cc._throw(c.error) : v.call(_, c); else {
var p = s.getQueue(c), g = p._callbackTable[d];
g ? g.unshift(v, _) : p.addListener(d, v, _);
}
}
function v(t) {
var e = t.content;
this._stillUseUrl && (e = e && cc.RawAsset.wasRawAssetType(e.constructor) ? e.nativeUrl : t.rawUrl);
this._owner[this._ownerProp] = e;
t.uuid !== i._uuid && r.indexOf(t.id) < 0 && r.push(t.id);
}
}
o(t, i);
}));
})(this.pipeline, i, h, f, n);
}
n.exports = a;
a.isSceneObj = c;
}), {
"../platform/deserialize": 138,
"../platform/js": 143,
"./loading-items": 96
} ],
105: [ (function(i, n, o) {
var r = i("./component-scheduler"), s = i("./platform/CCObject").Flags, c = i("./platform/js"), a = s.IsPreloadStarted, l = s.IsOnLoadStarted, h = s.IsOnLoadCalled, u = s.Deactivating, d = "c.onLoad();c._objFlags|=" + h, f = cc.Class({
extends: r.LifeCycleInvoker,
add: function(t) {
this._zero.array.push(t);
},
remove: function(t) {
this._zero.fastRemove(t);
},
cancelInactive: function(t) {
r.LifeCycleInvoker.stableRemoveInactive(this._zero, t);
},
invoke: function() {
this._invoke(this._zero);
this._zero.array.length = 0;
}
}), _ = r.createInvokeImpl("c.__preload();"), p = r.createInvokeImpl(d), g = new c.Pool(4);
g.get = function() {
var t = this._get() || {
preload: new f(_),
onLoad: new r.OneOffInvoker(p),
onEnable: new r.OneOffInvoker(r.invokeOnEnable)
};
t.preload._zero.i = -1;
var e = t.onLoad;
e._zero.i = -1;
e._neg.i = -1;
e._pos.i = -1;
(e = t.onEnable)._zero.i = -1;
e._neg.i = -1;
e._pos.i = -1;
return t;
};
function v(t, e, i) {
0;
e ? t._removeComponent(e) : c.array.removeAt(t._components, i);
}
function y() {
this._activatingStack = [];
}
var m = cc.Class({
ctor: y,
reset: y,
_activateNodeRecursively: function(t, e, i, n) {
if (t._objFlags & u) cc.errorID(3816, t.name); else {
t._activeInHierarchy = !0;
for (var o = t._components.length, r = 0; r < o; ++r) {
var s = t._components[r];
if (s instanceof cc.Component) this.activateComp(s, e, i, n); else {
v(t, s, r);
--r;
--o;
}
}
for (var c = 0, a = t._children.length; c < a; ++c) {
var l = t._children[c];
l._active && this._activateNodeRecursively(l, e, i, n);
}
t._onPostActivated(!0);
}
},
_deactivateNodeRecursively: function(t) {
0;
t._objFlags |= u;
t._activeInHierarchy = !1;
for (var e = t._components.length, i = 0; i < e; ++i) {
var n = t._components[i];
if (n._enabled) {
cc.director._compScheduler.disableComp(n);
if (t._activeInHierarchy) {
t._objFlags &= ~u;
return;
}
}
}
for (var o = 0, r = t._children.length; o < r; ++o) {
var s = t._children[o];
if (s._activeInHierarchy) {
this._deactivateNodeRecursively(s);
if (t._activeInHierarchy) {
t._objFlags &= ~u;
return;
}
}
}
t._onPostActivated(!1);
t._objFlags &= ~u;
},
activateNode: function(t, e) {
if (e) {
var i = g.get();
this._activatingStack.push(i);
this._activateNodeRecursively(t, i.preload, i.onLoad, i.onEnable);
i.preload.invoke();
i.onLoad.invoke();
i.onEnable.invoke();
this._activatingStack.pop();
g.put(i);
} else {
this._deactivateNodeRecursively(t);
for (var n = this._activatingStack, o = 0; o < n.length; o++) {
var r = n[o];
r.preload.cancelInactive(a);
r.onLoad.cancelInactive(l);
r.onEnable.cancelInactive();
}
}
t.emit("active-in-hierarchy-changed", t);
},
activateComp: function(i, n, o, r) {
if (!(i._objFlags & a)) {
i._objFlags |= a;
"function" === ("object" === (e = typeof i.__preload) ? t(i.__preload) : e) && (n ? n.add(i) : i.__preload());
}
if (!(i._objFlags & l)) {
i._objFlags |= l;
if (i.onLoad) if (o) o.add(i); else {
i.onLoad();
i._objFlags |= h;
} else i._objFlags |= h;
}
if (i._enabled) {
if (!i.node._activeInHierarchy) return;
cc.director._compScheduler.enableComp(i, r);
}
},
destroyComp: function(t) {
cc.director._compScheduler.disableComp(t);
t.onDestroy && t._objFlags & h && t.onDestroy();
},
resetComp: !1
});
n.exports = m;
}), {
"./component-scheduler": 41,
"./platform/CCObject": 132,
"./platform/js": 143,
"./utils/misc": 155
} ],
106: [ (function(t, e, i) {
var n = t("./CCPhysicsTypes").PTM_RATIO, o = t("./CCPhysicsTypes").ContactType, r = [], s = [ cc.v2(), cc.v2() ];
0;
var c = {
points: [],
separations: [],
normal: cc.v2()
};
function a() {
this.localPoint = cc.v2();
this.normalImpulse = 0;
this.tangentImpulse = 0;
}
var l = [ new a(), new a() ];
0;
var h = {
type: 0,
localPoint: cc.v2(),
localNormal: cc.v2(),
points: []
}, u = {
normalImpulses: [],
tangentImpulses: []
};
function d() {}
d.prototype.init = function(t) {
this.colliderA = t.GetFixtureA().collider;
this.colliderB = t.GetFixtureB().collider;
this.disabled = !1;
this.disabledOnce = !1;
this._impulse = null;
this._inverted = !1;
this._b2contact = t;
t._contact = this;
};
d.prototype.reset = function() {
this.colliderA = null;
this.colliderB = null;
this.disabled = !1;
this._impulse = null;
this._b2contact._contact = null;
this._b2contact = null;
};
d.prototype.getWorldManifold = function() {
var t = c.points, e = c.separations, i = c.normal, n = cc.PhysicsUtils.getContactWorldManifoldWrapper(this._b2contact), o = n.getCount();
t.length = e.length = o;
for (var r = 0; r < o; r++) {
var a = s[r];
a.x = n.getX(r);
a.y = n.getY(r);
t[r] = a;
e[r] = n.getSeparation(r);
}
i.x = n.getNormalX();
i.y = n.getNormalY();
if (this._inverted) {
i.x *= -1;
i.y *= -1;
}
return c;
};
d.prototype.getManifold = function() {
for (var t = h.points, e = h.localNormal, i = h.localPoint, n = cc.PhysicsUtils.getContactManifoldWrapper(), o = t.length = n.getCount(), r = 0; r < o; r++) {
var s;
(s = l[r]).localPoint.x = n.getX(r);
s.localPoint.y = n.getX(r);
s.normalImpulse = n.getNormalImpulse(r);
s.tangentImpulse = n.getTangentImpulse(r);
t[r] = s;
}
e.x = n.getLocalNormalX();
e.y = n.getLocalNormalY();
i.x = n.getLocalPointX();
i.y = n.getLocalPointY();
h.type = n.getType();
if (this._inverted) {
e.x *= -1;
e.y *= -1;
}
return h;
};
d.prototype.getImpulse = function() {
var t = this._impulse;
if (!t) return null;
var e, i = u.normalImpulses, n = u.tangentImpulses;
e = t.getCount();
for (var o = 0; o < e; o++) {
i[o] = t.getNormalImpulse(o);
n[o] = t.getTangentImpulse(o);
}
n.length = i.length = e;
return u;
};
d.prototype.emit = function(t) {
var e;
switch (t) {
case o.BEGIN_CONTACT:
e = "onBeginContact";
break;

case o.END_CONTACT:
e = "onEndContact";
break;

case o.PRE_SOLVE:
e = "onPreSolve";
break;

case o.POST_SOLVE:
e = "onPostSolve";
}
var i, n, r, s, c = this.colliderA, a = this.colliderB, l = c.body, h = a.body;
if (l.enabledContactListener) {
i = l.node._components;
this._inverted = !1;
for (n = 0, r = i.length; n < r; n++) (s = i[n])[e] && s[e](this, c, a);
}
if (h.enabledContactListener) {
i = h.node._components;
this._inverted = !0;
for (n = 0, r = i.length; n < r; n++) (s = i[n])[e] && s[e](this, a, c);
}
if (this.disabled || this.disabledOnce) {
this.setEnabled(!1);
this.disabledOnce = !1;
}
};
d.get = function(t) {
var e;
(e = 0 === r.length ? new cc.PhysicsContact() : r.pop()).init(t);
return e;
};
d.put = function(t) {
var e = t._contact;
if (e) {
r.push(e);
e.reset();
}
};
var f = d.prototype;
f.setEnabled = function(t) {
this._b2contact.SetEnabled(t);
};
f.isTouching = function() {
return this._b2contact.IsTouching();
};
f.setTangentSpeed = function(t) {
this._b2contact.SetTangentSpeed(t / n);
};
f.getTangentSpeed = function() {
return this._b2contact.GetTangentSpeed() * n;
};
f.setFriction = function(t) {
this._b2contact.SetFriction(t);
};
f.getFriction = function() {
return this._b2contact.GetFriction();
};
f.resetFriction = function() {
return this._b2contact.ResetFriction();
};
f.setRestitution = function(t) {
this._b2contact.SetRestitution(t);
};
f.getRestitution = function() {
return this._b2contact.GetRestitution();
};
f.resetRestitution = function() {
return this._b2contact.ResetRestitution();
};
d.ContactType = o;
cc.PhysicsContact = e.exports = d;
}), {
"./CCPhysicsTypes": 108
} ],
107: [ (function(t, e, i) {
var n = t("./CCPhysicsTypes").ContactType, o = t("./CCPhysicsTypes").BodyType, r = t("./CCPhysicsTypes").RayCastType, s = t("./CCPhysicsTypes").PTM_RATIO, c = (t("./CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, 
t("./CCPhysicsTypes").PHYSICS_ANGLE_TO_ANGLE, new b2.AABB()), a = new b2.Vec2(), l = new b2.Vec2(), h = cc.Class({
mixins: [ cc.EventTarget ],
statics: {
DrawBits: b2.Draw,
PTM_RATIO: s,
VELOCITY_ITERATIONS: 10,
POSITION_ITERATIONS: 10,
FIXED_TIME_STEP: 1 / 60,
MAX_ACCUMULATOR: .2
},
ctor: function() {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this._debugDrawFlags = 0;
this._debugDrawer = null;
this._world = null;
this._bodies = [];
this._contactMap = {};
this._contactID = 0;
this._delayEvents = [];
this._accumulator = 0;
this.enabledAccumulator = !1;
},
pushDelayEvent: function(t, e, i) {
this._steping ? this._delayEvents.push({
target: t,
func: e,
args: i
}) : t[e].apply(t, i);
},
update: function(t) {
var e = this._world;
if (e && this.enabled) {
this.emit("before-step");
this._steping = !0;
var i = h.VELOCITY_ITERATIONS, n = h.POSITION_ITERATIONS;
if (this.enabledAccumulator) {
this._accumulator += t;
var o = h.FIXED_TIME_STEP, r = h.MAX_ACCUMULATOR;
this._accumulator > r && (this._accumulator = r);
for (;this._accumulator > o; ) {
e.Step(o, i, n);
this._accumulator -= o;
}
} else {
var s = 1 / cc.game.config.frameRate;
e.Step(s, i, n);
}
e.DrawDebugData();
this._steping = !1;
for (var c = this._delayEvents, a = 0, l = c.length; a < l; a++) {
var u = c[a];
u.target[u.func].apply(u.target, u.args);
}
c.length = 0;
this._syncNode();
}
},
testPoint: function(t) {
var e = a.x = t.x / s, i = a.y = t.y / s, n = .2 / s;
c.lowerBound.x = e - n;
c.lowerBound.y = i - n;
c.upperBound.x = e + n;
c.upperBound.y = i + n;
var o = this._aabbQueryCallback;
o.init(a);
this._world.QueryAABB(o, c);
var r = o.getFixture();
return r ? r.collider : null;
},
testAABB: function(t) {
c.lowerBound.x = t.xMin / s;
c.lowerBound.y = t.yMin / s;
c.upperBound.x = t.xMax / s;
c.upperBound.y = t.yMax / s;
var e = this._aabbQueryCallback;
e.init();
this._world.QueryAABB(e, c);
return e.getFixtures().map((function(t) {
return t.collider;
}));
},
rayCast: function(t, e, i) {
if (t.equals(e)) return [];
i = i || r.Closest;
a.x = t.x / s;
a.y = t.y / s;
l.x = e.x / s;
l.y = e.y / s;
var n = this._raycastQueryCallback;
n.init(i);
this._world.RayCast(n, a, l);
var o = n.getFixtures();
if (o.length > 0) {
for (var c = n.getPoints(), h = n.getNormals(), u = n.getFractions(), d = [], f = 0, _ = o.length; f < _; f++) {
var p = o[f], g = p.collider;
if (i === r.AllClosest) {
var v = d.find((function(t) {
return t.collider === g;
}));
if (v) {
if (u[f] < v.fraction) {
v.fixtureIndex = g._getFixtureIndex(p);
v.point.x = c[f].x * s;
v.point.y = c[f].y * s;
v.normal.x = h[f].x;
v.normal.y = h[f].y;
v.fraction = u[f];
}
continue;
}
}
d.push({
collider: g,
fixtureIndex: g._getFixtureIndex(p),
point: cc.v2(c[f].x * s, c[f].y * s),
normal: cc.v2(h[f]),
fraction: u[f]
});
}
return d;
}
return [];
},
syncPosition: function() {
for (var t = this._bodies, e = 0; e < t.length; e++) t[e].syncPosition();
},
syncRotation: function() {
for (var t = this._bodies, e = 0; e < t.length; e++) t[e].syncRotation();
},
attachDebugDrawToCamera: function(t) {
this._debugDrawer && t.addTarget(this._debugDrawer.getDrawer());
},
detachDebugDrawFromCamera: function(t) {
this._debugDrawer && t.removeTarget(this._debugDrawer.getDrawer());
},
_registerContactFixture: function(t) {
this._contactListener.registerContactFixture(t);
},
_unregisterContactFixture: function(t) {
this._contactListener.unregisterContactFixture(t);
},
_addBody: function(t, e) {
var i = this._world, n = t.node;
if (i && n) {
t._b2Body = i.CreateBody(e);
t._b2Body.SetUserData(n._sgNode);
t._b2Body.body = t;
this._utils.addB2Body(t._b2Body);
this._bodies.push(t);
}
},
_removeBody: function(t) {
var e = this._world;
if (e) {
t._b2Body.SetUserData(null);
t._b2Body.body = null;
this._utils.removeB2Body(t._b2Body);
e.DestroyBody(t._b2Body);
t._b2Body = null;
var i = this._bodies.indexOf(t);
-1 !== i && this._bodies.splice(i, 1);
}
},
_initCallback: function() {
if (this._world) {
if (!this._contactListener) {
var t = new cc.PhysicsContactListener();
t.setBeginContact(this._onBeginContact);
t.setEndContact(this._onEndContact);
t.setPreSolve(this._onPreSolve);
t.setPostSolve(this._onPostSolve);
this._world.SetContactListener(t);
this._contactListener = t;
this._aabbQueryCallback = new cc.PhysicsAABBQueryCallback();
this._raycastQueryCallback = new cc.PhysicsRayCastCallback();
}
} else cc.warn("Please init PhysicsManager first");
},
_init: function() {
this.enabled = !0;
this.debugDrawFlags = b2.Draw.e_shapeBit;
},
_getWorld: function() {
return this._world;
},
_syncNode: function() {
this._utils.syncNode();
for (var t = this._bodies, e = 0, i = t.length; e < i; e++) {
var n = t[e], r = n.node;
r._position.x = r._sgNode.getPositionX();
r._position.y = r._sgNode.getPositionY();
r._rotationX = r._rotationY = r._sgNode.getRotation();
n.type === o.Animated && n.resetVelocity();
}
},
_onSceneLaunched: function() {
this._debugDrawer.AddDrawerToNode(cc.director.getScene()._sgNode);
},
_onBeginContact: function(t) {
cc.PhysicsContact.get(t).emit(n.BEGIN_CONTACT);
},
_onEndContact: function(t) {
var e = t._contact;
if (e) {
e.emit(n.END_CONTACT);
cc.PhysicsContact.put(t);
}
},
_onPreSolve: function(t) {
var e = t._contact;
e && e.emit(n.PRE_SOLVE);
},
_onPostSolve: function(t, e) {
var i = t._contact;
if (i) {
i._impulse = e;
i.emit(n.POST_SOLVE);
i._impulse = null;
}
}
});
cc.js.getset(h.prototype, "enabled", (function() {
return this._enabled;
}), (function(t) {
if (t && !this._world) {
var e = new b2.World(new b2.Vec2(0, -10));
e.SetAllowSleeping(!0);
this._world = e;
this._utils = new cc.PhysicsUtils();
this._initCallback();
}
this._enabled = t;
}));
cc.js.getset(h.prototype, "debugDrawFlags", (function() {
return this._debugDrawFlags;
}), (function(t) {
if (t && !this._debugDrawFlags) {
if (!this._debugDrawer) {
this._debugDrawer = new cc.PhysicsDebugDraw(s);
this._world.SetDebugDraw(this._debugDrawer);
}
cc.director.getScene() && this._debugDrawer.AddDrawerToNode(cc.director.getScene()._sgNode);
cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this._onSceneLaunched, this);
} else !t && this._debugDrawFlags && cc.director.off(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this._onSceneLaunched, this);
this._debugDrawFlags = t;
this._debugDrawer && this._debugDrawer.SetFlags(t);
}));
cc.js.getset(h.prototype, "gravity", (function() {
if (this._world) {
var t = this._world.GetGravity();
return cc.v2(t.x * s, t.y * s);
}
return cc.v2();
}), (function(t) {
this._world && this._world.SetGravity(new b2.Vec2(t.x / s, t.y / s));
}));
cc.PhysicsManager = e.exports = h;
}), {
"./CCPhysicsTypes": 108
} ],
108: [ (function(t, e, i) {
var n = cc.Enum({
Static: 0,
Kinematic: 1,
Dynamic: 2,
Animated: 3
});
cc.RigidBodyType = n;
var o = cc.Enum({
Closest: 0,
Any: 1,
AllClosest: 2,
All: 3
});
cc.RayCastType = o;
e.exports = {
BodyType: n,
ContactType: {
BEGIN_CONTACT: "begin-contact",
END_CONTACT: "end-contact",
PRE_SOLVE: "pre-solve",
POST_SOLVE: "post-solve"
},
RayCastType: o,
PTM_RATIO: 32,
ANGLE_TO_PHYSICS_ANGLE: -Math.PI / 180,
PHYSICS_ANGLE_TO_ANGLE: -180 / Math.PI
};
}), {} ],
109: [ (function(i, n, o) {
function r(t, e) {
var i = e.length;
return e[t < 0 ? i - -t % i : t % i];
}
function s(t, e, i) {
for (var n = []; e < t; ) e += i.length;
for (;t <= e; ++t) n.push(r(t, i));
return n;
}
function c(t, e, i) {
if (a(t, i)) {
if (u(r(t, i), r(t - 1, i), r(e, i)) && d(r(t, i), r(t + 1, i), r(e, i))) return !1;
} else if (d(r(t, i), r(t + 1, i), r(e, i)) || u(r(t, i), r(t - 1, i), r(e, i))) return !1;
if (a(e, i)) {
if (u(r(e, i), r(e - 1, i), r(t, i)) && d(r(e, i), r(e + 1, i), r(t, i))) return !1;
} else if (d(r(e, i), r(e + 1, i), r(t, i)) || u(r(e, i), r(e - 1, i), r(t, i))) return !1;
for (var n = 0; n < i.length; ++n) if ((n + 1) % i.length != t && n != t && (n + 1) % i.length != e && n != e) {
var o = cc.v2();
if (v(r(t, i), r(e, i), r(n, i), r(n + 1, i), o)) return !1;
}
return !0;
}
function a(t, e) {
return l(t, e);
}
function l(i, n, o) {
if ("undefined" === ("object" === (e = typeof o) ? t(o) : e)) {
var s = i, c = n;
i = r(s - 1, c);
n = r(s, c);
o = r(s + 1, c);
}
return y(i, n, o) < 0;
}
function h(t, e, i) {
return y(t, e, i) > 0;
}
function u(t, e, i) {
return y(t, e, i) >= 0;
}
function d(t, e, i) {
return y(t, e, i) <= 0;
}
function f(t, e) {
var i = e.x - t.x, n = e.y - t.y;
return i * i + n * n;
}
function _(t) {
p(t) || t.reverse();
}
function p(t) {
return t.length < 3 || (function(t) {
var e, i = 0;
for (e = 0; e < t.length; e++) {
var n = (e + 1) % t.length;
i += t[e].x * t[n].y;
i -= t[e].y * t[n].x;
}
return i /= 2;
})(t) > 0;
}
function g(t, e, i, n) {
var o = cc.v2(), r = e.y - t.y, s = t.x - e.x, c = r * t.x + s * t.y, a = n.y - i.y, l = i.x - n.x, h = a * i.x + l * i.y, u = r * l - a * s;
if (!(function(t, e) {
return Math.abs(t - e) <= 1e-6;
})(u, 0)) {
o.x = (l * c - s * h) / u;
o.y = (r * h - a * c) / u;
}
return o;
}
function v(t, e, i, n, o) {
if (t == i || t == n || e == i || e == n) return !1;
var r = t.x, s = t.y, c = e.x, a = e.y, l = i.x, h = i.y, u = n.x, d = n.y;
if (Math.max(r, c) < Math.min(l, u) || Math.max(l, u) < Math.min(r, c)) return !1;
if (Math.max(s, a) < Math.min(h, d) || Math.max(h, d) < Math.min(s, a)) return !1;
var f = (u - l) * (s - h) - (d - h) * (r - l), _ = (c - r) * (s - h) - (a - s) * (r - l), p = (d - h) * (c - r) - (u - l) * (a - s);
if (Math.abs(p) < 1e-6) return !1;
_ /= p;
if (0 < (f /= p) && f < 1 && 0 < _ && _ < 1) {
o.x = r + f * (c - r);
o.y = s + f * (a - s);
return !0;
}
return !1;
}
function y(t, e, i) {
return t.x * (e.y - i.y) + e.x * (i.y - t.y) + i.x * (t.y - e.y);
}
n.exports = {
ConvexPartition: function t(e) {
_(e);
for (var i, n, o, p, v, y, m = [], C = cc.v2(), T = cc.v2(), b = 0, S = 0, E = 0; E < e.length; ++E) if (a(E, e)) {
n = o = 1e8;
for (var x = 0; x < e.length; ++x) {
if (h(r(E - 1, e), r(E, e), r(x, e)) && d(r(E - 1, e), r(E, e), r(x - 1, e))) {
p = g(r(E - 1, e), r(E, e), r(x, e), r(x - 1, e));
if (l(r(E + 1, e), r(E, e), p) && (i = f(r(E, e), p)) < n) {
n = i;
C = p;
b = x;
}
}
if (h(r(E + 1, e), r(E, e), r(x + 1, e)) && d(r(E + 1, e), r(E, e), r(x, e))) {
p = g(r(E + 1, e), r(E, e), r(x, e), r(x + 1, e));
if (h(r(E - 1, e), r(E, e), p) && (i = f(r(E, e), p)) < o) {
o = i;
S = x;
T = p;
}
}
}
if (b == (S + 1) % e.length) {
var A = C.add(T).div(2);
(v = s(E, S, e)).push(A);
(y = s(b, E, e)).push(A);
} else {
for (var N = 0, O = b; S < b; ) S += e.length;
for (x = b; x <= S; ++x) if (c(E, x, e)) {
var w = 1 / (f(r(E, e), r(x, e)) + 1);
a(x, e) ? d(r(x - 1, e), r(x, e), r(E, e)) && u(r(x + 1, e), r(x, e), r(E, e)) ? w += 3 : w += 2 : w += 1;
if (w > N) {
O = x;
N = w;
}
}
v = s(E, O, e);
y = s(O, E, e);
}
return m = (m = m.concat(t(v))).concat(t(y));
}
m.push(e);
for (E = m.length - 1; E >= 0; E--) 0 == m[E].length && m.splice(E, 0);
return m;
},
ForceCounterClockWise: _,
IsCounterClockWise: p
};
}), {} ],
110: [ (function(t, e, i) {
var n = t("./CCPhysicsTypes").PTM_RATIO, o = t("./CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = t("./CCPhysicsTypes").PHYSICS_ANGLE_TO_ANGLE, s = t("./utils").getWorldRotation, c = t("./CCPhysicsTypes").BodyType, a = new b2.Vec2(), l = new b2.Vec2(), h = cc.Vec2.ZERO, u = cc.Class({
name: "cc.RigidBody",
extends: cc.Component,
editor: !1,
properties: {
_type: c.Dynamic,
_allowSleep: !0,
_gravityScale: 1,
_linearDamping: 0,
_angularDamping: 0,
_linearVelocity: cc.v2(0, 0),
_angularVelocity: 0,
_fixedRotation: !1,
enabled: {
get: function() {
return this._enabled;
},
set: function() {
cc.warnID("8200");
},
visible: !1,
override: !0
},
enabledContactListener: {
default: !1,
tooltip: !1
},
bullet: {
default: !1,
tooltip: !1
},
type: {
type: c,
tooltip: !1,
get: function() {
return this._type;
},
set: function(t) {
this._type = t;
this._b2Body && (t === c.Animated ? this._b2Body.SetType(c.Kinematic) : this._b2Body.SetType(t));
}
},
allowSleep: {
tooltip: !1,
get: function() {
return this._b2Body ? this._b2Body.IsSleepingAllowed() : this._allowSleep;
},
set: function(t) {
this._allowSleep = t;
this._b2Body && this._b2Body.SetSleepingAllowed(t);
}
},
gravityScale: {
tooltip: !1,
get: function() {
return this._gravityScale;
},
set: function(t) {
this._gravityScale = t;
this._b2Body && this._b2Body.SetGravityScale(t);
}
},
linearDamping: {
tooltip: !1,
get: function() {
return this._linearDamping;
},
set: function(t) {
this._linearDamping = t;
this._b2Body && this._b2Body.SetLinearDamping(this._linearDamping);
}
},
angularDamping: {
tooltip: !1,
get: function() {
return this._angularDamping;
},
set: function(t) {
this._angularDamping = t;
this._b2Body && this._b2Body.SetAngularDamping(t);
}
},
linearVelocity: {
tooltip: !1,
type: cc.Vec2,
get: function() {
var t = this._linearVelocity;
if (this._b2Body) {
var e = this._b2Body.GetLinearVelocity();
t.x = e.x * n;
t.y = e.y * n;
}
return t;
},
set: function(t) {
this._linearVelocity = t;
var e = this._b2Body;
if (e) {
var i = a;
i.Set(t.x / n, t.y / n);
e.SetLinearVelocity(i);
}
}
},
angularVelocity: {
tooltip: !1,
get: function() {
return this._b2Body ? this._b2Body.GetAngularVelocity() * r : this._angularVelocity;
},
set: function(t) {
this._angularVelocity = t;
this._b2Body && this._b2Body.SetAngularVelocity(t * o);
}
},
fixedRotation: {
tooltip: !1,
get: function() {
return this._fixedRotation;
},
set: function(t) {
this._fixedRotation = t;
this._b2Body && this._b2Body.SetFixedRotation(t);
}
},
awake: {
tooltip: !1,
get: function() {
return !!this._b2Body && this._b2Body.IsAwake();
},
set: function(t) {
this._b2Body && this._b2Body.SetAwake(t);
}
},
active: {
visible: !1,
get: function() {
return !!this._b2Body && this._b2Body.IsActive();
},
set: function(t) {
this._b2Body && this._b2Body.SetActive(t);
}
}
},
getLocalPoint: function(t, e) {
e = e || cc.v2();
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
var i = this._b2Body.GetLocalPoint(a);
e.x = i.x * n;
e.y = i.y * n;
}
return e;
},
getWorldPoint: function(t, e) {
e = e || cc.v2();
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
var i = this._b2Body.GetWorldPoint(a);
e.x = i.x * n;
e.y = i.y * n;
}
return e;
},
getWorldVector: function(t, e) {
e = e || cc.v2();
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
var i = this._b2Body.GetWorldVector(a);
e.x = i.x * n;
e.y = i.y * n;
}
return e;
},
getLocalVector: function(t, e) {
e = e || cc.v2();
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
var i = this._b2Body.GetLocalVector(a);
e.x = i.x * n;
e.y = i.y * n;
}
return e;
},
getWorldPosition: function(t) {
t = t || cc.v2();
if (this._b2Body) {
var e = this._b2Body.GetPosition();
t.x = e.x * n;
t.y = e.y * n;
}
return t;
},
getWorldRotation: function() {
return this._b2Body ? this._b2Body.GetAngle() * r : 0;
},
getLocalCenter: function(t) {
t = t || cc.v2();
if (this._b2Body) {
var e = this._b2Body.GetLocalCenter();
t.x = e.x * n;
t.y = e.y * n;
}
return t;
},
getWorldCenter: function(t) {
t = t || cc.v2();
if (this._b2Body) {
var e = this._b2Body.GetWorldCenter();
t.x = e.x * n;
t.y = e.y * n;
}
return t;
},
getLinearVelocityFromWorldPoint: function(t, e) {
e = e || cc.v2();
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
var i = this._b2Body.GetLinearVelocityFromWorldPoint(a);
e.x = i.x * n;
e.y = i.y * n;
}
return e;
},
getMass: function() {
return this._b2Body ? this._b2Body.GetMass() : 0;
},
getInertia: function() {
return this._b2Body ? this._b2Body.GetInertia() * n * n : 0;
},
getJointList: function() {
if (!this._b2Body) return [];
for (var t = this._b2Body.GetJointList(), e = 0; e < t.length; e++) t[e] = t[e]._joint;
return t;
},
applyForce: function(t, e, i) {
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
l.Set(e.x / n, e.y / n);
this._b2Body.ApplyForce(a, l, i);
}
},
applyForceToCenter: function(t, e) {
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
this._b2Body.ApplyForceToCenter(a, e);
}
},
applyTorque: function(t, e) {
this._b2Body && this._b2Body.ApplyTorque(t / n, e);
},
applyLinearImpulse: function(t, e, i) {
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
l.Set(e.x / n, e.y / n);
this._b2Body.ApplyLinearImpulse(a, l, i);
}
},
applyAngularImpulse: function(t, e) {
this._b2Body && this._b2Body.ApplyAngularImpulse(t / n / n, e);
},
syncPosition: function(t) {
var e = this._b2Body;
if (e) {
var i, o = this.node.convertToWorldSpaceAR(h);
(i = a).x = o.x / n;
i.y = o.y / n;
if (this.type === c.Animated && t) {
var r = e.GetPosition(), s = cc.game.config.frameRate;
i.x = (i.x - r.x) * s;
i.y = (i.y - r.y) * s;
e.SetAwake(!0);
e.SetLinearVelocity(i);
} else e.SetTransform(i, e.GetAngle());
}
},
syncRotation: function(t) {
var e = this._b2Body;
if (e) {
var i = o * s(this.node);
if (this.type === c.Animated && t) {
var n = e.GetAngle(), r = cc.game.config.frameRate;
e.SetAwake(!0);
e.SetAngularVelocity((i - n) * r);
} else e.SetTransform(e.GetPosition(), i);
}
},
resetVelocity: function() {
var t = this._b2Body;
if (t) {
var e = a;
e.Set(0, 0);
t.SetLinearVelocity(e);
t.SetAngularVelocity(0);
}
},
onEnable: function() {
this._init();
},
onDisable: function() {
this._destroy();
},
_registerNodeEvents: function() {
var t = this.node;
t.on("position-changed", this._onNodePositionChanged, this);
t.on("rotation-changed", this._onNodeRotationChanged, this);
t.on("scale-changed", this._onNodeScaleChanged, this);
},
_unregisterNodeEvents: function() {
var t = this.node;
t.off("position-changed", this._onNodePositionChanged, this);
t.off("rotation-changed", this._onNodeRotationChanged, this);
t.off("scale-changed", this._onNodeScaleChanged, this);
},
_onNodePositionChanged: function() {
this.syncPosition(!0);
},
_onNodeRotationChanged: function(t) {
this.syncRotation(!0);
},
_onNodeScaleChanged: function(t) {
if (this._b2Body) for (var e = this.getComponents(cc.PhysicsCollider), i = 0; i < e.length; i++) e[i].apply();
},
_init: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__init", []);
},
_destroy: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__destroy", []);
},
__init: function() {
if (!this._inited) {
this._registerNodeEvents();
var t = new b2.BodyDef();
this.type === c.Animated ? t.type = c.Kinematic : t.type = this.type;
t.allowSleep = this.allowSleep;
t.gravityScale = this.gravityScale;
t.linearDamping = this.linearDamping;
t.angularDamping = this.angularDamping;
var e = this.linearVelocity;
t.linearVelocity = new b2.Vec2(e.x / n, e.y / n);
t.angularVelocity = this.angularVelocity * o;
t.fixedRotation = this.fixedRotation;
t.bullet = this.bullet;
var i = this.node, r = i.convertToWorldSpaceAR(h);
t.position = new b2.Vec2(r.x / n, r.y / n);
t.angle = -Math.PI / 180 * s(i);
cc.director.getPhysicsManager()._addBody(this, t);
this._inited = !0;
}
},
__destroy: function() {
if (this._inited) {
cc.director.getPhysicsManager()._removeBody(this);
this._unregisterNodeEvents();
this._inited = !1;
}
},
_getBody: function() {
return this._b2Body;
}
});
cc.RigidBody = e.exports = u;
}), {
"./CCPhysicsTypes": 108,
"./utils": 126
} ],
111: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.PhysicsBoxCollider",
extends: cc.PhysicsCollider,
mixins: [ cc.Collider.Box ],
editor: {
menu: !1,
requireComponent: cc.RigidBody
},
_createShape: function(t) {
var e = Math.abs(t.x), i = Math.abs(t.y), o = this.size.width / 2 / n * e, r = this.size.height / 2 / n * i, s = this.offset.x / n * e, c = this.offset.y / n * i, a = new b2.PolygonShape();
a.SetAsBox(o, r, new b2.Vec2(s, c), 0);
return a;
}
});
cc.PhysicsBoxCollider = e.exports = o;
}), {
"../CCPhysicsTypes": 108
} ],
112: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.PhysicsChainCollider",
extends: cc.PhysicsCollider,
editor: {
menu: !1,
inspector: !1,
requireComponent: cc.RigidBody
},
properties: {
loop: !1,
points: {
default: function() {
return [ cc.v2(-50, 0), cc.v2(50, 0) ];
},
type: [ cc.Vec2 ]
},
threshold: {
default: 1,
serializable: !1,
visible: !1
}
},
_createShape: function(t) {
for (var e = new b2.ChainShape(), i = this.points, o = [], r = 0; r < i.length; r++) {
var s = i[r];
o.push(new b2.Vec2(s.x / n * t.x, s.y / n * t.y));
}
this.loop ? e.CreateLoop(o, o.length) : e.CreateChain(o, o.length);
return e;
},
resetInEditor: !1,
resetPointsByContour: !1
});
cc.PhysicsChainCollider = e.exports = o;
}), {
"../CCPhysicsTypes": 108
} ],
113: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.PhysicsCircleCollider",
extends: cc.PhysicsCollider,
mixins: [ cc.Collider.Circle ],
editor: {
menu: !1,
requireComponent: cc.RigidBody
},
_createShape: function(t) {
var e = Math.abs(t.x), i = Math.abs(t.y), o = this.offset.x / n * e, r = this.offset.y / n * i, s = new b2.CircleShape();
s.m_radius = this.radius / n * e;
s.m_p = new b2.Vec2(o, r);
return s;
}
});
cc.PhysicsCircleCollider = e.exports = o;
}), {
"../CCPhysicsTypes": 108
} ],
114: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../utils").getWorldScale, r = cc.Class({
name: "cc.PhysicsCollider",
extends: cc.Collider,
ctor: function() {
this._fixtures = [];
this._shapes = [];
this._inited = !1;
this._rect = cc.rect();
},
properties: {
_density: 1,
_sensor: !1,
_friction: .2,
_restitution: 0,
density: {
tooltip: !1,
get: function() {
return this._density;
},
set: function(t) {
this._density = t;
}
},
sensor: {
tooltip: !1,
get: function() {
return this._sensor;
},
set: function(t) {
this._sensor = t;
}
},
friction: {
tooltip: !1,
get: function() {
return this._friction;
},
set: function(t) {
this._friction = t;
}
},
restitution: {
tooltip: !1,
get: function() {
return this._restitution;
},
set: function(t) {
this._restitution = t;
}
},
body: {
default: null,
type: cc.RigidBody,
visible: !1
}
},
onDisable: function() {
this._destroy();
},
onEnable: function() {
this._init();
},
start: function() {
this._init();
},
_getFixtureIndex: function(t) {
return this._fixtures.indexOf(t);
},
_init: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__init", []);
},
_destroy: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__destroy", []);
},
__init: function() {
if (!this._inited) {
var t = this.body || this.getComponent(cc.RigidBody);
if (t) {
var e = t._getBody();
if (e) {
var i = t.node, n = o(i), r = 0 === n.x && 0 === n.y ? [] : this._createShape(n);
r instanceof Array || (r = [ r ]);
for (var s = 1 << i.groupIndex, c = 0, a = cc.game.collisionMatrix[i.groupIndex], l = 0; l < a.length; l++) a[l] && (c |= 1 << l);
for (var h = {
categoryBits: s,
maskBits: c,
groupIndex: 0
}, u = cc.director.getPhysicsManager(), d = 0; d < r.length; d++) {
var f = r[d], _ = new b2.FixtureDef();
_.density = this.density;
_.isSensor = this.sensor;
_.friction = this.friction;
_.restitution = this.restitution;
_.shape = f;
_.filter = h;
var p = e.CreateFixture(_);
p.collider = this;
t.enabledContactListener && u._registerContactFixture(p);
this._shapes.push(f);
this._fixtures.push(p);
}
this.body = t;
this._inited = !0;
}
}
}
},
__destroy: function() {
if (this._inited) {
for (var t = this._fixtures, e = this.body._getBody(), i = cc.director.getPhysicsManager(), n = t.length - 1; n >= 0; n--) {
var o = t[n];
o.collider = null;
cc.sys.isObjectValid(o) && i._unregisterContactFixture(o);
e && e.DestroyFixture(o);
}
this.body = null;
this._fixtures.length = 0;
this._shapes.length = 0;
this._inited = !1;
}
},
_createShape: function() {},
apply: function() {
this._destroy();
this._init();
},
getAABB: function() {
for (var t = 1e7, e = 1e7, i = -1e7, o = -1e7, r = this._fixtures, s = 0; s < r.length; s++) for (var c = r[s], a = c.GetShape().GetChildCount(), l = 0; l < a; l++) {
var h = c.GetAABB(l);
h.lowerBound.x < t && (t = h.lowerBound.x);
h.lowerBound.y < e && (e = h.lowerBound.y);
h.upperBound.x > i && (i = h.upperBound.x);
h.upperBound.y > o && (o = h.upperBound.y);
}
t *= n;
e *= n;
i *= n;
o *= n;
var u = this._rect;
u.x = t;
u.y = e;
u.width = i - t;
u.height = o - e;
return u;
}
});
cc.PhysicsCollider = e.exports = r;
}), {
"../CCPhysicsTypes": 108,
"../utils": 126
} ],
115: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPolygonSeparator"), r = cc.Class({
name: "cc.PhysicsPolygonCollider",
extends: cc.PhysicsCollider,
mixins: [ cc.Collider.Polygon ],
editor: {
menu: !1,
inspector: !1,
requireComponent: cc.RigidBody
},
_createShape: function(t) {
var e = [], i = this.points;
i.length > 0 && i[0].equals(i[i.length - 1]) && (i.length -= 1);
for (var r = o.ConvexPartition(i), s = this.offset, c = 0; c < r.length; c++) {
for (var a = r[c], l = null, h = [], u = null, d = 0, f = a.length; d < f; d++) {
l || (l = new b2.PolygonShape());
var _ = a[d], p = (_.x + s.x) / n * t.x, g = (_.y + s.y) / n * t.y, v = new b2.Vec2(p, g);
h.push(v);
u || (u = v);
if (h.length === b2.maxPolygonVertices) {
l.Set(h, h.length);
e.push(l);
l = null;
d < f - 1 && (h = [ u, h[h.length - 1] ]);
}
}
if (l) {
l.Set(h, h.length);
e.push(l);
}
}
return e;
}
});
cc.PhysicsPolygonCollider = e.exports = r;
}), {
"../CCPhysicsTypes": 108,
"../CCPolygonSeparator": 109
} ],
116: [ (function(t, e, i) {
0;
t("./CCPhysicsManager");
t("./CCRigidBody");
t("./CCPhysicsContact");
t("./collider/CCPhysicsCollider");
t("./collider/CCPhysicsChainCollider");
t("./collider/CCPhysicsCircleCollider");
t("./collider/CCPhysicsBoxCollider");
t("./collider/CCPhysicsPolygonCollider");
t("./joint/CCJoint");
t("./joint/CCDistanceJoint");
t("./joint/CCRevoluteJoint");
t("./joint/CCMouseJoint");
t("./joint/CCMotorJoint");
t("./joint/CCPrismaticJoint");
t("./joint/CCWeldJoint");
t("./joint/CCWheelJoint");
t("./joint/CCRopeJoint");
0;
}), {
"../../../external/box2d/box2d": 1,
"./CCPhysicsContact": 106,
"./CCPhysicsManager": 107,
"./CCRigidBody": 110,
"./collider/CCPhysicsBoxCollider": 111,
"./collider/CCPhysicsChainCollider": 112,
"./collider/CCPhysicsCircleCollider": 113,
"./collider/CCPhysicsCollider": 114,
"./collider/CCPhysicsPolygonCollider": 115,
"./joint/CCDistanceJoint": 117,
"./joint/CCJoint": 118,
"./joint/CCMotorJoint": 119,
"./joint/CCMouseJoint": 120,
"./joint/CCPrismaticJoint": 121,
"./joint/CCRevoluteJoint": 122,
"./joint/CCRopeJoint": 123,
"./joint/CCWeldJoint": 124,
"./joint/CCWheelJoint": 125,
"./platform/CCPhysicsAABBQueryCallback": 1,
"./platform/CCPhysicsContactListner": 1,
"./platform/CCPhysicsDebugDraw": 1,
"./platform/CCPhysicsRayCastCallback": 1,
"./platform/CCPhysicsUtils": 1
} ],
117: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.DistanceJoint",
extends: cc.Joint,
editor: !1,
properties: {
_distance: 1,
_frequency: 0,
_dampingRatio: 0,
distance: {
tooltip: !1,
get: function() {
return this._distance;
},
set: function(t) {
this._distance = t;
this._joint && this._joint.SetLength(t);
}
},
frequency: {
tooltip: !1,
get: function() {
return this._frequency;
},
set: function(t) {
this._frequency = t;
this._joint && this._joint.SetFrequency(t);
}
},
dampingRatio: {
tooltip: !1,
get: function() {
return this._dampingRatio;
},
set: function(t) {
this._dampingRatio = t;
this._joint && this._joint.SetDampingRatio(t);
}
}
},
_createJointDef: function() {
var t = new b2.DistanceJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.length = this.distance / n;
t.dampingRatio = this.dampingRatio;
t.frequencyHz = this.frequency;
return t;
}
});
cc.DistanceJoint = e.exports = o;
}), {
"../CCPhysicsTypes": 108
} ],
118: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.Joint",
extends: cc.Component,
editor: {
requireComponent: cc.RigidBody
},
properties: {
anchor: {
default: cc.v2(0, 0),
tooltip: !1
},
connectedAnchor: {
default: cc.v2(0, 0),
tooltip: !1
},
connectedBody: {
default: null,
type: cc.RigidBody,
tooltip: !1
},
collideConnected: {
default: !1,
tooltip: !1
}
},
onDisable: function() {
this._destroy();
},
onEnable: function() {
this._init();
},
start: function() {
this._init();
},
apply: function() {
this._destroy();
this._init();
},
getWorldAnchor: function() {
if (this._joint) {
var t = this._joint.GetAnchorA();
return cc.v2(t.x * n, t.y * n);
}
return cc.Vec2.ZERO;
},
getWorldConnectedAnchor: function() {
if (this._joint) {
var t = this._joint.GetAnchorB();
return cc.v2(t.x * n, t.y * n);
}
return cc.Vec2.ZERO;
},
getReactionForce: function(t) {
return this._joint ? this._joint.GetReactionForce(t) : 0;
},
getReactionTorque: function(t) {
return this._joint ? this._joint.GetReactionTorque(t) : 0;
},
_init: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__init", []);
},
_destroy: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__destroy", []);
},
__init: function() {
if (!this._inited) {
this.body = this.getComponent(cc.RigidBody);
if (this._isValid()) {
var t = cc.director.getPhysicsManager()._getWorld(), e = this._createJointDef();
if (!e) return;
e.bodyA = this.body._getBody();
e.bodyB = this.connectedBody._getBody();
e.collideConnected = this.collideConnected;
this._joint = t.CreateJoint(e);
this._joint && (this._joint._joint = this);
this._inited = !0;
}
}
},
__destroy: function() {
if (this._inited) {
this._isValid() && cc.director.getPhysicsManager()._getWorld().DestroyJoint(this._joint);
this._joint && (this._joint._joint = null);
this._joint = null;
this._inited = !1;
}
},
_createJointDef: function() {
return null;
},
_isValid: function() {
return this.body && this.body._getBody() && this.connectedBody && this.connectedBody._getBody();
}
});
cc.Joint = e.exports = o;
}), {
"../CCPhysicsTypes": 108
} ],
119: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = cc.Class({
name: "cc.MotorJoint",
extends: cc.Joint,
editor: !1,
properties: {
_linearOffset: cc.v2(0, 0),
_angularOffset: 0,
_maxForce: 1,
_maxTorque: 1,
_correctionFactor: .3,
anchor: {
tooltip: !1,
default: cc.v2(0, 0),
override: !0,
visible: !1
},
connectedAnchor: {
tooltip: !1,
default: cc.v2(0, 0),
override: !0,
visible: !1
},
linearOffset: {
tooltip: !1,
get: function() {
return this._linearOffset;
},
set: function(t) {
this._linearOffset = t;
this._joint && this._joint.SetLinearOffset(new b2.Vec2(t.x / n, t.y / n));
}
},
angularOffset: {
tooltip: !1,
get: function() {
return this._angularOffset;
},
set: function(t) {
this._angularOffset = t;
this._joint && this._joint.SetAngularOffset(t);
}
},
maxForce: {
tooltip: !1,
get: function() {
return this._maxForce;
},
set: function(t) {
this._maxForce = t;
this._joint && this._joint.SetMaxForce(t);
}
},
maxTorque: {
tooltip: !1,
get: function() {
return this._maxTorque;
},
set: function(t) {
this._maxTorque = t;
this._joint && this._joint.SetMaxTorque(t);
}
},
correctionFactor: {
tooltip: !1,
get: function() {
return this._correctionFactor;
},
set: function(t) {
this._correctionFactor = t;
this._joint && this._joint.SetCorrectionFactor(t);
}
}
},
_createJointDef: function() {
var t = new b2.MotorJointDef();
t.linearOffset = new b2.Vec2(this.linearOffset.x / n, this.linearOffset.y / n);
t.angularOffset = this.angularOffset * o;
t.maxForce = this.maxForce;
t.maxTorque = this.maxTorque;
t.correctionFactor = this.correctionFactor;
return t;
}
});
cc.MotorJoint = e.exports = r;
}), {
"../CCPhysicsTypes": 108
} ],
120: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = new b2.Vec2(), r = cc.Class({
name: "cc.MouseJoint",
extends: cc.Joint,
editor: !1,
properties: {
_target: 1,
_frequency: 5,
_dampingRatio: .7,
_maxForce: 0,
connectedBody: {
default: null,
type: cc.RigidBody,
visible: !1,
override: !0
},
collideConnected: {
default: !0,
visible: !1,
override: !0
},
anchor: {
tooltip: !1,
default: cc.v2(0, 0),
override: !0,
visible: !1
},
connectedAnchor: {
tooltip: !1,
default: cc.v2(0, 0),
override: !0,
visible: !1
},
mouseRegion: {
tooltip: !1,
default: null,
type: cc.Node
},
target: {
tooltip: !1,
visible: !1,
get: function() {
return this._target;
},
set: function(t) {
this._target = t;
if (this._joint) {
o.x = t.x / n;
o.y = t.y / n;
this._joint.SetTarget(o);
}
}
},
frequency: {
tooltip: !1,
get: function() {
return this._frequency;
},
set: function(t) {
this._frequency = t;
this._joint && this._joint.SetFrequency(t);
}
},
dampingRatio: {
tooltip: !1,
get: function() {
return this._dampingRatio;
},
set: function(t) {
this._dampingRatio = t;
this._joint && this._joint.SetDampingRatio(t);
}
},
maxForce: {
tooltip: !1,
visible: !1,
get: function() {
return this._maxForce;
},
set: function(t) {
this._maxForce = t;
this._joint && this._joint.SetMaxForce(t);
}
}
},
onLoad: function() {
var t = this.mouseRegion || this.node;
t.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
t.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
t.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
},
onEnable: function() {},
start: function() {},
onTouchBegan: function(t) {
var e = cc.director.getPhysicsManager(), i = this._pressPoint = t.touch.getLocation();
cc.Camera && cc.Camera.main && (i = cc.Camera.main.getCameraToWorldPoint(i));
var n = e.testPoint(i);
if (n) {
(this.connectedBody = n.body).awake = !0;
this.maxForce = 1e3 * this.connectedBody.getMass();
this.target = i;
this._init();
}
},
onTouchMove: function(t) {
this._pressPoint = t.touch.getLocation();
},
onTouchEnd: function(t) {
this._destroy();
this._pressPoint = null;
},
_createJointDef: function() {
var t = new b2.MouseJointDef();
o.x = this.target.x / n;
o.y = this.target.y / n;
t.target = o;
t.maxForce = this.maxForce;
t.dampingRatio = this.dampingRatio;
t.frequencyHz = this.frequency;
return t;
},
update: function() {
this._pressPoint && this._isValid() && (cc.Camera && cc.Camera.main ? this.target = cc.Camera.main.getCameraToWorldPoint(this._pressPoint) : this.target = this._pressPoint);
}
});
cc.MouseJoint = e.exports = r;
}), {
"../CCPhysicsTypes": 108
} ],
121: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = cc.Class({
name: "cc.PrismaticJoint",
extends: cc.Joint,
editor: !1,
properties: {
localAxisA: {
default: cc.v2(1, 0),
tooltip: !1
},
referenceAngle: {
default: 0,
tooltip: !1
},
enableLimit: {
default: !1,
tooltip: !1
},
enableMotor: {
default: !1,
tooltip: !1
},
lowerLimit: {
default: 0,
tooltip: !1
},
upperLimit: {
default: 0,
tooltip: !1
},
_maxMotorForce: 0,
_motorSpeed: 0,
maxMotorForce: {
tooltip: !1,
get: function() {
return this._maxMotorForce;
},
set: function(t) {
this._maxMotorForce = t;
this._joint && this._joint.SetMaxMotorForce(t);
}
},
motorSpeed: {
tooltip: !1,
get: function() {
return this._motorSpeed;
},
set: function(t) {
this._motorSpeed = t;
this._joint && this._joint.SetMotorSpeed(t);
}
}
},
_createJointDef: function() {
var t = new b2.PrismaticJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.localAxisA = new b2.Vec2(this.localAxisA.x, this.localAxisA.y);
t.referenceAngle = this.referenceAngle * o;
t.enableLimit = this.enableLimit;
t.lowerTranslation = this.lowerLimit / n;
t.upperTranslation = this.upperLimit / n;
t.enableMotor = this.enableMotor;
t.maxMotorForce = this.maxMotorForce;
t.motorSpeed = this.motorSpeed;
return t;
}
});
cc.PrismaticJoint = e.exports = r;
}), {
"../CCPhysicsTypes": 108
} ],
122: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = t("../CCPhysicsTypes").PHYSICS_ANGLE_TO_ANGLE, s = cc.Class({
name: "cc.RevoluteJoint",
extends: cc.Joint,
editor: !1,
properties: {
_maxMotorTorque: 0,
_motorSpeed: 0,
_enableLimit: !1,
_enableMotor: !1,
referenceAngle: {
default: 0,
tooltip: !1
},
lowerAngle: {
default: 0,
tooltip: !1
},
upperAngle: {
default: 0,
tooltip: !1
},
maxMotorTorque: {
tooltip: !1,
get: function() {
return this._maxMotorTorque;
},
set: function(t) {
this._maxMotorTorque = t;
this._joint && this._joint.SetMaxMotorTorque(t);
}
},
motorSpeed: {
tooltip: !1,
get: function() {
return this._motorSpeed;
},
set: function(t) {
this._motorSpeed = t;
this._joint && this._joint.SetMotorSpeed(t * o);
}
},
enableLimit: {
tooltip: !1,
get: function() {
return this._enableLimit;
},
set: function(t) {
this._enableLimit = t;
this._joint && this._joint.EnableLimit(t);
}
},
enableMotor: {
tooltip: !1,
get: function() {
return this._enableMotor;
},
set: function(t) {
this._enableMotor = t;
this._joint && this._joint.EnableMotor(t);
}
}
},
getJointAngle: function() {
return this._joint ? this._joint.GetJointAngle() * r : 0;
},
_createJointDef: function() {
var t = new b2.RevoluteJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.lowerAngle = (this.upperAngle + 90) * o;
t.upperAngle = (this.lowerAngle + 90) * o;
t.maxMotorTorque = this.maxMotorTorque;
t.motorSpeed = this.motorSpeed * o;
t.enableLimit = this.enableLimit;
t.enableMotor = this.enableMotor;
t.referenceAngle = this.referenceAngle * o;
return t;
}
});
cc.RevoluteJoint = e.exports = s;
}), {
"../CCPhysicsTypes": 108
} ],
123: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.RopeJoint",
extends: cc.Joint,
editor: !1,
properties: {
_maxLength: 1,
maxLength: {
tooltip: !1,
get: function() {
return this._maxLength;
},
set: function(t) {
this._maxLength = t;
this._joint && this._joint.SetMaxLength(t);
}
}
},
_createJointDef: function() {
var t = new b2.RopeJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.maxLength = this.maxLength / n;
return t;
}
});
cc.RopeJoint = e.exports = o;
}), {
"../CCPhysicsTypes": 108
} ],
124: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = cc.Class({
name: "cc.WeldJoint",
extends: cc.Joint,
editor: !1,
properties: {
referenceAngle: {
default: 0,
tooltip: !1
},
_frequency: 0,
_dampingRatio: 0,
frequency: {
tooltip: !1,
get: function() {
return this._frequency;
},
set: function(t) {
this._frequency = t;
this._joint && this._joint.SetFrequency(t);
}
},
dampingRatio: {
tooltip: !1,
get: function() {
return this._dampingRatio;
},
set: function(t) {
this._dampingRatio = t;
this._joint && this._joint.SetDampingRatio(t);
}
}
},
_createJointDef: function() {
var t = new b2.WeldJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.referenceAngle = this.referenceAngle * o;
t.frequencyHz = this.frequency;
t.dampingRatio = this.dampingRatio;
return t;
}
});
cc.WeldJoint = e.exports = r;
}), {
"../CCPhysicsTypes": 108
} ],
125: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = cc.Class({
name: "cc.WheelJoint",
extends: cc.Joint,
editor: !1,
properties: {
_maxMotorTorque: 0,
_motorSpeed: 0,
_enableMotor: !1,
_frequency: 2,
_dampingRatio: .7,
localAxisA: {
default: cc.v2(1, 0),
tooltip: !1
},
maxMotorTorque: {
tooltip: !1,
get: function() {
return this._maxMotorTorque;
},
set: function(t) {
this._maxMotorTorque = t;
this._joint && this._joint.SetMaxMotorTorque(t);
}
},
motorSpeed: {
tooltip: !1,
get: function() {
return this._motorSpeed;
},
set: function(t) {
this._motorSpeed = t;
this._joint && this._joint.SetMotorSpeed(t * o);
}
},
enableMotor: {
tooltip: !1,
get: function() {
return this._enableMotor;
},
set: function(t) {
this._enableMotor = t;
this._joint && this._joint.EnableMotor(t);
}
},
frequency: {
tooltip: !1,
get: function() {
return this._frequency;
},
set: function(t) {
this._frequency = t;
this._joint && this._joint.SetFrequency(t);
}
},
dampingRatio: {
tooltip: !1,
get: function() {
return this._dampingRatio;
},
set: function(t) {
this._dampingRatio = t;
this._joint && this._joint.SetDampingRatio(t);
}
}
},
_createJointDef: function() {
var t = new b2.WheelJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.localAxisA = new b2.Vec2(this.localAxisA.x, this.localAxisA.y);
t.maxMotorTorque = this.maxMotorTorque;
t.motorSpeed = this.motorSpeed * o;
t.enableMotor = this.enableMotor;
t.dampingRatio = this.dampingRatio;
t.frequencyHz = this.frequency;
return t;
}
});
cc.WheelJoint = e.exports = r;
}), {
"../CCPhysicsTypes": 108
} ],
126: [ (function(t, e, i) {
e.exports = {
getWorldRotation: function(t) {
for (var e = t.rotationX, i = t.parent; i.parent; ) {
e += i.rotationX;
i = i.parent;
}
return e;
},
getWorldScale: function(t) {
for (var e = t.scaleX, i = t.scaleY, n = t.parent; n.parent; ) {
e *= n.scaleX;
i *= n.scaleY;
n = n.parent;
}
return cc.v2(e, i);
},
convertToNodeRotation: function(t, e) {
e -= t.rotationX;
for (var i = t.parent; i.parent; ) {
e -= i.rotationX;
i = i.parent;
}
return e;
}
};
}), {} ],
127: [ (function(i, n, o) {
i("../assets/CCAsset");
var r = i("./utils").callInNextTick, s = i("../load-pipeline/CCLoader"), c = i("../load-pipeline/pack-downloader"), a = i("../load-pipeline/auto-release-utils"), l = i("../utils/decode-uuid"), h = i("../load-pipeline/md5-pipe"), u = "", d = "", f = {};
function _(t) {
return t && (t.constructor === cc.SceneAsset || t instanceof cc.Scene);
}
function p(t, e) {
this.url = t;
this.type = e;
}
var g = {
loadAsset: function(i, n, o) {
if ("string" !== ("object" === (e = typeof i) ? t(i) : e)) return r(n, new Error("[AssetLibrary] uuid must be string"), null);
var c = {
uuid: i,
type: "uuid"
};
o && o.existingAsset && (c.existingAsset = o.existingAsset);
s.load(c, (function(t, e) {
if (t || !e) t = new Error("[AssetLibrary] loading JSON or dependencies failed: " + (t ? t.message : "Unknown error")); else {
if (e.constructor === cc.SceneAsset) {
var o = cc.loader._getReferenceKey(i);
e.scene.dependAssets = a.getDependsRecursively(o);
}
if (_(e)) {
var r = cc.loader._getReferenceKey(i);
s.removeItem(r);
}
}
n && n(t, e);
}));
},
getLibUrlNoExt: function(t, e) {
t = l(t);
return (e ? d + "assets/" : u) + t.slice(0, 2) + "/" + t;
},
_queryAssetInfoInEditor: function(t, e) {
0;
},
_getAssetInfoInRuntime: function(t, e) {
e = e || {
url: null,
raw: !1
};
var i = f[t];
if (i && !cc.isChildClassOf(i.type, cc.Asset)) {
e.url = d + i.url;
e.raw = !0;
} else {
e.url = this.getLibUrlNoExt(t) + ".json";
e.raw = !1;
}
return e;
},
_uuidInSettings: function(t) {
return t in f;
},
queryAssetInfo: function(t, e) {
var i = this._getAssetInfoInRuntime(t);
e(null, i.url, i.raw);
},
parseUuidInEditor: function(t) {},
loadJson: function(t, e) {
var i = "" + (new Date().getTime() + Math.random()), n = {
uuid: i,
type: "uuid",
content: t,
skips: [ s.assetLoader.id, s.downloader.id ]
};
s.load(n, (function(t, n) {
if (t) t = new Error("[AssetLibrary] loading JSON or dependencies failed: " + t.message); else {
if (n.constructor === cc.SceneAsset) {
var o = cc.loader._getReferenceKey(i);
n.scene.dependAssets = a.getDependsRecursively(o);
}
if (_(n)) {
var r = cc.loader._getReferenceKey(i);
s.removeItem(r);
}
}
n._uuid = "";
e && e(t, n);
}));
},
getAssetByUuid: function(t) {
return g._uuidToAsset[t] || null;
},
init: function(t) {
0;
var e = t.libraryPath;
e = e.replace(/\\/g, "/");
u = cc.path.stripSep(e) + "/";
d = t.rawAssetsBase;
var i = t.md5AssetsMap;
if (i) {
var n = new h(i, u, d);
cc.loader.insertPipeAfter(cc.loader.assetLoader, n);
cc.loader.md5Pipe = n;
}
var o = s._resources;
o.reset();
var r = t.rawAssets;
if (r) for (var a in r) {
var l = r[a];
for (var _ in l) {
var g = l[_], v = g[0], y = g[1], m = cc.js._getClassById(y);
if (m) {
f[_] = new p(a + "/" + v, m);
if ("assets" === a) {
var C = cc.path.extname(v);
C && (v = v.slice(0, -C.length));
var T = 1 === g[2];
o.add(v, _, m, !T);
}
} else cc.error("Cannot get", y);
}
}
t.packedAssets && c.initPacks(t.packedAssets);
cc.url._init(t.mountPaths && t.mountPaths.assets || d + "assets");
},
_uuidToAsset: {}
};
n.exports = cc.AssetLibrary = g;
}), {
"../assets/CCAsset": 17,
"../load-pipeline/CCLoader": 89,
"../load-pipeline/auto-release-utils": 92,
"../load-pipeline/md5-pipe": 97,
"../load-pipeline/pack-downloader": 98,
"../utils/decode-uuid": 153,
"./utils": 147
} ],
128: [ (function(i, n, o) {
var r = i("./js"), s = i("./CCEnum"), c = i("./utils"), a = (c.isPlainEmptyObj_DEV, 
c.cloneable_DEV, i("./attribute")), l = a.DELIMETER, h = a.getTypeChecker, u = i("./preprocess-class");
i("./requiring-frame");
var d = [ "name", "extends", "mixins", "ctor", "__ctor__", "properties", "statics", "editor", "__ES6__" ];
function f(t, e) {
t.indexOf(e) < 0 && t.push(e);
}
var _ = {
datas: null,
push: function(t) {
if (this.datas) this.datas.push(t); else {
this.datas = [ t ];
var e = this;
setTimeout((function() {
e.init();
}), 0);
}
},
init: function() {
var i = this.datas;
if (i) {
for (var n = 0; n < i.length; ++n) {
var o = i[n], s = o.cls, c = o.props;
"function" === ("object" === (e = typeof c) ? t(c) : e) && (c = c());
var a = r.getClassName(s);
c ? w(s, a, c, s.$super, o.mixins) : cc.errorID(3633, a);
}
this.datas = null;
}
}
};
function p(t, e) {
0;
f(t.__props__, e);
}
var g = [];
function v(t, e, i, n, o) {
var r = n.default;
0;
a.setClassAttr(t, i, "default", r);
p(t, i);
var s = P(t, n, e, i, !1);
if (s) {
for (var c = g, l = 0; l < s.length; l++) {
var h = s[l];
a.attr(t, i, h);
h._onAfterProp && c.push(h._onAfterProp);
}
for (var u = 0; u < c.length; u++) c[u](t, i);
g.length = 0;
s.length = 0;
}
}
function y(t, e, i, n, o) {
var s = n.get, c = n.set, l = t.prototype, h = Object.getOwnPropertyDescriptor(l, i), u = !h;
if (s) {
0;
for (var d = P(t, n, e, i, !0), f = 0; f < d.length; f++) a.attr(t, i, d[f]);
d.length = 0;
a.setClassAttr(t, i, "serializable", !1);
0;
o || r.get(l, i, s, u, u);
0;
}
if (c) {
if (!o) {
0;
r.set(l, i, c, u, u);
}
0;
}
}
function m(i) {
return "function" === ("object" === (e = typeof i) ? t(i) : e) ? i() : i;
}
function C(t, e, i) {
for (var n in e) t.hasOwnProperty(n) || i && !i(n) || Object.defineProperty(t, n, r.getPropertyDescriptor(e, n));
}
function T(t, e, i, n) {
var o, s, c = n.__ctor__, l = n.ctor, h = n.__ES6__;
if (h) {
o = [ l ];
s = l;
} else {
o = c ? [ c ] : (function(t, e, i) {
function n(t) {
return I._isCCClass(t) ? t.__ctors__ || [] : [ t ];
}
for (var o = [], r = [ t ].concat(e), s = 0; s < r.length; s++) {
var c = r[s];
if (c) for (var a = n(c), l = 0; l < a.length; l++) f(o, a[l]);
}
var h = i.ctor;
h && o.push(h);
return o;
})(e, i, n);
s = A(o, e, t, n);
r.value(s, "extend", (function(t) {
t.extends = this;
return I(t);
}), !0);
}
r.value(s, "__ctors__", o.length > 0 ? o : null, !0);
var u = s.prototype;
if (e) {
if (!h) {
r.extend(s, e);
u = s.prototype;
}
s.$super = e;
0;
}
if (i) {
for (var d = i.length - 1; d >= 0; d--) {
var _ = i[d];
C(u, _.prototype);
C(s, _, (function(t) {
return _.hasOwnProperty(t) && !0;
}));
I._isCCClass(_) && C(a.getClassAttrs(s).constructor.prototype, a.getClassAttrs(_).constructor.prototype);
}
u.constructor = s;
}
h || (u.__initProps__ = x);
r.setClassName(t, s);
return s;
}
function b(i) {
for (var n = r.getClassName(i), o = i.constructor, s = "new " + n + "(", c = 0; c < o.__props__.length; c++) {
var a = i[o.__props__[c]];
if ("object" === ("object" === (e = typeof a) ? t(a) : e)) {
cc.errorID(3641, n);
return "new " + n + "()";
}
s += a;
c < o.__props__.length - 1 && (s += ",");
}
return s + ")";
}
function S(t) {
return JSON.stringify(t).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
var E = /^[A-Za-z_$][0-9A-Za-z_$]*$/;
function x(i) {
var n = a.getClassAttrs(i), o = i.__props__;
if (null === o) {
_.init();
o = i.__props__;
}
var r = (function(i, n) {
for (var o = [], r = "", s = 0; s < n.length; s++) {
var c = n[s], a = c + l + "default";
if (a in i) {
var h, u;
h = E.test(c) ? "this." + c + "=" : "this[" + S(c) + "]=";
var d = i[a];
if ("object" === ("object" == (e = typeof d) ? t(d) : e) && d) u = d instanceof cc.ValueType ? b(d) : Array.isArray(d) ? "[]" : "{}"; else if ("function" === ("object" == (e = typeof d) ? t(d) : e)) {
var f = o.length;
o.push(d);
u = "F[" + f + "]()";
} else u = "string" === ("object" == (e = typeof d) ? t(d) : e) ? S(d) : d;
r += h = h + u + ";\n";
}
}
return 0 === o.length ? Function(r) : Function("F", "return (function(){\n" + r + "})")(o);
})(n, o);
i.prototype.__initProps__ = r;
r.call(this);
}
var A = function(t, e, i, n) {
var o = "return function CCClass(){\n";
e && O(e, n, i) && (o += "this._super=null;\n");
o += "this.__initProps__(CCClass);\n";
var r = t.length;
if (r > 0) {
var s = !(i && i.startsWith("cc."));
s && (o += "try{\n");
var c = "].apply(this,arguments);\n";
if (1 === r) o += "CCClass.__ctors__[0" + c; else {
o += "var cs=CCClass.__ctors__;\n";
for (var a = 0; a < r; a++) o += "cs[" + a + c;
}
s && (o += "}catch(e){\ncc._throw(e);\n}\n");
}
o += "}";
return Function(o)();
};
var N = /xyz/.test((function() {
xyz;
})) ? /\b\._super\b/ : /.*/;
/xyz/.test((function() {
xyz;
}));
function O(i, n, o) {
var s = !1;
for (var c in n) if (!(d.indexOf(c) >= 0)) {
var a = n[c];
if ("function" === ("object" === (e = typeof a) ? t(a) : e)) {
var l = r.getPropertyDescriptor(i.prototype, c);
if (l) {
var h = l.value;
if ("function" === ("object" === (e = typeof h) ? t(h) : e)) {
if (N.test(a)) {
s = !0;
n[c] = (function(t, e) {
return function() {
var i = this._super;
this._super = t;
var n = e.apply(this, arguments);
this._super = i;
return n;
};
})(h, a);
}
continue;
}
}
0;
}
}
return s;
}
function w(t, e, i, n, o, r) {
t.__props__ = [];
n && n.__props__ && (t.__props__ = n.__props__.slice());
if (o) for (var s = 0; s < o.length; ++s) {
var c = o[s];
c.__props__ && (t.__props__ = t.__props__.concat(c.__props__.filter((function(e) {
return t.__props__.indexOf(e) < 0;
}))));
}
if (i) {
u.preprocessAttrs(i, e, t, r);
for (var a in i) {
var l = i[a];
"default" in l ? v(t, e, a, l) : y(t, e, a, l, r);
}
}
}
function I(i) {
var n = (i = i || {}).name, o = i.extends, s = i.mixins, c = (function(t, e, i, n) {
var o = cc.Component, s = cc._RF.peek();
if (s && cc.isChildClassOf(e, o)) {
if (cc.isChildClassOf(s.cls, o)) {
cc.errorID(3615);
return null;
}
t = t || s.script;
}
var c = T(t, e, i, n);
if (s) if (cc.isChildClassOf(e, o)) {
var a = s.uuid;
a && r._setClassId(a, c);
s.cls = c;
} else cc.isChildClassOf(s.cls, o) || (s.cls = c);
return c;
})(n, o, s, i);
n || (n = cc.js.getClassName(c));
c._sealed = !0;
o && (o._sealed = !1);
var a = i.properties;
if ("function" === ("object" === (e = typeof a) ? t(a) : e) || o && null === o.__props__ || s && s.some((function(t) {
return null === t.__props__;
}))) {
_.push({
cls: c,
props: a,
mixins: s
});
c.__props__ = null;
} else w(c, n, a, o, i.mixins, i.__ES6__);
var l = i.statics;
if (l) {
var h;
0;
for (h in l) c[h] = l[h];
}
for (var f in i) if (!(d.indexOf(f) >= 0)) {
var p = i[f];
u.validateMethodWithProps(p, f, n, c, o) && r.value(c.prototype, f, p, !0, !0);
}
var g = i.editor;
g && cc.isChildClassOf(o, cc.Component) && cc.Component._registerEditorProps(c, g);
return c;
}
I._isCCClass = function(t) {
return t && t.hasOwnProperty("__ctors__");
};
I._fastDefine = function(t, e, i) {
r.setClassName(t, e);
for (var n = e.__props__ = Object.keys(i), o = a.getClassAttrsProto(e), s = 0; s < n.length; s++) {
var c = n[s];
o[c + l + "visible"] = !1;
o[c + l + "default"] = i[c];
}
};
I.Attr = a;
I.attr = a.attr;
cc.isChildClassOf = function(i, n) {
if (i && n) {
if ("function" !== ("object" === (e = typeof i) ? t(i) : e)) return !1;
if ("function" !== ("object" === (e = typeof n) ? t(n) : e)) {
0;
return !1;
}
if (i === n) return !0;
for (;;) {
if (!(i = r.getSuper(i))) return !1;
if (i === n) return !0;
}
}
return !1;
};
I.getInheritanceChain = function(t) {
for (var e = []; t = r.getSuper(t); ) t !== Object && e.push(t);
return e;
};
I.isInstanceOf = function(t, e) {
return t && cc.isChildClassOf(t.constructor, e);
};
var L = {
Integer: "Number",
Float: "Number",
Boolean: "Boolean",
String: "String"
}, R = [];
function P(i, n, o, r, c) {
var u = null, d = "";
function f() {
d = r + l;
return u = a.getClassAttrsProto(i);
}
R.length = 0;
var _ = R, p = n.type;
if (p) {
var g = L[p];
if (g) _.push({
type: p,
_onAfterProp: h(g, "cc." + p)
}); else if ("Object" === p) 0; else if (p === a.ScriptUuid) {
var v = a.ObjectType(cc.ScriptAsset);
v.type = "Script";
_.push(v);
} else "object" === ("object" === (e = typeof p) ? t(p) : e) ? s.isEnum(p) && _.push({
type: "Enum",
enumList: s.getList(p)
}) : "function" === ("object" === (e = typeof p) ? t(p) : e) && (n.url ? _.push({
type: "Object",
ctor: p,
_onAfterProp: h("String", "cc.String")
}) : _.push(n._short ? {
type: "Object",
ctor: p
} : a.ObjectType(p)));
}
function y(i, o) {
if (i in n) {
var r = n[i];
("object" === (e = typeof r) ? t(r) : e) === o && ((u || f())[d + i] = r);
}
}
n.editorOnly && ((u || f())[d + "editorOnly"] = !0);
0;
n.url && ((u || f())[d + "saveUrlAsAsset"] = !0);
!1 === n.serializable && ((u || f())[d + "serializable"] = !1);
y("formerlySerializedAs", "string");
0;
var m = n.range;
if (m) if (Array.isArray(m)) if (m.length >= 2) {
(u || f())[d + "min"] = m[0];
u[d + "max"] = m[1];
m.length > 2 && (u[d + "step"] = m[2]);
} else 0; else 0;
y("min", "number");
y("max", "number");
y("step", "number");
return _;
}
cc.Class = I;
n.exports = {
isArray: function(t) {
t = m(t);
return Array.isArray(t);
},
fastDefine: I._fastDefine,
getNewValueTypeCode: b,
IDENTIFIER_RE: E,
escapeForJS: S,
getDefault: m
};
0;
}), {
"./CCEnum": 130,
"./attribute": 135,
"./js": 143,
"./preprocess-class": 144,
"./requiring-frame": 145,
"./utils": 147
} ],
129: [ (function(i, n, o) {
i("./CCClass");
var r = i("./preprocess-class"), s = i("./js"), c = "__ccclassCache__";
function a(t) {
return t;
}
function l(t, e) {
return t[e] || (t[e] = {});
}
function h(i) {
return function(n) {
return "function" === ("object" === (e = typeof n) ? t(n) : e) ? i(n) : function(t) {
return i(t, n);
};
};
}
function u(t, e, i) {
return function(t) {
0;
return function(i) {
return e(i, t);
};
};
}
var d = u.bind(null, !1);
function f(t) {
return u.bind(null, !1);
}
var _ = f(), p = f();
function g(t, e) {
0;
return l(t, c);
}
function v(i, n, o, c, a, l) {
var h;
c && (h = (h = r.getFullFormOfProperty(c)) || c);
var u = n[o], d = s.mixin(u || {}, h || {});
if (a && (a.get || a.set)) {
a.get && (d.get = a.get);
a.set && (d.set = a.set);
} else {
0;
var f = void 0;
if (a) {
if (a.initializer) {
f = (function(i) {
var n;
try {
n = i();
} catch (t) {
return i;
}
return "object" !== ("object" == (e = typeof n) ? t(n) : e) || null === n ? n : i;
})(a.initializer);
!0;
}
} else {
var _ = l.default || (l.default = (function(t) {
var e;
try {
e = new t();
} catch (t) {
return {};
}
return e;
})(i));
if (_.hasOwnProperty(o)) {
f = _[o];
!0;
}
}
0;
d.default = f;
}
n[o] = d;
}
var y = h((function(t, e) {
var i = s.getSuper(t);
i === Object && (i = null);
var n = {
name: e,
extends: i,
ctor: t,
__ES6__: !0
}, o = t[c];
if (o) {
var r = o.proto;
r && s.mixin(n, r);
t[c] = void 0;
}
return cc.Class(n);
}));
function m(t, e, i) {
return t((function(t, n) {
var o = g(t);
if (o) {
var r = void 0 !== i ? i : n;
l(l(o, "proto"), "editor")[e] = r;
}
}), e);
}
function C(t) {
return t(a);
}
var T = C(h), b = m(d, "requireComponent"), S = C(_), E = m(p, "executionOrder"), x = C(h), A = C(h), N = C(_), O = C(_), w = C(_);
cc._decorator = n.exports = {
ccclass: y,
property: function(i, n, o) {
var r = null;
function s(t, e, i) {
var n = g(t.constructor);
if (n) {
var o = l(l(n, "proto"), "properties");
v(t.constructor, o, e, r, i, n);
}
}
if ("undefined" === ("object" == (e = typeof n) ? t(n) : e)) {
r = i;
return s;
}
s(i, n, o);
},
executeInEditMode: T,
requireComponent: b,
menu: S,
executionOrder: E,
disallowMultiple: x,
playOnFocus: A,
inspector: N,
icon: O,
help: w,
mixins: function() {
for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
return function(e) {
var i = g(e);
i && (l(i, "proto").mixins = t);
};
}
};
}), {
"./CCClass": 128,
"./js": 143,
"./preprocess-class": 144,
"./utils": 147
} ],
130: [ (function(i, n, o) {
var r = i("./js");
function s(i) {
if ("__enums__" in i) return i;
r.value(i, "__enums__", null, !0);
for (var n = -1, o = Object.keys(i), s = 0; s < o.length; s++) {
var c = o[s], a = i[c];
if (-1 === a) {
a = ++n;
i[c] = a;
} else if ("number" === ("object" === (e = typeof a) ? t(a) : e)) n = a; else if ("string" === ("object" === (e = typeof a) ? t(a) : e) && Number.isInteger(parseFloat(c))) continue;
var l = "" + a;
if (c !== l) {
0;
r.value(i, l, c);
}
}
return i;
}
s.isEnum = function(t) {
return t && t.hasOwnProperty("__enums__");
};
s.getList = function(t) {
if (t.__enums__) return t.__enums__;
var e = t.__enums__ = [];
for (var i in t) {
var n = t[i];
Number.isInteger(n) && e.push({
name: i,
value: n
});
}
e.sort((function(t, e) {
return t.value - e.value;
}));
return e;
};
n.exports = cc.Enum = s;
}), {
"./js": 143
} ],
131: [ (function(t, e, i) {
t("./_CCClass");
cc.KEY = {
none: 0,
back: 6,
menu: 18,
backspace: 8,
tab: 9,
enter: 13,
shift: 16,
ctrl: 17,
alt: 18,
pause: 19,
capslock: 20,
escape: 27,
space: 32,
pageup: 33,
pagedown: 34,
end: 35,
home: 36,
left: 37,
up: 38,
right: 39,
down: 40,
select: 41,
insert: 45,
Delete: 46,
0: 48,
1: 49,
2: 50,
3: 51,
4: 52,
5: 53,
6: 54,
7: 55,
8: 56,
9: 57,
a: 65,
b: 66,
c: 67,
d: 68,
e: 69,
f: 70,
g: 71,
h: 72,
i: 73,
j: 74,
k: 75,
l: 76,
m: 77,
n: 78,
o: 79,
p: 80,
q: 81,
r: 82,
s: 83,
t: 84,
u: 85,
v: 86,
w: 87,
x: 88,
y: 89,
z: 90,
num0: 96,
num1: 97,
num2: 98,
num3: 99,
num4: 100,
num5: 101,
num6: 102,
num7: 103,
num8: 104,
num9: 105,
"*": 106,
"+": 107,
"-": 109,
numdel: 110,
"/": 111,
f1: 112,
f2: 113,
f3: 114,
f4: 115,
f5: 116,
f6: 117,
f7: 118,
f8: 119,
f9: 120,
f10: 121,
f11: 122,
f12: 123,
numlock: 144,
scrolllock: 145,
";": 186,
semicolon: 186,
equal: 187,
"=": 187,
",": 188,
comma: 188,
dash: 189,
".": 190,
period: 190,
forwardslash: 191,
grave: 192,
"[": 219,
openbracket: 219,
backslash: 220,
"]": 221,
closebracket: 221,
quote: 222,
dpadLeft: 1e3,
dpadRight: 1001,
dpadUp: 1003,
dpadDown: 1004,
dpadCenter: 1005
};
cc.ImageFormat = cc.Enum({
JPG: 0,
PNG: 1,
TIFF: 2,
WEBP: 3,
PVR: 4,
ETC: 5,
S3TC: 6,
ATITC: 7,
TGA: 8,
RAWDATA: 9,
UNKNOWN: 10
});
cc.getImageFormatByData = function(t) {
return t.length > 8 && 137 === t[0] && 80 === t[1] && 78 === t[2] && 71 === t[3] && 13 === t[4] && 10 === t[5] && 26 === t[6] && 10 === t[7] ? cc.ImageFormat.PNG : t.length > 2 && (73 === t[0] && 73 === t[1] || 77 === t[0] && 77 === t[1] || 255 === t[0] && 216 === t[1]) ? cc.ImageFormat.TIFF : cc.ImageFormat.UNKNOWN;
};
cc.macro = {
INVALID_INDEX: -1,
NODE_TAG_INVALID: -1,
PI: Math.PI,
PI2: 2 * Math.PI,
FLT_MAX: parseFloat("3.402823466e+38F"),
FLT_MIN: parseFloat("1.175494351e-38F"),
RAD: Math.PI / 180,
DEG: 180 / Math.PI,
UINT_MAX: 4294967295,
REPEAT_FOREVER: 4294967295,
FLT_EPSILON: 1.192092896e-7,
ONE: 1,
ZERO: 0,
SRC_ALPHA: 770,
SRC_ALPHA_SATURATE: 776,
SRC_COLOR: 768,
DST_ALPHA: 772,
DST_COLOR: 774,
ONE_MINUS_SRC_ALPHA: 771,
ONE_MINUS_SRC_COLOR: 769,
ONE_MINUS_DST_ALPHA: 773,
ONE_MINUS_DST_COLOR: 775,
ONE_MINUS_CONSTANT_ALPHA: 32772,
ONE_MINUS_CONSTANT_COLOR: 32770,
LINEAR: 9729,
BLEND_DST: 771,
WEB_ORIENTATION_PORTRAIT: 0,
WEB_ORIENTATION_LANDSCAPE_LEFT: -90,
WEB_ORIENTATION_PORTRAIT_UPSIDE_DOWN: 180,
WEB_ORIENTATION_LANDSCAPE_RIGHT: 90,
ORIENTATION_PORTRAIT: 1,
ORIENTATION_LANDSCAPE: 2,
ORIENTATION_AUTO: 3,
DENSITYDPI_DEVICE: "device-dpi",
DENSITYDPI_HIGH: "high-dpi",
DENSITYDPI_MEDIUM: "medium-dpi",
DENSITYDPI_LOW: "low-dpi",
VERTEX_ATTRIB_FLAG_NONE: 0,
VERTEX_ATTRIB_FLAG_POSITION: 1,
VERTEX_ATTRIB_FLAG_COLOR: 2,
VERTEX_ATTRIB_FLAG_TEX_COORDS: 4,
VERTEX_ATTRIB_FLAG_POS_COLOR_TEX: 7,
GL_ALL: 0,
VERTEX_ATTRIB_POSITION: 0,
VERTEX_ATTRIB_COLOR: 1,
VERTEX_ATTRIB_TEX_COORDS: 2,
VERTEX_ATTRIB_MAX: 3,
UNIFORM_PMATRIX: 0,
UNIFORM_MVMATRIX: 1,
UNIFORM_MVPMATRIX: 2,
UNIFORM_TIME: 3,
UNIFORM_SINTIME: 4,
UNIFORM_COSTIME: 5,
UNIFORM_RANDOM01: 6,
UNIFORM_SAMPLER: 7,
UNIFORM_MAX: 8,
SHADER_POSITION_TEXTURECOLOR: "ShaderPositionTextureColor",
SHADER_SPRITE_POSITION_TEXTURECOLOR: "ShaderSpritePositionTextureColor",
SHADER_POSITION_TEXTURECOLORALPHATEST: "ShaderPositionTextureColorAlphaTest",
SHADER_SPRITE_POSITION_TEXTURECOLORALPHATEST: "ShaderSpritePositionTextureColorAlphaTest",
SHADER_POSITION_COLOR: "ShaderPositionColor",
SHADER_SPRITE_POSITION_COLOR: "ShaderSpritePositionColor",
SHADER_POSITION_TEXTURE: "ShaderPositionTexture",
SHADER_POSITION_TEXTURE_UCOLOR: "ShaderPositionTexture_uColor",
SHADER_POSITION_TEXTUREA8COLOR: "ShaderPositionTextureA8Color",
SHADER_POSITION_UCOLOR: "ShaderPosition_uColor",
SHADER_POSITION_LENGTHTEXTURECOLOR: "ShaderPositionLengthTextureColor",
UNIFORM_PMATRIX_S: "CC_PMatrix",
UNIFORM_MVMATRIX_S: "CC_MVMatrix",
UNIFORM_MVPMATRIX_S: "CC_MVPMatrix",
UNIFORM_TIME_S: "CC_Time",
UNIFORM_SINTIME_S: "CC_SinTime",
UNIFORM_COSTIME_S: "CC_CosTime",
UNIFORM_RANDOM01_S: "CC_Random01",
UNIFORM_SAMPLER_S: "CC_Texture0",
UNIFORM_ALPHA_TEST_VALUE_S: "CC_alpha_value",
ATTRIBUTE_NAME_COLOR: "a_color",
ATTRIBUTE_NAME_POSITION: "a_position",
ATTRIBUTE_NAME_TEX_COORD: "a_texCoord",
ITEM_SIZE: 32,
CURRENT_ITEM: 3233828865,
ZOOM_ACTION_TAG: 3233828866,
NORMAL_TAG: 8801,
SELECTED_TAG: 8802,
DISABLE_TAG: 8803,
FIX_ARTIFACTS_BY_STRECHING_TEXEL: 0,
FIX_ARTIFACTS_BY_STRECHING_TEXEL_TMX: 1,
DIRECTOR_STATS_POSITION: cc.p(0, 0),
DIRECTOR_FPS_INTERVAL: .5,
COCOSNODE_RENDER_SUBPIXEL: 1,
SPRITEBATCHNODE_RENDER_SUBPIXEL: 1,
AUTO_PREMULTIPLIED_ALPHA_FOR_PNG: 0,
OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA: 0,
TEXTURE_NPOT_SUPPORT: 0,
USE_LA88_LABELS: 1,
SPRITE_DEBUG_DRAW: 0,
LABELBMFONT_DEBUG_DRAW: 0,
LABELATLAS_DEBUG_DRAW: 0,
ENABLE_STACKABLE_ACTIONS: 1,
ENABLE_GL_STATE_CACHE: 1,
TOUCH_TIMEOUT: 5e3,
BATCH_VERTEX_COUNT: 2e4,
ENABLE_GC_FOR_NATIVE_OBJECTS: !0,
ENABLE_TILEDMAP_CULLING: !0,
DOWNLOAD_MAX_CONCURRENT: 64,
ENABLE_TRANSPARENT_CANVAS: !1,
ENABLE_WEBGL_ANTIALIAS: !1
};
var n = !0;
cc.defineGetterSetter(cc.macro, "ENABLE_CULLING", (function() {
return n;
}), (function(t) {
n = t;
var e = cc.director.getScene();
if (e) {
e._sgNode.markCullingDirty();
cc.director.setCullingEnabled(t);
}
}));
cc.defineGetterSetter(cc.macro, "BLEND_SRC", (function() {
return cc._renderType === cc.game.RENDER_TYPE_WEBGL && cc.macro.OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA ? cc.macro.ONE : cc.macro.SRC_ALPHA;
}));
cc.lerp = function(t, e, i) {
return t + (e - t) * i;
};
cc.rand = function() {
return 16777215 * Math.random();
};
cc.randomMinus1To1 = function() {
return 2 * (Math.random() - .5);
};
cc.random0To1 = Math.random;
cc.degreesToRadians = function(t) {
return t * cc.macro.RAD;
};
cc.radiansToDegrees = function(t) {
return t * cc.macro.DEG;
};
cc.nodeDrawSetup = function(t) {
if (t._shaderProgram) {
t._shaderProgram.use();
t._shaderProgram.setUniformForModelViewAndProjectionMatrixWithMat4();
}
};
cc.incrementGLDraws = function(t) {
cc.g_NumberOfDraws += t;
};
cc.checkGLErrorDebug = function() {
if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
var t = cc._renderContext.getError();
t && cc.logID(2400, t);
}
};
e.exports = cc.macro;
}), {
"./_CCClass": 134
} ],
132: [ (function(i, n, o) {
var r = i("./js"), s = i("./CCClass"), c = 1;
function a() {
this._name = "";
this._objFlags = 0;
}
s.fastDefine("cc.Object", a, {
_name: "",
_objFlags: 0
});
r.value(a, "Flags", {
Destroyed: c,
DontSave: 8,
EditorOnly: 16,
Dirty: 32,
DontDestroy: 64,
PersistentMask: -4192741,
Destroying: 128,
Deactivating: 256,
LockedInEditor: 512,
IsPreloadStarted: 8192,
IsOnLoadStarted: 32768,
IsOnLoadCalled: 16384,
IsOnEnableCalled: 2048,
IsStartCalled: 65536,
IsEditorOnEnableCalled: 4096,
IsPositionLocked: 1 << 21,
IsRotationLocked: 1 << 17,
IsScaleLocked: 1 << 18,
IsAnchorLocked: 1 << 19,
IsSizeLocked: 1 << 20
});
var l = [];
function h() {
for (var t = l.length, e = 0; e < t; ++e) {
var i = l[e];
i._objFlags & c || i._destroyImmediate();
}
t === l.length ? l.length = 0 : l.splice(0, t);
0;
}
r.value(a, "_deferredDestroy", h);
0;
var u = a.prototype;
r.getset(u, "name", (function() {
return this._name;
}), (function(t) {
this._name = t;
}), !0);
r.get(u, "isValid", (function() {
return !(this._objFlags & c);
}), !0);
0;
u.destroy = function() {
if (this._objFlags & c) {
cc.warnID(5e3);
return !1;
}
if (4 & this._objFlags) return !1;
this._objFlags |= 4;
l.push(this);
0;
return !0;
};
0;
u._destruct = function() {
var i = this.constructor, n = i.__destruct__;
if (!n) {
n = (function(i, n) {
var o, r = {};
for (o in i) if (i.hasOwnProperty(o)) switch ("object" == (e = typeof i[o]) ? t(i[o]) : e) {
case "string":
r[o] = "";
break;

case "object":
case "function":
r[o] = null;
}
if (cc.Class._isCCClass(n)) for (var c = cc.Class.Attr.getClassAttrs(n), a = n.__props__, l = 0; l < a.length; l++) {
var h = (o = a[l]) + cc.Class.Attr.DELIMETER + "default";
if (h in c) switch ("object" == (e = typeof c[h]) ? t(c[h]) : e) {
case "string":
r[o] = "";
break;

case "object":
case "function":
r[o] = null;
break;

case "undefined":
r[o] = void 0;
}
}
var u = i instanceof cc._BaseNode || i instanceof cc.Component, d = "";
for (o in r) if (!u || "_id" !== o) {
var f;
f = s.IDENTIFIER_RE.test(o) ? "o." + o + "=" : "o[" + s.escapeForJS(o) + "]=";
var _ = r[o];
"" === _ && (_ = '""');
d += f + _ + ";\n";
}
return Function("o", d);
})(this, i);
r.value(i, "__destruct__", n, !0);
}
n(this);
};
u._onPreDestroy = null;
u._destroyImmediate = function() {
if (this._objFlags & c) cc.errorID(5e3); else {
this._onPreDestroy && this._onPreDestroy();
this._destruct();
this._objFlags |= c;
}
};
0;
u._deserialize = null;
cc.isValid = function(i, n) {
return "object" === ("object" === (e = typeof i) ? t(i) : e) ? !(!i || i._objFlags & (n ? 4 | c : c)) : "undefined" !== ("object" === (e = typeof i) ? t(i) : e);
};
0;
cc.Object = n.exports = a;
}), {
"./CCClass": 128,
"./js": 143
} ],
133: [ (function(i, n, o) {
if (!cc.sys) {
cc.sys = {};
var r = cc.sys;
r.LANGUAGE_ENGLISH = "en";
r.LANGUAGE_CHINESE = "zh";
r.LANGUAGE_FRENCH = "fr";
r.LANGUAGE_ITALIAN = "it";
r.LANGUAGE_GERMAN = "de";
r.LANGUAGE_SPANISH = "es";
r.LANGUAGE_DUTCH = "du";
r.LANGUAGE_RUSSIAN = "ru";
r.LANGUAGE_KOREAN = "ko";
r.LANGUAGE_JAPANESE = "ja";
r.LANGUAGE_HUNGARIAN = "hu";
r.LANGUAGE_PORTUGUESE = "pt";
r.LANGUAGE_ARABIC = "ar";
r.LANGUAGE_NORWEGIAN = "no";
r.LANGUAGE_POLISH = "pl";
r.LANGUAGE_TURKISH = "tr";
r.LANGUAGE_UKRAINIAN = "uk";
r.LANGUAGE_ROMANIAN = "ro";
r.LANGUAGE_BULGARIAN = "bg";
r.LANGUAGE_UNKNOWN = "unknown";
r.OS_IOS = "iOS";
r.OS_ANDROID = "Android";
r.OS_WINDOWS = "Windows";
r.OS_MARMALADE = "Marmalade";
r.OS_LINUX = "Linux";
r.OS_BADA = "Bada";
r.OS_BLACKBERRY = "Blackberry";
r.OS_OSX = "OS X";
r.OS_WP8 = "WP8";
r.OS_WINRT = "WINRT";
r.OS_UNKNOWN = "Unknown";
r.UNKNOWN = -1;
r.WIN32 = 0;
r.LINUX = 1;
r.MACOS = 2;
r.ANDROID = 3;
r.IPHONE = 4;
r.IPAD = 5;
r.BLACKBERRY = 6;
r.NACL = 7;
r.EMSCRIPTEN = 8;
r.TIZEN = 9;
r.WINRT = 10;
r.WP8 = 11;
r.MOBILE_BROWSER = 100;
r.DESKTOP_BROWSER = 101;
r.EDITOR_PAGE = 102;
r.EDITOR_CORE = 103;
r.WECHAT_GAME = 104;
r.QQ_PLAY = 105;
r.BROWSER_TYPE_WECHAT = "wechat";
r.BROWSER_TYPE_WECHAT_GAME = "wechatgame";
r.BROWSER_TYPE_WECHAT_GAME_SUB = "wechatgamesub";
r.BROWSER_TYPE_QQ_PLAY = "qqplay";
r.BROWSER_TYPE_ANDROID = "androidbrowser";
r.BROWSER_TYPE_IE = "ie";
r.BROWSER_TYPE_QQ = "qqbrowser";
r.BROWSER_TYPE_MOBILE_QQ = "mqqbrowser";
r.BROWSER_TYPE_UC = "ucbrowser";
r.BROWSER_TYPE_UCBS = "ucbs";
r.BROWSER_TYPE_360 = "360browser";
r.BROWSER_TYPE_BAIDU_APP = "baiduboxapp";
r.BROWSER_TYPE_BAIDU = "baidubrowser";
r.BROWSER_TYPE_MAXTHON = "maxthon";
r.BROWSER_TYPE_OPERA = "opera";
r.BROWSER_TYPE_OUPENG = "oupeng";
r.BROWSER_TYPE_MIUI = "miuibrowser";
r.BROWSER_TYPE_FIREFOX = "firefox";
r.BROWSER_TYPE_SAFARI = "safari";
r.BROWSER_TYPE_CHROME = "chrome";
r.BROWSER_TYPE_LIEBAO = "liebao";
r.BROWSER_TYPE_QZONE = "qzone";
r.BROWSER_TYPE_SOUGOU = "sogou";
r.BROWSER_TYPE_UNKNOWN = "unknown";
r.NetworkType = {
NONE: 0,
LAN: 1,
WWAN: 2
};
r.getBatteryLevel = function() {
return 1;
};
r.getNetworkType = function() {
return r.NetworkType.LAN;
};
r.isNative = !1;
r.isBrowser = "object" === ("object" === (e = typeof window) ? t(window) : e) && "object" === ("object" === (e = typeof document) ? t(document) : e) && !0;
cc.create3DContext = function(t, e, i) {
if (!i) return cc.create3DContext(t, e, "webgl") || cc.create3DContext(t, e, "experimental-webgl") || cc.create3DContext(t, e, "webkit-3d") || cc.create3DContext(t, e, "moz-webgl") || null;
try {
return t.getContext(i, e);
} catch (t) {
return null;
}
};
var s = window, c = s.navigator, a = document, l = a.documentElement, h = c.userAgent.toLowerCase();
r.isMobile = /mobile|android|iphone|ipad/.test(h);
r.platform = r.isMobile ? r.MOBILE_BROWSER : r.DESKTOP_BROWSER;
var u = c.language;
u = (u = u || c.browserLanguage) ? u.split("-")[0] : r.LANGUAGE_ENGLISH;
r.language = u;
var d = !1, f = !1, _ = "", p = 0, g = /android (\d+(?:\.\d+)+)/i.exec(h) || /android (\d+(?:\.\d+)+)/i.exec(c.platform);
if (g) {
d = !0;
_ = g[1] || "";
p = parseInt(_) || 0;
}
if (g = /(iPad|iPhone|iPod).*OS ((\d+_?){2,3})/i.exec(h)) {
f = !0;
_ = g[2] || "";
p = parseInt(_) || 0;
} else if (/(iPhone|iPad|iPod)/.exec(c.platform)) {
f = !0;
_ = "";
p = 0;
}
var v = r.OS_UNKNOWN;
-1 !== c.appVersion.indexOf("Win") ? v = r.OS_WINDOWS : f ? v = r.OS_IOS : -1 !== c.appVersion.indexOf("Mac") ? v = r.OS_OSX : d ? v = r.OS_ANDROID : -1 === c.appVersion.indexOf("Linux") && -1 === h.indexOf("ubuntu") && -1 === c.appVersion.indexOf("X11") || (v = r.OS_LINUX);
r.os = v;
r.osVersion = _;
r.osMainVersion = p;
r.browserType = r.BROWSER_TYPE_UNKNOWN;
(function() {
var t = /mqqbrowser|micromessenger|qq|sogou|qzone|liebao|maxthon|ucbs|360 aphone|360browser|baiduboxapp|baidubrowser|maxthon|mxbrowser|miuibrowser/i.exec(h);
t || (t = /qqbrowser|ucbrowser/i.exec(h));
t || (t = /chrome|safari|firefox|trident|opera|opr\/|oupeng/i.exec(h));
var e = t ? t[0].toLowerCase() : r.BROWSER_TYPE_UNKNOWN;
"micromessenger" === e ? e = r.BROWSER_TYPE_WECHAT : "safari" === e && d ? e = r.BROWSER_TYPE_ANDROID : "qq" === e && h.match(/android.*applewebkit/i) ? e = r.BROWSER_TYPE_ANDROID : "trident" === e ? e = r.BROWSER_TYPE_IE : "360 aphone" === e ? e = r.BROWSER_TYPE_360 : "mxbrowser" === e ? e = r.BROWSER_TYPE_MAXTHON : "opr/" === e && (e = r.BROWSER_TYPE_OPERA);
r.browserType = e;
})();
r.browserVersion = "";
(function() {
var t = h.match(/(mqqbrowser|micromessenger|qq|sogou|qzone|liebao|maxthon|uc|ucbs|360 aphone|360|baiduboxapp|baidu|maxthon|mxbrowser|miui)(mobile)?(browser)?\/?([\d.]+)/i);
t || (t = h.match(/(qqbrowser|chrome|safari|firefox|trident|opera|opr\/|oupeng)(mobile)?(browser)?\/?([\d.]+)/i));
r.browserVersion = t ? t[4] : "";
})();
var y = window.innerWidth || document.documentElement.clientWidth, m = window.innerHeight || document.documentElement.clientHeight, C = window.devicePixelRatio || 1;
r.windowPixelResolution = {
width: C * y,
height: C * m
};
r._checkWebGLRenderMode = function() {
if (cc._renderType !== cc.game.RENDER_TYPE_WEBGL) throw new Error(cc._getError(5202));
};
var T = document.createElement("canvas"), b = document.createElement("canvas");
r._supportCanvasNewBlendModes = (function() {
var t = T;
t.width = 1;
t.height = 1;
var e = t.getContext("2d");
e.fillStyle = "#000";
e.fillRect(0, 0, 1, 1);
e.globalCompositeOperation = "multiply";
var i = b;
i.width = 1;
i.height = 1;
var n = i.getContext("2d");
n.fillStyle = "#fff";
n.fillRect(0, 0, 1, 1);
e.drawImage(i, 0, 0, 1, 1);
return 0 === e.getImageData(0, 0, 1, 1).data[0];
})();
if (cc.sys.isMobile) {
var S = document.createElement("style");
S.type = "text/css";
document.body.appendChild(S);
S.textContent = "body,canvas,div{ -moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;-webkit-tap-highlight-color:rgba(0,0,0,0);}";
}
try {
var E = r.localStorage = s.localStorage;
E.setItem("storage", "");
E.removeItem("storage");
E = null;
} catch (t) {
var x = function() {
cc.warnID(5200);
};
r.localStorage = {
getItem: x,
setItem: x,
removeItem: x,
clear: x
};
}
var A = T.toDataURL("image/webp").startsWith("data:image/webp"), N = !!T.getContext("2d"), O = !1;
if (s.WebGLRenderingContext) {
cc.create3DContext(document.createElement("CANVAS")) && (O = !0);
if (O && r.os === r.OS_ANDROID) {
var w = parseFloat(r.browserVersion);
switch (r.browserType) {
case r.BROWSER_TYPE_MOBILE_QQ:
case r.BROWSER_TYPE_BAIDU:
case r.BROWSER_TYPE_BAIDU_APP:
O = w >= 6.2;
break;

case r.BROWSER_TYPE_ANDROID:
r.osMainVersion && r.osMainVersion >= 5 && (O = !0);
break;

case r.BROWSER_TYPE_CHROME:
O = w >= 30;
break;

case r.BROWSER_TYPE_UC:
O = w > 11;
break;

case r.BROWSER_TYPE_360:
O = !1;
}
}
}
var I, L = r.capabilities = {
canvas: N,
opengl: O,
webp: A
};
(void 0 !== l.ontouchstart || void 0 !== a.ontouchstart || c.msPointerEnabled) && (L.touches = !0);
void 0 !== l.onmouseup && (L.mouse = !0);
void 0 !== l.onkeyup && (L.keyboard = !0);
(s.DeviceMotionEvent || s.DeviceOrientationEvent) && (L.accelerometer = !0);
(function() {
r.browserVersion;
var t = !!(window.AudioContext || window.webkitAudioContext || window.mozAudioContext);
I = {
ONLY_ONE: !1,
WEB_AUDIO: t,
DELAY_CREATE_CTX: !1
};
r.os === r.OS_IOS && (I.USE_LOADER_EVENT = "loadedmetadata");
if (r.browserType === r.BROWSER_TYPE_FIREFOX) {
I.DELAY_CREATE_CTX = !0;
I.USE_LOADER_EVENT = "canplay";
}
r.os === r.OS_ANDROID && r.browserType === r.BROWSER_TYPE_UC && (I.ONE_SOURCE = !0);
!1;
})();
try {
if (I.WEB_AUDIO) {
I.context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
I.DELAY_CREATE_CTX && setTimeout((function() {
I.context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
}), 0);
}
} catch (t) {
I.WEB_AUDIO = !1;
cc.logID(5201);
}
I.format = (function() {
var t = [], e = document.createElement("audio");
if (e.canPlayType) {
e.canPlayType('audio/ogg; codecs="vorbis"') && t.push(".ogg");
e.canPlayType("audio/mpeg") && t.push(".mp3");
e.canPlayType('audio/wav; codecs="1"') && t.push(".wav");
e.canPlayType("audio/mp4") && t.push(".mp4");
e.canPlayType("audio/x-m4a") && t.push(".m4a");
}
return t;
})();
r.__audioSupport = I;
r.garbageCollect = function() {};
r.dumpRoot = function() {};
r.restartVM = function() {};
r.cleanScript = function(t) {};
r.isObjectValid = function(t) {
return !!t;
};
r.dump = function() {
var t = "";
t += "isMobile : " + this.isMobile + "\r\n";
t += "language : " + this.language + "\r\n";
t += "browserType : " + this.browserType + "\r\n";
t += "browserVersion : " + this.browserVersion + "\r\n";
t += "capabilities : " + JSON.stringify(this.capabilities) + "\r\n";
t += "os : " + this.os + "\r\n";
t += "osVersion : " + this.osVersion + "\r\n";
t += "platform : " + this.platform + "\r\n";
t += "Using " + (cc._renderType === cc.game.RENDER_TYPE_WEBGL ? "WEBGL" : "CANVAS") + " renderer.\r\n";
cc.log(t);
};
r.openURL = function(t) {
window.open(t);
};
r.now = function() {
return Date.now ? Date.now() : +new Date();
};
n.exports = r;
}
}), {} ],
134: [ (function(i, n, o) {
var r = cc.ClassManager = {
instanceId: 0 | 998 * Math.random(),
getNewInstanceId: function() {
return this.instanceId++;
}
}, s = /\b_super\b/, c = function() {};
c.extend = function(i) {
var n, o = this.prototype, a = Object.create(o), l = {
writable: !0,
enumerable: !1,
configurable: !0
};
if (cc.game && cc.game.config && cc.game.config[cc.game.CONFIG_KEY.exposeClassName]) {
var h = "return (function " + (i._className || "Class") + "(arg0,arg1,arg2,arg3,arg4) {\nthis.__instanceId = cc.ClassManager.getNewInstanceId();\nif (this.ctor) {\nswitch (arguments.length) {\ncase 0: this.ctor(); break;\ncase 1: this.ctor(arg0); break;\ncase 2: this.ctor(arg0,arg1); break;\ncase 3: this.ctor(arg0,arg1,arg2); break;\ncase 4: this.ctor(arg0,arg1,arg2,arg3); break;\ncase 5: this.ctor(arg0,arg1,arg2,arg3,arg4); break;\ndefault: this.ctor.apply(this, arguments);\n}\n}\n});";
n = Function(h)();
} else n = function(t, e, i, n, o) {
this.__instanceId = r.getNewInstanceId();
if (this.ctor) switch (arguments.length) {
case 0:
this.ctor();
break;

case 1:
this.ctor(t);
break;

case 2:
this.ctor(t, e);
break;

case 3:
this.ctor(t, e, i);
break;

case 4:
this.ctor(t, e, i, n);
break;

case 5:
this.ctor(t, e, i, n, o);
break;

default:
this.ctor.apply(this, arguments);
}
};
n.prototype = a;
l.value = n;
Object.defineProperty(a, "constructor", l);
for (var u in i) {
var d = "function" === ("object" === (e = typeof i[u]) ? t(i[u]) : e);
if (d && "function" === ("object" === (e = typeof o[u]) ? t(o[u]) : e) && s.test(i[u])) {
l.value = (function(t, e) {
return function() {
var i = this._super;
this._super = o[t];
var n = e.apply(this, arguments);
this._super = i;
return n;
};
})(u, i[u]);
Object.defineProperty(a, u, l);
} else if (d) {
l.value = i[u];
Object.defineProperty(a, u, l);
} else a[u] = i[u];
}
n.extend = c.extend;
n.implement = function(t) {
for (var e in t) a[e] = t[e];
};
return n;
};
cc.defineGetterSetter = function(t, e, i, n, o, r) {
if (t.__defineGetter__) {
i && t.__defineGetter__(e, i);
n && t.__defineSetter__(e, n);
} else {
if (!Object.defineProperty) throw new Error(cc._getError(3658));
var s = {
configurable: !0
};
i && (s.get = i);
n && (s.set = n);
Object.defineProperty(t, e, s);
}
};
cc.clone = function(i) {
var n = i.constructor ? new i.constructor() : {};
for (var o in i) {
var r = i[o];
"object" !== ("object" === (e = typeof r) ? t(r) : e) || !r || r instanceof _ccsg.Node ? n[o] = r : n[o] = cc.clone(r);
}
return n;
};
cc._Class = n.exports = c;
}), {} ],
135: [ (function(i, n, o) {
var r = i("./js"), s = (i("./utils").isPlainEmptyObj_DEV, "$_$");
function c(t, e, i) {
var n;
n = function() {};
i && r.extend(n, i.constructor);
var o = new n();
r.value(t, "__attrs__", o);
return o;
}
function a(i, n, o) {
var r, a, h;
if ("function" === ("object" === (e = typeof i) ? t(i) : e)) a = (r = l(i)).constructor.prototype; else {
var u = i;
if (!(r = u.__attrs__)) {
r = c(u, 0, l(i = u.constructor));
}
a = r;
}
if ("undefined" === ("object" === (e = typeof o) ? t(o) : e)) {
var d = n + s, f = {};
for (h in r) h.startsWith(d) && (f[h.slice(d.length)] = r[h]);
return f;
}
if ("object" === ("object" === (e = typeof o) ? t(o) : e)) for (h in o) 95 !== h.charCodeAt(0) && (a[n + s + h] = o[h]); else 0;
}
function l(t) {
return t.hasOwnProperty("__attrs__") && t.__attrs__ || (function(t) {
for (var e, i = cc.Class.getInheritanceChain(t), n = i.length - 1; n >= 0; n--) {
var o = i[n];
o.hasOwnProperty("__attrs__") && o.__attrs__ || c(o, 0, (e = i[n + 1]) && e.__attrs__);
}
c(t, 0, (e = i[0]) && e.__attrs__);
return t.__attrs__;
})(t);
}
function h(t) {
return l(t).constructor.prototype;
}
cc.Integer = "Integer";
cc.Float = "Float";
0;
cc.Boolean = "Boolean";
cc.String = "String";
function u(t, e) {
0;
}
n.exports = {
attr: a,
getClassAttrs: l,
getClassAttrsProto: h,
setClassAttr: function(t, e, i, n) {
h(t)[e + s + i] = n;
},
DELIMETER: s,
getTypeChecker: u,
ObjectType: function(t) {
return {
type: "Object",
ctor: t,
_onAfterProp: !1
};
},
ScriptUuid: {}
};
}), {
"./CCClass": 128,
"./js": 143,
"./utils": 147
} ],
136: [ (function(i, n, o) {
var r = i("./js"), s = r.array.fastRemoveAt;
function c() {
this.callbacks = [];
this.targets = [];
this.isInvoking = !1;
this.containCanceled = !1;
}
var a = c.prototype;
a.removeBy = function(t, e) {
for (var i = this.callbacks, n = this.targets, o = 0; o < t.length; ++o) if (t[o] === e) {
s(i, o);
s(n, o);
--o;
}
};
a.cancel = function(t) {
this.callbacks[t] = this.targets[t] = null;
this.containCanceled = !0;
};
a.cancelAll = function() {
for (var t = this.callbacks, e = this.targets, i = 0; i < t.length; i++) t[i] = e[i] = null;
this.containCanceled = !0;
};
a.purgeCanceled = function() {
this.removeBy(this.callbacks, null);
this.containCanceled = !1;
};
var l = new r.Pool(function(t) {
t.callbacks.length = 0;
t.targets.length = 0;
t.isInvoking = !1;
t.containCanceled = !1;
}, 16);
l.get = function() {
return this._get() || new c();
};
function h() {
this._callbackTable = r.createMap(!0);
}
(a = h.prototype).add = function(t, e, i) {
var n = this._callbackTable[t];
n || (n = this._callbackTable[t] = l.get());
n.callbacks.push(e);
n.targets.push(i || null);
};
a.has = function(t, e, i) {
var n = this._callbackTable[t];
if (!n) return !1;
var o = n.callbacks;
if (!e) {
for (var r = 0; r < o.length; r++) if (o[r]) return !0;
return !1;
}
i = i || null;
for (var s = n.targets, c = 0; c < o.length; ++c) if (o[c] === e && s[c] === i) return !0;
return !1;
};
a.removeAll = function(i) {
if ("string" === ("object" === (e = typeof i) ? t(i) : e)) {
var n = this._callbackTable[i];
if (n) if (n.isInvoking) n.cancelAll(); else {
l.put(n);
delete this._callbackTable[i];
}
} else if (i) for (var o in this._callbackTable) {
var r = this._callbackTable[o];
if (r.isInvoking) for (var s = r.targets, c = 0; c < s.length; ++c) s[c] === i && r.cancel(c); else r.removeBy(r.targets, i);
}
};
a.remove = function(t, e, i) {
var n = this._callbackTable[t];
if (n) {
i = i || null;
for (var o = n.callbacks, r = n.targets, c = 0; c < o.length; ++c) if (o[c] === e && r[c] === i) {
if (n.isInvoking) n.cancel(c); else {
s(o, c);
s(r, c);
}
break;
}
}
};
var u = function() {
h.call(this);
};
r.extend(u, h);
0;
u.prototype.invoke = function(t, e, i, n, o, r) {
var s = this._callbackTable[t];
if (s) {
var c = !s.isInvoking;
s.isInvoking = !0;
for (var a = s.callbacks, l = s.targets, h = 0, u = a.length; h < u; ++h) {
var d = a[h];
if (d) {
var f = l[h];
f ? d.call(f, e, i, n, o, r) : d(e, i, n, o, r);
}
}
if (c) {
s.isInvoking = !1;
s.containCanceled && s.purgeCanceled();
}
}
};
u.CallbacksHandler = h;
n.exports = u;
}), {
"./js": 143
} ],
137: [ (function(t, e, i) {
e.exports = {
flattenCodeArray: function(t) {
var e = [];
(function t(e, i) {
for (var n = 0; n < i.length; n++) {
var o = i[n];
Array.isArray(o) ? t(e, o) : e.push(o);
}
})(e, t);
return e.join("");
}
};
}), {} ],
138: [ (function(i, n, o) {
var r = i("./js"), s = (i("./CCObject"), i("./attribute")), c = i("./CCClass"), a = i("../utils/misc"), l = function() {
this.uuidList = [];
this.uuidObjList = [];
this.uuidPropList = [];
this._stillUseUrl = r.createMap(!0);
};
l.prototype.reset = function() {
this.uuidList.length = 0;
this.uuidObjList.length = 0;
this.uuidPropList.length = 0;
r.clear(this._stillUseUrl);
};
0;
l.prototype.push = function(t, e, i, n) {
n && (this._stillUseUrl[this.uuidList.length] = !0);
this.uuidList.push(i);
this.uuidObjList.push(t);
this.uuidPropList.push(e);
};
(l.pool = new r.Pool(function(t) {
t.reset();
}, 10)).get = function() {
return this._get() || new l();
};
var h = (function() {
function i(t, e, i, n, o) {
this.result = t;
this.customEnv = n;
this.deserializedList = [];
this.deserializedData = null;
this._classFinder = i;
0;
this._idList = [];
this._idObjList = [];
this._idPropList = [];
}
var n = i.prototype;
n.deserialize = function(t) {
if (Array.isArray(t)) {
var e = t, i = e.length;
this.deserializedList.length = i;
for (var n = 0; n < i; n++) if (e[n]) {
this.deserializedList[n] = this._deserializeObject(e[n], !1);
}
this.deserializedData = i > 0 ? this.deserializedList[0] : [];
} else {
this.deserializedList.length = 1;
this.deserializedData = t ? this._deserializeObject(t, !1) : null;
this.deserializedList[0] = this.deserializedData;
}
(function(t) {
var e, i, n, o = t.deserializedList, r = t._idPropList, s = t._idList, c = t._idObjList;
t._classFinder && t._classFinder.onDereferenced;
for (e = 0; e < s.length; e++) {
i = r[e];
n = s[e];
c[e][i] = o[n];
}
})(this);
return this.deserializedData;
};
n._deserializeObject = function(i, n, o, s, c) {
var a, h = null, u = null, d = i.__type__;
if (d) {
if (!(u = this._classFinder(d, i, s, c))) {
this._classFinder === r._getClassById && cc.deserialize.reportMissingClass(d);
return null;
}
if ((h = new u())._deserialize) {
h._deserialize(i.content, this);
return h;
}
cc.Class._isCCClass(u) ? (function(t, e, i, n, o) {
var s;
if (n.hasOwnProperty("__deserialize__")) s = n.__deserialize__; else {
s = l(t, n);
r.value(n, "__deserialize__", s, !0);
}
s(t, e, i, n, o);
0;
})(this, h, i, u, o) : this._deserializeTypedObject(h, i, u);
} else if (Array.isArray(i)) {
h = new Array(i.length);
for (var f = 0; f < i.length; f++) {
a = i[f];
"object" === ("object" === (e = typeof a) ? t(a) : e) && a ? this._deserializeObjField(h, a, "" + f, null, n) : h[f] = a;
}
} else {
h = {};
this._deserializePrimitiveObject(h, i);
}
return h;
};
n._deserializeObjField = function(i, n, o, r, s) {
var c = n.__id__;
if ("undefined" === ("object" === (e = typeof c) ? t(c) : e)) {
var a = n.__uuid__;
a ? this.result.push(i, o, a, s) : i[o] = this._deserializeObject(n, s);
} else {
var l = this.deserializedList[c];
if (l) i[o] = l; else {
this._idList.push(c);
this._idObjList.push(i);
this._idPropList.push(o);
}
}
};
n._deserializePrimitiveObject = function(i, n) {
for (var o in n) if (n.hasOwnProperty(o)) {
var r = n[o];
"object" !== ("object" === (e = typeof r) ? t(r) : e) ? "__type__" !== o && (i[o] = r) : r ? this._deserializeObjField(i, r, o) : i[o] = null;
}
};
n._deserializeTypedObject = function(i, n, o) {
if (o !== cc.Vec2) if (o !== cc.Color) if (o !== cc.Size) {
var r = o.__props__;
r || (r = Object.keys(i));
for (var s = 0; s < r.length; s++) {
var c = r[s], a = n[c];
"undefined" !== ("object" === (e = typeof a) ? t(a) : e) && n.hasOwnProperty(c) && ("object" !== ("object" === (e = typeof a) ? t(a) : e) ? i[c] = a : a ? this._deserializeObjField(i, a, c) : i[c] = null);
}
} else {
i.width = n.width || 0;
i.height = n.height || 0;
} else {
i.r = n.r || 0;
i.g = n.g || 0;
i.b = n.b || 0;
var l = n.a;
i.a = void 0 === l ? 255 : l;
} else {
i.x = n.x || 0;
i.y = n.y || 0;
}
};
var o = function(t, e, i, n, o, s) {
if (e instanceof cc.ValueType) {
o || t.push("if(prop){");
var c = r.getClassName(e);
t.push("s._deserializeTypedObject(o" + i + ",prop," + c + ");");
o || t.push("}else o" + i + "=null;");
} else {
t.push("if(prop){");
t.push("s._deserializeObjField(o,prop," + n + ",null," + !!s + ");");
t.push("}else o" + i + "=null;");
}
}, l = function(i, n) {
for (var l = s.DELIMETER + "type", h = (s.DELIMETER, s.DELIMETER + "serializable"), u = s.DELIMETER + "default", d = s.DELIMETER + "saveUrlAsAsset", f = s.DELIMETER + "formerlySerializedAs", _ = s.getClassAttrs(n), p = n.__props__, g = [ "var prop;" ], v = a.BUILTIN_CLASSID_RE.test(r._getClassId(n)), y = 0; y < p.length; y++) {
var m = p[y];
if (!1 !== _[m + h]) {
var C, T;
if (c.IDENTIFIER_RE.test(m)) {
T = '"' + m + '"';
C = "." + m;
} else C = "[" + (T = c.escapeForJS(m)) + "]";
var b = C;
if (_[m + f]) {
var S = _[m + f];
b = c.IDENTIFIER_RE.test(S) ? "." + S : "[" + c.escapeForJS(S) + "]";
}
g.push("prop=d" + b + ";");
g.push('if(typeof (prop)!=="undefined"){');
var E = _[m + d], x = c.getDefault(_[m + u]);
if (v) {
var A, N = _[m + l];
if (void 0 === x && N) A = N === cc.String || N === cc.Integer || N === cc.Float || N === cc.Boolean; else {
var O = "object" === (e = typeof x) ? t(x) : e;
A = "string" === O && !E || "number" === O || "boolean" === O;
}
A ? g.push("o" + C + "=prop;") : o(g, x, C, T, !0, E);
} else {
g.push('if(typeof (prop)!=="object"){o' + C + "=prop;}else{");
o(g, x, C, T, !1, E);
g.push("}");
}
g.push("}");
}
}
if ("_$erialized" === p[p.length - 1]) {
g.push("o._$erialized=JSON.parse(JSON.stringify(d));");
g.push("s._deserializePrimitiveObject(o._$erialized,d);");
}
return Function("s", "o", "d", "k", "t", g.join(""));
};
i.pool = new r.Pool(function(t) {
t.result = null;
t.customEnv = null;
t.deserializedList.length = 0;
t.deserializedData = null;
t._classFinder = null;
0;
t._idList.length = 0;
t._idObjList.length = 0;
t._idPropList.length = 0;
}, 1);
i.pool.get = function(t, e, n, o, r) {
var s = this._get();
if (s) {
s.result = t;
s.customEnv = o;
s._classFinder = n;
0;
return s;
}
return new i(t, e, n, o, r);
};
return i;
})();
cc.deserialize = function(i, n, o) {
var s = (o = o || {}).classFinder || r._getClassById, c = o.createAssetRefs || cc.sys.platform === cc.sys.EDITOR_CORE, a = o.customEnv, u = o.ignoreEditorOnly;
0;
"string" === ("object" === (e = typeof i) ? t(i) : e) && (i = JSON.parse(i));
var d = !n;
n = n || l.pool.get();
var f = h.pool.get(n, !1, s, a, u);
cc.game._isCloning = !0;
var _ = f.deserialize(i);
cc.game._isCloning = !1;
h.pool.put(f);
c && n.assignAssetsBy(Editor.serialize.asAsset);
d && l.pool.put(n);
return _;
};
cc.deserialize.Details = l;
cc.deserialize.reportMissingClass = function(t) {
cc.warnID(5302, t);
};
}), {
"../utils/misc": 155,
"./CCClass": 128,
"./CCObject": 132,
"./attribute": 135,
"./js": 143
} ],
139: [ (function(t, e, i) {
var n = ".";
function o(t) {
this.id = 0 | 998 * Math.random();
this.prefix = t ? t + n : "";
}
o.prototype.getNewId = function() {
return this.prefix + ++this.id;
};
o.global = new o("global");
e.exports = o;
}), {} ],
140: [ (function(t, e, i) {
t("./js");
t("./CCClass");
t("./CCClassDecorator");
t("./CCEnum");
t("./CCObject");
t("./callbacks-invoker");
t("./url");
t("./deserialize");
t("./instantiate");
t("./instantiate-jit");
t("./requiring-frame");
t("./CCSys");
t("./CCMacro");
t("./CCAssetLibrary");
0;
}), {
"./CCAssetLibrary": 127,
"./CCClass": 128,
"./CCClassDecorator": 129,
"./CCEnum": 130,
"./CCMacro": 131,
"./CCObject": 132,
"./CCSys": 133,
"./CCVisibleRect": 1,
"./callbacks-invoker": 136,
"./deserialize": 138,
"./instantiate": 142,
"./instantiate-jit": 141,
"./js": 143,
"./requiring-frame": 145,
"./url": 146
} ],
141: [ (function(i, n, o) {
var r = i("./CCObject"), s = r.Flags.Destroyed, c = r.Flags.PersistentMask, a = i("./attribute"), l = i("./js"), h = i("./CCClass"), u = i("./compiler"), d = a.DELIMETER + "serializable", f = a.DELIMETER + "default", _ = h.IDENTIFIER_RE, p = h.escapeForJS, g = "var ", v = "o", y = "t", m = {
"cc.Node": "cc.Node",
"cc.Sprite": "cc.Sprite",
"cc.Label": "cc.Label",
"cc.Button": "cc.Button",
"cc.Widget": "cc.Widget",
"cc.Animation": "cc.Animation",
"cc.ClickEvent": !1,
"cc.PrefabInfo": !1
};
function C(t, e) {
this.varName = t;
this.expression = e;
}
C.prototype.toString = function() {
return g + this.varName + "=" + this.expression + ";";
};
function T(t, e) {
return e instanceof C ? new C(e.varName, t + e.expression) : t + e;
}
function b(t, e, i) {
if (Array.isArray(i)) {
i[0] = T(e, i[0]);
t.push(i);
} else t.push(T(e, i) + ";");
}
function S(t) {
this._exps = [];
this._targetExp = t;
}
S.prototype.append = function(t, e) {
this._exps.push([ t, e ]);
};
S.prototype.writeCode = function(t) {
var e;
if (this._exps.length > 1) {
t.push(y + "=" + this._targetExp + ";");
e = y;
} else {
if (1 !== this._exps.length) return;
e = this._targetExp;
}
for (var i = 0; i < this._exps.length; i++) {
var n = this._exps[i];
b(t, e + x(n[0]) + "=", n[1]);
}
};
S.pool = new l.Pool(function(t) {
t._exps.length = 0;
t._targetExp = null;
}, 1);
S.pool.get = function(t) {
var e = this._get() || new S();
e._targetExp = t;
return e;
};
function E(i, n) {
if ("function" === ("object" === (e = typeof i) ? t(i) : e)) try {
i = i();
} catch (t) {
return !1;
}
if (i === n) return !0;
if (i && n) {
if (i instanceof cc.ValueType && i.equals(n)) return !0;
if (Array.isArray(i) && Array.isArray(n) || i.constructor === Object && n.constructor === Object) try {
return JSON.stringify(i) === JSON.stringify(n);
} catch (t) {}
}
return !1;
}
function x(t) {
return _.test(t) ? "." + t : "[" + p(t) + "]";
}
function A(t, e) {
this.parent = e;
this.objsToClear_iN$t = [];
this.codeArray = [];
this.objs = [];
this.funcs = [];
this.funcModuleCache = l.createMap();
l.mixin(this.funcModuleCache, m);
this.globalVariables = [];
this.globalVariableId = 0;
this.localVariableId = 0;
this.codeArray.push(g + v + "," + y + ";", "if(R){", v + "=R;", "}else{", v + "=R=new " + this.getFuncModule(t.constructor, !0) + "();", "}");
t._iN$t = {
globalVar: "R"
};
this.objsToClear_iN$t.push(t);
this.enumerateObject(this.codeArray, t);
var i;
this.globalVariables.length > 0 && (i = g + this.globalVariables.join(",") + ";");
var n = u.flattenCodeArray([ "return (function(R){", i || [], this.codeArray, "return o;", "})" ]);
this.result = Function("O", "F", n)(this.objs, this.funcs);
for (var o = 0, r = this.objsToClear_iN$t.length; o < r; ++o) this.objsToClear_iN$t[o]._iN$t = null;
this.objsToClear_iN$t.length = 0;
}
var N = A.prototype;
N.getFuncModule = function(t, e) {
var i = l.getClassName(t);
if (i) {
var n = this.funcModuleCache[i];
if (n) return n;
if (void 0 === n) {
var o = -1 !== i.indexOf(".");
if (o) try {
if (o = t === Function("return " + i)()) {
this.funcModuleCache[i] = i;
return i;
}
} catch (t) {}
}
}
var r = this.funcs.indexOf(t);
if (r < 0) {
r = this.funcs.length;
this.funcs.push(t);
}
var s = "F[" + r + "]";
e && (s = "(" + s + ")");
this.funcModuleCache[i] = s;
return s;
};
N.getObjRef = function(t) {
var e = this.objs.indexOf(t);
if (e < 0) {
e = this.objs.length;
this.objs.push(t);
}
return "O[" + e + "]";
};
N.setValueType = function(t, e, i, n) {
var o = S.pool.get(n), r = e.constructor.__props__;
r || (r = Object.keys(e));
for (var s = 0; s < r.length; s++) {
var c = r[s], a = i[c];
if (e[c] !== a) {
var l = this.enumerateField(i, c, a);
o.append(c, l);
}
}
o.writeCode(t);
S.pool.put(o);
};
N.enumerateCCClass = function(i, n, o) {
for (var r = o.__props__, s = a.getClassAttrs(o), c = 0; c < r.length; c++) {
var l = r[c];
0;
if (!1 !== s[l + d]) {
var u = n[l];
if (E(_ = s[l + f], u)) continue;
if ("object" === ("object" === (e = typeof u) ? t(u) : e) && u instanceof cc.ValueType) {
var _;
if (((_ = h.getDefault(_)) && _.constructor) === u.constructor) {
var p = v + x(l);
this.setValueType(i, _, u, p);
continue;
}
}
this.setObjProp(i, n, l, u);
}
}
};
N.instantiateArray = function(t) {
if (0 === t.length) return "[]";
var e = "a" + ++this.localVariableId, i = [ new C(e, "new Array(" + t.length + ")") ];
t._iN$t = {
globalVar: "",
source: i
};
this.objsToClear_iN$t.push(t);
for (var n = 0; n < t.length; ++n) {
b(i, e + "[" + n + "]=", this.enumerateField(t, n, t[n]));
}
return i;
};
N.enumerateField = function(i, n, o) {
if ("object" === ("object" === (e = typeof o) ? t(o) : e) && o) {
var s = o._iN$t;
if (s) {
var a = s.globalVar;
if (!a) {
a = s.globalVar = "v" + ++this.globalVariableId;
this.globalVariables.push(a);
var l = s.source[0];
s.source[0] = T(a + "=", l);
}
return a;
}
return Array.isArray(o) ? this.instantiateArray(o) : this.instantiateObj(o);
}
if ("function" === ("object" === (e = typeof o) ? t(o) : e)) return this.getFuncModule(o);
if ("string" === ("object" === (e = typeof o) ? t(o) : e)) return p(o);
"_objFlags" === n && cc.Class.isInstanceOf(i, r) && (o &= c);
return o;
};
N.setObjProp = function(t, e, i, n) {
b(t, v + x(i) + "=", this.enumerateField(e, i, n));
};
N.enumerateObject = function(i, n) {
var o = n.constructor;
if (cc.Class._isCCClass(o)) this.enumerateCCClass(i, n, o); else for (var r in n) if (n.hasOwnProperty(r) && (95 !== r.charCodeAt(0) || 95 !== r.charCodeAt(1) || "__type__" === r)) {
var s = n[r];
"object" === ("object" === (e = typeof s) ? t(s) : e) && s && s === n._iN$t || this.setObjProp(i, n, r, s);
}
};
N.instantiateObj = function(t) {
if (t instanceof cc.ValueType) return h.getNewValueTypeCode(t);
if (cc.Class.isInstanceOf(t, cc.Asset)) return this.getObjRef(t);
if (t._objFlags & s) return null;
var e, i = t.constructor;
if (cc.Class._isCCClass(i)) {
if (this.parent) if (this.parent instanceof cc.Component) {
if (t instanceof cc._BaseNode || t instanceof cc.Component) return this.getObjRef(t);
} else if (this.parent instanceof cc._BaseNode) if (t instanceof cc._BaseNode) {
if (!t.isChildOf(this.parent)) return this.getObjRef(t);
} else if (t instanceof cc.Component && !t.node.isChildOf(this.parent)) return this.getObjRef(t);
e = new C(v, "new " + this.getFuncModule(i, !0) + "()");
} else if (i === Object) e = new C(v, "{}"); else {
if (i) return this.getObjRef(t);
e = new C(v, "Object.create(null)");
}
var n = [ e ];
t._iN$t = {
globalVar: "",
source: n
};
this.objsToClear_iN$t.push(t);
this.enumerateObject(n, t);
return [ "(function(){", n, "return o;})();" ];
};
n.exports = {
compile: function(t) {
return new A(t, t instanceof cc._BaseNode && t).result;
},
equalsToDefault: E
};
0;
}), {
"./CCClass": 128,
"./CCObject": 132,
"./attribute": 135,
"./compiler": 137,
"./js": 143
} ],
142: [ (function(i, n, o) {
var r = i("./CCObject"), s = r.Flags.Destroyed, c = r.Flags.PersistentMask, a = i("./attribute");
i("./utils").isDomNode;
function l(i, n) {
if (!n) {
if ("object" !== ("object" === (e = typeof i) ? t(i) : e) || Array.isArray(i)) {
0;
return null;
}
if (!i) {
0;
return null;
}
if (!cc.isValid(i)) {
0;
return null;
}
0;
}
var o;
if (cc.Class.isInstanceOf(i, r)) {
if (i._instantiate) {
cc.game._isCloning = !0;
o = i._instantiate();
cc.game._isCloning = !1;
return o;
}
if (cc.Class.isInstanceOf(i, cc.Asset)) {
0;
return null;
}
}
cc.game._isCloning = !0;
o = u(i);
cc.game._isCloning = !1;
return o;
}
var h = [];
function u(t, e) {
if (Array.isArray(t)) {
0;
return null;
}
0;
var i;
if (t._iN$t) i = t._iN$t; else if (t.constructor) {
i = new (0, t.constructor)();
} else i = Object.create(null);
f(t, i, e);
for (var n = 0, o = h.length; n < o; ++n) h[n]._iN$t = null;
h.length = 0;
return i;
}
var d = a.DELIMETER + "serializable";
function f(i, n, o) {
i._iN$t = n;
h.push(i);
var s = i.constructor;
if (cc.Class._isCCClass(s)) (function(i, n, o, r) {
for (var s = i.__props__, c = a.getClassAttrs(i), l = 0; l < s.length; l++) {
var h = s[l];
if (!1 !== c[h + d]) {
var u = n[h];
"object" === ("object" == (e = typeof u) ? t(u) : e) && u ? o[h] = u._iN$t || _(u, r) : o[h] = u;
}
}
})(s, i, n, o); else for (var l in i) if (i.hasOwnProperty(l) && (95 !== l.charCodeAt(0) || 95 !== l.charCodeAt(1) || "__type__" === l)) {
var u = i[l];
if ("object" === ("object" === (e = typeof u) ? t(u) : e) && u) {
if (u === n) continue;
n[l] = u._iN$t || _(u, o);
} else n[l] = u;
}
cc.Class.isInstanceOf(i, r) && (n._objFlags &= c);
}
function _(i, n) {
if (i instanceof cc.ValueType) return i.clone();
if (cc.Class.isInstanceOf(i, cc.Asset)) return i;
var o;
if (Array.isArray(i)) {
var r = i.length;
o = new Array(r);
i._iN$t = o;
for (var c = 0; c < r; ++c) {
var a = i[c];
"object" === ("object" === (e = typeof a) ? t(a) : e) && a ? o[c] = a._iN$t || _(a, n) : o[c] = a;
}
h.push(i);
return o;
}
if (i._objFlags & s) return null;
var l = i.constructor;
if (cc.Class._isCCClass(l)) {
if (n) if (n instanceof cc.Component) {
if (i instanceof cc._BaseNode || i instanceof cc.Component) return i;
} else if (n instanceof cc._BaseNode) if (i instanceof cc._BaseNode) {
if (!i.isChildOf(n)) return i;
} else if (i instanceof cc.Component && !i.node.isChildOf(n)) return i;
o = new l();
} else if (l === Object) o = {}; else {
if (l) return i;
o = Object.create(null);
}
f(i, o, n);
return o;
}
l._clone = u;
cc.instantiate = l;
n.exports = l;
}), {
"./CCObject": 132,
"./attribute": 135,
"./utils": 147
} ],
143: [ (function(i, n, o) {
var r = new (i("./id-generater"))("TmpCId.");
function s(t, e) {
for (;t; ) {
var i = Object.getOwnPropertyDescriptor(t, e);
if (i) return i;
t = Object.getPrototypeOf(t);
}
return null;
}
function c(t, e, i) {
var n = s(e, t);
Object.defineProperty(i, t, n);
}
var a = {
isNumber: function(i) {
return "number" === ("object" === (e = typeof i) ? t(i) : e) || i instanceof Number;
},
isString: function(i) {
return "string" === ("object" === (e = typeof i) ? t(i) : e) || i instanceof String;
},
addon: function(i) {
"use strict";
i = i || {};
for (var n = 1, o = arguments.length; n < o; n++) {
var r = arguments[n];
if (r) {
if ("object" !== ("object" === (e = typeof r) ? t(r) : e)) {
cc.errorID(5402, r);
continue;
}
for (var s in r) s in i || c(s, r, i);
}
}
return i;
},
mixin: function(i) {
"use strict";
i = i || {};
for (var n = 1, o = arguments.length; n < o; n++) {
var r = arguments[n];
if (r) {
if ("object" !== ("object" === (e = typeof r) ? t(r) : e)) {
cc.errorID(5403, r);
continue;
}
for (var s in r) c(s, r, i);
}
}
return i;
},
extend: function(t, e) {
0;
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
t.prototype = Object.create(e.prototype, {
constructor: {
value: t,
writable: !0,
configurable: !0
}
});
return t;
},
getSuper: function(t) {
if (t.hasOwnProperty("$super")) return t.$super;
var e = t.prototype, i = e && Object.getPrototypeOf(e);
return i && i.constructor;
},
clear: function(t) {
for (var e = Object.keys(t), i = 0; i < e.length; i++) delete t[e[i]];
},
getPropertyDescriptor: s
}, l = {
value: void 0,
enumerable: !1,
writable: !1,
configurable: !0
};
a.value = function(t, e, i, n, o) {
l.value = i;
l.writable = n;
l.enumerable = o;
Object.defineProperty(t, e, l);
l.value = void 0;
};
var h = {
get: null,
set: null,
enumerable: !1
};
a.getset = function(i, n, o, r, s) {
if ("function" !== ("object" === (e = typeof r) ? t(r) : e)) {
s = r;
r = void 0;
}
h.get = o;
h.set = r;
h.enumerable = s;
Object.defineProperty(i, n, h);
h.get = null;
h.set = null;
};
var u = {
get: null,
enumerable: !1,
configurable: !1
};
a.get = function(t, e, i, n, o) {
u.get = i;
u.enumerable = n;
u.configurable = o;
Object.defineProperty(t, e, u);
u.get = null;
};
var d = {
set: null,
enumerable: !1,
configurable: !1
};
a.set = function(t, e, i, n, o) {
d.set = i;
d.enumerable = n;
d.configurable = o;
Object.defineProperty(t, e, d);
d.set = null;
};
a.getClassName = function(i) {
if ("function" === ("object" === (e = typeof i) ? t(i) : e)) {
var n = i.prototype;
if (n && n.hasOwnProperty("__classname__") && n.__classname__) return n.__classname__;
var o = "";
i.name && (o = i.name);
if (i.toString) {
var r, s = i.toString();
(r = "[" === s.charAt(0) ? s.match(/\[\w+\s*(\w+)\]/) : s.match(/function\s*(\w+)/)) && 2 === r.length && (o = r[1]);
}
return "Object" !== o ? o : "";
}
return i && i.constructor ? a.getClassName(i.constructor) : "";
};
(function() {
var i = {}, n = {};
function o(t, e) {
return function(i, n) {
n.prototype.hasOwnProperty(t) && delete e[n.prototype[t]];
a.value(n.prototype, t, i);
if (i) {
var o = e[i];
if (o && o !== n) {
var r = "A Class already exists with the same " + t + ' : "' + i + '".';
0;
cc.error(r);
} else e[i] = n;
}
};
}
a._setClassId = o("__cid__", i);
var s = o("__classname__", n);
a.setClassName = function(t, e) {
s(t, e);
if (!e.prototype.hasOwnProperty("__cid__")) {
var i = t || r.getNewId();
i && a._setClassId(i, e);
}
};
a.unregisterClass = function() {
for (var t = 0; t < arguments.length; t++) {
var e = arguments[t].prototype, o = e.__cid__;
o && delete i[o];
var r = e.__classname__;
r && delete n[r];
}
};
a._getClassById = function(t) {
return i[t];
};
a.getClassByName = function(t) {
return n[t];
};
a._getClassId = function(i, n) {
n = "undefined" === ("object" === (e = typeof n) ? t(n) : e) || n;
if ("function" === ("object" === (e = typeof i) ? t(i) : e) && i.prototype.hasOwnProperty("__cid__")) {
0;
return i.prototype.__cid__;
}
if (i && i.constructor) {
var o = i.constructor.prototype;
if (o && o.hasOwnProperty("__cid__")) {
0;
return i.__cid__;
}
}
return "";
};
0;
})();
a.obsolete = function(t, e, i, n) {
var o = /([^.]+)$/, r = o.exec(e)[0], s = o.exec(i)[0];
function c() {
0;
return this[s];
}
n ? a.getset(t, r, c, (function(t) {
0;
this[s] = t;
})) : a.get(t, r, c);
};
a.obsoletes = function(t, e, i, n) {
for (var o in i) {
var r = i[o];
a.obsolete(t, e + "." + o, r, n);
}
};
var f = /(%d)|(%s)/, _ = /%s/;
a.formatStr = function() {
var i = arguments.length;
if (0 === i) return "";
var n = arguments[0];
if (1 === i) return "" + n;
if ("string" === ("object" === (e = typeof n) ? t(n) : e) && f.test(n)) for (var o = 1; o < i; ++o) {
var r = arguments[o], s = "number" === ("object" === (e = typeof r) ? t(r) : e) ? f : _;
s.test(n) ? n = n.replace(s, r) : n += " " + r;
} else for (var c = 1; c < i; ++c) n += " " + arguments[c];
return n;
};
a.shiftArguments = function() {
for (var t = arguments.length - 1, e = new Array(t), i = 0; i < t; ++i) e[i] = arguments[i + 1];
return e;
};
a.createMap = function(t) {
var e = Object.create(null);
if (t) {
e["."] = !0;
e["/"] = !0;
delete e["."];
delete e["/"];
}
return e;
};
function p(t, e) {
t.splice(e, 1);
}
function g(t, e) {
var i = t.indexOf(e);
if (i >= 0) {
p(t, i);
return !0;
}
return !1;
}
var v = Array.prototype.indexOf;
a.array = {
remove: g,
fastRemove: function(t, e) {
var i = t.indexOf(e);
if (i >= 0) {
t[i] = t[t.length - 1];
--t.length;
}
},
removeAt: p,
fastRemoveAt: function(t, e) {
var i = t.length;
if (!(e < 0 || e >= i)) {
t[e] = t[i - 1];
t.length = i - 1;
}
},
contains: function(t, e) {
return t.indexOf(e) >= 0;
},
verifyType: function(t, e) {
if (t && t.length > 0) for (var i = 0; i < t.length; i++) if (!(t[i] instanceof e)) {
cc.logID(1300);
return !1;
}
return !0;
},
removeArray: function(t, e) {
for (var i = 0, n = e.length; i < n; i++) g(t, e[i]);
},
appendObjectsAt: function(t, e, i) {
t.splice.apply(t, [ i, 0 ].concat(e));
return t;
},
copy: function(t) {
var e, i = t.length, n = new Array(i);
for (e = 0; e < i; e += 1) n[e] = t[e];
return n;
},
indexOf: v,
MutableForwardIterator: i("../utils/mutable-forward-iterator")
};
function y(i, n) {
if ("number" === ("object" === (e = typeof i) ? t(i) : e)) {
n = i;
i = null;
}
this.get = null;
this.count = 0;
this._pool = new Array(n);
this._cleanup = i;
}
y.prototype._get = function() {
if (this.count > 0) {
--this.count;
var t = this._pool[this.count];
this._pool[this.count] = null;
return t;
}
return null;
};
y.prototype.put = function(t) {
var e = this._pool;
if (this.count < e.length) {
if (this._cleanup && !1 === this._cleanup(t)) return;
e[this.count] = t;
++this.count;
}
};
y.prototype.resize = function(t) {
if (t >= 0) {
this._pool.length = t;
this.count > t && (this.count = t);
}
};
a.Pool = y;
cc.js = a;
n.exports = a;
}), {
"../utils/mutable-forward-iterator": 156,
"./id-generater": 139
} ],
144: [ (function(i, n, o) {
var r = {
url: {
canUsedInGet: !0
},
default: {},
serializable: {},
editorOnly: {},
formerlySerializedAs: {}
};
function s(t, e, i, n) {
if (t.get || t.set) 0; else if (t.hasOwnProperty("default")) {
var o = "_N$" + e;
t.get = function() {
return this[o];
};
t.set = function(t) {
var e = this[o];
this[o] = t;
i.call(this, e);
};
var s = {};
n[o] = s;
for (var c in r) {
var a = r[c];
if (t.hasOwnProperty(c)) {
s[c] = t[c];
a.canUsedInGet || delete t[c];
}
}
} else 0;
}
function c(t, e, i, n) {
Array.isArray(n) && n.length > 0 && (n = n[0]);
0;
t.type = n;
}
function a(t, e, i, n) {
if (Array.isArray(e)) {
if (!(e.length > 0)) return cc.errorID(5508, i, n);
if (cc.RawAsset.isRawAssetType(e[0])) {
t.url = e[0];
delete t.type;
return;
}
t.type = e = e[0];
}
0;
}
o.getFullFormOfProperty = function(i, n, o) {
if (!(i && i.constructor === Object)) {
if (Array.isArray(i) && i.length > 0) {
var r = i[0];
0;
return {
default: [],
type: i,
_short: !0
};
}
if ("function" === ("object" === (e = typeof i) ? t(i) : e)) {
r = i;
if (!cc.RawAsset.isRawAssetType(r)) {
if (!cc.RawAsset.wasRawAssetType(r)) return {
default: cc.isChildClassOf(r, cc.ValueType) ? new r() : null,
type: r,
_short: !0
};
0;
}
return {
default: "",
url: r,
_short: !0
};
}
return {
default: i,
_short: !0
};
}
return null;
};
o.preprocessAttrs = function(t, e, i, n) {
for (var r in t) {
var l = t[r], h = o.getFullFormOfProperty(l, r, e);
h && (l = t[r] = h);
if (l) {
var u = l.notify;
u && s(l, r, u, t);
"type" in l && a(l, l.type, e, r);
"url" in l && c(l, 0, 0, l.url);
"type" in l && l.type;
}
}
};
0;
o.validateMethodWithProps = function(i, n, o, r, s) {
0;
if ("function" !== ("object" === (e = typeof i) ? t(i) : e) && null !== i) {
return !1;
}
0;
return !0;
};
}), {
"./CCClass": 128
} ],
145: [ (function(t, e, i) {
var n = [];
cc._RF = {
push: function(t, e, i) {
if (void 0 === i) {
i = e;
e = "";
}
n.push({
uuid: e,
script: i,
module: t,
exports: t.exports,
beh: null
});
},
pop: function() {
var t = n.pop(), e = t.module, i = e.exports;
if (i === t.exports) {
for (var o in i) return;
e.exports = i = t.cls;
}
},
peek: function() {
return n[n.length - 1];
}
};
0;
}), {} ],
146: [ (function(t, e, i) {
cc.url = {
_rawAssets: "",
normalize: function(t) {
t && (46 === t.charCodeAt(0) && 47 === t.charCodeAt(1) ? t = t.slice(2) : 47 === t.charCodeAt(0) && (t = t.slice(1)));
return t;
},
raw: function(t) {
0;
if ((t = this.normalize(t)).startsWith("resources/")) {
var e = cc.loader._getResUuid(t.slice(10), cc.Asset, !0);
if (e) return cc.AssetLibrary.getLibUrlNoExt(e, !0) + cc.path.extname(t);
} else cc.errorID(7002, t);
return this._rawAssets + t;
},
_init: function(t) {
this._rawAssets = cc.path.stripSep(t) + "/";
}
};
e.exports = cc.url;
}), {} ],
147: [ (function(i, n, o) {
n.exports = {
contains: function(i, n) {
if ("function" == ("object" === (e = typeof i.contains) ? t(i.contains) : e)) return i.contains(n);
if ("function" == ("object" === (e = typeof i.compareDocumentPosition) ? t(i.compareDocumentPosition) : e)) return !!(16 & i.compareDocumentPosition(n));
var o = n.parentNode;
if (o) do {
if (o === i) return !0;
o = o.parentNode;
} while (null !== o);
return !1;
},
isDomNode: "object" === (e = typeof window, "object" === e ? t(window) : e) && ("function" === (e = typeof Node, 
"object" === e ? t(Node) : e) ? function(t) {
return t instanceof Node;
} : function(i) {
return i && "object" === ("object" === (e = typeof i) ? t(i) : e) && "number" === ("object" === (e = typeof i.nodeType) ? t(i.nodeType) : e) && "string" === ("object" === (e = typeof i.nodeName) ? t(i.nodeName) : e);
}),
callInNextTick: function(t, e, i) {
t && cc.director.once(cc.Director._EVENT_NEXT_TICK, (function() {
t(e, i);
}));
}
};
0;
0;
}), {} ],
148: [ (function(i, n, o) {
var r = i("../event/event-target"), s = cc.Class({
name: "cc.SpriteFrame",
extends: i("../assets/CCAsset"),
mixins: [ r ],
properties: {
_textureSetter: {
set: function(t) {
if (t) {
0;
this._texture !== t && this._refreshTexture(t);
this._textureFilename = t.url;
}
}
}
},
ctor: function() {
var t = arguments[0], e = arguments[1], i = arguments[2], n = arguments[3], o = arguments[4];
this._rect = null;
this._offset = null;
this._originalSize = null;
this._rotated = !1;
this.insetTop = 0;
this.insetBottom = 0;
this.insetLeft = 0;
this.insetRight = 0;
this._texture = null;
this._textureFilename = "";
0;
void 0 !== t && this.initWithTexture(t, e, i, n, o);
},
textureLoaded: function() {
return this._texture && this._texture.loaded;
},
addLoadedEventListener: function(t, e) {
this.once("load", t, e);
},
isRotated: function() {
return this._rotated;
},
setRotated: function(t) {
this._rotated = t;
},
getRect: function() {
return cc.rect(this._rect);
},
setRect: function(t) {
this._rect = t;
},
getOriginalSize: function() {
return cc.size(this._originalSize);
},
setOriginalSize: function(t) {
if (this._originalSize) {
this._originalSize.width = t.width;
this._originalSize.height = t.height;
} else this._originalSize = cc.size(t);
},
getTexture: function() {
return this._texture;
},
_textureLoadedCallback: function() {
var t = this._texture;
if (t) {
var e = t.width, i = t.height;
if (this._rotated && cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
this._texture = _ccsg.Sprite.CanvasRenderCmd._createRotatedTexture(t, this.getRect());
this._rotated = !1;
e = this._texture.width;
i = this._texture.height;
this.setRect(cc.rect(0, 0, e, i));
}
this._rect ? this._checkRect(this._texture) : this.setRect(cc.rect(0, 0, e, i));
this._originalSize || this.setOriginalSize(cc.size(e, i));
this._offset || this.setOffset(cc.v2(0, 0));
this.emit("load");
}
},
_refreshTexture: function(t) {
this._texture = t;
t.loaded ? this._textureLoadedCallback() : t.once("load", this._textureLoadedCallback, this);
},
getOffset: function() {
return cc.v2(this._offset);
},
setOffset: function(t) {
this._offset = cc.v2(t);
},
clone: function() {
return new s(this._texture || this._textureFilename, this._rect, this._rotated, this._offset, this._originalSize);
},
setTexture: function(i, n, o, r, s) {
n ? this.setRect(n) : this._rect = null;
r ? this.setOffset(r) : this._offset = null;
s ? this.setOriginalSize(s) : this._originalSize = null;
this._rotated = o || !1;
var c = i;
"string" === ("object" === (e = typeof c) ? t(c) : e) && c && (c = cc.textureCache.addImage(c));
c instanceof cc.Texture2D && this._texture !== c && this._refreshTexture(c);
return !0;
},
ensureLoadTexture: function() {
if (this._texture) {
if (!this._texture.loaded) {
this._refreshTexture(this._texture);
this._texture.load();
}
} else if (this._textureFilename) {
var t = cc.textureCache.addImage(this._textureFilename);
this._refreshTexture(t);
}
},
clearTexture: function() {
this._texture = null;
},
_checkRect: function(t) {
var e = this._rect, i = e.x, n = e.y;
if (this._rotated) {
i += e.height;
n += e.width;
} else {
i += e.width;
n += e.height;
}
i > t.width && cc.errorID(3300, t.url + "/" + this.name, i, t.width);
n > t.height && cc.errorID(3400, t.url + "/" + this.name, n, t.height);
},
_serialize: !1,
_deserialize: function(t, e) {
var i = t.rect;
i && this.setRect(new cc.Rect(i[0], i[1], i[2], i[3]));
t.offset && this.setOffset(new cc.Vec2(t.offset[0], t.offset[1]));
t.originalSize && this.setOriginalSize(new cc.Size(t.originalSize[0], t.originalSize[1]));
this._rotated = 1 === t.rotated;
this._name = t.name;
var n = t.capInsets;
if (n) {
this.insetLeft = n[0];
this.insetTop = n[1];
this.insetRight = n[2];
this.insetBottom = n[3];
}
0;
var o = t.texture;
o && e.result.push(this, "_textureSetter", o);
}
}), c = s.prototype;
c.copyWithZone = c.clone;
c.copy = c.clone;
c.initWithTexture = c.setTexture;
0;
n.exports = s;
}), {
"../assets/CCAsset": 17,
"../event/event-target": 79
} ],
149: [ (function(t, e, i) {
var n = t("../event/event-target"), o = (t("../platform/CCSys"), t("../platform/js")), r = (t("../utils/misc"), 
t("../CCGame"));
t("../platform/CCClass");
var s = cc.Enum({
RGB565: 0,
RGB5A1: 1,
RGBA4444: 2,
RGB888: 3,
RGBA8888: 4,
A8: 5,
I8: 6,
AI8: 7
}), c = cc.Enum({
REPEAT: 10497,
CLAMP_TO_EDGE: 33071,
MIRRORED_REPEAT: 33648
}), a = cc.Enum({
LINEAR: 9729,
NEAREST: 9728
}), l = cc.Class({
name: "cc.Texture2D",
extends: t("../assets/CCAsset"),
mixins: [ n ],
ctor: function(t) {
this.url = "";
this.loaded = !1;
this.width = 0;
this.height = 0;
this._image = null;
if (cc._renderType === r.RENDER_TYPE_CANVAS) {
this._pattern = "";
this._grayElementObj = null;
this._backupElement = null;
this._isGray = !1;
} else if (cc._renderType === r.RENDER_TYPE_WEBGL) {
this._gl = t || cc._renderContext;
this._glID = null;
}
},
properties: {
_nativeAsset: {
get: function() {
return this._image;
},
set: function(t) {
this.initWithElement(t);
this.handleLoadedTexture();
},
override: !0
},
_hasMipmap: !1,
_format: s.RGBA8888,
_compressed: !1,
_premultiplyAlpha: !1,
_minFilter: a.LINEAR,
_magFilter: a.LINEAR,
_wrapS: c.CLAMP_TO_EDGE,
_wrapT: c.CLAMP_TO_EDGE
},
statics: {
WrapMode: c,
PixelFormat: s,
Filter: a,
extnames: [ ".png", ".jpg", ".jpeg", ".bmp", ".webp" ]
},
update: function(t) {},
toString: function() {
return this.url || "";
},
getPixelWidth: function() {
return this.width;
},
getPixelHeight: function() {
return this.height;
},
getContentSize: function() {
return cc.size(this.width, this.height);
},
getContentSizeInPixels: function() {
return this.getContentSize();
},
initWithElement: function(t) {
if (t) {
this._image = t;
this.width = t.width;
this.height = t.height;
this.loaded = !0;
}
},
initWithData: function(t, e, i, n, o) {
return !1;
},
initWithImage: function(t) {
return !1;
},
getHtmlElementObj: function() {
return this._image;
},
load: function(t) {
if (this.loaded) t && t(); else if (this.url) {
var e = this;
cc.loader.load({
url: this.url,
_owner: this
}, (function(i, n) {
if (n) {
0;
e.loaded || (e._nativeAsset = n);
}
t && t(i);
}));
} else t && t();
},
isLoaded: function() {
0;
return this.loaded;
},
handleLoadedTexture: function() {
if (this._image && this._image.width && this._image.height) {
var t = this._image;
this.width = t.width;
this.height = t.height;
this.loaded = !0;
this.emit("load");
}
},
description: function() {
return "<cc.Texture2D | Name = " + this.url + " | Dimensions = " + this.width + " x " + this.height + ">";
},
_releaseTexture: function() {
if (this._gl && null !== this._glID) {
this._gl.deleteTexture(this._glID);
this._glID = null;
}
},
destroy: function() {
this._releaseTexture();
cc.textureCache.removeTextureForKey(this.url);
this._super();
},
getPixelFormat: function() {
return this._format;
},
hasPremultipliedAlpha: function() {
return this._premultiplyAlpha || !1;
},
hasMipmaps: function() {
return this._hasMipmap || !1;
},
setTexParameters: function(t, e, i, n) {
void 0 !== e && (t = {
minFilter: t,
magFilter: e,
wrapS: i,
wrapT: n
});
t.wrapS !== c.REPEAT || t.wrapT !== c.REPEAT ? t.wrapS !== c.REPEAT ? t.wrapT !== c.REPEAT ? this._pattern = "" : this._pattern = "repeat-y" : this._pattern = "repeat-x" : this._pattern = "repeat";
},
setAntiAliasTexParameters: function() {},
setAliasTexParameters: function() {},
_serialize: !1,
_deserialize: function(t, e) {
var i = t.split(",")[0];
if (i) {
var n = i.charCodeAt(0) - 48, o = l.extnames[n];
this._setRawAsset(o || i);
var r = e.customEnv, s = r && r.uuid;
if (s) {
this._uuid = s;
var c = this.nativeUrl;
this.url = c;
cc.textureCache.cacheImage(c, this);
}
}
}
}), h = l.prototype;
o.get(h, "pixelFormat", h.getPixelFormat);
o.get(h, "pixelWidth", h.getPixelWidth);
o.get(h, "pixelHeight", h.getPixelHeight);
0;
e.exports = l;
}), {
"../CCGame": 1,
"../assets/CCAsset": 17,
"../event/event-target": 79,
"../platform/CCClass": 128,
"../platform/CCSys": 133,
"../platform/js": 143,
"../utils/misc": 155
} ],
150: [ (function(t, e, i) {
t("../platform/CCSys");
var n = /(\.[^\.\/\?\\]*)(\?.*)?$/, o = /((.*)(\/|\\|\\\\))?(.*?\..*$)?/, r = /[^\.\/]+\/\.\.\//;
cc.path = {
join: function() {
for (var t = arguments.length, e = "", i = 0; i < t; i++) e = (e + ("" === e ? "" : "/") + arguments[i]).replace(/(\/|\\\\)$/, "");
return e;
},
extname: function(t) {
var e = n.exec(t);
return e ? e[1] : "";
},
mainFileName: function(t) {
if (t) {
var e = t.lastIndexOf(".");
if (-1 !== e) return t.substring(0, e);
}
return t;
},
basename: function(t, e) {
var i = t.indexOf("?");
i > 0 && (t = t.substring(0, i));
var n = /(\/|\\\\)([^(\/|\\\\)]+)$/g.exec(t.replace(/(\/|\\\\)$/, ""));
if (!n) return null;
var o = n[2];
return e && t.substring(t.length - e.length).toLowerCase() === e.toLowerCase() ? o.substring(0, o.length - e.length) : o;
},
dirname: function(t) {
var e = o.exec(t);
return e ? e[2] : "";
},
changeExtname: function(t, e) {
e = e || "";
var i = t.indexOf("?"), n = "";
if (i > 0) {
n = t.substring(i);
t = t.substring(0, i);
}
return (i = t.lastIndexOf(".")) < 0 ? t + e + n : t.substring(0, i) + e + n;
},
changeBasename: function(t, e, i) {
if (0 === e.indexOf(".")) return this.changeExtname(t, e);
var n = t.indexOf("?"), o = "", r = i ? this.extname(t) : "";
if (n > 0) {
o = t.substring(n);
t = t.substring(0, n);
}
n = (n = t.lastIndexOf("/")) <= 0 ? 0 : n + 1;
return t.substring(0, n) + e + r + o;
},
_normalize: function(t) {
var e = t = String(t);
do {
e = t;
t = t.replace(r, "");
} while (e.length !== t.length);
return t;
},
sep: cc.sys.os === cc.sys.OS_WINDOWS ? "\\" : "/",
stripSep: function(t) {
return t.replace(/[\/\\]$/, "");
}
};
e.exports = cc.path;
}), {
"../platform/CCSys": 133
} ],
151: [ (function(i, n, o) {
var r = i("./prefab-helper"), s = i("../platform/CCObject").Flags, c = i("./misc"), a = i("../platform/id-generater"), l = (i("../event-manager"), 
cc.js), h = s.Destroying, u = s.DontDestroy, d = s.Deactivating, f = new a("Node");
function _(i) {
if (!i) {
cc.errorID(3804);
return null;
}
return "string" === ("object" === (e = typeof i) ? t(i) : e) ? l.getClassByName(i) : i;
}
function p(t, e) {
if (e._sealed) for (var i = 0; i < t._components.length; ++i) {
var n = t._components[i];
if (n.constructor === e) return n;
} else for (var o = 0; o < t._components.length; ++o) {
var r = t._components[o];
if (r instanceof e) return r;
}
return null;
}
function g(t, e, i) {
if (e._sealed) for (var n = 0; n < t._components.length; ++n) {
var o = t._components[n];
o.constructor === e && i.push(o);
} else for (var r = 0; r < t._components.length; ++r) {
var s = t._components[r];
s instanceof e && i.push(s);
}
}
var v = cc.Class({
name: "cc._BaseNode",
extends: cc.Object,
mixins: [ cc.EventTarget ],
properties: {
_parent: null,
_children: [],
_tag: cc.macro.NODE_TAG_INVALID,
_active: !0,
_components: [],
_prefab: null,
_persistNode: {
get: function() {
return (this._objFlags & u) > 0;
},
set: function(t) {
t ? this._objFlags |= u : this._objFlags &= ~u;
}
},
name: {
get: function() {
return this._name;
},
set: function(t) {
0;
this._name = t;
}
},
_id: {
default: "",
editorOnly: !0
},
uuid: {
get: function() {
var t = this._id;
t || (t = this._id = f.getNewId());
return t;
}
},
children: {
get: function() {
return this._children;
}
},
childrenCount: {
get: function() {
return this._children.length;
}
},
active: {
get: function() {
return this._active;
},
set: function(t) {
t = !!t;
if (this._active !== t) {
this._active = t;
var e = this._parent;
if (e) {
e._activeInHierarchy && cc.director._nodeActivator.activateNode(this, t);
}
}
}
},
activeInHierarchy: {
get: function() {
return this._activeInHierarchy;
}
}
},
ctor: function(i) {
this._name = "undefined" !== ("object" === (e = typeof i) ? t(i) : e) ? i : "New Node";
this._activeInHierarchy = !1;
this.__instanceId = this._id || cc.ClassManager.getNewInstanceId();
this.__eventTargets = [];
},
getTag: function() {
return this._tag;
},
setTag: function(t) {
this._tag = t;
},
getParent: function() {
return this._parent;
},
setParent: function(t) {
if (this._parent !== t) {
0;
var e = this._parent;
0;
this._parent = t || null;
this._onSetParent(t);
if (t) {
0;
0;
t._children.push(this);
t.emit("child-added", this);
}
if (e) {
if (!(e._objFlags & h)) {
var i = e._children.indexOf(this);
0;
e._children.splice(i, 1);
e.emit("child-removed", this);
this._onHierarchyChanged(e);
}
} else t && this._onHierarchyChanged(null);
}
},
init: function() {
return !0;
},
attr: function(t) {
l.mixin(this, t);
},
getChildByTag: function(t) {
var e = this._children;
if (null !== e) for (var i = 0; i < e.length; i++) {
var n = e[i];
if (n && n._tag === t) return n;
}
return null;
},
getChildByUuid: function(t) {
if (!t) {
cc.log("Invalid uuid");
return null;
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) if (e[i]._id === t) return e[i];
return null;
},
getChildByName: function(t) {
if (!t) {
cc.log("Invalid name");
return null;
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) if (e[i]._name === t) return e[i];
return null;
},
addChild: function(t) {
0;
cc.assertID(t, 1606);
cc.assertID(null === t._parent, 1605);
t.setParent(this);
},
insertChild: function(t, e) {
t.parent = this;
t.setSiblingIndex(e);
},
getSiblingIndex: function() {
return this._parent ? this._parent._children.indexOf(this) : 0;
},
setSiblingIndex: function(t) {
if (this._parent) if (this._parent._objFlags & d) cc.errorID(3821); else {
var e = this._parent._children;
t = -1 !== t ? t : e.length - 1;
var i = e.indexOf(this);
if (t !== i) {
e.splice(i, 1);
t < e.length ? e.splice(t, 0, this) : e.push(this);
this._onSiblingIndexChanged && this._onSiblingIndexChanged(t);
}
}
},
cleanup: function() {},
removeFromParent: function(t) {
if (this._parent) {
void 0 === t && (t = !0);
this._parent.removeChild(this, t);
}
},
removeChild: function(t, e) {
if (this._children.indexOf(t) > -1) {
(e || void 0 === e) && t.cleanup();
t.parent = null;
}
},
removeChildByTag: function(t, e) {
t === cc.macro.NODE_TAG_INVALID && cc.logID(1609);
var i = this.getChildByTag(t);
i ? this.removeChild(i, e) : cc.logID(1610, t);
},
removeAllChildren: function(t) {
var e = this._children;
void 0 === t && (t = !0);
for (var i = e.length - 1; i >= 0; i--) {
var n = e[i];
if (n) {
t && n.cleanup();
n.parent = null;
}
}
this._children.length = 0;
},
isChildOf: function(t) {
var e = this;
do {
if (e === t) return !0;
e = e._parent;
} while (e);
return !1;
},
getComponent: function(t) {
var e = _(t);
return e ? p(this, e) : null;
},
getComponents: function(t) {
var e = _(t), i = [];
e && g(this, e, i);
return i;
},
getComponentInChildren: function(t) {
var e = _(t);
return e ? (function t(e, i) {
for (var n = 0; n < e.length; ++n) {
var o = e[n], r = p(o, i);
if (r) return r;
if (o._children.length > 0 && (r = t(o._children, i))) return r;
}
return null;
})(this._children, e) : null;
},
getComponentsInChildren: function(t) {
var e = _(t), i = [];
if (e) {
g(this, e, i);
(function t(e, i, n) {
for (var o = 0; o < e.length; ++o) {
var r = e[o];
g(r, i, n);
r._children.length > 0 && t(r._children, i, n);
}
})(this._children, e, i);
}
return i;
},
_checkMultipleComp: !1,
addComponent: function(i) {
0;
var n;
if ("string" === ("object" === (e = typeof i) ? t(i) : e)) {
if (!(n = l.getClassByName(i))) {
cc.errorID(3807, i);
cc._RFpeek() && cc.errorID(3808, i);
return null;
}
} else {
if (!i) {
cc.errorID(3804);
return null;
}
n = i;
}
if ("function" !== ("object" === (e = typeof n) ? t(n) : e)) {
cc.errorID(3809);
return null;
}
if (!cc.isChildClassOf(n, cc.Component)) {
cc.errorID(3810);
return null;
}
0;
var o = n._requireComponent;
if (o && !this.getComponent(o)) {
if (!this.addComponent(o)) return null;
}
var r = new n();
r.node = this;
this._components.push(r);
this._activeInHierarchy && cc.director._nodeActivator.activateComp(r);
return r;
},
_addComponentAt: !1,
removeComponent: function(t) {
if (t) {
t instanceof cc.Component || (t = this.getComponent(t));
t && t.destroy();
} else cc.errorID(3813);
},
_getDependComponent: !1,
_removeComponent: function(t) {
if (t) {
if (!(this._objFlags & h)) {
var e = this._components.indexOf(t);
-1 !== e ? this._components.splice(e, 1) : t.node !== this && cc.errorID(3815);
}
} else cc.errorID(3814);
},
_disableChildComps: function() {
var t, e = this._components.length;
for (t = 0; t < e; ++t) {
var i = this._components[t];
i._enabled && cc.director._compScheduler.disableComp(i);
}
for (t = 0, e = this._children.length; t < e; ++t) {
var n = this._children[t];
n._active && n._disableChildComps();
}
},
destroy: function() {
cc.Object.prototype.destroy.call(this) && this._activeInHierarchy && this._disableChildComps();
},
destroyAllChildren: function() {
for (var t = this._children, e = 0; e < t.length; ++e) t[e].destroy();
},
_onSetParent: function(t) {},
_onPostActivated: function() {},
_onBatchRestored: function() {
for (var t = this._children, e = 0, i = t.length; e < i; e++) t[e]._onBatchRestored();
},
_onHierarchyChanged: function(t) {
var e = this._parent;
if (this._persistNode && !(e instanceof cc.Scene)) {
cc.game.removePersistRootNode(this);
0;
}
var i = this._active && !(!e || !e._activeInHierarchy);
this._activeInHierarchy !== i && cc.director._nodeActivator.activateNode(this, i);
},
_onBatchCreated: function() {
var t = this._prefab;
if (t && t.sync && t.root === this) {
0;
r.syncWithPrefab(this);
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) e[i]._onBatchCreated();
},
_instantiate: function(t) {
t || (t = cc.instantiate._clone(this, this));
var e = this._prefab;
e && this === e.root && e.sync;
t._parent = null;
t._onBatchRestored();
return t;
},
_registerIfAttached: !1,
_onPreDestroy: function() {
var t, e;
this._objFlags |= h;
var i = this._parent, n = i && i._objFlags & h;
0;
var o = this._children;
for (t = 0, e = o.length; t < e; ++t) o[t]._destroyImmediate();
for (t = 0, e = this._components.length; t < e; ++t) {
this._components[t]._destroyImmediate();
}
var r = this.__eventTargets;
for (t = 0, e = r.length; t < e; ++t) {
var s = r[t];
s && s.targetOff(this);
}
r.length = 0;
this._persistNode && cc.game.removePersistRootNode(this);
if (!n && i) {
var c = i._children.indexOf(this);
i._children.splice(c, 1);
i.emit("child-removed", this);
}
return n;
},
onRestore: !1
});
v.prototype._onPreDestroyBase = v.prototype._onPreDestroy;
0;
v.prototype._onHierarchyChangedBase = v.prototype._onHierarchyChanged;
0;
c.propertyDefine(v, [ "name", "children", "childrenCount" ], {});
0;
cc._BaseNode = n.exports = v;
}), {
"../event-manager": 77,
"../platform/CCObject": 132,
"../platform/id-generater": 139,
"./misc": 155,
"./prefab-helper": 157
} ],
152: [ (function(t, e, i) {
var n = 1e-6;
e.exports = {
binarySearchEpsilon: function(t, e) {
for (var i = 0, o = t.length - 1, r = o >>> 1; i <= o; r = i + o >>> 1) {
var s = t[r];
if (s > e + n) o = r - 1; else {
if (!(s < e - n)) return r;
i = r + 1;
}
}
return ~i;
}
};
}), {} ],
153: [ (function(t, e, i) {
var n = t("./misc").BASE64_VALUES, o = "0123456789abcdef".split(""), r = [ "", "", "", "" ], s = r.concat(r, "-", r, "-", r, "-", r, "-", r, r, r), c = s.map((function(t, e) {
return "-" === t ? NaN : e;
})).filter(isFinite);
e.exports = function(t) {
if (22 !== t.length) return t;
s[0] = t[0];
s[1] = t[1];
for (var e = 2, i = 2; e < 22; e += 2) {
var r = n[t.charCodeAt(e)], a = n[t.charCodeAt(e + 1)];
s[c[i++]] = o[r >> 2];
s[c[i++]] = o[(3 & r) << 2 | a >> 4];
s[c[i++]] = o[15 & a];
}
return s.join("");
};
0;
}), {
"./misc": 155
} ],
154: [ (function(t, e, i) {
cc.find = e.exports = function(t, e) {
if (null == t) {
cc.errorID(5600);
return null;
}
if (e) 0; else {
var i = cc.director.getScene();
if (!i) {
0;
return null;
}
0;
e = i;
}
for (var n = e, o = "/" !== t[0] ? 0 : 1, r = t.split("/"), s = o; s < r.length; s++) {
var c = r[s], a = n._children;
n = null;
for (var l = 0, h = a.length; l < h; ++l) {
var u = a[l];
if (u.name === c) {
n = u;
break;
}
}
if (!n) return null;
}
return n;
};
}), {} ],
155: [ (function(t, e, i) {
var n = t("../platform/js"), o = t("../platform/CCSys"), r = i;
r.propertyDefine = function(t, e, i) {
function n(t, e, i, n) {
var o = Object.getOwnPropertyDescriptor(t, e);
if (o) {
o.get && (t[i] = o.get);
o.set && n && (t[n] = o.set);
} else {
var r = t[i];
cc.js.getset(t, e, r, t[n]);
}
}
for (var o, r = t.prototype, s = 0; s < e.length; s++) {
var c = (o = e[s])[0].toUpperCase() + o.slice(1);
n(r, o, "get" + c, "set" + c);
}
for (o in i) {
var a = i[o];
n(r, o, a[0], a[1]);
}
};
r.NextPOT = function(t) {
t -= 1;
t |= t >> 1;
t |= t >> 2;
t |= t >> 4;
t |= t >> 8;
return (t |= t >> 16) + 1;
};
0;
r.imagePool = new n.Pool(function(t) {
if (t instanceof HTMLImageElement) {
t.src = this._smallImg;
return !0;
}
return !1;
}, 10);
r.imagePool.get = function() {
return this._get() || new Image();
};
r.imagePool._smallImg = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
o.os !== o.OS_WINDOWS && o.os !== o.OS_LINUX || o.browserType === o.BROWSER_TYPE_CHROME || r.imagePool.resize(0);
r.BUILTIN_CLASSID_RE = /^(?:cc|dragonBones|sp|ccsg)\..+/;
for (var s = new Array(123), c = 0; c < 123; ++c) s[c] = 64;
for (var a = 0; a < 64; ++a) s["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charCodeAt(a)] = a;
r.BASE64_VALUES = s;
r.pushToMap = function(t, e, i, n) {
var o = t[e];
if (o) if (Array.isArray(o)) if (n) {
o.push(o[0]);
o[0] = i;
} else o.push(i); else t[e] = n ? [ i, o ] : [ o, i ]; else t[e] = i;
};
}), {
"../platform/CCSys": 133,
"../platform/js": 143
} ],
156: [ (function(t, e, i) {
function n(t) {
this.i = 0;
this.array = t;
}
var o = n.prototype;
o.remove = function(t) {
var e = this.array.indexOf(t);
e >= 0 && this.removeAt(e);
};
o.removeAt = function(t) {
this.array.splice(t, 1);
t <= this.i && --this.i;
};
o.fastRemove = function(t) {
var e = this.array.indexOf(t);
e >= 0 && this.fastRemoveAt(e);
};
o.fastRemoveAt = function(t) {
var e = this.array;
e[t] = e[e.length - 1];
--e.length;
t <= this.i && --this.i;
};
o.push = function(t) {
this.array.push(t);
};
e.exports = n;
}), {} ],
157: [ (function(t, e, i) {
cc._PrefabInfo = cc.Class({
name: "cc.PrefabInfo",
properties: {
root: null,
asset: null,
fileId: "",
sync: !1,
_synced: {
default: !1,
serializable: !1
}
}
});
e.exports = {
syncWithPrefab: function(t) {
var e = t._prefab;
e._synced = !0;
if (e.asset) {
var i = t._objFlags, n = t._parent, o = t._id, r = t._name, s = t._active, c = t._position.x, a = t._position.y, l = t._rotationX, h = t._rotationY, u = t._localZOrder, d = t._globalZOrder;
cc.game._isCloning = !0;
e.asset._doInstantiate(t);
cc.game._isCloning = !1;
t._objFlags = i;
t._parent = n;
t._id = o;
t._prefab = e;
t._name = r;
t._active = s;
t._position.x = c;
t._position.y = a;
t._rotationX = l;
t._rotationY = h;
t._localZOrder = u;
t._globalZOrder = d;
} else {
cc.errorID(3701, t.name);
t._prefab = null;
}
}
};
}), {} ],
158: [ (function(t, e, i) {
var n = {
removeSgNode: function() {
var t = this._sgNode;
if (t) {
var e = t._parent;
e ? e.removeChild(t) : t.cleanup();
t._entity && (t._entity = null);
}
}
};
0;
e.exports = n;
}), {} ],
159: [ (function(t, e, i) {
cc.AffineTransform = function(t, e, i, n, o, r) {
this.a = t;
this.b = e;
this.c = i;
this.d = n;
this.tx = o;
this.ty = r;
};
cc.affineTransformMake = function(t, e, i, n, o, r) {
return {
a: t,
b: e,
c: i,
d: n,
tx: o,
ty: r
};
};
cc.affineTransformClone = function(t) {
return {
a: t.a,
b: t.b,
c: t.c,
d: t.d,
tx: t.tx,
ty: t.ty
};
};
cc.pointApplyAffineTransform = function(t, e, i) {
var n, o;
if (void 0 === i) {
i = e;
n = t.x;
o = t.y;
} else {
n = t;
o = e;
}
return {
x: i.a * n + i.c * o + i.tx,
y: i.b * n + i.d * o + i.ty
};
};
cc._pointApplyAffineTransformIn = function(t, e, i, n) {
var o, r, s;
if (void 0 === n) {
s = e;
o = t.x;
r = t.y;
n = i;
} else {
o = t;
r = e;
s = i;
}
n.x = s.a * o + s.c * r + s.tx;
n.y = s.b * o + s.d * r + s.ty;
};
cc._pointApplyAffineTransform = function(t, e, i) {
return cc.pointApplyAffineTransform(t, e, i);
};
cc.sizeApplyAffineTransform = function(t, e) {
return {
width: e.a * t.width + e.c * t.height,
height: e.b * t.width + e.d * t.height
};
};
cc.affineTransformMakeIdentity = function() {
return {
a: 1,
b: 0,
c: 0,
d: 1,
tx: 0,
ty: 0
};
};
cc.affineTransformIdentity = function() {
return {
a: 1,
b: 0,
c: 0,
d: 1,
tx: 0,
ty: 0
};
};
cc.rectApplyAffineTransform = function(t, e) {
var i = t.x, n = t.y, o = i + t.width, r = n + t.height, s = e.a * i + e.c * n + e.tx, c = e.b * i + e.d * n + e.ty, a = e.a * o + e.c * n + e.tx, l = e.b * o + e.d * n + e.ty, h = e.a * i + e.c * r + e.tx, u = e.b * i + e.d * r + e.ty, d = e.a * o + e.c * r + e.tx, f = e.b * o + e.d * r + e.ty, _ = Math.min(s, a, h, d), p = Math.max(s, a, h, d), g = Math.min(c, l, u, f), v = Math.max(c, l, u, f);
return cc.rect(_, g, p - _, v - g);
};
cc._rectApplyAffineTransformIn = function(t, e) {
var i = t.x, n = t.y, o = i + t.width, r = n + t.height, s = e.a * i + e.c * n + e.tx, c = e.b * i + e.d * n + e.ty, a = e.a * o + e.c * n + e.tx, l = e.b * o + e.d * n + e.ty, h = e.a * i + e.c * r + e.tx, u = e.b * i + e.d * r + e.ty, d = e.a * o + e.c * r + e.tx, f = e.b * o + e.d * r + e.ty, _ = Math.min(s, a, h, d), p = Math.max(s, a, h, d), g = Math.min(c, l, u, f), v = Math.max(c, l, u, f);
t.x = _;
t.y = g;
t.width = p - _;
t.height = v - g;
return t;
};
cc.obbApplyAffineTransform = function(t, e, i, n, o, r) {
var s = t.x, c = t.y, a = t.width, l = t.height, h = e.a * s + e.c * c + e.tx, u = e.b * s + e.d * c + e.ty, d = e.a * a, f = e.b * a, _ = e.c * l, p = e.d * l;
n.x = h;
n.y = u;
o.x = d + h;
o.y = f + u;
i.x = _ + h;
i.y = p + u;
r.x = d + _ + h;
r.y = f + p + u;
};
cc.affineTransformTranslate = function(t, e, i) {
return {
a: t.a,
b: t.b,
c: t.c,
d: t.d,
tx: t.tx + t.a * e + t.c * i,
ty: t.ty + t.b * e + t.d * i
};
};
cc.affineTransformScale = function(t, e, i) {
return {
a: t.a * e,
b: t.b * e,
c: t.c * i,
d: t.d * i,
tx: t.tx,
ty: t.ty
};
};
cc.affineTransformRotate = function(t, e) {
var i = Math.sin(e), n = Math.cos(e);
return {
a: t.a * n + t.c * i,
b: t.b * n + t.d * i,
c: t.c * n - t.a * i,
d: t.d * n - t.b * i,
tx: t.tx,
ty: t.ty
};
};
cc.affineTransformConcat = function(t, e) {
return {
a: t.a * e.a + t.b * e.c,
b: t.a * e.b + t.b * e.d,
c: t.c * e.a + t.d * e.c,
d: t.c * e.b + t.d * e.d,
tx: t.tx * e.a + t.ty * e.c + e.tx,
ty: t.tx * e.b + t.ty * e.d + e.ty
};
};
cc.affineTransformConcatIn = function(t, e) {
var i = t.a, n = t.b, o = t.c, r = t.d, s = t.tx, c = t.ty;
t.a = i * e.a + n * e.c;
t.b = i * e.b + n * e.d;
t.c = o * e.a + r * e.c;
t.d = o * e.b + r * e.d;
t.tx = s * e.a + c * e.c + e.tx;
t.ty = s * e.b + c * e.d + e.ty;
return t;
};
cc.affineTransformEqualToTransform = function(t, e) {
return t.a === e.a && t.b === e.b && t.c === e.c && t.d === e.d && t.tx === e.tx && t.ty === e.ty;
};
cc.affineTransformInvert = function(t) {
var e = 1 / (t.a * t.d - t.b * t.c);
return {
a: e * t.d,
b: -e * t.b,
c: -e * t.c,
d: e * t.a,
tx: e * (t.c * t.ty - t.d * t.tx),
ty: e * (t.b * t.tx - t.a * t.ty)
};
};
cc.affineTransformInvertIn = function(t) {
var e = t.a, i = t.b, n = t.c, o = t.d, r = 1 / (e * o - i * n), s = t.tx, c = t.ty;
t.a = r * o;
t.b = -r * i;
t.c = -r * n;
t.d = r * e;
t.tx = r * (n * c - o * s);
t.ty = r * (i * s - e * c);
return t;
};
cc.affineTransformInvertOut = function(t, e) {
var i = t.a, n = t.b, o = t.c, r = t.d, s = t.tx, c = t.ty, a = 1 / (i * r - n * o);
e.a = a * r;
e.b = -a * n;
e.c = -a * o;
e.d = a * i;
e.tx = a * (o * c - r * s);
e.ty = a * (n * s - i * c);
};
}), {} ],
160: [ (function(i, n, o) {
var r = i("./CCValueType"), s = i("../platform/js"), c = (function() {
function n(i, n, o, r) {
if ("object" === ("object" === (e = typeof i) ? t(i) : e)) {
n = i.g;
o = i.b;
r = i.a;
i = i.r;
}
i = i || 0;
n = n || 0;
o = o || 0;
r = "number" === ("object" === (e = typeof r) ? t(r) : e) ? r : 255;
this._val = (~~i << 24 >>> 0) + (~~n << 16) + (~~o << 8) + ~~r;
}
s.extend(n, r);
i("../platform/CCClass").fastDefine("cc.Color", n, {
r: 0,
g: 0,
b: 0,
a: 255
});
var o = {
WHITE: [ 255, 255, 255, 255 ],
BLACK: [ 0, 0, 0, 255 ],
TRANSPARENT: [ 0, 0, 0, 0 ],
GRAY: [ 127.5, 127.5, 127.5 ],
RED: [ 255, 0, 0 ],
GREEN: [ 0, 255, 0 ],
BLUE: [ 0, 0, 255 ],
YELLOW: [ 255, 235, 4 ],
ORANGE: [ 255, 127, 0 ],
CYAN: [ 0, 255, 255 ],
MAGENTA: [ 255, 0, 255 ]
};
for (var c in o) s.get(n, c, (function(t) {
return function() {
return new n(t[0], t[1], t[2], t[3]);
};
})(o[c]));
var a = n.prototype;
a.clone = function() {
var t = new n();
t._val = this._val;
return t;
};
a.equals = function(t) {
return t && this._val === t._val;
};
a.lerp = function(t, e, i) {
i = i || new n();
var o = this.r, r = this.g, s = this.b, c = this.a;
i.r = o + (t.r - o) * e;
i.g = r + (t.g - r) * e;
i.b = s + (t.b - s) * e;
i.a = c + (t.a - c) * e;
return i;
};
a.toString = function() {
return "rgba(" + this.r.toFixed() + ", " + this.g.toFixed() + ", " + this.b.toFixed() + ", " + this.a.toFixed() + ")";
};
a.getR = function() {
return (4278190080 & this._val) >>> 24;
};
a.setR = function(t) {
this._val = (16777215 & this._val | ~~t << 24 >>> 0) >>> 0;
return this;
};
a.getG = function() {
return (16711680 & this._val) >> 16;
};
a.setG = function(t) {
this._val = (4278255615 & this._val | ~~t << 16) >>> 0;
return this;
};
a.getB = function() {
return (65280 & this._val) >> 8;
};
a.setB = function(t) {
this._val = (4294902015 & this._val | ~~t << 8) >>> 0;
return this;
};
a.getA = function() {
return 255 & this._val;
};
a.setA = function(t) {
this._val = (4294967040 & this._val | ~~t) >>> 0;
return this;
};
s.getset(a, "r", a.getR, a.setR, !0);
s.getset(a, "g", a.getG, a.setG, !0);
s.getset(a, "b", a.getB, a.setB, !0);
s.getset(a, "a", a.getA, a.setA, !0);
a.toCSS = function(t) {
return "rgba" === t ? "rgba(" + (0 | this.r) + "," + (0 | this.g) + "," + (0 | this.b) + "," + (this.a / 255).toFixed(2) + ")" : "rgb" === t ? "rgb(" + (0 | this.r) + "," + (0 | this.g) + "," + (0 | this.b) + ")" : "#" + this.toHEX(t);
};
a.clamp = function() {};
a.fromHEX = function(t) {
t.length < 8 && (t += "FF");
var e = parseInt(t.indexOf("#") > -1 ? t.substring(1) : t, 16);
this._val = (0 & this._val | e) >>> 0;
return this;
};
a.toHEX = function(t) {
var e = [ (0 | this.r).toString(16), (0 | this.g).toString(16), (0 | this.b).toString(16) ], i = -1;
if ("#rgb" === t) for (i = 0; i < e.length; ++i) e[i].length > 1 && (e[i] = e[i][0]); else if ("#rrggbb" === t) for (i = 0; i < e.length; ++i) 1 === e[i].length && (e[i] = "0" + e[i]);
return e.join("");
};
a.toRGBValue = function() {
return 16777215 & this._val;
};
a.fromHSV = function(t, e, i) {
var o = n.hsv2rgb(t, e, i);
this._val = (o.r << 24 >>> 0) + (o.g << 16) + (o.b << 8) + this.a;
return this;
};
a.toHSV = function() {
return n.rgb2hsv(this.r, this.g, this.b);
};
a.fromColor = function(t) {
if (t._val) this._val = t._val; else {
this.r = t.r;
this.g = t.g;
this.b = t.b;
this.a = t.a;
}
};
return n;
})();
c.rgb2hsv = function(t, e, i) {
t /= 255;
e /= 255;
i /= 255;
var n = {
h: 0,
s: 0,
v: 0
}, o = Math.max(t, e, i), r = Math.min(t, e, i), s = 0;
n.v = o;
n.s = o ? (o - r) / o : 0;
if (n.s) {
s = o - r;
n.h = t === o ? (e - i) / s : e === o ? 2 + (i - t) / s : 4 + (t - e) / s;
n.h /= 6;
n.h < 0 && (n.h += 1);
} else n.h = 0;
return n;
};
c.hsv2rgb = function(t, e, i) {
var n = {
r: 0,
g: 0,
b: 0
};
if (0 === e) n.r = n.g = n.b = i; else if (0 === i) n.r = n.g = n.b = 0; else {
1 === t && (t = 0);
t *= 6;
e = e;
i = i;
var o = Math.floor(t), r = t - o, s = i * (1 - e), c = i * (1 - e * r), a = i * (1 - e * (1 - r));
switch (o) {
case 0:
n.r = i;
n.g = a;
n.b = s;
break;

case 1:
n.r = c;
n.g = i;
n.b = s;
break;

case 2:
n.r = s;
n.g = i;
n.b = a;
break;

case 3:
n.r = s;
n.g = c;
n.b = i;
break;

case 4:
n.r = a;
n.g = s;
n.b = i;
break;

case 5:
n.r = i;
n.g = s;
n.b = c;
}
}
n.r *= 255;
n.g *= 255;
n.b *= 255;
return n;
};
cc.Color = c;
cc.color = function(i, n, o, r) {
if ("string" === ("object" === (e = typeof i) ? t(i) : e)) {
return new cc.Color().fromHEX(i);
}
return "object" === ("object" === (e = typeof i) ? t(i) : e) ? new cc.Color(i.r, i.g, i.b, i.a) : new cc.Color(i, n, o, r);
};
cc.colorEqual = function(t, e) {
return void 0 !== t._val && void 0 !== e._val ? t._val === e._val : t.r === e.r && t.g === e.g && t.b === e.b;
};
cc.hexToColor = function(t) {
t = t.replace(/^#?/, "0x");
var e = parseInt(t), i = e >> 16, n = (65280 & e) >> 8, o = 255 & e;
return cc.color(i, n, o);
};
cc.colorToHex = function(t) {
var e = t.r.toString(16), i = t.g.toString(16), n = t.b.toString(16);
return "#" + (t.r < 16 ? "0" + e : e) + (t.g < 16 ? "0" + i : i) + (t.b < 16 ? "0" + n : n);
};
n.exports = cc.Color;
}), {
"../platform/CCClass": 128,
"../platform/js": 143,
"./CCValueType": 166
} ],
161: [ (function(t, e, i) {
var n = parseFloat("1.192092896e-07F");
cc.pNeg = function(t) {
return cc.p(-t.x, -t.y);
};
cc.pAdd = function(t, e) {
return cc.p(t.x + e.x, t.y + e.y);
};
cc.pSub = function(t, e) {
return cc.p(t.x - e.x, t.y - e.y);
};
cc.pMult = function(t, e) {
return cc.p(t.x * e, t.y * e);
};
cc.pMidpoint = function(t, e) {
return cc.pMult(cc.pAdd(t, e), .5);
};
cc.pDot = function(t, e) {
return t.x * e.x + t.y * e.y;
};
cc.pCross = function(t, e) {
return t.x * e.y - t.y * e.x;
};
cc.pPerp = function(t) {
return cc.p(-t.y, t.x);
};
cc.pRPerp = function(t) {
return cc.p(t.y, -t.x);
};
cc.pProject = function(t, e) {
return cc.pMult(e, cc.pDot(t, e) / cc.pDot(e, e));
};
cc.pLengthSQ = function(t) {
return cc.pDot(t, t);
};
cc.pDistanceSQ = function(t, e) {
return cc.pLengthSQ(cc.pSub(t, e));
};
cc.pLength = function(t) {
return Math.sqrt(cc.pLengthSQ(t));
};
cc.pDistance = function(t, e) {
return cc.pLength(cc.pSub(t, e));
};
cc.pNormalize = function(t) {
var e = cc.pLength(t);
return 0 === e ? cc.p(t) : cc.pMult(t, 1 / e);
};
cc.pForAngle = function(t) {
return cc.p(Math.cos(t), Math.sin(t));
};
cc.pToAngle = function(t) {
return Math.atan2(t.y, t.x);
};
cc.clampf = function(t, e, i) {
if (e > i) {
var n = e;
e = i;
i = n;
}
return t < e ? e : t < i ? t : i;
};
cc.clamp01 = function(t) {
return t < 0 ? 0 : t < 1 ? t : 1;
};
cc.pClamp = function(t, e, i) {
return cc.p(cc.clampf(t.x, e.x, i.x), cc.clampf(t.y, e.y, i.y));
};
cc.pFromSize = function(t) {
return cc.p(t.width, t.height);
};
cc.pCompOp = function(t, e) {
return cc.p(e(t.x), e(t.y));
};
cc.pLerp = function(t, e, i) {
return cc.pAdd(cc.pMult(t, 1 - i), cc.pMult(e, i));
};
cc.pFuzzyEqual = function(t, e, i) {
return t.x - i <= e.x && e.x <= t.x + i && t.y - i <= e.y && e.y <= t.y + i;
};
cc.pCompMult = function(t, e) {
return cc.p(t.x * e.x, t.y * e.y);
};
cc.pAngleSigned = function(t, e) {
var i = cc.pNormalize(t), o = cc.pNormalize(e), r = Math.atan2(i.x * o.y - i.y * o.x, cc.pDot(i, o));
return Math.abs(r) < n ? 0 : r;
};
cc.pAngle = function(t, e) {
var i = Math.acos(cc.pDot(cc.pNormalize(t), cc.pNormalize(e)));
return Math.abs(i) < n ? 0 : i;
};
cc.pRotateByAngle = function(t, e, i) {
var n = cc.pSub(t, e), o = Math.cos(i), r = Math.sin(i), s = n.x;
n.x = s * o - n.y * r + e.x;
n.y = s * r + n.y * o + e.y;
return n;
};
cc.pLineIntersect = function(t, e, i, n, o) {
if (t.x === e.x && t.y === e.y || i.x === n.x && i.y === n.y) return !1;
var r = e.x - t.x, s = e.y - t.y, c = n.x - i.x, a = n.y - i.y, l = t.x - i.x, h = t.y - i.y, u = a * r - c * s;
o.x = c * h - a * l;
o.y = r * h - s * l;
if (0 === u) return 0 === o.x || 0 === o.y;
o.x = o.x / u;
o.y = o.y / u;
return !0;
};
cc.pSegmentIntersect = function(t, e, i, n) {
var o = cc.p(0, 0);
return !!(cc.pLineIntersect(t, e, i, n, o) && o.x >= 0 && o.x <= 1 && o.y >= 0 && o.y <= 1);
};
cc.pIntersectPoint = function(t, e, i, n) {
var o = cc.p(0, 0);
if (cc.pLineIntersect(t, e, i, n, o)) {
var r = cc.p(0, 0);
r.x = t.x + o.x * (e.x - t.x);
r.y = t.y + o.x * (e.y - t.y);
return r;
}
return cc.p(0, 0);
};
cc.pSameAs = function(t, e) {
return null != t && null != e && (t.x === e.x && t.y === e.y);
};
cc.pZeroIn = function(t) {
t.x = 0;
t.y = 0;
};
cc.pIn = function(t, e) {
t.x = e.x;
t.y = e.y;
};
cc.pMultIn = function(t, e) {
t.x *= e;
t.y *= e;
};
cc.pSubIn = function(t, e) {
t.x -= e.x;
t.y -= e.y;
};
cc.pAddIn = function(t, e) {
t.x += e.x;
t.y += e.y;
};
cc.pNormalizeIn = function(t) {
cc.pMultIn(t, 1 / Math.sqrt(t.x * t.x + t.y * t.y));
};
}), {} ],
162: [ (function(i, n, o) {
var r = i("./CCValueType"), s = i("../platform/js");
function c(i, n, o, r) {
if (i && "object" === ("object" === (e = typeof i) ? t(i) : e)) {
n = i.y;
o = i.width;
r = i.height;
i = i.x;
}
this.x = i || 0;
this.y = n || 0;
this.width = o || 0;
this.height = r || 0;
}
s.extend(c, r);
i("../platform/CCClass").fastDefine("cc.Rect", c, {
x: 0,
y: 0,
width: 0,
height: 0
});
c.fromMinMax = function(t, e) {
var i = Math.min(t.x, e.x), n = Math.min(t.y, e.y);
return new c(i, n, Math.max(t.x, e.x) - i, Math.max(t.y, e.y) - n);
};
c.contain = function(t, e) {
return t.x < e.x && t.x + t.width > e.x + e.width && t.y < e.y && t.y + t.height > e.y + e.height ? 1 : e.x < t.x && e.x + e.width > t.x + t.width && e.y < t.y && e.y + e.height > t.y + t.height ? -1 : 0;
};
var a = c.prototype;
a.clone = function() {
return new c(this.x, this.y, this.width, this.height);
};
a.equals = function(t) {
return t && this.x === t.x && this.y === t.y && this.width === t.width && this.height === t.height;
};
a.lerp = function(t, e, i) {
i = i || new c();
var n = this.x, o = this.y, r = this.width, s = this.height;
i.x = n + (t.x - n) * e;
i.y = o + (t.y - o) * e;
i.width = r + (t.width - r) * e;
i.height = s + (t.height - s) * e;
return i;
};
a.toString = function() {
return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")";
};
s.getset(a, "xMin", (function() {
return this.x;
}), (function(t) {
this.width += this.x - t;
this.x = t;
}));
s.getset(a, "yMin", (function() {
return this.y;
}), (function(t) {
this.height += this.y - t;
this.y = t;
}));
s.getset(a, "xMax", (function() {
return this.x + this.width;
}), (function(t) {
this.width = t - this.x;
}));
s.getset(a, "yMax", (function() {
return this.y + this.height;
}), (function(t) {
this.height = t - this.y;
}));
s.getset(a, "center", (function() {
return new cc.Vec2(this.x + .5 * this.width, this.y + .5 * this.height);
}), (function(t) {
this.x = t.x - .5 * this.width;
this.y = t.y - .5 * this.height;
}));
s.getset(a, "origin", (function() {
return new cc.Vec2(this.x, this.y);
}), (function(t) {
this.x = t.x;
this.y = t.y;
}));
s.getset(a, "size", (function() {
return new cc.Size(this.width, this.height);
}), (function(t) {
this.width = t.width;
this.height = t.height;
}));
a.intersects = function(t) {
return cc.rectIntersectsRect(this, t);
};
a.contains = function(t) {
return this.x <= t.x && this.x + this.width >= t.x && this.y <= t.y && this.y + this.height >= t.y;
};
a.containsRect = function(t) {
return this.x <= t.x && this.x + this.width >= t.x + t.width && this.y <= t.y && this.y + this.height >= t.y + t.height;
};
cc.Rect = c;
cc.rect = function(t, e, i, n) {
return new c(t, e, i, n);
};
cc.rectEqualToRect = function(t, e) {
return t && e && t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
};
cc._rectEqualToZero = function(t) {
return t && 0 === t.x && 0 === t.y && 0 === t.width && 0 === t.height;
};
cc.rectContainsRect = function(t, e) {
return !(!t || !e) && !(t.x >= e.x || t.y >= e.y || t.x + t.width <= e.x + e.width || t.y + t.height <= e.y + e.height);
};
cc.rectGetMaxX = function(t) {
return t.x + t.width;
};
cc.rectGetMidX = function(t) {
return t.x + t.width / 2;
};
cc.rectGetMinX = function(t) {
return t.x;
};
cc.rectGetMaxY = function(t) {
return t.y + t.height;
};
cc.rectGetMidY = function(t) {
return t.y + t.height / 2;
};
cc.rectGetMinY = function(t) {
return t.y;
};
cc.rectContainsPoint = function(t, e) {
return e.x >= cc.rectGetMinX(t) && e.x <= cc.rectGetMaxX(t) && e.y >= cc.rectGetMinY(t) && e.y <= cc.rectGetMaxY(t);
};
cc.rectIntersectsRect = function(t, e) {
var i = t.x + t.width, n = t.y + t.height, o = e.x + e.width, r = e.y + e.height;
return !(i < e.x || o < t.x || n < e.y || r < t.y);
};
cc.rectOverlapsRect = function(t, e) {
return !(t.x + t.width < e.x || e.x + e.width < t.x || t.y + t.height < e.y || e.y + e.height < t.y);
};
cc.rectUnion = function(t, e) {
var i = cc.rect(0, 0, 0, 0);
i.x = Math.min(t.x, e.x);
i.y = Math.min(t.y, e.y);
i.width = Math.max(t.x + t.width, e.x + e.width) - i.x;
i.height = Math.max(t.y + t.height, e.y + e.height) - i.y;
return i;
};
cc.rectIntersection = function(t, e) {
var i = cc.rect(Math.max(cc.rectGetMinX(t), cc.rectGetMinX(e)), Math.max(cc.rectGetMinY(t), cc.rectGetMinY(e)), 0, 0);
i.width = Math.min(cc.rectGetMaxX(t), cc.rectGetMaxX(e)) - cc.rectGetMinX(i);
i.height = Math.min(cc.rectGetMaxY(t), cc.rectGetMaxY(e)) - cc.rectGetMinY(i);
return i;
};
n.exports = cc.Rect;
}), {
"../platform/CCClass": 128,
"../platform/js": 143,
"./CCValueType": 166
} ],
163: [ (function(i, n, o) {
var r = i("./CCValueType"), s = i("../platform/js");
function c(i, n) {
if (i && "object" === ("object" === (e = typeof i) ? t(i) : e)) {
n = i.height;
i = i.width;
}
this.width = i || 0;
this.height = n || 0;
}
s.extend(c, r);
i("../platform/CCClass").fastDefine("cc.Size", c, {
width: 0,
height: 0
});
s.get(c, "ZERO", (function() {
return new c(0, 0);
}));
var a = c.prototype;
a.clone = function() {
return new c(this.width, this.height);
};
a.equals = function(t) {
return t && this.width === t.width && this.height === t.height;
};
a.lerp = function(t, e, i) {
i = i || new c();
var n = this.width, o = this.height;
i.width = n + (t.width - n) * e;
i.height = o + (t.height - o) * e;
return i;
};
a.toString = function() {
return "(" + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")";
};
cc.size = function(t, e) {
return new c(t, e);
};
cc.sizeEqualToSize = function(t, e) {
return t && e && t.width === e.width && t.height === e.height;
};
cc.Size = n.exports = c;
}), {
"../platform/CCClass": 128,
"../platform/js": 143,
"./CCValueType": 166
} ],
164: [ (function(t, e, i) {
cc.Acceleration = function(t, e, i, n) {
this.x = t || 0;
this.y = e || 0;
this.z = i || 0;
this.timestamp = n || 0;
};
cc.BlendFunc = function(t, e) {
this.src = t;
this.dst = e;
};
var n = cc.Enum({
ONE: 1,
ZERO: 0,
SRC_ALPHA: 770,
SRC_COLOR: 768,
DST_ALPHA: 772,
DST_COLOR: 774,
ONE_MINUS_SRC_ALPHA: 771,
ONE_MINUS_SRC_COLOR: 769,
ONE_MINUS_DST_ALPHA: 773,
ONE_MINUS_DST_COLOR: 775
});
cc.BlendFunc._disable = function() {
return new cc.BlendFunc(n.ONE, n.ZERO);
};
cc.BlendFunc._alphaPremultiplied = function() {
return new cc.BlendFunc(n.ONE, n.ONE_MINUS_SRC_ALPHA);
};
cc.BlendFunc._alphaNonPremultiplied = function() {
return new cc.BlendFunc(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA);
};
cc.BlendFunc._additive = function() {
return new cc.BlendFunc(n.SRC_ALPHA, n.ONE);
};
cc.BlendFunc.BlendFactor = n;
cc.BlendFunc.DISABLE;
cc.js.get(cc.BlendFunc, "DISABLE", cc.BlendFunc._disable);
cc.BlendFunc.ALPHA_PREMULTIPLIED;
cc.js.get(cc.BlendFunc, "ALPHA_PREMULTIPLIED", cc.BlendFunc._alphaPremultiplied);
cc.BlendFunc.ALPHA_NON_PREMULTIPLIED;
cc.js.get(cc.BlendFunc, "ALPHA_NON_PREMULTIPLIED", cc.BlendFunc._alphaNonPremultiplied);
cc.BlendFunc.ADDITIVE;
cc.js.get(cc.BlendFunc, "ADDITIVE", cc.BlendFunc._additive);
cc.blendFuncDisable = cc.BlendFunc._disable;
cc.TextAlignment = cc.Enum({
LEFT: 0,
CENTER: 1,
RIGHT: 2
});
cc.VerticalTextAlignment = cc.Enum({
TOP: 0,
CENTER: 1,
BOTTOM: 2
});
}), {} ],
165: [ (function(i, n, o) {
cc.WebGLColor = function(i, n, o, r, s, c) {
this._arrayBuffer = s || new ArrayBuffer(cc.WebGLColor.BYTES_PER_ELEMENT);
this._offset = c || 0;
var a = this._arrayBuffer, l = this._offset;
this._view = new Uint8Array(a, l, 4);
this._view[0] = i || 0;
this._view[1] = n || 0;
this._view[2] = o || 0;
if ("number" === ("object" === (e = typeof r) ? t(r) : e)) this._view[3] = r; else {
this._view[3] = 255;
this.a_undefined = !0;
}
};
cc.WebGLColor.BYTES_PER_ELEMENT = 4;
var r;
(r = cc.WebGLColor.prototype)._getR = function() {
return this._view[0];
};
r._setR = function(t) {
this._view[0] = t < 0 ? 0 : t;
};
r._getG = function() {
return this._view[1];
};
r._setG = function(t) {
this._view[1] = t < 0 ? 0 : t;
};
r._getB = function() {
return this._view[2];
};
r._setB = function(t) {
this._view[2] = t < 0 ? 0 : t;
};
r._getA = function() {
return this._view[3];
};
r._setA = function(t) {
this._view[3] = t < 0 ? 0 : t;
};
r.r;
cc.js.getset(r, "r", r._getR, r._setR);
r.g;
cc.js.getset(r, "g", r._getG, r._setG);
r.b;
cc.js.getset(r, "b", r._getB, r._setB);
r.a;
cc.js.getset(r, "a", r._getA, r._setA);
cc.Vertex2F = function(t, e, i, n) {
this._arrayBuffer = i || new ArrayBuffer(cc.Vertex2F.BYTES_PER_ELEMENT);
this._offset = n || 0;
this._view = new Float32Array(this._arrayBuffer, this._offset, 2);
this._view[0] = t || 0;
this._view[1] = e || 0;
};
cc.Vertex2F.BYTES_PER_ELEMENT = 8;
(r = cc.Vertex2F.prototype)._getX = function() {
return this._view[0];
};
r._setX = function(t) {
this._view[0] = t;
};
r._getY = function() {
return this._view[1];
};
r._setY = function(t) {
this._view[1] = t;
};
cc.js.getset(r, "x", r._getX, r._setX);
cc.js.getset(r, "y", r._getY, r._setY);
cc.Vertex3F = function(t, e, i, n, o) {
this._arrayBuffer = n || new ArrayBuffer(cc.Vertex3F.BYTES_PER_ELEMENT);
this._offset = o || 0;
var r = this._arrayBuffer, s = this._offset;
this._view = new Float32Array(r, s, 3);
this._view[0] = t || 0;
this._view[1] = e || 0;
this._view[2] = i || 0;
};
cc.Vertex3F.BYTES_PER_ELEMENT = 12;
(r = cc.Vertex3F.prototype)._getX = function() {
return this._view[0];
};
r._setX = function(t) {
this._view[0] = t;
};
r._getY = function() {
return this._view[1];
};
r._setY = function(t) {
this._view[1] = t;
};
r._getZ = function() {
return this._view[2];
};
r._setZ = function(t) {
this._view[2] = t;
};
cc.js.getset(r, "x", r._getX, r._setX);
cc.js.getset(r, "y", r._getY, r._setY);
cc.js.getset(r, "z", r._getZ, r._setZ);
cc.Tex2F = function(t, e, i, n) {
this._arrayBuffer = i || new ArrayBuffer(cc.Tex2F.BYTES_PER_ELEMENT);
this._offset = n || 0;
this._view = new Float32Array(this._arrayBuffer, this._offset, 2);
this._view[0] = t || 0;
this._view[1] = e || 0;
};
cc.Tex2F.BYTES_PER_ELEMENT = 8;
(r = cc.Tex2F.prototype)._getU = function() {
return this._view[0];
};
r._setU = function(t) {
this._view[0] = t;
};
r._getV = function() {
return this._view[1];
};
r._setV = function(t) {
this._view[1] = t;
};
cc.js.getset(r, "u", r._getU, r._setU);
cc.js.getset(r, "v", r._getV, r._setV);
cc.Quad2 = function(t, e, i, n, o, r) {
this._arrayBuffer = o || new ArrayBuffer(cc.Quad2.BYTES_PER_ELEMENT);
this._offset = r || 0;
var s = this._arrayBuffer, c = this._offset, a = cc.Vertex2F.BYTES_PER_ELEMENT;
this._tl = t ? new cc.Vertex2F(t.x, t.y, s, c) : new cc.Vertex2F(0, 0, s, c);
c += a;
this._tr = e ? new cc.Vertex2F(e.x, e.y, s, c) : new cc.Vertex2F(0, 0, s, c);
c += a;
this._bl = i ? new cc.Vertex2F(i.x, i.y, s, c) : new cc.Vertex2F(0, 0, s, c);
c += a;
this._br = n ? new cc.Vertex2F(n.x, n.y, s, c) : new cc.Vertex2F(0, 0, s, c);
};
cc.Quad2.BYTES_PER_ELEMENT = 32;
(r = cc.Quad2.prototype)._getTL = function() {
return this._tl;
};
r._setTL = function(t) {
this._tl._view[0] = t.x;
this._tl._view[1] = t.y;
};
r._getTR = function() {
return this._tr;
};
r._setTR = function(t) {
this._tr._view[0] = t.x;
this._tr._view[1] = t.y;
};
r._getBL = function() {
return this._bl;
};
r._setBL = function(t) {
this._bl._view[0] = t.x;
this._bl._view[1] = t.y;
};
r._getBR = function() {
return this._br;
};
r._setBR = function(t) {
this._br._view[0] = t.x;
this._br._view[1] = t.y;
};
cc.js.getset(r, "tl", r._getTL, r._setTL);
cc.js.getset(r, "tr", r._getTR, r._setTR);
cc.js.getset(r, "bl", r._getBL, r._setBL);
cc.js.getset(r, "br", r._getBR, r._setBR);
cc.Quad3 = function(t, e, i, n, o, r) {
this._arrayBuffer = o || new ArrayBuffer(cc.Quad3.BYTES_PER_ELEMENT);
this._offset = r || 0;
var s = this._arrayBuffer, c = this._offset, a = cc.Vertex3F.BYTES_PER_ELEMENT;
this.bl = bl ? new cc.Vertex3F(bl.x, bl.y, bl.z, s, c) : new cc.Vertex3F(0, 0, 0, s, c);
c += a;
this.br = br ? new cc.Vertex3F(br.x, br.y, br.z, s, c) : new cc.Vertex3F(0, 0, 0, s, c);
c += a;
this.tl = tl ? new cc.Vertex3F(tl.x, tl.y, tl.z, s, c) : new cc.Vertex3F(0, 0, 0, s, c);
c += a;
this.tr = tr ? new cc.Vertex3F(tr.x, tr.y, tr.z, s, c) : new cc.Vertex3F(0, 0, 0, s, c);
};
cc.Quad3.BYTES_PER_ELEMENT = 48;
cc.V3F_C4B_T2F = function(t, e, i, n, o) {
this._arrayBuffer = n || new ArrayBuffer(cc.V3F_C4B_T2F.BYTES_PER_ELEMENT);
this._offset = o || 0;
var r = this._arrayBuffer, s = this._offset;
this._vertices = t ? new cc.Vertex3F(t.x, t.y, t.z, r, s) : new cc.Vertex3F(0, 0, 0, r, s);
s += cc.Vertex3F.BYTES_PER_ELEMENT;
this._colors = e ? new cc.WebGLColor(e.r, e.g, e.b, e.a, r, s) : new cc.WebGLColor(0, 0, 0, 0, r, s);
s += cc.WebGLColor.BYTES_PER_ELEMENT;
this._texCoords = i ? new cc.Tex2F(i.u, i.v, r, s) : new cc.Tex2F(0, 0, r, s);
};
cc.V3F_C4B_T2F.BYTES_PER_ELEMENT = 24;
(r = cc.V3F_C4B_T2F.prototype)._getVertices = function() {
return this._vertices;
};
r._setVertices = function(t) {
var e = this._vertices;
e._view[0] = t.x;
e._view[1] = t.y;
e._view[2] = t.z;
};
r._getColor = function() {
return this._colors;
};
r._setColor = function(t) {
var e = this._colors;
e._view[0] = t.r;
e._view[1] = t.g;
e._view[2] = t.b;
e._view[3] = t.a;
};
r._getTexCoords = function() {
return this._texCoords;
};
r._setTexCoords = function(t) {
this._texCoords._view[0] = t.u;
this._texCoords._view[1] = t.v;
};
cc.js.getset(r, "vertices", r._getVertices, r._setVertices);
cc.js.getset(r, "colors", r._getColor, r._setColor);
cc.js.getset(r, "texCoords", r._getTexCoords, r._setTexCoords);
cc.V3F_C4B_T2F_Quad = function(t, e, i, n, o, r) {
this._arrayBuffer = o || new ArrayBuffer(cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT);
this._offset = r || 0;
var s = this._arrayBuffer, c = this._offset, a = cc.V3F_C4B_T2F.BYTES_PER_ELEMENT;
this._tl = t ? new cc.V3F_C4B_T2F(t.vertices, t.colors, t.texCoords, s, c) : new cc.V3F_C4B_T2F(null, null, null, s, c);
c += a;
this._bl = e ? new cc.V3F_C4B_T2F(e.vertices, e.colors, e.texCoords, s, c) : new cc.V3F_C4B_T2F(null, null, null, s, c);
c += a;
this._tr = i ? new cc.V3F_C4B_T2F(i.vertices, i.colors, i.texCoords, s, c) : new cc.V3F_C4B_T2F(null, null, null, s, c);
c += a;
this._br = n ? new cc.V3F_C4B_T2F(n.vertices, n.colors, n.texCoords, s, c) : new cc.V3F_C4B_T2F(null, null, null, s, c);
};
cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT = 96;
(r = cc.V3F_C4B_T2F_Quad.prototype)._getTL = function() {
return this._tl;
};
r._setTL = function(t) {
var e = this._tl;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getBL = function() {
return this._bl;
};
r._setBL = function(t) {
var e = this._bl;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getTR = function() {
return this._tr;
};
r._setTR = function(t) {
var e = this._tr;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getBR = function() {
return this._br;
};
r._setBR = function(t) {
var e = this._br;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getArrayBuffer = function() {
return this._arrayBuffer;
};
cc.js.getset(r, "tl", r._getTL, r._setTL);
cc.js.getset(r, "tr", r._getTR, r._setTR);
cc.js.getset(r, "bl", r._getBL, r._setBL);
cc.js.getset(r, "br", r._getBR, r._setBR);
cc.js.get(r, "arrayBuffer", r._getArrayBuffer);
cc.V3F_C4B_T2F_QuadZero = function() {
return new cc.V3F_C4B_T2F_Quad();
};
cc.V3F_C4B_T2F_QuadCopy = function(t) {
if (!t) return cc.V3F_C4B_T2F_QuadZero();
var e = t.tl, i = t.bl, n = t.tr, o = t.br;
return {
tl: {
vertices: {
x: e.vertices.x,
y: e.vertices.y,
z: e.vertices.z
},
colors: {
r: e.colors.r,
g: e.colors.g,
b: e.colors.b,
a: e.colors.a
},
texCoords: {
u: e.texCoords.u,
v: e.texCoords.v
}
},
bl: {
vertices: {
x: i.vertices.x,
y: i.vertices.y,
z: i.vertices.z
},
colors: {
r: i.colors.r,
g: i.colors.g,
b: i.colors.b,
a: i.colors.a
},
texCoords: {
u: i.texCoords.u,
v: i.texCoords.v
}
},
tr: {
vertices: {
x: n.vertices.x,
y: n.vertices.y,
z: n.vertices.z
},
colors: {
r: n.colors.r,
g: n.colors.g,
b: n.colors.b,
a: n.colors.a
},
texCoords: {
u: n.texCoords.u,
v: n.texCoords.v
}
},
br: {
vertices: {
x: o.vertices.x,
y: o.vertices.y,
z: o.vertices.z
},
colors: {
r: o.colors.r,
g: o.colors.g,
b: o.colors.b,
a: o.colors.a
},
texCoords: {
u: o.texCoords.u,
v: o.texCoords.v
}
}
};
};
cc.V3F_C4B_T2F_QuadsCopy = function(t) {
if (!t) return [];
for (var e = [], i = 0; i < t.length; i++) e.push(cc.V3F_C4B_T2F_QuadCopy(t[i]));
return e;
};
cc.V2F_C4B_T2F = function(t, e, i, n, o) {
this._arrayBuffer = n || new ArrayBuffer(cc.V2F_C4B_T2F.BYTES_PER_ELEMENT);
this._offset = o || 0;
var r = this._arrayBuffer, s = this._offset;
this._vertices = t ? new cc.Vertex2F(t.x, t.y, r, s) : new cc.Vertex2F(0, 0, r, s);
s += cc.Vertex2F.BYTES_PER_ELEMENT;
this._colors = e ? new cc.WebGLColor(e.r, e.g, e.b, e.a, r, s) : new cc.WebGLColor(0, 0, 0, 0, r, s);
s += cc.WebGLColor.BYTES_PER_ELEMENT;
this._texCoords = i ? new cc.Tex2F(i.u, i.v, r, s) : new cc.Tex2F(0, 0, r, s);
};
cc.V2F_C4B_T2F.BYTES_PER_ELEMENT = 20;
(r = cc.V2F_C4B_T2F.prototype)._getVertices = function() {
return this._vertices;
};
r._setVertices = function(t) {
this._vertices._view[0] = t.x;
this._vertices._view[1] = t.y;
};
r._getColor = function() {
return this._colors;
};
r._setColor = function(t) {
var e = this._colors;
e._view[0] = t.r;
e._view[1] = t.g;
e._view[2] = t.b;
e._view[3] = t.a;
};
r._getTexCoords = function() {
return this._texCoords;
};
r._setTexCoords = function(t) {
this._texCoords._view[0] = t.u;
this._texCoords._view[1] = t.v;
};
cc.js.getset(r, "vertices", r._getVertices, r._setVertices);
cc.js.getset(r, "colors", r._getColor, r._setColor);
cc.js.getset(r, "texCoords", r._getTexCoords, r._setTexCoords);
cc.V2F_C4B_T2F_Triangle = function(t, e, i, n, o) {
this._arrayBuffer = n || new ArrayBuffer(cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT);
this._offset = o || 0;
var r = this._arrayBuffer, s = this._offset, c = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT;
this._a = t ? new cc.V2F_C4B_T2F(t.vertices, t.colors, t.texCoords, r, s) : new cc.V2F_C4B_T2F(null, null, null, r, s);
s += c;
this._b = e ? new cc.V2F_C4B_T2F(e.vertices, e.colors, e.texCoords, r, s) : new cc.V2F_C4B_T2F(null, null, null, r, s);
s += c;
this._c = i ? new cc.V2F_C4B_T2F(i.vertices, i.colors, i.texCoords, r, s) : new cc.V2F_C4B_T2F(null, null, null, r, s);
};
cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT = 60;
(r = cc.V2F_C4B_T2F_Triangle.prototype)._getA = function() {
return this._a;
};
r._setA = function(t) {
var e = this._a;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getB = function() {
return this._b;
};
r._setB = function(t) {
var e = this._b;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getC = function() {
return this._c;
};
r._setC = function(t) {
var e = this._c;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
cc.js.getset(r, "a", r._getA, r._setA);
cc.js.getset(r, "b", r._getB, r._setB);
cc.js.getset(r, "c", r._getC, r._setC);
}), {} ],
166: [ (function(t, e, i) {
var n = t("../platform/js");
function o() {}
n.setClassName("cc.ValueType", o);
var r = o.prototype;
0;
r.toString = function() {
return "" + {};
};
cc.ValueType = e.exports = o;
}), {
"../platform/js": 143
} ],
167: [ (function(i, n, o) {
var r = i("./CCValueType"), s = i("../platform/js"), c = i("../platform/CCClass");
function a(i, n) {
if (i && "object" === ("object" === (e = typeof i) ? t(i) : e)) {
n = i.y;
i = i.x;
}
this.x = i || 0;
this.y = n || 0;
}
s.extend(a, r);
c.fastDefine("cc.Vec2", a, {
x: 0,
y: 0
});
var l = a.prototype;
l.clone = function() {
return new a(this.x, this.y);
};
l.set = function(t) {
this.x = t.x;
this.y = t.y;
return this;
};
l.equals = function(t) {
return t && this.x === t.x && this.y === t.y;
};
l.toString = function() {
return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ")";
};
l.lerp = function(t, e, i) {
i = i || new a();
var n = this.x, o = this.y;
i.x = n + (t.x - n) * e;
i.y = o + (t.y - o) * e;
return i;
};
l.addSelf = function(t) {
this.x += t.x;
this.y += t.y;
return this;
};
l.add = function(t, e) {
(e = e || new a()).x = this.x + t.x;
e.y = this.y + t.y;
return e;
};
l.subSelf = function(t) {
this.x -= t.x;
this.y -= t.y;
return this;
};
l.sub = function(t, e) {
(e = e || new a()).x = this.x - t.x;
e.y = this.y - t.y;
return e;
};
l.mulSelf = function(t) {
this.x *= t;
this.y *= t;
return this;
};
l.mul = function(t, e) {
(e = e || new a()).x = this.x * t;
e.y = this.y * t;
return e;
};
l.scaleSelf = function(t) {
this.x *= t.x;
this.y *= t.y;
return this;
};
l.scale = function(t, e) {
(e = e || new a()).x = this.x * t.x;
e.y = this.y * t.y;
return e;
};
l.divSelf = function(t) {
this.x /= t;
this.y /= t;
return this;
};
l.div = function(t, e) {
(e = e || new a()).x = this.x / t;
e.y = this.y / t;
return e;
};
l.negSelf = function() {
this.x = -this.x;
this.y = -this.y;
return this;
};
l.neg = function(t) {
(t = t || new a()).x = -this.x;
t.y = -this.y;
return t;
};
l.dot = function(t) {
return this.x * t.x + this.y * t.y;
};
l.cross = function(t) {
return this.y * t.x - this.x * t.y;
};
l.mag = function() {
return Math.sqrt(this.x * this.x + this.y * this.y);
};
l.magSqr = function() {
return this.x * this.x + this.y * this.y;
};
l.normalizeSelf = function() {
var t = this.x * this.x + this.y * this.y;
if (1 === t) return this;
if (0 === t) {
console.warn("Can't normalize zero vector");
return this;
}
var e = 1 / Math.sqrt(t);
this.x *= e;
this.y *= e;
return this;
};
l.normalize = function(t) {
(t = t || new a()).x = this.x;
t.y = this.y;
t.normalizeSelf();
return t;
};
l.angle = function(t) {
var e = this.magSqr(), i = t.magSqr();
if (0 === e || 0 === i) {
console.warn("Can't get angle between zero vector");
return 0;
}
var n = this.dot(t) / Math.sqrt(e * i);
n = cc.clampf(n, -1, 1);
return Math.acos(n);
};
l.signAngle = function(t) {
return Math.atan2(this.y, this.x) - Math.atan2(t.y, t.x);
};
l.rotate = function(t, e) {
(e = e || new a()).x = this.x;
e.y = this.y;
return e.rotateSelf(t);
};
l.rotateSelf = function(t) {
var e = Math.sin(t), i = Math.cos(t), n = this.x;
this.x = i * n - e * this.y;
this.y = e * n + i * this.y;
return this;
};
s.get(a, "ONE", (function() {
return new a(1, 1);
}));
s.get(a, "ZERO", (function() {
return new a(0, 0);
}));
s.get(a, "UP", (function() {
return new a(0, 1);
}));
s.get(a, "RIGHT", (function() {
return new a(1, 0);
}));
cc.Vec2 = a;
cc.v2 = function(t, e) {
return new a(t, e);
};
cc.p = cc.v2;
cc.pointEqualToPoint = function(t, e) {
return t && e && t.x === e.x && t.y === e.y;
};
n.exports = cc.Vec2;
}), {
"../platform/CCClass": 128,
"../platform/js": 143,
"./CCValueType": 166
} ],
168: [ (function(t, e, i) {
t("./CCValueType");
t("./CCVec2");
t("./CCPointExtension");
t("./CCSize");
t("./CCRect");
t("./CCColor");
t("./CCTypes");
t("./CCAffineTransform");
t("./CCTypesWebGL");
}), {
"./CCAffineTransform": 159,
"./CCColor": 160,
"./CCPointExtension": 161,
"./CCRect": 162,
"./CCSize": 163,
"./CCTypes": 164,
"./CCTypesWebGL": 165,
"./CCValueType": 166,
"./CCVec2": 167
} ],
169: [ (function(t, e, i) {
cc.js;
}), {} ],
170: [ (function(t, e, i) {
t("./CCSGMotionStreak");
t("./CCSGMotionStreakWebGLRenderCmd");
var n = cc.Class({
name: "cc.MotionStreak",
extends: cc.Component,
editor: !1,
ctor: function() {
this._root = null;
this._motionStreak = null;
},
properties: {
preview: {
default: !1,
editorOnly: !0,
notify: !1,
animatable: !1
},
_fadeTime: 1,
fadeTime: {
get: function() {
return this._fadeTime;
},
set: function(t) {
this._fadeTime = t;
this._motionStreak && this._motionStreak.setFadeTime(t);
},
animatable: !1,
tooltip: !1
},
_minSeg: 1,
minSeg: {
get: function() {
return this._minSeg;
},
set: function(t) {
this._minSeg = t;
this._motionStreak && this._motionStreak.setMinSeg(t);
},
animatable: !1,
tooltip: !1
},
_stroke: 64,
stroke: {
get: function() {
return this._stroke;
},
set: function(t) {
this._stroke = t;
this._motionStreak && this._motionStreak.setStroke(t);
},
animatable: !1,
tooltip: !1
},
_texture: {
default: null,
type: cc.Texture2D
},
texture: {
get: function() {
return this._texture;
},
set: function(t) {
this._texture = t;
if (this._motionStreak) {
0;
this._motionStreak.setTexture(t);
}
},
type: cc.Texture2D,
animatable: !1,
tooltip: !1
},
_color: cc.Color.WHITE,
color: {
get: function() {
return this._color;
},
set: function(t) {
this._color = t;
this._motionStreak && this._motionStreak.tintWithColor(t);
},
tooltip: !1
},
_fastMode: !1,
fastMode: {
get: function() {
return this._fastMode;
},
set: function(t) {
this._fastMode = t;
this._motionStreak && this._motionStreak.setFastMode(t);
},
animatable: !1,
tooltip: !1
}
},
onFocusInEditor: !1,
onLostFocusInEditor: !1,
reset: function() {
this._motionStreak.reset();
},
__preload: function() {
cc._renderType, cc.game.RENDER_TYPE_WEBGL, 0;
this._root = new _ccsg.Node();
var t = new _ccsg.MotionStreak();
t.initWithFade(this._fadeTime, this._minSeg, this._stroke, this.node.color, this._texture);
t.setFastMode(this._fastMode);
this._root.addChild(t);
var e = this.node._sgNode;
e && e.addChild(this._root, -10);
this._motionStreak = t;
},
onEnable: function() {
this.node.on("position-changed", this._onNodePositionChanged, this);
},
onDisable: function() {
this.node.off("position-changed", this._onNodePositionChanged, this);
},
_onNodePositionChanged: function() {
0;
if (this._motionStreak) {
var t = this.node, e = t.getNodeToWorldTransform(), i = e.tx - (t.width / 2 + t.anchorX * t.width), n = e.ty - (t.height / 2 + t.anchorY * t.height);
this._root.setPosition(-i, -n);
this._motionStreak.setPosition(i, n);
}
}
});
cc.MotionStreak = e.exports = n;
}), {
"./CCSGMotionStreak": 1,
"./CCSGMotionStreakWebGLRenderCmd": 1
} ],
171: [ (function(t, e, i) {
var n = t("../core/assets/CCAsset"), o = t("../core/textures/CCTexture2D"), r = cc.Class({
name: "cc.ParticleAsset",
extends: n,
properties: {
texture: {
default: null,
type: o
}
}
});
cc.ParticleAsset = e.exports = r;
}), {
"../core/assets/CCAsset": 17,
"../core/textures/CCTexture2D": 149
} ],
172: [ (function(i, n, o) {
i("./CCParticleAsset");
i("./CCSGParticleSystem");
i("./CCSGParticleSystemCanvasRenderCmd");
i("./CCSGParticleSystemWebGLRenderCmd");
var r = cc.BlendFunc.BlendFactor, s = cc.Enum({
GRAVITY: 0,
RADIUS: 1
}), c = cc.Enum({
FREE: 0,
RELATIVE: 1,
GROUPED: 2
}), a = {
preview: {
default: !0,
editorOnly: !0,
notify: !1,
animatable: !1,
tooltip: !1
},
_custom: !1,
custom: {
get: function() {
return this._custom;
},
set: function(t) {
0;
if (this._custom !== t) {
this._custom = t;
t ? this._applyCustoms() : this._applyFile();
0;
}
},
animatable: !1,
tooltip: !1
},
_file: {
default: null,
type: cc.ParticleAsset
},
file: {
get: function() {
return this._file;
},
set: function(i, n) {
if ("string" === ("object" === (e = typeof i) ? t(i) : e)) {
cc.errorID(8401, "cc.ParticleSystem", "cc.ParticleAsset", "ParticleAsset", "cc.ParticleAsset", "particle");
i = {
nativeUrl: i
};
}
if (this._file !== i) {
this._file = i;
if (i) {
this._applyFile();
0;
} else this.custom = !0;
}
},
animatable: !1,
type: cc.ParticleAsset,
tooltip: !1
},
_texture: {
default: null,
type: cc.Texture2D
},
texture: {
get: function() {
return this._texture;
},
set: function(t) {
0;
this._texture = t;
this._sgNode.texture = t;
!t && this._file && this._applyFile();
},
type: cc.Texture2D,
tooltip: !1
},
particleCount: {
get: function() {
return this._sgNode.particleCount;
},
set: function(t) {
this._sgNode.particleCount = t;
},
visible: !1,
tooltip: !1
},
_srcBlendFactor: r.SRC_ALPHA,
srcBlendFactor: {
get: function() {
return this._srcBlendFactor;
},
set: function(t) {
this._srcBlendFactor = t;
this._blendFunc.src = t;
this._sgNode.setBlendFunc(this._blendFunc);
},
animatable: !1,
type: r,
tooltip: !1
},
_dstBlendFactor: r.ONE_MINUS_SRC_ALPHA,
dstBlendFactor: {
get: function() {
return this._dstBlendFactor;
},
set: function(t) {
this._dstBlendFactor = t;
this._blendFunc.dst = t;
this._sgNode.setBlendFunc(this._blendFunc);
},
animatable: !1,
type: r,
tooltip: !1
},
playOnLoad: !0,
_autoRemoveOnFinish: !1,
autoRemoveOnFinish: {
get: function() {
return this._autoRemoveOnFinish;
},
set: function(t) {
if (this._autoRemoveOnFinish !== t) {
this._autoRemoveOnFinish = t;
this._applyAutoRemove();
}
},
animatable: !1,
tooltip: !1
},
active: {
get: function() {
return !!this._sgNode && this._sgNode.isActive();
},
visible: !1
}
}, l = (function() {
for (var t = {
totalParticles: 150,
duration: -1,
emissionRate: 10,
life: 1,
lifeVar: 0,
startColor: cc.Color.WHITE,
startColorVar: cc.Color.BLACK,
endColor: cc.color(255, 255, 255, 0),
endColorVar: cc.color(0, 0, 0, 0),
angle: 90,
angleVar: 20,
startSize: 50,
startSizeVar: 0,
endSize: 0,
endSizeVar: 0,
startSpin: 0,
startSpinVar: 0,
endSpin: 0,
endSpinVar: 0,
sourcePos: cc.p(0, 0),
posVar: cc.p(0, 0),
positionType: c.FREE,
emitterMode: s.GRAVITY,
gravity: cc.p(0, 0),
speed: 180,
speedVar: 50,
tangentialAccel: 80,
tangentialAccelVar: 0,
radialAccel: 0,
radialAccelVar: 0,
rotationIsDir: !1,
startRadius: 0,
startRadiusVar: 0,
endRadius: 0,
endRadiusVar: 0,
rotatePerS: 0,
rotatePerSVar: 0
}, e = Object.keys(t), i = 0; i < e.length; ++i) {
var n = e[i];
(function(t, e) {
var i = "_" + t;
a[i] = e;
var n = e.constructor, o = a[t] = {};
if (cc.isChildClassOf(n, cc.ValueType)) {
o.get = function() {
return new n(this[i]);
};
o.type = n;
} else o.get = function() {
return this[i];
};
if (cc.isChildClassOf(n, cc.ValueType)) o.set = function(e) {
this[i] = new n(e);
this._sgNode[t] = e;
}; else {
o.set = function(e) {
this[i] = e;
this._sgNode[t] = e;
};
}
})(n, t[n]);
}
return e;
})();
a.positionType.type = c;
a.emitterMode.type = s;
var h = cc.Class({
name: "cc.ParticleSystem",
extends: cc._RendererUnderSG,
editor: !1,
ctor: function() {
this._previewTimer = null;
this._focused = !1;
this._willStart = !1;
this._blendFunc = new cc.BlendFunc(0, 0);
this._originOnExit = null;
},
properties: a,
statics: {
DURATION_INFINITY: -1,
START_SIZE_EQUAL_TO_END_SIZE: -1,
START_RADIUS_EQUAL_TO_END_RADIUS: -1,
EmitterMode: s,
PositionType: c
},
__preload: function() {
this._super();
this.playOnLoad && this.resetSystem();
this._applyAutoRemove();
},
onDestroy: function() {
this._autoRemoveOnFinish && (this.autoRemoveOnFinish = !1);
this._super();
},
onFocusInEditor: !1,
onLostFocusInEditor: !1,
_createSgNode: function() {
return new _ccsg.ParticleSystem();
},
_initSgNode: function() {
var t = this._sgNode;
if (this._file) if (this._custom) {
!this._texture ? this._applyFile() : this._applyCustoms();
} else this._applyFile(); else this._custom && this._applyCustoms();
t.stopSystem();
},
addParticle: function() {
return this._sgNode.addParticle();
},
stopSystem: function() {
this._sgNode.stopSystem();
},
resetSystem: function() {
this._sgNode.resetSystem();
},
isFull: function() {
return this.particleCount >= this._totalParticles;
},
setDisplayFrame: function(t) {
if (t) {
var e = t.getTexture();
e && (this._texture = e);
this._sgNode.setDisplayFrame(t);
}
},
setTextureWithRect: function(t, e) {
this._texture = t;
this._sgNode.setTextureWithRect(t, e);
},
_applyFile: function() {
var t = this._file;
if (t) {
var e = this;
cc.loader.load(t.nativeUrl, (function(i, n) {
if (i || !n) throw i || new Error(cc._getError(6029));
if (e.isValid) {
var o = e._sgNode;
o.particleCount = 0;
var r = o.isActive();
o.initWithFile(t.nativeUrl);
n.textureUuid ? cc.loader.load({
uuid: n.textureUuid,
type: "uuid"
}, (function(t, i) {
t ? cc.error(t) : e.texture = i;
})) : !n.textureImageData && t.texture && (o.texture = t.texture);
n.emissionRate && (e.emissionRate = n.emissionRate);
o.setPosition(0, 0);
r || o.stopSystem();
e._applyAutoRemove();
e._custom && e._applyCustoms();
}
}));
}
},
_applyCustoms: function() {
for (var t = this._sgNode, e = t.isActive(), i = 0; i < l.length; i++) {
var n = l[i];
t[n] = this["_" + n];
}
this._blendFunc.src = this._srcBlendFactor;
this._blendFunc.dst = this._dstBlendFactor;
t.setBlendFunc(this._blendFunc);
this._texture && (t.texture = this._texture);
e || t.stopSystem();
this._applyAutoRemove();
},
_applyAutoRemove: function() {
var t = this._sgNode, e = this._autoRemoveOnFinish;
t.autoRemoveOnFinish = e;
if (e) {
if (this._originOnExit) return;
this._originOnExit = t.onExit;
var i = this;
t.onExit = function() {
i._originOnExit.call(this);
i.node.destroy();
};
} else if (this._originOnExit) {
t.onExit = this._originOnExit;
this._originOnExit = null;
}
}
});
cc.ParticleSystem = n.exports = h;
}), {
"./CCParticleAsset": 171,
"./CCSGParticleSystem": 1,
"./CCSGParticleSystemCanvasRenderCmd": 1,
"./CCSGParticleSystemWebGLRenderCmd": 1
} ],
173: [ (function(t, e, i) {
t("./CCSGTMXLayer");
t("./CCTMXLayerCanvasRenderCmd");
t("./CCTMXLayerWebGLRenderCmd");
var n = cc.Class({
name: "cc.TiledLayer",
extends: cc._SGComponent,
onEnable: function() {
this._sgNode && this._sgNode.setVisible(!0);
},
onDisable: function() {
this._sgNode && this._sgNode.setVisible(!1);
},
onDestroy: function() {
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
},
_initSgNode: function() {
var t = this._sgNode;
if (t) {
this.enabledInHierarchy || t.setVisible(!1);
this._registSizeProvider();
var e = this.node;
t.setAnchorPoint(e.getAnchorPoint());
}
},
_replaceSgNode: function(t) {
if (t !== this._sgNode) {
this._removeSgNode();
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
if (t && t instanceof _ccsg.TMXLayer) {
this._sgNode = t;
this._initSgNode();
} else this._sgNode = null;
}
},
getLayerName: function() {
return this._sgNode ? this._sgNode.getLayerName() : "";
},
setLayerName: function(t) {
this._sgNode && this._sgNode.setLayerName(t);
},
getProperty: function(t) {
return this._sgNode ? this._sgNode.getProperty(t) : null;
},
getPositionAt: function(t, e) {
if (this._sgNode) {
void 0 !== e && (t = cc.p(t, e));
return this._sgNode.getPositionAt(t);
}
return null;
},
removeTileAt: function(t, e) {
if (this._sgNode) {
void 0 !== e && (t = cc.p(t, e));
this._sgNode.removeTileAt(t);
}
},
setTileGID: function(t, e, i, n) {
if (this._sgNode) {
if (void 0 === e) throw new Error(cc._getError(7223));
var o;
if (void 0 === n && e instanceof cc.Vec2) {
o = e;
n = i;
} else o = cc.p(e, i);
this._sgNode.setTileGID(t, o, n);
}
},
getTileGIDAt: function(t, e) {
if (this._sgNode) {
void 0 !== e && (t = cc.p(t, e));
return this._sgNode.getTileGIDAt(t);
}
return 0;
},
getTileAt: function(t, e) {
if (this._sgNode) {
void 0 !== e && (t = cc.p(t, e));
return this._sgNode.getTileAt(t);
}
return null;
},
releaseMap: function() {
this._sgNode && this._sgNode.releaseMap();
},
setContentSize: function(t, e) {
if (this._sgNode) {
void 0 !== e && (t = cc.size(t, e));
this._sgNode.setContentSize(t);
}
},
getTexture: function() {
return this._sgNode ? this._sgNode.getTexture() : null;
},
setTexture: function(t) {
this._sgNode && this._sgNode.setTexture(t);
},
setTileOpacity: function(t) {
this._sgNode && this._sgNode.setTileOpacity(t);
},
getLayerSize: function() {
return this._sgNode ? this._sgNode.getLayerSize() : cc.size(0, 0);
},
setLayerSize: function(t) {
this._sgNode && this._sgNode.setLayerSize(t);
},
getMapTileSize: function() {
return this._sgNode ? this._sgNode.getMapTileSize() : cc.size(0, 0);
},
setMapTileSize: function(t) {
this._sgNode && this._sgNode.setMapTileSize(t);
},
getTiles: function() {
return this._sgNode ? this._sgNode.getTiles() : null;
},
setTiles: function(t) {
this._sgNode && this._sgNode.setTiles(t);
},
getTileSet: function() {
return this._sgNode ? this._sgNode.getTileSet() : null;
},
setTileSet: function(t) {
this._sgNode && this._sgNode.setTileSet(t);
},
getLayerOrientation: function() {
return this._sgNode ? this._sgNode.getLayerOrientation() : 0;
},
setLayerOrientation: function(t) {
this._sgNode && this._sgNode.setLayerOrientation(t);
},
getProperties: function() {
return this._sgNode ? this._sgNode.getProperties() : null;
},
setProperties: function(t) {
this._sgNode && this._sgNode.setProperties(t);
},
_tryRemoveNode: function() {
this.node.removeComponent(cc.TiledLayer);
1 === this.node._components.length && 0 === this.node.getChildren().length && this.node.removeFromParent();
}
});
cc.TiledLayer = e.exports = n;
}), {
"./CCSGTMXLayer": 1,
"./CCTMXLayerCanvasRenderCmd": 1,
"./CCTMXLayerWebGLRenderCmd": 1
} ],
174: [ (function(t, e, i) {
t("./CCTiledMapAsset");
t("./CCTiledLayer");
t("./CCTiledObjectGroup");
t("./CCSGTMXTiledMap");
var n = cc.Enum({
ORTHO: 0,
HEX: 1,
ISO: 2
}), o = cc.Enum({
NONE: 0,
MAP: 1,
LAYER: 2,
OBJECTGROUP: 3,
OBJECT: 4,
TILE: 5
}), r = cc.Enum({
HORIZONTAL: 2147483648,
VERTICAL: 1073741824,
DIAGONAL: 536870912,
FLIPPED_ALL: 3758096384,
FLIPPED_MASK: 536870911
}), s = cc.Enum({
STAGGERAXIS_X: 0,
STAGGERAXIS_Y: 1
}), c = cc.Enum({
STAGGERINDEX_ODD: 0,
STAGGERINDEX_EVEN: 1
}), a = cc.Enum({
RECT: 0,
ELLIPSE: 1,
POLYGON: 2,
POLYLINE: 3,
IMAGE: 4
}), l = cc.Class({
name: "cc.TiledMap",
extends: cc._RendererInSG,
editor: !1,
statics: {
Orientation: n,
Property: o,
TileFlag: r,
StaggerAxis: s,
StaggerIndex: c,
TMXObjectType: a
},
properties: {
_detachedChildren: {
default: [],
serializable: !1
},
_tmxFile: {
default: null,
type: cc.TiledMapAsset
},
tmxAsset: {
get: function() {
return this._tmxFile;
},
set: function(t, e) {
if (this._tmxFile !== t) {
this._tmxFile = t;
this._applyFile();
}
},
type: cc.TiledMapAsset
}
},
getMapSize: function() {
return this._sgNode.getMapSize();
},
setMapSize: function(t) {
this._sgNode.setMapSize(t);
},
getTileSize: function() {
return this._sgNode.getTileSize();
},
setTileSize: function(t) {
this._sgNode.setTileSize(t);
},
getMapOrientation: function() {
return this._sgNode.getMapOrientation();
},
setMapOrientation: function(t) {
this._sgNode.setMapOrientation(t);
},
getObjectGroups: function() {
for (var t = this.node.children, e = [], i = 0, n = t.length; i < n; i++) {
var o = t[i].getComponent(cc.TiledObjectGroup);
o && e.push(o);
}
return e;
},
getProperties: function() {
return this._sgNode.getProperties();
},
setProperties: function(t) {
this._sgNode.setProperties(t);
},
initWithTMXFile: function(t) {
cc.errorID(7200);
},
initWithXML: function(t, e) {
cc.errorID(7201);
},
allLayers: function() {
for (var t = this.node.children, e = [], i = 0, n = t.length; i < n; i++) {
var o = t[i].getComponent(cc.TiledLayer);
o && e.push(o);
}
return e;
},
getLayer: function(t) {
for (var e = this.node.children, i = 0, n = e.length; i < n; i++) {
var o = e[i].getComponent(cc.TiledLayer);
if (o && o.getLayerName() === t) return o;
}
return null;
},
getObjectGroup: function(t) {
for (var e = this.node.children, i = 0, n = e.length; i < n; i++) {
var o = e[i].getComponent(cc.TiledObjectGroup);
if (o && o.getGroupName() === t) return o;
}
return null;
},
getProperty: function(t) {
return this._sgNode.getProperty(t);
},
getPropertiesForGID: function(t) {
return this._sgNode.getPropertiesForGID(t);
},
onEnable: function() {
0 === this._detachedChildren.length && this._moveLayersInSgNode(this._sgNode);
this._super();
this._tmxFile && this._refreshLayerEntities();
this.node.on("anchor-changed", this._anchorChanged, this);
this.node.on("child-added", this._childAdded, this);
this.node.on("child-reorder", this._syncChildrenOrder, this);
},
onDisable: function() {
this._super();
this._setLayersEnabled(!1);
var t = this._plainNode;
this._moveLayersInSgNode(t);
this.node.off("anchor-changed", this._anchorChanged, this);
this.node.off("child-added", this._childAdded, this);
this.node.off("child-reorder", this._syncChildrenOrder, this);
},
onDestroy: function() {
this._super();
this._removeLayerEntities();
},
_createSgNode: function() {
return new _ccsg.TMXTiledMap();
},
_initSgNode: function() {
this._applyFile();
},
_resetSgSize: function() {
this.node.setContentSize(this._sgNode.getContentSize());
this._sgNode.setContentSize(0, 0);
},
_onMapLoaded: function() {
this._refreshLayerEntities();
this._enabled ? this._anchorChanged() : this._moveLayersInSgNode(this._sgNode);
this._setLayersEnabled(this._enabled);
this._resetSgSize();
},
_setLayersEnabled: function(t) {
for (var e = this.node.getChildren(), i = e.length - 1; i >= 0; i--) {
var n = e[i].getComponent(cc.TiledLayer);
n && (n.enabled = t);
}
},
_moveLayersInSgNode: function(t) {
this._detachedChildren.length = 0;
for (var e = t.getChildren(), i = e.length - 1; i >= 0; i--) {
var n = e[i];
if (n instanceof _ccsg.TMXLayer || n instanceof _ccsg.TMXObjectGroup) {
t.removeChild(n);
var o = n.getLocalZOrder();
this._detachedChildren.push({
sgNode: n,
zorder: o
});
}
}
},
_removeLayerEntities: function() {
for (var t = this.node.getChildren(), e = t.length - 1; e >= 0; e--) {
var i = t[e];
if (i.isValid) {
var n = i.getComponent(cc.TiledLayer);
n && n._tryRemoveNode();
var o = i.getComponent(cc.TiledObjectGroup);
o && o._tryRemoveNode();
}
}
},
_refreshLayerEntities: function() {
var t, e, i = this.node.getChildren(), n = [], o = [], r = [];
for (t = 0; t < this._detachedChildren.length; t++) {
var s = this._detachedChildren[t];
this._sgNode.addChild(s.sgNode, s.zorder, s.zorder);
}
this._detachedChildren.length = 0;
var c = this._sgNode.allLayers().map((function(t) {
return t.getLayerName();
})), a = this._sgNode.getObjectGroups().map((function(t) {
return t.getGroupName();
}));
for (t = i.length - 1; t >= 0; t--) {
var l = i[t], h = l.getComponent(cc.TiledLayer), u = l.getComponent(cc.TiledObjectGroup);
if (h) {
var d = h.getLayerName();
d || (d = l._name);
if (c.indexOf(d) < 0) h._tryRemoveNode(); else {
n.push(l);
var f = this._sgNode.getLayer(d);
h._replaceSgNode(f);
h.enabled = !0;
}
} else if (u) {
var _ = u.getGroupName();
_ || (_ = l._name);
if (a.indexOf(_) < 0) u._tryRemoveNode(); else {
o.push(l);
var p = this._sgNode.getObjectGroup(_);
u._replaceSgNode(p);
u.enabled = p.isVisible();
}
} else r.push({
child: l,
index: l.getSiblingIndex()
});
}
var g = n.map((function(t) {
return t.getComponent(cc.TiledLayer).getLayerName();
}));
for (t = 0, e = c.length; t < e; t++) {
var v = c[t], y = this._sgNode.getLayer(v), m = g.indexOf(v);
if (m < 0) {
var C = this.node.getChildByName(v), T = null;
if (C && !C.getComponent(cc._SGComponent)) T = C.addComponent(cc.TiledLayer); else {
C = new cc.Node(v);
this.node.addChild(C);
T = C.addComponent(cc.TiledLayer);
}
C && T || cc.errorID(7202);
T._replaceSgNode(y);
C.setSiblingIndex(y.getLocalZOrder());
C.setAnchorPoint(this.node.getAnchorPoint());
}
}
var b = o.map((function(t) {
return t.getComponent(cc.TiledObjectGroup).getGroupName();
}));
for (t = 0, e = a.length; t < e; t++) {
v = a[t];
var S = this._sgNode.getObjectGroup(v);
if ((m = b.indexOf(v)) < 0) {
var E = null;
if ((C = this.node.getChildByName(v)) && !C.getComponent(cc._SGComponent)) E = C.addComponent(cc.TiledObjectGroup); else {
C = new cc.Node(v);
this.node.addChild(C);
E = C.addComponent(cc.TiledObjectGroup);
}
C && E || cc.errorID(7202);
E._replaceSgNode(S);
C.setSiblingIndex(S.getLocalZOrder());
C.setAnchorPoint(this.node.getAnchorPoint());
E.enabled = S.isVisible();
}
}
var x = this.node.getChildren(), A = [];
for (t = 0, e = x.length; t < e; t++) {
h = (l = x[t]).getComponent(cc.TiledLayer);
u = l.getComponent(cc.TiledObjectGroup);
(h || u) && A.push(l._name);
}
var N = [], O = [], w = this._sgNode.getChildren();
for (t = 0, e = w.length; t < e; t++) if ((l = w[t]) instanceof _ccsg.TMXLayer) {
N.push(l.getLayerName());
O.push(l);
} else if (l instanceof _ccsg.TMXObjectGroup) {
N.push(l.getGroupName());
O.push(l);
}
for (t = N.length - 1; t >= 0; t--) {
var I = N[t];
if (t !== A.indexOf(I)) {
this.node.getChildByName(I).setSiblingIndex(O[t].getLocalZOrder());
}
}
for (t = 0, e = r.length; t < e; t++) (s = r[t]).child.setSiblingIndex(s.index);
this._syncChildrenOrder();
},
_anchorChanged: function() {
for (var t = this.node.children, e = this.node.getAnchorPoint(), i = 0, n = t.length; i < n; i++) {
var o = t[i];
o.getComponent(cc.TiledLayer) && o.setAnchorPoint(e);
}
},
_childAdded: function(t) {
var e = t.detail;
if (e) {
var i = e.getComponent(cc.TiledLayer), n = e.getComponent(cc.TiledObjectGroup);
if (!i && !n) {
var o = this.node.getChildrenCount();
e.setSiblingIndex(o);
e._sgNode && e._sgNode.setLocalZOrder(o);
}
}
},
_syncChildrenOrder: function() {
for (var t = this.node.children, e = 0, i = t.length; e < i; e++) {
var n = t[e], o = n.getComponent(cc.TiledLayer), r = n.getComponent(cc.TiledObjectGroup), s = n.getSiblingIndex();
o && o._sgNode && o._sgNode.setLocalZOrder(s);
r && r._sgNode && r._sgNode.setLocalZOrder(s);
n._sgNode && n._sgNode.setLocalZOrder(s);
}
},
_applyFile: function() {
var t = this._sgNode, e = this._tmxFile;
if (e) {
for (var i = e.textures, n = e.textureNames, o = {}, r = 0; r < i.length; ++r) o[n[r]] = i[r];
for (var s = e.tsxFileNames, c = e.tsxFiles, a = {}, l = 0; l < s.length; ++l) s[l].length > 0 && (a[s[l]] = c[l].text);
if (t.initWithXML(e.tmxXmlStr, a, o)) {
this._detachedChildren.length = 0;
this._onMapLoaded();
}
} else {
for (var h = t.allLayers(), u = 0, d = h.length; u < d; u++) t.removeChild(h[u]);
for (var f = t.getObjectGroups(), _ = 0, p = f.length; _ < p; _++) t.removeChild(f[_]);
this._detachedChildren.length = 0;
this._removeLayerEntities();
}
}
});
cc.TiledMap = e.exports = l;
cc.js.obsolete(cc.TiledMap.prototype, "cc.TiledMap.tmxFile", "tmxAsset", !0);
cc.js.get(cc.TiledMap.prototype, "mapLoaded", (function() {
cc.errorID(7203);
return [];
}), !1);
}), {
"./CCSGTMXTiledMap": 1,
"./CCTiledLayer": 173,
"./CCTiledMapAsset": 175,
"./CCTiledObjectGroup": 176
} ],
175: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.TiledMapAsset",
extends: cc.Asset,
properties: {
tmxXmlStr: "",
textures: {
default: [],
type: [ cc.Texture2D ]
},
textureNames: [ cc.String ],
tsxFiles: [ cc.TextAsset ],
tsxFileNames: [ cc.String ]
},
statics: {
preventDeferredLoadDependents: !0
},
createNode: !1
});
cc.TiledMapAsset = n;
e.exports = n;
}), {} ],
176: [ (function(t, e, i) {
t("./CCSGTMXObjectGroup");
var n = cc.Class({
name: "cc.TiledObjectGroup",
extends: cc._SGComponent,
onEnable: function() {
this._sgNode && this._sgNode.setVisible(!0);
},
onDisable: function() {
this._sgNode && this._sgNode.setVisible(!1);
},
onDestroy: function() {
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
},
_initSgNode: function() {
var t = this._sgNode;
if (t) {
this._registSizeProvider();
t.setAnchorPoint(this.node.getAnchorPoint());
}
},
_replaceSgNode: function(t) {
if (t !== this._sgNode) {
this._removeSgNode();
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
if (t && t instanceof _ccsg.TMXObjectGroup) {
this._sgNode = t;
this._initSgNode();
} else this._sgNode = null;
}
},
getPositionOffset: function() {
return this._sgNode ? this._sgNode.getPositionOffset() : cc.p(0, 0);
},
setPositionOffset: function(t) {
this._sgNode && this._sgNode.setPositionOffset(t);
},
getProperties: function() {
return this._sgNode ? this._sgNode.getProperties() : null;
},
setProperties: function(t) {
this._sgNode && this._sgNode.setProperties(t);
},
getGroupName: function() {
return this._sgNode ? this._sgNode.getGroupName() : "";
},
setGroupName: function(t) {
this._sgNode && this._sgNode.setGroupName(t);
},
getProperty: function(t) {
return this._sgNode ? this._sgNode.propertyNamed(t) : null;
},
getObject: function(t) {
return this._sgNode ? this._sgNode.getObject(t) : null;
},
getObjects: function() {
return this._sgNode ? this._sgNode.getObjects() : [];
},
_tryRemoveNode: function() {
this.node.removeComponent(cc.TiledObjectGroup);
1 === this.node._components.length && 0 === this.node.getChildren().length && this.node.removeFromParent();
}
});
cc.TiledObjectGroup = e.exports = n;
}), {
"./CCSGTMXObjectGroup": 1
} ],
177: [ (function(t, e, i) {
t("./cocos2d/core");
t("./cocos2d/animation");
t("./cocos2d/particle/CCParticleSystem");
t("./cocos2d/tilemap/CCTiledMap");
t("./cocos2d/motion-streak/CCMotionStreak");
t("./cocos2d/core/components/CCStudioComponent");
t("./extensions/ccpool/CCNodePool");
t("./extensions/ccpool/CCPool");
0;
t("./extensions/spine");
t("./extensions/dragonbones");
t("./cocos2d/deprecated");
}), {
"./cocos2d/actions": 1,
"./cocos2d/animation": 10,
"./cocos2d/core": 86,
"./cocos2d/core/components/CCStudioComponent": 66,
"./cocos2d/deprecated": 169,
"./cocos2d/motion-streak/CCMotionStreak": 170,
"./cocos2d/particle/CCParticleAsset": 171,
"./cocos2d/particle/CCParticleSystem": 172,
"./cocos2d/tilemap/CCTiledMap": 174,
"./cocos2d/tilemap/CCTiledMapAsset": 175,
"./extensions/ccpool/CCNodePool": 178,
"./extensions/ccpool/CCPool": 179,
"./extensions/dragonbones": 183,
"./extensions/spine": 186
} ],
178: [ (function(t, e, i) {
cc.NodePool = function(t) {
this.poolHandlerComp = t;
this._pool = [];
};
cc.NodePool.prototype = {
constructor: cc.NodePool,
size: function() {
return this._pool.length;
},
clear: function() {
for (var t = this._pool.length, e = 0; e < t; ++e) this._pool[e].destroy();
this._pool.length = 0;
},
put: function(t) {
if (t && -1 === this._pool.indexOf(t)) {
t.removeFromParent(!1);
var e = this.poolHandlerComp ? t.getComponent(this.poolHandlerComp) : null;
e && e.unuse && e.unuse();
this._pool.push(t);
}
},
get: function() {
var t = this._pool.length - 1;
if (t < 0) return null;
var e = this._pool[t];
this._pool.length = t;
var i = this.poolHandlerComp ? e.getComponent(this.poolHandlerComp) : null;
i && i.reuse && i.reuse.apply(i, arguments);
return e;
}
};
e.exports = cc.NodePool;
}), {} ],
179: [ (function(t, e, i) {
var n = [];
cc.pool = {
_pool: {},
_releaseCB: function() {
this.release();
},
_autoRelease: function(t) {
var e = void 0 !== t._running && !t._running;
cc.director.getScheduler().schedule(this._releaseCB, t, 0, 0, 0, e);
},
putInPool: function(t) {
var e = cc.js._getClassId(t.constructor);
if (e) {
this._pool[e] || (this._pool[e] = []);
t.unuse && t.unuse();
this._pool[e].push(t);
}
},
hasObject: function(t) {
var e = cc.js._getClassId(t), i = this._pool[e];
return !(!i || 0 === i.length);
},
removeObject: function(t) {
var e = cc.js._getClassId(t.constructor);
if (e) {
var i = this._pool[e];
if (i) for (var n = 0; n < i.length; n++) t === i[n] && i.splice(n, 1);
}
},
getFromPool: function(t) {
if (this.hasObject(t)) {
var e = cc.js._getClassId(t), i = this._pool[e];
n.length = arguments.length - 1;
for (var o = 0; o < n.length; o++) n[o] = arguments[o + 1];
var r = i.pop();
r.reuse && r.reuse.apply(r, n);
n.length = 0;
return r;
}
},
drainAllPools: function() {
for (var t in this._pool) for (var e = 0; e < this._pool[t].length; e++) this._pool[t][e];
this._pool = {};
}
};
}), {} ],
180: [ (function(t, e, i) {
var n = cc.Enum({
default: -1
}), o = cc.Enum({
"<None>": 0
});
dragonBones.ArmatureDisplay = cc.Class({
name: "dragonBones.ArmatureDisplay",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_factory: {
default: null,
type: dragonBones.CCFactory,
serializable: !1
},
dragonAsset: {
default: null,
type: dragonBones.DragonBonesAsset,
notify: function() {
this._parseDragonAsset();
this._refresh();
0;
},
tooltip: !1
},
dragonAtlasAsset: {
default: null,
type: dragonBones.DragonBonesAtlasAsset,
notify: function() {
this._parseDragonAtlasAsset();
this._refreshSgNode();
},
tooltip: !1
},
_armatureName: "",
armatureName: {
get: function() {
return this._armatureName;
},
set: function(t) {
this._armatureName = t;
var e = this.getAnimationNames(this._armatureName);
(!this.animationName || e.indexOf(this.animationName) < 0) && (this.animationName = "");
this._refresh();
},
visible: !1
},
_animationName: "",
animationName: {
get: function() {
return this._animationName;
},
set: function(t) {
this._animationName = t;
},
visible: !1
},
_defaultArmatureIndex: {
default: 0,
notify: function() {
var t = "";
if (this.dragonAsset) {
var e;
this.dragonAsset && (e = this.dragonAsset.getArmatureEnum());
if (!e) return cc.errorID(7400, this.name);
t = e[this._defaultArmatureIndex];
}
void 0 !== t ? this.armatureName = t : cc.errorID(7401, this.name);
},
type: n,
visible: !0,
editorOnly: !0,
displayName: "Armature",
tooltip: !1
},
_animationIndex: {
default: 0,
notify: function() {
if (0 !== this._animationIndex) {
var t;
this.dragonAsset && (t = this.dragonAsset.getAnimsEnum(this.armatureName));
if (t) {
var e = t[this._animationIndex];
void 0 !== e ? this.animationName = e : cc.errorID(7402, this.name);
}
} else this.animationName = "";
},
type: o,
visible: !0,
editorOnly: !0,
displayName: "Animation",
tooltip: !1
},
timeScale: {
default: 1,
notify: function() {
this._sgNode && (this._sgNode.animation().timeScale = this.timeScale);
},
tooltip: !1
},
playTimes: {
default: -1,
tooltip: !1
},
debugBones: {
default: !1,
notify: function() {
this._sgNode && this._sgNode.setDebugBones(this.debugBones);
},
editorOnly: !0,
tooltip: !1
}
},
ctor: function() {
this._factory = new dragonBones.CCFactory();
},
__preload: function() {
this._parseDragonAsset();
this._parseDragonAtlasAsset();
this._refresh();
},
_createSgNode: function() {
return this.dragonAsset && this.dragonAtlasAsset && this.armatureName ? this._factory.buildArmatureDisplay(this.armatureName, this.dragonAsset._dragonBonesData.name) : null;
},
_initSgNode: function() {
var t = this._sgNode;
t.animation().timeScale = this.timeScale;
this.animationName && this.playAnimation(this.animationName, this.playTimes);
0;
},
_removeSgNode: function() {
var t = this._sgNode;
this._super();
t && t.armature().dispose();
},
_parseDragonAsset: function() {
this.dragonAsset && this.dragonAsset.init(this._factory);
},
_parseDragonAtlasAsset: function() {
this.dragonAtlasAsset && this.dragonAtlasAsset.init(this._factory);
},
_refreshSgNode: function() {
var t = null, e = null;
if (this._sgNode) {
t = this._sgNode._bubblingListeners;
e = this._sgNode._hasListenerCache;
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
this._removeSgNode();
this._sgNode = null;
}
var i = this._sgNode = this._createSgNode();
if (i) {
this.enabledInHierarchy || i.setVisible(!1);
if (t) {
i._bubblingListeners = t;
i._hasListenerCache = e;
i.hasEventCallback() || i.setEventCallback((function(t) {
i.emit(t.type, t);
}));
}
this._initSgNode();
this._appendSgNode(i);
this._registSizeProvider();
}
},
_refresh: function() {
this._refreshSgNode();
0;
},
_updateAnimEnum: !1,
_updateArmatureEnum: !1,
playAnimation: function(t, e) {
if (this._sgNode) {
this.playTimes = void 0 === e ? -1 : e;
this.animationName = t;
return this._sgNode.animation().play(t, this.playTimes);
}
return null;
},
getArmatureNames: function() {
var t = this.dragonAsset && this.dragonAsset._dragonBonesData;
return t && t.armatureNames || [];
},
getAnimationNames: function(t) {
var e = [];
if (this.dragonAsset && this.dragonAsset._dragonBonesData) {
var i = this.dragonAsset._dragonBonesData.getArmature(t);
if (i) for (var n in i.animations) i.animations.hasOwnProperty(n) && e.push(n);
}
return e;
},
addEventListener: function(t, e, i) {
this._sgNode && this._sgNode.addEvent(t, e, i);
},
removeEventListener: function(t, e, i) {
this._sgNode && this._sgNode.removeEvent(t, e, i);
},
buildArmature: function(t) {
return this._factory ? this._factory.buildArmature(t) : null;
},
armature: function() {
return this._sgNode ? this._sgNode.armature() : null;
}
});
}), {} ],
181: [ (function(t, e, i) {
var n = cc.Class({
name: "dragonBones.DragonBonesAsset",
extends: cc.Asset,
ctor: function() {
this.reset();
},
properties: {
_dragonBonesJson: "",
dragonBonesJson: {
get: function() {
return this._dragonBonesJson;
},
set: function(t) {
this._dragonBonesJson = t;
this.reset();
}
}
},
statics: {
preventDeferredLoadDependents: !0
},
createNode: !1,
reset: function() {
this._dragonBonesData = null;
0;
},
init: function(t) {
0;
if (this._dragonBonesData) {
var e = t.getDragonBonesData(this._dragonBonesData.name);
if (e) {
for (var i = 0; i < this._dragonBonesData.armatureNames.length; i++) {
var n = this._dragonBonesData.armatureNames[i];
e.armatures[n] || e.addArmature(this._dragonBonesData.armatures[n]);
}
this._dragonBonesData = e;
} else t.addDragonBonesData(this._dragonBonesData);
} else {
var o = JSON.parse(this.dragonBonesJson), r = t.getDragonBonesData(o.name);
if (r) {
for (var s = void 0, c = 0; c < o.armature.length; c++) {
var a = o.armature[c].name;
if (!r.armatures[a]) {
s || (s = t._dataParser.parseDragonBonesData(o));
r.addArmature(s.armatures[a]);
}
}
this._dragonBonesData = r;
} else this._dragonBonesData = t.parseDragonBonesData(o);
}
},
getArmatureEnum: !1,
getAnimsEnum: !1,
destroy: function() {
this._super();
}
});
dragonBones.DragonBonesAsset = e.exports = n;
}), {} ],
182: [ (function(t, e, i) {
var n = cc.Class({
name: "dragonBones.DragonBonesAtlasAsset",
extends: cc.Asset,
ctor: function() {
this.reset();
},
properties: {
_atlasJson: "",
atlasJson: {
get: function() {
return this._atlasJson;
},
set: function(t) {
this._atlasJson = t;
this.reset();
}
},
_texture: {
default: null,
type: cc.Texture2D,
formerlySerializedAs: "texture"
},
texture: {
get: function() {
return this._texture;
},
set: function(t) {
this._texture = t;
this.reset();
}
}
},
statics: {
preventDeferredLoadDependents: !0
},
reset: function() {
this._textureAtlasData = null;
},
createNode: !1,
init: function(t) {
this._textureAtlasData ? t.addTextureAtlasData(this._textureAtlasData) : this._textureAtlasData = t.parseTextureAtlasData(this.atlasJson, this.texture);
},
destroy: function() {
this._super();
}
});
dragonBones.DragonBonesAtlasAsset = e.exports = n;
}), {} ],
183: [ (function(t, e, i) {
dragonBones = dragonBones;
dragonBones.DisplayType = {
Image: 0,
Armature: 1,
Mesh: 2
};
dragonBones.ArmatureType = {
Armature: 0,
MovieClip: 1,
Stage: 2
};
dragonBones.ExtensionType = {
FFD: 0,
AdjustColor: 10,
BevelFilter: 11,
BlurFilter: 12,
DropShadowFilter: 13,
GlowFilter: 14,
GradientBevelFilter: 15,
GradientGlowFilter: 16
};
dragonBones.EventType = {
Frame: 0,
Sound: 1
};
dragonBones.ActionType = {
Play: 0,
Stop: 1,
GotoAndPlay: 2,
GotoAndStop: 3,
FadeIn: 4,
FadeOut: 5
};
dragonBones.AnimationFadeOutMode = {
None: 0,
SameLayer: 1,
SameGroup: 2,
SameLayerAndGroup: 3,
All: 4
};
0;
t("./DragonBonesAsset");
t("./DragonBonesAtlasAsset");
t("./ArmatureDisplay");
}), {
"./ArmatureDisplay": 180,
"./CCArmatureDisplay": 1,
"./CCFactory": 1,
"./CCSlot": 1,
"./CCTextureData": 1,
"./DragonBonesAsset": 181,
"./DragonBonesAtlasAsset": 182,
"./lib/dragonBones": 1
} ],
184: [ (function(t, e, i) {
var n = cc.Enum({
default: -1
}), o = cc.Enum({
"<None>": 0
});
sp.Skeleton = cc.Class({
name: "sp.Skeleton",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_startListener: {
default: null,
serializable: !1
},
_endListener: {
default: null,
serializable: !1
},
_completeListener: {
default: null,
serializable: !1
},
_eventListener: {
default: null,
serializable: !1
},
_disposeListener: {
default: null,
serializable: !1
},
_interruptListener: {
default: null,
serializable: !1
},
_paused: !1,
paused: {
get: function() {
return this._paused;
},
set: function(t) {
this._paused = t;
this._sgNode && (t ? this._sgNode.pause() : this._sgNode.resume());
},
visible: !1
},
skeletonData: {
default: null,
type: sp.SkeletonData,
notify: function() {
this.defaultSkin = "";
this.defaultAnimation = "";
this._refresh();
},
tooltip: !1
},
defaultSkin: {
default: "",
visible: !1
},
defaultAnimation: {
default: "",
visible: !1
},
animation: {
get: function() {
var t = this.getCurrent(0);
return t && t.animation.name || "";
},
set: function(t) {
this.defaultAnimation = t;
if (t) this.setAnimation(0, t, this.loop); else {
this.clearTrack(0);
this.setToSetupPose();
}
},
visible: !1
},
_defaultSkinIndex: {
get: function() {
if (this.skeletonData && this.defaultSkin) {
var t = this.skeletonData.getSkinsEnum();
if (t) {
var e = t[this.defaultSkin];
if (void 0 !== e) return e;
}
}
return 0;
},
set: function(t) {
var e;
this.skeletonData && (e = this.skeletonData.getSkinsEnum());
if (!e) return cc.errorID("", this.name);
var i = e[t];
if (void 0 !== i) {
this.defaultSkin = i;
0;
} else cc.errorID(7501, this.name);
},
type: n,
visible: !0,
displayName: "Default Skin",
tooltip: !1
},
_animationIndex: {
get: function() {
var t = this.animation;
if (this.skeletonData && t) {
var e = this.skeletonData.getAnimsEnum();
if (e) {
var i = e[t];
if (void 0 !== i) return i;
}
}
return 0;
},
set: function(t) {
if (0 !== t) {
var e;
this.skeletonData && (e = this.skeletonData.getAnimsEnum());
if (!e) return cc.errorID(7502, this.name);
var i = e[t];
void 0 !== i ? this.animation = i : cc.errorID(7503, this.name);
} else this.animation = "";
},
type: o,
visible: !0,
displayName: "Animation",
tooltip: !1
},
loop: {
default: !0,
tooltip: !1
},
_premultipliedAlpha: !0,
premultipliedAlpha: {
get: function() {
return this._premultipliedAlpha;
},
set: function(t) {
this._premultipliedAlpha = t;
this._sgNode && this._sgNode.setPremultipliedAlpha(t);
},
tooltip: !1
},
timeScale: {
default: 1,
notify: function() {
this._sgNode && this._sgNode.setTimeScale(this.timeScale);
},
tooltip: !1
},
debugSlots: {
default: !1,
notify: function() {
this._sgNode && this._sgNode.setDebugSlotsEnabled(this.debugSlots);
},
editorOnly: !0,
tooltip: !1
},
debugBones: {
default: !1,
notify: function() {
this._sgNode && this._sgNode.setDebugBonesEnabled(this.debugBones);
},
editorOnly: !0,
tooltip: !1
}
},
__preload: function() {
this.node.setContentSize(0, 0);
this._refresh();
},
_createSgNode: function() {
var t = this.skeletonData;
if (t) {
if (!t._uuid) {
cc.errorID(7504);
return null;
}
var e = cc.loader.md5Pipe ? cc.loader.md5Pipe.transformURL(t.nativeUrl, !0) : t.nativeUrl, i = t.atlasText;
if (!i) {
cc.errorID(7508, t.name);
return null;
}
var n = t.textures, o = t.textureNames;
if (!(n && n.length > 0 && o && o.length > 0)) {
cc.errorID(7507, t.name);
return null;
}
for (var r = {}, s = 0; s < n.length; ++s) r[o[s]] = n[s];
var c = new sp._SGSkeletonAnimation();
try {
sp._initSkeletonRenderer(c, e, i, r, t.scale);
} catch (t) {
cc._throw(t);
return null;
}
return c;
}
return null;
},
_initSgNode: function() {
var t = this._sgNode;
t.setTimeScale(this.timeScale);
var e = this;
t.onEnter = function() {
_ccsg.Node.prototype.onEnter.call(this);
e._paused && this.pause();
};
this._startListener && this.setStartListener(this._startListener);
this._endListener && this.setEndListener(this._endListener);
this._completeListener && this.setCompleteListener(this._completeListener);
this._eventListener && this.setEventListener(this._eventListener);
this._interruptListener && this.setInterruptListener(this._interruptListener);
this._disposeListener && this.setDisposeListener(this._disposeListener);
if (this.defaultSkin) try {
t.setSkin(this.defaultSkin);
} catch (t) {
cc._throw(t);
}
t.setPremultipliedAlpha(this._premultipliedAlpha);
this.animation = this.defaultAnimation;
0;
},
_getLocalBounds: !1,
updateWorldTransform: function() {
this._sgNode && this._sgNode.updateWorldTransform();
},
setToSetupPose: function() {
this._sgNode && this._sgNode.setToSetupPose();
},
setBonesToSetupPose: function() {
this._sgNode && this._sgNode.setBonesToSetupPose();
},
setSlotsToSetupPose: function() {
this._sgNode && this._sgNode.setSlotsToSetupPose();
},
findBone: function(t) {
return this._sgNode ? this._sgNode.findBone(t) : null;
},
findSlot: function(t) {
return this._sgNode ? this._sgNode.findSlot(t) : null;
},
setSkin: function(t) {
return this._sgNode ? this._sgNode.setSkin(t) : null;
},
getAttachment: function(t, e) {
return this._sgNode ? this._sgNode.getAttachment(t, e) : null;
},
setAttachment: function(t, e) {
this._sgNode && this._sgNode.setAttachment(t, e);
},
setSkeletonData: function(t, e) {
this._sgNode && this._sgNode.setSkeletonData(t, e);
},
setAnimationStateData: function(t) {
if (this._sgNode) return this._sgNode.setAnimationStateData(t);
},
setMix: function(t, e, i) {
this._sgNode && this._sgNode.setMix(t, e, i);
},
setAnimationListener: function(t, e) {
this._sgNode && this._sgNode.setAnimationListener(t, e);
},
setAnimation: function(t, e, i) {
if (this._sgNode) {
0;
return this._sgNode.setAnimation(t, e, i);
}
return null;
},
_sample: function() {
this._sgNode && this._sgNode.update(0);
},
addAnimation: function(t, e, i, n) {
return this._sgNode ? this._sgNode.addAnimation(t, e, i, n || 0) : null;
},
findAnimation: function(t) {
return this._sgNode ? this._sgNode.findAnimation(t) : null;
},
getCurrent: function(t) {
return this._sgNode ? this._sgNode.getCurrent(t) : null;
},
clearTracks: function() {
this._sgNode && this._sgNode.clearTracks();
},
clearTrack: function(t) {
if (this._sgNode) {
this._sgNode.clearTrack(t);
0;
}
},
_updateAnimEnum: !1,
_updateSkinEnum: !1,
setStartListener: function(t) {
this._startListener = t;
this._sgNode && this._sgNode.setStartListener(t);
},
setInterruptListener: function(t) {
this._interruptListener = t;
this._sgNode && this._sgNode.setInterruptListener(t);
},
setEndListener: function(t) {
this._endListener = t;
this._sgNode && this._sgNode.setEndListener(t);
},
setDisposeListener: function(t) {
this._disposeListener = t;
this._sgNode && this._sgNode.setDisposeListener(t);
},
setCompleteListener: function(t) {
this._completeListener = t;
this._sgNode && this._sgNode.setCompleteListener(t);
},
setEventListener: function(t) {
this._eventListener = t;
this._sgNode && this._sgNode.setEventListener(t);
},
setTrackStartListener: function(t, e) {
this._sgNode && this._sgNode.setTrackStartListener(t, e);
},
setTrackInterruptListener: function(t, e) {
this._sgNode && this._sgNode.setTrackInterruptListener(t, e);
},
setTrackEndListener: function(t, e) {
this._sgNode && this._sgNode.setTrackEndListener(t, e);
},
setTrackDisposeListener: function(t, e) {
this._sgNode && this._sgNode.setTrackDisposeListener(t, e);
},
setTrackCompleteListener: function(t, e) {
this._sgNode && this._sgNode.setTrackCompleteListener(t, e);
},
setTrackEventListener: function(t, e) {
this._sgNode && this._sgNode.setTrackEventListener(t, e);
},
getState: function() {
if (this._sgNode) return this._sgNode.getState();
},
_refresh: function() {
if (this._sgNode) {
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
this._removeSgNode();
this._sgNode = null;
}
var t = this._sgNode = this._createSgNode();
if (t) {
this.enabledInHierarchy || t.setVisible(!1);
t.setContentSize(0, 0);
this._initSgNode();
this._appendSgNode(t);
this._registSizeProvider();
}
0;
}
});
}), {} ],
185: [ (function(t, e, i) {
var n = cc.Class({
name: "sp.SkeletonData",
extends: cc.Asset,
ctor: function() {
this.reset();
},
properties: {
_skeletonJson: null,
skeletonJson: {
get: function() {
return this._skeletonJson;
},
set: function(t) {
this._skeletonJson = t;
this.reset();
}
},
_atlasText: "",
atlasText: {
get: function() {
return this._atlasText;
},
set: function(t) {
this._atlasText = t;
this.reset();
}
},
textures: {
default: [],
type: [ cc.Texture2D ]
},
textureNames: {
default: [],
type: [ cc.String ]
},
scale: 1
},
statics: {
preventDeferredLoadDependents: !0,
preventPreloadNativeObject: !0
},
createNode: !1,
reset: function() {
this._skeletonCache = null;
this._atlasCache = null;
0;
},
getRuntimeData: !1,
getSkinsEnum: !1,
getAnimsEnum: !1,
_getTexture: !1,
_getAtlas: !1
});
sp.SkeletonData = e.exports = n;
}), {} ],
186: [ (function(t, e, i) {
sp = sp;
sp.VERTEX_INDEX = {
X1: 0,
Y1: 1,
X2: 2,
Y2: 3,
X3: 4,
Y3: 5,
X4: 6,
Y4: 7
};
sp.ATTACHMENT_TYPE = {
REGION: 0,
BOUNDING_BOX: 1,
MESH: 2,
SKINNED_MESH: 3
};
sp.AnimationEventType = cc.Enum({
START: 0,
INTERRUPT: 1,
END: 2,
DISPOSE: 3,
COMPLETE: 4,
EVENT: 5
});
0;
t("./SkeletonData");
t("./Skeleton");
}), {
"./SGSkeleton": 1,
"./SGSkeletonAnimation": 1,
"./SGSkeletonCanvasRenderCmd": 1,
"./SGSkeletonTexture": 1,
"./SGSkeletonWebGLRenderCmd": 1,
"./Skeleton": 184,
"./SkeletonData": 185,
"./lib/spine": 1
} ],
187: [ (function(t, e, i) {
"use strict";
t("../predefine");
cc.ClassManager || (cc.ClassManager = window.ClassManager);
t("../polyfill/misc");
t("../polyfill/string");
t("../polyfill/typescript");
t("../cocos2d/core/platform/js");
t("../cocos2d/core/value-types");
t("../cocos2d/core/utils/find");
t("../cocos2d/core/utils/mutable-forward-iterator");
t("../cocos2d/core/event");
t("../cocos2d/core/event-manager/CCEvent");
t("../CCDebugger");
var n = t("../cocos2d/core/platform/CCMacro");
void 0 !== window.__ENABLE_GC_FOR_NATIVE_OBJECTS__ && (n.ENABLE_GC_FOR_NATIVE_OBJECTS = window.__ENABLE_GC_FOR_NATIVE_OBJECTS__);
t("./jsb-game");
t("./jsb-loader");
t("./jsb-director");
t("./jsb-tex-sprite-frame");
t("./jsb-scale9sprite");
t("./jsb-label");
t("./jsb-editbox");
t("./jsb-videoplayer");
t("./jsb-webview");
t("./jsb-particle");
t("./jsb-spine");
t("./jsb-enums");
t("./jsb-event");
t("./jsb-action");
t("./jsb-etc");
t("./jsb-audio");
t("./jsb-tiledmap");
t("./jsb-box2d");
t("./jsb-dragonbones-asset");
t("./jsb-dragonbones");
t("../extends");
}), {
"../CCDebugger": 2,
"../cocos2d/core/event": 81,
"../cocos2d/core/event-manager/CCEvent": 76,
"../cocos2d/core/platform/CCMacro": 131,
"../cocos2d/core/platform/js": 143,
"../cocos2d/core/utils/find": 154,
"../cocos2d/core/utils/mutable-forward-iterator": 156,
"../cocos2d/core/value-types": 168,
"../extends": 177,
"../polyfill/misc": 208,
"../polyfill/string": 209,
"../polyfill/typescript": 210,
"../predefine": 211,
"./jsb-action": 188,
"./jsb-audio": 189,
"./jsb-box2d": 190,
"./jsb-director": 191,
"./jsb-dragonbones": 193,
"./jsb-dragonbones-asset": 192,
"./jsb-editbox": 194,
"./jsb-enums": 195,
"./jsb-etc": 196,
"./jsb-event": 197,
"./jsb-game": 198,
"./jsb-label": 199,
"./jsb-loader": 200,
"./jsb-particle": 201,
"./jsb-scale9sprite": 202,
"./jsb-spine": 203,
"./jsb-tex-sprite-frame": 204,
"./jsb-tiledmap": 205,
"./jsb-videoplayer": 206,
"./jsb-webview": 207
} ],
188: [ (function(t, e, i) {
cc.macro.ENABLE_GC_FOR_NATIVE_OBJECTS;
cc.Action.prototype._getSgTarget = cc.Action.prototype.getTarget;
cc.Action.prototype.getTarget = function() {
var t = this._getSgTarget();
return t._owner || t;
};
cc.targetedAction = function(t, e) {
return new cc.TargetedAction(t, e);
};
cc.TargetedAction.prototype._ctor = function(t, e) {
var i = t._sgNode || t;
i._owner = t;
e && this.initWithTarget(i, e);
};
cc.follow = function(t, e) {
return new cc.Follow(t, e);
};
cc.Follow = cc.BaseJSAction.extend({
_followedNode: null,
_boundarySet: !1,
_boundaryFullyCovered: !1,
_halfScreenSize: null,
_fullScreenSize: null,
_worldRect: null,
leftBoundary: 0,
rightBoundary: 0,
topBoundary: 0,
bottomBoundary: 0,
ctor: function(t, e) {
cc.BaseJSAction.prototype.ctor.call(this);
this._followedNode = null;
this._boundarySet = !1;
this._boundaryFullyCovered = !1;
this._halfScreenSize = null;
this._fullScreenSize = null;
this.leftBoundary = 0;
this.rightBoundary = 0;
this.topBoundary = 0;
this.bottomBoundary = 0;
this._worldRect = cc.rect(0, 0, 0, 0);
t && (e ? this.initWithTarget(t, e) : this.initWithTarget(t));
},
clone: function() {
var t = new cc.Follow(), e = this._worldRect, i = new cc.Rect(e.x, e.y, e.width, e.height);
t.initWithTarget(this._followedNode, i);
return t;
},
isBoundarySet: function() {
return this._boundarySet;
},
setBoudarySet: function(t) {
this._boundarySet = t;
},
initWithTarget: function(t, e) {
if (!t) throw new Error("cc.Follow.initWithAction(): followedNode must be non nil");
e = e || cc.rect(0, 0, 0, 0);
this._followedNode = t;
this._worldRect = e;
this._boundarySet = !cc._rectEqualToZero(e);
this._boundaryFullyCovered = !1;
var i = cc.director.getWinSize();
this._fullScreenSize = cc.p(i.width, i.height);
this._halfScreenSize = cc.pMult(this._fullScreenSize, .5);
if (this._boundarySet) {
this.leftBoundary = -(e.x + e.width - this._fullScreenSize.x);
this.rightBoundary = -e.x;
this.topBoundary = -e.y;
this.bottomBoundary = -(e.y + e.height - this._fullScreenSize.y);
this.rightBoundary < this.leftBoundary && (this.rightBoundary = this.leftBoundary = (this.leftBoundary + this.rightBoundary) / 2);
this.topBoundary < this.bottomBoundary && (this.topBoundary = this.bottomBoundary = (this.topBoundary + this.bottomBoundary) / 2);
this.topBoundary === this.bottomBoundary && this.leftBoundary === this.rightBoundary && (this._boundaryFullyCovered = !0);
}
return !0;
},
step: function(t) {
var e = this.getTarget(), i = e.convertToWorldSpaceAR(cc.Vec2.ZERO), n = this._followedNode.convertToWorldSpaceAR(cc.Vec2.ZERO), o = cc.pSub(i, n), r = e.parent.convertToNodeSpaceAR(cc.pAdd(o, this._halfScreenSize));
if (this._boundarySet) {
if (this._boundaryFullyCovered) return;
e.setPosition(cc.clampf(r.x, this.leftBoundary, this.rightBoundary), cc.clampf(r.y, this.bottomBoundary, this.topBoundary));
} else e.setPosition(r.x, r.y);
},
isDone: function() {
return !this._followedNode.isRunning();
},
stop: function() {
this.setTarget(null);
cc.Action.prototype.stop.call(this);
}
});
var n = cc.FlipX;
cc.FlipX = n.extend({
_flippedX: !1,
ctor: function(t) {
n.prototype.ctor.call(this);
this.initWithFlipX(t);
},
initWithFlipX: function(t) {
this._flippedX = !!t;
return !0;
},
update: function(t) {
var e = this._getSgTarget();
e.scaleX = Math.abs(e.scaleX) * (this._flippedX ? -1 : 1);
},
reverse: function() {
return new cc.FlipX(!this._flippedX);
},
clone: function() {
return new cc.FlipX(this._flippedX);
}
});
cc.flipX = function(t) {
return new cc.FlipX(t);
};
var o = cc.FlipY;
cc.FlipY = o.extend({
_flippedY: !1,
ctor: function(t) {
o.prototype.ctor.call(this);
this.initWithFlipY(t);
},
initWithFlipY: function(t) {
this._flippedY = !!t;
return !0;
},
update: function(t) {
var e = this._getSgTarget();
e.scaleY = Math.abs(e.scaleY) * (this._flippedY ? -1 : 1);
},
reverse: function() {
return new cc.FlipY(!this._flippedY);
},
clone: function() {
return new cc.FlipY(this._flippedY);
}
});
cc.flipY = function(t) {
return new cc.FlipY(t);
};
function r(t, e, i) {
if (t) for (var n = t._owner.getComponentsInChildren(cc._SGComponent), o = 0; o < n.length; ++o) {
var r = n[o];
r.enabled = e ? !r.enabled : i;
}
}
cc.Show.prototype.update = function(t) {
r(this._getSgTarget(), !1, !0);
};
cc.Hide.prototype.update = function(t) {
r(this._getSgTarget(), !1, !1);
};
cc.ToggleVisibility.prototype.update = function(t) {
r(this._getSgTarget(), !0);
};
cc.callFunc = function(t, e, i) {
var n = function(e) {
e && (e = e._owner || e);
t.call(this, e, i);
};
return e ? cc.CallFunc.create(n, e) : cc.CallFunc.create(n);
};
cc.CallFunc.prototype._ctor = function(t, e, i) {
if (void 0 !== t) {
var n = function(e) {
e && (e = e._owner || e);
t.call(this, e, i);
};
void 0 === e ? this.initWithFunction(n) : this.initWithFunction(n, e);
}
};
function s(t) {
t instanceof cc.Component ? t = t.node._sgNode : t instanceof cc.Node ? t = t._sgNode : t instanceof _ccsg.Node || (t = null);
return t;
}
var c = cc.ActionManager.prototype.addAction;
cc.ActionManager.prototype.addAction = function(t, e, i) {
(e = s(e)) && c.call(this, t, e, i);
};
function a(t, e) {
var i = cc.ActionManager.prototype, n = i[t];
i[t] = function() {
for (var t = [], i = 0; i < arguments.length; i++) t[i] = i === e ? s(arguments[i]) : arguments[i];
return t[e] ? n.apply(this, t) : void 0;
};
}
for (var l = [ [ "removeAllActionsFromTarget", 0 ], [ "removeActionByTag", 1 ], [ "getActionByTag", 1 ], [ "getNumberOfRunningActionsInTarget", 0 ], [ "pauseTarget", 0 ], [ "resumeTarget", 0 ] ], h = 0; h < l.length; ++h) a.apply(null, l[h]);
cc.ActionManager.prototype.resumeTargets = function(t) {
if (t) for (var e = 0; e < t.length; e++) t[e] && this.resumeTarget(t[e]);
};
cc.ActionManager.prototype.pauseTargets = function(t) {
if (t) for (var e = 0; e < t.length; e++) t[e] && this.pauseTarget(t[e]);
};
function u(t) {
var e = this._getSgTarget();
if (e._owner) {
e._owner.x = e.getPositionX();
e._owner.y = e.getPositionY();
}
}
function d(t) {
var e = this._getSgTarget();
if (e._owner) {
e._owner.rotationX = e.getRotationX();
e._owner.rotationY = e.getRotationY();
}
}
function f(t) {
var e = this._getSgTarget();
e._owner && (e._owner.opacity = e.getOpacity());
}
function _(t) {
var e = this._getSgTarget();
if (e._owner) {
var i = e.getColor();
e._owner.color = i;
}
}
var p = {
MoveBy: u,
JumpBy: u,
Place: u,
CardinalSplineTo: u,
RotateTo: d,
RotateBy: d,
ScaleTo: function(t) {
var e = this._getSgTarget();
if (e._owner) {
e._owner.scaleX = e.getScaleX();
e._owner.scaleY = e.getScaleY();
}
},
RemoveSelf: function(t) {
var e = this._getSgTarget();
e._owner && e._owner.removeFromParent();
},
SkewTo: function(t) {
var e = this._getSgTarget();
if (e._owner) {
e._owner.skewX = e.getSkewX();
e._owner.skewY = e.getSkewY();
}
},
Blink: f,
FadeIn: f,
FadeOut: f,
FadeTo: f,
TintTo: _,
TintBy: _,
BezierBy: u
};
for (var g in p) {
var v = cc[g].prototype;
v.update = p[g];
v.speed = function(t) {
return new cc.Speed(this, t);
};
v.repeat = function(t) {
return new cc.Repeat(this, t);
};
v.repeatForever = function() {
return new cc.RepeatForever(this);
};
}
}), {} ],
189: [ (function(i, n, o) {
cc.Audio = function(t) {
this.src = t;
this.volume = 1;
this.loop = !1;
this.id = -1;
};
(function(n, o) {
cc.audioEngine = o;
o.setMaxWebAudioSize = function() {};
n.State = o.AudioState;
n.play = function() {
o.stop(this.id);
this.id = o.play(this.src, this.loop, this.volume);
};
n.pause = function() {
o.pause(this.id);
};
n.resume = function() {
o.resume(this.id);
};
n.stop = function() {
o.stop(this.id);
};
n.destroy = function() {};
n.setLoop = function(t) {
this.loop = t;
o.setLoop(this.id, t);
};
n.getLoop = function() {
return this.loop;
};
n.setVolume = function(t) {
this.volume = t;
return o.setVolume(this.id, t);
};
n.getVolume = function() {
return this.volume;
};
n.setCurrentTime = function(t) {
o.setCurrentTime(this.id, t);
};
n.getCurrentTime = function() {
return o.getCurrentTime(this.id);
};
n.getDuration = function() {
return o.getDuration(this.id);
};
n.getState = function() {
return o.getState(this.id);
};
var r = {
id: -1,
clip: "",
loop: !1,
volume: 1
}, s = {
volume: 1
};
o.play = function(i, n, r) {
"number" !== ("object" === (e = typeof r) ? t(r) : e) && (r = 1);
var s;
if ("string" === ("object" === (e = typeof i) ? t(i) : e)) {
cc.warnID(8401, "cc.audioEngine", "cc.AudioClip", "AudioClip", "cc.AudioClip", "audio");
s = i;
} else {
if (!i) return;
s = i._nativeAsset;
}
var c = cc.loader.md5Pipe;
c && (s = c.transformURL(s));
return o.play2d(s, n, r);
};
o.playMusic = function(t, e) {
o.stop(r.id);
r.id = o.play(t, e, r.volume);
r.loop = e;
r.clip = t;
return r.id;
};
o.stopMusic = function() {
o.stop(r.id);
};
o.pauseMusic = function() {
o.pause(r.id);
return r.id;
};
o.resumeMusic = function() {
o.resume(r.id);
return r.id;
};
o.getMusicVolume = function() {
return r.volume;
};
o.setMusicVolume = function(t) {
r.volume = t;
o.setVolume(r.id, r.volume);
return t;
};
o.isMusicPlaying = function() {
return o.getState(r.id) === o.AudioState.PLAYING;
};
o.playEffect = function(t, e) {
return o.play(t, e || !1, s.volume);
};
o.setEffectsVolume = function(t) {
s.volume = t;
};
o.getEffectsVolume = function() {
return s.volume;
};
o.pauseEffect = function(t) {
return o.pause(t);
};
o.pauseAllEffects = function() {
var t = o.getState(r.id) === o.AudioState.PLAYING;
o.pauseAll();
t && o.resume(r.id);
};
o.resumeEffect = function(t) {
o.resume(t);
};
o.resumeAllEffects = function() {
var t = o.getState(r.id) === o.AudioState.PAUSED;
o.resumeAll();
t && o.getState(r.id) === o.AudioState.PLAYING && o.pause(r.id);
};
o.stopEffect = function(t) {
return o.stop(t);
};
o.stopAllEffects = function() {
var t = o.getState(r.id) === o.AudioState.PLAYING, e = o.getCurrentTime(r.id);
o.stopAll();
if (t) {
r.id = o.play(r.clip, r.loop);
o.setCurrentTime(r.id, e);
}
};
o._uncache = o.uncache;
o.uncache = function(i) {
var n;
if ("string" === ("object" === (e = typeof i) ? t(i) : e)) {
cc.warnID(8401, "cc.audioEngine", "cc.AudioClip", "AudioClip", "cc.AudioClip", "audio");
n = i;
} else {
if (!i) return;
n = i._nativeAsset;
}
o._uncache(n);
};
o._preload = o.preload;
o.preload = function(t, e) {
cc.warn("`cc.audioEngine.preload` is deprecated, use `cc.loader.loadRes(url, cc.AudioClip)` instead please.");
o._preload(t, e);
};
var c = i("../cocos2d/audio/deprecated");
c.removed(o);
c.deprecated(o);
})(cc.Audio.prototype, jsb.AudioEngine);
}), {
"../cocos2d/audio/deprecated": 14
} ],
190: [ (function(t, e, i) {
(function() {
window.b2 || (window.b2 = {});
var t = b2.Vec2 = function(t, e) {
void 0 === t && (t = 0);
void 0 === e && (e = 0);
this.x = t;
this.y = e;
};
t.Make = function(e, i) {
void 0 === e && (e = 0);
void 0 === i && (i = 0);
return new t(e, i);
};
t.prototype.SetZero = function() {
this.x = 0;
this.y = 0;
};
t.prototype.Set = function(t, e) {
void 0 === t && (t = 0);
void 0 === e && (e = 0);
this.x = t;
this.y = e;
};
t.prototype.SetV = function(t) {
this.x = t.x;
this.y = t.y;
};
t.prototype.GetNegative = function() {
return new t(-this.x, -this.y);
};
t.prototype.NegativeSelf = function() {
this.x = -this.x;
this.y = -this.y;
};
t.prototype.Copy = function() {
return new t(this.x, this.y);
};
t.prototype.Add = function(t) {
this.x += t.x;
this.y += t.y;
};
t.prototype.Subtract = function(t) {
this.x -= t.x;
this.y -= t.y;
};
t.prototype.Multiply = function(t) {
void 0 === t && (t = 0);
this.x *= t;
this.y *= t;
};
t.prototype.CrossVF = function(t) {
void 0 === t && (t = 0);
var e = this.x;
this.x = t * this.y;
this.y = -t * e;
};
t.prototype.CrossFV = function(t) {
void 0 === t && (t = 0);
var e = this.x;
this.x = -t * this.y;
this.y = t * e;
};
t.prototype.MinV = function(t) {
this.x = this.x < t.x ? this.x : t.x;
this.y = this.y < t.y ? this.y : t.y;
};
t.prototype.MaxV = function(t) {
this.x = this.x > t.x ? this.x : t.x;
this.y = this.y > t.y ? this.y : t.y;
};
t.prototype.Abs = function() {
this.x < 0 && (this.x = -this.x);
this.y < 0 && (this.y = -this.y);
};
t.prototype.Length = function() {
return Math.sqrt(this.x * this.x + this.y * this.y);
};
t.prototype.LengthSquared = function() {
return this.x * this.x + this.y * this.y;
};
t.prototype.Normalize = function() {
var t = Math.sqrt(this.x * this.x + this.y * this.y);
if (t < Number.MIN_VALUE) return 0;
var e = 1 / t;
this.x *= e;
this.y *= e;
return t;
};
t.IsValid = function(t) {
void 0 === t && (t = 0);
return isFinite(t);
};
t.prototype.IsValid = function() {
return t.IsValid(this.x) && t.IsValid(this.y);
};
var e = b2.AABB = function() {
this.lowerBound = new t();
this.upperBound = new t();
};
e.prototype.IsValid = function() {
var t = this.upperBound.x - this.lowerBound.x, e = this.upperBound.y - this.lowerBound.y, i = t >= 0 && e >= 0;
return i = i && this.lowerBound.IsValid() && this.upperBound.IsValid();
};
e.prototype.GetCenter = function() {
return new t((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2);
};
e.prototype.GetExtents = function() {
return new t((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2);
};
e.prototype.Contains = function(t) {
var e = !0;
return e = (e = (e = (e = e && this.lowerBound.x <= t.lowerBound.x) && this.lowerBound.y <= t.lowerBound.y) && t.upperBound.x <= this.upperBound.x) && t.upperBound.y <= this.upperBound.y;
};
e.prototype.RayCast = function(t, e) {
var i = -Number.MAX_VALUE, n = Number.MAX_VALUE, o = e.p1.x, r = e.p1.y, s = e.p2.x - e.p1.x, c = e.p2.y - e.p1.y, a = Math.abs(s), l = Math.abs(c), h = t.normal, u = 0, d = 0, f = 0, _ = 0, p = 0;
if (a < Number.MIN_VALUE) {
if (o < this.lowerBound.x || this.upperBound.x < o) return !1;
} else {
u = 1 / s;
d = (this.lowerBound.x - o) * u;
f = (this.upperBound.x - o) * u;
p = -1;
if (d > f) {
_ = d;
d = f;
f = _;
p = 1;
}
if (d > i) {
h.x = p;
h.y = 0;
i = d;
}
if (i > (n = Math.min(n, f))) return !1;
}
if (l < Number.MIN_VALUE) {
if (r < this.lowerBound.y || this.upperBound.y < r) return !1;
} else {
u = 1 / c;
d = (this.lowerBound.y - r) * u;
f = (this.upperBound.y - r) * u;
p = -1;
if (d > f) {
_ = d;
d = f;
f = _;
p = 1;
}
if (d > i) {
h.y = p;
h.x = 0;
i = d;
}
if (i > (n = Math.min(n, f))) return !1;
}
t.fraction = i;
return !0;
};
e.prototype.TestOverlap = function(t) {
var e = t.lowerBound.x - this.upperBound.x, i = t.lowerBound.y - this.upperBound.y, n = this.lowerBound.x - t.upperBound.x, o = this.lowerBound.y - t.upperBound.y;
return !(e > 0 || i > 0) && !(n > 0 || o > 0);
};
e.Combine = function(t, i) {
var n = new e();
n.Combine(t, i);
return n;
};
e.prototype.Combine = function(t, e) {
this.lowerBound.x = Math.min(t.lowerBound.x, e.lowerBound.x);
this.lowerBound.y = Math.min(t.lowerBound.y, e.lowerBound.y);
this.upperBound.x = Math.max(t.upperBound.x, e.upperBound.x);
this.upperBound.y = Math.max(t.upperBound.y, e.upperBound.y);
};
var i = b2.FilterData = function() {
this.categoryBits = 1;
this.maskBits = 65535;
this.groupIndex = 0;
};
i.prototype.Copy = function() {
var t = new i();
t.categoryBits = this.categoryBits;
t.maskBits = this.maskBits;
t.groupIndex = this.groupIndex;
return t;
};
b2.FixtureDef = function() {
this.filter = new i();
this.shape = null;
this.userData = null;
this.friction = .2;
this.restitution = 0;
this.density = 0;
this.isSensor = !1;
};
b2.BodyDef = function() {
this.position = new t(0, 0);
this.linearVelocity = new t(0, 0);
this.userData = null;
this.angle = 0;
this.angularVelocity = 0;
this.linearDamping = 0;
this.angularDamping = 0;
this.allowSleep = !0;
this.awake = !0;
this.fixedRotation = !1;
this.bullet = !1;
this.type = b2.Body.b2_staticBody;
this.active = !0;
this.inertiaScale = 1;
this.gravityScale = 1;
};
b2.JointDef = function() {
this.type = b2.Joint.e_unknownJoint;
this.userData = null;
this.bodyA = null;
this.bodyB = null;
this.collideConnected = !1;
};
b2.DistanceJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_distanceJoint;
this.localAnchorA = new t();
this.localAnchorB = new t();
this.length = 1;
this.frequencyHz = 0;
this.dampingRatio = 0;
};
b2.FrictionJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_frictionJoint;
this.localAnchorA = new t();
this.localAnchorB = new t();
this.maxForce = 0;
this.maxTorque = 0;
};
b2.GearJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_gearJoint;
this.joint1 = null;
this.joint2 = null;
this.ratio = 1;
};
b2.MotorJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_motorJoint;
this.linearOffset = new t();
this.angularOffset = 0;
this.maxForce = 1;
this.maxTorque = 1;
this.correctionFactor = .3;
};
b2.MouseJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_mouseJoint;
this.target = new t();
this.maxForce = 0;
this.frequencyHz = 5;
this.dampingRatio = .7;
};
b2.PrismaticJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_prismaticJoint;
this.localAnchorA = new t();
this.localAnchorB = new t();
this.localAxisA = new t(1, 0);
this.referenceAngle = 0;
this.enableLimit = !1;
this.lowerTranslation = 0;
this.upperTranslation = 0;
this.enableMotor = !1;
this.maxMotorForce = 0;
this.motorSpeed = 0;
};
b2.PulleyJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_pulleyJoint;
this.groundAnchorA = new t(-1, 1);
this.groundAnchorB = new t(1, 1);
this.localAnchorA = new t(-1, 0);
this.localAnchorB = new t(1, 0);
this.lengthA = 0;
this.lengthB = 0;
this.ratio = 1;
this.collideConnected = !0;
};
b2.RevoluteJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_revoluteJoint;
this.localAnchorA = new t(0, 0);
this.localAnchorB = new t(0, 0);
this.referenceAngle = 0;
this.lowerAngle = 0;
this.upperAngle = 0;
this.maxMotorTorque = 0;
this.motorSpeed = 0;
this.enableLimit = !1;
this.enableMotor = !1;
};
b2.RopeJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_ropeJoint;
this.localAnchorA = new t(-1, 0);
this.localAnchorB = new t(1, 0);
this.maxLength = 0;
};
b2.WeldJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_weldJoint;
this.localAnchorA = new t(0, 0);
this.localAnchorB = new t(0, 0);
this.referenceAngle = 0;
this.frequencyHz = 0;
this.dampingRatio = 0;
};
b2.WheelJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_wheelJoint;
this.localAnchorA = new t();
this.localAnchorB = new t();
this.localAxisA = new t(1, 0);
this.enableMotor = !1;
this.maxMotorTorque = 0;
this.motorSpeed = 0;
this.frequencyHz = 2;
this.dampingRatio = .7;
};
b2.WorldManifold = function() {
this.normal = new b2.Vec2();
this.points = [];
this.separations = [];
};
var n = b2.Shape.prototype;
cc.defineGetterSetter(n, "m_radius", n.GetRadius, n.SetRadius);
n = b2.CircleShape.prototype;
cc.defineGetterSetter(n, "m_p", n.GetPosition, n.SetPosition);
b2.Body.b2_staticBody = 0;
b2.Body.b2_kinematicBody = 1;
b2.Body.b2_dynamicBody = 2;
b2.Draw.e_shapeBit = 1;
b2.Draw.e_jointBit = 2;
b2.Draw.e_aabbBit = 4;
b2.Draw.e_pairBit = 8;
b2.Draw.e_centerOfMassBit = 16;
b2.Joint.e_unknownJoint = 0;
b2.Joint.e_revoluteJoint = 1;
b2.Joint.e_prismaticJoint = 2;
b2.Joint.e_distanceJoint = 3;
b2.Joint.e_pulleyJoint = 4;
b2.Joint.e_mouseJoint = 5;
b2.Joint.e_gearJoint = 6;
b2.Joint.e_wheelJoint = 7;
b2.Joint.e_weldJoint = 8;
b2.Joint.e_frictionJoint = 9;
b2.Joint.e_ropeJoint = 10;
b2.Joint.e_motorJoint = 11;
b2.Joint.e_inactiveLimit = 0;
b2.Joint.e_atLowerLimit = 1;
b2.Joint.e_atUpperLimit = 2;
b2.Joint.e_equalLimits = 3;
b2.maxPolygonVertices = 8;
b2.maxManifoldPoints = 2;
})();
}), {} ],
191: [ (function(i, n, o) {
"use strict";
var r = i("../cocos2d/core/load-pipeline/auto-release-utils"), s = i("../cocos2d/core/component-scheduler"), c = i("../cocos2d/core/node-activator"), a = i("../cocos2d/core/event/event-listeners");
cc.director._purgeDirector = cc.director.purgeDirector;
cc.js.mixin(cc.director, {
sharedInit: function() {
this._compScheduler = new s();
this._nodeActivator = new c();
var t = this.getScheduler();
if (cc.AnimationManager) {
this._animationManager = new cc.AnimationManager();
t.scheduleUpdate(this._animationManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
} else this._animationManager = null;
if (cc.CollisionManager) {
this._collisionManager = new cc.CollisionManager();
t.scheduleUpdate(this._collisionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
} else this._collisionManager = null;
if (cc.PhysicsManager) {
this._physicsManager = new cc.PhysicsManager();
this.getScheduler().scheduleUpdate(this._physicsManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
} else this._physicsManager = null;
cc._widgetManager.init(this);
cc.loader.init(this);
},
purgeDirector: function() {
this._compScheduler.unscheduleAll();
this._nodeActivator.reset();
this._purgeDirector();
},
reset: function() {
this.purgeDirector();
cc.eventManager && cc.eventManager.setEnabled(!0);
this._animationManager && this.getScheduler().scheduleUpdate(this._animationManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this._collisionManager && this.getScheduler().scheduleUpdate(this._collisionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this._physicsManager && this.getScheduler().scheduleUpdate(this._physicsManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this.startAnimation();
},
getActionManager: function() {
return this._actionManager;
},
setActionManager: function(t) {
if (this._actionManager !== t) {
this._actionManager && this._scheduler.unscheduleUpdate(this._actionManager);
this._actionManager = t;
this._scheduler.scheduleUpdate(this._actionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
}
},
getAnimationManager: function() {
return this._animationManager;
},
getCollisionManager: function() {
return this._collisionManager;
},
getPhysicsManager: function() {
return this._physicsManager;
},
getScene: function() {
return this._scene;
},
runSceneImmediate: function(t, e, i) {
var n = window.console;
if (t instanceof cc.Scene) {
n.time("I");
t._load();
n.timeEnd("I");
}
for (var o = cc.game, s = Object.keys(o._persistRootNodes).map((function(t) {
return o._persistRootNodes[t];
})), c = 0; c < s.length; c++) {
var a = s[c];
o._ignoreRemovePersistNode = a;
a.parent = null;
o._ignoreRemovePersistNode = null;
}
var l = this._scene;
n.time("AR");
var h = l && l.autoReleaseAssets && l.dependAssets;
r.autoRelease(h, t.dependAssets, s);
n.timeEnd("AR");
n.time("D");
cc.isValid(l) && l.destroy();
this._scene = null;
cc.Object._deferredDestroy();
n.timeEnd("D");
e && e();
this.emit(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, t);
var u = t;
if (t instanceof cc.Scene) {
this._scene = t;
u = t._sgNode;
n.time("AP");
for (var d = 0; d < s.length; d++) {
var f = s[d], _ = t.getChildByUuid(f.uuid);
if (_) {
var p = _.getSiblingIndex();
_._destroyImmediate();
t.insertChild(f, p);
} else f.parent = t;
}
n.timeEnd("AP");
n.time("A");
t._activate();
n.timeEnd("A");
}
this.getRunningScene() ? this.replaceScene(u) : this.runWithScene(u);
i && i(null, t);
this.emit(cc.Director.EVENT_AFTER_SCENE_LAUNCH, t);
},
runScene: function(t, e, i) {
cc.assertID(t, 1205);
t instanceof cc.Scene && t._load();
this.once(cc.Director.EVENT_AFTER_UPDATE, (function() {
this.runSceneImmediate(t, e, i);
}));
},
_getSceneUuid: function(i) {
var n = cc.game._sceneInfos;
if ("string" === ("object" === (e = typeof i) ? t(i) : e)) {
i.endsWith(".fire") || (i += ".fire");
"/" === i[0] || i.startsWith("db://assets/") || (i = "/" + i);
for (var o = 0; o < n.length; o++) {
var r = n[o];
if (r.url.endsWith(i)) return r;
}
} else if ("number" === ("object" === (e = typeof i) ? t(i) : e)) {
if (0 <= i && i < n.length) return n[i];
cc.errorID(1211, i);
} else cc.errorID(1212, i);
return null;
},
setRuntimeLaunchScene: function(t) {
var e = this._getSceneUuid(t);
this._launchSceneUuid = e.uuid;
},
loadScene: function(t, e, i) {
if (this._loadingScene) {
cc.errorID(1213, t, this._loadingScene);
return !1;
}
var n = this._getSceneUuid(t);
if (n) {
var o = n.uuid;
this.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, t);
this._loadingScene = t;
if (cc.runtime && o !== this._launchSceneUuid) {
var r = this, s = cc.path.basename(n.url) + "_" + n.uuid;
console.log("==> start preload: " + s);
var c = !1;
cc.LoaderLayer.preload([ s ], (function() {
console.log("==> end preload: " + s);
c ? r._loadSceneByUuid(o, e, i) : setTimeout((function() {
r._loadSceneByUuid(o, e, i);
}), 0);
}));
c = !0;
} else this._loadSceneByUuid(o, e, i);
return !0;
}
cc.errorID(1214, t);
return !1;
},
preloadScene: function(t, e) {
var i = this._getSceneUuid(t);
if (i) {
this.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, t);
cc.loader.load({
uuid: i.uuid,
type: "uuid"
}, (function(i, n) {
i && cc.errorID(1215, t, i.message);
e && e(i, n);
}));
} else {
var n = 'Can not preload the scene "' + t + '" because it is not in the build settings.';
e(new Error(n));
cc.error("preloadScene: " + n);
}
},
_loadSceneByUuid: function(t, e, i, n) {
0;
console.time("LoadScene " + t);
cc.AssetLibrary.loadAsset(t, (function(n, o) {
console.timeEnd("LoadScene " + t);
var r = cc.director;
r._loadingScene = "";
if (n) {
n = "Failed to load scene: " + n;
cc.error(n);
} else {
if (o instanceof cc.SceneAsset) {
var s = o.scene;
s._id = o._uuid;
s._name = o._name;
r.runSceneImmediate(s, i, e);
return;
}
n = "The asset " + t + " is not a scene";
cc.error(n);
}
e && e(n);
}));
},
__fastOn: function(t, e, i) {
var n = this._bubblingListeners;
n || (n = this._bubblingListeners = new a());
n.add(t, e, i);
this._addEventFlag(t, n, !1);
},
__fastOff: function(t, e, i) {
var n = this._bubblingListeners;
if (n) {
n.remove(t, e, i);
this._purgeEventFlag(t, n, !1);
}
}
});
cc.defineGetterSetter(cc.director, "actionManager", cc.director.getActionManager, cc.director.setActionManager);
cc.EventTarget.call(cc.director);
cc.js.addon(cc.director, cc.EventTarget.prototype);
cc.Director.EVENT_PROJECTION_CHANGED = "director_projection_changed";
cc.Director.EVENT_AFTER_DRAW = "director_after_draw";
cc.Director.EVENT_BEFORE_VISIT = "director_before_visit";
cc.Director.EVENT_AFTER_VISIT = "director_after_visit";
cc.Director.EVENT_BEFORE_UPDATE = "director_before_update";
cc.Director.EVENT_AFTER_UPDATE = "director_after_update";
cc.Director.EVENT_BEFORE_SCENE_LOADING = "director_before_scene_loading";
cc.Director.EVENT_BEFORE_SCENE_LAUNCH = "director_before_scene_launch";
cc.Director.EVENT_AFTER_SCENE_LAUNCH = "director_after_scene_launch";
cc.Director._EVENT_NEXT_TICK = "_director_next_tick";
cc.Director._beforeUpdateListener = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: cc.Director.EVENT_BEFORE_UPDATE,
callback: function() {
cc.director.emit(cc.Director._EVENT_NEXT_TICK);
cc.director.emit(cc.Director.EVENT_BEFORE_UPDATE);
cc.director._compScheduler.startPhase();
var t = cc.director.getDeltaTime();
cc.director._compScheduler.updatePhase(t);
}
});
cc.Director._afterUpdateListener = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: cc.Director.EVENT_AFTER_UPDATE,
callback: function() {
var t = cc.director.getDeltaTime();
cc.director._compScheduler.lateUpdatePhase(t);
cc.director.emit(cc.Director.EVENT_AFTER_UPDATE);
cc.Object._deferredDestroy();
cc.director.emit(cc.Director.EVENT_BEFORE_VISIT, this);
}
});
cc.Director._afterVisitListener = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: cc.Director.EVENT_AFTER_VISIT,
callback: function() {
cc.director.emit(cc.Director.EVENT_AFTER_VISIT, this);
}
});
cc.Director._afterDrawListener = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: cc.Director.EVENT_AFTER_DRAW,
callback: function() {
cc.director.emit(cc.Director.EVENT_AFTER_DRAW, this);
}
});
cc.eventManager.addEventListenerWithFixedPriority(cc.Director._beforeUpdateListener, 1);
cc.eventManager.addEventListenerWithFixedPriority(cc.Director._afterUpdateListener, 1);
cc.eventManager.addEventListenerWithFixedPriority(cc.Director._afterVisitListener, 1);
cc.eventManager.addEventListenerWithFixedPriority(cc.Director._afterDrawListener, 1);
}), {
"../cocos2d/core/component-scheduler": 41,
"../cocos2d/core/event/event-listeners": 78,
"../cocos2d/core/load-pipeline/auto-release-utils": 92,
"../cocos2d/core/node-activator": 105
} ],
192: [ (function(t, e, i) {
"use strict";
t("../extensions/dragonbones/DragonBonesAsset.js").prototype.init = function(t) {
0;
if (this._dragonBonesData) {
t.getDragonBonesData(this._dragonBonesData.name) || t.addDragonBonesData(this._dragonBonesData);
} else {
var e = JSON.parse(this.dragonBonesJson), i = t.getDragonBonesData(e.name);
this._dragonBonesData = i || t.parseDragonBonesData(this._dragonBonesJson);
}
};
}), {
"../extensions/dragonbones/DragonBonesAsset.js": 181
} ],
193: [ (function(t, e, i) {
var n = dragonBones.CCArmatureDisplay.prototype;
cc.js.mixin(n, cc.EventTarget.prototype);
n.addEvent = function(t, e, i) {
if (!this.hasEventCallback()) {
var n = this;
this.setEventCallback((function(t) {
n.emit(t.type, t);
}));
}
this.on(t, e, i);
};
var o = [ dragonBones.EventObject.START, dragonBones.EventObject.LOOP_COMPLETE, dragonBones.EventObject.COMPLETE, dragonBones.EventObject.FADE_IN, dragonBones.EventObject.FADE_IN_COMPLETE, dragonBones.EventObject.FADE_OUT, dragonBones.EventObject.FADE_OUT_COMPLETE, dragonBones.EventObject.FRAME_EVENT, dragonBones.EventObject.SOUND_EVENT ];
n.removeEvent = function(t, e, i) {
this.off(t, e, i);
for (var n = !0, r = 0, s = o.length; r < s; r++) {
var c = o[r];
if (this.hasEventListener(c)) {
n = !1;
break;
}
}
n && this.clearEventCallback();
};
var r = dragonBones.Armature.prototype;
r.addEventListener = function(t, e, i) {
this.display.addEvent(t, e, i);
};
r.removeEventListener = function(t, e, i) {
this.display.removeEvent(t, e, i);
};
}), {} ],
194: [ (function(t, e, i) {
"use strict";
var n = cc.EditBox.prototype;
n._setMaxLength = n.setMaxLength;
n.setMaxLength = function(t) {
t < 0 && (t = 65535);
this._setMaxLength(t);
};
cc.defineGetterSetter(n, "font", null, n.setFont);
cc.defineGetterSetter(n, "fontName", null, n.setFontName);
cc.defineGetterSetter(n, "fontSize", null, n.setFontSize);
cc.defineGetterSetter(n, "fontColor", null, n.setFontColor);
cc.defineGetterSetter(n, "string", n.getString, n.setString);
cc.defineGetterSetter(n, "maxLength", n.getMaxLength, n.setMaxLength);
cc.defineGetterSetter(n, "placeholder", n.getPlaceHolder, n.setPlaceHolder);
cc.defineGetterSetter(n, "placeholderFont", null, n.setPlaceholderFont);
cc.defineGetterSetter(n, "placeholderFontName", null, n.setPlaceholderFontName);
cc.defineGetterSetter(n, "placeholderFontSize", null, n.setPlaceholderFontSize);
cc.defineGetterSetter(n, "placeholderFontColor", null, n.setPlaceholderFontColor);
cc.defineGetterSetter(n, "inputFlag", null, n.setInputFlag);
cc.defineGetterSetter(n, "delegate", null, n.setDelegate);
cc.defineGetterSetter(n, "inputMode", null, n.setInputMode);
cc.defineGetterSetter(n, "returnType", null, n.setReturnType);
n.setLineHeight = function() {};
n.setTabIndex = function() {};
n.getTabIndex = function() {
return -1;
};
n.setFocus = function() {};
n.isFocused = function() {
return !1;
};
n.stayOnTop = function() {};
cc.EditBox.InputMode = cc.Enum({
ANY: 0,
EMAIL_ADDR: 1,
NUMERIC: 2,
PHONE_NUMBER: 3,
URL: 4,
DECIMAL: 5,
SINGLE_LINE: 6
});
cc.EditBox.InputFlag = cc.Enum({
PASSWORD: 0,
SENSITIVE: 1,
INITIAL_CAPS_WORD: 2,
INITIAL_CAPS_SENTENCE: 3,
INITIAL_CAPS_ALL_CHARACTERS: 4,
DEFAULT: 5
});
cc.EditBox.KeyboardReturnType = cc.Enum({
DEFAULT: 0,
DONE: 1,
SEND: 2,
SEARCH: 3,
GO: 4
});
}), {} ],
195: [ (function(t, e, i) {
"use strict";
cc.TextAlignment = cc.Enum({
LEFT: 0,
CENTER: 1,
RIGHT: 2
});
cc.VerticalTextAlignment = cc.Enum({
TOP: 0,
CENTER: 1,
BOTTOM: 2
});
}), {} ],
196: [ (function(i, n, o) {
"use strict";
cc.sys.now = function() {
return Date.now();
};
var r = /[^\.\/]+\/\.\.\//;
cc.js.mixin(cc.path, {
_normalize: function(t) {
var e = t = String(t);
do {
e = t;
t = t.replace(r, "");
} while (e.length !== t.length);
return t;
},
sep: cc.sys.os === cc.sys.OS_WINDOWS ? "\\" : "/",
stripSep: function(t) {
return t.replace(/[\/\\]$/, "");
}
});
var s = cc.Node.prototype;
cc.defineGetterSetter(s, "_parent", s.getParent, s.setParent);
cc.view.isViewReady = cc.view.isOpenGLReady;
cc.view.setOrientation = function() {};
var c = 0, a = {}, l = function(t) {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this._intervalId = c++;
this._code = t;
};
l.prototype.fun = function() {
if (this._code) {
var i = this._code;
"string" === ("object" === (e = typeof i) ? t(i) : e) ? Function(i)() : "function" === ("object" === (e = typeof i) ? t(i) : e) && i.apply(null, this._args);
}
};
window.setTimeout = function(t, e) {
var i = new l(t);
arguments.length > 2 && (i._args = Array.prototype.slice.call(arguments, 2));
var n = i.fun;
i.fun = function() {
n.apply(this, arguments);
clearTimeout(i._intervalId);
};
cc.director.getScheduler().schedule(i.fun, i, e / 1e3, 0, 0, !1);
a[i._intervalId] = i;
return i._intervalId;
};
window.setInterval = function(t, e) {
var i = new l(t);
arguments.length > 2 && (i._args = Array.prototype.slice.call(arguments, 2));
cc.director.getScheduler().schedule(i.fun, i, e / 1e3, cc.macro.REPEAT_FOREVER, 0, !1);
a[i._intervalId] = i;
return i._intervalId;
};
window.clearInterval = function(t) {
var e = a[t];
if (e) {
cc.director.getScheduler().unschedule(e.fun, e);
delete a[t];
}
};
window.clearTimeout = clearInterval;
if (window.SocketIO) {
window.io = window.SocketIO;
SocketIO.prototype._jsbEmit = SocketIO.prototype.emit;
SocketIO.prototype.emit = function(i, n) {
"object" === ("object" === (e = typeof n) ? t(n) : e) && (n = JSON.stringify(n));
this._jsbEmit(i, n);
};
}
cc.Node.prototype.setIgnoreAnchorPointForPosition = cc.Node.prototype.ignoreAnchorPointForPosition;
window._ccsg = {
Node: cc.Node,
Scene: cc.Scene,
Sprite: cc.Sprite,
ParticleSystem: cc.ParticleSystem,
Label: cc.Label,
EditBox: cc.EditBox,
VideoPlayer: cc.VideoPlayer,
WebView: cc.WebView,
TMXTiledMap: cc.TMXTiledMap,
TMXObjectGroup: cc.TMXObjectGroup,
TMXObject: cc.TMXObject,
TMXObjectImage: cc.TMXObjetImage,
TMXObjectShape: cc.TMXObjectShape,
TMXLayer: cc.TMXLayer,
MotionStreak: cc.MotionStreak,
CameraNode: cc.CameraNode
};
cc.formatStr = cc.js.formatStr;
cc.Image && cc.Image.setPNGPremultipliedAlphaEnabled && cc.Image.setPNGPremultipliedAlphaEnabled(!1);
window.__cleanup = function() {
cc.director.getScene().destroy();
cc.Object._deferredDestroy();
cc.js._registeredClassIds = {};
cc.js._registeredClassNames = {};
cc.loader.releaseAll();
cc.textureCache.removeAllTextures();
};
}), {} ],
197: [ (function(i, n, o) {
"use strict";
var r = i("../cocos2d/core/platform/js").Pool, s = i("../cocos2d/core/event/event");
i("../cocos2d/core/event-manager/CCEvent");
s.EventMouse.pool = new r(5);
s.EventMouse.pool.get = function(t, e) {
var i = this._get() || new s.EventMouse(e, !0);
i._button = t.getButton();
var n = t.getLocation();
i._x = n.x;
i._y = n.y;
var o = t._listener;
if (o) {
i._prevX = o._previousX;
i._prevY = o._previousY;
}
i._scrollX = t.getScrollX();
i._scrollY = t.getScrollY();
i._target = null;
i._currentTarget = null;
i.eventPhase = cc.Event.NONE;
i._propagationStopped = !1;
i._propagationImmediateStopped = !1;
return i;
};
s.EventTouch.pool = new r(5);
s.EventTouch.pool.get = function(t) {
var e = t.getTouches(), i = this._get() || new s.EventTouch(e, !0);
i.eventPhase = cc.Event.NONE;
i._eventCode = t.getEventCode();
i._touches = e;
i._target = null;
i._currentTarget = null;
i._propagationStopped = !1;
i._propagationImmediateStopped = !1;
return i;
};
cc.eventManager.addListener = function(i, n) {
i instanceof cc.EventListener || (i = cc.EventListener.create(i));
if ("number" === ("object" === (e = typeof n) ? t(n) : e)) {
if (0 === n) {
cc.logID(3500);
return;
}
cc.eventManager.addEventListenerWithFixedPriority(i, n);
} else {
var o = n;
if (n instanceof cc._BaseNode) o = n._sgNode; else if (!(o instanceof _ccsg.Node)) {
cc.warnID(3506);
return;
}
cc.eventManager.addEventListenerWithSceneGraphPriority(i, o);
}
return i;
};
cc.eventManager._removeListeners = cc.eventManager.removeListeners;
cc.eventManager.removeListeners = function(t, e) {
t instanceof cc._BaseNode && (t = t._sgNode);
t instanceof _ccsg.Node || cc.js.isNumber(t) ? this._removeListeners(t, e || !1) : cc.warnID(3506);
};
cc.eventManager._pauseTarget = cc.eventManager.pauseTarget;
cc.eventManager.pauseTarget = function(t, e) {
var i = t;
t._eventPaused = !0;
if (t instanceof cc._BaseNode) i = t._sgNode; else if (!(i instanceof _ccsg.Node)) {
cc.warnID(3506);
return;
}
if (i !== t && !i.isRunning()) {
var n = i.onEnter;
i.onEnter = function() {
n.call(this);
t._eventPaused && cc.eventManager._pauseTarget(this, e || !1);
this.onEnter = n;
};
}
this._pauseTarget(i, e || !1);
};
cc.eventManager._resumeTarget = cc.eventManager.resumeTarget;
cc.eventManager.resumeTarget = function(t, e) {
t._eventPaused = !1;
if (t instanceof cc._BaseNode) t = t._sgNode; else if (!(t instanceof _ccsg.Node)) {
cc.warnID(3506);
return;
}
this._resumeTarget(t, e || !1);
};
cc._EventListenerKeyboard = cc.EventListenerKeyboard;
cc._EventListenerKeyboard.LISTENER_ID = "__cc_keyboard";
cc._EventListenerAcceleration = cc.EventListenerAcceleration;
cc._EventListenerAcceleration.LISTENER_ID = "__cc_acceleration";
cc._EventListenerTouchAllAtOnce = cc.EventListenerTouchAllAtOnce;
cc._EventListenerTouchAllAtOnce.LISTENER_ID = "__cc_touch_all_at_once";
cc._EventListenerTouchOneByOne = cc.EventListenerTouchOneByOne;
cc._EventListenerTouchOneByOne.LISTENER_ID = "__cc_touch_one_by_one";
cc._EventListenerMouse = cc.EventListenerMouse;
cc._EventListenerMouse.LISTENER_ID = "__cc_mouse";
}), {
"../cocos2d/core/event-manager/CCEvent": 76,
"../cocos2d/core/event/event": 80,
"../cocos2d/core/platform/js": 143
} ],
198: [ (function(i, n, o) {
"use strict";
cc.game = {
EVENT_HIDE: "game_on_hide",
EVENT_SHOW: "game_on_show",
EVENT_RESIZE: "game_on_resize",
_onShowListener: null,
_onHideListener: null,
_paused: !1,
_prepareCalled: !1,
_prepared: !1,
config: null,
onStart: null,
_sceneInfos: [],
_persistRootNodes: {},
_ignoreRemovePersistNode: null,
RENDER_TYPE_CANVAS: 0,
RENDER_TYPE_WEBGL: 1,
RENDER_TYPE_OPENGL: 2,
EVENT_GAME_INITED: "game_inited",
CONFIG_KEY: {
width: "width",
height: "height",
modules: "modules",
debugMode: "debugMode",
showFPS: "showFPS",
frameRate: "frameRate",
id: "id",
renderMode: "renderMode",
registerSystemEvent: "registerSystemEvent",
jsList: "jsList",
scenes: "scenes"
},
setFrameRate: function(t) {
this.config[this.CONFIG_KEY.frameRate] = t;
cc.director.setAnimationInterval(1 / t);
},
step: function() {
cc.director.mainLoop();
},
pause: function() {
this._paused = !0;
cc.director.pause();
},
resume: function() {
this._paused = !1;
cc.director.resume();
},
isPaused: function() {
return this._paused;
},
restart: function() {
__restartVM();
},
end: function() {
close();
},
prepare: function(t) {
var e = this, i = e.config, n = e.CONFIG_KEY;
this._loadConfig();
if (this._prepared) t && t(); else if (!this._prepareCalled) {
this._prepareCalled = !0;
cc._renderType = cc.game.RENDER_TYPE_OPENGL;
cc.director.sharedInit();
var o = i[n.jsList];
if (o) cc.loader.load(o, (function(i) {
if (i) throw new Error(JSON.stringify(i));
e._prepared = !0;
t && t();
e.emit(e.EVENT_GAME_INITED);
})); else {
t && t();
e.emit(e.EVENT_GAME_INITED);
}
}
},
run: function(i, n) {
if ("function" === ("object" === (e = typeof i) ? t(i) : e)) cc.game.onStart = i; else {
i && (cc.game.config = i);
"function" === ("object" === (e = typeof n) ? t(n) : e) && (cc.game.onStart = n);
}
cc.director.startAnimation();
this.prepare(cc.game.onStart && cc.game.onStart.bind(cc.game));
},
addPersistRootNode: function(t) {
if (cc.Node.isNode(t) && t.uuid) {
var e = t.uuid;
if (!this._persistRootNodes[e]) {
var i = cc.director._scene;
if (cc.isValid(i)) {
if (t.parent) {
if (!(t.parent instanceof cc.Scene)) {
cc.warnID(3801);
return;
}
if (t.parent !== i) {
cc.warnID(3802);
return;
}
} else t.parent = i;
this._persistRootNodes[e] = t;
t._persistNode = !0;
}
}
} else cc.warnID(3803);
},
removePersistRootNode: function(t) {
if (t !== this._ignoreRemovePersistNode) {
var e = t._id || "";
if (t === this._persistRootNodes[e]) {
delete this._persistRootNodes[e];
t._persistNode = !1;
}
}
},
isPersistRootNode: function(t) {
return t._persistNode;
},
_loadConfig: function() {
if (this.config) this._initConfig(this.config); else try {
var t = jsb.fileUtils.getStringFromFile("project.json"), e = JSON.parse(t);
this._initConfig(e || {});
} catch (t) {
console.log("Failed to read or parse project.json");
this._initConfig({});
}
},
_initConfig: function(i) {
var n = this.CONFIG_KEY;
"number" !== ("object" === (e = typeof i[n.debugMode]) ? t(i[n.debugMode]) : e) && (i[n.debugMode] = 0);
"number" !== ("object" === (e = typeof i[n.frameRate]) ? t(i[n.frameRate]) : e) && (i[n.frameRate] = 60);
"number" !== ("object" === (e = typeof i[n.renderMode]) ? t(i[n.renderMode]) : e) && (i[n.renderMode] = 0);
i[n.showFPS] = !(n.showFPS in i) || !!i[n.showFPS];
this.groupList = i.groupList || [];
this.collisionMatrix = i.collisionMatrix || [];
this._sceneInfos = i[n.scenes] || [];
cc.director.setDisplayStats(i[n.showFPS]);
cc.director.setAnimationInterval(1 / i[n.frameRate]);
cc._initDebugSetting(i[n.debugMode]);
this.config = i;
}
};
cc.EventTarget.call(cc.game);
cc.js.addon(cc.game, cc.EventTarget.prototype);
cc.game._onHideListener = cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, (function() {
cc.game.emit(cc.game.EVENT_HIDE, cc.game);
}));
cc.game._onShowListener = cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, (function() {
cc.game.emit(cc.game.EVENT_SHOW, cc.game);
}));
}), {} ],
199: [ (function(i, n, o) {
"use strict";
var r = cc.Label;
!r.createWithTTF && r.prototype.createWithTTF && (r.createWithTTF = r.prototype.createWithTTF);
r.prototype.setHorizontalAlign = r.prototype.setHorizontalAlignment;
r.prototype.setVerticalAlign = r.prototype.setVerticalAlignment;
r.prototype.setBMFontSize || (r.prototype.setBMFontSize = function() {});
r.prototype.getBMFontSize || (r.prototype.getBMFontSize = function() {});
r.prototype.setOverflow || (r.prototype.setOverflow = function() {});
r.prototype.getOverflow || (r.prototype.getOverflow = function() {});
r.prototype._setOverflow = r.prototype.setOverflow;
r.prototype.setOverflow = function(t) {
this._overFlow = t;
this._setOverflow(this._overFlow);
};
r.prototype.getOverflow = function() {
return this._overFlow;
};
r.prototype._enableBold = r.prototype.enableBold;
r.prototype.enableBold = function(t) {
t ? this._enableBold() : this.disableEffect(5);
};
r.prototype._enableItalics = r.prototype.enableItalics;
r.prototype.enableItalics = function(t) {
t ? this._enableItalics() : this.disableEffect(4);
};
r.prototype._enableUnderline = r.prototype.enableUnderline;
r.prototype.enableUnderline = function(t) {
t ? this._enableUnderline() : this.disableEffect(6);
};
r.prototype.setFontSize = function(t) {
this._fontSize = t;
if (this._labelType === _ccsg.Label.Type.SystemFont) this.setSystemFontSize(t); else if (this._labelType === _ccsg.Label.Type.BMFont) this.setBMFontSize(t); else if (this._labelType === _ccsg.Label.Type.TTF) {
var e = this.getTTFConfig();
e.fontSize = t;
this.setTTFConfig(e);
}
};
r.prototype.getFontSize = function() {
return this._fontSize;
};
r.prototype.enableWrapText = r.prototype.enableWrap || function() {};
r.prototype.isWrapTextEnabled = r.prototype.isWrapEnabled || function() {};
r.prototype._setLineHeight = r.prototype.setLineHeight;
r.prototype.setLineHeight = function(t) {
this._labelType !== _ccsg.Label.Type.SystemFont ? this._setLineHeight(t) : 40 !== t && cc.warnID(4013);
};
r.prototype._setColor = r.prototype.setColor;
r.prototype.setColor = function(t) {
this._labelType === _ccsg.Label.Type.BMFont ? this._setColor(t) : this.setTextColor(t);
};
r.prototype.setSpacingX = r.prototype.setAdditionalKerning;
r.prototype._setTTFConfig = r.prototype.setTTFConfig;
r.prototype.setTTFConfig = function(t) {
this._setTTFConfig(t);
this._ttfConfig = t;
};
r.prototype.getTTFConfig = function() {
return this._ttfConfig;
};
r.prototype._setContentSize = r.prototype.setContentSize;
r.prototype.setContentSize = function(i, n) {
var o = "number" === ("object" === (e = typeof i.width) ? t(i.width) : e) ? i.width : i, r = "number" === ("object" === (e = typeof i.height) ? t(i.height) : e) ? i.height : n;
if (this.getOverflow() === cc.Label.Overflow.NONE) {
o = 0;
r = 0;
} else this._setContentSize(o, r);
this.setDimensions(o, r);
};
r.prototype.setFontAsset = function(t) {
this._fontAsset = t;
var e = t instanceof cc.Font;
if (e) {
var i = e ? t.nativeUrl : "";
if (".ttf" === cc.path.extname(i)) {
var n = this.isOutlined() ? this.getOutlineWidth() : 0;
if (this._ttfConfig) {
this._ttfConfig.outlineSize = n;
this._ttfConfig.fontFilePath = i;
} else this._ttfConfig = {
fontFilePath: i,
fontSize: this._fontSize,
outlineSize: n,
glyphs: 0,
customGlyphs: "",
distanceFieldEnable: !1
};
this._labelType = _ccsg.Label.Type.TTF;
this.setTTFConfig(this._ttfConfig);
} else if (t.spriteFrame) {
this._labelType = _ccsg.Label.Type.BMFont;
this.setBMFontFilePath(JSON.stringify(t._fntConfig), t.spriteFrame);
this.setFontSize(this.getFontSize());
}
this.getContentSize();
} else this.setFontFamily("Arial");
};
r.prototype.setFontFamily = function(t) {
t = t || "";
this._labelType = _ccsg.Label.Type.SystemFont;
this.setSystemFontName(t);
this._isSystemFontUsed = !0;
this.getContentSize();
};
r.prototype.setOutlined = function(t) {
this._outlined = !!t;
this._outlined ? this.enableOutline(this.getOutlineColor(), this.getOutlineWidth()) : this.disableEffect(1);
};
r.prototype.setOutlineWidth = function(t) {
this._outlineWidth = t;
if (this._outlined) {
var e = this.getOutlineWidth();
if (this._labelType === _ccsg.Label.Type.TTF) {
var i = this.getTTFConfig();
if (i.outlineSize !== e) {
i.outlineSize = e;
this.setTTFConfig(i);
}
} else this.enableOutline(this.getOutlineColor(), e);
}
};
r.prototype.setOutlineColor = function(t) {
this._outlineColor = cc.color(t);
this._outlined && this.enableOutline(this.getOutlineColor(), this.getOutlineWidth());
};
r.prototype.setMargin = function() {};
r.prototype.isOutlined = function() {
return this._outlined;
};
r.prototype.getOutlineWidth = function() {
return this._outlineWidth || 1;
};
r.prototype.getOutlineColor = function() {
return this._outlineColor || cc.color(255, 255, 255, 255);
};
cc.Label = function(t, e, i, n) {
e = e || "Arial";
var o, s = cc.path.extname(e), c = _ccsg.Label.Type.TTF;
this._fontSize = n;
if (".ttf" === s) {
var a = {
fontFilePath: e,
fontSize: this._fontSize,
outlineSize: 0,
glyphs: 0,
customGlyphs: "",
distanceFieldEnable: !1
};
(o = r.createWithTTF(a, t))._ttfConfig = a;
} else if (i) {
o = r.createWithBMFont(e, t, i);
c = _ccsg.Label.Type.BMFont;
} else {
o = r.createWithSystemFont(t || "", e, this._fontSize);
c = _ccsg.Label.Type.SystemFont;
o._isSystemFontUsed = !0;
}
o._labelType = c;
return o;
};
cc.Label.Type = cc.Enum({
TTF: 0,
BMFont: 1,
SystemFont: 2
});
cc.Label.Overflow = cc.Enum({
NONE: 0,
CLAMP: 1,
SHRINK: 2,
RESIZE_HEIGHT: 3
});
cc.Label.pool = new cc.js.Pool(0);
cc.Label.pool.get = function(t, e, i, n) {
this._fontAsset = e;
n = n || 40;
if (!(e instanceof cc.Font)) return new _ccsg.Label(t, null, null, n);
var o = cc.loader.md5Pipe ? cc.loader.md5Pipe.transformURL(e.nativeUrl, !0) : e.nativeUrl;
return new _ccsg.Label(t, o, i, n);
};
}), {} ],
200: [ (function(t, e, i) {
"use strict";
t("../cocos2d/core/load-pipeline");
function n(t, e) {
return null;
}
function o(e, i) {
t(e.url);
return null;
}
function r(t, e) {
if (t._owner instanceof cc.AudioClip) return t.url;
var i = new cc.AudioClip();
i._setRawAsset(t.rawUrl, !1);
i._nativeAsset = t.url;
return i;
}
cc.loader.addDownloadHandlers({
js: o,
jsc: o,
png: s,
jpg: s,
bmp: s,
jpeg: s,
gif: s,
ico: s,
tiff: s,
webp: s,
image: s,
mp3: r,
ogg: r,
wav: r,
mp4: r,
m4a: r,
font: n,
eot: n,
ttf: n,
woff: n,
svg: n,
ttc: n
});
function s(t, e) {
var i = t.url, n = jsb.urlRegExp.test(i);
if (t._owner instanceof cc.Texture2D) {
(n ? jsb.initRemoteImg : jsb.initTextureAsync)(t._owner, i, (function(t) {
t ? e && e(null) : e && e(new Error("Load image failed: " + i));
}));
} else {
var o = cc.textureCache.getTextureForKey(i);
if (o) return o;
n ? jsb.loadRemoteImg(i, (function(n, o) {
if (n) {
o.url = t.rawUrl;
o._setRawAsset(t.rawUrl, !1);
e && e(null, o);
} else e && e(new Error("Load image failed: " + i));
})) : cc.textureCache._addImageAsync(i, (function(n) {
if (n instanceof cc.Texture2D) {
n.url = t.rawUrl;
n._setRawAsset(t.rawUrl, !1);
e && e(null, n);
} else e && e(new Error("Load image failed: " + i));
}));
}
}
cc.loader.addLoadHandlers({
png: n,
jpg: n,
bmp: n,
jpeg: n,
gif: n,
ico: n,
tiff: n,
webp: n,
image: n,
default: n
});
}), {
"../cocos2d/core/load-pipeline": 94
} ],
201: [ (function(t, e, i) {
"use strict";
cc.ParticleSystem.Mode = cc.Enum({
GRAVITY: 0,
RADIUS: 1
});
cc.ParticleSystem.Type = cc.Enum({
FREE: 0,
RELATIVE: 1,
GROUPED: 2
});
var n = [ {
tangentialAccel: "setTangentialAccel",
tangentialAccelVar: "setTangentialAccelVar",
radialAccel: "setRadialAccel",
radialAccelVar: "setRadialAccelVar",
rotationIsDir: "setRotationIsDir",
gravity: "setGravity",
speed: "setSpeed",
speedVar: "setSpeedVar"
}, {
startRadius: "setStartRadius",
startRadiusVar: "setStartRadiusVar",
endRadius: "setEndRadius",
endRadiusVar: "setEndRadiusVar",
rotatePerS: "setRotatePerSecond",
rotatePerSVar: "setRotatePerSecondVar"
} ];
function o(t, e) {
return function(i) {
this.getEmitterMode() === e && t.call(this, i);
};
}
var r = cc.ParticleSystem.prototype;
r._initWithFile = r.initWithFile;
r.initWithFile = function(t) {
var e = cc.loader.md5Pipe;
e && (t = e.transformURL(t));
this._initWithFile(t);
};
for (var s = 0; s < n.length; s++) {
var c = n[s];
for (var a in c) {
var l = c[a], h = r[l];
r[l] = o(h, s);
var u = l.replace("set", "get");
cc.defineGetterSetter(r, a, r[u], r[l]);
}
}
}), {} ],
202: [ (function(t, e, i) {
"use strict";
var n = !1;
if (cc.Scale9SpriteV2) {
n = !0;
cc.Scale9Sprite = cc.Scale9SpriteV2;
}
cc.Scale9Sprite.state = {
NORMAL: 0,
GRAY: 1,
DISTORTION: 2
};
cc.Scale9Sprite.RenderingType = cc.Enum({
SIMPLE: 0,
SLICED: 1,
TILED: 2,
FILLED: 3
});
cc.Scale9Sprite.FillType = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1,
RADIAL: 2
});
var o = cc.Scale9Sprite.prototype;
if (n) {
var r = o.setContentSize;
o.setContentSize = function(t, e) {
void 0 !== e && (t = new cc.Size(t, e));
r.call(this, t);
};
var s = o.setAnchorPoint;
o.setAnchorPoint = function(t, e) {
void 0 !== e && (t = new cc.Vec2(t, e));
s.call(this, t);
};
} else {
o.setFillType = function() {};
o.setFillCenter = function() {};
o.setFillStart = function() {};
o.setFillRange = function() {};
o.enableTrimmedContentSize = function() {};
o._lazyInit = function() {
if (!this._onceInit) {
this._onceInit = !0;
this._insets = {
left: 0,
right: 0,
top: 0,
bottom: 0
};
this._trim = {
left: 0,
right: 0,
top: 0,
bottom: 0
};
this._contentSizeTrimmed = new cc.Size(0, 0);
this._anchorPointTrimmed = new cc.Vec2(0, 0);
this._sizeAfterTrimmed = new cc.Size(0, 0);
}
};
o._applyInsetsContentAnchor = function() {
var t = 1, e = 1;
if ((this._renderingType || this.getRenderingType && this.getRenderingType()) === cc.Scale9Sprite.RenderingType.SIMPLE) {
t = this._contentSizeTrimmed.width / this._sizeAfterTrimmed.width;
e = this._contentSizeTrimmed.height / this._sizeAfterTrimmed.height;
}
var i = new cc.Size(0, 0);
i.width = this._contentSizeTrimmed.width + (this._trim.left + this._trim.right) * t;
i.height = this._contentSizeTrimmed.height + (this._trim.top + this._trim.bottom) * e;
this._setContentSize(i);
var n = new cc.Vec2(0, 0);
n.x = this._contentSizeTrimmed.width * this._anchorPointTrimmed.x + this._trim.left * t;
n.y = this._contentSizeTrimmed.height * this._anchorPointTrimmed.y + this._trim.bottom * e;
n.x = n.x / i.width;
n.y = n.y / i.height;
this._setAnchorPoint(n);
var o = new cc.Rect(0, 0, 0, 0);
o.x = this._trim.left + this._insets.left;
o.y = this._trim.top + this._insets.top;
o.width = this._sizeAfterTrimmed.width - this._insets.left - this._insets.right;
o.height = this._sizeAfterTrimmed.height - this._insets.top - this._insets.bottom;
this.setCapInsets(o);
};
o._setBlendFunc = o.setBlendFunc;
o.setBlendFunc = function(t, e) {
void 0 !== e && (t = {
src: t,
dst: e
});
this._setBlendFunc && this._setBlendFunc(t);
};
o._getContentSize = o.getContentSize;
o.getContentSize = function() {
return new cc.Size(this._contentSizeTrimmed);
};
o._setContentSize = o.setContentSize;
o.setContentSize = function(t, e) {
this._lazyInit();
void 0 !== e && (t = new cc.Size(t, e));
this._contentSizeTrimmed = new cc.Size(t);
this._applyInsetsContentAnchor();
};
o._getAnchorPoint = o.getAnchorPoint;
o.getAnchorPoint = function() {
return new cc.Vec2(this._anchorPointTrimmed);
};
o._setAnchorPoint = o.setAnchorPoint;
o.setAnchorPoint = function(t, e) {
this._lazyInit();
void 0 !== e && (t = new cc.Vec2(t, e));
this._anchorPointTrimmed = new cc.Vec2(t);
this._applyInsetsContentAnchor();
};
o._getInsetLeft = o.getInsetLeft;
o._getInsetRight = o.getInsetRight;
o._getInsetBottom = o.getInsetBottom;
o._getInsetTop = o.getInsetTop;
o.getInsetLeft = function() {
return this._insets.left;
};
o.getInsetRight = function() {
return this._insets.right;
};
o.getInsetBottom = function() {
return this._insets.bottom;
};
o.getInsetTop = function() {
return this._insets.top;
};
o._setInsetLeft = o.setInsetLeft;
o.setInsetLeft = function(t) {
this._lazyInit();
this._insets.left = t;
this._applyInsetsContentAnchor();
};
o._setInsetRight = o.setInsetRight;
o.setInsetRight = function(t) {
this._lazyInit();
this._insets.right = t;
this._applyInsetsContentAnchor();
};
o._setInsetTop = o.setInsetTop;
o.setInsetTop = function(t) {
this._lazyInit();
this._insets.top = t;
this._applyInsetsContentAnchor();
};
o._setInsetBottom = o.setInsetBottom;
o.setInsetBottom = function(t) {
this._lazyInit();
this._insets.bottom = t;
this._applyInsetsContentAnchor();
};
o._setSpriteFrame = o.setSpriteFrame;
o.setSpriteFrame = function(t) {
this._lazyInit();
var e = t.getOriginalSize(), i = t.getRect(), n = t.getOffset(), o = (e.width + 2 * n.x - i.width) / 2, r = e.width - o - i.width, s = (e.height + 2 * n.y - i.height) / 2, c = e.height - s - i.height;
this._trim.left = o;
this._trim.right = r;
this._trim.top = c;
this._trim.bottom = s;
this._sizeAfterTrimmed = new cc.Size(i.width, i.height);
this._setSpriteFrame(t);
this._applyInsetsContentAnchor();
};
}
}), {} ],
203: [ (function(t, e, i) {
sp._SGSkeleton = sp.Skeleton;
sp._SGSkeletonAnimation = sp.SkeletonAnimation;
sp._SGSkeleton.prototype.setPremultipliedAlpha = sp._SGSkeleton.prototype.setOpacityModifyRGB;
sp._SGSkeleton.prototype.setOpacityModifyRGB = function() {};
}), {} ],
204: [ (function(i, n, o) {
"use strict";
i("../cocos2d/core/platform/CCClass");
i("../cocos2d/core/assets/CCAsset");
var r = i("../cocos2d/core/textures/CCTexture2D"), s = i("../cocos2d/core/sprites/CCSpriteFrame");
cc.js.unregisterClass(r, s);
var c = cc.TextureCache.prototype;
c._addImageAsync || (c._addImageAsync = c.addImageAsync);
c.addImageAsync = function(t, e, i) {
var n = null;
cc.loader.load(t, (function(t, o) {
t && (o = null);
e && e.call(i, o);
n = o;
}));
return n;
};
c._addImage || (c._addImage = c.addImage);
c.addImage = function(i, n, o) {
0;
var r = cc.loader.md5Pipe;
r && (i = r.transformURL(i));
return "function" === ("object" === (e = typeof n) ? t(n) : e) ? this.addImageAsync(i, n, o) : n ? this._addImage(i, n) : this._addImage(i);
};
cc.textureCache._textures = {};
cc.textureCache.cacheImage = function(t, e) {
e instanceof cc.Texture2D && (this._textures[t] = e);
};
cc.textureCache._getTextureForKey = cc.textureCache.getTextureForKey;
cc.textureCache.getTextureForKey = function(t) {
return this._getTextureForKey(t) || this._textures[t] || null;
};
cc.textureCache._removeTextureForKey = cc.textureCache.removeTextureForKey;
cc.textureCache.removeTextureForKey = function(t) {
0;
delete this._textures[t];
this._removeTextureForKey(t);
};
cc.Class._fastDefine("cc.Texture2D", cc.Texture2D, []);
cc.Texture2D.$super = cc.Asset;
[ "WrapMode", "PixelFormat", "Filter", "extnames", "preventDeferredLoadDependents", "preventPreloadNativeObject" ].forEach((function(t) {
cc.Texture2D[t] = r[t];
}));
(c = cc.Texture2D.prototype)._releaseTexture = c.releaseTexture;
cc.js.addon(c, r.prototype);
[ "_setRawAsset", "nativeUrl", "toString" ].forEach((function(t) {
Object.defineProperty(c, t, cc.js.getPropertyDescriptor(r.prototype, t));
}));
c._ctor = function() {
cc.Asset.call(this);
this.url = "";
};
c.loaded = !0;
c.update = function(t) {
var e = !1, i = !1;
if (t) {
if (void 0 !== t.minFilter) {
this._minFilter = t.minFilter;
e = !0;
}
if (void 0 !== t.magFilter) {
this._magFilter = t.magFilter;
e = !0;
}
if (void 0 !== t.wrapS) {
this._wrapS = t.wrapS;
e = !0;
}
if (void 0 !== t.wrapT) {
this._wrapT = t.wrapT;
e = !0;
}
void 0 !== t.mipmap && (i = this._hasMipmap = t.mipmap);
}
e && this.setTexParameters(t);
i && this.generateMipmap();
};
c.isLoaded = function() {
return !0;
};
cc.js.getset(c, "_nativeAsset", (function() {
return this;
}), (function(t) {}));
c.getPixelWidth = c.getPixelsWide;
c.getPixelHeight = c.getPixelsHigh;
c.description = c.getDescription;
cc.js.get(c, "pixelWidth", c.getPixelWidth);
cc.js.get(c, "pixelHeight", c.getPixelHeight);
cc.js.get(c, "_glID", c.getName);
cc.Class._fastDefine("cc.SpriteFrame", cc.SpriteFrame, []);
cc.SpriteFrame.$super = cc.Asset;
c = cc.SpriteFrame.prototype;
cc.js.mixin(c, cc.EventTarget.prototype);
c._ctor = function(t, e, i, n, o) {
this.insetTop = 0;
this.insetBottom = 0;
this.insetLeft = 0;
this.insetRight = 0;
this._name = "";
this._texture = null;
void 0 !== t && this.initWithTexture(t, e, i, n, o);
};
c._getTexture = c.getTexture;
c.getTexture = function() {
var t = this._getTexture();
this._texture = t;
return t;
};
c.__setTexture = c.setTexture;
c._setTexture = function(t) {
this.__setTexture(t);
this._texture = t;
};
c.textureLoaded = function() {
return null !== this.getTexture();
};
c.setTexture = function(i, n, o, r, s) {
n && this.setRect(n);
r && this.setOffset(r);
s && this.setOriginalSize(s);
this.setRotated(o || !1);
var c = i;
"string" === ("object" === (e = typeof c) ? t(c) : e) && c && (c = cc.textureCache.addImage(c));
c instanceof cc.Texture2D && this.getTexture() !== c && this._refreshTexture(c);
return !0;
};
c.initWithTexture = c.setTexture;
c.ensureLoadTexture = function() {
if (this._texture) {
if (!this._texture.isLoaded()) {
this._refreshTexture(this._texture);
this._texture.load();
}
} else if (this._textureFilename) {
var t = cc.textureCache.addImage(this._textureFilename);
this._refreshTexture(t);
}
};
c.clearTexture = function() {
this._setTexture(null);
};
c._refreshTexture = function(t) {
var e = t.width, i = t.height, n = this.getRect();
0 === n.width || 0 === n.height ? this.setRect(cc.rect(0, 0, e, i)) : this._checkRect(t);
var o = this.getOriginalSize();
0 !== o.width && 0 !== o.height || this.setOriginalSize(cc.size(e, i));
this._setTexture(t);
this.emit("load");
};
c._deserialize = function(t, e) {
var i = t.rect;
i && this.setRect(new cc.Rect(i[0], i[1], i[2], i[3]));
t.offset && this.setOffset(new cc.Vec2(t.offset[0], t.offset[1]));
t.originalSize && this.setOriginalSize(new cc.Size(t.originalSize[0], t.originalSize[1]));
this.setRotated(1 === t.rotated);
this._name = t.name;
var n = t.capInsets;
if (n) {
this.insetLeft = n[0];
this.insetTop = n[1];
this.insetRight = n[2];
this.insetBottom = n[3];
}
var o = t.texture;
o && e.result.push(this, "_textureSetter", o);
};
c._checkRect = function(t) {
var e = this.getRect(), i = e.x, n = e.y;
if (this.isRotated()) {
i += e.height;
n += e.width;
} else {
i += e.width;
n += e.height;
}
i > t.getPixelWidth() && cc.errorID(3300, t.url);
n > t.getPixelHeight() && cc.errorID(3400, t.url);
};
c._clone = c.clone;
c.clone = function() {
var t = this._clone();
t._name = this._name;
t.insetTop = this.insetTop;
t.insetBottom = this.insetBottom;
t.insetLeft = this.insetLeft;
t.insetRight = this.insetRight;
return t;
};
cc.js.getset(c, "texture", c.getTexture, c.setTexture);
cc.js.addon(c, s.prototype);
}), {
"../cocos2d/core/assets/CCAsset": 17,
"../cocos2d/core/platform/CCClass": 128,
"../cocos2d/core/sprites/CCSpriteFrame": 148,
"../cocos2d/core/textures/CCTexture2D": 149
} ],
205: [ (function(t, e, i) {
"use strict";
if (!cc.runtime) {
var n = cc.TMXObject.prototype;
cc.defineGetterSetter(n, "type", n.getType, null);
cc.defineGetterSetter(n, "name", n.getObjectName, n.setObjectName);
cc.defineGetterSetter(n, "id", n.getId, null);
cc.defineGetterSetter(n, "gid", n.getGid, null);
cc.defineGetterSetter(n, "offset", n.getOffset, null);
cc.defineGetterSetter(n, "objectSize", n.getObjectSize, null);
cc.defineGetterSetter(n, "objectVisible", n.getObjectVisible, null);
cc.defineGetterSetter(n, "objectRotation", n.getObjectRotation, null);
cc.defineGetterSetter(n, "sgNode", n.getNode, null);
}
}), {} ],
206: [ (function(t, e, i) {
cc.VideoPlayer = ccui.VideoPlayer;
cc.sys.os !== cc.sys.OS_OSX && cc.sys.os !== cc.sys.OS_WINDOWS || (cc.VideoPlayer = {});
cc.VideoPlayer.EventType = {
PLAYING: 0,
PAUSED: 1,
STOPPED: 2,
COMPLETED: 3,
META_LOADED: 4,
CLICKED: 5,
READY_TO_PLAY: 6
};
}), {} ],
207: [ (function(t, e, i) {
cc.WebView = ccui.WebView;
cc.sys.os !== cc.sys.OS_OSX && cc.sys.os !== cc.sys.OS_WINDOWS || (cc.WebView = {});
cc.WebView.EventType = {
LOADING: 0,
LOADED: 1,
ERROR: 2,
JS_EVALUATED: 3
};
}), {} ],
208: [ (function(i, n, o) {
Math.sign || (Math.sign = function(t) {
return 0 === (t = +t) || isNaN(t) ? t : t > 0 ? 1 : -1;
});
Number.isInteger || (Number.isInteger = function(i) {
return "number" === ("object" === (e = typeof i) ? t(i) : e) && isFinite(i) && Math.floor(i) === i;
});
var r = window.performance || Date, s = Object.create(null);
console.time = function(t) {
s[t] = r.now();
};
console.timeEnd = function(t) {
var e = s[t], i = r.now() - e;
console.log(t + ": " + i + "ms");
};
}), {} ],
209: [ (function(i, n, o) {
String.prototype.startsWith || (String.prototype.startsWith = function(t, e) {
e = e || 0;
return this.lastIndexOf(t, e) === e;
});
String.prototype.endsWith || (String.prototype.endsWith = function(i, n) {
("undefined" === ("object" === (e = typeof n) ? t(n) : e) || n > this.length) && (n = this.length);
n -= i.length;
var o = this.indexOf(i, n);
return -1 !== o && o === n;
});
}), {} ],
210: [ (function(i, n, o) {
var r = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
};
window.__extends = function(t, e) {
r(t, e);
function i() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i());
};
window.__assign = Object.assign || function(t) {
for (var e, i = 1, n = arguments.length; i < n; i++) {
e = arguments[i];
for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
}
return t;
};
window.__rest = function(i, n) {
var o = {};
for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && n.indexOf(r) < 0 && (o[r] = i[r]);
if (null != i && "function" === ("object" === (e = typeof Object.getOwnPropertySymbols) ? t(Object.getOwnPropertySymbols) : e)) {
var s = 0;
for (r = Object.getOwnPropertySymbols(i); s < r.length; s++) n.indexOf(r[s]) < 0 && (o[r[s]] = i[r[s]]);
}
return o;
};
window.__decorate = function(i, n, o, r) {
var s, c = arguments.length, a = c < 3 ? n : null === r ? r = Object.getOwnPropertyDescriptor(n, o) : r;
if ("object" === ("object" === (e = typeof Reflect) ? t(Reflect) : e) && "function" === ("object" === (e = typeof Reflect.decorate) ? t(Reflect.decorate) : e)) a = Reflect.decorate(i, n, o, r); else for (var l = i.length - 1; l >= 0; l--) (s = i[l]) && (a = (c < 3 ? s(a) : c > 3 ? s(n, o, a) : s(n, o)) || a);
return c > 3 && a && Object.defineProperty(n, o, a), a;
};
window.__param = function(t, e) {
return function(i, n) {
e(i, n, t);
};
};
window.__metadata = function(i, n) {
if ("object" === ("object" === (e = typeof Reflect) ? t(Reflect) : e) && "function" === ("object" === (e = typeof Reflect.metadata) ? t(Reflect.metadata) : e)) return Reflect.metadata(i, n);
};
window.__awaiter = function(t, e, i, n) {
return new (i || (i = Promise))(function(o, r) {
function s(t) {
try {
a(n.next(t));
} catch (t) {
r(t);
}
}
function c(t) {
try {
a(n.throw(t));
} catch (t) {
r(t);
}
}
function a(t) {
t.done ? o(t.value) : new i(function(e) {
e(t.value);
}).then(s, c);
}
a((n = n.apply(t, e || [])).next());
});
};
window.__generator = function(i, n) {
var o, r, s, c, a = {
label: 0,
sent: function() {
if (1 & s[0]) throw s[1];
return s[1];
},
trys: [],
ops: []
};
return c = {
next: l(0),
throw: l(1),
return: l(2)
}, "function" === ("object" === (e = typeof Symbol) ? t(Symbol) : e) && (c[Symbol.iterator] = function() {
return this;
}), c;
function l(t) {
return function(e) {
return (function(t) {
if (o) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (o = 1, r && (s = r[2 & t[0] ? "return" : t[0] ? "throw" : "next"]) && !(s = s.call(r, t[1])).done) return s;
(r = 0, s) && (t = [ 0, s.value ]);
switch (t[0]) {
case 0:
case 1:
s = t;
break;

case 4:
a.label++;
return {
value: t[1],
done: !1
};

case 5:
a.label++;
r = t[1];
t = [ 0 ];
continue;

case 7:
t = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(s = a.trys, s = s.length > 0 && s[s.length - 1]) && (6 === t[0] || 2 === t[0])) {
a = 0;
continue;
}
if (3 === t[0] && (!s || t[1] > s[0] && t[1] < s[3])) {
a.label = t[1];
break;
}
if (6 === t[0] && a.label < s[1]) {
a.label = s[1];
s = t;
break;
}
if (s && a.label < s[2]) {
a.label = s[2];
a.ops.push(t);
break;
}
s[2] && a.ops.pop();
a.trys.pop();
continue;
}
t = n.call(i, a);
} catch (e) {
t = [ 6, e ];
r = 0;
} finally {
o = s = 0;
}
if (5 & t[0]) throw t[1];
return {
value: t[0] ? t[1] : void 0,
done: !0
};
})([ t, e ]);
};
}
};
window.__exportStar = function(t, e) {
for (var i in t) e.hasOwnProperty(i) || (e[i] = t[i]);
};
window.__values = function(i) {
var n = "function" === ("object" === (e = typeof Symbol) ? t(Symbol) : e) && i[Symbol.iterator], o = 0;
return n ? n.call(i) : {
next: function() {
i && o >= i.length && (i = void 0);
return {
value: i && i[o++],
done: !i
};
}
};
};
window.__read = function(i, n) {
var o = "function" === ("object" === (e = typeof Symbol) ? t(Symbol) : e) && i[Symbol.iterator];
if (!o) return i;
var r, s, c = o.call(i), a = [];
try {
for (;(void 0 === n || n-- > 0) && !(r = c.next()).done; ) a.push(r.value);
} catch (t) {
s = {
error: t
};
} finally {
try {
r && !r.done && (o = c.return) && o.call(c);
} finally {
if (s) throw s.error;
}
}
return a;
};
window.__spread = function() {
for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(__read(arguments[e]));
return t;
};
window.__await = function(t) {
return this instanceof __await ? (this.v = t, this) : new __await(t);
};
window.__asyncGenerator = function(t, e, i) {
if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
var n, o = i.apply(t, e || []), r = [];
return n = {}, s("next"), s("throw"), s("return"), n[Symbol.asyncIterator] = function() {
return this;
}, n;
function s(t) {
o[t] && (n[t] = function(e) {
return new Promise(function(i, n) {
r.push([ t, e, i, n ]) > 1 || c(t, e);
});
});
}
function c(t, e) {
try {
(function(t) {
t.value instanceof __await ? Promise.resolve(t.value.v).then(a, l) : h(r[0][2], t);
})(o[t](e));
} catch (t) {
h(r[0][3], t);
}
}
function a(t) {
c("next", t);
}
function l(t) {
c("throw", t);
}
function h(t, e) {
(t(e), r.shift(), r.length) && c(r[0][0], r[0][1]);
}
};
window.__asyncDelegator = function(t) {
var e, i;
return e = {}, n("next"), n("throw", (function(t) {
throw t;
})), n("return"), e[Symbol.iterator] = function() {
return this;
}, e;
function n(n, o) {
t[n] && (e[n] = function(e) {
return (i = !i) ? {
value: __await(t[n](e)),
done: "return" === n
} : o ? o(e) : e;
});
}
};
window.__asyncValues = function(i) {
if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
var n = i[Symbol.asyncIterator];
return n ? n.call(i) : "function" === ("object" === (e = typeof __values) ? t(__values) : e) ? __values(i) : i[Symbol.iterator]();
};
}), {} ],
211: [ (function(i, n, o) {
var r = "undefined" === ("object" === (e = typeof window) ? t(window) : e) ? global : window;
function s(i, n) {
"undefined" === ("object" === (e = typeof r[i]) ? t(r[i]) : e) && (r[i] = n);
}
function c(i) {
return "object" === ("object" === (e = typeof r[i]) ? t(r[i]) : e);
}
s("CC_TEST", c("tap") || c("QUnit"));
s("CC_EDITOR", c("Editor") && c("process") && "electron" in process.versions);
s("CC_PREVIEW", !0);
s("CC_DEV", !0);
s("CC_DEBUG", !0);
s("CC_JSB", c("jsb"));
s("CC_BUILD", !1);
s("CC_WECHATGAME", c("wx") && wx.getSystemInfoSync);
s("CC_QQPLAY", c("bk"));
s("CC_SUPPORT_JIT", !0);
0;
r.CocosEngine = cc.ENGINE_VERSION = "1.10.1";
}), {} ]
}, {}, [ 187 ]);
function t(t) {
return t && t.toString && "[object CallbackConstructor]" === t.toString() ? "function" : "object";
}
var e = "";
})();