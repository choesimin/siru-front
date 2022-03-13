var flag = null;

function regist() {
	var title = $("input[name='title'");
	var content = $("textarea[name='content'");

	if (title.val() == "") {
		title.focus();
	} else if (content.val() == "") {
		content.focus();
	} else {
		if (flag == true) {
			$("#write_form").attr({
				action : "/user/board/poem/regist",
				method : "post"
			});
			$("#write_form").submit();
		} else if (flag == false) {
			$("#write_form").attr({
				action : "/user/board/story/regist",
				method : "post"
			});
			$("#write_form").submit();
		} else {
			$("#regist_button").html("선택 필수");
		}
	}
}

$(function(){
	$("#poem_mode").mousedown(function() {
		$("#poem_mode").css("background-color","#fbbd0d40");
		$("#story_mode").css("background-color","transparent");
		
		flag = true;
	});
	
	$("#story_mode").mousedown(function() {
		$("#story_mode").css("background-color","#fbbd0d40");
		$("#poem_mode").css("background-color","transparent");
		
		flag = false;
	});
	
	$("#regist_button").click(function() {
		regist();
	});
	
	$('input[type="text"]').keydown(function(event) {
		if (event.keyCode == 13) {
			event.preventDefault();
		}
	});

});