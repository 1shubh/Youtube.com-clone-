document.querySelector("#img").addEventListener("click", function(){
    window.location.href = "index.html"
})


const searchVideos = async() =>{
    try{
        const query = document.querySelector("#query").value
        let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=AIzaSyBGyYPfAirT_LY_1YCFUV_FyT2GxQ8ACQQ`
        const res = await fetch(url)
        const data = await res.json();
        const actual_data = data.items;
        localStorage.setItem("searchResults",JSON.stringify(actual_data))
        window.location.href = "search.html"
        console.log(actual_data)
    } catch (error){
        console.log(error)
    }
};

let container = document.querySelector(".container")
const appendVideos = (val) => {
    container.innerHTML = null
    val.forEach(({snippet,id,statistics}) => {
     
        const title = snippet.title

        // let videoid = id

        const thumbnails = snippet.thumbnails.medium.url

        const channelName = snippet.channelTitle;

        const views = statistics.viewCount

        const div = document.createElement("div")
        div.id = "box"

        const img = document.createElement("img")
        img.src = thumbnails
        
        const name = document.createElement("p")
        name.innerText = title;
        
        const chName = document.createElement("p")
        chName.innerText = channelName
        chName.id="chName"

        const totalviews = document.createElement("p")
        totalviews.id="views"
        totalviews.innerText = `${views} views`
        
        const data = {
          id,
          snippet,
          statistics
        }
        div.onclick = () =>{
          storeVideo(data)
          console.log(data)
          window.location.href="video.html"
        }

        div.append(img,name,chName,totalviews)
        container.append(div)
    })
}
const homepageVideos = async() => {
  try{
    const url = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&key=AIzaSyBGyYPfAirT_LY_1YCFUV_FyT2GxQ8ACQQ"
    const homeres = await fetch(url)
    const Homedata = await homeres.json()
    console.log(Homedata.items)
    appendVideos(Homedata.items)
  } catch (err){
    console.log(err)
  }
}
homepageVideos()


function storeVideo(data){
  localStorage.setItem("clickedVideo",JSON.stringify(data) )
}

const user = async() =>{
  window.location.href = "login.html"
}

