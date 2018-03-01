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
    const article = data.response.docs[0];
   /* articles.forEach(function(element){
        console.log(element);
    })*/
    
    const title=article.headline.main;
    const snippet=article.snippet;
    const url=article.web_url;
    const imgUrl=article.multimedia[1].legacy.url;
    console.log(response);

    let header=document.createElement('h3');
    let li=document.createElement('li');
    let parr=document.createElement('p');
    let img=document.createElement('img');
    img.setAttribute('src','imgUrl');
    li.className='articleClass';
    li.innerText=snippet;
    header.innerHTML=title;
    parr.innerHTML=url;

    responseContainer.appendChild(header);
    responseContainer.appendChild(li);
    responseContainer.appendChild(parr);
    responseContainer.appendChild(img);
    
}