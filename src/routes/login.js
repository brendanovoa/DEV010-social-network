import {
  GoogleAuthProvider, signInWithRedirect
  // connectAuthEmulator,
  // signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig.js';
function login(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const textSignin = document.createElement('span');
  const linkSignin = document.createElement('span');
  const buttonLogInWithGoogle = document.createElement ('button');

  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';

  title.textContent = 'Ingresa a tu cuenta:';
  buttonLogin.textContent = 'ENTRAR';

  buttonLogInWithGoogle.textContent = 'ENTRA CON GOOGLE' 
  buttonLogInWithGoogle.addEventListener('click', () =>{
    const provider = new GoogleAuthProvider()
    signInWithRedirect( auth, provider);
    console.log('funciono');
  });

  textSignin.textContent = 'Si aún no tienes cuenta regístrate ';
  linkSignin.textContent = 'AQUÍ';
  linkSignin.addEventListener('click', () => {
    navigateTo('/userRegister');
  });

  buttonReturn.textContent = 'Regresar';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  form.append(inputEmail, inputPass, buttonLogin, buttonLogInWithGoogle);
  section.append(title, form, buttonReturn, textSignin, linkSignin);

  return section;
}

export default login;
