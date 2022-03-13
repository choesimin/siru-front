function getInformation() {
	var member_id = $("#member_id");
	var nickname = $("#nickname");
	var id = $("#id");
	var email = $("#email");
	var password = $("#password");
	var repassword = $("#repassword");
	
	$.ajax({
		url : "/rest/my/information/get?member_id=" + member_id.val(),
		method : "get",
		success : function(responseData) {
			var memberJson = JSON.parse(responseData);

			nickname.val(memberJson.nickname);
			id.val(memberJson.id);
			email.val(memberJson.email);
			password.val("");
			repassword.val("");
		}
	});
}

function changeInformation() {
	var member_id = $("#member_id");
	var nickname = $("#nickname");
	var id = $("#id");
	var email = $("#email");
	var password = $("#password");
	var repassword = $("#repassword");
	var guide = $("#information_guide");

	if (id.val() == "") {
		guide.html("아이디를 입력해주세요.");
		id.focus();
	} else if (password.val() == "") {
		guide.html("비밀번호를 입력해주세요.");
		password.focus();
	} else if (repassword.val() == "") {
		guide.html("비밀번호를 재입력해주세요.");
		repassword.focus();
	} else if (nickname.val() == "") {
		guide.html("닉네임을 입력해주세요.");
		nickname.focus();
	} else if (email.val() == "") {
		guide.html("이메일을 입력해주세요.");
		email.focus();
	} else if (password.val() != repassword.val()) {
		guide.html("비밀번호와 재입력 란의 비밀번호가 다릅니다.");
		password.focus();
	} else if (id.val().length < 6) {
		guide.html("아이디는 6자 이상으로 입력해주세요.");
		id.focus();
	} else if (password.val().length < 6) {
		guide.html("비밀번호는 6자 이상으로 입력해주세요.");
		password.focus();
	} else {
		$.ajax({
			url : "/rest/my/information/change",
			method : "post",
			data : {
				member_id : member_id.val(),
				id : id.val(),
				password : password.val(),
				nickname : nickname.val(),
				email : email.val()
			},
			success : function(responseData) {
				var responseJson = JSON.parse(responseData);
				guide.html(responseJson.message);
				
				if (responseJson.code == 10) {
					getInformation();
				}
			}
		});
	}
}

function noSpace(obj) {
    var str_space = /\s/;
    if (str_space.exec(obj.value)) {
        obj.focus();
        obj.value = obj.value.replace(' ','');
        return false;
    }
}

function noSpecialSymbol(obj) {
	var regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi; 
	if (regExp.test(obj.value)) {
		obj.value = obj.value.substring(0, obj.value.length - 1 );
	}
}
			

function onlyAlphabet(obj) {
	obj.value = obj.value.replace(/[^\\!-z]/gi,"");
}

function onlyHangul(obj) {
	obj.value = obj.value.replace(/[a-z0-9]|[\[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g, "");
}

$(function() {
	getInformation();
	
	$(".no_space").on("keyup paste", function() {
		for (var i = 0; i < 50; i++) {
			noSpace(this);
		}
	});

	$(".no_special").on("keyup paste", function() {
		for (var i = 0; i < 50; i++) {
			noSpecialSymbol(this);
		}
	});

	$(".only_alphabet").on("keyup paste", function() {
		for (var i = 0; i < 50; i++) {
			onlyAlphabet(this);
		}
	});

	$(".only_hangul").on("keyup paste", function() {
		for (var i = 0; i < 50; i++) {
			onlyHangul(this);
		}
	});
});
