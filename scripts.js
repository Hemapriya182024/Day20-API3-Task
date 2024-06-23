// Function to fetch data from the Disney API
async function fetchDisneyCharacters() {
    try {
        const response = await fetch("https://api.disneyapi.dev/character");
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data.data;  // Assuming the characters are in the 'data' property
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Function to create a character card element
function createCharacterCard(character) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4 mb-4'; 

    const card = document.createElement('div');
    card.className = 'character-card card';

    const img = document.createElement('img');
    img.className = 'character-image card-img-top';
    img.src = character.imageUrl || 'placeholder.jpg';
    img.alt = `${character.name} image`;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const name = document.createElement('h5');
    name.className = 'character-name card-title';
    name.textContent = character.name;

    // Details collapsible section
    const detailsCollapse = document.createElement('div');
    detailsCollapse.className = 'collapse';
    
    const detailsList = document.createElement('ul');
    detailsList.className = 'character-details list-unstyled';
   
    // ID
    const idItem = document.createElement('li');
    idItem.textContent = `ID: ${character._id}`;
    detailsList.appendChild(idItem);

    // Created At
    const createdAtItem = document.createElement('li');
    createdAtItem.textContent = `Created At: ${new Date(character.createdAt).toLocaleString()}`;
    detailsList.appendChild(createdAtItem);

    detailsCollapse.appendChild(detailsList);

    cardBody.appendChild(name);
    cardBody.appendChild(detailsCollapse);
    card.appendChild(img);
    card.appendChild(cardBody);
    colDiv.appendChild(card);

    // Toggle details visibility on card click
    card.addEventListener('click', () => {
        detailsCollapse.classList.toggle('show'); // Toggle collapse class
    });

    return colDiv;
}

// Function to render characters on the page
async function renderCharacters(characters) {
    const characterList = document.getElementById('character-list');
    characterList.innerHTML = ''; // Clear the current list
    characters.forEach(character => {
        const characterCard = createCharacterCard(character);
        characterList.appendChild(characterCard);
    });
}

// Initialize the page by rendering characters
document.addEventListener('DOMContentLoaded', async () => {
    const characters = await fetchDisneyCharacters();
    renderCharacters(characters);
});
