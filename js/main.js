"use strict";
const $magGlass = document.querySelector('.magnifying-glass');
if (!$magGlass)
    throw new Error('$magGlass does not exists');
const $searchBar = document.getElementById('search-bar');
if (!$searchBar)
    throw new Error('$searchBar does not exists');
const $searchForm = document.getElementById('search-form');
if (!$searchForm)
    throw new Error('$searchForm does not exist');
const $option = document.querySelector('input[name="option"]:checked');
if (!$option)
    throw new Error('Please select a search option');
async function fetchBooksByTitle(title) {
    try {
        const response1 = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchValue}&key=AIzaSyCKFQdUXH7FtHhegJ_aEvfXbYQPDqInJIM`);
        if (!response1.ok) {
            throw new Error(`HTTP error! Status: ${response1.status}`);
        }
        const data1 = (await response1.json());
        console.log(data1);
    }
    catch (error) {
        console.error('Error:', error);
    }
}
async function fetchBooksByAuthor(author) {
    try {
        const response2 = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor+${searchValue}&key=AIzaSyCKFQdUXH7FtHhegJ_aEvfXbYQPDqInJIM`);
        if (!response2.ok) {
            throw new Error(`HTTP error! Status: ${response2.status}`);
        }
        const data2 = (await response2.json());
        console.log(data2);
    }
    catch (error) {
        console.error('Error:', error);
    }
}
$searchForm.addEventListener('click', async () => {
    // const searchValue = $searchBar.value as HTMLInputElement;
    const searchType = $option.value;
    if (searchType === 'title') {
        await fetchBooksByTitle($searchBar);
    }
    else if (searchType === 'author') {
        await fetchBooksByAuthor($searchBar);
    }
});
// document.getElementById('searchForm').addEventListener('submit', async function (event) {
//   event.preventDefault(); // Prevent the form from reloading the page
//   const selectedOption = document.querySelector('input[name="searchOption"]:checked');
//   const searchQuery = document.getElementById('searchQuery').value.trim();
//   if (!selectedOption) {
//     alert('Please select a search option (e.g., Title or Author).');
//     return;
//   }
//   if (!searchQuery) {
//     alert('Please enter a search term.');
//     return;
//   }
//   const searchType = selectedOption.value;
//   if (searchType === 'title') {
//     try {
//       const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(searchQuery)}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch data from Google Books API.');
//       }
//       const data = await response.json();
//       // Display the results
//       const resultsContainer = document.getElementById('results');
//       resultsContainer.innerHTML = ''; // Clear previous results
//       if (data.items && data.items.length > 0) {
//         data.items.forEach(book => {
//           const bookTitle = book.volumeInfo.title || 'No title available';
//           const bookAuthors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
//           const bookElement = document.createElement('div');
//           bookElement.innerHTML = `<strong>${bookTitle}</strong><br/>by ${bookAuthors}`;
//           resultsContainer.appendChild(bookElement);
//         });
//       } else {
//         resultsContainer.innerText = 'No books found for the given title.';
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       document.getElementById('results').innerText = 'An error occurred while fetching data.';
//     }
//   } else {
//     alert(`The selected option "${searchType}" is not yet implemented.`);
//   }
// });
