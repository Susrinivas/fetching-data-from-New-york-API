
function displaycontent(clickedelement){
    
    let removeactive =   document.getElementsByTagName('li');
    console.log(removeactive);
    for(item of removeactive){
        console.log(item)
        if(item.classList.contains('active')){
            item.classList.remove('active');
            item.children[0].classList.remove('btn');
           item.children[0].classList.remove('btn-outline-primary');
            console.log(item);
        }
    }
    let id1 = clickedelement.id;
    clickedelement.classList.add('btn');
    clickedelement.classList.add('btn-outline-primary');
    let content = clickedelement.innerHTML.toLowerCase();
    
    let element = document.getElementById(id1)
    let e = element.parentElement.classList.add('active');
    let class1 =  e;

    fetch(`https://api.nytimes.com/svc/topstories/v2/${id1}.json?api-key=cf1UmB8DN2LGBko7ZlSrXK1WA0xeJllJ`)
    .then(response =>
         response.json()
    ).then(result => {
       //console.log(result.results.length);
        console.log(result.results[0]);
        var value = result.results;
        
        displaydata(id1, 'active', value, content);
        
    }).catch(err => {
        console.log(err);
    });
}

        
function  displaydata(id1, class1, value, content){
 for(let j = 0 ; j < value.length; j++){
let elem = createElements('div','col d-flex justify-content-center');
   let card = createElements('div','card mb-3 text-center');
   card.setAttribute('style','width:60%');
   let gutters = createElements('div','row no-gutters');
   let cardcol = createElements('div','col-8');
   let sectioncard = createElements('div','card-body text-left pl-4 text-dark');
    sectioncard.innerHTML = value[j].section.toUpperCase();
   let cardtitle = createElements('h4','card-title text-left pl-3 pt-0');
   cardtitle.innerHTML = value[j].title;
   let datecard = createElements('h5','card-title text-left pl-3 pt-1');
   let publishedDate = '';
   publishedDate = value[j].created_date;
   //console.log(publishedDate);
   let dt = new Date(publishedDate);
   datecard.innerHTML = dt.toDateString();
   
   let cardtext = createElements('div','card-text text-left  pt-4 small');
   cardtext.innerHTML = value[j].abstract;
   let reading = createElements('div','card-body text-primary h5');
   reading.innerHTML = ' continue reading';

   let cardcol1 = createElements('div','col-4');
   let image = createElements('object');
   image.setAttribute('style','width:250px;height:250px')
   image.setAttribute('data',value[j].multimedia[0].url);
   
   cardcol1.append(image);


   cardtext.append(reading);
   datecard.append(cardtext);
   cardcol.append(sectioncard,cardtitle,datecard);
   gutters.append(cardcol,cardcol1);
   card.append(gutters);
   elem.append(card);
   elem.setAttribute('style','margin-top:60px;');

   
   let removePreviousElement = document.getElementsByClassName('active')
   //let id2 = document.getElementById(id1);
   console.log(id1, content)
   for(item of removePreviousElement){
       if(id1 !== item.getAttribute('id') && item.tagName == 'DIV' ){
           item.remove();
       }
   }

   
   let ids = id1;
   let element1 = createElements('div','active',ids);
   
   element1.append(elem);
   document.body.append(element1);
 }

 }


   
   
function createElements(name, className='', id=''){
    let elem = document.createElement(name);
    elem.setAttribute('class',className);
    elem.setAttribute('id',id);
    return elem;
}
