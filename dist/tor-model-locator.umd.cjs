(function(x,m){typeof exports=="object"&&typeof module<"u"?m(exports,require("fs"),require("path")):typeof define=="function"&&define.amd?define(["exports","fs","path"],m):(x=typeof globalThis<"u"?globalThis:x||self,m(x.TorModelLocator={},x.fs,x.path))})(this,function(x,m,g){"use strict";const S=i=>i&&typeof i=="object"&&"default"in i?i:{default:i},s=S(m),n=S(g);function I(i){const y=s.default.readFileSync(i,"utf-8"),c=JSON.parse(y),h={slots:c};for(let l=0;l<c.length;l++){const r=c[l];r.materialInfo.eyeMatInfo&&(h.eyeMatInfo=r.materialInfo.eyeMatInfo)}return h}function b(i,y,c){function h(l){return l.materialInfo.mats!==void 0}if(h(i)){const l=i.materialInfo.mats;for(let r=0;r<l.length;r++){const u=l[r],f=n.default.join(y,"assets","materials","skinMats",u.slotName);s.default.existsSync(f)||s.default.mkdirSync(f,{recursive:!0});let o=n.default.join(c,u.materialInfo.matPath);if(s.default.existsSync(o)){o=o.replace(/\\/g,"/");const t=o.lastIndexOf("/"),e=n.default.join(f,o.substring(t));s.default.copyFileSync(o,e)}const d=Object.values(u.ddsPaths);for(let t=0;t<d.length;t++){let e=d[t];(e=="/.dds"||e==".dds")&&(e=n.default.join("art","defaultassets","black.dds"));let a=n.default.join(c,e);if(s.default.existsSync(a)){a=a.replace(/\\/g,"/");const p=a.lastIndexOf("/"),j=n.default.join(f,a.substring(p+1));s.default.copyFileSync(a,j)}else throw new Error(`Missing texture file in extraction: ${a}`)}}}else{const l=n.default.join(y,"assets","models",i.slotName);s.default.existsSync(l)||s.default.mkdirSync(l,{recursive:!0});const r=i.models;for(let d=0;d<r.length;d++){let t=n.default.join(c,r[d]);if(s.default.existsSync(t)){t=t.replace(/\\/g,"/");const e=t.lastIndexOf("/"),a=n.default.join(l,t.substring(e));s.default.copyFileSync(t,a)}else throw new Error(`Missing model file in extraction: ${t}`)}const u=n.default.join(y,"assets","materials",i.slotName);let f=n.default.join(c,i.materialInfo.matPath);if(s.default.existsSync(u)){f=f.replace(/\\/g,"/");const d=f.lastIndexOf("/"),t=n.default.join(u,f.substring(d));s.default.copyFileSync(f,t)}const o=Object.values(i.materialInfo.ddsPaths);for(let d=0;d<o.length;d++){let t=o[d];(t=="/.dds"||t==".dds")&&(t=n.default.join("art","defaultassets","black.dds"));let e=n.default.join(c,t);if(s.default.existsSync(e)){e=e.replace(/\\/g,"/");const a=e.lastIndexOf("/"),p=n.default.join(u,e.substring(a+1));s.default.copyFileSync(e,p)}else throw new Error(`Missing texture file in extraction: ${e}`)}}}function P(i,y){var r;const c=i,h=n.default.join(c,"assets","paths.json"),l=y;if(s.default.existsSync(l)){const{slots:u,eyeMatInfo:f}=I(h);if((r=f==null?void 0:f.otherValues)!=null&&r.derived){const o=n.default.join(c,"assets","materials","eye");s.default.existsSync(o)||s.default.mkdirSync(o,{recursive:!0});const d=Object.values(f.ddsPaths);for(let t=0;t<d.length;t++){let e=d[t];(e=="/.dds"||e==".dds")&&(e=n.default.join("art","defaultassets","black.dds"));let a=n.default.join(l,e);if(s.default.existsSync(a)){a=a.replace(/\\/g,"/");const p=a.lastIndexOf("/"),j=n.default.join(o,a.substring(p+1));s.default.copyFileSync(a,j)}else throw new Error(`Missing texture file in extraction: ${a}`)}}for(let o=0;o<u.length;o++)b(u[o],c,l);return!0}else throw new Error("Extraction folder does not exist or is undefined")}x.locate=P,Object.defineProperties(x,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});