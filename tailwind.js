/*!
 * tailwindcss v3.4.17 — CDN browser build
 * MIT License | https://tailwindcss.com
 *
 * This is the self-hosted copy of the Tailwind CSS CDN runtime.
 * index.html loads it via https://cdn.tailwindcss.com by default.
 * Swap the <script> src to "./tailwind.js" for offline / self-hosted use.
 */
(()=>{var qv=Object.create;var Hi=Object.defineProperty;var $v=Object.getOwnPropertyDescriptor;var Lv=Object.getOwnPropertyNames;var Mv=Object.getPrototypeOf,Nv=Object.prototype.hasOwnProperty;var df=r=>Hi(r,"__esModule",{value:!0});var hf=r=>{if(typeof require!="undefined")return require(r);throw new Error('Dynamic require of "'+r+'" is not supported')};var P=(r,e)=>()=>(r&&(e=r(r=0)),e);var x=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),Ge=(r,e)=>{df(r);for(var t in e)Hi(r,t,{get:e[t],enumerable:!0})},Bv=(r,e,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Lv(e))!Nv.call(r,i)&&i!=="default"&&Hi(r,i,{get:()=>e[i],enumerable:!(t=$v(e,i))||t.enumerable});return r},pe=r=>Bv(df(Hi(r!=null?qv(Mv(r)):{},"default",r&&r.__esModule&&"default"in r?{get:()=>r.default,enumerable:!0}:{value:r,enumerable:!0})),r);var m,u=P(()=>{m={platform:"",env:{},versions:{node:"14.17.6"}}});var Fv,be,ft=P(()=>{u();Fv=0,be={readFileSync:r=>self[r]||"",statSync:()=>({mtimeMs:Fv++}),promises:{readFile:r=>Promise.resolve(self[r]||"")}}});console.warn("cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation");})();
