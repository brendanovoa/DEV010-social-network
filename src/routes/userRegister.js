import icono from '../assets/icono.png';
import { createUse, emailVerification, googleCount } from '../firebase/firebaseConfig.js';

function userRegister(navigateTo) {
  const section = document.createElement('section');
  const icon = document.createElement('img');
  const title = document.createElement('h2');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonRegister = document.createElement('button');
  const buttonSingUpWithGoogle = document.createElement('button');
  inputPass.setAttribute('type', 'password');
  inputEmail.setAttribute('type', 'email');

  buttonSingUpWithGoogle.setAttribute('type', 'submit');
  const textLogin = document.createElement('span');
  const linkLogin = document.createElement('span');

  section.id = 'registerSection';
  icon.src = icono;
  icon.alt = 'New Wave Icon';
  icon.classList.add('icon');
  title.classList.add('titles');
  form.id = 'registerForm';
  inputEmail.classList.add('input');
  inputPass.classList.add('input');
  buttonRegister.id = 'btnLogin';
  textLogin.classList.add('text');
  linkLogin.classList.add('link');
  buttonSingUpWithGoogle.classList.add('googleButton');
  buttonSingUpWithGoogle.id = 'btnGoogle';

  title.textContent = 'CREA TU CUENTA:';
  buttonRegister.textContent = 'REGISTRARSE';

  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';

  // Signing users
  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();

    const email = inputEmail.value;
    const password = inputPass.value;

    /* verifica si el campo del correo electrónico no está vacío */
    if (email.trim() === '') {
      window.alert('Ingrese un correo electrónico');
      return; // <-- Corrección: Cambiar "return;" a "return;"
    }

    createUse(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        emailVerification(user).then(() => {
          console.log('Verificando email');
          // alert('Correo de verificación enviado');
        });
        // form.requestFullscreen();
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    googleCount()
      .then(() => {
        navigateTo('/feed');
      });
  });

  // Link a Login
  textLogin.textContent = 'Si ya tienes una cuenta ';
  linkLogin.textContent = 'INGRESA AQUÍ';
  linkLogin.addEventListener('click', () => {
    navigateTo('/login');
  });

  form.append(inputEmail, inputPass, buttonRegister, buttonSingUpWithGoogle);
  section.append(icon, title, form, textLogin, linkLogin);

  return section;
}

export default userRegister;
