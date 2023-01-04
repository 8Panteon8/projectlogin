import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeImputError } from './views/form';
import { login } from './services/auth.service';
import { notify } from './views/notifications';
import { getNews } from './services/new.service';


const { form, inputEmail, inputPassword } = UI
const inputs = [inputEmail, inputPassword];


//Events
form.addEventListener('submit', e => {
  e.preventDefault();
  onSubmit();
});

inputs.forEach(el => el.addEventListener('focus', () => removeImputError(el)))

//Handlers
async function onSubmit() {
  const isValidform = inputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el)
    }
    return isValidInput;
  });

  if (!isValidform) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    await getNews();
    form.reset();
    notify({msg:'Login success', className:'alert-success'})
  } catch (err) {
    notify({msg:'Login faild', className:'alert-danger'})
  }

}


