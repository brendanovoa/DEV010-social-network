import {
  collection, doc, setDoc, getDocs, addDoc,
} from 'firebase/firestore';
import {
  db, auth, createUse, emailVerification, googleCount,
} from '../firebase/firebaseConfig';

import icono from '../assets/icono.png';

function userRegister(navigateTo) {
  const section = document.createElement('section');
  const icon = document.createElement('img');
  const title = document.createElement('h2');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonRegister = document.createElement('button');
  const buttonSingUpWithGoogle = document.createElement('button');
  inputPass.setAttribute('type', 'password');
  inputEmail.setAttribute('type', 'email');
  inputName.setAttribute('type', 'text');

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
  inputName.classList.add('input');
  buttonRegister.id = 'btnLogin';
  textLogin.classList.add('text');
  linkLogin.classList.add('link');
  buttonSingUpWithGoogle.classList.add('googleButton');
  buttonSingUpWithGoogle.id = 'btnGoogle';

  title.textContent = 'CREA TU CUENTA:';
  buttonRegister.textContent = 'REGISTRARSE';

  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';
  inputName.placeholder = 'Nombre de usuario';

  // Función para crear un perfil de usuario en Firestore
  function createProfile(userId, name, email) {
    const userRef = doc(collection(db, 'users'), userId);
    const userData = {
      name,
      email,
      userId,
    };
    return setDoc(userRef, userData);
  }

  // Signing users
  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();

    const email = inputEmail.value;
    const password = inputPass.value;
    const name = inputName.value;

    createUse(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        createProfile(user.uid, name, email)
          .then(() => {
            console.log('Perfil de usuario creado con éxito');
          })
          .catch((error) => {
            console.error('Error al crear el perfil de usuario: ', error);
          });

        emailVerification(user)
          .then(() => {
            console.log('Verificando email');
            alert('Correo de verificación enviado');
          });
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

  /*
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    googleCount()
      .then((googleUser) => {
      // Una vez autenticado con Google obtener información del usuario
        const name = googleUser.displayName;
        const email = googleUser.email;
        // const avatar = googleUser.photoURL;

        // Obtén el UID del usuario actual o null si no está autenticado
        const userId = auth.currentUser ? auth.currentUser.uid : null;
        if (userId) {
        // Luego, crea el perfil en Firestore
        createProfile(name, email)
          .then(() => {
            console.log('Perfil de usuario creado con éxito');
            navigateTo('/feed');
          })
          .catch((error) => {
            console.error('Error al crear el perfil: ', error);
          });
        } else {
          console.error('No se pudo obtener el UID del usuario');
        }
      })
      .catch((error) => {
        console.error('Error al autenticarse con Google: ', error);
      });
  }); */

  // Link a Login
  textLogin.textContent = 'Si ya tienes una cuenta ';
  linkLogin.textContent = 'INGRESA AQUÍ';
  linkLogin.addEventListener('click', () => {
    navigateTo('/login');
  });

  form.append(inputEmail, inputPass, inputName, buttonRegister, buttonSingUpWithGoogle);
  section.append(icon, title, form, textLogin, linkLogin);

  return section;
}

export default userRegister;
