document.querySelector("#img").addEventListener("click", function(){
    window.location.href = "index.html"
})
let data =  JSON.parse(localStorage.getItem("clickedVideo"))
let videoid = data.id

    console.log(data)
const playvideo = async () =>{
    let iframe2 = document.createElement("iframe")
    iframe2.id = "frame"
    iframe2.setAttribute("allowfullscreen", true)
    iframe2.src = `https://www.youtube.com/embed/${videoid}?autoplay=1`

    const title = data.snippet.title
    const channelName = data.snippet.channelTitle;
    const description  = data.snippet.description;
    const views = data.statistics.viewCount
    const likes = data.statistics.likeCount

    const name = document.createElement("p")
     name.innerText = title;
     name.id = "videoName"
    const chName = document.createElement("p")
        chName.innerText = channelName
        chName.id="chNamevideo"
    const viewsCount = document.createElement("p")
    viewsCount.innerText = `${views} Views`  
    const likesCount = document.createElement("p")
    likesCount.innerText = `Likes:${likes}` 
    const Desc = document.createElement("p")    
    Desc.innerText = description
    let container = document.getElementById("videoPlayer")
    container.append(iframe2,name,chName,viewsCount,likesCount,Desc)
  
}

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

const recommend = async () =>{
    try{
        let data2 =  JSON.parse(localStorage.getItem("clickedVideo"))
        
        console.log(data2)
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&relatedToVideoId=${data2.id}&type=video&key=AIzaSyBGyYPfAirT_LY_1YCFUV_FyT2GxQ8ACQQ`)
        let recommendData = await res.json();
        appendrecommend(recommendData.items)
       console.log(recommendData.items)
    } catch(err){
       console.log(err)
    }
}
recommend()

const appendrecommend = async(val) =>{
    console.log(val)
    if(val===undefined){
        return false
    }
       const recomContainer = document.getElementById("recommend")
            recomContainer.innerHTML = null
        val.forEach(function({snippet,id,statistics}){
            const thumbnails = snippet.thumbnails.medium.url
            const title = snippet.title
            const chName = snippet.channelTitle
            let box = document.createElement("div")
            box.classList = "recombox"

            let name = document.createElement("p")
            name.innerText = title
            let chanlname = document.createElement("p")
            chanlname.innerText = chName

            let image = document.createElement("img")
            image.src = thumbnails;

            box.append(image,title,chName)

            recomContainer.append(box)
        });
}
