(function() {
	"Use Strict";
	$("#start").click(function() {
		var minute = $("#minute").val();
		var second = $("#second").val();
		timer();
	});	
	function timer() {
		var minute = ($("#minute").val()) * 60;
		var second = $("#second").val();
		var total = minute + second;
		var remainder = total % 60;
		console.log(remainder);
		var go = setInterval(function() {
			if(total < 0) {
				clearInterval(go);
			} else {
				
			}
		});
	}
})();