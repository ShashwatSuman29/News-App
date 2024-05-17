const apiKey = "a7fab18e28b04043bcfd32a1403ca202";

const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`;
    const response = await fetch(apiUrl);

    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}

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
      ? (articles.description.length > 120
          ? articles.description.slice(0, 120) + "..."
          : articles.description)
      : "No description available";
    description.textContent = updatedDes;
    

    blogCard.appendChild(img);
    
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();
