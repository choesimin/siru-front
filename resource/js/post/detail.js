var memberId = sessionStorage.getItem('id');
var postId = localStorage.getItem('postId');

function init() {
  fetchGet(url.post + '/' + postId)
    .then(response => response.json())
    .then(data => {
      var post = document.getElementById('post');

      var title = document.createElement('h2');
      title.innerText = data.title;
      post.appendChild(title);

      var date = document.createElement('p');
      date.setAttribute('id', 'date');
      date.innerText = getKoreanDate(data.registDt);
      post.appendChild(date);

      var writer = document.createElement('p');
      writer.setAttribute('id', 'writer');
      writer.innerText = data.writer.name;
      post.appendChild(writer);

      var clearFix = document.createElement('div');
      clearFix.setAttribute('class', 'clear_fix');
      post.appendChild(clearFix);

      var content = document.createElement('pre');
      content.setAttribute('id', 'content');
      content.innerText = data.content;
      post.appendChild(content);

      if (data.writer.id == memberId) {
        var deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', 'delete_button');
        deleteButton.innerText = '삭제';
        deleteButton.setAttribute('onclick', 'deletePost()');
        post.appendChild(deleteButton);

        var modifyButton = document.createElement('button');
        modifyButton.setAttribute('id', 'modify_button');
        modifyButton.innerText = '수정';
        modifyButton.setAttribute('onclick', 'goToModify()');
        post.appendChild(modifyButton);
      }

      var empathyButton = document.createElement('button');
      empathyButton.setAttribute('id', 'empathy_button');
      empathyButton.innerText = '공감 ';
      empathyButton.setAttribute('onclick', 'toggleEmpathy()');
      post.appendChild(empathyButton);
      setEmpathyButtonColor();

      var empathyCount = document.createElement('span');
      empathyCount.setAttribute('id', 'empathy_count');
      empathyButton.appendChild(empathyCount);
      getAndSetEmpathyCount();

      if (data.category === 'poem') {
        document.getElementById('comment_area').style.display = 'none';
      } else {
        renderComments();
      }
    });

  if (isLoginMember()) {
    document.getElementById('comment_regist').style.display = 'block';
  }

}



function goToModify() {
  localStorage.setItem('postId', postId);
  location.href = './modify.html';
}




function toggleEmpathy() {
  var empathyCount = parseInt(document.getElementById('empathy_count').innerText);

  if (isLoginMember()) {
    getMemberEmpathyCount()
      .then(response => response.json())
      .then(data => {
        if (data > 0) {
          fetchDelete(url.empathy, {postId: postId, memberId: memberId})
            .then(response => {
              if (response.ok) {
                setEmpathyButtonColorNormal();
                setEmpathyCount(empathyCount - 1);
              } else {
                alert('공감 취소에 실패했습니다.');
              }
            });
        } else {
          fetchPost(url.empathy, {postId: postId, memberId: memberId})
            .then(response => {
              if (response.ok) {
                setEmpathyButtonColorHighlight();
                setEmpathyCount(empathyCount + 1);
              } else {
                alert('공감 등록에 실패했습니다.');
              }
            });
        }
      });
  }
}

function getAndSetEmpathyCount() {
  getEmpathyCount()
    .then(response => response.json())
    .then(data => {
      setEmpathyCount(data);
    });
}

function setEmpathyCount(count) {
  document.getElementById('empathy_count').innerText = count;
}

function setEmpathyButtonColor() {
  if (isLoginMember()) {
    getMemberEmpathyCount()
      .then(response => response.json())
      .then(data => {
        if (data > 0) {
          setEmpathyButtonColorHighlight();
        } else {
          setEmpathyButtonColorNormal();
        }
      });
  }
}

function setEmpathyButtonColorNormal() {
  var empathyButton = document.getElementById('empathy_button');
  empathyButton.style.color = '#faf5e6';
  empathyButton.style.border = '1px solid #faf5e64d';
}

function setEmpathyButtonColorHighlight() {
  var empathyButton = document.getElementById('empathy_button');
  empathyButton.style.color = '#fbbd0d';
  empathyButton.style.border = '1px solid #fbbd0d';
}

function getEmpathyCount() {
  return fetchGet(url.post + '/' + postId + '/empathy/count');
}

function getMemberEmpathyCount() {
  return fetchGet(url.post + '/' + postId + '/empathy/' + memberId + '/count');
}




function showCommentRegistButton() {
  document.getElementById('comment_regist_button').style.display = 'block';
}


