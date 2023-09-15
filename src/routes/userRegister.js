import {
  GoogleAuthProvider, signInWithRedirect,
} from 'firebase/auth';
import { createUser, auth, emailVerification } from '../firebase/firebaseConfig.js';

function userRegister(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const buttonSingUpWithGoogle = document.createElement('button');
  buttonSingUpWithGoogle.setAttribute('type', 'button');
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

    createUser(email, password)
      .then((userCredential) => {
        emailVerification();
        console.log('Verificando email');
        const user = userCredential.user;
        console.log(user);
        alert('Registro exitoso');
        // form.requestFullscreen();
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  buttonSingUpWithGoogle.textContent = 'REGISTRARSE CON GOOGLE';
  buttonSingUpWithGoogle.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    console.log('funciono');
    navigateTo('/feed');
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
