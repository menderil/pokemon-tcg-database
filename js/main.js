//event listener for search button
document.querySelector('button').addEventListener('click', getPokeCards)

const resultList = document.querySelector('ul')

function getPokeCards(){
    //gets the input from the search bar
    //adds quotes for multi-word searches
    let searchInput = '"' + document.querySelector('input').value + '"'
    console.log(searchInput)
    
    while(resultList.firstChild ){
        resultList.removeChild( resultList.firstChild );
    }

    
    fetch(`https://api.pokemontcg.io/v2/cards?q=name:${searchInput}`)
        .then(response => response.json())
        .then(searchResult => {
            console.log(searchResult)

            //test
            //console.log(searchResult.data[0].images.small)
            
            let listLength = 0;
            let i = 0
            //shows first 10 results to limit images on page for larger searches
            //TODO: update to use built in pages
            while(listLength < 10){
                //create an li with the small card image
                const li = document.createElement('li')
                const img = document.createElement('img')

                img.src = searchResult.data[i].images.small
                li.appendChild(img)

                //attach image to results ul
                resultList.appendChild(li)
                //add 1 to counter
                listLength++
                i++
            }
        })
        .catch(err => console.log(`error : ${err}`));

}