function isLoginMember() {
  return memberId != undefined;
}


function deletePost() {
  if (confirm('글을 지우시겠습니까?')) {
    fetchDelete(url.post, {id: postId})
      .then(response => {
        if (response.ok) {
          location.href = './list.html';
        } else {
          alert('삭제에 실패했습니다.');
        }
      });
  }
}




function registComment() {
  var content = document.getElementById('comment_regist_area');
  if (content.value != '') {
    fetchPost(url.comment, {postId: postId, memberId: memberId, content: content.value})
      .then(response => {
        if (response.ok) {
          content.value = '';
          renderComments()
        } else {
          alert('댓글 등록에 실패했습니다.');
        }
      });
    content.placeholder = '댓글 남기기.';
  } else {
    content.placeholder = '내용을 입력해주세요.';
    content.focus();
  }
}

function renderComments() {
  var commentList = document.getElementById('comment_list');
  commentList.innerHTML = '';

  fetchGet(url.post + '/' + postId + '/comment')
    .then((response) => response.json())
    .then((data) => {
      var clearFix
      var deleteButton;
      var modifyButton;
      var writer;

      var registDt;

      var contentWrapper;
      var content;

      for(i = 0; i < data.length; i++) {
        comment = document.createElement('div');
        comment.className = 'comment';

        clearFix = document.createElement('div');
        clearFix.className = 'clear_fix';
        clearFix.style.width = '100%';
        comment.appendChild(clearFix);

        if (memberId == data[i].writer.id) {
          deleteButton = document.createElement('button');
          deleteButton.className = 'comment_delete_button';
          deleteButton.setAttribute('onclick', 'deleteComment(' + data[i].id + ')');
          deleteButton.innerText = '×';
          clearFix.appendChild(deleteButton);

          modifyButton = document.createElement('button');
          modifyButton.className = 'comment_modify_button';
          modifyButton.setAttribute('onclick', 'showCommentModifingArea(this)');
          modifyButton.innerText = '±';
          clearFix.appendChild(modifyButton);
        }

        writer = document.createElement('h3');
        writer.innerText = data[i].writer.name;
        clearFix.appendChild(writer);

        registDt = document.createElement('p');
        registDt.className = 'comment_date';
        registDt.innerText = getKoreanDate(data[i].registDt);
        comment.appendChild(registDt);

        contentWrapper = document.createElement('div');
        contentWrapper.className = 'comment_content_wrapper';
        contentWrapper.value = data[i].id;
        comment.appendChild(contentWrapper);

        content = document.createElement('pre');
        content.className = 'comment_content';
        content.innerText = data[i].content;
        contentWrapper.appendChild(content);

        commentList.appendChild(comment);
      }
    });
}

function showCommentModifingArea(obj) {
	var content = obj.parentNode.parentNode.getElementsByClassName('comment_content_wrapper')[0];

  var wrapper = document.createElement('div');
  wrapper.className = 'comment_modifing';

  var textarea = document.createElement('textarea');
  textarea.className = 'comment_modifing_area';
  textarea.innerText = content.getElementsByClassName('comment_content')[0].innerText;
  wrapper.appendChild(textarea);

  var modifyButton = document.createElement('button');
  modifyButton.className = 'comment_modifing_button';
  modifyButton.innerText = '수정';

  modifyButton.addEventListener('click', function() {
    fetchPut(url.comment, {
        id: content.value,
        content: content.getElementsByClassName('comment_modifing_area')[0].value
      })
      .then((response) => {
        if (response.ok) {
          renderComments();
        } else {
          alert('댓글 수정에 실패했습니다.');
        }
      });
  });
  wrapper.appendChild(modifyButton);

  var cancelButton = document.createElement('button');
  cancelButton.className = 'comment_modifing_cancel_button';
  cancelButton.innerText = '취소';
  cancelButton.setAttribute('onclick', 'renderComments()');
  wrapper.appendChild(cancelButton);

  while (content.hasChildNodes()) content.removeChild(content.firstChild);
  content.appendChild(wrapper);

  textarea.focus();
  textarea.setSelectionRange(textarea.value.length, textarea.value.length);
}

function deleteComment(id) {
  if (confirm('댓글을 지우시겠습니까?')) {
    fetchDelete(url.comment, {'id': id})
      .then(response => {
        if (response.ok) {
          renderComments();
        } else {
          alert('댓글 삭제에 실패했습니다.');
        }
      });
  }
}

window.addEventListener('load', function() {
  init();
});
