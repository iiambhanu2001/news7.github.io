const API_KEY="fb9e7efac8d04e38947ba14bf1132591";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query){
     const res =await fetch(`${url}${query}&apiKey=${API_KEY}`);
     const data=await res.json();
     bindData(data.articles);

    }

    function bindData(articles){
    const cardsContainer=document.getElementById('cards-container')
    const newsCardTemplate=document.getElementById('template-news-card');

  
       cardsContainer.innerHTML = "";

       articles.forEach((article ) => {
         if(!article.urlToImage)return;

         const cardClone=newsCardTemplate.content.cloneNode(true);
         fillDataInCard(cardClone,article);
         cardsContainer.appendChild(cardClone);     
       });
   
    }
    function fillDataInCard(cardClone,article){
      
        const newsImg=cardClone.querySelector("#news-img");
        const newsTitle=cardClone.querySelector("#news-title");
        const newsSource=cardClone.querySelector("#news-source");
        const newsDesc=cardClone.querySelector("#news-desc");

        
        newsImg.src = article.urlToImage;
        newsTitle.innerHTML = article.title;
        newsDesc.innerHTML = article.description;

        const date=new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone:"Asia/Jakarta",
        });
        newsSource.innerHTML = `${article.source.name} · ${date}`;


        cardClone.firstElementChild.addEventListener('click',()=>{
            window.open(article.url,"_blank")
        })
    }
    let curse=null;
    function onNavItemClick(id){
        fetchNews(id);
        const navitem=document.querySelector("#id");
        curse?.classList.remove('active');
        curse=navitem;
        curse.classList.add('active');
    }
    const searchbtn=document.getElementById('search-button');
    const searchtext=document.getElementById('news-input');
    
    searchbtn.addEventListener('click',()=>{
        const query=searchtext.value;
        if(!query)return;
        fetchNews(query);
        curse?.classList.remove('active');
        curse=null;

    })



