//setting top navigation background image
const topSection = document.getElementById("topSection");
topSection.style.backgroundImage =
  "url('https://us.123rf.com/450wm/in8finity/in8finity1407/in8finity140700139/30184193-stock-vector-steel-wire-mesh-seamless-background-illustration.jpg?ver=6')";

//data request template
const request = (url, callback) => {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(data) {
    const resData = JSON.parse(data.target.responseText);
    callback(resData);
  });
  oReq.open("GET", url);
  oReq.send();
};

const mainDisplay = document.getElementById("mainDisplay");
const postBody = document.getElementById("postBody");

//appending and creating posts
function makePost(obj) {
  let data = obj.data;
  console.log(data);
  if (data.thumbnail !== "self") {
    console.log("mediaHere");
    let postBox = document.createElement("div");
    postBox.className = "postBox";
    postBox.id = "postBox";
    postBody.appendChild(postBox);

    let titleBox = document.createElement("div");
    titleBox.className = "titleBox";
    titleBox.innerHTML = data.title;
    postBox.appendChild(titleBox);

    //creating author and date section of post

    let imageBox = document.createElement("div");
    imageBox.className = "imageBox";
    postBox.appendChild(imageBox);

    let blueFighter = document.createElement("img");
    blueFighter.className = "fighter";
    blueFighter.src = "blueFighter.png";
    imageBox.appendChild(blueFighter);

    let postImage = document.createElement("img");
    postImage.className = "postImage";
    postImage.src = data.thumbnail;
    imageBox.appendChild(postImage);

    let redFighter = document.createElement("img");
    redFighter.className = "fighter";
    redFighter.src = "redFighter.png";
    imageBox.appendChild(redFighter);

    let utc = data.created_utc;
    let date = new Date(utc * 1000);
    let dateString = date.toLocaleString();

    let authorBox = document.createElement("div");
    authorBox.className = "authorBox";
    authorBox.innerHTML = "Posted by " + data.author + " on " + dateString;
    postBox.appendChild(authorBox);
  }
}

//adding click functions for sidebar buttons
//ufc reddit request

function loadUfc() {
  while (postBody.firstChild) {
    postBody.removeChild(postBody.firstChild);
  }
  request("http://www.reddit.com/r/ufc.json", function(data) {
    let posts = data.data.children;
    posts.forEach(makePost);
  });
}

let ufc = document.getElementById("ufc");
ufc.addEventListener("click", loadUfc);

//reload Home page from mma reddit
function loadHome() {
  while (postBody.firstChild) {
    postBody.removeChild(postBody.firstChild);
  }
  request("http://www.reddit.com/r/mma.json", function(data) {
    let posts = data.data.children;
    posts.forEach(makePost);
  });
}

const home = document.getElementById("home");
home.addEventListener("click", loadHome);

request("http://www.reddit.com/r/mma.json", function(data) {
  let posts = data.data.children;
  posts.forEach(makePost);
});

//loadBellator Page

function loadBellator() {
  while (postBody.firstChild) {
    postBody.removeChild(postBody.firstChild);
  }
  request("http://www.reddit.com/r/BellatorMMA.json", function(data) {
    let posts = data.data.children;
    posts.forEach(makePost);
  });
}

const bellator = document.getElementById("bellator");
bellator.addEventListener("click", loadBellator);

//load boxing Page

function loadBoxing() {
  while (postBody.firstChild) {
    postBody.removeChild(postBody.firstChild);
  }
  request("http://www.reddit.com/r/BellatorMMA.json", function(data) {
    let posts = data.data.children;
    posts.forEach(makePost);
  });
}

const boxing = document.getElementById("boxing");
boxing.addEventListener("click", loadBoxing);
// const ufcRequest = (url, callback) => {

//   while (postBody.firstChild) {
//     postBody.removeChild(postBody.firstChild);
//   }
//   const ufcReq = new XMLHttpRequest();
//   ufcReq.addEventListener("load", function(data) {
//     const ufcData = JSON.parse(data.target.responseText);
//     callback(ufcData);
//   });
//   ufcReq.open("GET", url);
//   ufcReq.send();
// };

// const ufc = document.getElementById("ufc");
// ufc.addEventListener(
//   "click",
//   ufcRequest("http://www.reddit.com/r/ufc.json", makePost)
// );

// function ufcRequest(url, callback) {
//   while (postBody.firstChild) {
//     postBody.removeChild(postBody.firstChild);
//   }
// }

//checking for embedded media
//   if (data.media_embed.content) {
//     console.log("mediaHere");
//     let mediaBox = document.createElement("div");
//     mediaBox.className = "mediaBox";
//     postBox.appendChild(mediaBox);
//     if (data.domain === "streamable.com") {
//       console.log("BaNg");
//       let media = document.createElement("iframe");
//       media.className = "media";
//       media.height = 369;
//       media.width = 600;
//       media.scrolling = "no";
//       media.frameborder = "0";
//       media.src = data.url;
//       mediaBox.appendChild(media);
//     }
//   }

//checking for image or thumbnail
//   if (data.thumbnail !== "self") {
//     let thumbnailBox = document.createElement("div");
//     thumbnailBox.className = "thumbnailBox";
//     postBox.appendChild(thumbnailBox);

//     let thumb = document.createElement("img");
//     thumb.className = "thumb";
//     thumb.src = data.thumbnail;
//     thumbnailBox.appendChild(thumb);
//   }
