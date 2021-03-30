/// FUNCTION TO SWITCH CONTENT BETWEEN TABS  //////////////////////////////////////

let tabs = document.querySelectorAll("[data-tab-target]")
let gifContent = document.querySelectorAll('[data-tab-content]')
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        let target = document.querySelector(tab.dataset.tabTarget)
        gifContent.forEach(gifContent => {
            gifContent.classList.remove("active")
        })
        target.classList.add("active")
    })
})

///////////////////////////////////////////////////////////////////////////////


///// FUNCTION TO DRAW GIFOS GOT FROM THE ENDPOINT BELOW INTO THE TRENDING AND FAVORITES CONTAINER //////
let containerTrending = document.querySelector(".gifs-trending-container")
let containerFavorites = document.querySelector(".gifs-favorites")
let gifKey = "Kgtc3PtS5s0QmceWRa7YZEb3CAR82e95"


setTimeout(() => {
    let divContainer = document.querySelectorAll(".div-container")
    divContainer.forEach(x => {
        let url = x.firstChild.src
        x.addEventListener("click", (e) => {
            if (e.target.src === "http://127.0.0.1:5500/sketch-gifos/resources/icon-fav.svg") {
                let gif = document.createElement("img")
                gif.setAttribute("src", url)
                gif.classList.add("gifs-favorites-img")
                containerFavorites.appendChild(gif)
            }
        })
    })
}, 100);



let tredingGif = async (number) => {
    let arrayGif = []
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${gifKey}&limit=${number}`
    let response = await fetch(url)
    let json = await response.json()
    let data = json.data
    data.forEach(gif => {
        arrayGif.push(gif.images.original.url)
    })

    return arrayGif
}



let drawGifs = () => {
    let gifs = tredingGif(30)
    gifs.then(res => {
        for (let i = 0; i < res.length; i++) {
            creatDivContainer(res[i])
        }
    })
}



let creatDivContainer = (url) => {
    let div = document.createElement("div")
    div.classList.add("div-container")
    containerTrending.appendChild(div)
    creatGif(url, div)
    creatDivOverlay(div)
}

let creatGif = (url, div) => {
    let gif = document.createElement("img")
    gif.setAttribute("src", url)
    div.appendChild(gif)
}

let creatDivOverlay = (div) => {
    let divOverlay = document.createElement("div")
    divOverlay.classList.add("div-overlay")
    div.appendChild(divOverlay)
    creatInsideButtons(divOverlay)
}

let creatInsideButtons = (div) => {
    let favorites = document.createElement("img")
    favorites.setAttribute("src", "/sketch-gifos/resources/icon-fav.svg")
    let expand = document.createElement("img")
    expand.setAttribute("src", "/sketch-gifos/resources/icon-max-normal.svg")
    let download = document.createElement("img")
    download.setAttribute("src", "/sketch-gifos/resources/icon-download.svg")
    div.appendChild(favorites)
    div.appendChild(expand)
    div.appendChild(download)
}



/*
containerTrending.addEventListener("click", (e) => {
    console.log(e.target)
    let gif = document.createElement("img")
    gif.setAttribute("src", e.target.src)
    gif.classList.add("gifs-favorites-img")
    containerFavorites.appendChild(gif)
})
*/
drawGifs()
////MOUSEOVER EVENT FOR EVERY TREDING GIFS TO CHANGE THEIR BACKGROUND COLOR AND TO ADD SOME BUTTONS





//////////////////////////////////////////////////////////////////////////

//// PORTION OF CODE USE TO DRAW GIFS INTO THE SEARCH TAB CONTENT --- PLEASE REVIEW THE CODE FLOW AND COMPARE VARIBLES WITH THE PREVIOUS ABOVE :)

let containerSearch = document.querySelector(".search-container")
let input = document.querySelector(".input-text")
let button = document.querySelector(".press-button-search")
let buttonSeemore = document.querySelector(".button-seemore")
let indexSeeMore = 1
let heightSeeMore = 615

let removeListener = (index) => {
    if (index === 5) {
        buttonSeemore.removeEventListener("click", changeHeight)
    }
}

let changeHeight = () => {
    indexSeeMore++
    heightSeeMore += 610
    removeListener(indexSeeMore)
    containerSearch.style.height = `${heightSeeMore}px`
}
buttonSeemore.addEventListener("click", changeHeight)


button.addEventListener("click", () => {
    reboot()
    containerSearch.innerHTML = ""
    drawGifsSearch(input.value)
    if (input.value !== "") {
        buttonSeemore.classList.add("active")
    }

})

let searchGif = async (userInput, number) => {
    let arraySearchGifs = []
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${gifKey}&q=${userInput}&limit=${number}`
    let response = await fetch(url)
    let json = await response.json()
    let data = json.data
    data.forEach(gif => {
        arraySearchGifs.push(gif.images.original.url)
    })
    return arraySearchGifs
}
// holi prueba git //
let drawGifsSearch = (input) => {
    let gifs = searchGif(input, 45)
    gifs.then(res => {
        for (let i = 0; i < res.length; i++) {
            creatGifSearch(res[i])
        }
    })


}
/// test git to github///
let creatGifSearch = (url) => {
    let gif = document.createElement("img")
    gif.setAttribute("src", url)
    gif.classList.add("search-container-gifs")
    containerSearch.appendChild(gif)
}

