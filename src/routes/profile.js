import {
  collection, getDocs, addDoc, serverTimestamp,
} from 'firebase/firestore';
import { db, auth } from '../firebase/firebaseConfig';
import iconoNav from '../assets/iconoBlanco.png';
import iconoProfile from '../assets/person_FILL0_wght400_GRAD0_opsz24.png';

function profile(navigateTo) {
  const section = document.createElement('section');

  const header = document.createElement('div');
  const userName = document.createElement('h3');
  const profileName = document.createElement('h4');
  const pictureUser = document.createElement('img');

  const main = document.createElement('main');

  const profileContainer = document.createElement('div');
  const profileTitle = document.createElement('p');
  // const nameTitle = document.createElement('div');
  // const name = document.createElement('div');
  // const nameInput = document.createElement('input');

  const nav = document.createElement('nav');
  const menuContainer = document.createElement('div');
  const buttonHome = document.createElement('button');
  const buttonLikes = document.createElement('button');
  const iconElement = document.createElement('img');
  const buttonPosts = document.createElement('button');
  const buttonProfile = document.createElement('button');

  section.id = 'profileSection';
  header.id = 'header';
  userName.classList.add('userName');
  main.id = 'main';
  profileContainer.id = 'postContainer';
  profileTitle.classList.add('titles');
  menuContainer.id = 'navbar';
  buttonHome.classList.add('material-symbols-outlined');
  buttonLikes.classList.add('btnNav');
  buttonPosts.classList.add('btnNav');
  buttonProfile.classList.add('btnNav');
  buttonProfile.src = iconoProfile;
  iconElement.src = iconoNav;
  iconElement.alt = 'New Wave Icon';
  iconElement.classList.add('iconNav');

  userName.textContent = 'NOMBRE USUARIA';
  profileName.textContent = '@nombreperfil';

  profileTitle.textContent = 'PERFIL DE USUARIA:';

  // NAV BAR
  buttonHome.textContent = 'Home';
  buttonHome.addEventListener('click', () => {
    navigateTo('/feed');
  });

  buttonLikes.textContent = 'Likes';
  buttonLikes.addEventListener('click', () => {
    navigateTo('/likes');
  });

  iconElement.textContent = 'icon';

  buttonPosts.textContent = 'Post';
  buttonPosts.addEventListener('click', () => {
    navigateTo('/posts');
  });

  buttonProfile.textContent = 'Profile';
  buttonProfile.addEventListener('click', () => {
    navigateTo('/profile');
  });

  // ORGANIZAR CONTENIDOS
  header.appendChild(userName, profileName, pictureUser);
  main.append(profileContainer);
  profileContainer.append(profileTitle);
  menuContainer.append(buttonHome, buttonLikes, iconElement, buttonPosts, buttonProfile);
  nav.appendChild(menuContainer);

  section.append(header, main, menuContainer);
  return section;
}

export default profile;
