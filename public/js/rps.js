(function() {
	"Use Strict";
	$("#start").click(function() {
		var minute = $("#minute").val();
		var second = $("#second").val();
		timer();
	});	
	function timer() {
		var minute = $("#minute").val();
		var minuteseconds = minute * 60;
		var second = $("#second").val();
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
		console.log(remainder);
		var go = setInterval(function() {
			if(total < 0) {
				clearInterval(go);
			} else {
				if(second == 0) {

				}
			}
		});
	}
})();