import icono from '../assets/icono.png';

import {
  signIn, resetEmail, googleCount,
} from '../firebase/firebaseConfig.js';

function login(navigateTo) {
  const section = document.createElement('section');
  const icon = document.createElement('img');
  const title = document.createElement('h2');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const linkResetEmail = document.createElement('span');
  const buttonLogin = document.createElement('button');
  const textRegister = document.createElement('span');
  const linkRegister = document.createElement('span');
  const buttonLogInWithGoogle = document.createElement('button');
  buttonLogInWithGoogle.setAttribute('type', 'submit');
  inputPass.setAttribute('type', 'password');

  const buttonReturn = document.createElement('button');

  section.id = 'loginSection';
  icon.src = icono;
  icon.alt = 'New Wave Icon';
  icon.classList.add('icon');
  title.classList.add('titles');
  form.id = 'loginForm';
  inputEmail.classList.add('input');
  inputPass.classList.add('input');
  buttonLogin.id = 'btnLogin';
  textRegister.classList.add('text');
  linkRegister.classList.add('link');
  buttonLogInWithGoogle.classList.add('googleButton');
  // linkResetEmail
  // buttonLogInWithGoogle
  // buttonReturn

  title.textContent = 'INGRESA A TU CUENTA:';
  buttonLogin.textContent = 'ENTRAR';

  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';

  // Login users
  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();

    const email = inputEmail.value;
    const password = inputPass.value;

    signIn(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        alert('Acceso exitoso');
        navigateTo('/feed');
      // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorCode);
      });
  });

  // Botón acceso con Google
  // buttonLogInWithGoogle.textContent = 'ENTRA CON GOOGLE';
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    googleCount()
      .then(() => {
        navigateTo('/feed');
      });
  });

  // Link a registro
  textRegister.textContent = 'Si aún no tienes cuenta regístrate ';
  linkRegister.textContent = 'AQUÍ';
  linkRegister.addEventListener('click', () => {
    navigateTo('/userRegister');
  });

  // Recuperar contraseña
  linkResetEmail.textContent = '¿Olvidaste tu contraseña?';
  linkResetEmail.addEventListener('click', (e) => {
    e.preventDefault();

    const email = inputEmail.value;

    resetEmail(email)
      .then(() => {
        console.log('Password reset email sent');
        alert('Password reset email sent');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorCode);
      });
  });

  // Botón regresar
  // buttonReturn.textContent = 'Regresar';
  // buttonReturn.addEventListener('click', () => {
  // navigateTo('/');
  // });

  form.append(inputEmail, inputPass, linkResetEmail, buttonLogin, buttonLogInWithGoogle);
  section.append(icon, title, form, textRegister, linkRegister, buttonReturn);

  return section;
}

export default login;
