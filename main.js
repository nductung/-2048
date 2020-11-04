const GRID_W = 4;
const GRID_H = 4;
const CVS_W = 400;
const CVS_H = 400;


let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

var grid = [[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]];


var score = 0;


function number() {
	while (true) {
		//(x,i) , (y,j)
		let x = Math.floor(Math.random() * GRID_H);
		let y = Math.floor(Math.random() * GRID_W);
		if (grid[x][y] === 0) {
			grid[x][y] = (Math.random() < 0.5) ? 2 : 4;

			fillColor(x, y);

			ctx.rect(y * 100, x * 100, 100, 100); //ve 1 o grid de len o vua fillColor
			ctx.stroke();

			break;
		}
	}
}

function moveAll(arr) {
	let noneZeros = arr.filter(val => val);
	let missing = GRID_W - noneZeros.length;
	let zeros = new Array(missing).fill(0);
	return noneZeros.concat(zeros);
}

function combine(arr) {
	for (var j = 0; j < GRID_W; j++) {
		if (arr[j] !== 0) {
			if (arr[j] === arr[j+1]) {
				arr[j] += arr[j+1];
				arr[j+1] = 0;

				score = score + arr[j] + arr[j+1];
			}
		}
	}
	return moveAll(arr);
}


function drawGrid() {
	ctx.fillStyle = "black";
	for (var i = 0; i <= CVS_H; i += 100) {
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(CVS_W, i);
		ctx.stroke();
	}

	for (var j = 0; j <= CVS_W; j += 100) {
		ctx.beginPath();
		ctx.moveTo(j, 0);
		ctx.lineTo(j, CVS_H);
		ctx.stroke();
	}
}

function drawNumber() {
	for (var i = 0; i < GRID_H; i++) {
		for (var j = 0; j < GRID_W; j++) {


			if (grid[i][j] !== 0) {
				ctx.fillStyle = "black";
				ctx.font = "30px Arial";
				ctx.textAlign = "center";
				ctx.fillText(grid[i][j], j * 100 + 50, i * 100 + 60);
			}



		}
	}
}


function drawScore() {

	ctx.textAlign = "center";
	ctx.fillText(score, CVS_W + 100, CVS_H / 2);

}


function fillColor(i, j) {




	switch (grid[i][j]) {
		case 0:
			ctx.fillStyle = "white";
			break;
		case 2:
			ctx.fillStyle = "#eee4da";
			break;
		case 4:
			ctx.fillStyle = "#ede0c8";
			break;
		case 8:
		case 16:
			ctx.fillStyle = "#f59563";
			break;
		case 32:
			ctx.fillStyle = "#f67c5f";
			break;
		case 64:
			ctx.fillStyle = "#f65e3b";
			break;
		case 128:
			ctx.fillStyle = "#edcf72";
			break;
		case 256:
			ctx.fillStyle = "#edcc61";
			break;
		case 512:
		case 2048:
			ctx.fillStyle = "#e9c55b";
			break;
		case 1024:
			ctx.fillStyle = "#eee4da";
			break;
		case 4096:
			ctx.fillStyle = "#b784ab";
			break;
		case 8192:
			ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
			break;
		default:
			break;

	}


	ctx.fillRect(j * 100, i * 100, 100, 100);


}




function upArrow(arr) {
	let result = [[0,0,0,0],
				  [0,0,0,0],
				  [0,0,0,0],
				  [0,0,0,0]];
	for (var i = 0; i < GRID_H; i++) {
		for (var j = 0; j < GRID_W; j++) {
			result[GRID_W - 1 - j][i] = arr[i][j];
		}
	}
	return result;
}


function upArrowAfter(arr) {
	let result = [[0,0,0,0],
				  [0,0,0,0],
				  [0,0,0,0],
				  [0,0,0,0]];
	for (var i = 0; i < GRID_H; i++) {
		for (var j = 0; j < GRID_W; j++) {
			result[i][j] = arr[GRID_W - 1 - j][i];
		}
	}
	return result;
}


function rightArrow(arr) {
	for (var i = 0; i < GRID_H; i++) {
		arr[i].reverse();
	}
	return arr;
}


function checkGameOver() {

	let cover = [[0, 0, 0, 0, 0, 0],
				 [0, 0, 0, 0, 0, 0],
				 [0, 0, 0, 0, 0, 0],
				 [0, 0, 0, 0, 0, 0],
				 [0, 0, 0, 0, 0, 0],
				 [0, 0, 0, 0, 0, 0]];



	for (var i = 0; i < GRID_H; i++) {
		for (var j = 0; j < GRID_W; j++) {
			if (grid[i][j] === 0) return false;
		}
	}

	for (var i = 1; i < 5; i++) {
		for (var j = 1; j < 5; j++) {
			cover[i][j] = grid[i-1][j-1];
		}
	}

	for (var i = 1; i < 5; i++) {
		for (var j = 1; j < 5; j++) {

			if (cover[i][j] === cover[i-1][j] || cover[i][j] === cover[i][j+1] || cover[i][j] === cover[i+1][j] || cover[i][j] === cover[i][j-1]) return false;

		}
	}


	return true;
} 


function drawGameOver() {

	ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
	ctx.fillRect(0, 0, CVS_W, CVS_H);

	ctx.font = "50px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("GAME OVER!", CVS_W / 2, CVS_H / 2 + 20);
	ctx.font = "25px Arial";
	ctx.fillText("Press spacebar to continue.", CVS_W / 2, CVS_H / 2 + 40);

}



function keyPress() {
	document.addEventListener("keydown", function(event) {


		// for (var i = 0; i < GRID_H; i++) {
		// 	let temp = moveAll(grid[i]);
		// 	grid[i] = combine(temp);
		// }
		// draw();

		let pressed = false;

		switch (event.keyCode) {
			case 37:
				pressed = true;
				break;
			case 38:
				grid = upArrow(grid);
				pressed = true;
				break;
			case 39:
				grid = rightArrow(grid);
				pressed = true;
				break;
			case 40:
				grid = upArrowAfter(grid);
				pressed = true;
				break;
			default:
				break;
		}


		if (pressed) {
			for (var i = 0; i < GRID_H; i++) {
				let temp = moveAll(grid[i]);
				grid[i] = combine(temp);
			}
		}

		switch (event.keyCode) {
			case 38:
				grid = upArrowAfter(grid);
				break;
			case 39:
				grid = rightArrow(grid);
				break;
			case 40:
				grid = upArrow(grid);
				break;
			default:
				break;
		}


		if (pressed) {

			draw();

			if (checkGameOver()) {
				drawGameOver();


				document.addEventListener("keydown", function(event) {					
					if (event.keyCode == 32) {

						//re-initial
						grid = [[0, 0, 0, 0],
								[0, 0, 0, 0],
								[0, 0, 0, 0],
								[0, 0, 0, 0]];

						score = 0;


						draw();
					}
				});



			}
		}


	});
}

function draw() {
	
	ctx.clearRect(0, 0, CVS_W + 200, CVS_H);
	
	for (var i = 0; i < GRID_H; i++) {

		for (var j = 0; j < GRID_W; j++) {

			fillColor(i, j);

		}
	}

	drawGrid();

	let full = true;
	for (var i = 0; i < GRID_H; i++) {
		for (var j = 0; j < GRID_W; j++) {
			if (grid[i][j] === 0) {
				full = false;
				break;
			}
		}
	}
	if (!full) number();


	drawNumber();

	drawScore();
}

draw();
keyPress();