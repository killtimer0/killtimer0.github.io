/* 没错这个文件就是彩蛋hhh */

var fontSize = 20, delta = 20, period = 800;

function initEscapeObj(name, text){
    var canvas = document.getElementById(name);
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var width = canvas.width, height = canvas.height;
    ctx.font = fontSize + "px Arial";
    var tm = ctx.measureText(text), x = 0, y = 0, ox = 0, oy = 0;
    var tWidth = tm.width, tHeight = fontSize;
    var inEasing = false, process = 0, timer = 0;
    function _easing_proc(){
        // 阻尼振动
        var p = process / period;
        var factor = Math.exp(-8 * p) * Math.cos(p * 6 * Math.PI);
        var tx = x + (ox - x) * factor, ty = y + (oy - y) * factor;
        ctx.clearRect(0, 0, width, height);
        ctx.fillText(text, tx, ty);
        process += delta;
        if (process >= period){
            ctx.clearRect(0, 0, width, height);
            ctx.fillText(text, x, y);
            clearInterval(timer);
            inEasing = false;
        }
    }
    function update(bEasing){
        if (bEasing){
            inEasing = true, process = 0;
            timer = setInterval(_easing_proc, delta);
        }else{
            ctx.clearRect(0, 0, width, height);
            ctx.fillText(text, x, y);
        }
    }
    function init(){
        canvas.addEventListener("click", onMove);
	    canvas.addEventListener("mousemove", onMove);
        x = (width - tWidth) / 2, y = (height + tHeight) / 2;
        update(false);
    }
    function hitTest(px, py, cx, cy){
        if (cx === undefined) cx = x, cy = y;
        return px >= cx && py < cy && px < cx + tWidth && py >= cy - tHeight;
    }
    function calcNewPos(px, py){
        var nx, ny;
        do{
            nx = Math.random() * (width - tWidth), ny = Math.random() * (height - tHeight) + tHeight;
        } while (hitTest(px, py, nx, ny));
        ox = x, oy = y;
        x = nx, y = ny;
        update(true);
    }
    function onMove(e){
        var px = e.offsetX, py = e.offsetY;
        if (hitTest(px, py)){
            if (inEasing){
                inEasing = false;
                clearInterval(timer);
            }
            this.style.cursor = 'hand';
            calcNewPos(px, py);
        }else this.style.cursor = '';
    }
    init();
}
