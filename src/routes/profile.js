function profile(navigateTo) {
  const section = document.createElement('section');
  const userName = document.createElement('h3');
  const profileName = document.createElement('h4');
  const main = document.createElement('main');
  const textPost = document.createElement('p');
  const boxContainer = document.createElement('div');
  const postInput = document.createElement('input');
  const buttonPost = document.createElement('button');
  const postBoxOne = document.createElement('div');
  const postBoxTwo = document.createElement('div');

  const nav = document.createElement('nav');
  const menuContainer = document.createElement('div');
  const buttonHome = document.createElement('button');
  const buttonLikes = document.createElement('button');
  const iconElement = document.createElement('icon');
  const buttonPosts = document.createElement('button');
  const buttonProfile = document.createElement('button');

  buttonPost.textContent = 'POST';
  // buttonPost.addEventListener('click', () => { /* Guardar y mostrar publicación */
  //   navigateTo('/login');
  // });

  userName.textContent = 'NOMBRE USUARIA';
  profileName.textContent = '@nombreperfil';
  textPost.textContent = 'CREAR UN POST:';
  postInput.textContent = '';

  postBoxOne.textContent = 'Nombre usuario';
  postBoxTwo.textContent = 'Nombre usuario';

  boxContainer.append(postInput, buttonPost, postBoxOne, postBoxTwo);

  main.appendChild(boxContainer);

  buttonHome.textContent = 'Home';
  buttonHome.addEventListener('click', () => {
    navigateTo('/');
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

  menuContainer.append(buttonHome, buttonLikes, iconElement, buttonPosts, buttonProfile);

  nav.appendChild(menuContainer);

  section.append(userName, profileName, textPost, main, nav);
  return section;
}

export default profile;
