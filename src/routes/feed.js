import { auth, googleCount } from '../firebase/firebaseConfig';

function feed(navigateTo) {
  const section = document.createElement('section');
  const userName = document.createElement('h3');
  const profileName = document.createElement('h4');
  const pictureUser = document.createElement('img');
  const textSignoff = document.createElement('span');
  const buttonSignoff = document.createElement('img');
  const main = document.createElement('main');
  const boxContainer = document.createElement('div');
  const postBoxOne = document.createElement('div');
  const postBoxTwo = document.createElement('div');
  const postBoxThree = document.createElement('div');

  const nav = document.createElement('nav');
  const menuContainer = document.createElement('div');
  const buttonHome = document.createElement('button');
  const buttonLikes = document.createElement('button');
  const iconElement = document.createElement('img');
  const buttonPosts = document.createElement('button');
  const buttonProfile = document.createElement('button');

  buttonSignoff.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQucwe8M3NSHXcUXEtHXegs51MylpBjmPdgrg&usqp=CAU';
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

  userName.textContent = 'NOMBRE USUARIA';
  profileName.textContent = '@nombreperfil';
  textSignoff.textContent = 'Cierra sesión';
  auth.currentUser.photoURL ? auth.currentUser.photoURL : 'https://img.freepik.com/vector-gratis/ilustracion-icono-avatar-usuario_53876-5907.jpg?w=826&t=st=1695778431~exp=1695779031~hmac=d4122e27770a7ad67f3ab2561940aeaed1aefd69914d149cf76a9928d1f5bd8c';
  // pictureUser.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRELckEfR2_SKEtp41AlfomUJHN8l3uqovbtAAFNqcjZQ&s';
  postBoxOne.textContent = 'Nombre usuario';
  postBoxTwo.textContent = 'Nombre usuario';
  postBoxThree.textContent = 'Nombre usuario';

  boxContainer.append(postBoxOne, postBoxTwo, postBoxThree);

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

  section.append(
    userName,
    profileName,
    pictureUser,
    textSignoff,
    buttonSignoff,
    main,
    nav,
    googleCount,
  );
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
