//canvas.width = 600, height = 200
var xAxis = new Array(10)
	xAxis[0] = "13:54:23"
	xAxis[1] = "13:58:01"
	xAxis[2] = "14:04:39"
	xAxis[3] = "14:07:32"
	xAxis[4] = "14:11:15"
	xAxis[5] = "14:14:47"
	xAxis[6] = "14:15:21"
	xAxis[7] = "14:15:59"
	xAxis[8] = "14:16:30"
	xAxis[9] = "14:17:12"
var yAxis = new Array(10)
for (var i = 0; i < yAxis.length; i++) {
	yAxis[i] = i * 2;
}
var srcData = new Array();
var tempX = 0;
var tempY = 0;
var nextX = 0;
var nextY = 0;
var pos = 0;

function importDataFromMysql () {
	// body... 
	var ajax = new XMLHttpRequest();
	var receiveMsg = "no messange";
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			receiveMsg = ajax.responseText;
			srcData = stringToMsg(receiveMsg);
		}
	};
	ajax.open("GET", "/Users/a123/Sites/htmlFolder/storeData.php", true);
	ajax.send();
}
function lineChartDraw() {
	// body...
	var canvasElement=document.getElementById("myCanvas");
	var canvasElementContext=canvasElement.getContext("2d");
	canvasElementContext.beginPath();
	canvasElementContext.lineWidth = 2;
	canvasElementContext.strokeStyle = 'red';
	var covertedDrawData = convertDataToChart(srcData);
	canvasElementContext.moveTo(80,covertedDrawData[0]);
	for (var i = 1; i < covertedDrawData.length; i++) {
		canvasElementContext.lineTo(80 + i*60,covertedDrawData[i]);
	}
	canvasElementContext.stroke();
	for (var i = 0; i < covertedDrawData.length; i++) {
		canvasElementContext.beginPath();
		canvasElementContext.arc(80 + i*60, covertedDrawData[i],3,0,Math.PI*2,true);
		canvasElementContext.fillStyle = 'red';
		canvasElementContext.fill();
	}

}

function animateLineChartDraw() {
	// body...
	display();
	var canvasElement=document.getElementById("myCanvas");
	var canvasElementContext=canvasElement.getContext("2d");
	updateData();
	if ((tempX - 80)%60 == 0) {
		canvasElementContext.beginPath();
		canvasElementContext.arc(tempX, tempY,3,0,Math.PI*2,true);
		canvasElementContext.fillStyle = 'red';
		canvasElementContext.fill();
		if (tempX == 620) {
			clearInterval(int);
		}
	}
	canvasElementContext.beginPath();
	canvasElementContext.lineWidth = 2;
	canvasElementContext.strokeStyle = 'red';
	canvasElementContext.moveTo(tempX,tempY);
	canvasElementContext.lineTo(nextX,nextY);
	canvasElementContext.stroke();
}

function updateData() {
	// body...
	var convertData = convertDataToChart(srcData);
	if (tempX == 0) {
		tempX = 80;
		tempY = convertData[0];
		nextX = tempX + 6;
		nextY = (convertData[1] - convertData[0])/10 + tempY;
	}
	else if ((nextX - 80)%60 == 0) {
		pos++;
		tempX = nextX;
		tempY = nextY;
		nextX = tempX + 6;
		nextY = (convertData[pos+1] - convertData[pos])/10 + tempY;
	}
	else{
		tempX = nextX;
		tempY = nextY;
		nextX = tempX + 6;
		nextY = (convertData[pos+1] - convertData[pos])/10 + tempY;
	}
}

function borderDraw() {
	// body...
	var canvasElement=document.getElementById("myCanvas");
	var canvasElementContext=canvasElement.getContext("2d");
	canvasElementContext.beginPath();
	canvasElementContext.strokeStyle = 'Gainsboro';
	canvasElementContext.lineWidth = 1;
	for (var i = 70; i < 250; i = i + 20) {
		canvasElementContext.moveTo(50,i);
		canvasElementContext.lineTo(650,i);
		canvasElementContext.stroke();
	}
	for (var i = 110; i < 650; i = i + 60) {
		canvasElementContext.moveTo(i,50);
		canvasElementContext.lineTo(i,250);
		canvasElementContext.stroke();
	}
	canvasElementContext.beginPath();
	canvasElementContext.strokeStyle = 'black';
	canvasElementContext.lineWidth = 2;
	canvasElementContext.strokeRect(50,50,600,200);
	canvasElementContext.font = "12px serif";
	for (var i = 0; i < 10; i++) {
		canvasElementContext.fillText(xAxis[i], 55 + i * 60, 280);
	}
	canvasElementContext.font = "15px";
	canvasElementContext.fillText("(时:分:秒)",650,280);
	canvasElementContext.font = "12px serif";
	for (var i = 9; i >= 0; i--) {
		if (yAxis[i] < 10) {
			canvasElementContext.fillText(yAxis[i],35,255 - i * 20);
		}
		else{
			canvasElementContext.fillText(yAxis[i],30,255 - i * 20);
		}
	}	
	canvasElementContext.fillText(20,30,55);
	canvasElementContext.fillText("单位",30,30);
}

function convertDataToChart(srcArray) {
	// body...
	var covertedData = new Array(10);
	for (var i = 0; i < srcArray.length; i++) {
		covertedData[i] = 250 - 10 * srcArray[i];
	}
	return covertedData;
}

function display() {
	// body...
	document.getElementById('td0').innerHTML = xAxis[0];
	document.getElementById('td1').innerHTML = xAxis[1];
	document.getElementById('td2').innerHTML = xAxis[2];
	document.getElementById('td3').innerHTML = xAxis[3];
	document.getElementById('td4').innerHTML = xAxis[4];
	document.getElementById('td5').innerHTML = xAxis[5];
	document.getElementById('td6').innerHTML = xAxis[6];
	document.getElementById('td7').innerHTML = xAxis[7];
	document.getElementById('td8').innerHTML = xAxis[8];
	document.getElementById('td9').innerHTML = xAxis[9];
	document.getElementById('tds0').innerHTML = srcData[0];
	document.getElementById('tds1').innerHTML = srcData[1];
	document.getElementById('tds2').innerHTML = srcData[2];
	document.getElementById('tds3').innerHTML = srcData[3];
	document.getElementById('tds4').innerHTML = srcData[4];
	document.getElementById('tds5').innerHTML = srcData[5];
	document.getElementById('tds6').innerHTML = srcData[6];
	document.getElementById('tds7').innerHTML = srcData[7];
	document.getElementById('tds8').innerHTML = srcData[8];
	document.getElementById('tds9').innerHTML = srcData[9];
}

function displayAndLineChartDraw() {
	// body...
	display();
	lineChartDraw();
}

function stringToMsg (str) {
	// body... 
	var frontPos = str.indexOf(',');
	var endPos = 0;
	var msg = new Array();
	while ((frontPos != (str.length - 1)) && (frontPos > -1)) {
		// statement
		endPos = str.indexOf(',', frontPos+1);
		msg.push(parseInt(str.substring(frontPos+1, endPos)));
		frontPos = endPos;
	}
	msg.pop();
	return msg;
}
