import {
  collection, getDocs, addDoc, serverTimestamp,
} from 'firebase/firestore';
import { db, auth, onGetPosts } from '../firebase/firebaseConfig';
import iconoNav from '../assets/iconoBlanco.png';
import iconoProfile from '../assets/person_FILL0_wght400_GRAD0_opsz24.png';

// Crear una card que contenga cada post
function createPostCard(content, userName, avatar, postDate) {
  const card = document.createElement('div');
  card.classList.add('post-card');
  const contentElement = document.createElement('p');
  const postUser = document.createElement('p');
  const dateElement = document.createElement('p');
  const photo = document.createElement('img');
  contentElement.classList.add('post');
  contentElement.textContent = content;
  // Aquí agregar los campos de usuario y fecha
  postUser.textContent = `Usuario: ${userName}`;
  dateElement.textContent = `Fecha de creación: ${postDate}`;
  photo.src = avatar;
  card.appendChild(contentElement, dateElement, postUser, photo);
  return card;
}

// Cargar posts de Firestore
function loadPosts(myPosts) {
  console.log(myPosts);
  onGetPosts((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const postData = doc.data(); // Transforma objeto de Firebase a objeto de JS
      const postCard = createPostCard(
        postData.content,
        postData.userName,
        postData.avatar,
        // postData.createdAt.toDate().toLocaleDateString(), // Convierte fecha a una cadena legible
      );
      myPosts.appendChild(postCard);
      console.log(postData);
    });
  });
  // return myPosts;
}

/* Forma anterior de cargar posts sin sincronizacion automática
  // Obtener una referencia a la colección de posts
  const postsCollection = collection(db, 'posts');
  // Realizar una consulta para obtener todos los documentos en la colección
  getDocs(postsCollection)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Para cada documento, crear una tarjeta de post y agregarla al DOM
        const postData = doc.data(); // Transforma objeto de Firebase a objeto de JS
        // doc.data().content);
        const postCard = createPostCard(
          postData.content,
          postData.userName,
          postData.avatar,
          // Convierte fecha a una cadena legible
          postData.createdAt.toDate().toLocaleDateString(),
        );
        myPosts.appendChild(postCard);
        console.log(postCard);
      });
    })
    .catch((error) => {
      console.error('Error al cargar los posts: ', error);
    });
  return myPosts;
} */

// Añadir un post a Firestore
function addPost(avatar, content, userName) {
  return new Promise((resolve, reject) => {
  // al resolver la promesa resolve indica que la promesa se resuelve correctamente,
  // reject  indica que la promesa ha sido rechazada

    const currentUser = auth.currentUser;
    if (!currentUser) {
      reject(new Error('El usuario no está autenticado.'));
      return;
    }

    addDoc(collection(db, 'posts'), {
    // Añade un documento a la colección posts en la base de datos en firestore
    // El primer arg es la ref a post a partir de la bd y el segundo arg es un objeto
    // que contiene los datos del doc que agregaremos
      avatar,
      content,
      userID: currentUser.uid,
      userName,
      createdAt: serverTimestamp(), // Fecha y hora de creación del post
      likesCount: 0, // likes en el post
      sharedCount: 0, // cuántas veces se compartió
    });
    // .then((docRef) => {
    //   console.log('Publicación agregada con ID: ', docRef.id);
    //   resolve(docRef.id);
    // })
    // .catch((error) => {
    //   console.error('Error al agregar la publicación: ', error);
    //   reject(error);
    // });
  });
}

