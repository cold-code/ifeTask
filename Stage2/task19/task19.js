(function() {
    //获取元素
    let input_container = document.getElementById('input-container'),
        left_in = document.getElementById('left-in'),
        right_in = document.getElementById('right-in'),
        left_out = document.getElementById('left-out'),
        right_out = document.getElementById('right-out'),
        sort_btn = document.getElementById('sort-btn'),
        data_container = document.querySelector('#data-list ul');

    // 初始化数字列表数据
    let data_queue = [34,79,64,10,20,14,50];

    // 初始化渲染列表
    initRender(data_container,data_queue);

    // 灰置添加删除按钮
    function unclickable() {
        left_in.setAttribute('disabled','true');
        right_in.setAttribute('disabled','true');
        left_out.setAttribute('disabled','true');
        right_out.setAttribute('disabled','true');
    };

    function clickable() {
        left_in.removeAttribute('disabled');
        right_in.removeAttribute('disabled');
        left_out.removeAttribute('disabled');
        right_out.removeAttribute('disabled');
    };

    //////////
    // 事件绑定 //
    //////////

    // 队列元素点击事件代理
    data_container.addEventListener("click",e => {
      if(e.target && e.target.nodeName.toUpperCase() == "LI") {
          let node_index;
          let data_list = data_container.children;
          for(let i = 0; i < data_list.length; i++){
              if(data_list[i] == e.target){
                  node_index = i;
                  break;
              }
          }
          if(node_index >= 0){
              data_queue.splice(node_index,1);
              data_container.removeChild(e.target);
              alert('移除元素内数值为 ' + e.target.dataset.number + ', 位置为为 ' + (++node_index));
          }else{
              alert('移除元素失败');
              console.error('移除元素失败');
          }
      }
    });

    // 左侧入
    left_in.addEventListener('click',() => {
        const data = getInputValue(input_container);
        queue_unshift(data_container,data,data_queue);
    });

    // 右侧入
    right_in.addEventListener('click',() => {
        const data = getInputValue(input_container);
        queue_push(data_container,data,data_queue);
    });

    // 左侧出
    left_out.addEventListener('click',() => {
        queue_shift(data_container,data_queue);
    });

    // 右侧出
    right_out.addEventListener('click',() => {
        queue_pop(data_container,data_queue);
    });

    // 插入排序
    sort_btn.addEventListener('click',() => {
        unclickable();
        insertionSort(data_container,data_queue,clickable);
    });
}())

/**
 * 创建数据列表元素结点
 * @param  {Number} data 数字数据
 * @return {Object}      节点对象
 */
function _createItemElement(data) {
    let node = document.createElement("li");
    node.className = "data-list__item";
    node.setAttribute("data-number",data);
    node.setAttribute("title",data);
    node.style.height = data * 5 + 'px';
    return node;
}

/**
 * 初始化数据列表dom
 * @param  {Object}     list_element 数据列表容器元素对象
 * @param  {Array}      data_queue   数据列表
 * @return {Boolean}                      运行是否成功
 */
function initRender(list_element,data_queue) {
    if(data_queue.length >= 0){
        data_queue.map(data => {
            let node = _createItemElement(data);
            list_element.appendChild(node);
        });
        return true;
    }else{
        alert('初始化列表出错，列表格式错误');
        console.error('初始化列表出错，列表格式错误');
        return false;
    }
}

/**
 * 向列表头部添加新的数据
 * @param  {Object} list_element 数据列表容器元素对象
 * @param  {Number} data         添加的数据
 * @param  {Array} data_queue    数据列表
 * @return {Array}              新的数据列表
 */
function queue_unshift(list_element,data,data_queue) {
    if(data_queue.length >= 60){
        alert('列表元素上限为60个，添加元素失败');
        return data_queue;
    }
    if(data){
        data_queue.unshift(data);
        let node = _createItemElement(data);
        list_element.insertBefore(node,list_element.getElementsByTagName('li')[0]);
        return data_queue;
    }
    return data_queue;
}

/**
 * 向列表尾部添加新的数据
 * @param  {Object} list_element 数据列表容器元素对象
 * @param  {Number} data         添加的数据
 * @param  {Array} data_queue    数据列表
 * @return {Array}              新的数据列表
 */
function queue_push(list_element,data,data_queue) {
    if(data_queue.length >= 60){
        alert('列表元素上限为60个，添加元素失败');
        return data_queue;
    }
    if(data){
        data_queue.push(data);
        let node = _createItemElement(data);
        list_element.appendChild(node);
        return data_queue;
    }
    return data_queue;
}

/**
 * 移除列表头部数据
 * @param  {Object} list_element 数据列表容器元素对象
 * @param  {Array} data_queue    数据列表
 * @return {Array}              新的数据列表
 */
function queue_shift(list_element,data_queue) {
    let length = data_queue.length;
    if(length == 0){
        alert('列表已空，移除失败');
        console.error('列表已空，移除失败');
        return data_queue;
    }else{
        alert('移除的元素内数值为: ' + data_queue[0]);
        data_queue.shift();
        list_element.removeChild(list_element.children[0]);
        return data_queue;
    }
}

/**
 * 移除列表尾部数据
 * @param  {Object} list_element 数据列表容器元素对象
 * @param  {Array} data_queue    数据列表
 * @return {Array}              新的数据列表
 */
function queue_pop(list_element,data_queue) {
    let length = data_queue.length;
    if(length == 0){
        alert('列表已空，移除失败');
        console.error('列表已空，移除失败');
        return data_queue;
    }else{
        alert('移除的元素内数值为: ' + data_queue[length - 1]);
        data_queue.pop();
        list_element.removeChild(list_element.children[length - 1]);
        return data_queue;
    }
}

/**
 * 获取Input里的数据
 * @param  {Object} element 元素对象
 * @return {Number}         输入框数据
 */
function getInputValue(element) {
    let data = Number(element.value);
    if(!data){
        alert('请在输入框内填入数据');
        console.error('请在输入框内填入数据');
        return null;
    }else if(data < 10 || data >100){
        alert('请输入10 - 100 范围内的数字。');
        console.error('请输入10 - 100 范围内的数字。');
        return null;
    }else{
        return data;
    }
}

/**
 * 插入排序
 * @param  {Object} list_element 数据列表容器元素对象
 * @param  {Array} data_queue    数据列表
 * @param  {Function}   cb       回调
 * @return {[type]}              [description]
 */
function insertionSort(list_element,data_queue,cb) {
    let length = data_queue.length,
        ele_arr = list_element.children,
        i = 0,
        temp,
        j;

    let animation = setInterval(() => {
        if(i >= length){
            cb();
            clearInterval(animation);
            setTimeout(() => {
                for(let n = 0;n < length; n++){
                    ele_arr[n].className = 'data-list__item finish';
                    (function(index){
                        setTimeout(() => {
                            ele_arr[index].className = 'data-list__item';
                        },500);
                    }(n))
                }
            },200);
            return;
        }
        j = i;
        temp = data_queue[i];
        while(j>0 && data_queue[j-1] >= temp){
            list_element.replaceChild(_createItemElement(data_queue[j-1]), ele_arr[j]);
            data_queue[j] = data_queue[j-1];
            ele_arr[j].className = 'data-list__item change';
            (function(index){
                setTimeout(() => {
                    ele_arr[index].className = 'data-list__item';
                },200);
            }(j))
            j--;
        }
        list_element.replaceChild(_createItemElement(temp), ele_arr[j]);
        data_queue[j] = temp;
        i++;
    },200);
}