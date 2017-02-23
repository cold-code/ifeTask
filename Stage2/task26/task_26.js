// 星空中所有的飞船
var SPACE_SHIPS = [];
var MAX_SHIP_NUM = 4;

// 飞船大小
var SHIP_SIZE_WIDTH = 100;
var SHIP_SIZE_HEIGHT = 36;

// 飞船总能量
var SHIP_TOTAL_ENERGY = 100;
// 飞船飞行时, 每毫秒消耗能量
var SHIP_FLY_CONSUME = SHIP_TOTAL_ENERGY * 0.05 / 1000;
// 飞船每毫秒太阳能充电
var SHIP_CHARGE = SHIP_TOTAL_ENERGY * 0.02 / 1000;
// 飞船飞行的每毫秒角速度
var SHIP_SPEED_DEG = 100 / 1000;

var PLANET_CONTAINER = document.getElementById('planet');
// 轨道高度为距离星球平面多少px
var ORBIT_ALTITUDE = 80;
// 星球半径
var PLANET_RADIUS = 100;

var Logger = {
    log: function (text) {
        if (this.ele == undefined) {
            this.ele = document.getElementById('logs');
        }

        this.ele.value += text + '\n';
        this.ele.scrollTop = this.ele.scrollHeight;
    }
};
// 使用观察者模式
var Mediator = {
    // 命令丢包率
    errorRate: 0.3,
    broadcast: function (cmd) {
        if (Math.random() <= this.errorRate) {
            Logger.log('Mediator: 命令传输受到干扰, 丢包');
            return;
        }
        // 命令传输存在 1 秒的延迟
        setTimeout(function () {
            Logger.log('Mediator: 命令传输成功, 让编号为' + cmd.shipId + '的飞船 ' + cmd.cmd);
            // 广播命令
            var tmpShips = [];
            var i;
            // 因为销毁飞船会删除 SPACE_SHIPS 中的元素, 遍历的时候要用另外一个列表
            for (i = 0; i < SPACE_SHIPS.length; i++) {
                tmpShips.push(SPACE_SHIPS[i]);
            }
            for (i = 0; i < tmpShips.length; i++) {
                if (typeof tmpShips[i].onCmdReceive === 'function') {
                    tmpShips[i].onCmdReceive(cmd);//广播信息后会传给每个订阅者
                }
            }
        }, 1000);
    }
};
// 命令
var Command = function (shipId, cmd) {
    this.shipId = shipId;
    this.cmd = cmd;
};

// 太空飞船
var SpaceShip = function (id, speed) {
    this.id = id;
    this.state = 'static';
    this.totalEnergy = SHIP_TOTAL_ENERGY;
    this.remainEnergy = SHIP_TOTAL_ENERGY;
    // 速度用角速度计算
    this.speed = speed;
};

// 计算坐标
SpaceShip.prototype.getLocation = function () {
    // 获取在 DOM 中的位置

    var z = PLANET_RADIUS + ORBIT_ALTITUDE;
    var x = Math.sin(this.deg * Math.PI * 2 / 360) * z;
    // 坐标的方向是反的
    var y = Math.cos(this.deg * Math.PI * 2 / 360) * z * -1;
    x = Math.round(x);
    y = Math.round(y);

    // 坐标偏移
    x += PLANET_RADIUS - SHIP_SIZE_WIDTH / 2;
    y += PLANET_RADIUS - SHIP_SIZE_HEIGHT / 2;
    x = Math.round(x);
    y = Math.round(y);

    return [x, y];
};

// 获取飞船当前的能量百分比
SpaceShip.prototype.getRemainEnergyPercentage = function () {
    return Math.floor(this.remainEnergy / this.totalEnergy * 100);
};

// 飞船起飞
SpaceShip.prototype.launch = function () {
    this.ele = document.createElement('div');
    // 飞船当前的角度
    this.deg = 0;
    this.ele.style.transform = 'rotate(' + this.deg + 'deg)';
    var loc = this.getLocation();
    this.ele.style.left = loc[0] + 'px';
    this.ele.style.top = loc[1] + 'px';
    this.ele.className = 'space-ship';
    PLANET_CONTAINER.appendChild(this.ele);
    SPACE_SHIPS.push(this);
};

// 飞船开始飞行
SpaceShip.prototype.fly = function () {
    this.state = 'fly';
};

