/* 没错这个文件就是彩蛋hhh */

var fontSize = 20, delta = 20, period = 800, border = 2;
var pp1 = 8, pp2 = 6, rate = 0.2;

function initEscapeObj(name, tl){
	var canvas = document.getElementById(name);
	if (!canvas) return;
	var ctx = canvas.getContext("2d");
	var width = canvas.width, height = canvas.height;
	ctx.font = fontSize + "px Arial";
	var x = 0, y = 0, ox = 0, oy = 0;
	var tWidth, tHeight, bWidth, bHeight, cWidth, cHeight;
	var inEasing = false, process = 0, timer = 0, idx = 0;
	var text; setText(tl[idx++]);
	function calcValidRange(total, border, rate, len){
		return (total - 2 * border - 2 * rate * len) / (1 + 2 * rate);
	}
	function setText(t){
		text = t;
		var tm = ctx.measureText(text);
		tWidth = tm.width, tHeight = fontSize;
		cWidth = calcValidRange(width, border, rate, tWidth);
		bWidth = (width - cWidth) / 2;
		cHeight = calcValidRange(height, border, rate, tHeight);
		bHeight = (height - cHeight) / 2;
	}
	function _easing_proc(nx, ny){
		// 阻尼振动, min = -rate
		var p = process / period;
		var factor = Math.exp(-pp1 * p) * Math.cos(p * pp2 * Math.PI);
		x = nx + (ox - nx) * factor, y = ny + (oy - ny) * factor;
		ctx.clearRect(0, 0, width, height);
		ctx.fillText(text, x, y);
		process += delta;
		if (process >= period){
			ctx.clearRect(0, 0, width, height);
			ctx.fillText(text, nx, ny);
			clearInterval(timer);
			x = nx, y = ny;
			inEasing = false;
		}
	}
	function update(bEasing, nx, ny){
		if (bEasing){
			inEasing = true, process = 0;
			timer = setInterval(_easing_proc, delta, nx, ny);
		}else{
			ctx.clearRect(0, 0, width, height);
			ctx.fillText(text, nx, ny);
		}
	}
	function init(){
		canvas.addEventListener("click", onMove);
		canvas.addEventListener("mousemove", onMove);
		x = (width - tWidth) / 2, y = (height + tHeight) / 2;
		update(false, x, y);
	}
	function hitTest(px, py, cx, cy){
		if (cx === undefined) cx = x, cy = y;
		return px >= cx && py < cy && px < cx + tWidth && py >= cy - tHeight;
	}
	function calcNewPos(px, py){
		var nx, ny;
		do{
			nx = Math.random() * (width - 2 * bWidth - tWidth) + bWidth, ny = Math.random() * (height - 2 * bHeight - tHeight) + tHeight + bHeight;
		} while (hitTest(px, py, nx, ny));
		ox = x, oy = y;
		update(true, nx, ny);
	}
	function onMove(e){
		var px = e.offsetX, py = e.offsetY;
		if (hitTest(px, py) && !(inEasing && process * pp2 < period)){
			if (inEasing){
				inEasing = false;
				clearInterval(timer);
			}
			this.style.cursor = 'hand';
			if (idx < tl.length) setText(tl[idx++]);
			calcNewPos(px, py);
		}else this.style.cursor = '';
	}
	init();
}
