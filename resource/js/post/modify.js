var postId = localStorage.getItem('postId');

function init() {
  fetchGet(url.post + '/' + postId)
    .then(response => response.json())
    .then(data => {
      var title = document.getElementById('title');
      title.value = data.title;

      var content = document.getElementById('content');
      content.innerText = data.content;
    });

  hideWriteButton();
}

function modify() {
  var title = document.getElementById('title').value;
  var content = document.getElementById('content').value;

  fetchPut(url.post, {id: postId, title: title, content: content})
    .then(response => {
      if (response.ok) {
        localStorage.setItem('postId', postId);
        location.href = './detail.html';
      } else {
        alert('수정에 실패했습니다.');
      }
    });
}

window.addEventListener('load', function() {
  init();
});