import {
  collection, addDoc, serverTimestamp, onSnapshot,
} from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import iconoNav from '../assets/iconoBlanco.png';

function feed(navigateTo) {
  const section = document.createElement('section');

  const header = document.createElement('div');
  const name = document.createElement('h3');
  const profileName = document.createElement('h4');
  const pictureUser = document.createElement('img');
  const textSignoff = document.createElement('span');
  const buttonSignoff = document.createElement('img');

  const main = document.createElement('main');

  const postContainer = document.createElement('div');
  const postTitle = document.createElement('p');

  const nav = document.createElement('nav');
  const menuContainer = document.createElement('div');
  const buttonHome = document.createElement('button');
  const buttonLikes = document.createElement('button');
  const iconElement = document.createElement('img');
  const buttonPosts = document.createElement('button');
  const buttonProfile = document.createElement('button');

  section.id = 'feedSection';
  header.id = 'header';
  name.classList.add('userName');
  profileName.classList.add('profileName');
  pictureUser.classList.add('pictureUser');
  main.id = 'main';
  postContainer.id = 'postContainer';
  postTitle.classList.add('titles');

  menuContainer.id = 'navbar';
  buttonHome.classList.add('btnNav');
  buttonLikes.classList.add('btnNav');
  buttonPosts.classList.add('btnNav');
  buttonProfile.classList.add('btnNav');
  iconElement.src = iconoNav;
  iconElement.alt = 'New Wave Icon';
  iconElement.classList.add('iconNav');

  name.textContent = 'NOMBRE USUARIA'; /* `${data.userName}` */
  profileName.textContent = '@nombreperfil';
  pictureUser.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRELckEfR2_SKEtp41AlfomUJHN8l3uqovbtAAFNqcjZQ&s';

  postTitle.textContent = 'LO QUE SE DICE EN NEW WAVE:';

  textSignoff.textContent = 'Cerrar sesión';
  textSignoff.classList.add('specialText');
  buttonSignoff.src = 'https://www.figma.com/file/K4Ic5apfeJUPRqoDzLCWua/PROTOTIPOS-RED-SOCIAL?type=design&node-id=147-3576&mode=design&t=OxymJJpKjP2TEVtV-4';
  buttonSignoff.classList.add('buttonSignoff');
  buttonSignoff.addEventListener('click', () => {
    navigateTo('/login');
  });

  // Asignar la imagen de perfil desde la cuenta de Google
  // const googleUser = googleCount.currentUser;
  // if (googleUser) {
  //   const photoURL = googleUser.photoURL;
  //   if (photoURL) {
  //     pictureUser.src = photoURL;
  //   }
  // }

  // auth.currentUser.photoURL ? auth.currentUser.photoURL : 'https://img.freepik.com/vector-gratis/ilustracion-icono-avatar-usuario_53876-5907.jpg?w=826&t=st=1695778431~exp=1695779031~hmac=d4122e27770a7ad67f3ab2561940aeaed1aefd69914d149cf76a9928d1f5bd8c';
  // pictureUser.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRELckEfR2_SKEtp41AlfomUJHN8l3uqovbtAAFNqcjZQ&s';

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
  header.append(name, pictureUser, profileName, textSignoff, buttonSignoff);
  main.append(postContainer);
  postContainer.append(postTitle);
  menuContainer.append(buttonHome, buttonLikes, iconElement, buttonPosts, buttonProfile);
  nav.appendChild(menuContainer);

  section.append(header, main, menuContainer);
  return section;
}

// useEffect(() => {
//   user && fechLatestPots().then(setTimeline)
//     });
// }, [user];

// return (
//   <>
//   <AppLayout>
//     <section>
//       {timeline.map(({ id, username, avatar, content }) => (
//         <posts
//         avatar={avatar}
//         createAt={createdAt}
//         id={id}
//         key={id}
//         content={content}
//         userName={username}
//         userID={userId}
//         />
//       ))}
//       </section>

//       </AppLayout>

export default feed;
