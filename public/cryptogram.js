(()=>{var se=Object.defineProperty;var G=t=>{throw TypeError(t)};var v=(t,e)=>()=>(t&&(e=t(t=0)),e);var ie=(t,e)=>{for(var r in e)se(t,r,{get:e[r],enumerable:!0})};var T=(t,e,r)=>e.has(t)||G("Cannot "+r);var s=(t,e,r)=>(T(t,e,"read from private field"),r?r.call(t):e.get(t)),o=(t,e,r)=>e.has(t)?G("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,r),a=(t,e,r,n)=>(T(t,e,"write to private field"),n?n.call(t,r):e.set(t,r),r),u=(t,e,r)=>(T(t,e,"access private method"),r);var W=(t,e,r,n)=>({set _(i){a(t,e,i,r)},get _(){return s(t,e,n)}});function ce(t){let e=document.createElement("button");return e.dataset.key=t,e.innerText=ue(t),t==="Shift"&&e.classList.toggle("active",C),e.innerText!==t&&(e.dataset.special=""),e.tabIndex=-1,e.addEventListener("click",ae),e}function ae(){let{key:t}=this.dataset;if(!t)throw new Error("???");document.dispatchEvent(new KeyboardEvent("keydown",{key:t,shiftKey:C}))}function _(){document.querySelectorAll('button[data-key="Shift"]').forEach(t=>{t.classList.toggle("active",C)})}function ue(t){switch(t){case"Tab":return"\u21C6";case"Shift":return"\u2191";case"Enter":return"\u21B5";case"Backspace":case"Delete":return"\u2190";default:return t}}var oe,U,C,F=v(()=>{oe=[[..."1234567890-".split("")],[..."QWERTYUIOP".split(""),"Backspace"],[..."ASDFGHJKL".split("")],["Shift",..."ZXCVBNM".split(""),"Enter"]],U=document.createElement("div"),C=!1;document.addEventListener("keydown",({key:t,isTrusted:e})=>{t==="Shift"&&(C=e||!C,_())});document.addEventListener("keyup",({key:t})=>{t==="Shift"&&(C=!1,_())});oe.forEach(t=>{let e=document.createElement("div");e.classList.add("keyboard-row"),t.forEach(r=>{e.append(ce(r))}),U.append(e)});U.classList.add("keyboard");document.body.append(U)});var K,le,I,z,w,S,m,p,N,J,f,y,Q=v(()=>{K="ClueUpdate",le=new CustomEvent(K),f=class f{constructor(e=""){o(this,p);o(this,z,document.createElement("div"));o(this,w);o(this,S,f.SYMBOL);o(this,m,0);if(e instanceof f)a(this,m,s(e,m)),a(this,S,s(e,S));else if(typeof e=="string")e&&u(this,p,N).call(this,e);else if(Number.isInteger(e))e<0?a(this,m,W(f,I)._--):a(this,m,e);else throw new Error(e)}static get SYMBOL(){return"_"}get char(){return s(this,S)}get code(){return s(this,m)}isSet(){return this.char!==f.SYMBOL&&this.char.length===1}isPuzzle(){return Number.isInteger(this.code)&&this.code}set(e=""){this.code&&(e?u(this,p,N).call(this,e):u(this,p,N).call(this,f.SYMBOL))}onChange(e){s(this,z).addEventListener(K,e)}toString(){return this.char}};I=new WeakMap,z=new WeakMap,w=new WeakMap,S=new WeakMap,m=new WeakMap,p=new WeakSet,N=function(e=""){if(!e)throw new Error(e);this.char===e||this.char.length>1||(u(this,p,J).call(this),a(this,S,e),a(this,w,K),s(this,z).dispatchEvent(le),a(this,w,!1))},J=function(){if(s(this,w))throw new Error(s(this,w))},o(f,I,-1);y=f});function M(t){document.querySelectorAll(".".concat(t)).forEach(({classList:e})=>e.remove(t))}var O=v(()=>{});function he(t){return t==="_"?" ":t}function fe(t){return!t||!Number.isInteger(t)?"":t<0?"?":t}function me(){this.classList.contains("selected")||(M("selected"),this.classList.add("selected"),q())}var de,l,x,P,g,H,D,Y,A,X=v(()=>{$();j();O();de=document.querySelector("#tile").innerHTML,Y=class Y{constructor(e,r){o(this,g);o(this,l);o(this,x);o(this,P);a(this,l,e),a(this,x,r),a(this,P,document.createElement("div")),u(this,g,H).call(this),e.onChange(()=>{try{u(this,g,D).call(this)}catch(n){u(this,g,H).call(this)}})}static get SPECIAL(){return[...E.ALPHA,"_"]}get container(){return s(this,P)}get isSpace(){return s(this,l).char===" "}get isUnknown(){return s(this,l).code<0?s(this,l).char:!1}set(e){let{code:r}=s(this,l);return!r||e&&!E.ALPHA.includes(e)?!1:s(this,x).set(r,e)}};l=new WeakMap,x=new WeakMap,P=new WeakMap,g=new WeakSet,H=function(){let{container:e}=this;e._tile=this,e.classList.add("tile"),e.innerHTML=de,s(this,l).isPuzzle()&&(e.classList.add("clickable"),e.addEventListener("click",me)),u(this,g,D).call(this)},D=function(){let{code:e,char:r}=s(this,l);this.container.querySelector(".symbol").textContent=he(r),this.container.querySelector(".number").textContent=fe(e),this.container.classList.toggle("special",r.length>1||!Y.SPECIAL.includes(r))};A=Y});var R,b,d,L,E,$=v(()=>{Q();X();R="abcdefghijklmnopqrstuvwxyz".split(""),E=class{constructor(e=[],r=[]){o(this,d);o(this,b,new Set);e.forEach((n=[],i)=>{!n.length||n[0]===0||(i&&s(this,b).add(new y(" ")),n.forEach(c=>s(this,b).add(new y(c))))}),this.length&&r.forEach(([n,i])=>{let c=Number(n);!Number.isInteger(c)||typeof i!="string"||!this.numbers.includes(c)||c>0&&!this.letters.includes(i)||this.set(c,i)})}static get ALPHA(){return R}get letters(){let e=new Set(R);return s(this,d,L).forEach(({char:r,code:n})=>{!Number.isInteger(n)||n<0||e.delete(r.toLowerCase())}),[...e]}get numbers(){let e=new Set([0]);e.delete(0);for(let r of s(this,d,L))r.isSet()||!r.isPuzzle()||e.add(r.code);return[...e]}get message(){return s(this,d,L).join("")}get solved(){return!s(this,d,L).some(({char:e})=>e===y.SYMBOL)}get length(){return s(this,b).size}set(e,r=""){if(!Number.isInteger(e))throw new Error(e);if(e===0)throw new Error(e);if(typeof r!="string")throw new Error(r);if(r){if(!R.includes(r))throw new Error(r);if(e>0&&!this.letters.includes(r))return!1}for(let n of s(this,d,L)){if(n.code!==e)continue;let i=n.char===r;if(n.set(r),!(e>0)){if(!i)break;return!1}}return!0}tiles(){return s(this,d,L).map(e=>new A(e,this))}mapping(){return s(this,d,L).reduce((e,r)=>(r.isSet()&&r.isPuzzle()&&e.set(r.code,r.char),e),new Map)}toString(){return[this.message,"Numbers: ".concat(this.numbers.join(" ")),"Letters: ".concat(this.letters.join(""))].join("\n")}};b=new WeakMap,d=new WeakSet,L=function(){return[...s(this,b).values()]}});var re={};ie(re,{updateKeyboard:()=>q});function pe(t="",e=[]){let r=t.split(/[\/;]/).map(c=>c.split(",").map(h=>{let k=Number(h);return Number.isInteger(k)&&k<=30?k:h})),n=new E(r,e);if(!n.length)return;B=n,V.textContent="";let i=Z();n.tiles().forEach(({container:c,isSpace:h})=>{h?(V.append(c),i=Z()):i.append(c)}),q()}function ge(t){let e=t.key;switch(e){case"Escape":{M("selected");return}case"Tab":t.preventDefault();case"Enter":{ee(t.shiftKey&&t.isTrusted);return}case"Shift":return;case"Backspace":case"Delete":case" ":return"";default:return e.toLowerCase()}}function ee(t=!1){var k;let e=document.querySelector(".selected"),r=[...document.querySelectorAll(".board .clickable")],n=r.length;if(!e){let ne=t?n-1:0;r.at(ne).classList.add("selected");return}e.classList.remove("selected");let i=r.indexOf(e)+1;if(!i)return;let c=t?-2:i===n?-n:0,h=i+c;(k=r.at(h))==null||k.classList.add("selected")}function Z(){let t=document.createElement("div");return t.classList.add("word"),V.append(t),t}function te(){let{pathname:t,search:e}=location;if(!t&&!e)return;let r=new URLSearchParams(e),n=r.get("puzzle")||t;n&&(r.delete("puzzle"),pe(n,[...r.entries()]))}function Ee(t){let e="".concat(new URLSearchParams(t));history.pushState(null,void 0,e?"?".concat(e):location.pathname)}function q(){var e;document.querySelectorAll(".keyboard button:disabled").forEach(r=>{r.disabled=!1});let t=(e=document.querySelector(".tile.selected"))==null?void 0:e._tile.isUnknown;if(t)t!=="_"&&(document.querySelector('.keyboard button[data-key="'.concat(t,'"]')).disabled=!0);else{let r=B.letters;document.querySelectorAll(".keyboard button:not([data-special])").forEach(n=>{let i=n.dataset.key.toLowerCase();n.disabled=!r.includes(i)})}}var V,B,j=v(()=>{F();$();O();V=document.querySelector("#board");document.addEventListener("keydown",t=>{var h;if(!B)return;let{ctrlKey:e,repeat:r,shiftKey:n}=t;if(e)return;let i=ge(t);r||typeof i!="string"||i.length>1||!((h=document.querySelector(".selected"))!=null&&h._tile.set(i))||(Ee(B.mapping()),n&&i&&ee(),q())});window.addEventListener("popstate",te);document.addEventListener("DOMContentLoaded",te)});document.querySelector(".keyboard")||Promise.resolve().then(()=>(j(),re));})();
//# sourceMappingURL=cryptogram.js.map