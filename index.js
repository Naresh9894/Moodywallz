const accesskey="zyL_VvfGmPdtypP4kORUus5lq5yv11QjNf6Aha1p3KI"


const formEl =document.querySelector("form")
const searchInputEl = document.getElementById("search-input")
const searchResultsEl= document.querySelector(".search-results")
const showMoreButtonEl = document.getElementById("show-more-button")

let inputdata = "";
let page=1;
async function searchImages(){
    inputdata =searchInputEl.value;
    const url= `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`;
    
    const response= await fetch(url);
    const data = await response.json();
    if(page===1){
        searchResultsEl.innerHTML = "";
    }
    const results=data.results;


    results.map((res)=>{
    const imageWrapper= document.createElement("div");
    imageWrapper.classList.add("search-res");
    const image= document.createElement("img");
    image.src = res.urls.small
    image.alt=res.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href= res.links.html
    imageLink.target="_blank";
    imageLink.textContent = res.alt_description;
    


    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
});
page++;

    if(page>1 && page<50){
        showMoreButtonEl.style.display = "block";
    }
}
formEl.addEventListener("submit", (event) => 
{
    event.preventDefault();
    page=1;
    searchImages();
});
showMoreButtonEl.addEventListener("click",()=>{
    searchImages();
})