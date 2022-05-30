class spell{
    constructor(inp,order){
        for(let i=0;i<order.length;i++){
            this[order[i]]=inp[i]||"Missing data";
        }        
    }
}
var a=document.getElementsByClassName("listing listing-rpgspell rpgspell-listing")[0]
var spells=[]
var cats=[]
for(let i=0; !a.children[0].children[i+1].className.includes("open-indicator")||i>1000;i++){
cats.push(a.children[0].children[i].classList[1])
}
for(let i=0; i<a.childElementCount;i++){
	let out = []
	let c = a.children[i]
	c.click()
}
for(let i=0; i<a.childElementCount;i++){
	let out = []
	let c = a.children[i]
	
	
	if(i%2==1){
		let sc = c.children[0].children[0]
		for(let o=0; o<sc.children.length;o++){
		out[o]=sc.children[o].children[1].innerHTML.replaceAll("  ","").replaceAll("\n","")
		}
		spells.push(new spell(out,cats))
	}
}