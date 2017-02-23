var input=document.getElementById('input');
var ul=document.getElementById('ul-lineNum');
var aLi=ul.getElementsByTagName("li");
var lineNum=9;


input.onscroll=function(){
    var x=input.scrollTop;
    if(x/20+8>lineNum){
        for(lineNum+1;lineNum<x/20+8;lineNum++){
            var li=document.createElement("li");
            var node=document.createTextNode(lineNum+"");
            li.appendChild(node);
            ul.appendChild(li);
        }
    }
    ul.style.top="-"+x+"px";
}


input.onchange=function(){
    CheckCode();
};