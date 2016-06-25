(function() {
	"Use Strict";

// Prevents the player from entering non-numeric characters in the inputs
    $('#minute').on('change keyup', function() {
      var sanitized = $(this).val().replace(/[^0-9]/g, '');
      $(this).val(sanitized);
    });

    $('#second').on('change keyup', function() {
        var sanitized = $(this).val().replace(/[^0-9]/g, '');
        $(this).val(sanitized);
    });

// Sets the High Score if it exists
    if(localStorage.getItem("highscore") >= 1) {
        $("#high").html(localStorage.getItem("highscore"));
    } else {
        $("#high").html(0);
    }

// The Buttons

    // Starts the game
	$("#start").click(function() {
		$("#start").html("Restart the Game!");
		$("#totalrounds").html("0");
		$("#wins").html("0");
		$("#draws").html("0");
		$("#losses").html("0");
		timer();
	});	

    // Clears the High Score
    $("#clear").click(function() {
        localStorage.clear();
        $("#high").html(0);
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
        if($("#minute").val() == "") {
            var minute = 0;
        } else if($("#minute").val() == 0) { 
            var minute = 0;
        } else {
    		var minute = $("#minute").val().replace(/^0+/, '');
        }
		var minuteseconds = minute * 60;

        if($("#second").val() == "") {
            var second = 30;
        } else {
    		if($("#second").val() < 10) {
                if($("#second").val() == 0) {
                    var second = "00";
                } else {
        			var second = "0" + $("#second").val().replace(/^0+/, '');
                }
    		} else {
    			var second = $("#second").val().replace(/^0+/, '');
    		}
        }
		var total = parseInt(minuteseconds) + parseInt(second);

    // One final check to make sure that the user doesn't put anything over an hour
        if(total >= 3600) {
            total = 3600;
            minute = 60;
            second = "00";
        }
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

	// Interval that makes the timer count down
		var go = setInterval(function() {
			console.log(total);
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
					$("#minutecount").html(minute-1);
					$("#secondcount").html("59");
					second = 59;
					total = total - 1;
				} else {
					if(second <= 10) {
						if(total == 10) {
							$("#warning").css("opacity", 1);
						} else {
							$("#warning").css("opacity", 0);
						}
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
		var boturl = "/img/" + botchoice + ".png";
		var yoururl = "/img/" + choice + ".png";
		$("#botchoice").html("<img src=" + boturl + ">");
		$("#yourchoice").html("<img src=" + yoururl + ">");
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

    // Increases the count of the total rounds played by 1 every time this function is called
		totalrounds = parseInt(totalrounds) + 1;
		$("#totalrounds").html(totalrounds);
	}

// Determines who won the game based on the score
	function whoWon() {
		var wins = parseInt($("#wins").html());
		var draws = parseInt($("#draws").html());
		var losses = parseInt($("#losses").html());

    // Sets a new high score if the amount of wins in this game is greater than the previous high score
        if($("#high").html() < wins) {
            localStorage.setItem("highscore", wins);
            $("#high").html(localStorage.getItem("highscore"));
        }

		if(wins > losses && wins > draws) {
			alert("Time is up! You won!");
		} else if(losses > wins && losses > draws) {
			alert("Time is up! You lost!");
		} else if(draws > wins && draws > losses) {
			alert("Time is up! It is a Tie!");
		} else {
            alert("Time is up! The game is not a win, loss, or tie!");
        }
	}
})();