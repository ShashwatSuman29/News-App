//api key from newsAPI
const apiKey = "a7fab18e28b04043bcfd32a1403ca202";

const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById("search-input");

const searchButton = document.getElementById("search-btn");

// fetching news articles through api key
async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apikey=${apiKey}`;
    const response = await fetch(apiUrl);

    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}

// when user clicks anything on search box then it will show articles related to that.
searchButton.addEventListener("click",  async ()=>{
    const query = searchField.value.trim()
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        }catch(error){
            console.log('Error fetching news by query', error)
        }
    }

})

 async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`;
        const response = await fetch(apiUrl);
    
        const data = await response.json();
        return data.articles;
      } catch (error) {
        console.error("Error fetching random news", error);
        return [];
      }
}


// creating html cards using js

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((articles) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    const img = document.createElement("img");
    img.src = articles.urlToImage;
    img.alt = articles.title;

    const title = document.createElement("h2");
    const updatedTitle =
      articles.title.length > 30
        ? articles.title.slice(0, 30) + "...."
        : articles.title;
    title.textContent = updatedTitle;

    const description = document.createElement("p");
    const updatedDes = articles.description
      ? articles.description.length > 120
        ? articles.description.slice(0, 120) + "..."
        : articles.description
      : "No description available";
    description.textContent = updatedDes;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);

    // when user clicks on any card, then it will open the news article in new window.
    blogCard.addEventListener("click", ()=>{
        window.open(articles.url, "_blank");
    });
    blogContainer.appendChild(blogCard);
  });
}

// it display some pre loaded news when user visit the website.
(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();
