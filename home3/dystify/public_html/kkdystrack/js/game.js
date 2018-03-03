class Graphics {
	constructor(width, height) {
		let canvas = document.getElementById("canvas");
		canvas.width = width;
		canvas.height = height;
		
		this._canvas = canvas;
		this._ctx = canvas.getContext("2d");
		
		this.width = width;
		this.height = height;
	}
	
	setColor(r, g, b, a) {
    let componentToHex = c => c.toString(16).length == 1 ? "0" + c.toString(16) : c.toString(16);
		this._ctx.fillStyle =  "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a || 255);
	}
	
	rectangle(x, y, w, h) {
		this._ctx.fillRect(x, y, w, h);
	}
}

const graphics = new Graphics($(".wrapper").outerWidth(), $(".wrapper").outerHeight());

graphics.setColor(0, 0, 255);
graphics.rectangle(50, 50, 100, 100);