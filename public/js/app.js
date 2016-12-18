//jshint esversion:6

function reqListener () {
  let objParse = JSON.parse(this.responseText);
  for (let i = 0; i<objParse.data.children.length; i++) {
    console.log(objParse.data.children[i].data.url);
    var element = document.createElement('img');
    element.setAttribute('src', objParse.data.children[i].data.url);
    document.getElementById('pics').appendChild(element);
  }
}

var oReq = new XMLHttpRequest();
oReq.addEventListener('load', reqListener);
oReq.open('GET', 'https://www.reddit.com/r/birdswitharms.json');
oReq.send();