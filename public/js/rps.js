(function() {
	"Use Strict";
	$("#start").click(function() {
		timer();
	});	
	function timer() {
		$("#minute").attr("disabled", "disabled");
		$("#second").attr("disabled", "disabled");
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
			console.log(second % 60);
			var leftover = second % 60;
			if(leftover == 0) {
				second = "00";
			} else {
				second = second % 60;
			}

		}
		$("#minutecount").html(minute);
		$("#secondcount").html(second);
		var remainder = total % 60;

	// Interval that makes the timer count down
		var go = setInterval(function() {
			if(total <= 0) {
				clearInterval(go);
				alert("Time is up!");
				$("#minute").removeAttr("disabled");
				$("#second").removeAttr("disabled");
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

	function shoot() {
	}
})();