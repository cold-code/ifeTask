function doGO(line){
    if(goLineCheck(line)){
        if(line.length==1){
            Go(BlockNow.Block.className);
            return;
        }
        for(var i= 0,length=parseInt(line[1]);i<length;i++){
            Go(BlockNow.Block.className);
        }
    }
}
function doTRA(line){
    if(lineCheck(line)){
        for(var i= 0,length=parseInt(line[2]);i<length;i++){
            Go(getLineDir(line[1]));
        }
    }
}

function doTUN(line){
    if(tunLineCheck(line)){
        switch (line[1]){
            case "LEF":
                CalDirection(-1);
                break;
            case "RIG":
                CalDirection(1);
                break;
            case "BAC":
                CalDirection(2);
                break;
        }
    }
}

function doMOV(line){
    if(lineCheck(line)){
        for(var i= 0,length=parseInt(line[2]);i<length;i++){
            SetDirection(BlockNow.Block,getLineDir(line[1]));
            BlockNow.Dir=getLineDirNum(line[1]);
            Go(BlockNow.Block.className);
        }
    }
}