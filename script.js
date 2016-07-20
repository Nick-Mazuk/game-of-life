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
	for(let i = 0; i < height; i++) {
		output.push([]);
		for(let j = 0; j < width; j++) {
			var num = Math.random();
			if(num < 1 / 2)
				output[i].push(0);
			else if(num < 3 / 4)
				output[i].push(1);
			else
				output[i].push(2);
		}
	}
	allPictures.push(new Picture(output));
	display(0);
	for(let i = 1; i <= progress.max; i++) {
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
	for(let i = 1; i <= progress.max; i++) {
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
	for(let j = 0; j < image.length; j++) {
		for(let k = 0; k < image[j].length; k++) {
			var neighbors = [];
			neighbors.push(prev[(j-1+height)%height][(k+1+width)%width]);
			neighbors.push(prev[j][(k+1)%width]);
			neighbors.push(prev[(j+1)%height][(k+1)%width]);
			neighbors.push(prev[(j+1)%height][k]);
			neighbors.push(prev[(j+1)%height][(k-1+width)%width]);
			neighbors.push(prev[j][(k-1+width)%width]);
			neighbors.push(prev[(j-1+height)%height][(k-1+width)%width]);
			neighbors.push(prev[(j-1+height)%height][k]);
			var identity = image[j][k] - 1;
			var neighborCount = [];
			neighborCount.push(countArray(neighbors,1));
			neighborCount.push(countArray(neighbors,2));
			if(identity != -1) {
				if(neighborCount[identity] < 2 || neighborCount[identity] > 3)
					image[j][k] = 0;
				if(neighborCount[identity] < neighborCount[(identity+1)%2])
					image[j][k] = 0;
			} else {
				if(neighborCount[0] > 2 && neighborCount[1] < 2)
					image[j][k] = 1;
				else if(neighborCount[1] > 2 && neighborCount[0] < 2)
					image[j][k] = 2;
			}
		}
	}
}

function display(num) {
	ctx.fillStyle = "#FFF";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	var image = allPictures[num].image;
	for(let i = 0; i < image.length; i++) {
		for(let j = 0; j < image[i].length; j++) {
    			ctx.fillStyle = "#" + (image[i][j] === 0 ? "FFF" : (image[i][j] == 1 ? "0F0" : "00F"));
    			ctx.fillRect(i,j,1,1);
		}
	}
}

function countArray(arr, item) {
	var count = 0;
	for(let index = 0; index < arr.length; index++)
		if(arr[index] == item)
			count++;
	return count;
}

function Picture(arrPixels) {
	this.image = arrPixels;
}

Picture.prototype.clone = function() {
	var output = [];
	for(let l = 0; l < this.image.length; l++) {
		output.push([]);
		for(let m = 0; m < this.image[l].length; m++) {
			output[l].push(this.image[l][m]);
		}
	}
	return new Picture(output);
}
