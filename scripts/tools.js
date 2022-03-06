const letters = "!#$%&'()*+,-./;<=>?@[\]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz½´¨§öÖäÄåÅ¦¥¤£¢¡©Øç";

function scale(number,inMin,inMax,outMin,outMax){return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;}
function ha(n){let ton=0;n=n.toString(); for(let y=0; y<n.length;y++){let m=n.charCodeAt(y);for(let i=0; i<=100; i++){m=Math.sin(m);ton+=((m+1)/2)*(i%2-1);}};return ton.toPrecision(100).toString().split(".")[1].substring(0,ton.toPrecision(100).toString().split(".")[1].indexOf("0000"))}
function ha2(o){let tot=""; o=ha(o);if(o.length%2){o=o.substring(1)}for(let x=0; x<o.length; x+=2){tot+=String.fromCharCode(scale(parseInt(o[x]+o[x+1]),0,99,32,126))} return tot}
function ha3(p){let top=0;for(let c=0; c<p.length; c++){top+=0.5*(Math.sin(p.charCodeAt(c))+1)*(c%2-1);}let v = Math.abs(top*100); v = Math.round(v);for(let c = 0; c<=v;c++){p=ha2(p)}return p}
function safe(unsafe){return unsafe.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("'","&#039;")}