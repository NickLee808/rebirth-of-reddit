//jshint esversion:6

var subName = document.getElementById('userInput');
document.getElementById('submit').addEventListener('click', subLoader);

function subLoader () {
  document.getElementById('gallery').innerHTML = '';

  let subreddit = subName.value;
  if (subreddit === 'random'){
    alert('Fuck you, I don\'t know how to do that shit yet');
  }

  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', linkLoader);
  oReq.open('GET', `https://www.reddit.com/r/${subreddit}.json`);
  oReq.send();

}

function linkLoader () {
  let objParse = JSON.parse(this.responseText);
  let arrayOfPosts = objParse.data.children;
  for (let i = 0; i < arrayOfPosts.length; i++) {
    let title = arrayOfPosts[i].data.title;
    let author = arrayOfPosts[i].data.author;
    let comments = arrayOfPosts[i].data.num_comments;
    let upvotes = arrayOfPosts[i].data.score;
    let url = arrayOfPosts[i].data.url;
    if (formatAuthenticator(url)) {
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
        titleGenerator(link, url, title);
        subtitleGenerator (link, author, comments, upvotes);
      }else{
        let pic = document.createElement('img');
        pic.setAttribute('src', objParse.data.children[i].data.url.split('&amp;').join('&').split('gifv').join('gif'));
        link.appendChild(pic);
        titleGenerator(link, url, title);
        subtitleGenerator (link, author, comments, upvotes);
      }
    }else{
      console.log('unloadable link: ' + arrayOfPosts[i].data.url);
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

function titleGenerator (link, url, title) {
  let titleP = document.createElement('p');
  titleP.setAttribute('id', 'title');

  let titleLink = document.createElement('a');
  titleLink.setAttribute('href', `${url}`);
  titleLink.innerHTML = title;
  titleP.appendChild(titleLink);

  return link.appendChild(titleP);
}

function subtitleGenerator (link, author, comments, upvotes) {
  let subtitle = document.createElement('p');
  subtitle.setAttribute('id', 'subtitle');
  subtitle.innerHTML= 'by ';
  
  let authorURL = 'https://www.reddit.com/user/' + `${author}`;
  let authorLink = document.createElement('a');
  authorLink.setAttribute('href', `${authorURL}`);
  authorLink.innerHTML = `${author}`;
  subtitle.appendChild(authorLink);
  subtitle.appendChild(document.createElement('p'));

/*subtitleP.innerHTML = 'by ' + authorLink + ' • ' + `${comments}` + ' comments' + ' • ' + `${upvotes}` + ' upvotes';
*/  return link.appendChild(subtitle);
}