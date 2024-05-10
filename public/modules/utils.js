export function removeClass(className) {
  document.querySelectorAll(`.${className}`)
    .forEach(({ classList }) => classList.remove(className));
}
