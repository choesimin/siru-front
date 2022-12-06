function getPosts() {
  var category = localStorage.getItem('category');

  fetchGet(url.post + '/category/' + category)
    .then(response => response.json())
    .then(data => {
      var grid = document.getElementById('grid');
      var item, content, title, writer;
      for (var i = 0; i < data.length; i++) {
        item = document.createElement('div');
        item.className = 'item';

        content = document.createElement('div');
        content.className = 'content';
        content.setAttribute('onclick', 'detail(' + data[i].id + ')');

        title = document.createElement('h3');
        title.textContent = data[i].title;
        content.append(title);

        writer = document.createElement('p');
        writer.textContent = data[i].writer.name;
        content.append(writer);

        item.append(content);
        grid.append(item);
      }

      resizeAllGridItems();
    });
}

function detail(postId) {
  localStorage.setItem('postId', postId);
  location.href = './detail.html';
}

function setBoardTitle() {
  var category = localStorage.getItem('category');
  var boardTitle = document.getElementById('title');

  if (category === 'poem') {
    boardTitle.innerText = '작품';
  } else if (category === 'story') {
    boardTitle.innerText = '이야기';
  }
}


function resizeGridItem(item){
  var grid = document.getElementById('grid');
  var rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  var rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
  var rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));

  item.style.gridRowEnd = 'span ' + rowSpan;
}

function resizeAllGridItems(){
  allItems = document.getElementsByClassName('item');
  for (x = 0; x < allItems.length; x++) {
    resizeGridItem(allItems[x]);
  }
}

function resizeInstance(instance){
  item = instance.elements[0];
  resizeGridItem(item);
}


window.addEventListener('load', function() {
  getPosts();
  setBoardTitle();

  window.addEventListener('resize', resizeAllGridItems);
});
