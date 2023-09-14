import { createUser } from '../firebase/firebaseConfig.js';

function userRegister(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonLogin = document.createElement('button');

  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';

  title.textContent = 'Crea una cuenta:';
  buttonLogin.textContent = 'ENTRAR';
  // Creating users
  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();

    const email = inputEmail.value;
    const password = inputPass.value;

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert('Registro exitoso');
        // form.requestFullscreen();
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  buttonReturn.textContent = 'Regresar';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/login');
  });

  form.append(inputEmail, inputPass, buttonLogin);
  section.append(title, form, buttonReturn);

  return section;
}

export default userRegister;
