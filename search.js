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

let results  = JSON.parse(localStorage.getItem("searchResults"))
console.log(results)

let container = document.querySelector("#searchcontainer")
const appendVideos = (val) => {
   
    val.forEach(({snippet,id:{videoId},statistics}) => {
     
        const title = snippet.title

        // let videoid = id

        const thumbnails = snippet.thumbnails.medium.url

        const channelName = snippet.channelTitle;

        // const views = statistics.viewCount

        const div = document.createElement("div")
        div.id = "box"

        const img = document.createElement("img")
        img.src = thumbnails
        
        const name = document.createElement("p")
        name.innerText = title;
        
        const chName = document.createElement("p")
        chName.innerText = channelName
        chName.id="chName"

        // const totalviews = document.createElement("p")
        // totalviews.id="views"
        // totalviews.innerText = `${views} views`
        
        const data = {
          videoId,
          snippet,
          statistics
        }
        div.onclick = () =>{
          storeVideo(data)
          console.log(data)
          window.location.href="video2.html"
        }

        div.append(img,name,chName)
        container.append(div)
    })
}
appendVideos(results)

function storeVideo(data){
    localStorage.setItem("clickedVideo",JSON.stringify(data) )
  }



  //filter popup

  let popup = document.querySelector("#filter")

  document.querySelector(".filter").addEventListener("click",openpopup);
  function openpopup(){
    popup.classList.add("open_popup")
  }
  document.querySelector("#cross").addEventListener("click", closepopup);
  function closepopup(){
    popup.classList.remove("open_popup")
  }
  