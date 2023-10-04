import iconoNav from '../assets/iconoBlanco.png';
import generalUser from '../assets/general-user.png';

function likes(navigateTo) {
  const section = document.createElement('section');

  const header = document.createElement('div');
  const name = document.createElement('h3');
  const profileName = document.createElement('h4');
  const pictureUser = document.createElement('img');

  const main = document.createElement('main');

  const likesContainer = document.createElement('div');
  const likesTitle = document.createElement('p');
  const likesFeed = document.createElement('div');

  const nav = document.createElement('nav');
  const menuContainer = document.createElement('div');
  const buttonHome = document.createElement('button');
  const buttonLikes = document.createElement('button');
  const iconElement = document.createElement('img');
  const buttonPosts = document.createElement('button');
  const buttonProfile = document.createElement('button');

  section.id = 'likesSection';
  header.id = 'header';
  name.classList.add('userName');
  profileName.classList.add('profileName');
  pictureUser.classList.add('pictureUser');
  main.id = 'main';
  likesContainer.id = 'postContainer';
  likesTitle.classList.add('titles');

  menuContainer.id = 'navbar';
  buttonHome.classList.add('btnNav');
  buttonLikes.classList.add('btnNav');
  buttonPosts.classList.add('btnNav');
  buttonProfile.classList.add('btnNav');
  iconElement.src = iconoNav;
  iconElement.alt = 'New Wave Icon';
  iconElement.classList.add('iconNav');

  name.textContent = 'NOMBRE USUARIA'; /* `${data.userName}` auth.currentUser.displayName */
  profileName.textContent = '@nombreperfil';
  pictureUser.src = generalUser;

  likesTitle.textContent = 'TUS POSTS MAS POPULARES:';

  // NAV BAR
  buttonHome.textContent = 'Home';
  buttonHome.addEventListener('click', () => {
    navigateTo('/feed');
  });

  buttonLikes.textContent = 'Likes';
  buttonLikes.addEventListener('click', () => {
    navigateTo('/likes');
  });

  buttonPosts.textContent = 'Post';
  buttonPosts.addEventListener('click', () => {
    navigateTo('/posts');
  });

  buttonProfile.textContent = 'Profile';
  buttonProfile.addEventListener('click', () => {
    navigateTo('/profile');
  });

  // ORGANIZAR CONTENIDOS
  header.append(name, pictureUser, profileName);
  main.append(likesContainer);
  likesContainer.append(likesTitle, likesFeed);
  menuContainer.append(buttonHome, buttonLikes, iconElement, buttonPosts, buttonProfile);
  nav.appendChild(menuContainer);

  section.append(header, main, menuContainer);
  return section;
}

export default likes;
