class spell{
    constructor(inp,order){
        for(let i=0;i<order.length;i++){
            this[order[i]]=inp[i]||"Missing data";
        }        
    }
}
var a=document.getElementsByClassName("listing listing-rpgspell rpgspell-listing")[0]
var spells=[]
function clicks(){
	for(let i=0; i<a.childElementCount;i++){
		let c = a.children[i]
		c.click()
	}
}

function search(){
	for(let i=0; i<a.childElementCount;i++){
		let c = a.children[i]
		
		
		if(c.className.includes("more-info")){
			let sc = c.children[0].children[0]
			let out = []
			let cat = []
			for(let o=0; o<sc.children.length;o++){
			out[o]=sc.children[o].children[1].innerHTML.replaceAll("  ","").replaceAll("\n","");
			cat[o]=sc.children[o].children[0].innerHTML.replaceAll("  ","").replaceAll("\n","");
			}
			spells.push(new spell(out,cat))
		}
	}
	var done =""
	for(let i=0; i<spells.length;i++){
		if(i){done+="\n"}
		sp=Object.values(spells[i])
		for(let o=0;o<sp.length;o++){
			done+=sp[o]+"|"
		}
	}
	printOut(done)
}

function printOut(done){
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(done));
	pom.setAttribute('download', "spells.txt");
	pom.click()
}
clicks()
setTimeout(search,300)