// Fetch data from the CoinGecko API and render it in Grid View and List View
const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';
let data = []; // To store the fetched cryptocurrency data

// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        data = await response.json();
        renderData('gridView');
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Function to render the data in Grid View
function renderGridView() {
    const container = document.getElementById('dataContainer');
    container.innerHTML = '';

    data.forEach(crypto => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Determine the color of the 24-hour change based on its sign
        const changeColor = crypto.price_change_percentage_24h >= 0 ? 'green' : 'red';

        // Add cryptocurrency data to the card (including color-coded 24h change and total volume)
        card.innerHTML = `
            <div class="coin-info">
                <img src="${crypto.image}" alt="${crypto.name}" width="100" height="100">
                <div class="coin-names">
                    <h2>${crypto.name}</h2>
                    <p>${crypto.symbol.toUpperCase()}</p>
                </div>
            </div>
            <div class="coin-details">
                <p style="color: ${changeColor}">${crypto.price_change_percentage_24h}%</p>
                <p style="color: ${changeColor}">$${crypto.current_price}</p>
                <p>Market Cap: $${crypto.market_cap}</p>
                <p>Total Volume: $${crypto.total_volume}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

// Function to render the data in List View
function renderListView() {
    const container = document.getElementById('dataContainer');
    container.innerHTML = '';

    const table = document.createElement('table');
    table.classList.add('listView');

    // Create table rows for each cryptocurrency
    data.forEach(crypto => {
        const row = document.createElement('tr');

        // Determine the color of the 24-hour change based on its sign
        const changeColor = crypto.price_change_percentage_24h >= 0 ? 'green' : 'red';

        row.innerHTML = `
            <td><img src="${crypto.image}" alt="${crypto.name}" width="50" height="50"></td>
            <td> <div class="coin-names">
            <p>${crypto.symbol.toUpperCase()}</p>
            <h4>${crypto.name}</h4>
        </div>
            </td>
            <td style="color: ${changeColor}">${crypto.price_change_percentage_24h}%</td>
            <td style="color: ${changeColor}">$${crypto.current_price}</td>
            <td>$${crypto.market_cap}</td>
            <td>$${crypto.total_volume}</td>
        `;
        table.appendChild(row);
    });

    container.appendChild(table);
}


// Add event listeners to the tabs for interactivity
document.getElementById('gridViewTab').addEventListener('click', () => {
    renderData('gridView');
});

document.getElementById('listViewTab').addEventListener('click', () => {
    renderData('listView');
});

// Function to render data based on the selected view type (grid or list)
function renderData(viewType) {
    const gridViewTab = document.getElementById('gridViewTab');
    const listViewTab = document.getElementById('listViewTab');

    gridViewTab.classList.remove('activeTab');
    listViewTab.classList.remove('activeTab');

    if (viewType === 'gridView') {
        gridViewTab.classList.add('activeTab');
        renderGridView();
    } else {
        listViewTab.classList.add('activeTab');
        renderListView();
    }
}


// Fetch data when the page loads
fetchData();
