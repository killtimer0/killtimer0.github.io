/* 真·彩蛋 */

var delta = 20, period = 1000, border = 0;
var pp1 = 8, pp2 = 6, pmin = 0.288;

function px(val){return val + 'px';}
function borderf(ttl, rate){return rate * ttl / (2 * rate + 1);}
function initEscapeObj(name, ratio, href, tl){
	var div = document.getElementById(name);
	if (!div) return;
	div.style.padding = div.style.margin = '0';
	var width = div.offsetWidth;
	var height = Math.round(width * ratio);
	div.style.height = px(height);
	var x = 0, y = 0, ox = 0, oy = 0, nx = 0, ny = 0;
	var tWidth, tHeight, bWidth, bHeight;
	var inEasing = false, process = 0, idx = 0;
	var obj, raf; setText(tl[idx++]);
	function recalcSize(updPos){
		var ow = width, oh = height, obw = bWidth, obh = bHeight;
		width = div.offsetWidth;
		height = Math.round(width * ratio);
		div.style.height = px(height);
		bWidth = borderf(width, pmin);
		bHeight = borderf(height, pmin);
		if (updPos){
			x = (x - obw + tWidth / 2) * (width - 2 * bWidth) / (ow - 2 * obw) + bWidth - tWidth / 2, y = (y - obh + tHeight / 2) * (height - 2 * bHeight) / (oh - 2 * obh) + bHeight - tHeight / 2;
			update(false, x, y);
		}
	}
	function setText(t){
		if (!obj){
			obj = document.createElement('a');
			obj.href = href;
			obj.style.position = 'relative';
			obj.style.userSelect = obj.style.transition = 'none';
			window.addEventListener("resize", onResize);
			obj.addEventListener("click", function(e){e.preventDefault();});
			obj.addEventListener("mousedown", onMove);
			obj.addEventListener("mousemove", onMove);
			div.appendChild(obj);
		}
		obj.innerText = t;
		tWidth = obj.offsetWidth, tHeight = obj.offsetHeight;
		recalcSize(false);
	}
	function _easing_proc(){
		// 阻尼振动, min = -0.288
		raf = requestAnimationFrame(_easing_proc);
		if (process >= period){
			obj.style.left = px(nx), obj.style.top = px(ny);
			cancelAnimationFrame(raf);
			x = nx, y = ny;
			inEasing = false;
			return;
		}
		var p = process / period;
		var factor = Math.exp(-pp1 * p) * Math.cos(p * pp2 * Math.PI);
		x = nx + (ox - nx) * factor, y = ny + (oy - ny) * factor;
		obj.style.left = px(x), obj.style.top = px(y);
		process += delta;
	}
	function update(bEasing, _nx, _ny){
		if (bEasing){
			nx = _nx, ny = _ny;
			inEasing = true, process = 0;
			raf = requestAnimationFrame(_easing_proc);
		}else obj.style.left = px(_nx), obj.style.top = px(_ny);
	}
	function hitTest(px, py, cx, cy){
		return px >= cx && py >= cy && px < cx + tWidth && py < cy + tHeight;
	}
	function calcNewPos(px, py){
		var nx, ny; do{
			nx = Math.random() * (width - 2 * bWidth - tWidth) + bWidth, ny = Math.random() * (height - 2 * bHeight - tHeight) + bHeight;
		}while (hitTest(px, py, nx, ny));
		ox = x, oy = y;
		update(true, nx, ny);
	}
	function onResize(e){recalcSize(true);}
	function onMove(e){
		var px = e.offsetX, py = e.offsetY;
		if (inEasing){
			if (process * pp2 >= period) inEasing = false, cancelAnimationFrame(raf);
		}else{
			if (idx < tl.length) setText(tl[idx++]);
			calcNewPos(px, py);
		}
		e.preventDefault();
	}
	x = (width - tWidth) / 2, y = (height - tHeight) / 2;
	update(false, x, y);
}
