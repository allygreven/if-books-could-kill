interface Search {
  author: string;
  title: string;
  genre: string;
}

const $magGlass = document.querySelector('.magnifying-glass');
if (!$magGlass) throw new Error('$magGlass does not exists');

const $searchBar = document.getElementById('search-bar');

$magGlass.addEventListener('click', (event: Event) => {
  event.preventDefault();
  try {
  const $eventTarget = event.target as HTMLElement;
  }
});


try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = (await response.json()) as Search;
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
