const $magGlass = document.querySelector('.magnifying-glass');
if (!$magGlass) throw new Error('$magGlass does not exists');

const $searchBar = document.getElementById('search-bar') as HTMLInputElement;
if (!$searchBar) throw new Error('$searchBar does not exists');

const $searchForm = document.getElementById('search-form') as HTMLFormElement;
if (!$searchForm) throw new Error('$searchForm does not exist');

async function fetchBooksByTitle(searchValue: string): Promise<void> {
  try {
    const response1 = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchValue}&key=AIzaSyCKFQdUXH7FtHhegJ_aEvfXbYQPDqInJIM`,
    );
    if (!response1.ok) {
      throw new Error(`HTTP error! Status: ${response1.status}`);
    }
    const data1 = (await response1.json()) as Data;
    console.log(data1);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function fetchBooksByAuthor(searchValue: string): Promise<void> {
  try {
    const response2 = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchValue}&key=AIzaSyCKFQdUXH7FtHhegJ_aEvfXbYQPDqInJIM`,
    );
    if (!response2.ok) {
      throw new Error(`HTTP error! Status: ${response2.status}`);
    }
    const data2 = (await response2.json()) as Data;
    console.log(data2);
  } catch (error) {
    console.error('Error:', error);
  }
}

$searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchValue = encodeURI($searchBar.value);
  console.log(searchValue);
  const $radio = document.querySelector(
    'input[type="radio"]:checked',
  ) as HTMLInputElement;
  if (!$radio) throw new Error('$radio query failed');
  const searchType = $radio.value;
  console.log(searchType);
  if (searchType === 'title') {
    await fetchBooksByTitle(searchValue);
  } else if (searchType === 'author') {
    await fetchBooksByAuthor(searchValue);
  }
});
