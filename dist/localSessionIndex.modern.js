function e(e){var n=/^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(e);if(null==n)throw new Error(e);var t=new Error(n[2]);throw t.name=n[1],t}function n(e){return"string"==typeof e||e instanceof String}var t=/^\s*$/;function r(e){return("string"==typeof e||e instanceof String)&&!t.test(e.valueOf())}var i=/^[^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;function s(e){return function(e,n){return("string"==typeof e||e instanceof String)&&i.test(e.valueOf())}(e)}var o=!1;function a(n,t,r){var i=function(i,s){return function(n,t,r,i,s){if(null==t){if(i)return t;e("MissingArgument: no ".concat(g(n)," given"))}else if(r(t))switch(!0){case t instanceof Boolean:case t instanceof Number:case t instanceof String:return t.valueOf();default:return t}else e("InvalidArgument: the given ".concat(g(n)," is no valid ").concat(g(s)))}(i,s,n,t,r)},s=n.name;return null!=s&&/^ValueIs/.test(s)?function(n,t){if(null==n&&e("MissingArgument: no function given"),"function"!=typeof n&&e("InvalidArgument: the given 1st Argument is not a JavaScript function"),null==t&&e("MissingArgument: no desired name given"),"string"==typeof t||t instanceof String||e("InvalidArgument: the given desired name is not a string"),n.name===t)return n;try{if(Object.defineProperty(n,"name",{value:t}),n.name===t)return n}catch(e){}return new Function("originalFunction","return function "+t+" () {return originalFunction.apply(this,Array.prototype.slice.apply(arguments))}")(n)}(i,s.replace(/^ValueIs/,t?"allow":"expect")):i}var u=/*#__PURE__*/a(n,o,"literal string"),c=/*#__PURE__*/a(r,o,"non-empty literal string"),l=/*#__PURE__*/a(s,o,"single line of text");function g(e){return e.replace(/\\x[0-9a-zA-Z]{2}|\\u[0-9a-zA-Z]{4}|\\[0bfnrtv'"\\\/]?/g,function(e){return"\\"===e?"\\\\":e}).replace(/[\x00-\x1f\x7f-\x9f]/g,function(e){switch(e){case"\0":return"\\0";case"\b":return"\\b";case"\f":return"\\f";case"\n":return"\\n";case"\r":return"\\r";case"\t":return"\\t";case"\v":return"\\v";default:var n=e.charCodeAt(0).toString(16);return"\\x"+"00".slice(n.length)+n}})}function f(e){return window.automerge.isValidAutomergeUrl(e)}const m=a(f,!0,"automerge session URL"),d=m,v=a(f,o,"automerge session URL"),x=v;class p{constructor(){this._Index=Object.create(null)}get(e){l("session name",e),c("session name",e);let n=this._Index[e];return null==n?void 0:"automerge:"+n}set(n,t){l("session name",n),c("session name",n),v("session URL",t),""===n.trim()&&e("Invalidargument: the given session name is empty"),this._Index[n]=t.replace("automerge:","")}delete(e){l("session name",e),c("session name",e),delete this._Index[e]}NameList(){let e=[];for(let n in this._Index)e.push(n);return e}import(n){if(u("index serialization",n),""===(n=n.trim()))return;let t;try{t=JSON.parse(n)}catch(n){return void e("InvalidArgument: the given index serialization is no valid JSON string")}for(let e in t){const n=t[e];f(e)&&s(n)&&""!==n.trim()&&(this._Index[e]=n)}}export(){return JSON.stringify(this._Index)}preserve(){localStorage.setItem("Automerge Session Index",JSON.stringify(this._Index))}restore(){this._Index=Object.create(null);const e=localStorage.getItem("Automerge Session Index");if(null==e)return;let n;try{n=JSON.parse(e)}catch(e){return void console.warn('localStorage["Automerge Session Index"] is broken')}for(let e in n){const t=n[e];f(e)&&s(t)&&""!==t.trim()&&(this._Index[e]=t)}}}export{f as ValueIsAutomergeURL,m as allowAutomergeURL,d as allowedAutomergeURL,v as expectAutomergeURL,x as expectedAutomergeURL,p as localSessionIndex};
//# sourceMappingURL=localSessionIndex.modern.js.map
