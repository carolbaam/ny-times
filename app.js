const form=document.getElementById('search-form');
const searchField=document.getElementById('search-key-word');
const responseContainer=document.getElementById('response-container');

form.addEventListener('submit', function(e){
    e.preventDefault();
    responseContainer.innerHTML="";
    searchedForText=searchField.value;
    getNews();
})

function getNews(){
    const articleRequest=new XMLHttpRequest();
    articleRequest.open('GET',  `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=a4de0dfc4022462b812587ff08402a18`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError
    articleRequest.send();
}

function handleError(){
    console.log("algo falló");
}

function addNews(){
    const data=JSON.parse(this.responseText);
    const response=data.response;
    const article = data.response.docs;
   article.forEach(function(element){
        
     console.log(element);
        paintNews(element);
    })
        
   
}

function paintNews(element){
    let title=element.headline.main;
    let snippet=element.snippet;
    let url=element.web_url;
    let imgUrl=element.multimedia[1].url;
    let httpimg= ('https://www.nytimes.com/'+imgUrl);   
    let header=document.createElement('h2');
    let li=document.createElement('li');
    let parr=document.createElement('a');
    let img=document.createElement('img');
    img.setAttribute('src',httpimg);
    parr.setAttribute('href',url);
    li.className='articleClass';
    li.innerText=snippet;
    header.innerHTML=title;
    parr.innerHTML=url;
    
    responseContainer.appendChild(header);
    responseContainer.appendChild(li);
    responseContainer.appendChild(parr);
    responseContainer.appendChild(img);
   
}