(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const o of r)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && s(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const o = {};
    return (
      r.integrity && (o.integrity = r.integrity),
      r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : r.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const o = n(r);
    fetch(r.href, o);
  }
})();
function Yn(e, t) {
  const n = Object.create(null),
    s = e.split(",");
  for (let r = 0; r < s.length; r++) n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const J = {},
  dt = [],
  ve = () => {},
  xo = () => !1,
  wo = /^on[^a-z]/,
  an = (e) => wo.test(e),
  Jn = (e) => e.startsWith("onUpdate:"),
  te = Object.assign,
  Xn = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Ro = Object.prototype.hasOwnProperty,
  U = (e, t) => Ro.call(e, t),
  H = Array.isArray,
  ht = (e) => dn(e) === "[object Map]",
  hr = (e) => dn(e) === "[object Set]",
  B = (e) => typeof e == "function",
  G = (e) => typeof e == "string",
  Zn = (e) => typeof e == "symbol",
  X = (e) => e !== null && typeof e == "object",
  pr = (e) => X(e) && B(e.then) && B(e.catch),
  gr = Object.prototype.toString,
  dn = (e) => gr.call(e),
  Po = (e) => dn(e).slice(8, -1),
  mr = (e) => dn(e) === "[object Object]",
  Gn = (e) => G(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Gt = Yn(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  hn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Co = /-(\w)/g,
  Me = hn((e) => e.replace(Co, (t, n) => (n ? n.toUpperCase() : ""))),
  Oo = /\B([A-Z])/g,
  wt = hn((e) => e.replace(Oo, "-$1").toLowerCase()),
  pn = hn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  xn = hn((e) => (e ? `on${pn(e)}` : "")),
  Ht = (e, t) => !Object.is(e, t),
  wn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  rn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Ao = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Es;
const Mn = () =>
  Es ||
  (Es =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function es(e) {
  if (H(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = G(s) ? Mo(s) : es(s);
      if (r) for (const o in r) t[o] = r[o];
    }
    return t;
  } else {
    if (G(e)) return e;
    if (X(e)) return e;
  }
}
const To = /;(?![^(]*\))/g,
  So = /:([^]+)/,
  Io = new RegExp("\\/\\*.*?\\*\\/", "gs");
function Mo(e) {
  const t = {};
  return (
    e
      .replace(Io, "")
      .split(To)
      .forEach((n) => {
        if (n) {
          const s = n.split(So);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function ts(e) {
  let t = "";
  if (G(e)) t = e;
  else if (H(e))
    for (let n = 0; n < e.length; n++) {
      const s = ts(e[n]);
      s && (t += s + " ");
    }
  else if (X(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const $o =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Fo = Yn($o);
function _r(e) {
  return !!e || e === "";
}
const No = (e) =>
    G(e)
      ? e
      : e == null
      ? ""
      : H(e) || (X(e) && (e.toString === gr || !B(e.toString)))
      ? JSON.stringify(e, br, 2)
      : String(e),
  br = (e, t) =>
    t && t.__v_isRef
      ? br(e, t.value)
      : ht(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, r]) => ((n[`${s} =>`] = r), n),
            {}
          ),
        }
      : hr(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : X(t) && !H(t) && !mr(t)
      ? String(t)
      : t;
let me;
class Ho {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = me),
      !t && me && (this.index = (me.scopes || (me.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = me;
      try {
        return (me = this), t();
      } finally {
        me = n;
      }
    }
  }
  on() {
    me = this;
  }
  off() {
    me = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function jo(e, t = me) {
  t && t.active && t.effects.push(e);
}
function Lo() {
  return me;
}
const ns = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  yr = (e) => (e.w & Qe) > 0,
  vr = (e) => (e.n & Qe) > 0,
  Bo = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Qe;
  },
  ko = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const r = t[s];
        yr(r) && !vr(r) ? r.delete(e) : (t[n++] = r),
          (r.w &= ~Qe),
          (r.n &= ~Qe);
      }
      t.length = n;
    }
  },
  $n = new WeakMap();
let St = 0,
  Qe = 1;
const Fn = 30;
let _e;
const et = Symbol(""),
  Nn = Symbol("");
class ss {
  constructor(t, n = null, s) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      jo(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    let t = _e,
      n = qe;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = _e),
        (_e = this),
        (qe = !0),
        (Qe = 1 << ++St),
        St <= Fn ? Bo(this) : xs(this),
        this.fn()
      );
    } finally {
      St <= Fn && ko(this),
        (Qe = 1 << --St),
        (_e = this.parent),
        (qe = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    _e === this
      ? (this.deferStop = !0)
      : this.active &&
        (xs(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function xs(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let qe = !0;
const Er = [];
function Rt() {
  Er.push(qe), (qe = !1);
}
function Pt() {
  const e = Er.pop();
  qe = e === void 0 ? !0 : e;
}
function de(e, t, n) {
  if (qe && _e) {
    let s = $n.get(e);
    s || $n.set(e, (s = new Map()));
    let r = s.get(n);
    r || s.set(n, (r = ns())), xr(r);
  }
}
function xr(e, t) {
  let n = !1;
  St <= Fn ? vr(e) || ((e.n |= Qe), (n = !yr(e))) : (n = !e.has(_e)),
    n && (e.add(_e), _e.deps.push(e));
}
function Le(e, t, n, s, r, o) {
  const i = $n.get(e);
  if (!i) return;
  let c = [];
  if (t === "clear") c = [...i.values()];
  else if (n === "length" && H(e)) {
    const l = Number(s);
    i.forEach((a, d) => {
      (d === "length" || d >= l) && c.push(a);
    });
  } else
    switch ((n !== void 0 && c.push(i.get(n)), t)) {
      case "add":
        H(e)
          ? Gn(n) && c.push(i.get("length"))
          : (c.push(i.get(et)), ht(e) && c.push(i.get(Nn)));
        break;
      case "delete":
        H(e) || (c.push(i.get(et)), ht(e) && c.push(i.get(Nn)));
        break;
      case "set":
        ht(e) && c.push(i.get(et));
        break;
    }
  if (c.length === 1) c[0] && Hn(c[0]);
  else {
    const l = [];
    for (const a of c) a && l.push(...a);
    Hn(ns(l));
  }
}
function Hn(e, t) {
  const n = H(e) ? e : [...e];
  for (const s of n) s.computed && ws(s);
  for (const s of n) s.computed || ws(s);
}
function ws(e, t) {
  (e !== _e || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Uo = Yn("__proto__,__v_isRef,__isVue"),
  wr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Zn)
  ),
  Ko = rs(),
  Do = rs(!1, !0),
  Wo = rs(!0),
  Rs = zo();
function zo() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const s = D(this);
        for (let o = 0, i = this.length; o < i; o++) de(s, "get", o + "");
        const r = s[t](...n);
        return r === -1 || r === !1 ? s[t](...n.map(D)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Rt();
        const s = D(this)[t].apply(this, n);
        return Pt(), s;
      };
    }),
    e
  );
}
function qo(e) {
  const t = D(this);
  return de(t, "has", e), t.hasOwnProperty(e);
}
function rs(e = !1, t = !1) {
  return function (s, r, o) {
    if (r === "__v_isReactive") return !e;
    if (r === "__v_isReadonly") return e;
    if (r === "__v_isShallow") return t;
    if (r === "__v_raw" && o === (e ? (t ? ci : Ar) : t ? Or : Cr).get(s))
      return s;
    const i = H(s);
    if (!e) {
      if (i && U(Rs, r)) return Reflect.get(Rs, r, o);
      if (r === "hasOwnProperty") return qo;
    }
    const c = Reflect.get(s, r, o);
    return (Zn(r) ? wr.has(r) : Uo(r)) || (e || de(s, "get", r), t)
      ? c
      : ie(c)
      ? i && Gn(r)
        ? c
        : c.value
      : X(c)
      ? e
        ? Tr(c)
        : Wt(c)
      : c;
  };
}
const Vo = Rr(),
  Qo = Rr(!0);
function Rr(e = !1) {
  return function (n, s, r, o) {
    let i = n[s];
    if (bt(i) && ie(i) && !ie(r)) return !1;
    if (
      !e &&
      (!on(r) && !bt(r) && ((i = D(i)), (r = D(r))), !H(n) && ie(i) && !ie(r))
    )
      return (i.value = r), !0;
    const c = H(n) && Gn(s) ? Number(s) < n.length : U(n, s),
      l = Reflect.set(n, s, r, o);
    return (
      n === D(o) && (c ? Ht(r, i) && Le(n, "set", s, r) : Le(n, "add", s, r)), l
    );
  };
}
function Yo(e, t) {
  const n = U(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Le(e, "delete", t, void 0), s;
}
function Jo(e, t) {
  const n = Reflect.has(e, t);
  return (!Zn(t) || !wr.has(t)) && de(e, "has", t), n;
}
function Xo(e) {
  return de(e, "iterate", H(e) ? "length" : et), Reflect.ownKeys(e);
}
const Pr = { get: Ko, set: Vo, deleteProperty: Yo, has: Jo, ownKeys: Xo },
  Zo = {
    get: Wo,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Go = te({}, Pr, { get: Do, set: Qo }),
  os = (e) => e,
  gn = (e) => Reflect.getPrototypeOf(e);
function Vt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = D(e),
    o = D(t);
  n || (t !== o && de(r, "get", t), de(r, "get", o));
  const { has: i } = gn(r),
    c = s ? os : n ? cs : jt;
  if (i.call(r, t)) return c(e.get(t));
  if (i.call(r, o)) return c(e.get(o));
  e !== r && e.get(t);
}
function Qt(e, t = !1) {
  const n = this.__v_raw,
    s = D(n),
    r = D(e);
  return (
    t || (e !== r && de(s, "has", e), de(s, "has", r)),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function Yt(e, t = !1) {
  return (
    (e = e.__v_raw), !t && de(D(e), "iterate", et), Reflect.get(e, "size", e)
  );
}
function Ps(e) {
  e = D(e);
  const t = D(this);
  return gn(t).has.call(t, e) || (t.add(e), Le(t, "add", e, e)), this;
}
function Cs(e, t) {
  t = D(t);
  const n = D(this),
    { has: s, get: r } = gn(n);
  let o = s.call(n, e);
  o || ((e = D(e)), (o = s.call(n, e)));
  const i = r.call(n, e);
  return (
    n.set(e, t), o ? Ht(t, i) && Le(n, "set", e, t) : Le(n, "add", e, t), this
  );
}
function Os(e) {
  const t = D(this),
    { has: n, get: s } = gn(t);
  let r = n.call(t, e);
  r || ((e = D(e)), (r = n.call(t, e))), s && s.call(t, e);
  const o = t.delete(e);
  return r && Le(t, "delete", e, void 0), o;
}
function As() {
  const e = D(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Le(e, "clear", void 0, void 0), n;
}
function Jt(e, t) {
  return function (s, r) {
    const o = this,
      i = o.__v_raw,
      c = D(i),
      l = t ? os : e ? cs : jt;
    return (
      !e && de(c, "iterate", et), i.forEach((a, d) => s.call(r, l(a), l(d), o))
    );
  };
}
function Xt(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      o = D(r),
      i = ht(o),
      c = e === "entries" || (e === Symbol.iterator && i),
      l = e === "keys" && i,
      a = r[e](...s),
      d = n ? os : t ? cs : jt;
    return (
      !t && de(o, "iterate", l ? Nn : et),
      {
        next() {
          const { value: p, done: g } = a.next();
          return g
            ? { value: p, done: g }
            : { value: c ? [d(p[0]), d(p[1])] : d(p), done: g };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Ke(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function ei() {
  const e = {
      get(o) {
        return Vt(this, o);
      },
      get size() {
        return Yt(this);
      },
      has: Qt,
      add: Ps,
      set: Cs,
      delete: Os,
      clear: As,
      forEach: Jt(!1, !1),
    },
    t = {
      get(o) {
        return Vt(this, o, !1, !0);
      },
      get size() {
        return Yt(this);
      },
      has: Qt,
      add: Ps,
      set: Cs,
      delete: Os,
      clear: As,
      forEach: Jt(!1, !0),
    },
    n = {
      get(o) {
        return Vt(this, o, !0);
      },
      get size() {
        return Yt(this, !0);
      },
      has(o) {
        return Qt.call(this, o, !0);
      },
      add: Ke("add"),
      set: Ke("set"),
      delete: Ke("delete"),
      clear: Ke("clear"),
      forEach: Jt(!0, !1),
    },
    s = {
      get(o) {
        return Vt(this, o, !0, !0);
      },
      get size() {
        return Yt(this, !0);
      },
      has(o) {
        return Qt.call(this, o, !0);
      },
      add: Ke("add"),
      set: Ke("set"),
      delete: Ke("delete"),
      clear: Ke("clear"),
      forEach: Jt(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = Xt(o, !1, !1)),
        (n[o] = Xt(o, !0, !1)),
        (t[o] = Xt(o, !1, !0)),
        (s[o] = Xt(o, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [ti, ni, si, ri] = ei();
function is(e, t) {
  const n = t ? (e ? ri : si) : e ? ni : ti;
  return (s, r, o) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? s
      : Reflect.get(U(n, r) && r in s ? n : s, r, o);
}
const oi = { get: is(!1, !1) },
  ii = { get: is(!1, !0) },
  li = { get: is(!0, !1) },
  Cr = new WeakMap(),
  Or = new WeakMap(),
  Ar = new WeakMap(),
  ci = new WeakMap();
function ui(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function fi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ui(Po(e));
}
function Wt(e) {
  return bt(e) ? e : ls(e, !1, Pr, oi, Cr);
}
function ai(e) {
  return ls(e, !1, Go, ii, Or);
}
function Tr(e) {
  return ls(e, !0, Zo, li, Ar);
}
function ls(e, t, n, s, r) {
  if (!X(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = r.get(e);
  if (o) return o;
  const i = fi(e);
  if (i === 0) return e;
  const c = new Proxy(e, i === 2 ? s : n);
  return r.set(e, c), c;
}
function pt(e) {
  return bt(e) ? pt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function bt(e) {
  return !!(e && e.__v_isReadonly);
}
function on(e) {
  return !!(e && e.__v_isShallow);
}
function Sr(e) {
  return pt(e) || bt(e);
}
function D(e) {
  const t = e && e.__v_raw;
  return t ? D(t) : e;
}
function Ir(e) {
  return rn(e, "__v_skip", !0), e;
}
const jt = (e) => (X(e) ? Wt(e) : e),
  cs = (e) => (X(e) ? Tr(e) : e);
function Mr(e) {
  qe && _e && ((e = D(e)), xr(e.dep || (e.dep = ns())));
}
function $r(e, t) {
  e = D(e);
  const n = e.dep;
  n && Hn(n);
}
function ie(e) {
  return !!(e && e.__v_isRef === !0);
}
function di(e) {
  return Fr(e, !1);
}
function hi(e) {
  return Fr(e, !0);
}
function Fr(e, t) {
  return ie(e) ? e : new pi(e, t);
}
class pi {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : D(t)),
      (this._value = n ? t : jt(t));
  }
  get value() {
    return Mr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || on(t) || bt(t);
    (t = n ? t : D(t)),
      Ht(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : jt(t)), $r(this));
  }
}
function gt(e) {
  return ie(e) ? e.value : e;
}
const gi = {
  get: (e, t, n) => gt(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return ie(r) && !ie(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function Nr(e) {
  return pt(e) ? e : new Proxy(e, gi);
}
class mi {
  constructor(t, n, s, r) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new ss(t, () => {
        this._dirty || ((this._dirty = !0), $r(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = D(this);
    return (
      Mr(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function _i(e, t, n = !1) {
  let s, r;
  const o = B(e);
  return (
    o ? ((s = e), (r = ve)) : ((s = e.get), (r = e.set)),
    new mi(s, r, o || !r, n)
  );
}
function Ve(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    mn(o, t, n);
  }
  return r;
}
function Ee(e, t, n, s) {
  if (B(e)) {
    const o = Ve(e, t, n, s);
    return (
      o &&
        pr(o) &&
        o.catch((i) => {
          mn(i, t, n);
        }),
      o
    );
  }
  const r = [];
  for (let o = 0; o < e.length; o++) r.push(Ee(e[o], t, n, s));
  return r;
}
function mn(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      c = n;
    for (; o; ) {
      const a = o.ec;
      if (a) {
        for (let d = 0; d < a.length; d++) if (a[d](e, i, c) === !1) return;
      }
      o = o.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      Ve(l, null, 10, [e, i, c]);
      return;
    }
  }
  bi(e, n, r, s);
}
function bi(e, t, n, s = !0) {
  console.error(e);
}
let Lt = !1,
  jn = !1;
const oe = [];
let Ie = 0;
const mt = [];
let He = null,
  Ze = 0;
const Hr = Promise.resolve();
let us = null;
function jr(e) {
  const t = us || Hr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function yi(e) {
  let t = Ie + 1,
    n = oe.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1;
    Bt(oe[s]) < e ? (t = s + 1) : (n = s);
  }
  return t;
}
function fs(e) {
  (!oe.length || !oe.includes(e, Lt && e.allowRecurse ? Ie + 1 : Ie)) &&
    (e.id == null ? oe.push(e) : oe.splice(yi(e.id), 0, e), Lr());
}
function Lr() {
  !Lt && !jn && ((jn = !0), (us = Hr.then(kr)));
}
function vi(e) {
  const t = oe.indexOf(e);
  t > Ie && oe.splice(t, 1);
}
function Ei(e) {
  H(e)
    ? mt.push(...e)
    : (!He || !He.includes(e, e.allowRecurse ? Ze + 1 : Ze)) && mt.push(e),
    Lr();
}
function Ts(e, t = Lt ? Ie + 1 : 0) {
  for (; t < oe.length; t++) {
    const n = oe[t];
    n && n.pre && (oe.splice(t, 1), t--, n());
  }
}
function Br(e) {
  if (mt.length) {
    const t = [...new Set(mt)];
    if (((mt.length = 0), He)) {
      He.push(...t);
      return;
    }
    for (He = t, He.sort((n, s) => Bt(n) - Bt(s)), Ze = 0; Ze < He.length; Ze++)
      He[Ze]();
    (He = null), (Ze = 0);
  }
}
const Bt = (e) => (e.id == null ? 1 / 0 : e.id),
  xi = (e, t) => {
    const n = Bt(e) - Bt(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function kr(e) {
  (jn = !1), (Lt = !0), oe.sort(xi);
  const t = ve;
  try {
    for (Ie = 0; Ie < oe.length; Ie++) {
      const n = oe[Ie];
      n && n.active !== !1 && Ve(n, null, 14);
    }
  } finally {
    (Ie = 0),
      (oe.length = 0),
      Br(),
      (Lt = !1),
      (us = null),
      (oe.length || mt.length) && kr();
  }
}
function wi(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || J;
  let r = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in s) {
    const d = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: p, trim: g } = s[d] || J;
    g && (r = n.map((E) => (G(E) ? E.trim() : E))), p && (r = n.map(Ao));
  }
  let c,
    l = s[(c = xn(t))] || s[(c = xn(Me(t)))];
  !l && o && (l = s[(c = xn(wt(t)))]), l && Ee(l, e, 6, r);
  const a = s[c + "Once"];
  if (a) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[c]) return;
    (e.emitted[c] = !0), Ee(a, e, 6, r);
  }
}
function Ur(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {},
    c = !1;
  if (!B(e)) {
    const l = (a) => {
      const d = Ur(a, t, !0);
      d && ((c = !0), te(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l);
  }
  return !o && !c
    ? (X(e) && s.set(e, null), null)
    : (H(o) ? o.forEach((l) => (i[l] = null)) : te(i, o),
      X(e) && s.set(e, i),
      i);
}
function _n(e, t) {
  return !e || !an(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      U(e, t[0].toLowerCase() + t.slice(1)) || U(e, wt(t)) || U(e, t));
}
let be = null,
  Kr = null;
function ln(e) {
  const t = be;
  return (be = e), (Kr = (e && e.type.__scopeId) || null), t;
}
function Dr(e, t = be, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && ks(-1);
    const o = ln(t);
    let i;
    try {
      i = e(...r);
    } finally {
      ln(o), s._d && ks(1);
    }
    return i;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function Rn(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: o,
    propsOptions: [i],
    slots: c,
    attrs: l,
    emit: a,
    render: d,
    renderCache: p,
    data: g,
    setupState: E,
    ctx: A,
    inheritAttrs: S,
  } = e;
  let L, $;
  const F = ln(e);
  try {
    if (n.shapeFlag & 4) {
      const N = r || s;
      (L = Se(d.call(N, N, p, o, E, g, A))), ($ = l);
    } else {
      const N = t;
      (L = Se(
        N.length > 1 ? N(o, { attrs: l, slots: c, emit: a }) : N(o, null)
      )),
        ($ = t.props ? l : Ri(l));
    }
  } catch (N) {
    ($t.length = 0), mn(N, e, 1), (L = ae(kt));
  }
  let K = L;
  if ($ && S !== !1) {
    const N = Object.keys($),
      { shapeFlag: se } = K;
    N.length && se & 7 && (i && N.some(Jn) && ($ = Pi($, i)), (K = yt(K, $)));
  }
  return (
    n.dirs && ((K = yt(K)), (K.dirs = K.dirs ? K.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (K.transition = n.transition),
    (L = K),
    ln(F),
    L
  );
}
const Ri = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || an(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Pi = (e, t) => {
    const n = {};
    for (const s in e) (!Jn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function Ci(e, t, n) {
  const { props: s, children: r, component: o } = e,
    { props: i, children: c, patchFlag: l } = t,
    a = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return s ? Ss(s, i, a) : !!i;
    if (l & 8) {
      const d = t.dynamicProps;
      for (let p = 0; p < d.length; p++) {
        const g = d[p];
        if (i[g] !== s[g] && !_n(a, g)) return !0;
      }
    }
  } else
    return (r || c) && (!c || !c.$stable)
      ? !0
      : s === i
      ? !1
      : s
      ? i
        ? Ss(s, i, a)
        : !0
      : !!i;
  return !1;
}
function Ss(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !_n(n, o)) return !0;
  }
  return !1;
}
function Oi({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Ai = (e) => e.__isSuspense;
function Ti(e, t) {
  t && t.pendingBranch
    ? H(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Ei(e);
}
const Zt = {};
function en(e, t, n) {
  return Wr(e, t, n);
}
function Wr(
  e,
  t,
  { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = J
) {
  var c;
  const l = Lo() === ((c = ne) == null ? void 0 : c.scope) ? ne : null;
  let a,
    d = !1,
    p = !1;
  if (
    (ie(e)
      ? ((a = () => e.value), (d = on(e)))
      : pt(e)
      ? ((a = () => e), (s = !0))
      : H(e)
      ? ((p = !0),
        (d = e.some((N) => pt(N) || on(N))),
        (a = () =>
          e.map((N) => {
            if (ie(N)) return N.value;
            if (pt(N)) return at(N);
            if (B(N)) return Ve(N, l, 2);
          })))
      : B(e)
      ? t
        ? (a = () => Ve(e, l, 2))
        : (a = () => {
            if (!(l && l.isUnmounted)) return g && g(), Ee(e, l, 3, [E]);
          })
      : (a = ve),
    t && s)
  ) {
    const N = a;
    a = () => at(N());
  }
  let g,
    E = (N) => {
      g = F.onStop = () => {
        Ve(N, l, 4);
      };
    },
    A;
  if (Kt)
    if (
      ((E = ve),
      t ? n && Ee(t, l, 3, [a(), p ? [] : void 0, E]) : a(),
      r === "sync")
    ) {
      const N = Rl();
      A = N.__watcherHandles || (N.__watcherHandles = []);
    } else return ve;
  let S = p ? new Array(e.length).fill(Zt) : Zt;
  const L = () => {
    if (F.active)
      if (t) {
        const N = F.run();
        (s || d || (p ? N.some((se, le) => Ht(se, S[le])) : Ht(N, S))) &&
          (g && g(),
          Ee(t, l, 3, [N, S === Zt ? void 0 : p && S[0] === Zt ? [] : S, E]),
          (S = N));
      } else F.run();
  };
  L.allowRecurse = !!t;
  let $;
  r === "sync"
    ? ($ = L)
    : r === "post"
    ? ($ = () => fe(L, l && l.suspense))
    : ((L.pre = !0), l && (L.id = l.uid), ($ = () => fs(L)));
  const F = new ss(a, $);
  t
    ? n
      ? L()
      : (S = F.run())
    : r === "post"
    ? fe(F.run.bind(F), l && l.suspense)
    : F.run();
  const K = () => {
    F.stop(), l && l.scope && Xn(l.scope.effects, F);
  };
  return A && A.push(K), K;
}
function Si(e, t, n) {
  const s = this.proxy,
    r = G(e) ? (e.includes(".") ? zr(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  B(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = ne;
  vt(this);
  const c = Wr(r, o.bind(s), n);
  return i ? vt(i) : st(), c;
}
function zr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
function at(e, t) {
  if (!X(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ie(e))) at(e.value, t);
  else if (H(e)) for (let n = 0; n < e.length; n++) at(e[n], t);
  else if (hr(e) || ht(e))
    e.forEach((n) => {
      at(n, t);
    });
  else if (mr(e)) for (const n in e) at(e[n], t);
  return e;
}
function Je(e, t, n, s) {
  const r = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const c = r[i];
    o && (c.oldValue = o[i].value);
    let l = c.dir[s];
    l && (Rt(), Ee(l, n, 8, [e.el, c, e, t]), Pt());
  }
}
function qr(e, t) {
  return B(e) ? (() => te({ name: e.name }, t, { setup: e }))() : e;
}
const tn = (e) => !!e.type.__asyncLoader,
  Vr = (e) => e.type.__isKeepAlive;
function Ii(e, t) {
  Qr(e, "a", t);
}
function Mi(e, t) {
  Qr(e, "da", t);
}
function Qr(e, t, n = ne) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((bn(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      Vr(r.parent.vnode) && $i(s, t, n, r), (r = r.parent);
  }
}
function $i(e, t, n, s) {
  const r = bn(t, e, s, !0);
  Yr(() => {
    Xn(s[t], r);
  }, n);
}
function bn(e, t, n = ne, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          Rt(), vt(n);
          const c = Ee(t, n, e, i);
          return st(), Pt(), c;
        });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const Be =
    (e) =>
    (t, n = ne) =>
      (!Kt || e === "sp") && bn(e, (...s) => t(...s), n),
  Fi = Be("bm"),
  Ni = Be("m"),
  Hi = Be("bu"),
  ji = Be("u"),
  Li = Be("bum"),
  Yr = Be("um"),
  Bi = Be("sp"),
  ki = Be("rtg"),
  Ui = Be("rtc");
function Ki(e, t = ne) {
  bn("ec", e, t);
}
const Jr = "components";
function Ln(e, t) {
  return Wi(Jr, e, !0, t) || e;
}
const Di = Symbol.for("v-ndc");
function Wi(e, t, n = !0, s = !1) {
  const r = be || ne;
  if (r) {
    const o = r.type;
    if (e === Jr) {
      const c = El(o, !1);
      if (c && (c === t || c === Me(t) || c === pn(Me(t)))) return o;
    }
    const i = Is(r[e] || o[e], t) || Is(r.appContext[e], t);
    return !i && s ? o : i;
  }
}
function Is(e, t) {
  return e && (e[t] || e[Me(t)] || e[pn(Me(t))]);
}
function zi(e, t, n, s) {
  let r;
  const o = n && n[s];
  if (H(e) || G(e)) {
    r = new Array(e.length);
    for (let i = 0, c = e.length; i < c; i++)
      r[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let i = 0; i < e; i++) r[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (X(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (i, c) => t(i, c, void 0, o && o[c]));
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let c = 0, l = i.length; c < l; c++) {
        const a = i[c];
        r[c] = t(e[a], a, c, o && o[c]);
      }
    }
  else r = [];
  return n && (n[s] = r), r;
}
const Bn = (e) => (e ? (lo(e) ? gs(e) || e.proxy : Bn(e.parent)) : null),
  Mt = te(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Bn(e.parent),
    $root: (e) => Bn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => as(e),
    $forceUpdate: (e) => e.f || (e.f = () => fs(e.update)),
    $nextTick: (e) => e.n || (e.n = jr.bind(e.proxy)),
    $watch: (e) => Si.bind(e),
  }),
  Pn = (e, t) => e !== J && !e.__isScriptSetup && U(e, t),
  qi = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: o,
        accessCache: i,
        type: c,
        appContext: l,
      } = e;
      let a;
      if (t[0] !== "$") {
        const E = i[t];
        if (E !== void 0)
          switch (E) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (Pn(s, t)) return (i[t] = 1), s[t];
          if (r !== J && U(r, t)) return (i[t] = 2), r[t];
          if ((a = e.propsOptions[0]) && U(a, t)) return (i[t] = 3), o[t];
          if (n !== J && U(n, t)) return (i[t] = 4), n[t];
          kn && (i[t] = 0);
        }
      }
      const d = Mt[t];
      let p, g;
      if (d) return t === "$attrs" && de(e, "get", t), d(e);
      if ((p = c.__cssModules) && (p = p[t])) return p;
      if (n !== J && U(n, t)) return (i[t] = 4), n[t];
      if (((g = l.config.globalProperties), U(g, t))) return g[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: o } = e;
      return Pn(r, t)
        ? ((r[t] = n), !0)
        : s !== J && U(s, t)
        ? ((s[t] = n), !0)
        : U(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          propsOptions: o,
        },
      },
      i
    ) {
      let c;
      return (
        !!n[i] ||
        (e !== J && U(e, i)) ||
        Pn(t, i) ||
        ((c = o[0]) && U(c, i)) ||
        U(s, i) ||
        U(Mt, i) ||
        U(r.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : U(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Ms(e) {
  return H(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let kn = !0;
function Vi(e) {
  const t = as(e),
    n = e.proxy,
    s = e.ctx;
  (kn = !1), t.beforeCreate && $s(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: o,
    methods: i,
    watch: c,
    provide: l,
    inject: a,
    created: d,
    beforeMount: p,
    mounted: g,
    beforeUpdate: E,
    updated: A,
    activated: S,
    deactivated: L,
    beforeDestroy: $,
    beforeUnmount: F,
    destroyed: K,
    unmounted: N,
    render: se,
    renderTracked: le,
    renderTriggered: we,
    errorCaptured: $e,
    serverPrefetch: rt,
    expose: Re,
    inheritAttrs: ke,
    components: Ye,
    directives: Pe,
    filters: Ct,
  } = t;
  if ((a && Qi(a, s, null), i))
    for (const Q in i) {
      const W = i[Q];
      B(W) && (s[Q] = W.bind(n));
    }
  if (r) {
    const Q = r.call(n, n);
    X(Q) && (e.data = Wt(Q));
  }
  if (((kn = !0), o))
    for (const Q in o) {
      const W = o[Q],
        Fe = B(W) ? W.bind(n, n) : B(W.get) ? W.get.bind(n, n) : ve,
        Ue = !B(W) && B(W.set) ? W.set.bind(n) : ve,
        Ce = pe({ get: Fe, set: Ue });
      Object.defineProperty(s, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => Ce.value,
        set: (ue) => (Ce.value = ue),
      });
    }
  if (c) for (const Q in c) Xr(c[Q], s, n, Q);
  if (l) {
    const Q = B(l) ? l.call(n) : l;
    Reflect.ownKeys(Q).forEach((W) => {
      nn(W, Q[W]);
    });
  }
  d && $s(d, e, "c");
  function ee(Q, W) {
    H(W) ? W.forEach((Fe) => Q(Fe.bind(n))) : W && Q(W.bind(n));
  }
  if (
    (ee(Fi, p),
    ee(Ni, g),
    ee(Hi, E),
    ee(ji, A),
    ee(Ii, S),
    ee(Mi, L),
    ee(Ki, $e),
    ee(Ui, le),
    ee(ki, we),
    ee(Li, F),
    ee(Yr, N),
    ee(Bi, rt),
    H(Re))
  )
    if (Re.length) {
      const Q = e.exposed || (e.exposed = {});
      Re.forEach((W) => {
        Object.defineProperty(Q, W, {
          get: () => n[W],
          set: (Fe) => (n[W] = Fe),
        });
      });
    } else e.exposed || (e.exposed = {});
  se && e.render === ve && (e.render = se),
    ke != null && (e.inheritAttrs = ke),
    Ye && (e.components = Ye),
    Pe && (e.directives = Pe);
}
function Qi(e, t, n = ve) {
  H(e) && (e = Un(e));
  for (const s in e) {
    const r = e[s];
    let o;
    X(r)
      ? "default" in r
        ? (o = je(r.from || s, r.default, !0))
        : (o = je(r.from || s))
      : (o = je(r)),
      ie(o)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[s] = o);
  }
}
function $s(e, t, n) {
  Ee(H(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Xr(e, t, n, s) {
  const r = s.includes(".") ? zr(n, s) : () => n[s];
  if (G(e)) {
    const o = t[e];
    B(o) && en(r, o);
  } else if (B(e)) en(r, e.bind(n));
  else if (X(e))
    if (H(e)) e.forEach((o) => Xr(o, t, n, s));
    else {
      const o = B(e.handler) ? e.handler.bind(n) : t[e.handler];
      B(o) && en(r, o, e);
    }
}
function as(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    c = o.get(t);
  let l;
  return (
    c
      ? (l = c)
      : !r.length && !n && !s
      ? (l = t)
      : ((l = {}), r.length && r.forEach((a) => cn(l, a, i, !0)), cn(l, t, i)),
    X(t) && o.set(t, l),
    l
  );
}
function cn(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && cn(e, o, n, !0), r && r.forEach((i) => cn(e, i, n, !0));
  for (const i in t)
    if (!(s && i === "expose")) {
      const c = Yi[i] || (n && n[i]);
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Yi = {
  data: Fs,
  props: Ns,
  emits: Ns,
  methods: It,
  computed: It,
  beforeCreate: ce,
  created: ce,
  beforeMount: ce,
  mounted: ce,
  beforeUpdate: ce,
  updated: ce,
  beforeDestroy: ce,
  beforeUnmount: ce,
  destroyed: ce,
  unmounted: ce,
  activated: ce,
  deactivated: ce,
  errorCaptured: ce,
  serverPrefetch: ce,
  components: It,
  directives: It,
  watch: Xi,
  provide: Fs,
  inject: Ji,
};
function Fs(e, t) {
  return t
    ? e
      ? function () {
          return te(
            B(e) ? e.call(this, this) : e,
            B(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Ji(e, t) {
  return It(Un(e), Un(t));
}
function Un(e) {
  if (H(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ce(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function It(e, t) {
  return e ? te(Object.create(null), e, t) : t;
}
function Ns(e, t) {
  return e
    ? H(e) && H(t)
      ? [...new Set([...e, ...t])]
      : te(Object.create(null), Ms(e), Ms(t ?? {}))
    : t;
}
function Xi(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = te(Object.create(null), e);
  for (const s in t) n[s] = ce(e[s], t[s]);
  return n;
}
function Zr() {
  return {
    app: null,
    config: {
      isNativeTag: xo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Zi = 0;
function Gi(e, t) {
  return function (s, r = null) {
    B(s) || (s = te({}, s)), r != null && !X(r) && (r = null);
    const o = Zr(),
      i = new Set();
    let c = !1;
    const l = (o.app = {
      _uid: Zi++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: Pl,
      get config() {
        return o.config;
      },
      set config(a) {},
      use(a, ...d) {
        return (
          i.has(a) ||
            (a && B(a.install)
              ? (i.add(a), a.install(l, ...d))
              : B(a) && (i.add(a), a(l, ...d))),
          l
        );
      },
      mixin(a) {
        return o.mixins.includes(a) || o.mixins.push(a), l;
      },
      component(a, d) {
        return d ? ((o.components[a] = d), l) : o.components[a];
      },
      directive(a, d) {
        return d ? ((o.directives[a] = d), l) : o.directives[a];
      },
      mount(a, d, p) {
        if (!c) {
          const g = ae(s, r);
          return (
            (g.appContext = o),
            d && t ? t(g, a) : e(g, a, p),
            (c = !0),
            (l._container = a),
            (a.__vue_app__ = l),
            gs(g.component) || g.component.proxy
          );
        }
      },
      unmount() {
        c && (e(null, l._container), delete l._container.__vue_app__);
      },
      provide(a, d) {
        return (o.provides[a] = d), l;
      },
      runWithContext(a) {
        un = l;
        try {
          return a();
        } finally {
          un = null;
        }
      },
    });
    return l;
  };
}
let un = null;
function nn(e, t) {
  if (ne) {
    let n = ne.provides;
    const s = ne.parent && ne.parent.provides;
    s === n && (n = ne.provides = Object.create(s)), (n[e] = t);
  }
}
function je(e, t, n = !1) {
  const s = ne || be;
  if (s || un) {
    const r = s
      ? s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides
      : un._context.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && B(t) ? t.call(s && s.proxy) : t;
  }
}
function el(e, t, n, s = !1) {
  const r = {},
    o = {};
  rn(o, vn, 1), (e.propsDefaults = Object.create(null)), Gr(e, t, r, o);
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  n ? (e.props = s ? r : ai(r)) : e.type.props ? (e.props = r) : (e.props = o),
    (e.attrs = o);
}
function tl(e, t, n, s) {
  const {
      props: r,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    c = D(r),
    [l] = e.propsOptions;
  let a = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const d = e.vnode.dynamicProps;
      for (let p = 0; p < d.length; p++) {
        let g = d[p];
        if (_n(e.emitsOptions, g)) continue;
        const E = t[g];
        if (l)
          if (U(o, g)) E !== o[g] && ((o[g] = E), (a = !0));
          else {
            const A = Me(g);
            r[A] = Kn(l, c, A, E, e, !1);
          }
        else E !== o[g] && ((o[g] = E), (a = !0));
      }
    }
  } else {
    Gr(e, t, r, o) && (a = !0);
    let d;
    for (const p in c)
      (!t || (!U(t, p) && ((d = wt(p)) === p || !U(t, d)))) &&
        (l
          ? n &&
            (n[p] !== void 0 || n[d] !== void 0) &&
            (r[p] = Kn(l, c, p, void 0, e, !0))
          : delete r[p]);
    if (o !== c) for (const p in o) (!t || !U(t, p)) && (delete o[p], (a = !0));
  }
  a && Le(e, "set", "$attrs");
}
function Gr(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1,
    c;
  if (t)
    for (let l in t) {
      if (Gt(l)) continue;
      const a = t[l];
      let d;
      r && U(r, (d = Me(l)))
        ? !o || !o.includes(d)
          ? (n[d] = a)
          : ((c || (c = {}))[d] = a)
        : _n(e.emitsOptions, l) ||
          ((!(l in s) || a !== s[l]) && ((s[l] = a), (i = !0)));
    }
  if (o) {
    const l = D(n),
      a = c || J;
    for (let d = 0; d < o.length; d++) {
      const p = o[d];
      n[p] = Kn(r, l, p, a[p], e, !U(a, p));
    }
  }
  return i;
}
function Kn(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const c = U(i, "default");
    if (c && s === void 0) {
      const l = i.default;
      if (i.type !== Function && !i.skipFactory && B(l)) {
        const { propsDefaults: a } = r;
        n in a ? (s = a[n]) : (vt(r), (s = a[n] = l.call(null, t)), st());
      } else s = l;
    }
    i[0] &&
      (o && !c ? (s = !1) : i[1] && (s === "" || s === wt(n)) && (s = !0));
  }
  return s;
}
function eo(e, t, n = !1) {
  const s = t.propsCache,
    r = s.get(e);
  if (r) return r;
  const o = e.props,
    i = {},
    c = [];
  let l = !1;
  if (!B(e)) {
    const d = (p) => {
      l = !0;
      const [g, E] = eo(p, t, !0);
      te(i, g), E && c.push(...E);
    };
    !n && t.mixins.length && t.mixins.forEach(d),
      e.extends && d(e.extends),
      e.mixins && e.mixins.forEach(d);
  }
  if (!o && !l) return X(e) && s.set(e, dt), dt;
  if (H(o))
    for (let d = 0; d < o.length; d++) {
      const p = Me(o[d]);
      Hs(p) && (i[p] = J);
    }
  else if (o)
    for (const d in o) {
      const p = Me(d);
      if (Hs(p)) {
        const g = o[d],
          E = (i[p] = H(g) || B(g) ? { type: g } : te({}, g));
        if (E) {
          const A = Bs(Boolean, E.type),
            S = Bs(String, E.type);
          (E[0] = A > -1),
            (E[1] = S < 0 || A < S),
            (A > -1 || U(E, "default")) && c.push(p);
        }
      }
    }
  const a = [i, c];
  return X(e) && s.set(e, a), a;
}
function Hs(e) {
  return e[0] !== "$";
}
function js(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Ls(e, t) {
  return js(e) === js(t);
}
function Bs(e, t) {
  return H(t) ? t.findIndex((n) => Ls(n, e)) : B(t) && Ls(t, e) ? 0 : -1;
}
const to = (e) => e[0] === "_" || e === "$stable",
  ds = (e) => (H(e) ? e.map(Se) : [Se(e)]),
  nl = (e, t, n) => {
    if (t._n) return t;
    const s = Dr((...r) => ds(t(...r)), n);
    return (s._c = !1), s;
  },
  no = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (to(r)) continue;
      const o = e[r];
      if (B(o)) t[r] = nl(r, o, s);
      else if (o != null) {
        const i = ds(o);
        t[r] = () => i;
      }
    }
  },
  so = (e, t) => {
    const n = ds(t);
    e.slots.default = () => n;
  },
  sl = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = D(t)), rn(t, "_", n)) : no(t, (e.slots = {}));
    } else (e.slots = {}), t && so(e, t);
    rn(e.slots, vn, 1);
  },
  rl = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let o = !0,
      i = J;
    if (s.shapeFlag & 32) {
      const c = t._;
      c
        ? n && c === 1
          ? (o = !1)
          : (te(r, t), !n && c === 1 && delete r._)
        : ((o = !t.$stable), no(t, r)),
        (i = t);
    } else t && (so(e, t), (i = { default: 1 }));
    if (o) for (const c in r) !to(c) && !(c in i) && delete r[c];
  };
function Dn(e, t, n, s, r = !1) {
  if (H(e)) {
    e.forEach((g, E) => Dn(g, t && (H(t) ? t[E] : t), n, s, r));
    return;
  }
  if (tn(s) && !r) return;
  const o = s.shapeFlag & 4 ? gs(s.component) || s.component.proxy : s.el,
    i = r ? null : o,
    { i: c, r: l } = e,
    a = t && t.r,
    d = c.refs === J ? (c.refs = {}) : c.refs,
    p = c.setupState;
  if (
    (a != null &&
      a !== l &&
      (G(a)
        ? ((d[a] = null), U(p, a) && (p[a] = null))
        : ie(a) && (a.value = null)),
    B(l))
  )
    Ve(l, c, 12, [i, d]);
  else {
    const g = G(l),
      E = ie(l);
    if (g || E) {
      const A = () => {
        if (e.f) {
          const S = g ? (U(p, l) ? p[l] : d[l]) : l.value;
          r
            ? H(S) && Xn(S, o)
            : H(S)
            ? S.includes(o) || S.push(o)
            : g
            ? ((d[l] = [o]), U(p, l) && (p[l] = d[l]))
            : ((l.value = [o]), e.k && (d[e.k] = l.value));
        } else
          g
            ? ((d[l] = i), U(p, l) && (p[l] = i))
            : E && ((l.value = i), e.k && (d[e.k] = i));
      };
      i ? ((A.id = -1), fe(A, n)) : A();
    }
  }
}
const fe = Ti;
function ol(e) {
  return il(e);
}
function il(e, t) {
  const n = Mn();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: o,
      createElement: i,
      createText: c,
      createComment: l,
      setText: a,
      setElementText: d,
      parentNode: p,
      nextSibling: g,
      setScopeId: E = ve,
      insertStaticContent: A,
    } = e,
    S = (
      u,
      f,
      h,
      m = null,
      b = null,
      y = null,
      P = !1,
      x = null,
      w = !!f.dynamicChildren
    ) => {
      if (u === f) return;
      u && !At(u, f) && ((m = _(u)), ue(u, b, y, !0), (u = null)),
        f.patchFlag === -2 && ((w = !1), (f.dynamicChildren = null));
      const { type: v, ref: I, shapeFlag: O } = f;
      switch (v) {
        case yn:
          L(u, f, h, m);
          break;
        case kt:
          $(u, f, h, m);
          break;
        case Cn:
          u == null && F(f, h, m, P);
          break;
        case Te:
          Ye(u, f, h, m, b, y, P, x, w);
          break;
        default:
          O & 1
            ? se(u, f, h, m, b, y, P, x, w)
            : O & 6
            ? Pe(u, f, h, m, b, y, P, x, w)
            : (O & 64 || O & 128) && v.process(u, f, h, m, b, y, P, x, w, R);
      }
      I != null && b && Dn(I, u && u.ref, y, f || u, !f);
    },
    L = (u, f, h, m) => {
      if (u == null) s((f.el = c(f.children)), h, m);
      else {
        const b = (f.el = u.el);
        f.children !== u.children && a(b, f.children);
      }
    },
    $ = (u, f, h, m) => {
      u == null ? s((f.el = l(f.children || "")), h, m) : (f.el = u.el);
    },
    F = (u, f, h, m) => {
      [u.el, u.anchor] = A(u.children, f, h, m, u.el, u.anchor);
    },
    K = ({ el: u, anchor: f }, h, m) => {
      let b;
      for (; u && u !== f; ) (b = g(u)), s(u, h, m), (u = b);
      s(f, h, m);
    },
    N = ({ el: u, anchor: f }) => {
      let h;
      for (; u && u !== f; ) (h = g(u)), r(u), (u = h);
      r(f);
    },
    se = (u, f, h, m, b, y, P, x, w) => {
      (P = P || f.type === "svg"),
        u == null ? le(f, h, m, b, y, P, x, w) : rt(u, f, b, y, P, x, w);
    },
    le = (u, f, h, m, b, y, P, x) => {
      let w, v;
      const { type: I, props: O, shapeFlag: M, transition: j, dirs: k } = u;
      if (
        ((w = u.el = i(u.type, y, O && O.is, O)),
        M & 8
          ? d(w, u.children)
          : M & 16 &&
            $e(u.children, w, null, m, b, y && I !== "foreignObject", P, x),
        k && Je(u, null, m, "created"),
        we(w, u, u.scopeId, P, m),
        O)
      ) {
        for (const V in O)
          V !== "value" &&
            !Gt(V) &&
            o(w, V, null, O[V], y, u.children, m, b, re);
        "value" in O && o(w, "value", null, O.value),
          (v = O.onVnodeBeforeMount) && Ae(v, m, u);
      }
      k && Je(u, null, m, "beforeMount");
      const Y = (!b || (b && !b.pendingBranch)) && j && !j.persisted;
      Y && j.beforeEnter(w),
        s(w, f, h),
        ((v = O && O.onVnodeMounted) || Y || k) &&
          fe(() => {
            v && Ae(v, m, u), Y && j.enter(w), k && Je(u, null, m, "mounted");
          }, b);
    },
    we = (u, f, h, m, b) => {
      if ((h && E(u, h), m)) for (let y = 0; y < m.length; y++) E(u, m[y]);
      if (b) {
        let y = b.subTree;
        if (f === y) {
          const P = b.vnode;
          we(u, P, P.scopeId, P.slotScopeIds, b.parent);
        }
      }
    },
    $e = (u, f, h, m, b, y, P, x, w = 0) => {
      for (let v = w; v < u.length; v++) {
        const I = (u[v] = x ? We(u[v]) : Se(u[v]));
        S(null, I, f, h, m, b, y, P, x);
      }
    },
    rt = (u, f, h, m, b, y, P) => {
      const x = (f.el = u.el);
      let { patchFlag: w, dynamicChildren: v, dirs: I } = f;
      w |= u.patchFlag & 16;
      const O = u.props || J,
        M = f.props || J;
      let j;
      h && Xe(h, !1),
        (j = M.onVnodeBeforeUpdate) && Ae(j, h, f, u),
        I && Je(f, u, h, "beforeUpdate"),
        h && Xe(h, !0);
      const k = b && f.type !== "foreignObject";
      if (
        (v
          ? Re(u.dynamicChildren, v, x, h, m, k, y)
          : P || W(u, f, x, null, h, m, k, y, !1),
        w > 0)
      ) {
        if (w & 16) ke(x, f, O, M, h, m, b);
        else if (
          (w & 2 && O.class !== M.class && o(x, "class", null, M.class, b),
          w & 4 && o(x, "style", O.style, M.style, b),
          w & 8)
        ) {
          const Y = f.dynamicProps;
          for (let V = 0; V < Y.length; V++) {
            const Z = Y[V],
              ge = O[Z],
              ct = M[Z];
            (ct !== ge || Z === "value") &&
              o(x, Z, ge, ct, b, u.children, h, m, re);
          }
        }
        w & 1 && u.children !== f.children && d(x, f.children);
      } else !P && v == null && ke(x, f, O, M, h, m, b);
      ((j = M.onVnodeUpdated) || I) &&
        fe(() => {
          j && Ae(j, h, f, u), I && Je(f, u, h, "updated");
        }, m);
    },
    Re = (u, f, h, m, b, y, P) => {
      for (let x = 0; x < f.length; x++) {
        const w = u[x],
          v = f[x],
          I =
            w.el && (w.type === Te || !At(w, v) || w.shapeFlag & 70)
              ? p(w.el)
              : h;
        S(w, v, I, null, m, b, y, P, !0);
      }
    },
    ke = (u, f, h, m, b, y, P) => {
      if (h !== m) {
        if (h !== J)
          for (const x in h)
            !Gt(x) && !(x in m) && o(u, x, h[x], null, P, f.children, b, y, re);
        for (const x in m) {
          if (Gt(x)) continue;
          const w = m[x],
            v = h[x];
          w !== v && x !== "value" && o(u, x, v, w, P, f.children, b, y, re);
        }
        "value" in m && o(u, "value", h.value, m.value);
      }
    },
    Ye = (u, f, h, m, b, y, P, x, w) => {
      const v = (f.el = u ? u.el : c("")),
        I = (f.anchor = u ? u.anchor : c(""));
      let { patchFlag: O, dynamicChildren: M, slotScopeIds: j } = f;
      j && (x = x ? x.concat(j) : j),
        u == null
          ? (s(v, h, m), s(I, h, m), $e(f.children, h, I, b, y, P, x, w))
          : O > 0 && O & 64 && M && u.dynamicChildren
          ? (Re(u.dynamicChildren, M, h, b, y, P, x),
            (f.key != null || (b && f === b.subTree)) && ro(u, f, !0))
          : W(u, f, h, I, b, y, P, x, w);
    },
    Pe = (u, f, h, m, b, y, P, x, w) => {
      (f.slotScopeIds = x),
        u == null
          ? f.shapeFlag & 512
            ? b.ctx.activate(f, h, m, P, w)
            : Ct(f, h, m, b, y, P, w)
          : ot(u, f, w);
    },
    Ct = (u, f, h, m, b, y, P) => {
      const x = (u.component = ml(u, m, b));
      if ((Vr(u) && (x.ctx.renderer = R), _l(x), x.asyncDep)) {
        if ((b && b.registerDep(x, ee), !u.el)) {
          const w = (x.subTree = ae(kt));
          $(null, w, f, h);
        }
        return;
      }
      ee(x, u, f, h, b, y, P);
    },
    ot = (u, f, h) => {
      const m = (f.component = u.component);
      if (Ci(u, f, h))
        if (m.asyncDep && !m.asyncResolved) {
          Q(m, f, h);
          return;
        } else (m.next = f), vi(m.update), m.update();
      else (f.el = u.el), (m.vnode = f);
    },
    ee = (u, f, h, m, b, y, P) => {
      const x = () => {
          if (u.isMounted) {
            let { next: I, bu: O, u: M, parent: j, vnode: k } = u,
              Y = I,
              V;
            Xe(u, !1),
              I ? ((I.el = k.el), Q(u, I, P)) : (I = k),
              O && wn(O),
              (V = I.props && I.props.onVnodeBeforeUpdate) && Ae(V, j, I, k),
              Xe(u, !0);
            const Z = Rn(u),
              ge = u.subTree;
            (u.subTree = Z),
              S(ge, Z, p(ge.el), _(ge), u, b, y),
              (I.el = Z.el),
              Y === null && Oi(u, Z.el),
              M && fe(M, b),
              (V = I.props && I.props.onVnodeUpdated) &&
                fe(() => Ae(V, j, I, k), b);
          } else {
            let I;
            const { el: O, props: M } = f,
              { bm: j, m: k, parent: Y } = u,
              V = tn(f);
            if (
              (Xe(u, !1),
              j && wn(j),
              !V && (I = M && M.onVnodeBeforeMount) && Ae(I, Y, f),
              Xe(u, !0),
              O && z)
            ) {
              const Z = () => {
                (u.subTree = Rn(u)), z(O, u.subTree, u, b, null);
              };
              V
                ? f.type.__asyncLoader().then(() => !u.isUnmounted && Z())
                : Z();
            } else {
              const Z = (u.subTree = Rn(u));
              S(null, Z, h, m, u, b, y), (f.el = Z.el);
            }
            if ((k && fe(k, b), !V && (I = M && M.onVnodeMounted))) {
              const Z = f;
              fe(() => Ae(I, Y, Z), b);
            }
            (f.shapeFlag & 256 ||
              (Y && tn(Y.vnode) && Y.vnode.shapeFlag & 256)) &&
              u.a &&
              fe(u.a, b),
              (u.isMounted = !0),
              (f = h = m = null);
          }
        },
        w = (u.effect = new ss(x, () => fs(v), u.scope)),
        v = (u.update = () => w.run());
      (v.id = u.uid), Xe(u, !0), v();
    },
    Q = (u, f, h) => {
      f.component = u;
      const m = u.vnode.props;
      (u.vnode = f),
        (u.next = null),
        tl(u, f.props, m, h),
        rl(u, f.children, h),
        Rt(),
        Ts(),
        Pt();
    },
    W = (u, f, h, m, b, y, P, x, w = !1) => {
      const v = u && u.children,
        I = u ? u.shapeFlag : 0,
        O = f.children,
        { patchFlag: M, shapeFlag: j } = f;
      if (M > 0) {
        if (M & 128) {
          Ue(v, O, h, m, b, y, P, x, w);
          return;
        } else if (M & 256) {
          Fe(v, O, h, m, b, y, P, x, w);
          return;
        }
      }
      j & 8
        ? (I & 16 && re(v, b, y), O !== v && d(h, O))
        : I & 16
        ? j & 16
          ? Ue(v, O, h, m, b, y, P, x, w)
          : re(v, b, y, !0)
        : (I & 8 && d(h, ""), j & 16 && $e(O, h, m, b, y, P, x, w));
    },
    Fe = (u, f, h, m, b, y, P, x, w) => {
      (u = u || dt), (f = f || dt);
      const v = u.length,
        I = f.length,
        O = Math.min(v, I);
      let M;
      for (M = 0; M < O; M++) {
        const j = (f[M] = w ? We(f[M]) : Se(f[M]));
        S(u[M], j, h, null, b, y, P, x, w);
      }
      v > I ? re(u, b, y, !0, !1, O) : $e(f, h, m, b, y, P, x, w, O);
    },
    Ue = (u, f, h, m, b, y, P, x, w) => {
      let v = 0;
      const I = f.length;
      let O = u.length - 1,
        M = I - 1;
      for (; v <= O && v <= M; ) {
        const j = u[v],
          k = (f[v] = w ? We(f[v]) : Se(f[v]));
        if (At(j, k)) S(j, k, h, null, b, y, P, x, w);
        else break;
        v++;
      }
      for (; v <= O && v <= M; ) {
        const j = u[O],
          k = (f[M] = w ? We(f[M]) : Se(f[M]));
        if (At(j, k)) S(j, k, h, null, b, y, P, x, w);
        else break;
        O--, M--;
      }
      if (v > O) {
        if (v <= M) {
          const j = M + 1,
            k = j < I ? f[j].el : m;
          for (; v <= M; )
            S(null, (f[v] = w ? We(f[v]) : Se(f[v])), h, k, b, y, P, x, w), v++;
        }
      } else if (v > M) for (; v <= O; ) ue(u[v], b, y, !0), v++;
      else {
        const j = v,
          k = v,
          Y = new Map();
        for (v = k; v <= M; v++) {
          const he = (f[v] = w ? We(f[v]) : Se(f[v]));
          he.key != null && Y.set(he.key, v);
        }
        let V,
          Z = 0;
        const ge = M - k + 1;
        let ct = !1,
          bs = 0;
        const Ot = new Array(ge);
        for (v = 0; v < ge; v++) Ot[v] = 0;
        for (v = j; v <= O; v++) {
          const he = u[v];
          if (Z >= ge) {
            ue(he, b, y, !0);
            continue;
          }
          let Oe;
          if (he.key != null) Oe = Y.get(he.key);
          else
            for (V = k; V <= M; V++)
              if (Ot[V - k] === 0 && At(he, f[V])) {
                Oe = V;
                break;
              }
          Oe === void 0
            ? ue(he, b, y, !0)
            : ((Ot[Oe - k] = v + 1),
              Oe >= bs ? (bs = Oe) : (ct = !0),
              S(he, f[Oe], h, null, b, y, P, x, w),
              Z++);
        }
        const ys = ct ? ll(Ot) : dt;
        for (V = ys.length - 1, v = ge - 1; v >= 0; v--) {
          const he = k + v,
            Oe = f[he],
            vs = he + 1 < I ? f[he + 1].el : m;
          Ot[v] === 0
            ? S(null, Oe, h, vs, b, y, P, x, w)
            : ct && (V < 0 || v !== ys[V] ? Ce(Oe, h, vs, 2) : V--);
        }
      }
    },
    Ce = (u, f, h, m, b = null) => {
      const { el: y, type: P, transition: x, children: w, shapeFlag: v } = u;
      if (v & 6) {
        Ce(u.component.subTree, f, h, m);
        return;
      }
      if (v & 128) {
        u.suspense.move(f, h, m);
        return;
      }
      if (v & 64) {
        P.move(u, f, h, R);
        return;
      }
      if (P === Te) {
        s(y, f, h);
        for (let O = 0; O < w.length; O++) Ce(w[O], f, h, m);
        s(u.anchor, f, h);
        return;
      }
      if (P === Cn) {
        K(u, f, h);
        return;
      }
      if (m !== 2 && v & 1 && x)
        if (m === 0) x.beforeEnter(y), s(y, f, h), fe(() => x.enter(y), b);
        else {
          const { leave: O, delayLeave: M, afterLeave: j } = x,
            k = () => s(y, f, h),
            Y = () => {
              O(y, () => {
                k(), j && j();
              });
            };
          M ? M(y, k, Y) : Y();
        }
      else s(y, f, h);
    },
    ue = (u, f, h, m = !1, b = !1) => {
      const {
        type: y,
        props: P,
        ref: x,
        children: w,
        dynamicChildren: v,
        shapeFlag: I,
        patchFlag: O,
        dirs: M,
      } = u;
      if ((x != null && Dn(x, null, h, u, !0), I & 256)) {
        f.ctx.deactivate(u);
        return;
      }
      const j = I & 1 && M,
        k = !tn(u);
      let Y;
      if ((k && (Y = P && P.onVnodeBeforeUnmount) && Ae(Y, f, u), I & 6))
        qt(u.component, h, m);
      else {
        if (I & 128) {
          u.suspense.unmount(h, m);
          return;
        }
        j && Je(u, null, f, "beforeUnmount"),
          I & 64
            ? u.type.remove(u, f, h, b, R, m)
            : v && (y !== Te || (O > 0 && O & 64))
            ? re(v, f, h, !1, !0)
            : ((y === Te && O & 384) || (!b && I & 16)) && re(w, f, h),
          m && it(u);
      }
      ((k && (Y = P && P.onVnodeUnmounted)) || j) &&
        fe(() => {
          Y && Ae(Y, f, u), j && Je(u, null, f, "unmounted");
        }, h);
    },
    it = (u) => {
      const { type: f, el: h, anchor: m, transition: b } = u;
      if (f === Te) {
        lt(h, m);
        return;
      }
      if (f === Cn) {
        N(u);
        return;
      }
      const y = () => {
        r(h), b && !b.persisted && b.afterLeave && b.afterLeave();
      };
      if (u.shapeFlag & 1 && b && !b.persisted) {
        const { leave: P, delayLeave: x } = b,
          w = () => P(h, y);
        x ? x(u.el, y, w) : w();
      } else y();
    },
    lt = (u, f) => {
      let h;
      for (; u !== f; ) (h = g(u)), r(u), (u = h);
      r(f);
    },
    qt = (u, f, h) => {
      const { bum: m, scope: b, update: y, subTree: P, um: x } = u;
      m && wn(m),
        b.stop(),
        y && ((y.active = !1), ue(P, u, f, h)),
        x && fe(x, f),
        fe(() => {
          u.isUnmounted = !0;
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          u.asyncDep &&
          !u.asyncResolved &&
          u.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve());
    },
    re = (u, f, h, m = !1, b = !1, y = 0) => {
      for (let P = y; P < u.length; P++) ue(u[P], f, h, m, b);
    },
    _ = (u) =>
      u.shapeFlag & 6
        ? _(u.component.subTree)
        : u.shapeFlag & 128
        ? u.suspense.next()
        : g(u.anchor || u.el),
    C = (u, f, h) => {
      u == null
        ? f._vnode && ue(f._vnode, null, null, !0)
        : S(f._vnode || null, u, f, null, null, null, h),
        Ts(),
        Br(),
        (f._vnode = u);
    },
    R = {
      p: S,
      um: ue,
      m: Ce,
      r: it,
      mt: Ct,
      mc: $e,
      pc: W,
      pbc: Re,
      n: _,
      o: e,
    };
  let T, z;
  return t && ([T, z] = t(R)), { render: C, hydrate: T, createApp: Gi(C, T) };
}
function Xe({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function ro(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (H(s) && H(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let c = r[o];
      c.shapeFlag & 1 &&
        !c.dynamicChildren &&
        ((c.patchFlag <= 0 || c.patchFlag === 32) &&
          ((c = r[o] = We(r[o])), (c.el = i.el)),
        n || ro(i, c)),
        c.type === yn && (c.el = i.el);
    }
}
function ll(e) {
  const t = e.slice(),
    n = [0];
  let s, r, o, i, c;
  const l = e.length;
  for (s = 0; s < l; s++) {
    const a = e[s];
    if (a !== 0) {
      if (((r = n[n.length - 1]), e[r] < a)) {
        (t[s] = r), n.push(s);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (c = (o + i) >> 1), e[n[c]] < a ? (o = c + 1) : (i = c);
      a < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
const cl = (e) => e.__isTeleport,
  Te = Symbol.for("v-fgt"),
  yn = Symbol.for("v-txt"),
  kt = Symbol.for("v-cmt"),
  Cn = Symbol.for("v-stc"),
  $t = [];
let ye = null;
function tt(e = !1) {
  $t.push((ye = e ? null : []));
}
function ul() {
  $t.pop(), (ye = $t[$t.length - 1] || null);
}
let Ut = 1;
function ks(e) {
  Ut += e;
}
function fl(e) {
  return (
    (e.dynamicChildren = Ut > 0 ? ye || dt : null),
    ul(),
    Ut > 0 && ye && ye.push(e),
    e
  );
}
function nt(e, t, n, s, r, o) {
  return fl(_t(e, t, n, s, r, o, !0));
}
function Wn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function At(e, t) {
  return e.type === t.type && e.key === t.key;
}
const vn = "__vInternal",
  oo = ({ key: e }) => e ?? null,
  sn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? G(e) || ie(e) || B(e)
        ? { i: be, r: e, k: t, f: !!n }
        : e
      : null
  );
function _t(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  o = e === Te ? 0 : 1,
  i = !1,
  c = !1
) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && oo(t),
    ref: t && sn(t),
    scopeId: Kr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: be,
  };
  return (
    c
      ? (hs(l, n), o & 128 && e.normalize(l))
      : n && (l.shapeFlag |= G(n) ? 8 : 16),
    Ut > 0 &&
      !i &&
      ye &&
      (l.patchFlag > 0 || o & 6) &&
      l.patchFlag !== 32 &&
      ye.push(l),
    l
  );
}
const ae = al;
function al(e, t = null, n = null, s = 0, r = null, o = !1) {
  if (((!e || e === Di) && (e = kt), Wn(e))) {
    const c = yt(e, t, !0);
    return (
      n && hs(c, n),
      Ut > 0 &&
        !o &&
        ye &&
        (c.shapeFlag & 6 ? (ye[ye.indexOf(e)] = c) : ye.push(c)),
      (c.patchFlag |= -2),
      c
    );
  }
  if ((xl(e) && (e = e.__vccOpts), t)) {
    t = dl(t);
    let { class: c, style: l } = t;
    c && !G(c) && (t.class = ts(c)),
      X(l) && (Sr(l) && !H(l) && (l = te({}, l)), (t.style = es(l)));
  }
  const i = G(e) ? 1 : Ai(e) ? 128 : cl(e) ? 64 : X(e) ? 4 : B(e) ? 2 : 0;
  return _t(e, t, n, s, r, i, o, !0);
}
function dl(e) {
  return e ? (Sr(e) || vn in e ? te({}, e) : e) : null;
}
function yt(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e,
    c = t ? hl(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && oo(c),
    ref:
      t && t.ref ? (n && r ? (H(r) ? r.concat(sn(t)) : [r, sn(t)]) : sn(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Te ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && yt(e.ssContent),
    ssFallback: e.ssFallback && yt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function io(e = " ", t = 0) {
  return ae(yn, null, e, t);
}
function Se(e) {
  return e == null || typeof e == "boolean"
    ? ae(kt)
    : H(e)
    ? ae(Te, null, e.slice())
    : typeof e == "object"
    ? We(e)
    : ae(yn, null, String(e));
}
function We(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : yt(e);
}
function hs(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (H(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), hs(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(vn in t)
        ? (t._ctx = be)
        : r === 3 &&
          be &&
          (be.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    B(t)
      ? ((t = { default: t, _ctx: be }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [io(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function hl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = ts([t.class, s.class]));
      else if (r === "style") t.style = es([t.style, s.style]);
      else if (an(r)) {
        const o = t[r],
          i = s[r];
        i &&
          o !== i &&
          !(H(o) && o.includes(i)) &&
          (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Ae(e, t, n, s = null) {
  Ee(e, t, 7, [n, s]);
}
const pl = Zr();
let gl = 0;
function ml(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || pl,
    o = {
      uid: gl++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Ho(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: eo(s, r),
      emitsOptions: Ur(s, r),
      emit: null,
      emitted: null,
      propsDefaults: J,
      inheritAttrs: s.inheritAttrs,
      ctx: J,
      data: J,
      props: J,
      attrs: J,
      slots: J,
      refs: J,
      setupState: J,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = wi.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let ne = null,
  ps,
  ut,
  Us = "__VUE_INSTANCE_SETTERS__";
(ut = Mn()[Us]) || (ut = Mn()[Us] = []),
  ut.push((e) => (ne = e)),
  (ps = (e) => {
    ut.length > 1 ? ut.forEach((t) => t(e)) : ut[0](e);
  });
const vt = (e) => {
    ps(e), e.scope.on();
  },
  st = () => {
    ne && ne.scope.off(), ps(null);
  };
function lo(e) {
  return e.vnode.shapeFlag & 4;
}
let Kt = !1;
function _l(e, t = !1) {
  Kt = t;
  const { props: n, children: s } = e.vnode,
    r = lo(e);
  el(e, n, r, t), sl(e, s);
  const o = r ? bl(e, t) : void 0;
  return (Kt = !1), o;
}
function bl(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Ir(new Proxy(e.ctx, qi)));
  const { setup: s } = n;
  if (s) {
    const r = (e.setupContext = s.length > 1 ? vl(e) : null);
    vt(e), Rt();
    const o = Ve(s, e, 0, [e.props, r]);
    if ((Pt(), st(), pr(o))) {
      if ((o.then(st, st), t))
        return o
          .then((i) => {
            Ks(e, i, t);
          })
          .catch((i) => {
            mn(i, e, 0);
          });
      e.asyncDep = o;
    } else Ks(e, o, t);
  } else co(e, t);
}
function Ks(e, t, n) {
  B(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : X(t) && (e.setupState = Nr(t)),
    co(e, n);
}
let Ds;
function co(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Ds && !s.render) {
      const r = s.template || as(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: c, compilerOptions: l } = s,
          a = te(te({ isCustomElement: o, delimiters: c }, i), l);
        s.render = Ds(r, a);
      }
    }
    e.render = s.render || ve;
  }
  vt(e), Rt(), Vi(e), Pt(), st();
}
function yl(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return de(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function vl(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return yl(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function gs(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Nr(Ir(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Mt) return Mt[n](e);
        },
        has(t, n) {
          return n in t || n in Mt;
        },
      }))
    );
}
function El(e, t = !0) {
  return B(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function xl(e) {
  return B(e) && "__vccOpts" in e;
}
const pe = (e, t) => _i(e, t, Kt);
function uo(e, t, n) {
  const s = arguments.length;
  return s === 2
    ? X(t) && !H(t)
      ? Wn(t)
        ? ae(e, null, [t])
        : ae(e, t)
      : ae(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && Wn(n) && (n = [n]),
      ae(e, t, n));
}
const wl = Symbol.for("v-scx"),
  Rl = () => je(wl),
  Pl = "3.3.2",
  Cl = "http://www.w3.org/2000/svg",
  Ge = typeof document < "u" ? document : null,
  Ws = Ge && Ge.createElement("template"),
  Ol = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r = t
        ? Ge.createElementNS(Cl, e)
        : Ge.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      );
    },
    createText: (e) => Ge.createTextNode(e),
    createComment: (e) => Ge.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Ge.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, r, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (r && (r === o || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === o || !(r = r.nextSibling));

        );
      else {
        Ws.innerHTML = s ? `<svg>${e}</svg>` : e;
        const c = Ws.content;
        if (s) {
          const l = c.firstChild;
          for (; l.firstChild; ) c.appendChild(l.firstChild);
          c.removeChild(l);
        }
        t.insertBefore(c, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Al(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Tl(e, t, n) {
  const s = e.style,
    r = G(n);
  if (n && !r) {
    if (t && !G(t)) for (const o in t) n[o] == null && zn(s, o, "");
    for (const o in n) zn(s, o, n[o]);
  } else {
    const o = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (s.display = o);
  }
}
const zs = /\s*!important$/;
function zn(e, t, n) {
  if (H(n)) n.forEach((s) => zn(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = Sl(e, t);
    zs.test(n)
      ? e.setProperty(wt(s), n.replace(zs, ""), "important")
      : (e[s] = n);
  }
}
const qs = ["Webkit", "Moz", "ms"],
  On = {};
function Sl(e, t) {
  const n = On[t];
  if (n) return n;
  let s = Me(t);
  if (s !== "filter" && s in e) return (On[t] = s);
  s = pn(s);
  for (let r = 0; r < qs.length; r++) {
    const o = qs[r] + s;
    if (o in e) return (On[t] = o);
  }
  return t;
}
const Vs = "http://www.w3.org/1999/xlink";
function Il(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Vs, t.slice(6, t.length))
      : e.setAttributeNS(Vs, t, n);
  else {
    const o = Fo(t);
    n == null || (o && !_r(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function Ml(e, t, n, s, r, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, r, o), (e[t] = n ?? "");
    return;
  }
  const c = e.tagName;
  if (t === "value" && c !== "PROGRESS" && !c.includes("-")) {
    e._value = n;
    const a = c === "OPTION" ? e.getAttribute("value") : e.value,
      d = n ?? "";
    a !== d && (e.value = d), n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean"
      ? (n = _r(n))
      : n == null && a === "string"
      ? ((n = ""), (l = !0))
      : a === "number" && ((n = 0), (l = !0));
  }
  try {
    e[t] = n;
  } catch {}
  l && e.removeAttribute(t);
}
function $l(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Fl(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Nl(e, t, n, s, r = null) {
  const o = e._vei || (e._vei = {}),
    i = o[t];
  if (s && i) i.value = s;
  else {
    const [c, l] = Hl(t);
    if (s) {
      const a = (o[t] = Bl(s, r));
      $l(e, c, a, l);
    } else i && (Fl(e, c, i, l), (o[t] = void 0));
  }
}
const Qs = /(?:Once|Passive|Capture)$/;
function Hl(e) {
  let t;
  if (Qs.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(Qs)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : wt(e.slice(2)), t];
}
let An = 0;
const jl = Promise.resolve(),
  Ll = () => An || (jl.then(() => (An = 0)), (An = Date.now()));
function Bl(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    Ee(kl(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = Ll()), n;
}
function kl(e, t) {
  if (H(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    );
  } else return t;
}
const Ys = /^on[a-z]/,
  Ul = (e, t, n, s, r = !1, o, i, c, l) => {
    t === "class"
      ? Al(e, s, r)
      : t === "style"
      ? Tl(e, n, s)
      : an(t)
      ? Jn(t) || Nl(e, t, n, s, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Kl(e, t, s, r)
        )
      ? Ml(e, t, s, o, i, c, l)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        Il(e, t, s, r));
  };
function Kl(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Ys.test(t) && B(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Ys.test(t) && G(n))
    ? !1
    : t in e;
}
const Dl = te({ patchProp: Ul }, Ol);
let Js;
function Wl() {
  return Js || (Js = ol(Dl));
}
const zl = (...e) => {
  const t = Wl().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = ql(s);
      if (!r) return;
      const o = t._component;
      !B(o) && !o.render && !o.template && (o.template = r.innerHTML),
        (r.innerHTML = "");
      const i = n(r, !1, r instanceof SVGElement);
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function ql(e) {
  return G(e) ? document.querySelector(e) : e;
}
const zt = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n;
  },
  Vl = { props: { links: Array } },
  Ql = { class: "header" },
  Yl = { class: "container" },
  Jl = { class: "header__nav" },
  Xl = _t("a", { href: "", class: "logo" }, "Vue-Router", -1),
  Zl = { class: "header__list" };
function Gl(e, t, n, s, r, o) {
  const i = Ln("router-link");
  return (
    tt(),
    nt("header", Ql, [
      _t("div", Yl, [
        _t("div", Jl, [
          Xl,
          _t("ul", Zl, [
            (tt(!0),
            nt(
              Te,
              null,
              zi(
                n.links,
                (c, l) => (
                  tt(),
                  nt("li", { key: l }, [
                    ae(
                      i,
                      { to: c.url, class: "header__link" },
                      { default: Dr(() => [io(No(c.title), 1)]), _: 2 },
                      1032,
                      ["to"]
                    ),
                  ])
                )
              ),
              128
            )),
          ]),
        ]),
      ]),
    ])
  );
}
const ec = zt(Vl, [["render", Gl]]),
  tc = {
    components: { Header: ec },
    data() {
      return {
        links: [
          { title: "Home", url: "/" },
          { title: "About", url: "/about" },
          { title: "Cars", url: "/cars" },
        ],
      };
    },
  },
  nc = { class: "wrapper" };
function sc(e, t, n, s, r, o) {
  const i = Ln("Header"),
    c = Ln("router-view");
  return (
    tt(), nt("div", nc, [ae(i, { links: r.links }, null, 8, ["links"]), ae(c)])
  );
}
const rc = zt(tc, [["render", sc]]);
/*!
 * vue-router v4.2.0
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const ft = typeof window < "u";
function oc(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const q = Object.assign;
function Tn(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = xe(r) ? r.map(e) : e(r);
  }
  return n;
}
const Ft = () => {},
  xe = Array.isArray,
  ic = /\/$/,
  lc = (e) => e.replace(ic, "");
function Sn(e, t, n = "/") {
  let s,
    r = {},
    o = "",
    i = "";
  const c = t.indexOf("#");
  let l = t.indexOf("?");
  return (
    c < l && c >= 0 && (l = -1),
    l > -1 &&
      ((s = t.slice(0, l)),
      (o = t.slice(l + 1, c > -1 ? c : t.length)),
      (r = e(o))),
    c > -1 && ((s = s || t.slice(0, c)), (i = t.slice(c, t.length))),
    (s = ac(s ?? t, n)),
    { fullPath: s + (o && "?") + o + i, path: s, query: r, hash: i }
  );
}
function cc(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Xs(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function uc(e, t, n) {
  const s = t.matched.length - 1,
    r = n.matched.length - 1;
  return (
    s > -1 &&
    s === r &&
    Et(t.matched[s], n.matched[r]) &&
    fo(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function Et(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function fo(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!fc(e[n], t[n])) return !1;
  return !0;
}
function fc(e, t) {
  return xe(e) ? Zs(e, t) : xe(t) ? Zs(t, e) : e === t;
}
function Zs(e, t) {
  return xe(t)
    ? e.length === t.length && e.every((n, s) => n === t[s])
    : e.length === 1 && e[0] === t;
}
function ac(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    s = e.split("/"),
    r = s[s.length - 1];
  (r === ".." || r === ".") && s.push("");
  let o = n.length - 1,
    i,
    c;
  for (i = 0; i < s.length; i++)
    if (((c = s[i]), c !== "."))
      if (c === "..") o > 1 && o--;
      else break;
  return (
    n.slice(0, o).join("/") +
    "/" +
    s.slice(i - (i === s.length ? 1 : 0)).join("/")
  );
}
var Dt;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(Dt || (Dt = {}));
var Nt;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(Nt || (Nt = {}));
function dc(e) {
  if (!e)
    if (ft) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), lc(e);
}
const hc = /^[^#]+#/;
function pc(e, t) {
  return e.replace(hc, "#") + t;
}
function gc(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0),
  };
}
const En = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function mc(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      s = typeof n == "string" && n.startsWith("#"),
      r =
        typeof n == "string"
          ? s
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!r) return;
    t = gc(r, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function Gs(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const qn = new Map();
function _c(e, t) {
  qn.set(e, t);
}
function bc(e) {
  const t = qn.get(e);
  return qn.delete(e), t;
}
let yc = () => location.protocol + "//" + location.host;
function ao(e, t) {
  const { pathname: n, search: s, hash: r } = t,
    o = e.indexOf("#");
  if (o > -1) {
    let c = r.includes(e.slice(o)) ? e.slice(o).length : 1,
      l = r.slice(c);
    return l[0] !== "/" && (l = "/" + l), Xs(l, "");
  }
  return Xs(n, e) + s + r;
}
function vc(e, t, n, s) {
  let r = [],
    o = [],
    i = null;
  const c = ({ state: g }) => {
    const E = ao(e, location),
      A = n.value,
      S = t.value;
    let L = 0;
    if (g) {
      if (((n.value = E), (t.value = g), i && i === A)) {
        i = null;
        return;
      }
      L = S ? g.position - S.position : 0;
    } else s(E);
    r.forEach(($) => {
      $(n.value, A, {
        delta: L,
        type: Dt.pop,
        direction: L ? (L > 0 ? Nt.forward : Nt.back) : Nt.unknown,
      });
    });
  };
  function l() {
    i = n.value;
  }
  function a(g) {
    r.push(g);
    const E = () => {
      const A = r.indexOf(g);
      A > -1 && r.splice(A, 1);
    };
    return o.push(E), E;
  }
  function d() {
    const { history: g } = window;
    g.state && g.replaceState(q({}, g.state, { scroll: En() }), "");
  }
  function p() {
    for (const g of o) g();
    (o = []),
      window.removeEventListener("popstate", c),
      window.removeEventListener("beforeunload", d);
  }
  return (
    window.addEventListener("popstate", c),
    window.addEventListener("beforeunload", d, { passive: !0 }),
    { pauseListeners: l, listen: a, destroy: p }
  );
}
function er(e, t, n, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: r ? En() : null,
  };
}
function Ec(e) {
  const { history: t, location: n } = window,
    s = { value: ao(e, n) },
    r = { value: t.state };
  r.value ||
    o(
      s.value,
      {
        back: null,
        current: s.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function o(l, a, d) {
    const p = e.indexOf("#"),
      g =
        p > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(p)) + l
          : yc() + e + l;
    try {
      t[d ? "replaceState" : "pushState"](a, "", g), (r.value = a);
    } catch (E) {
      console.error(E), n[d ? "replace" : "assign"](g);
    }
  }
  function i(l, a) {
    const d = q({}, t.state, er(r.value.back, l, r.value.forward, !0), a, {
      position: r.value.position,
    });
    o(l, d, !0), (s.value = l);
  }
  function c(l, a) {
    const d = q({}, r.value, t.state, { forward: l, scroll: En() });
    o(d.current, d, !0);
    const p = q({}, er(s.value, l, null), { position: d.position + 1 }, a);
    o(l, p, !1), (s.value = l);
  }
  return { location: s, state: r, push: c, replace: i };
}
function xc(e) {
  e = dc(e);
  const t = Ec(e),
    n = vc(e, t.state, t.location, t.replace);
  function s(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const r = q(
    { location: "", base: e, go: s, createHref: pc.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(r, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(r, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    r
  );
}
function wc(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function ho(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const De = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  po = Symbol("");
var tr;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(tr || (tr = {}));
function xt(e, t) {
  return q(new Error(), { type: e, [po]: !0 }, t);
}
function Ne(e, t) {
  return e instanceof Error && po in e && (t == null || !!(e.type & t));
}
const nr = "[^/]+?",
  Rc = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Pc = /[.+*?^${}()[\]/\\]/g;
function Cc(e, t) {
  const n = q({}, Rc, t),
    s = [];
  let r = n.start ? "^" : "";
  const o = [];
  for (const a of e) {
    const d = a.length ? [] : [90];
    n.strict && !a.length && (r += "/");
    for (let p = 0; p < a.length; p++) {
      const g = a[p];
      let E = 40 + (n.sensitive ? 0.25 : 0);
      if (g.type === 0)
        p || (r += "/"), (r += g.value.replace(Pc, "\\$&")), (E += 40);
      else if (g.type === 1) {
        const { value: A, repeatable: S, optional: L, regexp: $ } = g;
        o.push({ name: A, repeatable: S, optional: L });
        const F = $ || nr;
        if (F !== nr) {
          E += 10;
          try {
            new RegExp(`(${F})`);
          } catch (N) {
            throw new Error(
              `Invalid custom RegExp for param "${A}" (${F}): ` + N.message
            );
          }
        }
        let K = S ? `((?:${F})(?:/(?:${F}))*)` : `(${F})`;
        p || (K = L && a.length < 2 ? `(?:/${K})` : "/" + K),
          L && (K += "?"),
          (r += K),
          (E += 20),
          L && (E += -8),
          S && (E += -20),
          F === ".*" && (E += -50);
      }
      d.push(E);
    }
    s.push(d);
  }
  if (n.strict && n.end) {
    const a = s.length - 1;
    s[a][s[a].length - 1] += 0.7000000000000001;
  }
  n.strict || (r += "/?"), n.end ? (r += "$") : n.strict && (r += "(?:/|$)");
  const i = new RegExp(r, n.sensitive ? "" : "i");
  function c(a) {
    const d = a.match(i),
      p = {};
    if (!d) return null;
    for (let g = 1; g < d.length; g++) {
      const E = d[g] || "",
        A = o[g - 1];
      p[A.name] = E && A.repeatable ? E.split("/") : E;
    }
    return p;
  }
  function l(a) {
    let d = "",
      p = !1;
    for (const g of e) {
      (!p || !d.endsWith("/")) && (d += "/"), (p = !1);
      for (const E of g)
        if (E.type === 0) d += E.value;
        else if (E.type === 1) {
          const { value: A, repeatable: S, optional: L } = E,
            $ = A in a ? a[A] : "";
          if (xe($) && !S)
            throw new Error(
              `Provided param "${A}" is an array but it is not repeatable (* or + modifiers)`
            );
          const F = xe($) ? $.join("/") : $;
          if (!F)
            if (L)
              g.length < 2 &&
                (d.endsWith("/") ? (d = d.slice(0, -1)) : (p = !0));
            else throw new Error(`Missing required param "${A}"`);
          d += F;
        }
    }
    return d || "/";
  }
  return { re: i, score: s, keys: o, parse: c, stringify: l };
}
function Oc(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s) return s;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function Ac(e, t) {
  let n = 0;
  const s = e.score,
    r = t.score;
  for (; n < s.length && n < r.length; ) {
    const o = Oc(s[n], r[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (sr(s)) return 1;
    if (sr(r)) return -1;
  }
  return r.length - s.length;
}
function sr(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Tc = { type: 0, value: "" },
  Sc = /[a-zA-Z0-9_]/;
function Ic(e) {
  if (!e) return [[]];
  if (e === "/") return [[Tc]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(E) {
    throw new Error(`ERR (${n})/"${a}": ${E}`);
  }
  let n = 0,
    s = n;
  const r = [];
  let o;
  function i() {
    o && r.push(o), (o = []);
  }
  let c = 0,
    l,
    a = "",
    d = "";
  function p() {
    a &&
      (n === 0
        ? o.push({ type: 0, value: a })
        : n === 1 || n === 2 || n === 3
        ? (o.length > 1 &&
            (l === "*" || l === "+") &&
            t(
              `A repeatable param (${a}) must be alone in its segment. eg: '/:ids+.`
            ),
          o.push({
            type: 1,
            value: a,
            regexp: d,
            repeatable: l === "*" || l === "+",
            optional: l === "*" || l === "?",
          }))
        : t("Invalid state to consume buffer"),
      (a = ""));
  }
  function g() {
    a += l;
  }
  for (; c < e.length; ) {
    if (((l = e[c++]), l === "\\" && n !== 2)) {
      (s = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        l === "/" ? (a && p(), i()) : l === ":" ? (p(), (n = 1)) : g();
        break;
      case 4:
        g(), (n = s);
        break;
      case 1:
        l === "("
          ? (n = 2)
          : Sc.test(l)
          ? g()
          : (p(), (n = 0), l !== "*" && l !== "?" && l !== "+" && c--);
        break;
      case 2:
        l === ")"
          ? d[d.length - 1] == "\\"
            ? (d = d.slice(0, -1) + l)
            : (n = 3)
          : (d += l);
        break;
      case 3:
        p(), (n = 0), l !== "*" && l !== "?" && l !== "+" && c--, (d = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${a}"`), p(), i(), r;
}
function Mc(e, t, n) {
  const s = Cc(Ic(e.path), n),
    r = q(s, { record: e, parent: t, children: [], alias: [] });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function $c(e, t) {
  const n = [],
    s = new Map();
  t = ir({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(d) {
    return s.get(d);
  }
  function o(d, p, g) {
    const E = !g,
      A = Fc(d);
    A.aliasOf = g && g.record;
    const S = ir(t, d),
      L = [A];
    if ("alias" in d) {
      const K = typeof d.alias == "string" ? [d.alias] : d.alias;
      for (const N of K)
        L.push(
          q({}, A, {
            components: g ? g.record.components : A.components,
            path: N,
            aliasOf: g ? g.record : A,
          })
        );
    }
    let $, F;
    for (const K of L) {
      const { path: N } = K;
      if (p && N[0] !== "/") {
        const se = p.record.path,
          le = se[se.length - 1] === "/" ? "" : "/";
        K.path = p.record.path + (N && le + N);
      }
      if (
        (($ = Mc(K, p, S)),
        g
          ? g.alias.push($)
          : ((F = F || $),
            F !== $ && F.alias.push($),
            E && d.name && !or($) && i(d.name)),
        A.children)
      ) {
        const se = A.children;
        for (let le = 0; le < se.length; le++)
          o(se[le], $, g && g.children[le]);
      }
      (g = g || $),
        (($.record.components && Object.keys($.record.components).length) ||
          $.record.name ||
          $.record.redirect) &&
          l($);
    }
    return F
      ? () => {
          i(F);
        }
      : Ft;
  }
  function i(d) {
    if (ho(d)) {
      const p = s.get(d);
      p &&
        (s.delete(d),
        n.splice(n.indexOf(p), 1),
        p.children.forEach(i),
        p.alias.forEach(i));
    } else {
      const p = n.indexOf(d);
      p > -1 &&
        (n.splice(p, 1),
        d.record.name && s.delete(d.record.name),
        d.children.forEach(i),
        d.alias.forEach(i));
    }
  }
  function c() {
    return n;
  }
  function l(d) {
    let p = 0;
    for (
      ;
      p < n.length &&
      Ac(d, n[p]) >= 0 &&
      (d.record.path !== n[p].record.path || !go(d, n[p]));

    )
      p++;
    n.splice(p, 0, d), d.record.name && !or(d) && s.set(d.record.name, d);
  }
  function a(d, p) {
    let g,
      E = {},
      A,
      S;
    if ("name" in d && d.name) {
      if (((g = s.get(d.name)), !g)) throw xt(1, { location: d });
      (S = g.record.name),
        (E = q(
          rr(
            p.params,
            g.keys.filter((F) => !F.optional).map((F) => F.name)
          ),
          d.params &&
            rr(
              d.params,
              g.keys.map((F) => F.name)
            )
        )),
        (A = g.stringify(E));
    } else if ("path" in d)
      (A = d.path),
        (g = n.find((F) => F.re.test(A))),
        g && ((E = g.parse(A)), (S = g.record.name));
    else {
      if (((g = p.name ? s.get(p.name) : n.find((F) => F.re.test(p.path))), !g))
        throw xt(1, { location: d, currentLocation: p });
      (S = g.record.name),
        (E = q({}, p.params, d.params)),
        (A = g.stringify(E));
    }
    const L = [];
    let $ = g;
    for (; $; ) L.unshift($.record), ($ = $.parent);
    return { name: S, path: A, params: E, matched: L, meta: Hc(L) };
  }
  return (
    e.forEach((d) => o(d)),
    {
      addRoute: o,
      resolve: a,
      removeRoute: i,
      getRoutes: c,
      getRecordMatcher: r,
    }
  );
}
function rr(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function Fc(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Nc(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function Nc(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const s in e.components) t[s] = typeof n == "boolean" ? n : n[s];
  return t;
}
function or(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Hc(e) {
  return e.reduce((t, n) => q(t, n.meta), {});
}
function ir(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
function go(e, t) {
  return t.children.some((n) => n === e || go(e, n));
}
const mo = /#/g,
  jc = /&/g,
  Lc = /\//g,
  Bc = /=/g,
  kc = /\?/g,
  _o = /\+/g,
  Uc = /%5B/g,
  Kc = /%5D/g,
  bo = /%5E/g,
  Dc = /%60/g,
  yo = /%7B/g,
  Wc = /%7C/g,
  vo = /%7D/g,
  zc = /%20/g;
function ms(e) {
  return encodeURI("" + e)
    .replace(Wc, "|")
    .replace(Uc, "[")
    .replace(Kc, "]");
}
function qc(e) {
  return ms(e).replace(yo, "{").replace(vo, "}").replace(bo, "^");
}
function Vn(e) {
  return ms(e)
    .replace(_o, "%2B")
    .replace(zc, "+")
    .replace(mo, "%23")
    .replace(jc, "%26")
    .replace(Dc, "`")
    .replace(yo, "{")
    .replace(vo, "}")
    .replace(bo, "^");
}
function Vc(e) {
  return Vn(e).replace(Bc, "%3D");
}
function Qc(e) {
  return ms(e).replace(mo, "%23").replace(kc, "%3F");
}
function Yc(e) {
  return e == null ? "" : Qc(e).replace(Lc, "%2F");
}
function fn(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function Jc(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const s = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < s.length; ++r) {
    const o = s[r].replace(_o, " "),
      i = o.indexOf("="),
      c = fn(i < 0 ? o : o.slice(0, i)),
      l = i < 0 ? null : fn(o.slice(i + 1));
    if (c in t) {
      let a = t[c];
      xe(a) || (a = t[c] = [a]), a.push(l);
    } else t[c] = l;
  }
  return t;
}
function lr(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (((n = Vc(n)), s == null)) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (xe(s) ? s.map((o) => o && Vn(o)) : [s && Vn(s)]).forEach((o) => {
      o !== void 0 &&
        ((t += (t.length ? "&" : "") + n), o != null && (t += "=" + o));
    });
  }
  return t;
}
function Xc(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 &&
      (t[n] = xe(s)
        ? s.map((r) => (r == null ? null : "" + r))
        : s == null
        ? s
        : "" + s);
  }
  return t;
}
const Zc = Symbol(""),
  cr = Symbol(""),
  _s = Symbol(""),
  Eo = Symbol(""),
  Qn = Symbol("");
function Tt() {
  let e = [];
  function t(s) {
    return (
      e.push(s),
      () => {
        const r = e.indexOf(s);
        r > -1 && e.splice(r, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e, reset: n };
}
function ze(e, t, n, s, r) {
  const o = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () =>
    new Promise((i, c) => {
      const l = (p) => {
          p === !1
            ? c(xt(4, { from: n, to: t }))
            : p instanceof Error
            ? c(p)
            : wc(p)
            ? c(xt(2, { from: t, to: p }))
            : (o &&
                s.enterCallbacks[r] === o &&
                typeof p == "function" &&
                o.push(p),
              i());
        },
        a = e.call(s && s.instances[r], t, n, l);
      let d = Promise.resolve(a);
      e.length < 3 && (d = d.then(l)), d.catch((p) => c(p));
    });
}
function In(e, t, n, s) {
  const r = [];
  for (const o of e)
    for (const i in o.components) {
      let c = o.components[i];
      if (!(t !== "beforeRouteEnter" && !o.instances[i]))
        if (Gc(c)) {
          const a = (c.__vccOpts || c)[t];
          a && r.push(ze(a, n, s, o, i));
        } else {
          let l = c();
          r.push(() =>
            l.then((a) => {
              if (!a)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${i}" at "${o.path}"`)
                );
              const d = oc(a) ? a.default : a;
              o.components[i] = d;
              const g = (d.__vccOpts || d)[t];
              return g && ze(g, n, s, o, i)();
            })
          );
        }
    }
  return r;
}
function Gc(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function ur(e) {
  const t = je(_s),
    n = je(Eo),
    s = pe(() => t.resolve(gt(e.to))),
    r = pe(() => {
      const { matched: l } = s.value,
        { length: a } = l,
        d = l[a - 1],
        p = n.matched;
      if (!d || !p.length) return -1;
      const g = p.findIndex(Et.bind(null, d));
      if (g > -1) return g;
      const E = fr(l[a - 2]);
      return a > 1 && fr(d) === E && p[p.length - 1].path !== E
        ? p.findIndex(Et.bind(null, l[a - 2]))
        : g;
    }),
    o = pe(() => r.value > -1 && su(n.params, s.value.params)),
    i = pe(
      () =>
        r.value > -1 &&
        r.value === n.matched.length - 1 &&
        fo(n.params, s.value.params)
    );
  function c(l = {}) {
    return nu(l)
      ? t[gt(e.replace) ? "replace" : "push"](gt(e.to)).catch(Ft)
      : Promise.resolve();
  }
  return {
    route: s,
    href: pe(() => s.value.href),
    isActive: o,
    isExactActive: i,
    navigate: c,
  };
}
const eu = qr({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: ur,
    setup(e, { slots: t }) {
      const n = Wt(ur(e)),
        { options: s } = je(_s),
        r = pe(() => ({
          [ar(e.activeClass, s.linkActiveClass, "router-link-active")]:
            n.isActive,
          [ar(
            e.exactActiveClass,
            s.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const o = t.default && t.default(n);
        return e.custom
          ? o
          : uo(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: r.value,
              },
              o
            );
      };
    },
  }),
  tu = eu;
function nu(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function su(e, t) {
  for (const n in t) {
    const s = t[n],
      r = e[n];
    if (typeof s == "string") {
      if (s !== r) return !1;
    } else if (!xe(r) || r.length !== s.length || s.some((o, i) => o !== r[i]))
      return !1;
  }
  return !0;
}
function fr(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const ar = (e, t, n) => e ?? t ?? n,
  ru = qr({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const s = je(Qn),
        r = pe(() => e.route || s.value),
        o = je(cr, 0),
        i = pe(() => {
          let a = gt(o);
          const { matched: d } = r.value;
          let p;
          for (; (p = d[a]) && !p.components; ) a++;
          return a;
        }),
        c = pe(() => r.value.matched[i.value]);
      nn(
        cr,
        pe(() => i.value + 1)
      ),
        nn(Zc, c),
        nn(Qn, r);
      const l = di();
      return (
        en(
          () => [l.value, c.value, e.name],
          ([a, d, p], [g, E, A]) => {
            d &&
              ((d.instances[p] = a),
              E &&
                E !== d &&
                a &&
                a === g &&
                (d.leaveGuards.size || (d.leaveGuards = E.leaveGuards),
                d.updateGuards.size || (d.updateGuards = E.updateGuards))),
              a &&
                d &&
                (!E || !Et(d, E) || !g) &&
                (d.enterCallbacks[p] || []).forEach((S) => S(a));
          },
          { flush: "post" }
        ),
        () => {
          const a = r.value,
            d = e.name,
            p = c.value,
            g = p && p.components[d];
          if (!g) return dr(n.default, { Component: g, route: a });
          const E = p.props[d],
            A = E
              ? E === !0
                ? a.params
                : typeof E == "function"
                ? E(a)
                : E
              : null,
            L = uo(
              g,
              q({}, A, t, {
                onVnodeUnmounted: ($) => {
                  $.component.isUnmounted && (p.instances[d] = null);
                },
                ref: l,
              })
            );
          return dr(n.default, { Component: L, route: a }) || L;
        }
      );
    },
  });
function dr(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const ou = ru;
function iu(e) {
  const t = $c(e.routes, e),
    n = e.parseQuery || Jc,
    s = e.stringifyQuery || lr,
    r = e.history,
    o = Tt(),
    i = Tt(),
    c = Tt(),
    l = hi(De);
  let a = De;
  ft &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const d = Tn.bind(null, (_) => "" + _),
    p = Tn.bind(null, Yc),
    g = Tn.bind(null, fn);
  function E(_, C) {
    let R, T;
    return (
      ho(_) ? ((R = t.getRecordMatcher(_)), (T = C)) : (T = _), t.addRoute(T, R)
    );
  }
  function A(_) {
    const C = t.getRecordMatcher(_);
    C && t.removeRoute(C);
  }
  function S() {
    return t.getRoutes().map((_) => _.record);
  }
  function L(_) {
    return !!t.getRecordMatcher(_);
  }
  function $(_, C) {
    if (((C = q({}, C || l.value)), typeof _ == "string")) {
      const h = Sn(n, _, C.path),
        m = t.resolve({ path: h.path }, C),
        b = r.createHref(h.fullPath);
      return q(h, m, {
        params: g(m.params),
        hash: fn(h.hash),
        redirectedFrom: void 0,
        href: b,
      });
    }
    let R;
    if ("path" in _) R = q({}, _, { path: Sn(n, _.path, C.path).path });
    else {
      const h = q({}, _.params);
      for (const m in h) h[m] == null && delete h[m];
      (R = q({}, _, { params: p(h) })), (C.params = p(C.params));
    }
    const T = t.resolve(R, C),
      z = _.hash || "";
    T.params = d(g(T.params));
    const u = cc(s, q({}, _, { hash: qc(z), path: T.path })),
      f = r.createHref(u);
    return q(
      { fullPath: u, hash: z, query: s === lr ? Xc(_.query) : _.query || {} },
      T,
      { redirectedFrom: void 0, href: f }
    );
  }
  function F(_) {
    return typeof _ == "string" ? Sn(n, _, l.value.path) : q({}, _);
  }
  function K(_, C) {
    if (a !== _) return xt(8, { from: C, to: _ });
  }
  function N(_) {
    return we(_);
  }
  function se(_) {
    return N(q(F(_), { replace: !0 }));
  }
  function le(_) {
    const C = _.matched[_.matched.length - 1];
    if (C && C.redirect) {
      const { redirect: R } = C;
      let T = typeof R == "function" ? R(_) : R;
      return (
        typeof T == "string" &&
          ((T = T.includes("?") || T.includes("#") ? (T = F(T)) : { path: T }),
          (T.params = {})),
        q(
          { query: _.query, hash: _.hash, params: "path" in T ? {} : _.params },
          T
        )
      );
    }
  }
  function we(_, C) {
    const R = (a = $(_)),
      T = l.value,
      z = _.state,
      u = _.force,
      f = _.replace === !0,
      h = le(R);
    if (h)
      return we(
        q(F(h), {
          state: typeof h == "object" ? q({}, z, h.state) : z,
          force: u,
          replace: f,
        }),
        C || R
      );
    const m = R;
    m.redirectedFrom = C;
    let b;
    return (
      !u && uc(s, T, R) && ((b = xt(16, { to: m, from: T })), Ce(T, T, !0, !1)),
      (b ? Promise.resolve(b) : Re(m, T))
        .catch((y) => (Ne(y) ? (Ne(y, 2) ? y : Ue(y)) : W(y, m, T)))
        .then((y) => {
          if (y) {
            if (Ne(y, 2))
              return we(
                q({ replace: f }, F(y.to), {
                  state: typeof y.to == "object" ? q({}, z, y.to.state) : z,
                  force: u,
                }),
                C || m
              );
          } else y = Ye(m, T, !0, f, z);
          return ke(m, T, y), y;
        })
    );
  }
  function $e(_, C) {
    const R = K(_, C);
    return R ? Promise.reject(R) : Promise.resolve();
  }
  function rt(_) {
    const C = lt.values().next().value;
    return C && typeof C.runWithContext == "function"
      ? C.runWithContext(_)
      : _();
  }
  function Re(_, C) {
    let R;
    const [T, z, u] = lu(_, C);
    R = In(T.reverse(), "beforeRouteLeave", _, C);
    for (const h of T)
      h.leaveGuards.forEach((m) => {
        R.push(ze(m, _, C));
      });
    const f = $e.bind(null, _, C);
    return (
      R.push(f),
      re(R)
        .then(() => {
          R = [];
          for (const h of o.list()) R.push(ze(h, _, C));
          return R.push(f), re(R);
        })
        .then(() => {
          R = In(z, "beforeRouteUpdate", _, C);
          for (const h of z)
            h.updateGuards.forEach((m) => {
              R.push(ze(m, _, C));
            });
          return R.push(f), re(R);
        })
        .then(() => {
          R = [];
          for (const h of _.matched)
            if (h.beforeEnter && !C.matched.includes(h))
              if (xe(h.beforeEnter))
                for (const m of h.beforeEnter) R.push(ze(m, _, C));
              else R.push(ze(h.beforeEnter, _, C));
          return R.push(f), re(R);
        })
        .then(
          () => (
            _.matched.forEach((h) => (h.enterCallbacks = {})),
            (R = In(u, "beforeRouteEnter", _, C)),
            R.push(f),
            re(R)
          )
        )
        .then(() => {
          R = [];
          for (const h of i.list()) R.push(ze(h, _, C));
          return R.push(f), re(R);
        })
        .catch((h) => (Ne(h, 8) ? h : Promise.reject(h)))
    );
  }
  function ke(_, C, R) {
    for (const T of c.list()) rt(() => T(_, C, R));
  }
  function Ye(_, C, R, T, z) {
    const u = K(_, C);
    if (u) return u;
    const f = C === De,
      h = ft ? history.state : {};
    R &&
      (T || f
        ? r.replace(_.fullPath, q({ scroll: f && h && h.scroll }, z))
        : r.push(_.fullPath, z)),
      (l.value = _),
      Ce(_, C, R, f),
      Ue();
  }
  let Pe;
  function Ct() {
    Pe ||
      (Pe = r.listen((_, C, R) => {
        if (!qt.listening) return;
        const T = $(_),
          z = le(T);
        if (z) {
          we(q(z, { replace: !0 }), T).catch(Ft);
          return;
        }
        a = T;
        const u = l.value;
        ft && _c(Gs(u.fullPath, R.delta), En()),
          Re(T, u)
            .catch((f) =>
              Ne(f, 12)
                ? f
                : Ne(f, 2)
                ? (we(f.to, T)
                    .then((h) => {
                      Ne(h, 20) &&
                        !R.delta &&
                        R.type === Dt.pop &&
                        r.go(-1, !1);
                    })
                    .catch(Ft),
                  Promise.reject())
                : (R.delta && r.go(-R.delta, !1), W(f, T, u))
            )
            .then((f) => {
              (f = f || Ye(T, u, !1)),
                f &&
                  (R.delta && !Ne(f, 8)
                    ? r.go(-R.delta, !1)
                    : R.type === Dt.pop && Ne(f, 20) && r.go(-1, !1)),
                ke(T, u, f);
            })
            .catch(Ft);
      }));
  }
  let ot = Tt(),
    ee = Tt(),
    Q;
  function W(_, C, R) {
    Ue(_);
    const T = ee.list();
    return (
      T.length ? T.forEach((z) => z(_, C, R)) : console.error(_),
      Promise.reject(_)
    );
  }
  function Fe() {
    return Q && l.value !== De
      ? Promise.resolve()
      : new Promise((_, C) => {
          ot.add([_, C]);
        });
  }
  function Ue(_) {
    return (
      Q ||
        ((Q = !_),
        Ct(),
        ot.list().forEach(([C, R]) => (_ ? R(_) : C())),
        ot.reset()),
      _
    );
  }
  function Ce(_, C, R, T) {
    const { scrollBehavior: z } = e;
    if (!ft || !z) return Promise.resolve();
    const u =
      (!R && bc(Gs(_.fullPath, 0))) ||
      ((T || !R) && history.state && history.state.scroll) ||
      null;
    return jr()
      .then(() => z(_, C, u))
      .then((f) => f && mc(f))
      .catch((f) => W(f, _, C));
  }
  const ue = (_) => r.go(_);
  let it;
  const lt = new Set(),
    qt = {
      currentRoute: l,
      listening: !0,
      addRoute: E,
      removeRoute: A,
      hasRoute: L,
      getRoutes: S,
      resolve: $,
      options: e,
      push: N,
      replace: se,
      go: ue,
      back: () => ue(-1),
      forward: () => ue(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: c.add,
      onError: ee.add,
      isReady: Fe,
      install(_) {
        const C = this;
        _.component("RouterLink", tu),
          _.component("RouterView", ou),
          (_.config.globalProperties.$router = C),
          Object.defineProperty(_.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => gt(l),
          }),
          ft &&
            !it &&
            l.value === De &&
            ((it = !0), N(r.location).catch((z) => {}));
        const R = {};
        for (const z in De) R[z] = pe(() => l.value[z]);
        _.provide(_s, C), _.provide(Eo, Wt(R)), _.provide(Qn, l);
        const T = _.unmount;
        lt.add(_),
          (_.unmount = function () {
            lt.delete(_),
              lt.size < 1 &&
                ((a = De),
                Pe && Pe(),
                (Pe = null),
                (l.value = De),
                (it = !1),
                (Q = !1)),
              T();
          });
      },
    };
  function re(_) {
    return _.reduce((C, R) => C.then(() => rt(R)), Promise.resolve());
  }
  return qt;
}
function lu(e, t) {
  const n = [],
    s = [],
    r = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const c = t.matched[i];
    c && (e.matched.find((a) => Et(a, c)) ? s.push(c) : n.push(c));
    const l = e.matched[i];
    l && (t.matched.find((a) => Et(a, l)) || r.push(l));
  }
  return [n, s, r];
}
const cu = {};
function uu(e, t, n, s, r, o) {
  return tt(), nt("h1", null, "Home page");
}
const fu = zt(cu, [["render", uu]]),
  au = {};
function du(e, t, n, s, r, o) {
  return tt(), nt("h1", null, "About page");
}
const hu = zt(au, [["render", du]]),
  pu = {};
function gu(e, t, n, s, r, o) {
  return tt(), nt("h1", null, "Cars page");
}
const mu = zt(pu, [["render", gu]]),
  _u = iu({
    history: xc(),
    routes: [
      { path: "/", name: "home", component: fu },
      { path: "/about", name: "about", component: hu },
      { path: "/cars", name: "cars", component: mu },
    ],
  });
zl(rc).use(_u).mount("#app");
