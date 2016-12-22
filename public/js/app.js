//jshint esversion:6

var oReq = new XMLHttpRequest();
oReq.addEventListener('load', linkLoader);
oReq.open('GET', 'https://www.reddit.com/r/birdswitharms.json');
oReq.send();

function linkLoader () {
  let objParse = JSON.parse(this.responseText);
  let arrayOfPosts = objParse.data.children;
  for (let i = 0; i < arrayOfPosts.length; i++) {
    if (formatAuthenticator(arrayOfPosts[i].data.url)) {
      let link = document.createElement('span');
      link.setAttribute('id', `link${i}`);
      document.getElementById('gallery').appendChild(link);
      if (arrayOfPosts[i].data.url.indexOf('youtu') > -1){
        let vid = document.createElement('iframe');
        vid.setAttribute('src', youTuber(arrayOfPosts[i].data.url));
        vid.setAttribute('frameborder', 0);
        vid.setAttribute('width', '100%');
        vid.setAttribute('height', '100%');
        link.appendChild(vid);
      }else{
        let pic = document.createElement('img');
        pic.setAttribute('src', objParse.data.children[i].data.url.split('&amp;').join('&').split('gifv').join('gif'));
        link.appendChild(pic);
      }
    }else{
      console.log('broken link: ' + arrayOfPosts[i].data.url);
    }
  }
}

function youTuber (url) {
  if (url.indexOf('youtube.com/watch?v=') > -1){
    return 'http://youtube.com/embed/' + url.split('youtube.com/watch?v=')[1] + '?rel=0';
  }else if(url.indexOf('youtu.be') > -1){
    return 'http://youtube.com/embed/' + url.split('youtu.be/')[1] + '?rel=0';
  }
}

function formatAuthenticator (url) {
  let whiteList = ['.jpg', '.jpeg', '.gif', '.png', 'reddituploads', 'youtu'];
  for (let i = 0; i < whiteList.length; i++){
    if (url.indexOf(whiteList[i]) > -1){
      return true;
    }
  }
  return false;
}

function linkGenerator (){

}