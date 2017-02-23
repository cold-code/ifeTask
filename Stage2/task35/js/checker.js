function dirCheck(dir){
    switch (dir){
        case "TOP":
            return true;
            break;
        case "LEF":
            return true;
            break;
        case "RIG":
            return true;
            break;
        case "BOT":
            return true;
            break;
        default:
            return false;
            break;
    }
}

function lineCheck(line){
    if(line.length==2&&dirCheck(line[1])){
        return true;
    }
    else if(line.length==3&&!isNaN(line[2])){
        return true;
    }
    else {
        return false;
    }
}

function goLineCheck(line){
    if(line.length==1){
        return true;
    }
    else if(line.length==2&&!isNaN(line[1])){
        return true;
    }
    else {
        return false;
    }
}

function CheckCode(){
    var aCode=input.value.split("\n");
    var i;
    for(i=0;i<aCode.length;i++){
        var check=true;
        var line=aCode[i].trim().split(" ");
        switch (line[0]){
            case "":
                break;
            case "GO":
                check=goLineCheck(line);
                break;
            case "TUN":
                check=tunLineCheck(line);
                break;
            case "TRA":
                check=lineCheck(line);
                break;
            case "MOV":
                check=lineCheck(line);
                break;
            default:
                check=false;
                break;
        }
        if(!check){
            aLi[i].className="wrong";
        }
        else {
            aLi[i].className="";
        }
    }
    for(;i<aLi.length;i++){
        aLi[i].className="";
    }
}

function tunLineCheck(line){
    if(line.length==2){
        switch (line[1]){
            case "LEF":
                return true;
            case "RIG":
                return true;
            case "BAC":
                return true;
        }
    }
    else {
        return false;
    }
}