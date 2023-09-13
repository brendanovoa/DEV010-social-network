import { createUser } from '../firebase/firebaseConfig.js';

function login(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonLogin = document.createElement('button');

  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';

  title.textContent = 'Ingresa a tu cuenta:';
  buttonLogin.textContent = 'ENTRAR';
  // Signing users
  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();

    const email = inputEmail.value;
    const password = inputPass.value;

    createUser(email, password)
      .then((cred) => {
        console.log('Usuario: ', cred.user);
        // form.requestFullscreen();
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  buttonReturn.textContent = 'Regresar';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  form.append(inputEmail, inputPass, buttonLogin);
  section.append(title, form, buttonReturn);

  return section;
}

export default login;
