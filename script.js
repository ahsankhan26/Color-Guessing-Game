//variable declarations
var numSquares = 6;	//number of squares on screen
var colors = [];	//colors array with elements equal to numSquare
var pickedColor;	//randomly pickedColor from "colors" for correct answer.
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();	//init() sets up mode buttons along with the number of squares i.e. 3 or 6
		// it also checks the picked color with the selected color and displays message accordingly.

resetButton.addEventListener("click", function(){
	reset();
});

function init(){

	//mode buttons event listeners
	for(var i=0; i<modeButtons.length; i++){

		modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");

		//does the same thing as comment below
		this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			// if(this.textContent === "Easy"){
			// 	numSquares = 3;
			// }
			// else numSquares = 6;
		reset();
		});
	}

	for(var i=0; i<squares.length; i++){

	//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.background;
			//compare color to pickedColor
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			}
			else{
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}

	reset();
}

function reset(){

	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from the colors array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	//change color of squares
	for(var i=0; i<squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		}
		else squares[i].style.display = "none";		
	}

	h1.style.background = "steelblue";

}

function changeColors(color){
	for(var i=0; i<squares.length; i++){
		squares[i].style.background = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr = [];
	for(var i=0; i<num; i++){
		//get random color and push into arr
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	//pick a "red" from 0-255
	var r = Math.floor(Math.random() * 256);
	//pick a "blue" from 0-255
	var g = Math.floor(Math.random() * 256);
	//pick a "green" from 0-255
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")"; 
}