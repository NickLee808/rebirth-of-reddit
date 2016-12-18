//jshint esversion:6

function reqListener () {
  let objParse = JSON.parse(this.responseText);
  for (let i = 0; i<objParse.data.children.length; i++) {
    let pic = document.createElement('img');
    let link = document.createElement('span');
    link.setAttribute('id', `link${i}`);
    pic.setAttribute('src', objParse.data.children[i].data.url);
    document.getElementById('gallery').appendChild(link);
    document.getElementById(`link${i}`).appendChild(pic);
  }
}

var oReq = new XMLHttpRequest();
oReq.addEventListener('load', reqListener);
oReq.open('GET', 'https://www.reddit.com/r/birdswitharms.json');
oReq.send();