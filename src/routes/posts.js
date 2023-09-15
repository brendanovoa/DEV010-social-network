function posts(navigateTo) {
  const section = document.createElement('section');
  const userName = document.createElement('h3');
  const profileName = document.createElement('h4');
  const pictureUser = document.createElement('img');
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
  const iconElement = document.createElement('img');
  const buttonPosts = document.createElement('button');
  const buttonProfile = document.createElement('button');

  buttonPost.textContent = 'POST';
  // buttonPost.addEventListener('click', () => { /* Guardar y mostrar publicación */
  //   navigateTo('/login');
  // });

  userName.textContent = 'NOMBRE USUARIA';
  profileName.textContent = '@nombreperfil';
  pictureUser.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRELckEfR2_SKEtp41AlfomUJHN8l3uqovbtAAFNqcjZQ&s';
  postBoxOne.textContent = 'Nombre usuario';
  textPost.textContent = 'CREAR UN POST:';
  postInput.textContent = '';

  postBoxOne.textContent = 'Nombre usuario';
  postBoxTwo.textContent = 'Nombre usuario';

  boxContainer.append(postInput, buttonPost, postBoxOne, postBoxTwo);

  main.appendChild(boxContainer);



  buttonHome.textContent = 'Home';
  buttonHome.addEventListener('click', () => {
    navigateTo('/feed');
  });

  buttonLikes.textContent = 'Likes';
  buttonLikes.addEventListener('click', () => {
    navigateTo('/likes');
  });

  iconElement.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaIPll5loKV42Ittli3src1E0pZ3MBFig_XA&usqp=CAU';

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


  section.append(userName, profileName, pictureUser, textPost, main, nav);
  return section;
}

export default posts;
