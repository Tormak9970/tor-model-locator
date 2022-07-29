import e from "fs";
import s from "path";
function p(f) {
  const u = e.readFileSync(f, "utf-8"), a = JSON.parse(u), h = {
    slots: a
  };
  for (let i = 0; i < a.length; i++) {
    const l = a[i];
    l.materialInfo.eyeMatInfo && (h.eyeMatInfo = l.materialInfo.eyeMatInfo);
  }
  return h;
}
function S(f, u, a) {
  function h(i) {
    return i.materialInfo.mats !== void 0;
  }
  if (h(f)) {
    const i = f.materialInfo.mats;
    for (let l = 0; l < i.length; l++) {
      const x = i[l], r = s.join(u, "assets", "materials", "skinMats", x.slotName);
      e.existsSync(r) || e.mkdirSync(r, { recursive: !0 });
      let o = s.join(a, x.materialInfo.matPath);
      if (e.existsSync(o)) {
        o = o.replace(/\\/g, "/");
        const d = o.lastIndexOf("/"), n = s.join(r, o.substring(d));
        e.copyFileSync(o, n);
      }
      const m = Object.values(x.ddsPaths);
      for (let d = 0; d < m.length; d++) {
        let n = m[d];
        (n == "/.dds" || n == ".dds") && (n = s.join("art", "defaultassets", "black.dds"));
        let t = s.join(a, n);
        if (e.existsSync(t)) {
          t = t.replace(/\\/g, "/");
          const c = t.lastIndexOf("/"), y = s.join(r, t.substring(c + 1));
          e.copyFileSync(t, y);
        } else
          throw new Error(`Missing texture file in extraction: ${t}`);
      }
    }
  } else {
    const i = s.join(u, "assets", "models", f.slotName);
    e.existsSync(i) || e.mkdirSync(i, { recursive: !0 });
    const l = f.models;
    for (let n = 0; n < l.length; n++) {
      let t = s.join(a, l[n]);
      if (e.existsSync(t)) {
        t = t.replace(/\\/g, "/");
        const c = t.lastIndexOf("/"), y = s.join(i, t.substring(c));
        e.copyFileSync(t, y);
      } else
        throw new Error(`Missing model file in extraction: ${t}`);
    }
    const x = s.join(u, "assets", "materials", f.slotName);
    e.existsSync(x) || e.mkdirSync(x, { recursive: !0 });
    let r = s.join(a, f.materialInfo.matPath);
    r = r.replace(/\\/g, "/");
    const o = r.lastIndexOf("/"), m = s.join(x, r.substring(o));
    e.copyFileSync(r, m);
    const d = Object.values(f.materialInfo.ddsPaths);
    for (let n = 0; n < d.length; n++) {
      let t = d[n];
      (t == "/.dds" || t == ".dds") && (t = s.join("art", "defaultassets", "black.dds"));
      let c = s.join(a, t);
      if (e.existsSync(c)) {
        c = c.replace(/\\/g, "/");
        const y = c.lastIndexOf("/"), j = s.join(x, c.substring(y + 1));
        e.copyFileSync(c, j);
      } else
        throw new Error(`Missing texture file in extraction: ${c}`);
    }
  }
}
function P(f, u) {
  var l;
  const a = f, h = s.join(a, "assets", "paths.json"), i = u;
  if (e.existsSync(i)) {
    const { slots: x, eyeMatInfo: r } = p(h);
    if ((l = r == null ? void 0 : r.otherValues) != null && l.derived) {
      const o = s.join(a, "assets", "materials", "eye");
      e.existsSync(o) || e.mkdirSync(o, { recursive: !0 });
      const m = Object.values(r.ddsPaths);
      for (let d = 0; d < m.length; d++) {
        let n = m[d];
        (n == "/.dds" || n == ".dds") && (n = s.join("art", "defaultassets", "black.dds"));
        let t = s.join(i, n);
        if (e.existsSync(t)) {
          t = t.replace(/\\/g, "/");
          const c = t.lastIndexOf("/"), y = s.join(o, t.substring(c + 1));
          e.copyFileSync(t, y);
        } else
          throw new Error(`Missing texture file in extraction: ${t}`);
      }
    }
    for (let o = 0; o < x.length; o++)
      S(x[o], a, i);
    return !0;
  } else
    throw new Error("Extraction folder does not exist or is undefined");
}
export {
  P as locate
};
