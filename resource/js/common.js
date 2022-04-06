function addCommonElements() {
  var siru = document.createElement('h1');
  siru.setAttribute('id', 'siru');
  siru.innerHTML = '시루';
  document.body.prepend(siru);

  var write_button = document.createElement('a');
  write_button.setAttribute('id', 'write_button');
  if (true) {
    write_button.setAttribute('href', '../post/regist.html');
  } else {
    write_button.setAttribute('href', '/#start');
  }
  write_button.innerHTML = '글쓰기';
  document.body.prepend(write_button);

  var nav = document.createElement('div');
  nav.setAttribute('id', 'nav');
  document.body.prepend(nav);

  var nav_home = document.createElement('a');
  nav_home.setAttribute('href', '/');
  nav.appendChild(nav_home);

  var nav_home_img = document.createElement('img');
  nav_home_img.setAttribute('id', 'logo');
  nav_home_img.setAttribute('src', '../resource/image/logo/yellow.png');
  nav_home.appendChild(nav_home_img);

  var nav_right = document.createElement('div');
  nav_right.setAttribute('id', 'nav_right');
  nav.appendChild(nav_right);

  var nav_right_log_in_out = document.createElement('a');
  if (true) {
    nav_right_log_in_out.innerHTML = '시작';
  } else {
    nav_right_log_in_out.innerHTML = '나가기';
    nav_right_log_in_out.setAttribute('onclick', 'logout()');
  }
  nav_right_log_in_out.setAttribute('href', '/#start');
  nav_right.appendChild(nav_right_log_in_out);

  var nav_right_story = document.createElement('a');
  nav_right_story.setAttribute('href', '../post/list.html');
  nav_right_story.innerHTML = '이야기';
  nav_right.appendChild(nav_right_story);

  var nav_right_poem = document.createElement('a');
  nav_right_poem.setAttribute('href', '../post/list.html');
  nav_right_poem.innerHTML = '작품';
  nav_right.appendChild(nav_right_poem);
}


function logout() {
  console.log('logout');
  localStorage.removeItem('token');
  localStorage.removeItem('memberId');
}


function noSpace(obj) {
  obj.value = obj.value.replace(' ','');
}

function noSpecialSymbol(obj) {
  obj.value = obj.value.replace(/[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi, '');
}

function onlyAlphabet(obj) {
  obj.value = obj.value.replace(/[^\\!-z]/gi, '');
}

function onlyHangul(obj) {
  obj.value = obj.value.replace(/[a-z]/g, '');
};

window.onload = function() {
  addCommonElements();

  var noSpaceClasses = document.getElementsByClassName("no_space");
  for (let j = 0; j < noSpaceClasses.length; j++) {
    noSpaceClasses[j].addEventListener("keyup", function() {
      for (let i = 0; i < 20; i++) {
        noSpace(this);
      }
    });
    noSpaceClasses[j].addEventListener("paste", function() {
      for (let i = 0; i < 20; i++) {
        noSpace(this);
      }
    });
  }

  var noSpecialClasses = document.getElementsByClassName("no_special");
  for (let j = 0; j < noSpecialClasses.length; j++) {
    noSpecialClasses[j].addEventListener("keyup", function() {
      for (let i = 0; i < 20; i++) {
        noSpecialSymbol(this);
      }
    });
    noSpecialClasses[j].addEventListener("paste", function() {
      for (let i = 0; i < 20; i++) {
        noSpecialSymbol(this);
      }
    });
  }

  var onlyAlphabetClasses = document.getElementsByClassName("only_alphabet");
  for (let j = 0; j < onlyAlphabetClasses.length; j++) {
    onlyAlphabetClasses[j].addEventListener("keyup", function() {
      for (let i = 0; i < 20; i++) {
        onlyAlphabet(this);
      }
    });
    onlyAlphabetClasses[j].addEventListener("paste", function() {
      for (let i = 0; i < 20; i++) {
        onlyAlphabet(this);
      }
    });
  }

  var onlyHangulClasses = document.getElementsByClassName("only_hangul");
  for (let j = 0; j < onlyHangulClasses.length; j++) {
    onlyHangulClasses[j].addEventListener("keyup", function() {
      for (let i = 0; i < 20; i++) {
        onlyHangul(this);
      }
    });
    onlyHangulClasses[j].addEventListener("paste", function() {
      for (let i = 0; i < 20; i++) {
        onlyHangul(this);
      }
    });
  }
};
