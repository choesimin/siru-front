var memberId = sessionStorage.getItem('id');

function init() {
  var name = document.getElementById('name');
  var email = document.getElementById('email');
  var password = document.getElementById('password');
  var repassword = document.getElementById('repassword');
  var registDt = document.getElementById('regist_date');
  
  fetchGet(url.member + '/' + memberId)
    .then((response) => response.json())
    .then((data) => {
      name.value = data.name;
      email.value = data.email;
      password.value = '';
      repassword.value = '';
      registDt.innerText = getKoreanDate(data.registDt);
    });
}

function changeInformation() {
  var name = document.getElementById('name');
  var email = document.getElementById('email');
  var password = document.getElementById('password');
  var repassword = document.getElementById('repassword');
  var guide = document.getElementById('information_guide');

  if (name.value === '') {
    guide.innerText = '필명을 입력해주세요.';
    name.focus();
  } else if (password.value === '') {
    guide.innerText = '비밀번호를 입력해주세요.';
    password.focus();
  } else if (repassword.value === '') {
    guide.innerText = '비밀번호를 재입력해주세요.';
    repassword.focus();
  } else if (email.value === '') {
    guide.innerText = '이메일을 입력해주세요.';
    email.focus();
  } else if (password.value != repassword.value) {
    guide.innerText = '비밀번호와 재입력 란의 비밀번호가 다릅니다.';
    password.focus();
  } else if (password.value.length < 6) {
    guide.innerText = '비밀번호는 6자 이상으로 입력해주세요.';
    password.focus();
  } else {
    fetchPut(url.member, {id: memberId, email: email.value, password: password.value, name: name.value})
      .then((response) => {
        if (response.ok) {
          guide.innerText = '회원 정보가 변경되었습니다.';
        } else {
          guide.innerText = '회원 정보 변경에 실패했습니다.';
        }
      });
  }
}

window.addEventListener('load', function() {
  init();
});