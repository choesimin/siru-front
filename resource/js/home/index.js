function init() {
  document.getElementById('password_login').addEventListener('keyup', function(e) {
    if(e.keyCode == 13) {
      login();
    }
  });

  if (tokenIsExist()) {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('start').style.display = 'none';
  }
}


function register() {
  var name = document.getElementById('name_regist');
  var email = document.getElementById('email_regist');
  var password = document.getElementById('password_regist');
  var repassword = document.getElementById('repassword_regist');
  var guide = document.getElementById('regist_guide');
  
  if (email.value == '') {
    guide.innerText = '이메일을 입력해주세요.';
    email.focus();
  } else if (password.value == '') {
    guide.innerText = '비밀번호를 입력해주세요.';
    password.focus();
  } else if (repassword.value == '') {
    guide.innerText = '비밀번호를 재입력해주세요.';
    repassword.focus();
  } else if (name.value == '') {
    guide.innerText = '닉네임을 입력해주세요.';
    name.focus();
  } else if (password.value != repassword.value) {
    guide.innerText = '비밀번호와 재입력란의 비밀번호가 다릅니다.';
    password.focus();
  } else if (email.value.length < 6) {
    guide.innerText = '이메일은 6자 이상으로 입력해주세요.';
    email.focus();
  } else if (password.value.length < 6) {
    guide.innerText = '비밀번호는 6자 이상으로 입력해주세요.';
    password.focus();
  } else {
    fetchPost(url.member, {email: email.value, password: password.value, name: name.value})
      .then(response => {
        if (response.ok) {
          guide.innerText = name.value + ' 작가님, 환영합니다.'
          name.value = '';
          email.value = '';
          password.value = '';
          repassword.value = '';
        } else {
          guide.innerText = '가입에 실패했습니다.'
        }
      });
  }
}

function login() {
  var email = document.getElementById('email_login');
  var password = document.getElementById('password_login');
  var guide = document.getElementById('login_guide');
  
  fetchPost(url.member + '/auth', {email: email.value, password: password.value})
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error;
      }
    })
    .then(data => {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('id', data.id);
      location.href = '/';
    })
    .catch(() => {
      guide.innerText = '로그인에 실패했습니다.';
    });
}

window.addEventListener('load', function() {
  init();
});