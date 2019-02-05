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
    postBody.appendChild(postBox);

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
    authorBox.innerHTML = "Posted by " + data.author + " on " + dateString;
    postBox.appendChild(authorBox);

    let imageBox = document.createElement("div");
    imageBox.className = "imageBox";
    postBox.appendChild(imageBox);

    let postImage = document.createElement("img");
    postImage.className = "postImage";
    postImage.src = data.thumbnail;
    imageBox.appendChild(postImage);
  }

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
}

request("http://www.reddit.com/r/mma.json", function(data) {
  let posts = data.data.children;
  posts.forEach(makePost);
});
