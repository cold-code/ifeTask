var timer = null;
var oBtns = document.getElementsByTagName("button");
var rootNode = document.getElementById("root");
var selectedNode = null; // 被选中的元素节点
var lock = false;
var BFindex = 0;//广度优先遍历自增标识符


// 深度优先遍历
function traverseDF(node,nodeList){
	if(node){
		nodeList.push(node);
		for(var i=0;i<node.children.length;i++){
			traverseDF(node.children[i],nodeList);
		}	
	}
}

//广度优先遍历
function traverseBF(node, nodeList) {;
	if (node) {
		nodeList.push(node);
		traverseBF(node.nextElementSibling, nodeList);
		node = nodeList[BFindex++];
		traverseBF(node.firstElementChild, nodeList);
	}
}

//渲染动画，有文本传入则可执行搜索
function traverseRender(nodeList,foundText){
	var i = 0;
	var len = nodeList.length;
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

	},300);
}

// 添加节点
function appendNode(parentNode){
	var text = document.getElementsByTagName("input")[1].value;
	if(!parentNode){
		alert("请先选中一个节点！");
		return;
	}
	var oDiv = document.createElement("div");
	oDiv.innerHTML = text;
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
		case 0:traverseDF(rootNode,Nodelist);
			break;
		case 1:BFindex = 0;
			   traverseBF(rootNode,Nodelist);
			break;
		case 2:var foundText = document.getElementsByTagName("input")[0].value;
			   traverseDF(rootNode,Nodelist);
			break;
		case 3:BFindex = 0;
			   var foundText = document.getElementsByTagName("input")[0].value;
			   traverseBF(rootNode,Nodelist);
			break;
		case 4:appendNode(selectedNode);
			   bindDivs();
			   return;
			break;
		case 5:removeNode(selectedNode);
			   bindDivs();
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

// 初始化
function init(){
	bindBtns();
	bindDivs();
}

// 重置所有节点样式
function resetBG(){
	var nodeList = [];
	traverseDF(rootNode,nodeList);
	for(var i=0;i<nodeList.length;i++){
		nodeList[i].className = "default";
	}
}

init();
