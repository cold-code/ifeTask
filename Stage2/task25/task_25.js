var timer = null;
var oBtns = document.getElementsByTagName("button");
var rootNode = document.getElementById("root");
var oA = document.getElementsByTagName("a");
var selectedNode = null; // 被选中的元素节点
var lock = false;
var BFindex = 0;//广度优先遍历自增标识符
var aFlag = [];


// 深度优先遍历
function traverseDF(node,nodeList){
	if(node && node.className!=="display"){
		nodeList.push(node);
		var len =node.children.length;
		for(var i=0;i< len;i++){
			traverseDF(node.children[i],nodeList);
		}	
	}
}


//渲染动画，有文本传入则可执行搜索
function traverseRender(nodeList,foundText){
	var i = 0;
	var len = nodeList.length;
	var aList = document.getElementsByTagName("a");
	displayNodes(nodeList[1],true);
	if (nodeList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") == foundText) {
		nodeList[i].className = "found";
		lock = false;
		clearInterval(timer);
	} else {
		nodeList[i++].className = "active";
	}
	lock = true;
	timer = setInterval(function(){
		if(i<len){
			nodeList[i-1].className = "";
			if(nodeList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") == foundText){
				nodeList[i].className = "found";
				lock = false;
				clearInterval(timer);
			}
			else{
				nodeList[i++].className = "active";
			}	
		}
		else{
			nodeList[i-1].className = "";
			lock = false;
			clearInterval(timer);
		}
		displayNodes(nodeList[i],true);
	},300);
}

// 添加节点
function appendNode(parentNode){
	var text = document.getElementsByTagName("input")[1].value;
	if(!parentNode){
		alert("请先选中一个节点！");
		return;
	}
	else if(text==""){
		alert("不允许添加空节点！");
		return;
	}
	var oDiv = document.createElement("div");
	oDiv.innerHTML = text + "<a class=\"display\" href=\"javascript:\;\">+</a>";
	parentNode.appendChild(oDiv);
}

// 删除选中节点
function removeNode(removeNode){
	if(!removeNode){
		alert("请先选中一个节点！");
		return;
	}
	var parentNode = removeNode.parentNode;
	parentNode.removeChild(removeNode);
	selectedNode = null;
}


function traverse(traverseIndex){
	var Nodelist = [];
	var foundList = [];
	switch(traverseIndex){
		case 0:var foundText = document.getElementsByTagName("input")[0].value;
			   traverseDF(rootNode,Nodelist);
			break;
		case 1:appendNode(selectedNode);
			   bindDivs();
			   bindA();
			   return;
			break;
		case 2:removeNode(selectedNode);
			   bindDivs();
			   bindA();
			   return;
			break;
		default:
	}
	resetBG();
	setTimeout(traverseRender(Nodelist,foundText),300);
}

function bindBtns() {
	for (var i = 0; i < oBtns.length; i++) {
		(function(i) {
			oBtns[i].onclick = function() {
				if (lock === true) {
					alert("正在遍历中!");
				} else {
					traverse(i);
				}
			};
		}(i));
	}
}

function bindDivs() {
	var nodeList = [];
	traverseDF(rootNode,nodeList);
	for(var i=0;i<nodeList.length;i++){
		(function(i){
			nodeList[i].onclick = function(e){
				var e = e || window.e;
				resetBG();
				nodeList[i].className = "selected";
				selectedNode = nodeList[i];
				e.stopPropagation();
			};
		}(i));
	}
}


function bindA() {
	for (var i = 0; i < oA.length; i++) {
		aFlag[i] = false;
		aFlag[0] = true;
		(function(i) {
			oA[i].onclick = function(e) {
				if (aFlag[i]) {
					oA[i].innerHTML = "+";
					aFlag[i] = false;
					displayNodes(oA[i]);
				} else {
					oA[i].innerHTML = "-";
					aFlag[i] = true;
					displayNodes(oA[i])
				}
				e.stopPropagation();
			};
		}(i));
	}
}



function displayNodes(childNode, spread) {
	var parentNode = childNode.parentNode;
	var oDivs = parentNode.getElementsByTagName("div");
	var nextSiblingsList = [];
	nextSiblings(childNode, nextSiblingsList);
	if (spread) {
		var len = nextSiblingsList.length;
		for(var i=0;i< len;i++){
			nextSiblingsList[i].style.display = "block";
			aFlag[i] = true;
			oA[i].innerHTML = "-";
		}
	} else {
		for (var j = 0; j < oDivs.length; j++) {
			if (window.getComputedStyle(oDivs[j], null)["display"] == "block") {
				oDivs[j].style.display = "none";
			} else {
				oDivs[j].style.display = "block";
			}
		}
	}

}
function nextSiblings(node,list){
	if(node){
		list.push(node);
		nextSiblings(node.nextElementSibling,list)
	}
}

// 初始化
function init(){
	bindBtns();
	bindDivs();
	bindA();
}

// 重置所有节点样式
function resetBG(){
	var nodeList = [];
	traverseDF(rootNode,nodeList);
	for(var i=0;i<nodeList.length;i++){
		nodeList[i].className += " default";
	}
}

init();