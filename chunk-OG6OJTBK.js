import{H as c,K as s,M as k,N as M,O as P,P as r,Q as a,R as h,T as O,aa as p,ba as v,c as d,ca as m,d as u,e as f,ea as y,ga as I,la as x,n as g,p as C,sa as b,xa as S,y as _,z as o}from"./chunk-FU6PWSCN.js";var F=t=>["/pokemon",t];function T(t,i){if(t&1&&(r(0,"span"),p(1),a()),t&2){let n=i.$implicit;s("type-badge ",n.type!=null&&n.type.name?n.type==null?null:n.type.name:"",""),o(),m(" ",n.type==null?null:n.type.name,"")}}var R=(()=>{var i;let n=class n{constructor(){u(this,i,void 0);this.pokemonInfo=null,f(this,i,g(S))}AddToFavorites(){d(this,i).pathPokemonFavorited(this.pokemonInfo)}};i=new WeakMap,n.\u0275fac=function(l){return new(l||n)},n.\u0275cmp=C({type:n,selectors:[["app-pokemon-card"]],inputs:{pokemonInfo:"pokemonInfo"},standalone:!0,features:[y],decls:11,vars:9,consts:[[3,"click"],["routerLinkActive","active",1,"card",3,"routerLink"],["priority","",3,"src"],[3,"class"]],template:function(l,e){l&1&&(r(0,"section")(1,"button",0),O("click",function(){return e.AddToFavorites()}),a(),r(2,"a",1),h(3,"img",2),r(4,"footer"),p(5),r(6,"p"),p(7),a(),r(8,"div"),M(9,T,2,4,"span",3,k),a()()()()),l&2&&(o(),s("btn-favorite ",(e.pokemonInfo==null?null:e.pokemonInfo.favorited)==!0?"active":"",""),o(),c("routerLink",I(7,F,e.pokemonInfo==null?null:e.pokemonInfo.id)),o(),c("src",e.pokemonInfo==null?null:e.pokemonInfo.image,_),o(2),m(" N\xBA ",e.pokemonInfo==null?null:e.pokemonInfo.id," "),o(2),v(e.pokemonInfo==null?null:e.pokemonInfo.name),o(2),P(e.pokemonInfo==null?null:e.pokemonInfo.types))},dependencies:[x,b],styles:["[_nghost-%COMP%]   section[_ngcontent-%COMP%]{position:relative;transition:transform .1s ease-in}[_nghost-%COMP%]   section[_ngcontent-%COMP%]   .btn-favorite[_ngcontent-%COMP%]{position:absolute;top:10px;right:10px}[_nghost-%COMP%]   section[_ngcontent-%COMP%]:hover{transform:translateY(-5px)}[_nghost-%COMP%]   .card[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center;align-items:center;flex-direction:column;border:2px solid var(--black-010);border-radius:7px;background:var(--black-010);cursor:pointer}[_nghost-%COMP%]   .card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   .card[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]{width:100%;padding:0 10px;text-align:left;color:var(--grey);background:var(--black-005)}[_nghost-%COMP%]   .card[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:5px 0;font-size:20px}[_nghost-%COMP%]   .card[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;justify-content:left;align-items:start;gap:5px;margin:10px 0}@media (max-width: 750px){[_nghost-%COMP%]   .card[_ngcontent-%COMP%]{height:120px;flex-direction:row}[_nghost-%COMP%]   .card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:auto;height:100%}[_nghost-%COMP%]   .card[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;justify-content:center}}"]});let t=n;return t})();export{R as PokemonCardComponent};
