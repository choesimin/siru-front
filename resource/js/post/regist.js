var category = '';

function init() {
  var poem = document.getElementById('poem_mode');
  var story = document.getElementById('story_mode');

  poem.addEventListener('mousedown', function() {
    poem.style.backgroundColor = '#fbbd0d40';
    story.style.backgroundColor = 'transparent';
    category = 'poem';
  });

  story.addEventListener('mousedown', function() {
    poem.style.backgroundColor = 'transparent';
    story.style.backgroundColor = '#fbbd0d40';
    category = 'story';
  });

  hideWriteButton();
}

function register() {
  var title = document.getElementById('title');
  var content = document.getElementById('content');
  var registButton = document.getElementById('regist_button');

  if (title.value == '') {
    title.focus();
  } else if (content.value == '') {
    content.focus();
  } else if (category != 'poem' && category != 'story') {
    registButton.innerText = '선택하세요.';
  } else {
    fetchPost(url.post, {memberId: sessionStorage.getItem('id'), category: category, title: title.value, content: content.value})
      .then(response => {
        if (response.ok) {
          localStorage.setItem('category', category);
          location.href = '../post/list.html';
        } else {
          registButton.innerText = '게시에 실패했습니다.';
        }
      });
  }
}

window.addEventListener('load', function() {
  init();
});