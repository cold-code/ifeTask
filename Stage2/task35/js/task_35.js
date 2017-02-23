var table=document.getElementById("Table").childNodes.item(1);
var input=document.getElementById("input");
var direction=["Top","Right","Bottom","Left"];


var BlockNow={
    Block:GetBlock(5,5),
    Dir:3,
    X:5,
    Y:5,
};
SetDirection(BlockNow.Block,"Left");
SetDiv(BlockNow.Block);

function CleanDiv(Block){
    Block.innerHTML=""
}
function CalDirection(x){
    var d=(BlockNow.Dir+x>=0?BlockNow.Dir+x:3)%4;
    BlockNow.Dir=d;
    SetDirection(BlockNow.Block,direction[d]);
}

function Go(Dir){
    switch(Dir){
        case "Left":
            if(BlockNow.X>1){
                BlockNow.X--;
                var Block=GetBlock(BlockNow.X,BlockNow.Y);
                Setter(Block);
            }
            break;
        case "Top":
            if(BlockNow.Y>1){
                BlockNow.Y--;
                var Block=GetBlock(BlockNow.X,BlockNow.Y);
                Setter(Block);
            }
            break;
        case "Right":
            if(BlockNow.X<10){
                BlockNow.X++;
                var Block=GetBlock(BlockNow.X,BlockNow.Y);
                Setter(Block);
            }
            break;
        case "Bottom":
            if(BlockNow.Y<10){
                BlockNow.Y++;
                var Block=GetBlock(BlockNow.X,BlockNow.Y);
                Setter(Block);
            }
            break;
    }
}

function Run(line){
    switch (line[0]){
        case "GO":
            doGO(line);
            break;
        case "TUN":
            doTUN(line);
            break;
        case "TRA":
            doTRA(line);
            break;
        case "MOV":
            doMOV(line);
            break;
        default:
            break;
    }
}

function Do(){
    var aCode=input.value.split(/[\r\n]+/g);
    for(var i=0;i<aCode.length;i++){
        var line=aCode[i].trim().split(" ");
        Run(line);
    }
}

function Refresh(){
    input.value="";
    CheckCode();
}