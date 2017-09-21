var imported = document.createElement('script');
imported.src = 'jquery-3.2.0.min.js';
imported.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(imported);
imported.onload = function () {
	/* body... */
	alert("jquery加载成功");
};
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
var startMonitor = false;
var isFirstConnectSuccess = false;
var queueCapacity = 10;
var recordDate = new Date().Format("yyyy-MM-dd");
var dat = "2017-05-06";
var recordTime = new Array(queueCapacity);
recordTime[0] = "22:13:45";
recordTime[1] = "22:13:46";
recordTime[2] = "22:13:47";
recordTime[3] = "22:13:48";
recordTime[4] = "22:13:49";
recordTime[5] = "22:13:50";
recordTime[6] = "22:13:51";
recordTime[7] = "22:13:52";
recordTime[8] = "22:13:53";
recordTime[9] = "22:13:54";
var recordEfficiency = new Array(queueCapacity);
recordEfficiency[0] = 0;
recordEfficiency[1] = 75.7;
recordEfficiency[2] = 75.8;
recordEfficiency[3] = 75.9;
recordEfficiency[4] = 75.1;
recordEfficiency[5] = 74.6;
recordEfficiency[6] = 74.7;
recordEfficiency[7] = 75.0;
recordEfficiency[8] = 74.9;
recordEfficiency[9] = 74.8;
var recordEffective = new Array(queueCapacity);
recordEffective[0] = 0;
recordEffective[1] = 225;
recordEffective[2] = 347;
recordEffective[3] = 470;
recordEffective[4] = 582;
recordEffective[5] = 695;
recordEffective[6] = 822;
recordEffective[7] = 950;
recordEffective[8] = 1063;
recordEffective[9] = 1176;
var recordSupply = new Array(queueCapacity);
recordSupply[0] = 0;
recordSupply[1] = 300;
recordSupply[2] = 462;
recordSupply[3] = 626;
recordSupply[4] = 776;
recordSupply[5] = 926;
recordSupply[6] = 1096;
recordSupply[7] = 1266;
recordSupply[8] = 1417;
recordSupply[9] = 1568;
var iterator = 0;
function monitor (obj) {
	// body... 
	if (obj.value == "开始") {
		obj.value = "停止";
		obj.disabled = true;
		document.getElementById('array').innerHTML = "连接中..."+"<br/>";
		setTimeout("isFirstConnectSuccess = true", 10000);
	}
	else{
		document.getElementById('array').innerHTML += "断开连接..."+"<br/>";
		obj.value = "开始";
		startMonitor = false;
		document.getElementById('store').disabled = false;
	}
}

function save () {
	// body... 
	// document.form1.action = "save.php";
	// document.form1.submit();
	$.ajax({
		type: "POST",
		url: "save.php",
		data: {
			count: queueCapacity,
			date: dat,
			time: recordTime,
			efficiency: recordEfficiency,
			effective: recordEffective,
			supply: recordSupply
		},
		async: false,
		traditional: false,
		success: function (data) {
			/* body... */
			alert(data);
		}
	});
}
function queryProj () {
	// body... 
	//document.form1.action = "completion.php";
	$.ajax({
		type: "POST",
		url: "completion.php",
		data: {requestDate: document.form1.requestDate.value},
		async: false,
		success: function (data) {
			/* body... */
			var obj = JSON.parse(data);
			document.getElementById('array').innerHTML = "";
			for (var obj_items in obj) {
				document.getElementById('array').innerHTML += obj[obj_items]+"<br/>";
			}
		}
	});
	//document.form1.submit();
}

function onMonitor () {
	// body... 
	if (startMonitor == true) {
		document.getElementById('array').innerHTML += "时刻: "+recordTime[iterator]+" 有效能(j): "+recordEffective[iterator]+" 供给能(j): "+recordSupply[iterator]+" 能效%: "+recordEfficiency[iterator]+"<br/>";
		if (iterator == (queueCapacity-1)) {
			iterator = 0;
			startMonitor = false;
			document.getElementById('array').innerHTML += "数据接收完毕"+"<br/>";
		}
		else{
			iterator = iterator + 1;
		}
	}
	if (isFirstConnectSuccess == true){
		// document.getElementById('array').innerHTML += "连接成功!"+"<br/>";
		// document.getElementById('begin').disabled = false;
		// startMonitor = true;
		document.getElementById('array').innerHTML += "错误: 连接超时!"+"<br/>";
		document.getElementById('begin').value = "开始";
		document.getElementById('begin').disabled = false;
		isFirstConnectSuccess = false;
	}

}
