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

//appending and creating posts
function makePost(obj) {
  let data = obj.data;
  console.log(data);
  let postBox = document.createElement("div");
  postBox.className = "postBox";
  mainDisplay.appendChild(postBox);

  let titleBox = document.createElement("div");
  titleBox.className = "titleBox";
  titleBox.innerHTML = data.title;
  postBox.appendChild(titleBox);

  //creating author and date section of post

  let utc = data.created_utc;
  let date = new Date(utc * 1000);
  let dateString = date.toLocaleString();

  let authorBox = document.createElement("div");
  authorBox.className = "authorBox";
  authorBox.innerHTML = "Posted by" + data.author + " on " + dateString;
  postBox.appendChild(authorBox);

  //   let postContent = document.createElement("div");
  //   postContent.clasName = postContent;
  //   postContent.innerHTML = data.selftext;
  //   postBox.appendChild(postContent);

  //   let postImg = document.createElement("img");
  //   postImg.className = "postMedia";
  //   postImg.src = data.url;
  //   postBox.appendChild(postImg);
  let dataUrl = data.url;
  function checkIfImage(dataUrl) {
    console.log(dataUrl.match());
  }
}

request("http://www.reddit.com/r/mma.json", function(data) {
  let posts = data.data.children;
  posts.forEach(makePost);
});
