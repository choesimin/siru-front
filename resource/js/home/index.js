function init() {
  if (tokenIsExist()) {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('start').style.display = 'none';
  }

  setBanner();
  setBest();
}



function detail(postId) {
  localStorage.setItem('postId', postId);
  location.href = '../../../post/detail.html';
}


function getCount(category) {
  return fetchGet(url.post + '/category/' + category + '/count')
    .then(response => response.json());
}

function getTopPosts(category, size) {
  return fetchGet(url.post + '/category/' + category + '/top/' + size)
    .then(response => response.json());
}

function setBanner() {
  getTopPosts('poem', 1)
    .then(data => {
      var banner = document.getElementById('banner');
      banner.getElementsByTagName('h2')[0].innerText = data[0].title;
      banner.getElementsByTagName('p')[0].innerText = data[0].writer.name;
      banner.getElementsByTagName('pre')[0].innerText = data[0].content;
    });
}

function setBest() {

  function addPost(wrapper, list) {
    for (var i = 0; i < list.length; i++) {
      var post = document.createElement('a');
      post.className = 'post';
      post.href = 'javascript:detail(' + list[i].id + ')';

      var title = document.createElement('span');
      title.className = 'title';
      title.innerText = list[i].title;
      post.appendChild(title);

      var writer = document.createElement('span');
      writer.className = 'writer';
      writer.innerText = list[i].writer.name;
      post.appendChild(writer);

      wrapper.appendChild(post);
    }
  }

  getCount('poem')
    .then(data => {
      document.getElementById('poem_count').innerText = data;
    });

  getCount('story')
    .then(data => {
      document.getElementById('story_count').innerText = data;
    });


  getTopPosts('poem', 10)
    .then(data => {
      addPost(document.getElementById('best_poem'), data);
    });

  getTopPosts('story', 10)
    .then(data => {
        addPost(document.getElementById('best_story'), data);
    });
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
    guide.innerText = '필명을 입력해주세요.';
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
          throw Error();
        } else {
          return response.json();
        }
      })
      .then(data => {
        if (data.code === 'DUPLICATED_EMAIL') {
          guide.innerText = '중복된 이메일입니다.';
        } else if (data.code === 'DUPLICATED_NAME') {
          guide.innerText = '중복된 필명입니다.';
        } else {
          guide.innerText = '가입에 실패했습니다.'
        }
      })
      .catch(error => {});
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