containerSearch.addEventListener("click", (e) => {
    let gif = document.createElement("img")
    gif.setAttribute("src", e.target.src)
    gif.classList.add("gifs-favorites-img")
    containerFavorites.appendChild(gif)
})

/////////////////////////////////////////////////////////////////////////////

let containerCarousel = document.querySelector(".gifs-trending-container")
let carosuelButtons = document.querySelectorAll('.press-button')
let numberOfGifs = 10
let imageIndex = 1
let translateX = 0



carosuelButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (e.target.id === "backwards") {
            if (imageIndex !== 1) {
                imageIndex--
                translateX += 615
            }
        } else if (imageIndex !== numberOfGifs) {
            imageIndex++
            translateX -= 615
        }
        containerCarousel.style.transform = `translateX(${translateX}px)`
    })
})

/////////////////////////////////////////////////////////////////////////
let suggestionsContainer = document.querySelector(".suggestions")
let cancelButton = document.getElementById("cancel-button")
let searchButton = document.getElementById("search-button")

input.addEventListener("keyup", () => {
    if (input.value === "") {
        containerSearch.innerHTML = ""
        buttonSeemore.classList.remove("active")
    }
    suggestionsContainer.innerHTML = ""
    if (input.value !== "") {
        searchButton.classList.add("inactive")
        cancelButton.classList.add("active")
    } else {
        searchButton.classList.remove("inactive")
        cancelButton.classList.remove("active")
    }
    drawSuggetions()
})


let searchSuggetions = async (inputValue) => {
    let url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${gifKey}&q=${inputValue}`
    let response = await fetch(url)
    let json = await response.json()
    let data = json.data
    return data
}

let drawSuggetions = () => {
    let data = searchSuggetions(input.value)
    data.then(res => {
        res.forEach(data => {
            let div = document.createElement("div")
            div.innerHTML = data.name
            suggestionsContainer.appendChild(div)
        })
    })
}

suggestionsContainer.addEventListener("click", (e) => {
    reboot()
    containerSearch.innerHTML = ""
    let target = e.target.innerHTML
    drawGifsSearch(target)
    buttonSeemore.classList.add("active")
})

let reboot = () => {
    containerSearch.style.height = `615px`
    if (containerSearch.style.height = "615px") {
        indexSeeMore = 1
        heightSeeMore = 615
        buttonSeemore.addEventListener("click", changeHeight)
    }
}