const $magGlass = document.querySelector('.magnifying-glass');
if (!$magGlass) throw new Error('$magGlass does not exists');

const $searchBar = document.getElementById('search-bar') as HTMLInputElement;
if (!$searchBar) throw new Error('$searchBar does not exists');

const $searchForm = document.getElementById('search-form') as HTMLFormElement;
if (!$searchForm) throw new Error('$searchForm does not exist');

/// ////////// fetching for title////////////

async function fetchBooksByTitle(searchValue: string): Promise<void> {
  try {
    const response1 = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchValue}&key=AIzaSyCKFQdUXH7FtHhegJ_aEvfXbYQPDqInJIM`,
    );
    if (!response1.ok) {
      throw new Error(`HTTP error! Status: ${response1.status}`);
    }
    const dataTitle = (await response1.json()) as Data;
    // renderImages(dataTitle)
    for (let i = 0; i < dataTitle.items.length; i++) {
      const $authorRow = renderImages(dataTitle.items[i]);
      $searchResults?.appendChild($authorRow);
    }
    console.log(dataTitle);
  } catch (error) {
    console.error('Error:', error);
  }
}

/// ///////////////// fetching for author////////////////

async function fetchBooksByAuthor(searchValue: string): Promise<void> {
  try {
    const response2 = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchValue}&key=AIzaSyCKFQdUXH7FtHhegJ_aEvfXbYQPDqInJIM`,
    );
    if (!response2.ok) {
      throw new Error(`HTTP error! Status: ${response2.status}`);
    }
    const dataAuthor = (await response2.json()) as Data;
    for (let i = 0; i < dataAuthor.items.length; i++) {
      const $imageRow = renderImages(dataAuthor.items[i]);
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
  const $radio = document.querySelector(
    'input[type="radio"]:checked',
  ) as HTMLInputElement;
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

function renderImages(book: Item): HTMLDivElement {
  console.log(book);

  const $row = document.createElement('div');
  $row.className = 'row';

  const $columnFull = document.createElement('div');
  $columnFull.className = 'column-full';

  const $wrapper = document.createElement('div');
  $wrapper.className = 'wrapper';

  const $hearts = document.createElement('i');
  $hearts.className = 'fa-solid fa-heart cover-hearts';

  if (book.volumeInfo.imageLinks) {
    const $img = document.createElement('img');
    $img.src = book.volumeInfo.imageLinks.thumbnail;
    $img.alt = 'Book Cover';
    $wrapper.appendChild($img);
    $wrapper.appendChild($hearts);
  }
  //  else **** placeholder image?
  $row.appendChild($columnFull);
  $columnFull.appendChild($wrapper);

  return $row;
}

const $homepage = document.querySelector('[data-view="homepage"]');
if (!$homepage) throw new Error('$homepage does not exist');

const $allFavorites = document.querySelector('#all-favorites');
if (!$allFavorites) throw new Error('$AllFavorites query failed');

/// ////////////// Viewswap function/////////////////

function viewSwap(viewName: string): any {
  data.view = viewName;
  if (!$homepage) throw new Error('$homepage does not exist');
  if (!$searchResults) throw new Error('$searchResults not found');
  if (!$allFavorites) throw new Error('$allFavorites query failed');

  if (viewName === 'homepage') {
    $homepage.className = 'homepage';
    $searchResults.className = 'search-results hidden';
  } else {
    $homepage.className = 'homepage hidden';
    $searchResults.className = 'search-results';
  }

  /// ///search results to favorites///////

  // if (viewName === 'search-results') {
  //   $searchResults.className = 'search-results';
  //   $allFavorites.className = 'all-favorites hidden';
  // } else {
  //   $searchResults.className = 'search-results hidden';
  //   $allFavorites.className = 'all-favorites';
  // }
}

const $home = document.querySelector('.home');
if (!$home) throw new Error('$home query failed');

/// //////////// go back to homepage/////////

$home.addEventListener('click', () => {
  viewSwap('homepage');
});

/// ///////go to favorites////////

$allFavorites.addEventListener('click', () => {
  viewSwap('all-favorites');
});

/// /////////////hearts click////////////

const $hearts = document.querySelector('.cover-hearts');
if (!$hearts) throw new Error('$hearts query failed');

$hearts.addEventListener('click', (event) => {
  const $eventTarget = event.target as HTMLElement;

  if ($eventTarget.tagName === 'i') {
    const $closest = $eventTarget.closest('img');
    $closest?.remove();
  }
});
