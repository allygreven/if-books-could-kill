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
/// ////////// fetching for title////////////
async function fetchBooksByTitle(searchValue) {
    try {
        const response1 = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchValue}&key=AIzaSyCKFQdUXH7FtHhegJ_aEvfXbYQPDqInJIM`);
        if (!response1.ok) {
            throw new Error(`HTTP error! Status: ${response1.status}`);
        }
        const dataTitle = (await response1.json());
        // renderImages(dataTitle)
        for (let i = 0; i < dataTitle.items.length; i++) {
            const $authorRow = renderImages(dataTitle.items[i]);
            $searchResults?.appendChild($authorRow);
        }
        console.log(dataTitle);
    }
    catch (error) {
        console.error('Error:', error);
    }
}
/// ///////////////// fetching for author////////////////
async function fetchBooksByAuthor(searchValue) {
    try {
        const response2 = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchValue}&key=AIzaSyCKFQdUXH7FtHhegJ_aEvfXbYQPDqInJIM`);
        if (!response2.ok) {
            throw new Error(`HTTP error! Status: ${response2.status}`);
        }
        const dataAuthor = (await response2.json());
        for (let i = 0; i < dataAuthor.items.length; i++) {
            const $imageRow = renderImages(dataAuthor.items[i]);
            $searchResults?.appendChild($imageRow);
        }
        console.log(dataAuthor);
    }
    catch (error) {
        console.error('Error:', error);
    }
}
/// ////////////// /search bar and radio button clicked///////////////
$searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchValue = encodeURI($searchBar.value);
    const $radio = document.querySelector('input[type="radio"]:checked');
    if (!$radio)
        throw new Error('$radio query failed');
    const searchType = $radio.value;
    if (searchType === 'title') {
        await fetchBooksByTitle(searchValue);
    }
    else if (searchType === 'author') {
        await fetchBooksByAuthor(searchValue);
    }
    viewSwap('search-results');
});
const $searchResults = document.querySelector('[data-view="search-results"]');
if (!$searchResults)
    throw new Error('$searchResults not found');
/// ////////////////////////Render Images from URL/////////////////
function renderImages(book) {
    console.log(book);
    const $row = document.createElement('div');
    $row.className = 'row';
    const $columnFull = document.createElement('div');
    $columnFull.className = 'column-full';
    if (book.volumeInfo.imageLinks) {
        const $img = document.createElement('img');
        $img.src = book.volumeInfo.imageLinks.thumbnail;
        $img.alt = 'Book Cover';
        $columnFull.appendChild($img);
    }
    //  else **** placeholder image
    $row.appendChild($columnFull);
    return $row;
}
const $homepage = document.querySelector('[data-view="homepage"]');
if (!$homepage)
    throw new Error('$homepage does not exist');
/// ////////////// Viewswap function/////////////////
function viewSwap(viewName) {
    data.view = viewName;
    if (!$homepage)
        throw new Error('$homepage does not exist');
    if (!$searchResults)
        throw new Error('$searchResults not found');
    if (viewName === 'homepage') {
        $homepage.className = 'homepage';
        $searchResults.className = 'search-results hidden';
    }
    else {
        $homepage.className = 'homepage hidden';
        $searchResults.className = 'search-results';
    }
}
const $home = document.querySelector('.home');
if (!$home)
    throw new Error('$home query failed');
/// //////////// go back to homepage/////////
$home.addEventListener('click', () => {
    viewSwap('homepage');
});
