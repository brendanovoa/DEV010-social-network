import {
  collection, addDoc, serverTimestamp, onSnapshot,
} from 'firebase/firestore';
import { db, auth } from '../firebase/firebaseConfig';
import iconoNav from '../assets/iconoBlanco.png';
import iconoProfile from '../assets/person_FILL0_wght400_GRAD0_opsz24.png';

// const userLogin = localStorage.getItem('user');
// console.log(userLogin);

// Crear una card que contenga cada post
function createPostCard(data) { /* cambio de content por data */
console.log({ data });
  const card = document.createElement('div');
  card.classList.add('post-card');
  const userNameElement = document.createElement('h3');
  userNameElement.classList.add('user-name');
  userNameElement.textContent = data.userName;
  const contentElement = document.createElement('p');
  contentElement.classList.add('post');
  contentElement.textContent = data.content;
  const hour = data.createdAt.toDate();
  console.log('hora', hour);
  // card.appendChild(userNameElement);
  card.append(userNameElement, contentElement);
  console.log(card); /* muestra el contenido escrito en el posts */
  return card;
}

// Cargar posts de Firestore
function loadPosts(myPosts) {
  // Obtener una referencia a la colección de posts
  const postsCollection = collection(db, 'posts');

  // Realizar una consulta para obtener todos los documentos en la colección
  onSnapshot(postsCollection, (querySnapshot) => {
    myPosts.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const postCard = createPostCard({ ...data, id: doc.id });
      console.log(doc.id);
      // Para cada documento, crear una tarjeta de post y agregarla al DOM
      // const postCard = createPostCard(doc.data().content);
      myPosts.appendChild(postCard);
    });
  });
  //   .catch((error) => {
  //     console.error('Error al cargar los posts: ', error);
  //   });
  // /* console.log(myPosts); crea un div */
  // return myPosts;
}

// Añadir un post a Firestore
function addPost({
  content,
}) {
  return new Promise((resolve, reject) => {
  // al resolver la promesa resolve indica que la promesa se resuelve correctamente,
  // reject  indica que la promesa ha sido rechazada

    addDoc(collection(db, 'posts'), {
    // Añade un documento a la colección posts en la base de datos en firestore
    // El primer arg es la ref a post a partir de la bd y el segundo arg es un objeto
    // que contiene los datos del doc que agregaremos
      avatar: auth.currentUser.photoURL ? auth.currentUser.photoURL : 'urlimagengenerica',
      content,
      userID: auth.currentUser.uid,
      userName: auth.currentUser.displayName,
      createdAt: serverTimestamp(), // Fecha y hora de creación del post
      likesCount: 0, // likes en el post
      sharedCount: 0, // cuántas veces se compartió
    })
      .then((docRef) => {
        console.log('Publicación agregada con ID: ', docRef.id);
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error al agregar la publicación: ', error);
        reject(error);
      });
  });
}

function posts(navigateTo) {
  const section = document.createElement('section');

  const header = document.createElement('div');
  const userName = document.createElement('h3');
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
  userName.classList.add('userName');
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

  userName.textContent = 'NOMBRE USUARIA';
  profileName.textContent = '@nombreperfil';
  pictureUser.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRELckEfR2_SKEtp41AlfomUJHN8l3uqovbtAAFNqcjZQ&s';

  postTitle.textContent = 'CREAR UN POST:';
  postInput.placeholder = 'Escribe tu publicación aquí';
  buttonPost.textContent = 'POST';

  myPostsTitle.textContent = 'TUS POSTS:';
  // Llama a la función loadPosts y pásale myPosts como argumento
  loadPosts(myPosts);

  buttonPost.addEventListener('click', () => {
    const content = postInput.value;
    if (content) {
      // Crea la tarjeta del post y agrega al contenedor de tus posts
      createPostCard(content, myPosts);
      // myPostsContainer.appendChild(postCard);
      console.log(auth.currentUser);

      addPost({
        avatar: auth.currentUser.photoURL ? auth.currentUser.photoURL : 'urlimagengenerica',
        content,
        userID: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
      })
        .then((postId) => {
          // myPosts.innerHTML = '';
          console.log('Publicación agregada con ID: ', postId);
          // Borra el contenido del input después de publicar
          postInput.value = '';
        })
        .catch((error) => {
          console.error('Error al agregar la publicación: ', error);
        });
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
  header.appendChild(userName, profileName, pictureUser);
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

// const isButtonDisabled = !message.length || status = COMPOSE_STATES.LOADING
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

// export const fechLatestPots = () => {
//   return db.collection("posts")
//   .get()
//   .then((snapshot) => {
//     return snapshot.docs.map(doc => {
//       const data= doc.data()
//       const id = doc.id

//       return {
//         ... data,
//         id,
//       }
//     })
//   })
// }
