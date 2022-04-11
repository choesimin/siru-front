function getPosts() {
  var category = localStorage.getItem('category');

  fetchGet(url.post + '/category/' + category)
    .then(response => response.json())
    .then(data => {
      var board = document.getElementById('board');
      var post, title, writer;
      for (var i = 0; i < data.length; i++) {
        post = document.createElement('a');
        post.setAttribute('class', 'post');
        post.setAttribute('onclick', 'detail(' + data[i].id + ')');

        title = document.createElement('h3');
        title.textContent = data[i].title;
        post.appendChild(title);

        writer = document.createElement('p');
        writer.textContent = data[i].writer.name;
        post.appendChild(writer);

        board.append(post);
      }
    });
}

function detail(postId) {
  localStorage.setItem('postId', postId);
  location.href = './detail.html';
}

function setBoardTitle() {
  var category = localStorage.getItem('category');
  var boardTitle = document.getElementById('board_title');

  if (category === 'poem') {
    boardTitle.innerText = '작품';
  } else if (category === 'story') {
    boardTitle.innerText = '이야기';
  }
}

window.addEventListener('load', function() {
  getPosts();
  setBoardTitle();
});
