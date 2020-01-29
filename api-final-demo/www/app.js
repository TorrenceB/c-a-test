class Model {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }    
}

class UI {

    static handleApiBtnClick = (e) => {
        e.target.style.display = 'none';
        Api.callApi();
        //Add two input fields/btn at top
        UI.addMovieEntry(e.target);
    }
    
    static renderBtn = () => { 
        let apiBtn = document.createElement('button');
        
        let body = document.getElementById('root');       
        //Add div with content and define attributes using JavaScript
        let divElement = document.createElement('div');
        divElement.setAttribute('id', 'buttonContainer');
        divElement.style.textAlign = 'center';
        body.appendChild(divElement);
        //Create btn and append to div using JavaScript            
        apiBtn.setAttribute('id', 'apiBtn');
        apiBtn.addEventListener('click', UI.handleApiBtnClick);
        apiBtn.innerHTML = "Show me Ghibli!";
        apiBtn.style.color = 'white';
        apiBtn.style.padding = '15px';
        divElement.appendChild(apiBtn);  
        
        console.log('apiBtn loaded...');
    }

    static addElements = (parentId, elementTag, elementId, html) => {
        let p = document.getElementById(parentId);
        let newElement = document.createElement(elementTag);
        newElement.setAttribute('id', elementId);
        newElement.innerHTML = html;
        p.appendChild(newElement);
    }

    static addMovieEntry = () => {        
        const html =
            `
            <input class="title-input" id="title-entry" type="text" placeholder="Enter movie title" /> 
            <input class="title-input" id="description-entry" type="text" placeholder="Enter description" />
            <button id="add-movie-btn">Add Movie</button>
            `;                
        UI.addElements('movie-entry', 'span', 'movie-input', html);
        document.getElementById('add-movie-btn').addEventListener('click', UI.handleAddMovieClick);
    }

    static handleAddMovieClick = (e) => {
        const title = document.getElementById('title-entry').value;
        const description = document.getElementById('description-entry').value;
        //Validate input fields
        Api.createMovieCard({title, description});               
    }
}

class Api {

    static createEl = (el) => {
        return document.createElement(el);
    }

    static append = (parent, el) => {
        return parent.appendChild(el);
    }

    static createMovieCard = ({title, description}) => {
            let contentWrapper = document.getElementById('contentWrapper');
           //Create cards that hold content                      
           const card = Api.createEl('div');
           card.setAttribute('class', 'card');
           const movieTitle = Api.createEl('h1');
           movieTitle.innerHTML = title
           const movieDescription = Api.createEl('p');
        //    movie.description = movie.description.substring(0, 300);
           movieDescription.innerHTML = `${description}...`;        
           
           //Append elements          
           contentWrapper.appendChild(card);
           card.appendChild(movieTitle);
           card.appendChild(movieDescription);
                     
    };

    static callApi = () => {       
        const url = 'https://ghibliapi.herokuapp.com/films'
        fetch(url)
        .then(res => {
            if(res.status !== 200) {
                console.log('Oops! There was an error')
            }
            return res.json()
        })
        .then(data => {                                                                                                      
              data.map((movie) =>                           
                Api.createMovieCard(movie)                                                                            
             )                                                                                  
        })        
        .catch(err => {
            console.log(err);
        })       
    }
}

document.addEventListener('DOMContentLoaded', UI.renderBtn);




