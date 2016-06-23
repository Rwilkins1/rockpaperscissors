(function() {
	"Use Strict";

// The Buttons
	$("#start").click(function() {
		$("#start").html("Restart the Game!");
		$("#totalrounds").html("0");
		$("#wins").html("0");
		$("#draws").html("0");
		$("#losses").html("0");
		timer();
	});	

	$("#rock").click(function() {
		shoot("Rock");
	});

	$("#paper").click(function() {
		shoot("Paper");
	});

	$("#scissors").click(function() {
		shoot("Scissors")
	});

// Handles all timer-related functionality
	function timer() {

	// Removes lock on buttons and locks the inputs and start button
		$("#rock").removeAttr("disabled");
		$("#paper").removeAttr("disabled");
		$("#scissors").removeAttr("disabled");
		$("#minute").attr("disabled", "disabled");
		$("#second").attr("disabled", "disabled");
		$("#start").attr("disabled", "disabled");
		var minute = $("#minute").val();
		var minuteseconds = minute * 60;
		if($("#second").val() < 10) {
			var second = "0" + $("#second").val();
		} else {
			var second = $("#second").val();
		}
		var total = minuteseconds + second;

	// If the user puts in more than 60 seconds, converts it into the appropriate amount of minutes and puts the remaining value in seconds
		if(second >= 60) {
			minute = (parseInt(minute) + parseInt(Math.floor(second / 60)));
			var leftover = second % 60;
			if(leftover == 0) {
				second = "00";
			} else {
				second = second % 60;
			}

		}

	// Sets the values in the timer
		$("#minutecount").html(minute);
		$("#secondcount").html(second);
		var remainder = total % 60;

	// Interval that makes the timer count down
		var go = setInterval(function() {
			if(total <= 0) {
				clearInterval(go);
				$("#rock").attr("disabled", "disabled");
				$("#paper").attr("disabled", "disabled");
				$("#scissors").attr("disabled", "disabled");
				$("#minute").removeAttr("disabled");
				$("#second").removeAttr("disabled");
				$("#start").removeAttr("disabled");
				whoWon();
			} else {
				if(second == 0) {
					console.log("We've reached zero");
					$("#minutecount").html(minute-1);
					$("#secondcount").html("59");
					second = 59;
					total = total - 1;
				} else {
					if(second <= 10) {
						console.log(second);
						$("#secondcount").html("0" + (second-1));
						second = "0" + (second -1);
					} else {
						$("#secondcount").html(second-1);
						second = second - 1;
					}
					total = total - 1;
				}
			}
		}, 1000);
	}
// End of Timer function

// Determines what the user and bot chose.
	function shoot(choice) {
		var options = ["Rock", "Paper", "Scissors"];
		var random = Math.round(Math.random() * 2);
		var botchoice = options[random];
		$("#botchoice").html(botchoice);
		$("#yourchoice").html(choice);
		score(choice, botchoice);
	}

// Determines the winner of the hand and updates the score card
	function score(choice, botchoice) {
		var totalrounds = parseInt($("#totalrounds").html());
		var wins = parseInt($("#wins").html());
		var draws = parseInt($("#draws").html());
		var losses = parseInt($("#losses").html());
		if(choice == "Rock") {
			if(botchoice == "Rock") {
				draws = draws + 1;
				$("#draws").html(draws);
			} else if(botchoice == "Paper") {
				losses = losses + 1;
				$("#losses").html(losses);
			} else if(botchoice == "Scissors") {
				wins = wins + 1;
				$("#wins").html(wins);
			}
		} else if(choice == "Paper") {
			if(botchoice == "Rock") {
				wins = wins + 1;
				$("#wins").html(wins);
			} else if(botchoice == "Paper") {
				draws = draws + 1;
				$("#draws").html(draws);
			} else if(botchoice == "Scissors") {
				losses = losses + 1;
				$("#losses").html(losses);
			}
		} else if(choice == "Scissors") {
			if(botchoice == "Rock") {
				losses = losses + 1;
				$("#losses").html(losses);
			} else if(botchoice == "Paper") {
				wins = wins + 1;
				$("#wins").html(wins);
			} else if(botchoice == "Scissors") {
				draws = draws + 1;
				$("#draws").html(draws);
			}
		}
		totalrounds = parseInt(totalrounds) + 1;
		$("#totalrounds").html(totalrounds);
	}

// Determines who won the game based on the score
	function whoWon() {
		var wins = parseInt($("#wins").html());
		var draws = parseInt($("#draws").html());
		var losses = parseInt($("#losses").html());
		if(wins > losses && wins > draws) {
			alert("Time is up! You won!");
		} else if(losses > wins && losses > draws) {
			alert("Time is up! You lost!");
		} else if(draws > wins && draws > losses) {
			alert("Time is up! It is a Tie!");
		}
	}

// Helps with the flexibility of the page
	// function resizer(){
 //    var width = $(window).width();
 //    var height = $(window).height();

 //    	// $("#bot").css("margin-left", width/2.2);
 //    	// $("#you").css("margin-left", width/2.2);
 //    	console.log(width);
	// };
	// $(document).ready(resizer);
	// $(window).resize(resizer); 
})();