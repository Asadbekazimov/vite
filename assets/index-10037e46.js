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
function Jn(e, t) {
  const n = Object.create(null),
    s = e.split(",");
  for (let r = 0; r < s.length; r++) n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const J = {},
  ht = [],
  xe = () => {},
  Ro = () => !1,
  Po = /^on[^a-z]/,
  dn = (e) => Po.test(e),
  Xn = (e) => e.startsWith("onUpdate:"),
  te = Object.assign,
  Zn = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Co = Object.prototype.hasOwnProperty,
  U = (e, t) => Co.call(e, t),
  H = Array.isArray,
  pt = (e) => hn(e) === "[object Map]",
  gr = (e) => hn(e) === "[object Set]",
  B = (e) => typeof e == "function",
  G = (e) => typeof e == "string",
  Gn = (e) => typeof e == "symbol",
  X = (e) => e !== null && typeof e == "object",
  _r = (e) => X(e) && B(e.then) && B(e.catch),
  br = Object.prototype.toString,
  hn = (e) => br.call(e),
  Oo = (e) => hn(e).slice(8, -1),
  yr = (e) => hn(e) === "[object Object]",
  es = (e) => G(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Gt = Jn(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  pn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Ao = /-(\w)/g,
  $e = pn((e) => e.replace(Ao, (t, n) => (n ? n.toUpperCase() : ""))),
  To = /\B([A-Z])/g,
  wt = pn((e) => e.replace(To, "-$1").toLowerCase()),
  mn = pn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  wn = pn((e) => (e ? `on${mn(e)}` : "")),
  Ht = (e, t) => !Object.is(e, t),
  Rn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  rn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  So = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Rs;
const $n = () =>
  Rs ||
  (Rs =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function ts(e) {
  if (H(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = G(s) ? Fo(s) : ts(s);
      if (r) for (const o in r) t[o] = r[o];
    }
    return t;
  } else {
    if (G(e)) return e;
    if (X(e)) return e;
  }
}
const Mo = /;(?![^(]*\))/g,
  Io = /:([^]+)/,
  $o = new RegExp("\\/\\*.*?\\*\\/", "gs");
function Fo(e) {
  const t = {};
  return (
    e
      .replace($o, "")
      .split(Mo)
      .forEach((n) => {
        if (n) {
          const s = n.split(Io);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function ns(e) {
  let t = "";
  if (G(e)) t = e;
  else if (H(e))
    for (let n = 0; n < e.length; n++) {
      const s = ns(e[n]);
      s && (t += s + " ");
    }
  else if (X(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const No =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Ho = Jn(No);
function vr(e) {
  return !!e || e === "";
}
const Fn = (e) =>
    G(e)
      ? e
      : e == null
      ? ""
      : H(e) || (X(e) && (e.toString === br || !B(e.toString)))
      ? JSON.stringify(e, xr, 2)
      : String(e),
  xr = (e, t) =>
    t && t.__v_isRef
      ? xr(e, t.value)
      : pt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, r]) => ((n[`${s} =>`] = r), n),
            {}
          ),
        }
      : gr(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : X(t) && !H(t) && !yr(t)
      ? String(t)
      : t;
let ge;
class Lo {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = ge),
      !t && ge && (this.index = (ge.scopes || (ge.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = ge;
      try {
        return (ge = this), t();
      } finally {
        ge = n;
      }
    }
  }
  on() {
    ge = this;
  }
  off() {
    ge = this.parent;
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
function jo(e, t = ge) {
  t && t.active && t.effects.push(e);
}
function Bo() {
  return ge;
}
const ss = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Er = (e) => (e.w & Xe) > 0,
  wr = (e) => (e.n & Xe) > 0,
  ko = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Xe;
  },
  Uo = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const r = t[s];
        Er(r) && !wr(r) ? r.delete(e) : (t[n++] = r),
          (r.w &= ~Xe),
          (r.n &= ~Xe);
      }
      t.length = n;
    }
  },
  Nn = new WeakMap();
let St = 0,
  Xe = 1;
const Hn = 30;
let be;
const st = Symbol(""),
  Ln = Symbol("");
class rs {
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
    let t = be,
      n = Ye;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = be),
        (be = this),
        (Ye = !0),
        (Xe = 1 << ++St),
        St <= Hn ? ko(this) : Ps(this),
        this.fn()
      );
    } finally {
      St <= Hn && Uo(this),
        (Xe = 1 << --St),
        (be = this.parent),
        (Ye = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    be === this
      ? (this.deferStop = !0)
      : this.active &&
        (Ps(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Ps(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Ye = !0;
const Rr = [];
function Rt() {
  Rr.push(Ye), (Ye = !1);
}
function Pt() {
  const e = Rr.pop();
  Ye = e === void 0 ? !0 : e;
}
function de(e, t, n) {
  if (Ye && be) {
    let s = Nn.get(e);
    s || Nn.set(e, (s = new Map()));
    let r = s.get(n);
    r || s.set(n, (r = ss())), Pr(r);
  }
}
function Pr(e, t) {
  let n = !1;
  St <= Hn ? wr(e) || ((e.n |= Xe), (n = !Er(e))) : (n = !e.has(be)),
    n && (e.add(be), be.deps.push(e));
}
function Ue(e, t, n, s, r, o) {
  const i = Nn.get(e);
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
          ? es(n) && c.push(i.get("length"))
          : (c.push(i.get(st)), pt(e) && c.push(i.get(Ln)));
        break;
      case "delete":
        H(e) || (c.push(i.get(st)), pt(e) && c.push(i.get(Ln)));
        break;
      case "set":
        pt(e) && c.push(i.get(st));
        break;
    }
  if (c.length === 1) c[0] && jn(c[0]);
  else {
    const l = [];
    for (const a of c) a && l.push(...a);
    jn(ss(l));
  }
}
function jn(e, t) {
  const n = H(e) ? e : [...e];
  for (const s of n) s.computed && Cs(s);
  for (const s of n) s.computed || Cs(s);
}
function Cs(e, t) {
  (e !== be || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Ko = Jn("__proto__,__v_isRef,__isVue"),
  Cr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Gn)
  ),
  Do = os(),
  qo = os(!1, !0),
  Wo = os(!0),
  Os = zo();
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
function Vo(e) {
  const t = D(this);
  return de(t, "has", e), t.hasOwnProperty(e);
}
function os(e = !1, t = !1) {
  return function (s, r, o) {
    if (r === "__v_isReactive") return !e;
    if (r === "__v_isReadonly") return e;
    if (r === "__v_isShallow") return t;
    if (r === "__v_raw" && o === (e ? (t ? ui : Mr) : t ? Sr : Tr).get(s))
      return s;
    const i = H(s);
    if (!e) {
      if (i && U(Os, r)) return Reflect.get(Os, r, o);
      if (r === "hasOwnProperty") return Vo;
    }
    const c = Reflect.get(s, r, o);
    return (Gn(r) ? Cr.has(r) : Ko(r)) || (e || de(s, "get", r), t)
      ? c
      : ie(c)
      ? i && es(r)
        ? c
        : c.value
      : X(c)
      ? e
        ? Ir(c)
        : qt(c)
      : c;
  };
}
const Qo = Or(),
  Yo = Or(!0);
function Or(e = !1) {
  return function (n, s, r, o) {
    let i = n[s];
    if (bt(i) && ie(i) && !ie(r)) return !1;
    if (
      !e &&
      (!on(r) && !bt(r) && ((i = D(i)), (r = D(r))), !H(n) && ie(i) && !ie(r))
    )
      return (i.value = r), !0;
    const c = H(n) && es(s) ? Number(s) < n.length : U(n, s),
      l = Reflect.set(n, s, r, o);
    return (
      n === D(o) && (c ? Ht(r, i) && Ue(n, "set", s, r) : Ue(n, "add", s, r)), l
    );
  };
}
function Jo(e, t) {
  const n = U(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Ue(e, "delete", t, void 0), s;
}
function Xo(e, t) {
  const n = Reflect.has(e, t);
  return (!Gn(t) || !Cr.has(t)) && de(e, "has", t), n;
}
function Zo(e) {
  return de(e, "iterate", H(e) ? "length" : st), Reflect.ownKeys(e);
}
const Ar = { get: Do, set: Qo, deleteProperty: Jo, has: Xo, ownKeys: Zo },
  Go = {
    get: Wo,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  ei = te({}, Ar, { get: qo, set: Yo }),
  is = (e) => e,
  gn = (e) => Reflect.getPrototypeOf(e);
function Vt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = D(e),
    o = D(t);
  n || (t !== o && de(r, "get", t), de(r, "get", o));
  const { has: i } = gn(r),
    c = s ? is : n ? us : Lt;
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
    (e = e.__v_raw), !t && de(D(e), "iterate", st), Reflect.get(e, "size", e)
  );
}
function As(e) {
  e = D(e);
  const t = D(this);
  return gn(t).has.call(t, e) || (t.add(e), Ue(t, "add", e, e)), this;
}
function Ts(e, t) {
  t = D(t);
  const n = D(this),
    { has: s, get: r } = gn(n);
  let o = s.call(n, e);
  o || ((e = D(e)), (o = s.call(n, e)));
  const i = r.call(n, e);
  return (
    n.set(e, t), o ? Ht(t, i) && Ue(n, "set", e, t) : Ue(n, "add", e, t), this
  );
}
function Ss(e) {
  const t = D(this),
    { has: n, get: s } = gn(t);
  let r = n.call(t, e);
  r || ((e = D(e)), (r = n.call(t, e))), s && s.call(t, e);
  const o = t.delete(e);
  return r && Ue(t, "delete", e, void 0), o;
}
function Ms() {
  const e = D(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Ue(e, "clear", void 0, void 0), n;
}
function Jt(e, t) {
  return function (s, r) {
    const o = this,
      i = o.__v_raw,
      c = D(i),
      l = t ? is : e ? us : Lt;
    return (
      !e && de(c, "iterate", st), i.forEach((a, d) => s.call(r, l(a), l(d), o))
    );
  };
}
function Xt(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      o = D(r),
      i = pt(o),
      c = e === "entries" || (e === Symbol.iterator && i),
      l = e === "keys" && i,
      a = r[e](...s),
      d = n ? is : t ? us : Lt;
    return (
      !t && de(o, "iterate", l ? Ln : st),
      {
        next() {
          const { value: p, done: m } = a.next();
          return m
            ? { value: p, done: m }
            : { value: c ? [d(p[0]), d(p[1])] : d(p), done: m };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function We(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function ti() {
  const e = {
      get(o) {
        return Vt(this, o);
      },
      get size() {
        return Yt(this);
      },
      has: Qt,
      add: As,
      set: Ts,
      delete: Ss,
      clear: Ms,
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
      add: As,
      set: Ts,
      delete: Ss,
      clear: Ms,
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
      add: We("add"),
      set: We("set"),
      delete: We("delete"),
      clear: We("clear"),
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
      add: We("add"),
      set: We("set"),
      delete: We("delete"),
      clear: We("clear"),
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
const [ni, si, ri, oi] = ti();
function ls(e, t) {
  const n = t ? (e ? oi : ri) : e ? si : ni;
  return (s, r, o) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? s
      : Reflect.get(U(n, r) && r in s ? n : s, r, o);
}
const ii = { get: ls(!1, !1) },
  li = { get: ls(!1, !0) },
  ci = { get: ls(!0, !1) },
  Tr = new WeakMap(),
  Sr = new WeakMap(),
  Mr = new WeakMap(),
  ui = new WeakMap();
function fi(e) {
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
function ai(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : fi(Oo(e));
}
function qt(e) {
  return bt(e) ? e : cs(e, !1, Ar, ii, Tr);
}
function di(e) {
  return cs(e, !1, ei, li, Sr);
}
function Ir(e) {
  return cs(e, !0, Go, ci, Mr);
}
function cs(e, t, n, s, r) {
  if (!X(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = r.get(e);
  if (o) return o;
  const i = ai(e);
  if (i === 0) return e;
  const c = new Proxy(e, i === 2 ? s : n);
  return r.set(e, c), c;
}
function mt(e) {
  return bt(e) ? mt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function bt(e) {
  return !!(e && e.__v_isReadonly);
}
function on(e) {
  return !!(e && e.__v_isShallow);
}
function $r(e) {
  return mt(e) || bt(e);
}
function D(e) {
  const t = e && e.__v_raw;
  return t ? D(t) : e;
}
function Fr(e) {
  return rn(e, "__v_skip", !0), e;
}
const Lt = (e) => (X(e) ? qt(e) : e),
  us = (e) => (X(e) ? Ir(e) : e);
function Nr(e) {
  Ye && be && ((e = D(e)), Pr(e.dep || (e.dep = ss())));
}
function Hr(e, t) {
  e = D(e);
  const n = e.dep;
  n && jn(n);
}
function ie(e) {
  return !!(e && e.__v_isRef === !0);
}
function hi(e) {
  return Lr(e, !1);
}
function pi(e) {
  return Lr(e, !0);
}
function Lr(e, t) {
  return ie(e) ? e : new mi(e, t);
}
class mi {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : D(t)),
      (this._value = n ? t : Lt(t));
  }
  get value() {
    return Nr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || on(t) || bt(t);
    (t = n ? t : D(t)),
      Ht(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Lt(t)), Hr(this));
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
function jr(e) {
  return mt(e) ? e : new Proxy(e, gi);
}
class _i {
  constructor(t, n, s, r) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new rs(t, () => {
        this._dirty || ((this._dirty = !0), Hr(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = D(this);
    return (
      Nr(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function bi(e, t, n = !1) {
  let s, r;
  const o = B(e);
  return (
    o ? ((s = e), (r = xe)) : ((s = e.get), (r = e.set)),
    new _i(s, r, o || !r, n)
  );
}
function Je(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    _n(o, t, n);
  }
  return r;
}
function Ee(e, t, n, s) {
  if (B(e)) {
    const o = Je(e, t, n, s);
    return (
      o &&
        _r(o) &&
        o.catch((i) => {
          _n(i, t, n);
        }),
      o
    );
  }
  const r = [];
  for (let o = 0; o < e.length; o++) r.push(Ee(e[o], t, n, s));
  return r;
}
function _n(e, t, n, s = !0) {
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
      Je(l, null, 10, [e, i, c]);
      return;
    }
  }
  yi(e, n, r, s);
}
function yi(e, t, n, s = !0) {
  console.error(e);
}
let jt = !1,
  Bn = !1;
const oe = [];
let Me = 0;
const _t = [];
let Le = null,
  tt = 0;
const Br = Promise.resolve();
let fs = null;
function kr(e) {
  const t = fs || Br;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function vi(e) {
  let t = Me + 1,
    n = oe.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1;
    Bt(oe[s]) < e ? (t = s + 1) : (n = s);
  }
  return t;
}
function as(e) {
  (!oe.length || !oe.includes(e, jt && e.allowRecurse ? Me + 1 : Me)) &&
    (e.id == null ? oe.push(e) : oe.splice(vi(e.id), 0, e), Ur());
}
function Ur() {
  !jt && !Bn && ((Bn = !0), (fs = Br.then(Dr)));
}
function xi(e) {
  const t = oe.indexOf(e);
  t > Me && oe.splice(t, 1);
}
function Ei(e) {
  H(e)
    ? _t.push(...e)
    : (!Le || !Le.includes(e, e.allowRecurse ? tt + 1 : tt)) && _t.push(e),
    Ur();
}
function Is(e, t = jt ? Me + 1 : 0) {
  for (; t < oe.length; t++) {
    const n = oe[t];
    n && n.pre && (oe.splice(t, 1), t--, n());
  }
}
function Kr(e) {
  if (_t.length) {
    const t = [...new Set(_t)];
    if (((_t.length = 0), Le)) {
      Le.push(...t);
      return;
    }
    for (Le = t, Le.sort((n, s) => Bt(n) - Bt(s)), tt = 0; tt < Le.length; tt++)
      Le[tt]();
    (Le = null), (tt = 0);
  }
}
const Bt = (e) => (e.id == null ? 1 / 0 : e.id),
  wi = (e, t) => {
    const n = Bt(e) - Bt(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Dr(e) {
  (Bn = !1), (jt = !0), oe.sort(wi);
  const t = xe;
  try {
    for (Me = 0; Me < oe.length; Me++) {
      const n = oe[Me];
      n && n.active !== !1 && Je(n, null, 14);
    }
  } finally {
    (Me = 0),
      (oe.length = 0),
      Kr(),
      (jt = !1),
      (fs = null),
      (oe.length || _t.length) && Dr();
  }
}
function Ri(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || J;
  let r = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in s) {
    const d = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: p, trim: m } = s[d] || J;
    m && (r = n.map((x) => (G(x) ? x.trim() : x))), p && (r = n.map(So));
  }
  let c,
    l = s[(c = wn(t))] || s[(c = wn($e(t)))];
  !l && o && (l = s[(c = wn(wt(t)))]), l && Ee(l, e, 6, r);
  const a = s[c + "Once"];
  if (a) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[c]) return;
    (e.emitted[c] = !0), Ee(a, e, 6, r);
  }
}
function qr(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {},
    c = !1;
  if (!B(e)) {
    const l = (a) => {
      const d = qr(a, t, !0);
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
function bn(e, t) {
  return !e || !dn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      U(e, t[0].toLowerCase() + t.slice(1)) || U(e, wt(t)) || U(e, t));
}
let ye = null,
  Wr = null;
function ln(e) {
  const t = ye;
  return (ye = e), (Wr = (e && e.type.__scopeId) || null), t;
}
function ds(e, t = ye, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && Ds(-1);
    const o = ln(t);
    let i;
    try {
      i = e(...r);
    } finally {
      ln(o), s._d && Ds(1);
    }
    return i;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function Pn(e) {
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
    data: m,
    setupState: x,
    ctx: A,
    inheritAttrs: S,
  } = e;
  let j, $;
  const F = ln(e);
  try {
    if (n.shapeFlag & 4) {
      const N = r || s;
      (j = Se(d.call(N, N, p, o, x, m, A))), ($ = l);
    } else {
      const N = t;
      (j = Se(
        N.length > 1 ? N(o, { attrs: l, slots: c, emit: a }) : N(o, null)
      )),
        ($ = t.props ? l : Pi(l));
    }
  } catch (N) {
    ($t.length = 0), _n(N, e, 1), (j = ue(kt));
  }
  let K = j;
  if ($ && S !== !1) {
    const N = Object.keys($),
      { shapeFlag: se } = K;
    N.length && se & 7 && (i && N.some(Xn) && ($ = Ci($, i)), (K = yt(K, $)));
  }
  return (
    n.dirs && ((K = yt(K)), (K.dirs = K.dirs ? K.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (K.transition = n.transition),
    (j = K),
    ln(F),
    j
  );
}
const Pi = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || dn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Ci = (e, t) => {
    const n = {};
    for (const s in e) (!Xn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function Oi(e, t, n) {
  const { props: s, children: r, component: o } = e,
    { props: i, children: c, patchFlag: l } = t,
    a = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return s ? $s(s, i, a) : !!i;
    if (l & 8) {
      const d = t.dynamicProps;
      for (let p = 0; p < d.length; p++) {
        const m = d[p];
        if (i[m] !== s[m] && !bn(a, m)) return !0;
      }
    }
  } else
    return (r || c) && (!c || !c.$stable)
      ? !0
      : s === i
      ? !1
      : s
      ? i
        ? $s(s, i, a)
        : !0
      : !!i;
  return !1;
}
function $s(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !bn(n, o)) return !0;
  }
  return !1;
}
function Ai({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Ti = (e) => e.__isSuspense;
function Si(e, t) {
  t && t.pendingBranch
    ? H(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Ei(e);
}
const Zt = {};
function en(e, t, n) {
  return zr(e, t, n);
}
function zr(
  e,
  t,
  { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = J
) {
  var c;
  const l = Bo() === ((c = ne) == null ? void 0 : c.scope) ? ne : null;
  let a,
    d = !1,
    p = !1;
  if (
    (ie(e)
      ? ((a = () => e.value), (d = on(e)))
      : mt(e)
      ? ((a = () => e), (s = !0))
      : H(e)
      ? ((p = !0),
        (d = e.some((N) => mt(N) || on(N))),
        (a = () =>
          e.map((N) => {
            if (ie(N)) return N.value;
            if (mt(N)) return dt(N);
            if (B(N)) return Je(N, l, 2);
          })))
      : B(e)
      ? t
        ? (a = () => Je(e, l, 2))
        : (a = () => {
            if (!(l && l.isUnmounted)) return m && m(), Ee(e, l, 3, [x]);
          })
      : (a = xe),
    t && s)
  ) {
    const N = a;
    a = () => dt(N());
  }
  let m,
    x = (N) => {
      m = F.onStop = () => {
        Je(N, l, 4);
      };
    },
    A;
  if (Kt)
    if (
      ((x = xe),
      t ? n && Ee(t, l, 3, [a(), p ? [] : void 0, x]) : a(),
      r === "sync")
    ) {
      const N = Rl();
      A = N.__watcherHandles || (N.__watcherHandles = []);
    } else return xe;
  let S = p ? new Array(e.length).fill(Zt) : Zt;
  const j = () => {
    if (F.active)
      if (t) {
        const N = F.run();
        (s || d || (p ? N.some((se, le) => Ht(se, S[le])) : Ht(N, S))) &&
          (m && m(),
          Ee(t, l, 3, [N, S === Zt ? void 0 : p && S[0] === Zt ? [] : S, x]),
          (S = N));
      } else F.run();
  };
  j.allowRecurse = !!t;
  let $;
  r === "sync"
    ? ($ = j)
    : r === "post"
    ? ($ = () => ae(j, l && l.suspense))
    : ((j.pre = !0), l && (j.id = l.uid), ($ = () => as(j)));
  const F = new rs(a, $);
  t
    ? n
      ? j()
      : (S = F.run())
    : r === "post"
    ? ae(F.run.bind(F), l && l.suspense)
    : F.run();
  const K = () => {
    F.stop(), l && l.scope && Zn(l.scope.effects, F);
  };
  return A && A.push(K), K;
}
function Mi(e, t, n) {
  const s = this.proxy,
    r = G(e) ? (e.includes(".") ? Vr(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  B(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = ne;
  vt(this);
  const c = zr(r, o.bind(s), n);
  return i ? vt(i) : rt(), c;
}
function Vr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
function dt(e, t) {
  if (!X(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ie(e))) dt(e.value, t);
  else if (H(e)) for (let n = 0; n < e.length; n++) dt(e[n], t);
  else if (gr(e) || pt(e))
    e.forEach((n) => {
      dt(n, t);
    });
  else if (yr(e)) for (const n in e) dt(e[n], t);
  return e;
}
function Ge(e, t, n, s) {
  const r = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const c = r[i];
    o && (c.oldValue = o[i].value);
    let l = c.dir[s];
    l && (Rt(), Ee(l, n, 8, [e.el, c, e, t]), Pt());
  }
}
function Qr(e, t) {
  return B(e) ? (() => te({ name: e.name }, t, { setup: e }))() : e;
}
const tn = (e) => !!e.type.__asyncLoader,
  Yr = (e) => e.type.__isKeepAlive;
function Ii(e, t) {
  Jr(e, "a", t);
}
function $i(e, t) {
  Jr(e, "da", t);
}
function Jr(e, t, n = ne) {
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
  if ((yn(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      Yr(r.parent.vnode) && Fi(s, t, n, r), (r = r.parent);
  }
}
function Fi(e, t, n, s) {
  const r = yn(t, e, s, !0);
  Xr(() => {
    Zn(s[t], r);
  }, n);
}
function yn(e, t, n = ne, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          Rt(), vt(n);
          const c = Ee(t, n, e, i);
          return rt(), Pt(), c;
        });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const Ke =
    (e) =>
    (t, n = ne) =>
      (!Kt || e === "sp") && yn(e, (...s) => t(...s), n),
  Ni = Ke("bm"),
  Hi = Ke("m"),
  Li = Ke("bu"),
  ji = Ke("u"),
  Bi = Ke("bum"),
  Xr = Ke("um"),
  ki = Ke("sp"),
  Ui = Ke("rtg"),
  Ki = Ke("rtc");
function Di(e, t = ne) {
  yn("ec", e, t);
}
const Zr = "components";
function cn(e, t) {
  return Wi(Zr, e, !0, t) || e;
}
const qi = Symbol.for("v-ndc");
function Wi(e, t, n = !0, s = !1) {
  const r = ye || ne;
  if (r) {
    const o = r.type;
    if (e === Zr) {
      const c = xl(o, !1);
      if (c && (c === t || c === $e(t) || c === mn($e(t)))) return o;
    }
    const i = Fs(r[e] || o[e], t) || Fs(r.appContext[e], t);
    return !i && s ? o : i;
  }
}
function Fs(e, t) {
  return e && (e[t] || e[$e(t)] || e[mn($e(t))]);
}
function Gr(e, t, n, s) {
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
const kn = (e) => (e ? (uo(e) ? bs(e) || e.proxy : kn(e.parent)) : null),
  It = te(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => kn(e.parent),
    $root: (e) => kn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => hs(e),
    $forceUpdate: (e) => e.f || (e.f = () => as(e.update)),
    $nextTick: (e) => e.n || (e.n = kr.bind(e.proxy)),
    $watch: (e) => Mi.bind(e),
  }),
  Cn = (e, t) => e !== J && !e.__isScriptSetup && U(e, t),
  zi = {
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
        const x = i[t];
        if (x !== void 0)
          switch (x) {
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
          if (Cn(s, t)) return (i[t] = 1), s[t];
          if (r !== J && U(r, t)) return (i[t] = 2), r[t];
          if ((a = e.propsOptions[0]) && U(a, t)) return (i[t] = 3), o[t];
          if (n !== J && U(n, t)) return (i[t] = 4), n[t];
          Un && (i[t] = 0);
        }
      }
      const d = It[t];
      let p, m;
      if (d) return t === "$attrs" && de(e, "get", t), d(e);
      if ((p = c.__cssModules) && (p = p[t])) return p;
      if (n !== J && U(n, t)) return (i[t] = 4), n[t];
      if (((m = l.config.globalProperties), U(m, t))) return m[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: o } = e;
      return Cn(r, t)
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
        Cn(t, i) ||
        ((c = o[0]) && U(c, i)) ||
        U(s, i) ||
        U(It, i) ||
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
function Ns(e) {
  return H(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Un = !0;
function Vi(e) {
  const t = hs(e),
    n = e.proxy,
    s = e.ctx;
  (Un = !1), t.beforeCreate && Hs(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: o,
    methods: i,
    watch: c,
    provide: l,
    inject: a,
    created: d,
    beforeMount: p,
    mounted: m,
    beforeUpdate: x,
    updated: A,
    activated: S,
    deactivated: j,
    beforeDestroy: $,
    beforeUnmount: F,
    destroyed: K,
    unmounted: N,
    render: se,
    renderTracked: le,
    renderTriggered: Re,
    errorCaptured: Fe,
    serverPrefetch: ot,
    expose: Pe,
    inheritAttrs: De,
    components: Ze,
    directives: Ce,
    filters: Ct,
  } = t;
  if ((a && Qi(a, s, null), i))
    for (const Q in i) {
      const q = i[Q];
      B(q) && (s[Q] = q.bind(n));
    }
  if (r) {
    const Q = r.call(n, n);
    X(Q) && (e.data = qt(Q));
  }
  if (((Un = !0), o))
    for (const Q in o) {
      const q = o[Q],
        Ne = B(q) ? q.bind(n, n) : B(q.get) ? q.get.bind(n, n) : xe,
        qe = !B(q) && B(q.set) ? q.set.bind(n) : xe,
        Oe = pe({ get: Ne, set: qe });
      Object.defineProperty(s, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => Oe.value,
        set: (fe) => (Oe.value = fe),
      });
    }
  if (c) for (const Q in c) eo(c[Q], s, n, Q);
  if (l) {
    const Q = B(l) ? l.call(n) : l;
    Reflect.ownKeys(Q).forEach((q) => {
      nn(q, Q[q]);
    });
  }
  d && Hs(d, e, "c");
  function ee(Q, q) {
    H(q) ? q.forEach((Ne) => Q(Ne.bind(n))) : q && Q(q.bind(n));
  }
  if (
    (ee(Ni, p),
    ee(Hi, m),
    ee(Li, x),
    ee(ji, A),
    ee(Ii, S),
    ee($i, j),
    ee(Di, Fe),
    ee(Ki, le),
    ee(Ui, Re),
    ee(Bi, F),
    ee(Xr, N),
    ee(ki, ot),
    H(Pe))
  )
    if (Pe.length) {
      const Q = e.exposed || (e.exposed = {});
      Pe.forEach((q) => {
        Object.defineProperty(Q, q, {
          get: () => n[q],
          set: (Ne) => (n[q] = Ne),
        });
      });
    } else e.exposed || (e.exposed = {});
  se && e.render === xe && (e.render = se),
    De != null && (e.inheritAttrs = De),
    Ze && (e.components = Ze),
    Ce && (e.directives = Ce);
}
function Qi(e, t, n = xe) {
  H(e) && (e = Kn(e));
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
function Hs(e, t, n) {
  Ee(H(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function eo(e, t, n, s) {
  const r = s.includes(".") ? Vr(n, s) : () => n[s];
  if (G(e)) {
    const o = t[e];
    B(o) && en(r, o);
  } else if (B(e)) en(r, e.bind(n));
  else if (X(e))
    if (H(e)) e.forEach((o) => eo(o, t, n, s));
    else {
      const o = B(e.handler) ? e.handler.bind(n) : t[e.handler];
      B(o) && en(r, o, e);
    }
}
function hs(e) {
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
      : ((l = {}), r.length && r.forEach((a) => un(l, a, i, !0)), un(l, t, i)),
    X(t) && o.set(t, l),
    l
  );
}
function un(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && un(e, o, n, !0), r && r.forEach((i) => un(e, i, n, !0));
  for (const i in t)
    if (!(s && i === "expose")) {
      const c = Yi[i] || (n && n[i]);
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Yi = {
  data: Ls,
  props: js,
  emits: js,
  methods: Mt,
  computed: Mt,
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
  components: Mt,
  directives: Mt,
  watch: Xi,
  provide: Ls,
  inject: Ji,
};
function Ls(e, t) {
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
  return Mt(Kn(e), Kn(t));
}
function Kn(e) {
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
function Mt(e, t) {
  return e ? te(Object.create(null), e, t) : t;
}
function js(e, t) {
  return e
    ? H(e) && H(t)
      ? [...new Set([...e, ...t])]
      : te(Object.create(null), Ns(e), Ns(t ?? {}))
    : t;
}
function Xi(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = te(Object.create(null), e);
  for (const s in t) n[s] = ce(e[s], t[s]);
  return n;
}
function to() {
  return {
    app: null,
    config: {
      isNativeTag: Ro,
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
    const o = to(),
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
          const m = ue(s, r);
          return (
            (m.appContext = o),
            d && t ? t(m, a) : e(m, a, p),
            (c = !0),
            (l._container = a),
            (a.__vue_app__ = l),
            bs(m.component) || m.component.proxy
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
        fn = l;
        try {
          return a();
        } finally {
          fn = null;
        }
      },
    });
    return l;
  };
}
let fn = null;
function nn(e, t) {
  if (ne) {
    let n = ne.provides;
    const s = ne.parent && ne.parent.provides;
    s === n && (n = ne.provides = Object.create(s)), (n[e] = t);
  }
}
function je(e, t, n = !1) {
  const s = ne || ye;
  if (s || fn) {
    const r = s
      ? s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides
      : fn._context.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && B(t) ? t.call(s && s.proxy) : t;
  }
}
function el(e, t, n, s = !1) {
  const r = {},
    o = {};
  rn(o, xn, 1), (e.propsDefaults = Object.create(null)), no(e, t, r, o);
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  n ? (e.props = s ? r : di(r)) : e.type.props ? (e.props = r) : (e.props = o),
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
        let m = d[p];
        if (bn(e.emitsOptions, m)) continue;
        const x = t[m];
        if (l)
          if (U(o, m)) x !== o[m] && ((o[m] = x), (a = !0));
          else {
            const A = $e(m);
            r[A] = Dn(l, c, A, x, e, !1);
          }
        else x !== o[m] && ((o[m] = x), (a = !0));
      }
    }
  } else {
    no(e, t, r, o) && (a = !0);
    let d;
    for (const p in c)
      (!t || (!U(t, p) && ((d = wt(p)) === p || !U(t, d)))) &&
        (l
          ? n &&
            (n[p] !== void 0 || n[d] !== void 0) &&
            (r[p] = Dn(l, c, p, void 0, e, !0))
          : delete r[p]);
    if (o !== c) for (const p in o) (!t || !U(t, p)) && (delete o[p], (a = !0));
  }
  a && Ue(e, "set", "$attrs");
}
function no(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1,
    c;
  if (t)
    for (let l in t) {
      if (Gt(l)) continue;
      const a = t[l];
      let d;
      r && U(r, (d = $e(l)))
        ? !o || !o.includes(d)
          ? (n[d] = a)
          : ((c || (c = {}))[d] = a)
        : bn(e.emitsOptions, l) ||
          ((!(l in s) || a !== s[l]) && ((s[l] = a), (i = !0)));
    }
  if (o) {
    const l = D(n),
      a = c || J;
    for (let d = 0; d < o.length; d++) {
      const p = o[d];
      n[p] = Dn(r, l, p, a[p], e, !U(a, p));
    }
  }
  return i;
}
function Dn(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const c = U(i, "default");
    if (c && s === void 0) {
      const l = i.default;
      if (i.type !== Function && !i.skipFactory && B(l)) {
        const { propsDefaults: a } = r;
        n in a ? (s = a[n]) : (vt(r), (s = a[n] = l.call(null, t)), rt());
      } else s = l;
    }
    i[0] &&
      (o && !c ? (s = !1) : i[1] && (s === "" || s === wt(n)) && (s = !0));
  }
  return s;
}
function so(e, t, n = !1) {
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
      const [m, x] = so(p, t, !0);
      te(i, m), x && c.push(...x);
    };
    !n && t.mixins.length && t.mixins.forEach(d),
      e.extends && d(e.extends),
      e.mixins && e.mixins.forEach(d);
  }
  if (!o && !l) return X(e) && s.set(e, ht), ht;
  if (H(o))
    for (let d = 0; d < o.length; d++) {
      const p = $e(o[d]);
      Bs(p) && (i[p] = J);
    }
  else if (o)
    for (const d in o) {
      const p = $e(d);
      if (Bs(p)) {
        const m = o[d],
          x = (i[p] = H(m) || B(m) ? { type: m } : te({}, m));
        if (x) {
          const A = Ks(Boolean, x.type),
            S = Ks(String, x.type);
          (x[0] = A > -1),
            (x[1] = S < 0 || A < S),
            (A > -1 || U(x, "default")) && c.push(p);
        }
      }
    }
  const a = [i, c];
  return X(e) && s.set(e, a), a;
}
function Bs(e) {
  return e[0] !== "$";
}
function ks(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Us(e, t) {
  return ks(e) === ks(t);
}
function Ks(e, t) {
  return H(t) ? t.findIndex((n) => Us(n, e)) : B(t) && Us(t, e) ? 0 : -1;
}
const ro = (e) => e[0] === "_" || e === "$stable",
  ps = (e) => (H(e) ? e.map(Se) : [Se(e)]),
  nl = (e, t, n) => {
    if (t._n) return t;
    const s = ds((...r) => ps(t(...r)), n);
    return (s._c = !1), s;
  },
  oo = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (ro(r)) continue;
      const o = e[r];
      if (B(o)) t[r] = nl(r, o, s);
      else if (o != null) {
        const i = ps(o);
        t[r] = () => i;
      }
    }
  },
  io = (e, t) => {
    const n = ps(t);
    e.slots.default = () => n;
  },
  sl = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = D(t)), rn(t, "_", n)) : oo(t, (e.slots = {}));
    } else (e.slots = {}), t && io(e, t);
    rn(e.slots, xn, 1);
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
        : ((o = !t.$stable), oo(t, r)),
        (i = t);
    } else t && (io(e, t), (i = { default: 1 }));
    if (o) for (const c in r) !ro(c) && !(c in i) && delete r[c];
  };
function qn(e, t, n, s, r = !1) {
  if (H(e)) {
    e.forEach((m, x) => qn(m, t && (H(t) ? t[x] : t), n, s, r));
    return;
  }
  if (tn(s) && !r) return;
  const o = s.shapeFlag & 4 ? bs(s.component) || s.component.proxy : s.el,
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
    Je(l, c, 12, [i, d]);
  else {
    const m = G(l),
      x = ie(l);
    if (m || x) {
      const A = () => {
        if (e.f) {
          const S = m ? (U(p, l) ? p[l] : d[l]) : l.value;
          r
            ? H(S) && Zn(S, o)
            : H(S)
            ? S.includes(o) || S.push(o)
            : m
            ? ((d[l] = [o]), U(p, l) && (p[l] = d[l]))
            : ((l.value = [o]), e.k && (d[e.k] = l.value));
        } else
          m
            ? ((d[l] = i), U(p, l) && (p[l] = i))
            : x && ((l.value = i), e.k && (d[e.k] = i));
      };
      i ? ((A.id = -1), ae(A, n)) : A();
    }
  }
}
const ae = Si;
function ol(e) {
  return il(e);
}
function il(e, t) {
  const n = $n();
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
      nextSibling: m,
      setScopeId: x = xe,
      insertStaticContent: A,
    } = e,
    S = (
      u,
      f,
      h,
      g = null,
      b = null,
      y = null,
      P = !1,
      E = null,
      w = !!f.dynamicChildren
    ) => {
      if (u === f) return;
      u && !At(u, f) && ((g = _(u)), fe(u, b, y, !0), (u = null)),
        f.patchFlag === -2 && ((w = !1), (f.dynamicChildren = null));
      const { type: v, ref: M, shapeFlag: O } = f;
      switch (v) {
        case vn:
          j(u, f, h, g);
          break;
        case kt:
          $(u, f, h, g);
          break;
        case On:
          u == null && F(f, h, g, P);
          break;
        case _e:
          Ze(u, f, h, g, b, y, P, E, w);
          break;
        default:
          O & 1
            ? se(u, f, h, g, b, y, P, E, w)
            : O & 6
            ? Ce(u, f, h, g, b, y, P, E, w)
            : (O & 64 || O & 128) && v.process(u, f, h, g, b, y, P, E, w, R);
      }
      M != null && b && qn(M, u && u.ref, y, f || u, !f);
    },
    j = (u, f, h, g) => {
      if (u == null) s((f.el = c(f.children)), h, g);
      else {
        const b = (f.el = u.el);
        f.children !== u.children && a(b, f.children);
      }
    },
    $ = (u, f, h, g) => {
      u == null ? s((f.el = l(f.children || "")), h, g) : (f.el = u.el);
    },
    F = (u, f, h, g) => {
      [u.el, u.anchor] = A(u.children, f, h, g, u.el, u.anchor);
    },
    K = ({ el: u, anchor: f }, h, g) => {
      let b;
      for (; u && u !== f; ) (b = m(u)), s(u, h, g), (u = b);
      s(f, h, g);
    },
    N = ({ el: u, anchor: f }) => {
      let h;
      for (; u && u !== f; ) (h = m(u)), r(u), (u = h);
      r(f);
    },
    se = (u, f, h, g, b, y, P, E, w) => {
      (P = P || f.type === "svg"),
        u == null ? le(f, h, g, b, y, P, E, w) : ot(u, f, b, y, P, E, w);
    },
    le = (u, f, h, g, b, y, P, E) => {
      let w, v;
      const { type: M, props: O, shapeFlag: I, transition: L, dirs: k } = u;
      if (
        ((w = u.el = i(u.type, y, O && O.is, O)),
        I & 8
          ? d(w, u.children)
          : I & 16 &&
            Fe(u.children, w, null, g, b, y && M !== "foreignObject", P, E),
        k && Ge(u, null, g, "created"),
        Re(w, u, u.scopeId, P, g),
        O)
      ) {
        for (const V in O)
          V !== "value" &&
            !Gt(V) &&
            o(w, V, null, O[V], y, u.children, g, b, re);
        "value" in O && o(w, "value", null, O.value),
          (v = O.onVnodeBeforeMount) && Te(v, g, u);
      }
      k && Ge(u, null, g, "beforeMount");
      const Y = (!b || (b && !b.pendingBranch)) && L && !L.persisted;
      Y && L.beforeEnter(w),
        s(w, f, h),
        ((v = O && O.onVnodeMounted) || Y || k) &&
          ae(() => {
            v && Te(v, g, u), Y && L.enter(w), k && Ge(u, null, g, "mounted");
          }, b);
    },
    Re = (u, f, h, g, b) => {
      if ((h && x(u, h), g)) for (let y = 0; y < g.length; y++) x(u, g[y]);
      if (b) {
        let y = b.subTree;
        if (f === y) {
          const P = b.vnode;
          Re(u, P, P.scopeId, P.slotScopeIds, b.parent);
        }
      }
    },
    Fe = (u, f, h, g, b, y, P, E, w = 0) => {
      for (let v = w; v < u.length; v++) {
        const M = (u[v] = E ? Ve(u[v]) : Se(u[v]));
        S(null, M, f, h, g, b, y, P, E);
      }
    },
    ot = (u, f, h, g, b, y, P) => {
      const E = (f.el = u.el);
      let { patchFlag: w, dynamicChildren: v, dirs: M } = f;
      w |= u.patchFlag & 16;
      const O = u.props || J,
        I = f.props || J;
      let L;
      h && et(h, !1),
        (L = I.onVnodeBeforeUpdate) && Te(L, h, f, u),
        M && Ge(f, u, h, "beforeUpdate"),
        h && et(h, !0);
      const k = b && f.type !== "foreignObject";
      if (
        (v
          ? Pe(u.dynamicChildren, v, E, h, g, k, y)
          : P || q(u, f, E, null, h, g, k, y, !1),
        w > 0)
      ) {
        if (w & 16) De(E, f, O, I, h, g, b);
        else if (
          (w & 2 && O.class !== I.class && o(E, "class", null, I.class, b),
          w & 4 && o(E, "style", O.style, I.style, b),
          w & 8)
        ) {
          const Y = f.dynamicProps;
          for (let V = 0; V < Y.length; V++) {
            const Z = Y[V],
              me = O[Z],
              ut = I[Z];
            (ut !== me || Z === "value") &&
              o(E, Z, me, ut, b, u.children, h, g, re);
          }
        }
        w & 1 && u.children !== f.children && d(E, f.children);
      } else !P && v == null && De(E, f, O, I, h, g, b);
      ((L = I.onVnodeUpdated) || M) &&
        ae(() => {
          L && Te(L, h, f, u), M && Ge(f, u, h, "updated");
        }, g);
    },
    Pe = (u, f, h, g, b, y, P) => {
      for (let E = 0; E < f.length; E++) {
        const w = u[E],
          v = f[E],
          M =
            w.el && (w.type === _e || !At(w, v) || w.shapeFlag & 70)
              ? p(w.el)
              : h;
        S(w, v, M, null, g, b, y, P, !0);
      }
    },
    De = (u, f, h, g, b, y, P) => {
      if (h !== g) {
        if (h !== J)
          for (const E in h)
            !Gt(E) && !(E in g) && o(u, E, h[E], null, P, f.children, b, y, re);
        for (const E in g) {
          if (Gt(E)) continue;
          const w = g[E],
            v = h[E];
          w !== v && E !== "value" && o(u, E, v, w, P, f.children, b, y, re);
        }
        "value" in g && o(u, "value", h.value, g.value);
      }
    },
    Ze = (u, f, h, g, b, y, P, E, w) => {
      const v = (f.el = u ? u.el : c("")),
        M = (f.anchor = u ? u.anchor : c(""));
      let { patchFlag: O, dynamicChildren: I, slotScopeIds: L } = f;
      L && (E = E ? E.concat(L) : L),
        u == null
          ? (s(v, h, g), s(M, h, g), Fe(f.children, h, M, b, y, P, E, w))
          : O > 0 && O & 64 && I && u.dynamicChildren
          ? (Pe(u.dynamicChildren, I, h, b, y, P, E),
            (f.key != null || (b && f === b.subTree)) && lo(u, f, !0))
          : q(u, f, h, M, b, y, P, E, w);
    },
    Ce = (u, f, h, g, b, y, P, E, w) => {
      (f.slotScopeIds = E),
        u == null
          ? f.shapeFlag & 512
            ? b.ctx.activate(f, h, g, P, w)
            : Ct(f, h, g, b, y, P, w)
          : it(u, f, w);
    },
    Ct = (u, f, h, g, b, y, P) => {
      const E = (u.component = gl(u, g, b));
      if ((Yr(u) && (E.ctx.renderer = R), _l(E), E.asyncDep)) {
        if ((b && b.registerDep(E, ee), !u.el)) {
          const w = (E.subTree = ue(kt));
          $(null, w, f, h);
        }
        return;
      }
      ee(E, u, f, h, b, y, P);
    },
    it = (u, f, h) => {
      const g = (f.component = u.component);
      if (Oi(u, f, h))
        if (g.asyncDep && !g.asyncResolved) {
          Q(g, f, h);
          return;
        } else (g.next = f), xi(g.update), g.update();
      else (f.el = u.el), (g.vnode = f);
    },
    ee = (u, f, h, g, b, y, P) => {
      const E = () => {
          if (u.isMounted) {
            let { next: M, bu: O, u: I, parent: L, vnode: k } = u,
              Y = M,
              V;
            et(u, !1),
              M ? ((M.el = k.el), Q(u, M, P)) : (M = k),
              O && Rn(O),
              (V = M.props && M.props.onVnodeBeforeUpdate) && Te(V, L, M, k),
              et(u, !0);
            const Z = Pn(u),
              me = u.subTree;
            (u.subTree = Z),
              S(me, Z, p(me.el), _(me), u, b, y),
              (M.el = Z.el),
              Y === null && Ai(u, Z.el),
              I && ae(I, b),
              (V = M.props && M.props.onVnodeUpdated) &&
                ae(() => Te(V, L, M, k), b);
          } else {
            let M;
            const { el: O, props: I } = f,
              { bm: L, m: k, parent: Y } = u,
              V = tn(f);
            if (
              (et(u, !1),
              L && Rn(L),
              !V && (M = I && I.onVnodeBeforeMount) && Te(M, Y, f),
              et(u, !0),
              O && W)
            ) {
              const Z = () => {
                (u.subTree = Pn(u)), W(O, u.subTree, u, b, null);
              };
              V
                ? f.type.__asyncLoader().then(() => !u.isUnmounted && Z())
                : Z();
            } else {
              const Z = (u.subTree = Pn(u));
              S(null, Z, h, g, u, b, y), (f.el = Z.el);
            }
            if ((k && ae(k, b), !V && (M = I && I.onVnodeMounted))) {
              const Z = f;
              ae(() => Te(M, Y, Z), b);
            }
            (f.shapeFlag & 256 ||
              (Y && tn(Y.vnode) && Y.vnode.shapeFlag & 256)) &&
              u.a &&
              ae(u.a, b),
              (u.isMounted = !0),
              (f = h = g = null);
          }
        },
        w = (u.effect = new rs(E, () => as(v), u.scope)),
        v = (u.update = () => w.run());
      (v.id = u.uid), et(u, !0), v();
    },
    Q = (u, f, h) => {
      f.component = u;
      const g = u.vnode.props;
      (u.vnode = f),
        (u.next = null),
        tl(u, f.props, g, h),
        rl(u, f.children, h),
        Rt(),
        Is(),
        Pt();
    },
    q = (u, f, h, g, b, y, P, E, w = !1) => {
      const v = u && u.children,
        M = u ? u.shapeFlag : 0,
        O = f.children,
        { patchFlag: I, shapeFlag: L } = f;
      if (I > 0) {
        if (I & 128) {
          qe(v, O, h, g, b, y, P, E, w);
          return;
        } else if (I & 256) {
          Ne(v, O, h, g, b, y, P, E, w);
          return;
        }
      }
      L & 8
        ? (M & 16 && re(v, b, y), O !== v && d(h, O))
        : M & 16
        ? L & 16
          ? qe(v, O, h, g, b, y, P, E, w)
          : re(v, b, y, !0)
        : (M & 8 && d(h, ""), L & 16 && Fe(O, h, g, b, y, P, E, w));
    },
    Ne = (u, f, h, g, b, y, P, E, w) => {
      (u = u || ht), (f = f || ht);
      const v = u.length,
        M = f.length,
        O = Math.min(v, M);
      let I;
      for (I = 0; I < O; I++) {
        const L = (f[I] = w ? Ve(f[I]) : Se(f[I]));
        S(u[I], L, h, null, b, y, P, E, w);
      }
      v > M ? re(u, b, y, !0, !1, O) : Fe(f, h, g, b, y, P, E, w, O);
    },
    qe = (u, f, h, g, b, y, P, E, w) => {
      let v = 0;
      const M = f.length;
      let O = u.length - 1,
        I = M - 1;
      for (; v <= O && v <= I; ) {
        const L = u[v],
          k = (f[v] = w ? Ve(f[v]) : Se(f[v]));
        if (At(L, k)) S(L, k, h, null, b, y, P, E, w);
        else break;
        v++;
      }
      for (; v <= O && v <= I; ) {
        const L = u[O],
          k = (f[I] = w ? Ve(f[I]) : Se(f[I]));
        if (At(L, k)) S(L, k, h, null, b, y, P, E, w);
        else break;
        O--, I--;
      }
      if (v > O) {
        if (v <= I) {
          const L = I + 1,
            k = L < M ? f[L].el : g;
          for (; v <= I; )
            S(null, (f[v] = w ? Ve(f[v]) : Se(f[v])), h, k, b, y, P, E, w), v++;
        }
      } else if (v > I) for (; v <= O; ) fe(u[v], b, y, !0), v++;
      else {
        const L = v,
          k = v,
          Y = new Map();
        for (v = k; v <= I; v++) {
          const he = (f[v] = w ? Ve(f[v]) : Se(f[v]));
          he.key != null && Y.set(he.key, v);
        }
        let V,
          Z = 0;
        const me = I - k + 1;
        let ut = !1,
          xs = 0;
        const Ot = new Array(me);
        for (v = 0; v < me; v++) Ot[v] = 0;
        for (v = L; v <= O; v++) {
          const he = u[v];
          if (Z >= me) {
            fe(he, b, y, !0);
            continue;
          }
          let Ae;
          if (he.key != null) Ae = Y.get(he.key);
          else
            for (V = k; V <= I; V++)
              if (Ot[V - k] === 0 && At(he, f[V])) {
                Ae = V;
                break;
              }
          Ae === void 0
            ? fe(he, b, y, !0)
            : ((Ot[Ae - k] = v + 1),
              Ae >= xs ? (xs = Ae) : (ut = !0),
              S(he, f[Ae], h, null, b, y, P, E, w),
              Z++);
        }
        const Es = ut ? ll(Ot) : ht;
        for (V = Es.length - 1, v = me - 1; v >= 0; v--) {
          const he = k + v,
            Ae = f[he],
            ws = he + 1 < M ? f[he + 1].el : g;
          Ot[v] === 0
            ? S(null, Ae, h, ws, b, y, P, E, w)
            : ut && (V < 0 || v !== Es[V] ? Oe(Ae, h, ws, 2) : V--);
        }
      }
    },
    Oe = (u, f, h, g, b = null) => {
      const { el: y, type: P, transition: E, children: w, shapeFlag: v } = u;
      if (v & 6) {
        Oe(u.component.subTree, f, h, g);
        return;
      }
      if (v & 128) {
        u.suspense.move(f, h, g);
        return;
      }
      if (v & 64) {
        P.move(u, f, h, R);
        return;
      }
      if (P === _e) {
        s(y, f, h);
        for (let O = 0; O < w.length; O++) Oe(w[O], f, h, g);
        s(u.anchor, f, h);
        return;
      }
      if (P === On) {
        K(u, f, h);
        return;
      }
      if (g !== 2 && v & 1 && E)
        if (g === 0) E.beforeEnter(y), s(y, f, h), ae(() => E.enter(y), b);
        else {
          const { leave: O, delayLeave: I, afterLeave: L } = E,
            k = () => s(y, f, h),
            Y = () => {
              O(y, () => {
                k(), L && L();
              });
            };
          I ? I(y, k, Y) : Y();
        }
      else s(y, f, h);
    },
    fe = (u, f, h, g = !1, b = !1) => {
      const {
        type: y,
        props: P,
        ref: E,
        children: w,
        dynamicChildren: v,
        shapeFlag: M,
        patchFlag: O,
        dirs: I,
      } = u;
      if ((E != null && qn(E, null, h, u, !0), M & 256)) {
        f.ctx.deactivate(u);
        return;
      }
      const L = M & 1 && I,
        k = !tn(u);
      let Y;
      if ((k && (Y = P && P.onVnodeBeforeUnmount) && Te(Y, f, u), M & 6))
        zt(u.component, h, g);
      else {
        if (M & 128) {
          u.suspense.unmount(h, g);
          return;
        }
        L && Ge(u, null, f, "beforeUnmount"),
          M & 64
            ? u.type.remove(u, f, h, b, R, g)
            : v && (y !== _e || (O > 0 && O & 64))
            ? re(v, f, h, !1, !0)
            : ((y === _e && O & 384) || (!b && M & 16)) && re(w, f, h),
          g && lt(u);
      }
      ((k && (Y = P && P.onVnodeUnmounted)) || L) &&
        ae(() => {
          Y && Te(Y, f, u), L && Ge(u, null, f, "unmounted");
        }, h);
    },
    lt = (u) => {
      const { type: f, el: h, anchor: g, transition: b } = u;
      if (f === _e) {
        ct(h, g);
        return;
      }
      if (f === On) {
        N(u);
        return;
      }
      const y = () => {
        r(h), b && !b.persisted && b.afterLeave && b.afterLeave();
      };
      if (u.shapeFlag & 1 && b && !b.persisted) {
        const { leave: P, delayLeave: E } = b,
          w = () => P(h, y);
        E ? E(u.el, y, w) : w();
      } else y();
    },
    ct = (u, f) => {
      let h;
      for (; u !== f; ) (h = m(u)), r(u), (u = h);
      r(f);
    },
    zt = (u, f, h) => {
      const { bum: g, scope: b, update: y, subTree: P, um: E } = u;
      g && Rn(g),
        b.stop(),
        y && ((y.active = !1), fe(P, u, f, h)),
        E && ae(E, f),
        ae(() => {
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
    re = (u, f, h, g = !1, b = !1, y = 0) => {
      for (let P = y; P < u.length; P++) fe(u[P], f, h, g, b);
    },
    _ = (u) =>
      u.shapeFlag & 6
        ? _(u.component.subTree)
        : u.shapeFlag & 128
        ? u.suspense.next()
        : m(u.anchor || u.el),
    C = (u, f, h) => {
      u == null
        ? f._vnode && fe(f._vnode, null, null, !0)
        : S(f._vnode || null, u, f, null, null, null, h),
        Is(),
        Kr(),
        (f._vnode = u);
    },
    R = {
      p: S,
      um: fe,
      m: Oe,
      r: lt,
      mt: Ct,
      mc: Fe,
      pc: q,
      pbc: Pe,
      n: _,
      o: e,
    };
  let T, W;
  return t && ([T, W] = t(R)), { render: C, hydrate: T, createApp: Gi(C, T) };
}
function et({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function lo(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (H(s) && H(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let c = r[o];
      c.shapeFlag & 1 &&
        !c.dynamicChildren &&
        ((c.patchFlag <= 0 || c.patchFlag === 32) &&
          ((c = r[o] = Ve(r[o])), (c.el = i.el)),
        n || lo(i, c)),
        c.type === vn && (c.el = i.el);
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
  _e = Symbol.for("v-fgt"),
  vn = Symbol.for("v-txt"),
  kt = Symbol.for("v-cmt"),
  On = Symbol.for("v-stc"),
  $t = [];
let ve = null;
function Be(e = !1) {
  $t.push((ve = e ? null : []));
}
function ul() {
  $t.pop(), (ve = $t[$t.length - 1] || null);
}
let Ut = 1;
function Ds(e) {
  Ut += e;
}
function fl(e) {
  return (
    (e.dynamicChildren = Ut > 0 ? ve || ht : null),
    ul(),
    Ut > 0 && ve && ve.push(e),
    e
  );
}
function ke(e, t, n, s, r, o) {
  return fl(Ie(e, t, n, s, r, o, !0));
}
function Wn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function At(e, t) {
  return e.type === t.type && e.key === t.key;
}
const xn = "__vInternal",
  co = ({ key: e }) => e ?? null,
  sn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? G(e) || ie(e) || B(e)
        ? { i: ye, r: e, k: t, f: !!n }
        : e
      : null
  );
function Ie(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  o = e === _e ? 0 : 1,
  i = !1,
  c = !1
) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && co(t),
    ref: t && sn(t),
    scopeId: Wr,
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
    ctx: ye,
  };
  return (
    c
      ? (gs(l, n), o & 128 && e.normalize(l))
      : n && (l.shapeFlag |= G(n) ? 8 : 16),
    Ut > 0 &&
      !i &&
      ve &&
      (l.patchFlag > 0 || o & 6) &&
      l.patchFlag !== 32 &&
      ve.push(l),
    l
  );
}
const ue = al;
function al(e, t = null, n = null, s = 0, r = null, o = !1) {
  if (((!e || e === qi) && (e = kt), Wn(e))) {
    const c = yt(e, t, !0);
    return (
      n && gs(c, n),
      Ut > 0 &&
        !o &&
        ve &&
        (c.shapeFlag & 6 ? (ve[ve.indexOf(e)] = c) : ve.push(c)),
      (c.patchFlag |= -2),
      c
    );
  }
  if ((El(e) && (e = e.__vccOpts), t)) {
    t = dl(t);
    let { class: c, style: l } = t;
    c && !G(c) && (t.class = ns(c)),
      X(l) && ($r(l) && !H(l) && (l = te({}, l)), (t.style = ts(l)));
  }
  const i = G(e) ? 1 : Ti(e) ? 128 : cl(e) ? 64 : X(e) ? 4 : B(e) ? 2 : 0;
  return Ie(e, t, n, s, r, i, o, !0);
}
function dl(e) {
  return e ? ($r(e) || xn in e ? te({}, e) : e) : null;
}
function yt(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e,
    c = t ? hl(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && co(c),
    ref:
      t && t.ref ? (n && r ? (H(r) ? r.concat(sn(t)) : [r, sn(t)]) : sn(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== _e ? (o === -1 ? 16 : o | 16) : o,
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
function ms(e = " ", t = 0) {
  return ue(vn, null, e, t);
}
function Se(e) {
  return e == null || typeof e == "boolean"
    ? ue(kt)
    : H(e)
    ? ue(_e, null, e.slice())
    : typeof e == "object"
    ? Ve(e)
    : ue(vn, null, String(e));
}
function Ve(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : yt(e);
}
function gs(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (H(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), gs(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(xn in t)
        ? (t._ctx = ye)
        : r === 3 &&
          ye &&
          (ye.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    B(t)
      ? ((t = { default: t, _ctx: ye }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [ms(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function hl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = ns([t.class, s.class]));
      else if (r === "style") t.style = ts([t.style, s.style]);
      else if (dn(r)) {
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
function Te(e, t, n, s = null) {
  Ee(e, t, 7, [n, s]);
}
const pl = to();
let ml = 0;
function gl(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || pl,
    o = {
      uid: ml++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Lo(!0),
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
      propsOptions: so(s, r),
      emitsOptions: qr(s, r),
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
    (o.emit = Ri.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let ne = null,
  _s,
  ft,
  qs = "__VUE_INSTANCE_SETTERS__";
(ft = $n()[qs]) || (ft = $n()[qs] = []),
  ft.push((e) => (ne = e)),
  (_s = (e) => {
    ft.length > 1 ? ft.forEach((t) => t(e)) : ft[0](e);
  });
const vt = (e) => {
    _s(e), e.scope.on();
  },
  rt = () => {
    ne && ne.scope.off(), _s(null);
  };
function uo(e) {
  return e.vnode.shapeFlag & 4;
}
let Kt = !1;
function _l(e, t = !1) {
  Kt = t;
  const { props: n, children: s } = e.vnode,
    r = uo(e);
  el(e, n, r, t), sl(e, s);
  const o = r ? bl(e, t) : void 0;
  return (Kt = !1), o;
}
function bl(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Fr(new Proxy(e.ctx, zi)));
  const { setup: s } = n;
  if (s) {
    const r = (e.setupContext = s.length > 1 ? vl(e) : null);
    vt(e), Rt();
    const o = Je(s, e, 0, [e.props, r]);
    if ((Pt(), rt(), _r(o))) {
      if ((o.then(rt, rt), t))
        return o
          .then((i) => {
            Ws(e, i, t);
          })
          .catch((i) => {
            _n(i, e, 0);
          });
      e.asyncDep = o;
    } else Ws(e, o, t);
  } else fo(e, t);
}
function Ws(e, t, n) {
  B(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : X(t) && (e.setupState = jr(t)),
    fo(e, n);
}
let zs;
function fo(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && zs && !s.render) {
      const r = s.template || hs(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: c, compilerOptions: l } = s,
          a = te(te({ isCustomElement: o, delimiters: c }, i), l);
        s.render = zs(r, a);
      }
    }
    e.render = s.render || xe;
  }
  vt(e), Rt(), Vi(e), Pt(), rt();
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
function bs(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(jr(Fr(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in It) return It[n](e);
        },
        has(t, n) {
          return n in t || n in It;
        },
      }))
    );
}
function xl(e, t = !0) {
  return B(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function El(e) {
  return B(e) && "__vccOpts" in e;
}
const pe = (e, t) => bi(e, t, Kt);
function ao(e, t, n) {
  const s = arguments.length;
  return s === 2
    ? X(t) && !H(t)
      ? Wn(t)
        ? ue(e, null, [t])
        : ue(e, t)
      : ue(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && Wn(n) && (n = [n]),
      ue(e, t, n));
}
const wl = Symbol.for("v-scx"),
  Rl = () => je(wl),
  Pl = "3.3.2",
  Cl = "http://www.w3.org/2000/svg",
  nt = typeof document < "u" ? document : null,
  Vs = nt && nt.createElement("template"),
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
        ? nt.createElementNS(Cl, e)
        : nt.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      );
    },
    createText: (e) => nt.createTextNode(e),
    createComment: (e) => nt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => nt.querySelector(e),
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
        Vs.innerHTML = s ? `<svg>${e}</svg>` : e;
        const c = Vs.content;
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
const Qs = /\s*!important$/;
function zn(e, t, n) {
  if (H(n)) n.forEach((s) => zn(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = Sl(e, t);
    Qs.test(n)
      ? e.setProperty(wt(s), n.replace(Qs, ""), "important")
      : (e[s] = n);
  }
}
const Ys = ["Webkit", "Moz", "ms"],
  An = {};
function Sl(e, t) {
  const n = An[t];
  if (n) return n;
  let s = $e(t);
  if (s !== "filter" && s in e) return (An[t] = s);
  s = mn(s);
  for (let r = 0; r < Ys.length; r++) {
    const o = Ys[r] + s;
    if (o in e) return (An[t] = o);
  }
  return t;
}
const Js = "http://www.w3.org/1999/xlink";
function Ml(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Js, t.slice(6, t.length))
      : e.setAttributeNS(Js, t, n);
  else {
    const o = Ho(t);
    n == null || (o && !vr(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function Il(e, t, n, s, r, o, i) {
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
      ? (n = vr(n))
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
const Xs = /(?:Once|Passive|Capture)$/;
function Hl(e) {
  let t;
  if (Xs.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(Xs)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : wt(e.slice(2)), t];
}
let Tn = 0;
const Ll = Promise.resolve(),
  jl = () => Tn || (Ll.then(() => (Tn = 0)), (Tn = Date.now()));
function Bl(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    Ee(kl(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = jl()), n;
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
const Zs = /^on[a-z]/,
  Ul = (e, t, n, s, r = !1, o, i, c, l) => {
    t === "class"
      ? Al(e, s, r)
      : t === "style"
      ? Tl(e, n, s)
      : dn(t)
      ? Xn(t) || Nl(e, t, n, s, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Kl(e, t, s, r)
        )
      ? Il(e, t, s, o, i, c, l)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        Ml(e, t, s, r));
  };
function Kl(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Zs.test(t) && B(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Zs.test(t) && G(n))
    ? !1
    : t in e;
}
const Dl = te({ patchProp: Ul }, Ol);
let Gs;
function ql() {
  return Gs || (Gs = ol(Dl));
}
const Wl = (...e) => {
  const t = ql().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = zl(s);
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
function zl(e) {
  return G(e) ? document.querySelector(e) : e;
}
const Wt = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n;
  },
  Vl = { props: { links: Array } },
  Ql = { class: "header" },
  Yl = { class: "container" },
  Jl = { class: "header__nav" },
  Xl = Ie("a", { href: "", class: "logo" }, "Vue-Router", -1),
  Zl = { class: "header__list" };
function Gl(e, t, n, s, r, o) {
  const i = cn("router-link");
  return (
    Be(),
    ke("header", Ql, [
      Ie("div", Yl, [
        Ie("div", Jl, [
          Xl,
          Ie("ul", Zl, [
            (Be(!0),
            ke(
              _e,
              null,
              Gr(
                n.links,
                (c, l) => (
                  Be(),
                  ke("li", { key: l }, [
                    ue(
                      i,
                      { to: c.url, class: "header__link" },
                      { default: ds(() => [ms(Fn(c.title), 1)]), _: 2 },
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
const ec = Wt(Vl, [["render", Gl]]),
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
  const i = cn("Header"),
    c = cn("router-view");
  return (
    Be(), ke("div", nc, [ue(i, { links: r.links }, null, 8, ["links"]), ue(c)])
  );
}
const rc = Wt(tc, [["render", sc]]);
/*!
 * vue-router v4.2.0
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const at = typeof window < "u";
function oc(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const z = Object.assign;
function Sn(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = we(r) ? r.map(e) : e(r);
  }
  return n;
}
const Ft = () => {},
  we = Array.isArray,
  ic = /\/$/,
  lc = (e) => e.replace(ic, "");
function Mn(e, t, n = "/") {
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
function er(e, t) {
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
    xt(t.matched[s], n.matched[r]) &&
    ho(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function xt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function ho(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!fc(e[n], t[n])) return !1;
  return !0;
}
function fc(e, t) {
  return we(e) ? tr(e, t) : we(t) ? tr(t, e) : e === t;
}
function tr(e, t) {
  return we(t)
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
    if (at) {
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
function mc(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0),
  };
}
const En = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function gc(e) {
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
    t = mc(r, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function nr(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Vn = new Map();
function _c(e, t) {
  Vn.set(e, t);
}
function bc(e) {
  const t = Vn.get(e);
  return Vn.delete(e), t;
}
let yc = () => location.protocol + "//" + location.host;
function po(e, t) {
  const { pathname: n, search: s, hash: r } = t,
    o = e.indexOf("#");
  if (o > -1) {
    let c = r.includes(e.slice(o)) ? e.slice(o).length : 1,
      l = r.slice(c);
    return l[0] !== "/" && (l = "/" + l), er(l, "");
  }
  return er(n, e) + s + r;
}
function vc(e, t, n, s) {
  let r = [],
    o = [],
    i = null;
  const c = ({ state: m }) => {
    const x = po(e, location),
      A = n.value,
      S = t.value;
    let j = 0;
    if (m) {
      if (((n.value = x), (t.value = m), i && i === A)) {
        i = null;
        return;
      }
      j = S ? m.position - S.position : 0;
    } else s(x);
    r.forEach(($) => {
      $(n.value, A, {
        delta: j,
        type: Dt.pop,
        direction: j ? (j > 0 ? Nt.forward : Nt.back) : Nt.unknown,
      });
    });
  };
  function l() {
    i = n.value;
  }
  function a(m) {
    r.push(m);
    const x = () => {
      const A = r.indexOf(m);
      A > -1 && r.splice(A, 1);
    };
    return o.push(x), x;
  }
  function d() {
    const { history: m } = window;
    m.state && m.replaceState(z({}, m.state, { scroll: En() }), "");
  }
  function p() {
    for (const m of o) m();
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
function sr(e, t, n, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: r ? En() : null,
  };
}
function xc(e) {
  const { history: t, location: n } = window,
    s = { value: po(e, n) },
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
      m =
        p > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(p)) + l
          : yc() + e + l;
    try {
      t[d ? "replaceState" : "pushState"](a, "", m), (r.value = a);
    } catch (x) {
      console.error(x), n[d ? "replace" : "assign"](m);
    }
  }
  function i(l, a) {
    const d = z({}, t.state, sr(r.value.back, l, r.value.forward, !0), a, {
      position: r.value.position,
    });
    o(l, d, !0), (s.value = l);
  }
  function c(l, a) {
    const d = z({}, r.value, t.state, { forward: l, scroll: En() });
    o(d.current, d, !0);
    const p = z({}, sr(s.value, l, null), { position: d.position + 1 }, a);
    o(l, p, !1), (s.value = l);
  }
  return { location: s, state: r, push: c, replace: i };
}
function Ec(e) {
  e = dc(e);
  const t = xc(e),
    n = vc(e, t.state, t.location, t.replace);
  function s(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const r = z(
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
function mo(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const ze = {
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
  go = Symbol("");
var rr;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(rr || (rr = {}));
function Et(e, t) {
  return z(new Error(), { type: e, [go]: !0 }, t);
}
function He(e, t) {
  return e instanceof Error && go in e && (t == null || !!(e.type & t));
}
const or = "[^/]+?",
  Rc = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Pc = /[.+*?^${}()[\]/\\]/g;
function Cc(e, t) {
  const n = z({}, Rc, t),
    s = [];
  let r = n.start ? "^" : "";
  const o = [];
  for (const a of e) {
    const d = a.length ? [] : [90];
    n.strict && !a.length && (r += "/");
    for (let p = 0; p < a.length; p++) {
      const m = a[p];
      let x = 40 + (n.sensitive ? 0.25 : 0);
      if (m.type === 0)
        p || (r += "/"), (r += m.value.replace(Pc, "\\$&")), (x += 40);
      else if (m.type === 1) {
        const { value: A, repeatable: S, optional: j, regexp: $ } = m;
        o.push({ name: A, repeatable: S, optional: j });
        const F = $ || or;
        if (F !== or) {
          x += 10;
          try {
            new RegExp(`(${F})`);
          } catch (N) {
            throw new Error(
              `Invalid custom RegExp for param "${A}" (${F}): ` + N.message
            );
          }
        }
        let K = S ? `((?:${F})(?:/(?:${F}))*)` : `(${F})`;
        p || (K = j && a.length < 2 ? `(?:/${K})` : "/" + K),
          j && (K += "?"),
          (r += K),
          (x += 20),
          j && (x += -8),
          S && (x += -20),
          F === ".*" && (x += -50);
      }
      d.push(x);
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
    for (let m = 1; m < d.length; m++) {
      const x = d[m] || "",
        A = o[m - 1];
      p[A.name] = x && A.repeatable ? x.split("/") : x;
    }
    return p;
  }
  function l(a) {
    let d = "",
      p = !1;
    for (const m of e) {
      (!p || !d.endsWith("/")) && (d += "/"), (p = !1);
      for (const x of m)
        if (x.type === 0) d += x.value;
        else if (x.type === 1) {
          const { value: A, repeatable: S, optional: j } = x,
            $ = A in a ? a[A] : "";
          if (we($) && !S)
            throw new Error(
              `Provided param "${A}" is an array but it is not repeatable (* or + modifiers)`
            );
          const F = we($) ? $.join("/") : $;
          if (!F)
            if (j)
              m.length < 2 &&
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
    if (ir(s)) return 1;
    if (ir(r)) return -1;
  }
  return r.length - s.length;
}
function ir(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Tc = { type: 0, value: "" },
  Sc = /[a-zA-Z0-9_]/;
function Mc(e) {
  if (!e) return [[]];
  if (e === "/") return [[Tc]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(x) {
    throw new Error(`ERR (${n})/"${a}": ${x}`);
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
  function m() {
    a += l;
  }
  for (; c < e.length; ) {
    if (((l = e[c++]), l === "\\" && n !== 2)) {
      (s = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        l === "/" ? (a && p(), i()) : l === ":" ? (p(), (n = 1)) : m();
        break;
      case 4:
        m(), (n = s);
        break;
      case 1:
        l === "("
          ? (n = 2)
          : Sc.test(l)
          ? m()
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
function Ic(e, t, n) {
  const s = Cc(Mc(e.path), n),
    r = z(s, { record: e, parent: t, children: [], alias: [] });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function $c(e, t) {
  const n = [],
    s = new Map();
  t = ur({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(d) {
    return s.get(d);
  }
  function o(d, p, m) {
    const x = !m,
      A = Fc(d);
    A.aliasOf = m && m.record;
    const S = ur(t, d),
      j = [A];
    if ("alias" in d) {
      const K = typeof d.alias == "string" ? [d.alias] : d.alias;
      for (const N of K)
        j.push(
          z({}, A, {
            components: m ? m.record.components : A.components,
            path: N,
            aliasOf: m ? m.record : A,
          })
        );
    }
    let $, F;
    for (const K of j) {
      const { path: N } = K;
      if (p && N[0] !== "/") {
        const se = p.record.path,
          le = se[se.length - 1] === "/" ? "" : "/";
        K.path = p.record.path + (N && le + N);
      }
      if (
        (($ = Ic(K, p, S)),
        m
          ? m.alias.push($)
          : ((F = F || $),
            F !== $ && F.alias.push($),
            x && d.name && !cr($) && i(d.name)),
        A.children)
      ) {
        const se = A.children;
        for (let le = 0; le < se.length; le++)
          o(se[le], $, m && m.children[le]);
      }
      (m = m || $),
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
    if (mo(d)) {
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
      (d.record.path !== n[p].record.path || !_o(d, n[p]));

    )
      p++;
    n.splice(p, 0, d), d.record.name && !cr(d) && s.set(d.record.name, d);
  }
  function a(d, p) {
    let m,
      x = {},
      A,
      S;
    if ("name" in d && d.name) {
      if (((m = s.get(d.name)), !m)) throw Et(1, { location: d });
      (S = m.record.name),
        (x = z(
          lr(
            p.params,
            m.keys.filter((F) => !F.optional).map((F) => F.name)
          ),
          d.params &&
            lr(
              d.params,
              m.keys.map((F) => F.name)
            )
        )),
        (A = m.stringify(x));
    } else if ("path" in d)
      (A = d.path),
        (m = n.find((F) => F.re.test(A))),
        m && ((x = m.parse(A)), (S = m.record.name));
    else {
      if (((m = p.name ? s.get(p.name) : n.find((F) => F.re.test(p.path))), !m))
        throw Et(1, { location: d, currentLocation: p });
      (S = m.record.name),
        (x = z({}, p.params, d.params)),
        (A = m.stringify(x));
    }
    const j = [];
    let $ = m;
    for (; $; ) j.unshift($.record), ($ = $.parent);
    return { name: S, path: A, params: x, matched: j, meta: Hc(j) };
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
function lr(e, t) {
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
function cr(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Hc(e) {
  return e.reduce((t, n) => z(t, n.meta), {});
}
function ur(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
function _o(e, t) {
  return t.children.some((n) => n === e || _o(e, n));
}
const bo = /#/g,
  Lc = /&/g,
  jc = /\//g,
  Bc = /=/g,
  kc = /\?/g,
  yo = /\+/g,
  Uc = /%5B/g,
  Kc = /%5D/g,
  vo = /%5E/g,
  Dc = /%60/g,
  xo = /%7B/g,
  qc = /%7C/g,
  Eo = /%7D/g,
  Wc = /%20/g;
function ys(e) {
  return encodeURI("" + e)
    .replace(qc, "|")
    .replace(Uc, "[")
    .replace(Kc, "]");
}
function zc(e) {
  return ys(e).replace(xo, "{").replace(Eo, "}").replace(vo, "^");
}
function Qn(e) {
  return ys(e)
    .replace(yo, "%2B")
    .replace(Wc, "+")
    .replace(bo, "%23")
    .replace(Lc, "%26")
    .replace(Dc, "`")
    .replace(xo, "{")
    .replace(Eo, "}")
    .replace(vo, "^");
}
function Vc(e) {
  return Qn(e).replace(Bc, "%3D");
}
function Qc(e) {
  return ys(e).replace(bo, "%23").replace(kc, "%3F");
}
function Yc(e) {
  return e == null ? "" : Qc(e).replace(jc, "%2F");
}
function an(e) {
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
    const o = s[r].replace(yo, " "),
      i = o.indexOf("="),
      c = an(i < 0 ? o : o.slice(0, i)),
      l = i < 0 ? null : an(o.slice(i + 1));
    if (c in t) {
      let a = t[c];
      we(a) || (a = t[c] = [a]), a.push(l);
    } else t[c] = l;
  }
  return t;
}
function fr(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (((n = Vc(n)), s == null)) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (we(s) ? s.map((o) => o && Qn(o)) : [s && Qn(s)]).forEach((o) => {
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
      (t[n] = we(s)
        ? s.map((r) => (r == null ? null : "" + r))
        : s == null
        ? s
        : "" + s);
  }
  return t;
}
const Zc = Symbol(""),
  ar = Symbol(""),
  vs = Symbol(""),
  wo = Symbol(""),
  Yn = Symbol("");
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
function Qe(e, t, n, s, r) {
  const o = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () =>
    new Promise((i, c) => {
      const l = (p) => {
          p === !1
            ? c(Et(4, { from: n, to: t }))
            : p instanceof Error
            ? c(p)
            : wc(p)
            ? c(Et(2, { from: t, to: p }))
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
          a && r.push(Qe(a, n, s, o, i));
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
              const m = (d.__vccOpts || d)[t];
              return m && Qe(m, n, s, o, i)();
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
function dr(e) {
  const t = je(vs),
    n = je(wo),
    s = pe(() => t.resolve(gt(e.to))),
    r = pe(() => {
      const { matched: l } = s.value,
        { length: a } = l,
        d = l[a - 1],
        p = n.matched;
      if (!d || !p.length) return -1;
      const m = p.findIndex(xt.bind(null, d));
      if (m > -1) return m;
      const x = hr(l[a - 2]);
      return a > 1 && hr(d) === x && p[p.length - 1].path !== x
        ? p.findIndex(xt.bind(null, l[a - 2]))
        : m;
    }),
    o = pe(() => r.value > -1 && su(n.params, s.value.params)),
    i = pe(
      () =>
        r.value > -1 &&
        r.value === n.matched.length - 1 &&
        ho(n.params, s.value.params)
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
const eu = Qr({
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
    useLink: dr,
    setup(e, { slots: t }) {
      const n = qt(dr(e)),
        { options: s } = je(vs),
        r = pe(() => ({
          [pr(e.activeClass, s.linkActiveClass, "router-link-active")]:
            n.isActive,
          [pr(
            e.exactActiveClass,
            s.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const o = t.default && t.default(n);
        return e.custom
          ? o
          : ao(
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
    } else if (!we(r) || r.length !== s.length || s.some((o, i) => o !== r[i]))
      return !1;
  }
  return !0;
}
function hr(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const pr = (e, t, n) => e ?? t ?? n,
  ru = Qr({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const s = je(Yn),
        r = pe(() => e.route || s.value),
        o = je(ar, 0),
        i = pe(() => {
          let a = gt(o);
          const { matched: d } = r.value;
          let p;
          for (; (p = d[a]) && !p.components; ) a++;
          return a;
        }),
        c = pe(() => r.value.matched[i.value]);
      nn(
        ar,
        pe(() => i.value + 1)
      ),
        nn(Zc, c),
        nn(Yn, r);
      const l = hi();
      return (
        en(
          () => [l.value, c.value, e.name],
          ([a, d, p], [m, x, A]) => {
            d &&
              ((d.instances[p] = a),
              x &&
                x !== d &&
                a &&
                a === m &&
                (d.leaveGuards.size || (d.leaveGuards = x.leaveGuards),
                d.updateGuards.size || (d.updateGuards = x.updateGuards))),
              a &&
                d &&
                (!x || !xt(d, x) || !m) &&
                (d.enterCallbacks[p] || []).forEach((S) => S(a));
          },
          { flush: "post" }
        ),
        () => {
          const a = r.value,
            d = e.name,
            p = c.value,
            m = p && p.components[d];
          if (!m) return mr(n.default, { Component: m, route: a });
          const x = p.props[d],
            A = x
              ? x === !0
                ? a.params
                : typeof x == "function"
                ? x(a)
                : x
              : null,
            j = ao(
              m,
              z({}, A, t, {
                onVnodeUnmounted: ($) => {
                  $.component.isUnmounted && (p.instances[d] = null);
                },
                ref: l,
              })
            );
          return mr(n.default, { Component: j, route: a }) || j;
        }
      );
    },
  });
function mr(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const ou = ru;
function iu(e) {
  const t = $c(e.routes, e),
    n = e.parseQuery || Jc,
    s = e.stringifyQuery || fr,
    r = e.history,
    o = Tt(),
    i = Tt(),
    c = Tt(),
    l = pi(ze);
  let a = ze;
  at &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const d = Sn.bind(null, (_) => "" + _),
    p = Sn.bind(null, Yc),
    m = Sn.bind(null, an);
  function x(_, C) {
    let R, T;
    return (
      mo(_) ? ((R = t.getRecordMatcher(_)), (T = C)) : (T = _), t.addRoute(T, R)
    );
  }
  function A(_) {
    const C = t.getRecordMatcher(_);
    C && t.removeRoute(C);
  }
  function S() {
    return t.getRoutes().map((_) => _.record);
  }
  function j(_) {
    return !!t.getRecordMatcher(_);
  }
  function $(_, C) {
    if (((C = z({}, C || l.value)), typeof _ == "string")) {
      const h = Mn(n, _, C.path),
        g = t.resolve({ path: h.path }, C),
        b = r.createHref(h.fullPath);
      return z(h, g, {
        params: m(g.params),
        hash: an(h.hash),
        redirectedFrom: void 0,
        href: b,
      });
    }
    let R;
    if ("path" in _) R = z({}, _, { path: Mn(n, _.path, C.path).path });
    else {
      const h = z({}, _.params);
      for (const g in h) h[g] == null && delete h[g];
      (R = z({}, _, { params: p(h) })), (C.params = p(C.params));
    }
    const T = t.resolve(R, C),
      W = _.hash || "";
    T.params = d(m(T.params));
    const u = cc(s, z({}, _, { hash: zc(W), path: T.path })),
      f = r.createHref(u);
    return z(
      { fullPath: u, hash: W, query: s === fr ? Xc(_.query) : _.query || {} },
      T,
      { redirectedFrom: void 0, href: f }
    );
  }
  function F(_) {
    return typeof _ == "string" ? Mn(n, _, l.value.path) : z({}, _);
  }
  function K(_, C) {
    if (a !== _) return Et(8, { from: C, to: _ });
  }
  function N(_) {
    return Re(_);
  }
  function se(_) {
    return N(z(F(_), { replace: !0 }));
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
        z(
          { query: _.query, hash: _.hash, params: "path" in T ? {} : _.params },
          T
        )
      );
    }
  }
  function Re(_, C) {
    const R = (a = $(_)),
      T = l.value,
      W = _.state,
      u = _.force,
      f = _.replace === !0,
      h = le(R);
    if (h)
      return Re(
        z(F(h), {
          state: typeof h == "object" ? z({}, W, h.state) : W,
          force: u,
          replace: f,
        }),
        C || R
      );
    const g = R;
    g.redirectedFrom = C;
    let b;
    return (
      !u && uc(s, T, R) && ((b = Et(16, { to: g, from: T })), Oe(T, T, !0, !1)),
      (b ? Promise.resolve(b) : Pe(g, T))
        .catch((y) => (He(y) ? (He(y, 2) ? y : qe(y)) : q(y, g, T)))
        .then((y) => {
          if (y) {
            if (He(y, 2))
              return Re(
                z({ replace: f }, F(y.to), {
                  state: typeof y.to == "object" ? z({}, W, y.to.state) : W,
                  force: u,
                }),
                C || g
              );
          } else y = Ze(g, T, !0, f, W);
          return De(g, T, y), y;
        })
    );
  }
  function Fe(_, C) {
    const R = K(_, C);
    return R ? Promise.reject(R) : Promise.resolve();
  }
  function ot(_) {
    const C = ct.values().next().value;
    return C && typeof C.runWithContext == "function"
      ? C.runWithContext(_)
      : _();
  }
  function Pe(_, C) {
    let R;
    const [T, W, u] = lu(_, C);
    R = In(T.reverse(), "beforeRouteLeave", _, C);
    for (const h of T)
      h.leaveGuards.forEach((g) => {
        R.push(Qe(g, _, C));
      });
    const f = Fe.bind(null, _, C);
    return (
      R.push(f),
      re(R)
        .then(() => {
          R = [];
          for (const h of o.list()) R.push(Qe(h, _, C));
          return R.push(f), re(R);
        })
        .then(() => {
          R = In(W, "beforeRouteUpdate", _, C);
          for (const h of W)
            h.updateGuards.forEach((g) => {
              R.push(Qe(g, _, C));
            });
          return R.push(f), re(R);
        })
        .then(() => {
          R = [];
          for (const h of _.matched)
            if (h.beforeEnter && !C.matched.includes(h))
              if (we(h.beforeEnter))
                for (const g of h.beforeEnter) R.push(Qe(g, _, C));
              else R.push(Qe(h.beforeEnter, _, C));
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
          for (const h of i.list()) R.push(Qe(h, _, C));
          return R.push(f), re(R);
        })
        .catch((h) => (He(h, 8) ? h : Promise.reject(h)))
    );
  }
  function De(_, C, R) {
    for (const T of c.list()) ot(() => T(_, C, R));
  }
  function Ze(_, C, R, T, W) {
    const u = K(_, C);
    if (u) return u;
    const f = C === ze,
      h = at ? history.state : {};
    R &&
      (T || f
        ? r.replace(_.fullPath, z({ scroll: f && h && h.scroll }, W))
        : r.push(_.fullPath, W)),
      (l.value = _),
      Oe(_, C, R, f),
      qe();
  }
  let Ce;
  function Ct() {
    Ce ||
      (Ce = r.listen((_, C, R) => {
        if (!zt.listening) return;
        const T = $(_),
          W = le(T);
        if (W) {
          Re(z(W, { replace: !0 }), T).catch(Ft);
          return;
        }
        a = T;
        const u = l.value;
        at && _c(nr(u.fullPath, R.delta), En()),
          Pe(T, u)
            .catch((f) =>
              He(f, 12)
                ? f
                : He(f, 2)
                ? (Re(f.to, T)
                    .then((h) => {
                      He(h, 20) &&
                        !R.delta &&
                        R.type === Dt.pop &&
                        r.go(-1, !1);
                    })
                    .catch(Ft),
                  Promise.reject())
                : (R.delta && r.go(-R.delta, !1), q(f, T, u))
            )
            .then((f) => {
              (f = f || Ze(T, u, !1)),
                f &&
                  (R.delta && !He(f, 8)
                    ? r.go(-R.delta, !1)
                    : R.type === Dt.pop && He(f, 20) && r.go(-1, !1)),
                De(T, u, f);
            })
            .catch(Ft);
      }));
  }
  let it = Tt(),
    ee = Tt(),
    Q;
  function q(_, C, R) {
    qe(_);
    const T = ee.list();
    return (
      T.length ? T.forEach((W) => W(_, C, R)) : console.error(_),
      Promise.reject(_)
    );
  }
  function Ne() {
    return Q && l.value !== ze
      ? Promise.resolve()
      : new Promise((_, C) => {
          it.add([_, C]);
        });
  }
  function qe(_) {
    return (
      Q ||
        ((Q = !_),
        Ct(),
        it.list().forEach(([C, R]) => (_ ? R(_) : C())),
        it.reset()),
      _
    );
  }
  function Oe(_, C, R, T) {
    const { scrollBehavior: W } = e;
    if (!at || !W) return Promise.resolve();
    const u =
      (!R && bc(nr(_.fullPath, 0))) ||
      ((T || !R) && history.state && history.state.scroll) ||
      null;
    return kr()
      .then(() => W(_, C, u))
      .then((f) => f && gc(f))
      .catch((f) => q(f, _, C));
  }
  const fe = (_) => r.go(_);
  let lt;
  const ct = new Set(),
    zt = {
      currentRoute: l,
      listening: !0,
      addRoute: x,
      removeRoute: A,
      hasRoute: j,
      getRoutes: S,
      resolve: $,
      options: e,
      push: N,
      replace: se,
      go: fe,
      back: () => fe(-1),
      forward: () => fe(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: c.add,
      onError: ee.add,
      isReady: Ne,
      install(_) {
        const C = this;
        _.component("RouterLink", tu),
          _.component("RouterView", ou),
          (_.config.globalProperties.$router = C),
          Object.defineProperty(_.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => gt(l),
          }),
          at &&
            !lt &&
            l.value === ze &&
            ((lt = !0), N(r.location).catch((W) => {}));
        const R = {};
        for (const W in ze) R[W] = pe(() => l.value[W]);
        _.provide(vs, C), _.provide(wo, qt(R)), _.provide(Yn, l);
        const T = _.unmount;
        ct.add(_),
          (_.unmount = function () {
            ct.delete(_),
              ct.size < 1 &&
                ((a = ze),
                Ce && Ce(),
                (Ce = null),
                (l.value = ze),
                (lt = !1),
                (Q = !1)),
              T();
          });
      },
    };
  function re(_) {
    return _.reduce((C, R) => C.then(() => ot(R)), Promise.resolve());
  }
  return zt;
}
function lu(e, t) {
  const n = [],
    s = [],
    r = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const c = t.matched[i];
    c && (e.matched.find((a) => xt(a, c)) ? s.push(c) : n.push(c));
    const l = e.matched[i];
    l && (t.matched.find((a) => xt(a, l)) || r.push(l));
  }
  return [n, s, r];
}
const cu = {};
function uu(e, t, n, s, r, o) {
  return Be(), ke("h1", null, "Home page");
}
const fu = Wt(cu, [["render", uu]]),
  au = {};
function du(e, t, n, s, r, o) {
  return Be(), ke("h1", null, "About page");
}
const hu = Wt(au, [["render", du]]),
  pu = [
    {
      id: 1,
      title: "BMW",
      text: `
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quam velit exercitationem harum facere distinctio porro animi fuga cum rem neque officia ullam voluptas repudiandae nihil nemo, quisquam ab dicta. Mollitia tempora consectetur reiciendis dolores ullam fugiat, non expedita recusandae sapiente veritatis rerum dolor dolorum repellat, nihil eveniet laboriosam deleniti!`,
    },
    {
      id: 2,
      title: "MERS",
      text: `
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quam velit exercitationem harum facere distinctio porro animi fuga cum rem neque officia ullam voluptas repudiandae nihil nemo, quisquam ab dicta. Mollitia tempora consectetur reiciendis dolores ullam fugiat, non expedita recusandae sapiente veritatis rerum dolor dolorum repellat, nihil eveniet laboriosam deleniti!`,
    },
    {
      id: 3,
      title: "AUDI",
      text: `
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quam velit exercitationem harum facere distinctio porro animi fuga cum rem neque officia ullam voluptas repudiandae nihil nemo, quisquam ab dicta. Mollitia tempora consectetur reiciendis dolores ullam fugiat, non expedita recusandae sapiente veritatis rerum dolor dolorum repellat, nihil eveniet laboriosam deleniti!`,
    },
  ],
  mu = {
    data() {
      return { cars: pu };
    },
  },
  gu = { class: "main" },
  _u = { class: "container" },
  bu = { class: "main__car" },
  yu = ["src"];
function vu(e, t, n, s, r, o) {
  const i = cn("router-link");
  return (
    Be(),
    ke("main", gu, [
      Ie("div", _u, [
        Ie("div", bu, [
          (Be(!0),
          ke(
            _e,
            null,
            Gr(
              r.cars,
              (c) => (
                Be(),
                ke("div", { class: "main__item", key: c.id }, [
                  Ie("img", { src: c.img, alt: "" }, null, 8, yu),
                  ue(
                    i,
                    { to: "/" },
                    { default: ds(() => [ms(Fn(c.title), 1)]), _: 2 },
                    1024
                  ),
                  Ie("p", null, Fn(c.text), 1),
                ])
              )
            ),
            128
          )),
        ]),
      ]),
    ])
  );
}
const xu = Wt(mu, [["render", vu]]),
  Eu = iu({
    history: Ec(),
    routes: [
      { path: "/", name: "home", component: fu },
      { path: "/about", name: "about", component: hu },
      { path: "/cars", name: "cars", component: xu },
    ],
  });
Wl(rc).use(Eu).mount("#app");
