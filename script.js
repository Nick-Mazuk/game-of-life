var canvas;
var start;
var blur;
var value;
var ctx;
var allPictures = [];
var timesRan = 0;

window.addEventListener("load",onLoad);

function onLoad() {
	canvas = document.getElementById("canvas");
	start = document.getElementById("start");
	progress = document.getElementById("progress");
	value = document.getElementById("value");
	progress.addEventListener("change",changeState);
	start.addEventListener("mousedown",evolve);
	ctx = canvas.getContext("2d");
	document.onkeydown = function(e){e = e || window.event; if(e.keyCode == "37") backUp(); else if(e.keyCode == "39") advance();};
	generate();
}

function generate() {
	console.log("start");
	allPictures = [];
	var output = [];
	var height = 300;
	var width = 300;
	canvas.height = height;
	canvas.width = width;
	for(i = 0; i < height; i++) {
		output.push([]);
		for(j = 0; j < width; j++) {
			var num = Math.random();
			if(num < 1 / 2)
				output[i].push(new Pixel(j + 1, i + 1, 0));
			else if(num < 3 / 4)
				output[i].push(new Pixel(j + 1, i + 1, 1));
			else
				output[i].push(new Pixel(j + 1, i + 1, 2));
		}
	}
	allPictures.push(new Picture(output));
	display(0);
	for(i = 1; i <= progress.max; i++) {
		allPictures.push(allPictures[i - 1].clone());
		progressImage(i,canvas.width,canvas.height);
	}
	console.log("end");
	document.body.style.cursor = "default";
}

function evolve() {
	document.body.style.cursor = "progress";
	document.body.getBoundingClientRect();
	allPictures = [allPictures[allPictures.length - 1].clone()];
	display(0);
	for(i = 1; i <= progress.max; i++) {
		allPictures.push(allPictures[i - 1].clone());
		progressImage(i,canvas.width,canvas.height);
	}
	timesRan++;
	changeState();
	console.log("end");
	document.body.style.cursor = "default";
}

function advance() {
	var setting = parseInt(value.innerHTML);
	var newSetting = setting + 1 <= progress.max ? setting + 1 : setting;
	progress.value = newSetting;
	value.innerHTML = newSetting;
	display(newSetting);
}

function backUp() {
	var setting = parseInt(value.innerHTML);
	var newSetting = setting - 1 >= 0 ? setting - 1 : setting;
	progress.value = newSetting;
	value.innerHTML = newSetting;
	display(newSetting);
}

function changeState() {
	var setting = parseInt(progress.value);
	value.innerHTML = (setting + timesRan * 100);
	display(setting);
}

function progressImage(num, width, height) {
	var image = allPictures[num].image;
	var prev = allPictures[num - 1].image;
	for(j = 0; j < image.length; j++) {
		for(k = 0; k < image[j].length; k++) {
			var neighbors = [];
			neighbors.push(prev[(j-1+height)%height][(k+1+width)%width].identity);
			neighbors.push(prev[j][(k+1)%width].identity);
			neighbors.push(prev[(j+1)%height][(k+1)%width].identity);
			neighbors.push(prev[(j+1)%height][k].identity);
			neighbors.push(prev[(j+1)%height][(k-1+width)%width].identity);
			neighbors.push(prev[j][(k-1+width)%width].identity);
			neighbors.push(prev[(j-1+height)%height][(k-1+width)%width].identity);
			neighbors.push(prev[(j-1+height)%height][k].identity);
			var identity = image[j][k].identity - 1;
			var neighborCount = [];
			neighborCount.push(countArray(neighbors,1));
			neighborCount.push(countArray(neighbors,2));
			if(identity != -1) {
				if(neighborCount[identity] < 2 || neighborCount[identity] > 3)
					image[j][k].identity = 0;
				if(neighborCount[identity] < neighborCount[(identity+1)%2])
					image[j][k].identity = 0;
			} else {
				if(neighborCount[0] > 2 && neighborCount[1] < 2)
					image[j][k].identity = 1;
				else if(neighborCount[1] > 2 && neighborCount[0] < 2)
					image[j][k].identity = 2;
			}
		}
	}
}

function display(num) {
	ctx.fillStyle = "#FFF";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	var image = allPictures[num].image;
	for(i = 0; i < image.length; i++) {
		for(j = 0; j < image[i].length; j++) {
			image[i][j].display();
		}
	}
}

function countArray(arr, item) {
	var count = 0;
	for(index = 0; index < arr.length; index++)
		if(arr[index] == item)
			count++;
	return count;
}

function Pixel(x,y,identity) {
	this.x = x;
	this.y = y;
	this.identity = identity;
}

Pixel.prototype.display = function() {
	ctx.beginPath();
	ctx.fillStyle = "#" + (this.identity === 0 ? "FFF" : (this.identity == 1 ? "0F0" : "00F"));
	ctx.arc(this.x,this.y,1,0,2*Math.PI);
	ctx.fill();
}

Pixel.prototype.clone= function() {
	return new Pixel(this.x,this.y,this.identity);
}

function Picture(arrPixels) {
	this.image = arrPixels;
}

Picture.prototype.clone = function() {
	var output = [];
	for(l = 0; l < this.image.length; l++) {
		output.push([]);
		for(m = 0; m < this.image[l].length; m++) {
			output[l].push(this.image[l][m].clone());
		}
	}
	return new Picture(output);
}
