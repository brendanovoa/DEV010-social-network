import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// vamos añadir un post
function addPost({
  avatar, content, userID, userName,
}) {
  return new Promise((resolve, reject) => {
  // al resolver la promesa resolve indica que la promesa se resuelve correctamente,
  // reject  indica que la promesa ha sido rechazada

    addDoc(collection(db, 'posts'), {
    // Añade un documento a la colección posts en la base de datos en firestore
    // El primer arg es la ref a post a partir de la bd y el segundo arg es un objeto
    // que contiene los datos del doc que agregaremos
      avatar,
      content,
      userID,
      userName,
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

  buttonPost.addEventListener('click', () => {
    const content = postInput.value;
    if (content) {
      addPost({
        avatar: 'URL_DEL_AVATAR',
        content,
        userID: 'ID_DEL_USUARIO',
        userName: 'Nombre de usuario',
      })
        .then((postId) => {
          console.log('Publicación agregada con ID: ', postId);
          // Borra el contenido del input después de publicar
          postInput.value = '';
          const post = document.createElement('div');
          post.textContent = postInput.value;
        })
        .catch((error) => {
          console.error('Error al agregar la publicación: ', error);
        });
    }
  });

  userName.textContent = 'NOMBRE USUARIA';
  profileName.textContent = '@nombreperfil';
  pictureUser.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRELckEfR2_SKEtp41AlfomUJHN8l3uqovbtAAFNqcjZQ&s';
  postBoxOne.textContent = 'Nombre usuario';
  textPost.textContent = 'CREAR UN POST:';
  postInput.placeholder = 'Escribe tu publicación aquí';

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