// 飞船开始飞行
SpaceShip.prototype.onDraw = function (time) {
    // time 表示运动的时间长度, 单位为毫秒
    if (this.state == 'fly') {
        // 计算飞行所在的角度, 以及剩余能量
        var deg = 0;
        var costEnergy = time * SHIP_FLY_CONSUME;
        if (costEnergy <= this.remainEnergy) {
            deg = time * this.speed;
            this.remainEnergy -= costEnergy;
        } else {
            deg = this.remainEnergy / SHIP_FLY_CONSUME * this.speed;
            this.remainEnergy = 0;
        }
        this.deg = (this.deg + deg) % 360;
    }

    var loc = this.getLocation();
    this.ele.style.left = loc[0] + 'px';
    this.ele.style.top = loc[1] + 'px';
    this.ele.style.transform = 'rotate(' + this.deg + 'deg)';
    this.ele.innerText = this.id + '号-' + this.getRemainEnergyPercentage() + '%';

    if (this.remainEnergy == 0) {
        this.state = 'static';
    }

    // 太阳能充电量
    this.remainEnergy += SHIP_CHARGE * time;
    if (this.remainEnergy >= this.totalEnergy) {
        this.remainEnergy = this.totalEnergy;
    }
};

// 飞船销毁
SpaceShip.prototype.dispose = function () {
    for (var i = 0; i < SPACE_SHIPS.length; i++) {
        if (this.id == SPACE_SHIPS[i].id) {
            SPACE_SHIPS.splice(i, 1);
            break;
        }
    }
    // 在 DOM 中删除该元素
    this.ele.parentNode.removeChild(this.ele);
};

// 飞船停止
SpaceShip.prototype.stop = function () {
    this.state = 'static';
};

// 命令监听
SpaceShip.prototype.onCmdReceive = function (cmd) {
    if (cmd.shipId == this.id && this[cmd.cmd]) {
        this[cmd.cmd]();
    }
};

// 指挥官
var Commander = {
    init: function () {
        this.ships = [];
        for (var i = 0; i < MAX_SHIP_NUM; i++) {
            this.ships[i] = undefined;
        }
    },
    getAvailableShipId: function () {
        for (var i = 0; i < this.ships.length; i++) {
            if (this.ships[i] == undefined) {
                return i;
            }
        }
        return null;
    },
    launch: function () {
        var shipId = this.getAvailableShipId();
        if (shipId == null) {
            Logger.log('指挥官: 没有可用的飞船Id, 无法发射');
        } else {
            var ship = new SpaceShip(shipId, SHIP_SPEED_DEG);
            ship.launch();
            this.ships[shipId] = shipId;
            Logger.log('指挥官: 发射编号为' + shipId + '的飞船');
            var ele = document.getElementById('ship-buttons');
            var control = document.createElement('div');
            control.innerHTML = '<div id="control-' + shipId + '">' +
                '<label>对' + shipId + '号飞船下达指令:</label>' +
                '<input onclick="Commander.fly(' + shipId + ')" type="button" value="开始飞行">' +
                '<input onclick="Commander.stop(' + shipId + ')" type="button" value="停止飞行">' +
                '<input onclick="Commander.dispose(' + shipId + ')" type="button" value="销毁">' +
                '</div>';
            ele.appendChild(control);
        }
    },
    fly: function (shipId) {
        var cmd = new Command(shipId, 'fly');
        Logger.log('指挥官: 发送命令, 让编号为' + shipId + '的飞船 fly');
        Mediator.broadcast(cmd);
    },
    stop: function (shipId) {
        var cmd = new Command(shipId, 'stop');
        Logger.log('指挥官: 发送命令, 让编号为' + shipId + '的飞船 stop');
        Mediator.broadcast(cmd);
    },
    dispose: function (shipId) {
        var cmd = new Command(shipId, 'dispose');
        this.ships[shipId] = undefined;
        Logger.log('指挥官: 发送命令, 让编号为' + shipId + '的飞船 dispose');
        Mediator.broadcast(cmd);
        // 删除相应的控制按钮
        var ele = document.getElementById('control-' + shipId);
        ele.parentNode.removeChild(ele);
    }
};

// 动画控制器
var Animation = {
    // 开始动画, frameNum 是每秒帧数
    start: function (frameNum) {
        // 间隔时间
        var time = Math.ceil(1000 / frameNum);
        setInterval(function () {
            Animation.onDraw(time);
        }, time);
    },
    onDraw: function (time) {
        for (var i = 0; i < SPACE_SHIPS.length; i++) {
            SPACE_SHIPS[i].onDraw(time);
        }
    }
};

// 初始化指挥官
Commander.init();
Commander.launch(0);
Commander.fly(0);
// 开始动画
Animation.start(15);