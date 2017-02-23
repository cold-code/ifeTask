function getLineDir(dir){
    switch (dir){
        case "LEF":
            return "Left";
        case "TOP":
            return "Top";
        case "BOT":
            return "Bottom";
        case "RIG":
            return "Right";
        default:
            return false;
    }
}
function getLineDirNum(dir){
    switch (dir){
        case "LEF":
            return 3;
        case "TOP":
            return 0;
        case "BOT":
            return 2;
        case "RIG":
            return 1;
        default:
            return false;
    }
}

function GetBlock(x,y){
    return table.childNodes.item(y*2).childNodes.item(x*2+1);
}