function posts(navigateTo) {
  const section = document.createElement('section');

  const header = document.createElement('div');
  const name = document.createElement('h3');
  const profileName = document.createElement('h4');
  const pictureUser = document.createElement('img');

  const main = document.createElement('main');

  const postContainer = document.createElement('div');
  const postTitle = document.createElement('p');
  const postInput = document.createElement('input');
  const buttonPost = document.createElement('button');

  const myPostsContainer = document.createElement('div');
  const myPostsTitle = document.createElement('p');
  const myPosts = document.createElement('div');

  const nav = document.createElement('nav');
  const menuContainer = document.createElement('div');
  const buttonHome = document.createElement('button');
  const buttonLikes = document.createElement('button');
  const iconElement = document.createElement('img');
  const buttonPosts = document.createElement('button');
  const buttonProfile = document.createElement('button');

  section.id = 'postsSection';
  header.id = 'header';
  name.classList.add('userName');
  main.id = 'main';
  postContainer.id = 'postContainer';
  postTitle.classList.add('titles');
  postInput.classList.add('inputPost');
  buttonPost.id = 'btnPost';

  myPostsContainer.id = 'myPostsContainer';
  myPostsTitle.classList.add('titles');
  menuContainer.id = 'navbar';
  buttonHome.classList.add('material-symbols-outlined');
  buttonLikes.classList.add('btnNav');
  buttonPosts.classList.add('btnNav');
  buttonProfile.classList.add('btnNav');
  buttonProfile.src = iconoProfile;
  iconElement.src = iconoNav;
  iconElement.alt = 'New Wave Icon';
  iconElement.classList.add('iconNav');

  name.textContent = 'NOMBRE USUARIA';
  profileName.textContent = '@nombreperfil';
  pictureUser.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRELckEfR2_SKEtp41AlfomUJHN8l3uqovbtAAFNqcjZQ&s';

  postTitle.textContent = 'CREAR UN POST:';
  postInput.placeholder = 'Escribe tu publicación aquí';
  buttonPost.textContent = 'POST';

  myPostsTitle.textContent = 'TUS POSTS:';

  // Llama a la función loadPosts y pásale myPosts como argumento
  loadPosts(myPosts);

  buttonPost.addEventListener('click', (e) => {
    e.preventDefault();
    myPosts.innerHTML = '';
    const content = postInput.value;
    if (content) {
      // Obtener datos del usuario actual
      const currentUser = auth.currentUser;

      // Verificar si el usuario está autenticado y tiene los datos necesarios
      if (currentUser && currentUser.displayName && currentUser.photoURL) {
        const userName = currentUser.displayName;
        const avatar = currentUser.photoURL;

        // Obtener la fecha actual
        // const currentDate = new Date();

        // Crea la tarjeta del post y agrega al contenedor de tus posts
        // createPostCard(content, userName, avatar, currentDate, myPosts);
        // myPostsContainer.appendChild(postCard);

        addPost(content, userName, avatar)
          .then((postId) => {
            console.log('Publicación agregada con ID: ', postId);
            // Borra el contenido del input después de publicar
            postInput.value = '';

            // Una vez que se ha agregado la publicación, carga nuevamente las publicaciones
            // loadPosts(myPosts);
          })
          .catch((error) => {
            console.error('Error al agregar la publicación: ', error);
          });
      } else {
        console.error('El usuario no está autenticado o falta información necesaria.');
      }
    }
  });

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
  header.appendChild(name, profileName, pictureUser);
  main.append(postContainer, myPostsContainer);
  postContainer.append(postTitle, postInput, buttonPost);
  myPostsContainer.append(myPostsTitle, myPosts);
  menuContainer.append(buttonHome, buttonLikes, iconElement, buttonPosts, buttonProfile);
  nav.appendChild(menuContainer);

  section.append(header, main, menuContainer);
  return section;
}

export default posts;

// import useUser from "hookss/useUser"
// import AppLayout from "components/AppLayout"
// import Button from "components/AppLayouButton"
// import {useState} from 'react' 8.3K
// import {addDevit } from "src/firebaseConfig"
// {useRouter} from "next/router"

// const COMPOSE_SATATES ={
//   USER-nOT_KNOW:0,
//   lOADING: 0,
//   SUCCES: 1,
//   ERROR: -1,
// }

// export default function composeTweet(){
//   const [message, setMessage] = useState("")
//   const [status, setStatus] = useState(Compose_States.User_NOT_KNOWN)
//   const user =useUser()
//   const router = useRouter()

//   const handleChange = (event) => {
//     const {value} = event.target
//     setMessage(value)
//   }
//   const handleSubmit = (event) => {
//     event.preventDefault()
// setStatus(COMPOSE_STATES.LOADING)
//     addDevit({
//       avatar: user.avatar,
//       content: message,
//       userId: user.uid,
//       username: user.userName
// }).then(() =>{
//  router.push('/home')
// }.catch(err=>{
// console.error(err)
// setStatus(COMPOSE_STATES.ERROR)
// })

// const isButtonDisabled = !message.length && status = COMPOSE_STATES.LOADING
// return (
// <>
// <AppLayout>
//   <form onSubmit={handleSubmit}>
//     <textarea
// onChange={handleChange}
// placeholder="¿Qué está pasando?"
// value={message}></textarea>
//     <div>
//       <Button disabled={!message.length}>Devitear</Button>
//     </div>
//   </form>
// </AppLayout>)};
