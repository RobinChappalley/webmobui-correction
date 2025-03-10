var M=Object.defineProperty;var R=(e,t,r)=>t in e?M(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var T=(e,t,r)=>R(e,typeof t!="symbol"?t+"":t,r);var m=(e,t,r)=>new Promise((o,n)=>{var i=a=>{try{y(r.next(a))}catch(h){n(h)}},d=a=>{try{y(r.throw(a))}catch(h){n(h)}},y=a=>a.done?o(a.value):Promise.resolve(a.value).then(i,d);y((r=r.apply(e,t)).next())});(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();class _ extends HTMLElement{connectedCallback(){this.innerHTML=`
      <a href="${this.getAttribute("href")}">
        <img src="${this.getAttribute("image_url")}" />
        <div class="artist-list-item-title">${this.getAttribute("name")}</div>
      </a>
    `}}customElements.define("artist-cover",_);const N=new CustomEvent("play_click"),P=new CustomEvent("favorite_click");class A extends HTMLElement{connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){const t=this.getAttribute("favorite")=="true"?"favorite":"favorite_border";this.innerHTML=`<a href="#">
      <div class="list-item-title">${this.getAttribute("title")}</div>
      <div class="list-item-actions">
        <button type="button" class="icon-button favorite-button ">
          <span class="material-icons">${t}</span>
        </button>
        <button type="button" class="icon-button play-button">
          <span class="material-icons">play_arrow</span>
        </button>
      </div>
    </a>`,this.querySelector(".play-button").addEventListener("click",r=>{r.preventDefault(),this.dispatchEvent(N)}),this.querySelector(".favorite-button").addEventListener("click",r=>{r.preventDefault(),this.dispatchEvent(P)})}}T(A,"observedAttributes",["favorite"]);customElements.define("song-item",A);const l=e=>{var t,r;(t=document.querySelector("section.active"))==null||t.classList.remove("active"),(r=document.querySelector(`${e}-section`))==null||r.classList.add("active")},H=e=>{var t,r;(t=document.querySelector("nav a.active"))==null||t.classList.remove("active"),(r=document.querySelector(`nav a[href="${e}"]`))==null||r.classList.add("active")},O=document.querySelector("#search-trigger"),u=document.querySelector("#search-input");O.addEventListener("click",()=>{u.classList.toggle("active"),u.classList.contains("active")&&u.focus()});u.addEventListener("change",()=>{window.location.hash=`#search-${encodeURIComponent(u.value)}`});const f="https://webmob-ui-22-spotlified.herokuapp.com",v=e=>fetch(e).then(t=>t.json()),Z=()=>v(`${f}/api/artists`),V=e=>v(`${f}/api/artists/${e}/songs`),K=e=>v(`${f}/api/songs/search/${e}`),w=document.querySelector("artist-list"),W=()=>m(void 0,null,function*(){w.innerHTML="",(yield Z()).forEach(t=>{const r=document.createElement("artist-cover");r.setAttribute("image_url",t.image_url),r.setAttribute("name",t.name),r.setAttribute("href",`#artists-${t.id}`),w.append(r)})});function k(e){e=parseInt(e,10);let t=Math.floor(e/3600),r=Math.floor((e-t*3600)/60),o=e-t*3600-r*60;return r<10&&(r="0"+r),o<10&&(o="0"+o),r+":"+o}const s=document.querySelector("#audio-player"),F=document.querySelector("#player-thumbnail-image"),G=document.querySelector("#player-infos-song-title"),U=document.querySelector("#player-infos-artist-name"),X=document.querySelector("#player-control-previous"),j=document.querySelector("#player-control-next"),I=document.querySelector("#player-control-play"),x=I.querySelector(".material-icons"),B=document.querySelector("#player-time-current"),D=document.querySelector("#player-time-duration"),g=document.querySelector("#player-progress-bar"),C=document.querySelector("#logo");let c=[],b=null;const L=(e,t)=>{b=e,t&&(c=t),s.src=e.audio_url,s.play(),G.innerText=e.title,U.innerText=e.artist.name,F.src=e.artist.image_url},J=()=>{let e=c.indexOf(b)+1;e==c.length&&(e=0),L(c[e])},Y=()=>{let e=c.indexOf(b)-1;e==-1&&(e=c.length-1),L(c[e])};I.addEventListener("click",()=>{s.paused?s.play():s.pause()});X.addEventListener("click",Y);j.addEventListener("click",J);g.addEventListener("change",e=>{s.currentTime=e.currentTarget.value});s.addEventListener("durationchange",()=>{g.max=s.duration,D.innerText=k(s.duration)});s.addEventListener("timeupdate",()=>{g.value=s.currentTime,B.innerText=k(s.currentTime)});s.addEventListener("play",()=>{x.innerText="pause",C.classList.add("animated")});s.addEventListener("pause",()=>{x.innerText="play_arrow",C.classList.remove("animated")});const Q=(e,t)=>localStorage.setItem(e,JSON.stringify(t)),p=e=>JSON.parse(localStorage.getItem(e)),z=()=>Object.keys(localStorage).map(p),ee=e=>localStorage.removeItem(e),q=document.querySelector(".list"),S=document.querySelector("#list-section h4"),E=e=>{q.innerHTML="",e.forEach(t=>{const r=document.createElement("song-item");r.setAttribute("title",t.title),r.setAttribute("favorite",!!p(t.id)),r.addEventListener("play_click",()=>{L(t,e)}),r.addEventListener("favorite_click",()=>{p(t.id)?ee(t.id):Q(t.id,t),r.setAttribute("favorite",!!p(t.id))}),q.appendChild(r)})},te=e=>m(void 0,null,function*(){const t=yield V(e);S.innerHTML=`Artistes > ${t[0].artist.name}`,E(t)}),re=e=>m(void 0,null,function*(){const t=yield K(e);S.innerHTML=`Résultats de recherche pour : ${decodeURIComponent(e)}`,E(t)}),ne=()=>{const e=z();S.innerHTML="Favoris",E(e)},$=()=>{const t=(window.location.hash||"#home").split("-");switch(H(t[0]),t[0]){case"#home":l("#home");break;case"#player":l("#player");break;case"#artists":t[1]?(l("#list"),te(t[1])):(l("#artists"),W());break;case"#search":l("#list"),re(t[1]);break;case"#favorites":l("#list"),ne();break}};window.addEventListener("hashchange",$);$();window.addEventListener("offline",e=>document.body.classList.add("offline"));window.addEventListener("online",e=>document.body.classList.remove("offline"));navigator.serviceWorker.register(new URL("data:text/javascript;base64,c2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgKGV2ZW50KSA9PiB7IH0pCnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignYWN0aXZhdGUnLCAoZXZlbnQpID0+IHsgfSkKc2VsZi5hZGRFdmVudExpc3RlbmVyKCdmZXRjaCcsIChldmVudCkgPT4geyB9KQo=",import.meta.url));
