const searchBar = document.querySelector('#main-search')
const searchList = document.querySelector('#main-search-result')

const fetchEvents = async (search) => {
    const apiEndpoint = 'http://localhost:3000/api/events/search/'+search;
    try {
        const response = await fetch(apiEndpoint);
        const searchResults = await response.json();

            searchResults.forEach(result => {
                let eventLink = document.createElement('a');
                let eventLi = document.createElement('li');

                eventLink.classList = 'search-link'
                eventLink.appendChild(eventLi);
                eventLi.id = 'event' + result.id;
                eventLi.classList = 'search-result'
                eventLi.innerHTML = result.name
                eventLink.setAttribute('href','/events/'+result.id)
                searchList.appendChild(eventLink)
            })
        
    } catch (error) {
        console.error(error);
    }
}

const searchEvents = search => {
    const searchResultList = Array.from(document.querySelectorAll('.search-link'))
    searchResultList.forEach(element => {
        if (!element.innerText.includes(search) || search == '') {
            element.remove()
        }
    })
}

const positionEvents = () => {
    const boundingRect = searchBar.getBoundingClientRect()
    const barBottom = boundingRect.bottom  
    searchList.style.top = boundingRect.height/2+'px';
    searchList.style.width = document.querySelector('#form-search').getBoundingClientRect().width+'px'
}

searchBar.addEventListener('input', e => {
    fetchEvents(e.target.value)
    searchEvents(e.target.value)
    positionEvents()
})


