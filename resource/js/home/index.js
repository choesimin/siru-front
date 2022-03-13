function regist() {
  var email = $("#email_regist");
  var password = $("#password_regist");
  var repassword = $("#repassword_regist");
  var nickname = $("#nickname_regist");
  var guide = $("#regist_guide");
  
  if (email.val() == "") {
    guide.html("이메일을 입력해주세요.");
    email.focus();
  } else if (password.val() == "") {
    guide.html("비밀번호를 입력해주세요.");
    password.focus();
  } else if (repassword.val() == "") {
    guide.html("비밀번호를 재입력해주세요.");
    repassword.focus();
  } else if (nickname.val() == "") {
    guide.html("닉네임을 입력해주세요.");
    nickname.focus();
  } else if (password.val() != repassword.val()) {
    guide.html("비밀번호와 재입력 란의 비밀번호가 다릅니다.");
    password.focus();
  } else if (email.val().length < 6) {
    guide.html("이메일은 6자 이상으로 입력해주세요.");
    email.focus();
  } else if (password.val().length < 6) {
    guide.html("비밀번호는 6자 이상으로 입력해주세요.");
    password.focus();
  } else {
    $.ajax({
      url : "localhost:8080/member",
      method : "post",
      data : {
        email : email.val(),
        password : password.val(),
        nickname : nickname.val()
      },
      success : function() {
        guide.html(nickname.val() + '님, 환영합니다.');
      
        email.val("");
        password.val("");
        repassword.val("");
        nickname.val("");
      }
    });
  }
}

function login() {
  var email = $("#email_login");
  var password = $("#password_login");
  var guide = $("#login_guide");
  
  $.ajax({
    url : "localhost:8080/member/auth",
    method : 'post',
    data : {
      email : email.val(),
      password : password.val()
    },
    success : function(response) {
      if (response === true) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('memberId', response.membeId);
        location.href = '/';
      } else {
        guide.html('로그인에 실패했습니다.');
      }
    }
  });
}

function showChangePassword() {
  $("#change_password").css("display", "block");
}

function changePassword() {
  var email = $("#email_change");
  var password = $("#password_change");
  var repassword = $("#repassword_change");
  var guide = $("#change_guide");
  
  if (email.val() == "") {
    guide.html("이메일을 입력해주세요.");
    email.focus();
  } else if (password.val() == "") {
    guide.html("비밀번호를 입력해주세요.");
    password.focus();
  } else if (repassword.val() == "") {
    guide.html("비밀번호를 재입력해주세요.");
    repassword.focus();
  } else if (password.val().length < 6) {
    guide.html("비밀번호는 6자 이상으로 입력해주세요.");
    password.focus();
  } else if (password.val() != repassword.val()) {
    guide.html("비밀번호와 재입력 란의 비밀번호가 다릅니다.");
    password.focus();
  } else {
    $.ajax({
      url : "/rest/member/password/change",
      method : "post",
      data : {
        email : email.val(),
        password : password.val()
      },
      success : function(responseData) {
        var responseJson = JSON.parse(responseData);
        
        console.log(responseJson);
        
        guide.html(responseJson.message);
        
        if(responseJson.code == 10) {
          email.val("");
          password.val("");
          repassword.val("");
        }
      }
    });
  }
}

$(function() {
  $("#regist_button").on("click", function() {
    regist();
  });

  $("#login_button").on("click", function() {
    login();
  });

  $("#password_login").keyup(
    function(e) {
      if(e.keyCode == 13) {
        login();
      }
    }
  );
});