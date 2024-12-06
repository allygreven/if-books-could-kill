'use strict';
const $magGlass = document.querySelector('.magnifying-glass');
if (!$magGlass) throw new Error('$magGlass does not exists');
const $searchBar = document.getElementById('search-bar');
if (!$searchBar) throw new Error('$searchBar does not exists');
const $searchForm = document.getElementById('search-form');
if (!$searchForm) throw new Error('$searchForm does not exist');
/// ////////// fetching for title////////////
async function fetchBooksByTitle(searchValue) {
  try {
    const response1 = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchValue}&key=AIzaSyCKFQdUXH7FtHhegJ_aEvfXbYQPDqInJIM`,
    );
    if (!response1.ok) {
      throw new Error(`HTTP error! Status: ${response1.status}`);
    }
    const dataTitle = await response1.json();
    if (!$searchResults) throw new Error('$searchResults not found');
    $searchResults.innerHTML = '';
    for (let i = 0; i < dataTitle.items.length; i++) {
      const $authorRow = renderImages(dataTitle.items[i].volumeInfo);
      $searchResults?.appendChild($authorRow);
    }
    console.log(dataTitle);
  } catch (error) {
    console.error('Error:', error);
  }
}
/// ///////////////// fetching for author////////////////
async function fetchBooksByAuthor(searchValue) {
  try {
    const response2 = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchValue}&key=AIzaSyCKFQdUXH7FtHhegJ_aEvfXbYQPDqInJIM`,
    );
    if (!response2.ok) {
      throw new Error(`HTTP error! Status: ${response2.status}`);
    }
    const dataAuthor = await response2.json();
    if (!$searchResults) throw new Error('$searchResults not found');
    $searchResults.innerHTML = '';
    for (let i = 0; i < dataAuthor.items.length; i++) {
      const $imageRow = renderImages(dataAuthor.items[i].volumeInfo);
      $searchResults?.appendChild($imageRow);
    }
    console.log(dataAuthor);
  } catch (error) {
    console.error('Error:', error);
  }
}
/// ////////////// /search bar and radio button clicked///////////////
$searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchValue = encodeURI($searchBar.value);
  const $radio = document.querySelector('input[type="radio"]:checked');
  if (!$radio) throw new Error('$radio query failed');
  const searchType = $radio.value;
  if (searchType === 'title') {
    await fetchBooksByTitle(searchValue);
  } else if (searchType === 'author') {
    await fetchBooksByAuthor(searchValue);
  }
  viewSwap('search-results');
});
const $searchResults = document.querySelector('[data-view="search-results"]');
if (!$searchResults) throw new Error('$searchResults not found');
/// ////////////////////////Render Images from URL/////////////////
function renderImages(book) {
  const $row = document.createElement('div');
  $row.className = 'row';
  const $columnFull = document.createElement('div');
  $columnFull.className = 'column-full';
  const $wrapper = document.createElement('div');
  $wrapper.className = 'wrapper';
  const $hearts = document.createElement('i');
  $hearts.className = 'fa-solid fa-heart cover-hearts';
  if (book.imageLinks) {
    const $img = document.createElement('img');
    $img.src = book.imageLinks.thumbnail;
    $img.alt = 'Book Cover';
    $wrapper.appendChild($img);
    $wrapper.appendChild($hearts);
  }
  //  else **** placeholder image?
  $row.appendChild($columnFull);
  $columnFull.appendChild($wrapper);
  /// /////////////hearts button click////////////
  $wrapper.addEventListener('click', (event) => {
    const $eventTarget = event.target;
    if ($eventTarget.tagName === 'I') {
      if (globalData.favorites.length === 0) {
        globalData.favorites.push(book);
      } else {
        const foundFavorites = globalData.favorites.find(
          (favoriteBook) => favoriteBook.title === book.title,
        );
        if (!foundFavorites) {
          globalData.favorites.push(book);
        }
      }
      writeData();
    }
  });
  return $row;
}
const $homepage = document.querySelector('[data-view="homepage"]');
if (!$homepage) throw new Error('$homepage does not exist');
const $allFavorites = document.querySelector('#all-favorites');
if (!$allFavorites) throw new Error('$AllFavorites query failed');
/// ////////////// Viewswap function/////////////////
function viewSwap(viewName) {
  globalData.view = viewName;
  if (!$homepage) throw new Error('$homepage does not exist');
  if (!$searchResults) throw new Error('$searchResults not found');
  if (!$allFavorites) throw new Error('$allFavorites query failed');
  if (viewName === 'homepage') {
    $homepage.className = 'homepage';
    $searchResults.className = 'search-results hidden';
    $allFavorites.className = 'all-favorites hidden';
  } else if (viewName === 'search-results') {
    $searchResults.className = 'search-results';
    $allFavorites.className = 'all-favorites hidden';
    $homepage.className = 'homepage hidden';
  } else if (viewName === 'all-favorites') {
    $searchResults.className = 'search-results hidden';
    $homepage.className = 'homepage hidden';
    $allFavorites.className = 'all-favorites';
    /// ///////////Favorites Page /////////////
    const $favoritesRow = document.querySelector('.favorites-loaded');
    if (!$favoritesRow) throw new Error('$favoritesRow does not exist');
    $favoritesRow.innerHTML = '';
    for (let i = 0; i < globalData.favorites.length; i++) {
      const favBook = globalData.favorites[i];
      const $imageRow = renderImages(favBook);
      $favoritesRow?.appendChild($imageRow);
    }
  }
}
const $home = document.querySelector('.home');
if (!$home) throw new Error('$home query failed');
/// //////////// go back to homepage/////////
$home.addEventListener('click', () => {
  viewSwap('homepage');
});
/// ///////go to favorites////////
const $favorites = document.querySelector('.favorites');
if (!$favorites) throw new Error('$favorites query failed');
$favorites.addEventListener('click', () => {
  viewSwap('all-favorites');
});
