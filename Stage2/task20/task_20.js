<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <title>IFE JavaScript Task</title>
    <style>
        #listOutPut{
            margin-top: 20px;
        }
        .red{
            background-color: #ff0000;
            color: #ffffff;
            margin: 10px;
            padding: 10px;
        }
    </style>
</head>
<body>
<textarea id="input" ></textarea>
<div>
    <input type="button" id="leftIn" value="左侧入" />
    <input type="button" id="rightIn" value="右侧入" />
    <input type="button" id="leftOut" value="左侧出" />
    <input type="button" id="rightOut" value="右侧出" />
</div>
<div>
    <input type="text" id="toSearch" />
    <input type="button" id="search" value="查询" />
</div>
<div id="listOutPut">

</div>
<script type="text/javascript">
    /*
     基于任务18进行升级
     将新元素输入框从input改为textarea
     允许一次批量输入多个内容，格式可以为数字、中文、英文等，可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为不同内容的间隔
     增加一个查询文本输入框，和一个查询按钮，当点击查询时，将查询词在各个元素内容中做模糊匹配，将匹配到的内容进行特殊标识，如文字颜色等。举例，内容中有abcd，查询词为ab或bc，则该内容需要标识
    */
    (function(){
        var list=[];
        var input=document.getElementById("input");
        var toSearch=document.getElementById("toSearch");
        document.getElementById("leftIn").addEventListener("click",function(){
            var tmp=breakWords(input.value.trim());
            [].unshift.apply(list,tmp);
            outPut();
        });
        document.getElementById("rightIn").addEventListener("click",function(){
            var tmp=breakWords(input.value.trim());
            [].push.apply(list,tmp);
            outPut();
        });
        document.getElementById("leftOut").addEventListener("click",function(){
            alert(list.shift());
            outPut();
        });
        document.getElementById("rightOut").addEventListener("click",function(){
            alert(list.pop());
            outPut();
        });
        document.getElementById("listOutPut").addEventListener("click",function(event){
            var index=event.target.getAttribute("id");
            if(index.toLowerCase()!="listoutput"){
                list.splice(index,1);
            }
            outPut();
        });
       document.getElementById("search").addEventListener("click",doSearch);
        /**
         * 检测是否为数字的函数
         */
        function breakWords(value){
            if(value) {
                var reg = /[，,、;；\s\n\t\r]+/g;
                return value.split(reg);
            }
        }
        /**
         * 输出数组的函数
         */
        function outPut(){
            var str=list.reduce(function(p,c,i){
                return p+"<span class='red'id='"+i+"'>"+c+"</span>";
            },"");
            document.getElementById("listOutPut").innerHTML=str;
            doSearch();
        }
        /**
         * 检测查询匹配的函数
         */
        function doSearch(){
            var searchValue=toSearch.value.trim();
            if(searchValue){
                list.forEach(function(v,i){
                    if(v.indexOf(searchValue)!=-1)
                        document.getElementById(i).style.backgroundColor="#00ff00";
                    else
                        document.getElementById(i).style.backgroundColor="#ff0000";
                });
            }
        }
    })()
</script>
</body>
</html>