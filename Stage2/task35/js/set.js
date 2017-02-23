function Setter(Block){
    SetDiv(Block);
    SetDirection(Block,direction[BlockNow.Dir]);
    SetDirection(BlockNow.Block,"");
    CleanDiv(BlockNow.Block);
    BlockNow.Block=Block;
}

function SetDiv(Block){
    Block.innerHTML="<div></div>"
}

function SetDirection(Block,D){
    Block.className=D;
}
