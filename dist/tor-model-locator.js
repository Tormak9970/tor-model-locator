import n from "fs";
import s from "path";
function j(d) {
  const m = n.readFileSync(d, "utf-8"), l = JSON.parse(m), u = {
    slots: l
  };
  for (let a = 0; a < l.length; a++) {
    const f = l[a];
    f.materialInfo.eyeMatInfo && (u.eyeMatInfo = f.materialInfo.eyeMatInfo);
  }
  return u;
}
function p(d, m, l) {
  function u(a) {
    return a.materialInfo.mats !== void 0;
  }
  if (u(d)) {
    const a = d.materialInfo.mats;
    for (let f = 0; f < a.length; f++) {
      const x = a[f], r = s.join(m, "assets", "materials", "skinMats", x.slotName);
      n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
      let o = s.join(l, x.materialInfo.matPath);
      if (n.existsSync(o)) {
        o = o.replace(/\\/g, "/");
        const t = o.lastIndexOf("/"), e = s.join(r, o.substring(t));
        n.copyFileSync(o, e);
      }
      const c = Object.values(x.ddsPaths);
      for (let t = 0; t < c.length; t++) {
        let e = c[t];
        (e == "/.dds" || e == ".dds") && (e = s.join("art", "defaultassets", "black.dds"));
        let i = s.join(l, e);
        if (n.existsSync(i)) {
          i = i.replace(/\\/g, "/");
          const y = i.lastIndexOf("/"), h = s.join(r, i.substring(y + 1));
          n.copyFileSync(i, h);
        } else
          throw new Error(`Missing texture file in extraction: ${i}`);
      }
    }
  } else {
    const a = s.join(m, "assets", "models", d.slotName);
    n.existsSync(a) || n.mkdirSync(a, { recursive: !0 });
    const f = d.models;
    for (let c = 0; c < f.length; c++) {
      let t = s.join(l, f[c]);
      if (n.existsSync(t)) {
        t = t.replace(/\\/g, "/");
        const e = t.lastIndexOf("/"), i = s.join(a, t.substring(e));
        n.copyFileSync(t, i);
      } else
        throw new Error(`Missing model file in extraction: ${t}`);
    }
    const x = s.join(m, "assets", "materials", d.slotName);
    let r = s.join(l, d.materialInfo.matPath);
    if (n.existsSync(x)) {
      r = r.replace(/\\/g, "/");
      const c = r.lastIndexOf("/"), t = s.join(x, r.substring(c));
      n.copyFileSync(r, t);
    }
    const o = Object.values(d.materialInfo.ddsPaths);
    for (let c = 0; c < o.length; c++) {
      let t = o[c];
      (t == "/.dds" || t == ".dds") && (t = s.join("art", "defaultassets", "black.dds"));
      let e = s.join(l, t);
      if (n.existsSync(e)) {
        e = e.replace(/\\/g, "/");
        const i = e.lastIndexOf("/"), y = s.join(x, e.substring(i + 1));
        n.copyFileSync(e, y);
      } else
        throw new Error(`Missing texture file in extraction: ${e}`);
    }
  }
}
function I(d, m) {
  var f;
  const l = d, u = s.join(l, "assets", "paths.json"), a = m;
  if (n.existsSync(a)) {
    const { slots: x, eyeMatInfo: r } = j(u);
    if ((f = r == null ? void 0 : r.otherValues) != null && f.derived) {
      const o = s.join(l, "assets", "materials", "eye");
      n.existsSync(o) || n.mkdirSync(o, { recursive: !0 });
      const c = Object.values(r.ddsPaths);
      for (let t = 0; t < c.length; t++) {
        let e = c[t];
        (e == "/.dds" || e == ".dds") && (e = s.join("art", "defaultassets", "black.dds"));
        let i = s.join(a, e);
        if (n.existsSync(i)) {
          i = i.replace(/\\/g, "/");
          const y = i.lastIndexOf("/"), h = s.join(o, i.substring(y + 1));
          n.copyFileSync(i, h);
        } else
          throw new Error(`Missing texture file in extraction: ${i}`);
      }
    }
    for (let o = 0; o < x.length; o++)
      p(x[o], l, a);
    return !0;
  } else
    throw new Error("Extraction folder does not exist or is undefined");
}
export {
  I as locate
};
