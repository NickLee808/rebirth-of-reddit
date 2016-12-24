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
  oReq.addEventListener('load', linkGenerator);
  oReq.open('GET', `https://www.reddit.com/r/${subreddit}.json`);
  oReq.send();

}

function linkGenerator () {
  let objParse = JSON.parse(this.responseText);
  let arrayOfPosts = objParse.data.children;
  for (let i = 0; i < arrayOfPosts.length; i++) {
    let title = arrayOfPosts[i].data.title;
    let author = arrayOfPosts[i].data.author;
    let comments = arrayOfPosts[i].data.num_comments;
    let upvotes = arrayOfPosts[i].data.score;
    let url = arrayOfPosts[i].data.url;
    let permalink = arrayOfPosts[i].data.permalink;
    let nsfw = arrayOfPosts[i].data.over_18;
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
        //titleGenerator(link, url, title);
        //subtitleGenerator (link, author, comments, upvotes);
      }else{
        if (nsfw === false) {
          let picLink = document.createElement('a');
          picLink.setAttribute('href', objParse.data.children[i].data.url);
          let pic = document.createElement('img');
          pic.setAttribute('src', objParse.data.children[i].data.url.split('&amp;').join('&').split('gifv').join('gif'));
          picLink.innerHTML = `${pic.outerHTML}`;
          link.appendChild(picLink);
          titleGenerator(link, url, title);
          subtitleGenerator (link, author, comments, permalink, upvotes);
        }else{
          let picLink = document.createElement('a');
          picLink.setAttribute('href', 'http://i107.photobucket.com/albums/m282/strumminblues/censored-2.jpg');
          let pic = document.createElement('img');
          pic.setAttribute('src', 'http://i107.photobucket.com/albums/m282/strumminblues/censored-2.jpg');
          console.log('pic: ' + pic);
          picLink.innerHTML = pic;
          console.log ('picLink: ' + picLink);
          link.appendChild(pic);
        }    
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
  titleP.setAttribute('id', 'linkTitle');

  let titleLink = document.createElement('a');
  titleLink.setAttribute('href', `${url}`);
  titleLink.innerHTML = title;
  titleP.appendChild(titleLink);
  link.appendChild(titleP);
}

function subtitleGenerator (link, author, comments, permalink, upvotes) {
  let subtitle = document.createElement('p');
  subtitle.setAttribute('id', 'linkSubtitle');
  
  let authorURL = 'https://www.reddit.com/user/' + `${author}`;
  let authorHTML = document.createElement('a');
  authorHTML.setAttribute('href', `${authorURL}`);
  authorHTML.innerHTML = `${author}`;
  subtitle.appendChild(authorHTML);

  let permalinkURL = 'https://www.reddit.com' + `${permalink}`;
  let permalinkHTML = document.createElement('a');
  permalinkHTML.setAttribute('href', `${permalinkURL}`);
  permalinkHTML.innerHTML = 'comments';
  subtitle.appendChild(permalinkHTML);

  subtitle.innerHTML = `by ${authorHTML.outerHTML} &nbsp; • &nbsp; ${upvotes} upvotes &nbsp; • &nbsp; ${comments}` + ` ${permalinkHTML.outerHTML}`;
  link.appendChild(subtitle);
}

// ENDLESS SCROLL URL CHEAT CODE:
// https://www.reddit.com/r/gifs/?after=t3_[DATA.ID]
