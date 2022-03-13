$(function(){
	$("#regist_button").click(function() {
		var title = $("input[name='title'");
		var content = $("textarea[name='content'");
	
		if (title.val() == "") {
			title.focus();
		} else if (content.val() == "") {
			content.focus();
		} else {
			$("#write_form").attr({
				action : "/user/board/story/modify",
				method : "post"
			});
			$("#write_form").submit();
		}
	});
});