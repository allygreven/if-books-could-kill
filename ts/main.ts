const $magGlass = document.querySelector('.magnifying-glass');
if (!$magGlass) throw new Error('$magGlass does not exists');

$magGlass.addEventListener('click', (event: Event) => {
  const $eventTarget = event.target as HTMLElement;
});
