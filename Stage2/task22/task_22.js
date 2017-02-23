var modal = {
    binaryTree: undefined,
};

var controller = {
    addIntoTree: function(value) {
        function inputIsValid(value) {
            // return /^\d+$/.test(value); // this works for only positive integers
            return /^-?\d*(\.\d*)?$/.test(value) && value != '';
        }
        if (inputIsValid(value)) {
            modal.binaryTree.add(parseFloat(value));
        }
    },
    getArrayRepresentation: function() {
        return modal.binaryTree.toArray();
    },
    getHeight: function() {
        return modal.binaryTree.heightOfTree();
    },
    removeNode: function(value) {
        modal.binaryTree.remove(value);
    },
    inOrderTrav: function() {
        return modal.binaryTree.inOrder();
    },
    preOrderTrav: function() {
        return modal.binaryTree.preOrder();
    },
    postOrderTrav: function() {
        return modal.binaryTree.postOrder();
    },
};

var view = {
    init: function() {
        modal.binaryTree = new BinarySearchTree();
        var $addButton = document.getElementById("add-btn");
        $addButton.addEventListener('click', function(e) {
            e.preventDefault();
            $inputField = document.getElementById("valueToAdd");
            var input_value = $inputField.value;
            controller.addIntoTree(input_value);
            $inputField.value = '';
            view.render();
        });

        var $inOrderTraverse = document.getElementById("inorder-btn");
        var scheduler = delay(function() {}, 0); // generate a scheduler
        function scheduleAnimation($currentNode) {
            scheduler.delay(function() {
                $currentNode.classList.toggle("btn-colored");
            }, 250);
        }
        $inOrderTraverse.addEventListener('click', function(e) {
            e.preventDefault();
            var inOrderArr = controller.inOrderTrav();
            for (var i = 0; i < inOrderArr.length; i++) {
                $currentNode = document.getElementById("value" + inOrderArr[i]);
                scheduleAnimation($currentNode);
                scheduleAnimation($currentNode);
            }
            var $result = document.getElementById("result-traverse");
            $result.innerHTML = inOrderArr;

        });
        document.getElementById("postorder-btn").addEventListener('click', function(e) {
            e.preventDefault();
            var inOrderArr = controller.postOrderTrav();
            for (var i = 0; i < inOrderArr.length; i++) {
                $currentNode = document.getElementById("value" + inOrderArr[i]);
                scheduleAnimation($currentNode);
                scheduleAnimation($currentNode);
            }
            var $result = document.getElementById("result-traverse");
            $result.innerHTML = inOrderArr;
        });
        document.getElementById("preorder-btn").addEventListener('click', function(e) {
            e.preventDefault();
            var inOrderArr = controller.preOrderTrav();
            for (var i = 0; i < inOrderArr.length; i++) {
                $currentNode = document.getElementById("value" + inOrderArr[i]);
                scheduleAnimation($currentNode);
                scheduleAnimation($currentNode);
            }
            var $result = document.getElementById("result-traverse");
            $result.innerHTML = inOrderArr;
        });
        var $GenerateRandomTree = document.getElementById("random-btn");
        $GenerateRandomTree.addEventListener('click', function(e) {
            e.preventDefault();
            var test = new BinarySearchTree();
            test.insertIntoTree(test.generateRandomIntBetween(0, 100, 10));
        });
    },

    render: function() {
        var arr = controller.getArrayRepresentation();
        var htmlArr = arr.map(function(value, pos) {
            var power = Math.floor(Math.log2(pos + 1));
            var width = 100 / (Math.pow(2, power));
            if (value == '#') {
                return '<li style="width:' + width + '%"></li>';
            }
            return '<li style="width:' + width + '%"><button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab btn-colored" id="value' + value + '">' + value + '</button></li>';
        });
        var height = controller.getHeight();
        $tree = document.getElementById('tree');
        $tree.innerHTML = '';
        for (var i = 1; i <= Math.pow(2, height - 1); i = 2 * i) {
            $tree.innerHTML = $tree.innerHTML + '<ul id="containerFor' + i + '"></ul>';
            $container = document.getElementById("containerFor" + i);
            var htmlToAppend = '';
            for (var j = i - 1; j <= 2 * i - 2; j++) {
                htmlToAppend += htmlArr[j];
            }
            $container.innerHTML = htmlToAppend;
        }
        // set up event listener for all the value nodes
        $value_nodes = document.querySelectorAll("button[id^='value']");
        for (var i = 0; i < $value_nodes.length; i++) {
            $value_nodes[i].addEventListener('click', function() {
                var value = this.id.substr(5);
                controller.removeNode(value);
                view.render();
            });
        }
    }
};

view.init();