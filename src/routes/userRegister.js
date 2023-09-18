import { createUse, googleCount, emailVerification } from '../firebase/firebaseConfig.js';

function userRegister(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const buttonSingUpWithGoogle = document.createElement('button');
  buttonSingUpWithGoogle.setAttribute('type', 'submit');
  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';

  title.textContent = 'Crea una cuenta:';

  // Creating users
  buttonLogin.textContent = 'REGISTRAR';

  // Signing users
  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();

    const email = inputEmail.value;
    const password = inputPass.value;

    createUse(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        emailVerification().then(() => {
          console.log('Verificando email');
        });
        // form.requestFullscreen();
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  buttonSingUpWithGoogle.textContent = 'REGISTRARSE CON GOOGLE';
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    googleCount()
      .then((res) => {
        navigateTo('/feed');
      });
  });

  buttonReturn.textContent = 'Regresar';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/login');
  });

  form.append(inputEmail, inputPass, buttonLogin, buttonSingUpWithGoogle);
  section.append(title, form, buttonReturn);

  return section;
}

export default userRegister;
