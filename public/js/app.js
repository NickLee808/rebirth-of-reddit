//jshint esversion:6

var oReq = new XMLHttpRequest();
oReq.addEventListener('load', linkLoader);
oReq.open('GET', 'https://www.reddit.com/r/birdswitharms.json');
oReq.send();

function linkLoader () {
  let objParse = JSON.parse(this.responseText);
  let arrayOfPosts = objParse.data.children;
  for (let i = 0; i < arrayOfPosts.length; i++) {
    if (formatAuthenticator(arrayOfPosts[i].data.url)){
      let pic = document.createElement('img');
      let link = document.createElement('span');
      link.setAttribute('id', `link${i}`);
      pic.setAttribute('src', objParse.data.children[i].data.url.split('&amp;').join('&').split('gifv').join('gif'));
      document.getElementById('gallery').appendChild(link);
      link.appendChild(pic);
    }else{
      console.log('broken link: ' + arrayOfPosts[i].data.url);
    }
  }
}

function formatAuthenticator (url) {
  let whiteList = ['.jpg', '.jpeg', '.gif', '.png', 'reddituploads'];
  for (let i = 0; i < whiteList.length; i++){
    if (url.indexOf(whiteList[i]) > -1){
      return true;
    }
  }
  return false;
}

function linkGenerator (){

}