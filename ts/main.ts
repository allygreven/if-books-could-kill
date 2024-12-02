const $magGlass = document.querySelector('.magnifying-glass');
if (!$magGlass) throw new Error('$magGlass does not exists');

const $searchBar = document.getElementById('search-bar');

$magGlass.addEventListener('click', async (event: Event) => {
  event.preventDefault();
  const $eventTarget = event.target as HTMLElement;
  try {
    const response = await fetch(
      'https://www.googleapis.com/books/v1/volumes?q=thriller&key=AIzaSyCKFQdUXH7FtHhegJ_aEvfXbYQPDqInJIM',
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = (await response.json()) as Data;
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
});
