function inputErrorTemplate(msg) {
  return `
  <div class="invalid-feedback">${msg}</div>
  `
}

export function showInputError(el) {
  const parent = el.parentElement;
  const err = parent.querySelectorAll('.invalid-feedback')
  if ((err.length + 1) < 2) {
    const msg = el.dataset.invalidMessage || 'Invalid input';
    const template = inputErrorTemplate(msg);
    el.classList.add('is-invalid');
    parent.insertAdjacentHTML('beforeend', template);
  }
 
}



export function removeImputError(el) {
  const parent = el.parentElement;
  const err = parent.querySelector('.invalid-feedback');
  if (!err) return;

  el.classList.remove('is-invalid');
  parent.removeChild(err)
}