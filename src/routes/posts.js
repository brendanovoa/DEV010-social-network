import {
  collection, addDoc, onSnapshot, // query,
} from 'firebase/firestore';
import {
  auth, db, deletePost, editPost, updatePost,
} from '../firebase/firebaseConfig';
import iconoNav from '../assets/iconoBlanco.png';
import generalUser from '../assets/general-user.png';
// import { async } from 'regenerator-runtime';
// import btnEditar from '../assets/iconos/icono-editar.png';
// import btnBorrar from '../assets/iconos/icono-cerrar.png';

// const userLogin = localStorage.getItem('user');
// console.log(userLogin);
export const user = auth.currentUser;
console.log(user);

let editStatus = false;
let id = '';

// Crear una card que contenga cada post
function createPostCard(data) { /* cambio de content por data */
  const card = document.createElement('div');
  card.classList.add('post-card');
  const pictureUser = document.createElement('img');
  pictureUser.classList.add('user-img');
  pictureUser.src = data.avatar || generalUser;
  const userNameElement = document.createElement('h3');
  userNameElement.classList.add('user-name');
  userNameElement.textContent = data.userName;
  const contentElement = document.createElement('p');
  contentElement.classList.add('post');
  contentElement.textContent = data.content;
  const dateElement = document.createElement('p');
  dateElement.classList.add('date');
  const date = data.createdAt.toDate();
  // Convierte fecha a una cadena legible
  // console.log('fecha de creación: ', date);
  dateElement.textContent = `${date.toLocaleDateString()}`;
  const buttonEdit = document.createElement('button');
  buttonEdit.classList.add('btn-edit');
  const buttonEditSave = document.createElement('button');
  buttonEditSave.classList.add('btn-editSave');
  const buttonCancel = document.createElement('button');
  buttonCancel.classList.add('btn-cancel');

  const buttonDelete = document.createElement('button');
  buttonDelete.classList.add('btn-delete');
  buttonDelete.textContent = 'Delete';
  buttonDelete.addEventListener('click', () => {
    deletePost(data.id);
  });

  buttonEdit.textContent = 'Edit';

  buttonEdit.addEventListener('click', async () => {
    const postContent = await editPost(data.id);
    console.log(postContent.data());
    // Para cambiar "p" a un textarea
    const textArea = document.createElement('textarea');
    textArea.id = 'editText';
    document.querySelector('.post').replaceWith(textArea);
    document.querySelector('#editText').value = postContent.data().content;

    editStatus = true;
    id = data.id;

    buttonEditSave.textContent = 'Save';
    buttonEditSave.addEventListener('click', () => {
      const updateContent = textArea.value;
      // buttonEditSave.remove();
      // buttonDelete.remove();
      updatePost(data.id, { content: updateContent }) /* revisar si es id, o data.i */

        .then(() => {
          console.log('Post actualizado');
          const newContentElement = document.createElement('p');
          newContentElement.classList.add('post');
          document.querySelector('.post').textContent = textArea.value;
          document.querySelector('#editText').replaceWith(newContentElement);
          editStatus = false;
        })

        .catch((error) => {
          console.error('Error al actualizar el post:', error);
        });
    });

    buttonCancel.textContent = 'Cancel';
    buttonCancel.addEventListener('click', () => {
      const originalContent = postContent.data().content;
      const originalContentElement = document.createElement('p');
      originalContentElement.classList.add('post');
      originalContentElement.textContent = originalContent;
      document.querySelector('#editText').replaceWith(originalContentElement);
      // buttonEditSave.remove(); // debería eliminar el botón "Guardar"
      editStatus = false; // Cancelar la edición
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.appendChild(buttonEditSave);
    buttonContainer.appendChild(buttonCancel);
    document.querySelector('.post-card').appendChild(buttonContainer);
  });

  card.append(pictureUser, userNameElement, dateElement, contentElement, buttonDelete, buttonEdit);
  // console.log(card); /* muestra el contenido escrito en el posts */
  return card;
}

// Cargar posts de Firestore
function loadUserPosts(myPosts) {
  // console.log(auth.currentUser.user.uid);
  const postsCollection = collection(db, 'posts');
  onSnapshot(postsCollection, (querySnapshot) => {
    myPosts.innerHTML = '';
    querySnapshot.forEach((doc) => {
      // console.log(auth.currentUser.uid);
      const data = doc.data(); // Transforma objeto de Firebase a objeto de JS
      if (data.userID === auth.currentUser.uid) {
        const postCard = createPostCard({ ...data, id: doc.id });
        myPosts.appendChild(postCard);
      }
    });
  });
}

/*
function loadUserPosts(myPosts, userUid) {
  // const prueba = doc.data;
  // console.log(prueba);
  const user = auth.currentUser;
  if (user) {
    const userID = user.uid;
    console.log(userID);
    const postsCollection = collection(db, 'posts');

    // Realiza una consulta para obtener solo los posts del usuario actual
    const query = where('userID', '==', userID);

    onSnapshot(postsCollection, (querySnapshot) => {
      myPosts.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.userId === userUid) {
          const postCard = createPostCard({ ...data, id: doc.id });
          myPosts.appendChild(postCard);
        }
      });
    });
  }
} */

// Añadir un post a Firestore
function addPost({
  content,
}) {
  return new Promise((resolve, reject) => {
  // al resolver la promesa resolve indica que la promesa se resuelve correctamente,
  // reject  indica que la promesa ha sido rechazada

    /* const currentUser = auth.currentUser;
    if (!currentUser) {
      reject(new Error('El usuario no está autenticado.'));
      return;
    } */

    addDoc(collection(db, 'posts'), {
    // Añade un documento a la colección posts en la base de datos en firestore
    // El primer arg es la ref a post a partir de la bd y el segundo arg es un objeto
    // que contiene los datos del doc que agregaremos
      avatar: auth.currentUser.photoURL ? auth.currentUser.photoURL : generalUser,
      content,
      userID: auth.currentUser.uid,
      userName: auth.currentUser.displayName,
      createdAt: new Date(), // Fecha y hora de creación del post
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
  profileName.classList.add('profileName');
  pictureUser.classList.add('pictureUser');
  main.id = 'main';
  postContainer.id = 'postContainer';
  postTitle.classList.add('titles');
  postInput.classList.add('inputPost');
  buttonPost.id = 'btnPost';

  myPostsContainer.id = 'myPostsContainer';
  myPostsTitle.classList.add('titles');

  menuContainer.id = 'navbar';
  buttonHome.classList.add('btnNav');
  buttonLikes.classList.add('btnNav');
  buttonPosts.classList.add('btnNav');
  buttonProfile.classList.add('btnNav');
  // buttonProfile.src = iconoProfile;
  iconElement.src = iconoNav;
  iconElement.alt = 'New Wave Icon';
  iconElement.classList.add('iconNav');

  name.textContent = auth.currentUser.displayName;
  /* data.userName; auth.currentUser.displayName; `${data.userName}` */
  profileName.textContent = '@nombreperfil';
  pictureUser.src = auth.currentUser.photoURL ? auth.currentUser.photoURL : generalUser;

  postTitle.textContent = 'CREAR UN POST:';
  postInput.placeholder = 'Escribe tu publicación aquí';
  buttonPost.textContent = 'POST';

  myPostsTitle.textContent = 'TUS POSTS:';

  // Llama a la función loadPosts y pásale myPosts como argumento
  // loadPosts(myPosts, auth.currentUser.uid);
  loadUserPosts(myPosts);

  buttonPost.addEventListener('click', () => {
    const content = postInput.value;
    if (content) {
      // Obtener datos del usuario actual
      // const currentUser = auth.currentUser;

      // Verificar si el usuario está autenticado y tiene los datos necesarios
      /* if (currentUser && currentUser.displayName && currentUser.photoURL) {
        const userName = currentUser.displayName;
        const avatar = currentUser.photoURL; */

      // Crea la tarjeta del post y agrega al contenedor de tus posts
      // createPostCard(content, userName, avatar, myPosts);
      // myPostsContainer.appendChild(postCard);

      addPost({
        avatar: auth.currentUser.photoURL, // ? auth.currentUser.photoURL : 'https://img.freepik.com/vector-gratis/ilustracion-icono-avatar-usuario_53876-5907.jpg?w=826&t=st=1695778431~exp=1695779031~hmac=d4122e27770a7ad67f3ab2561940aeaed1aefd69914d149cf76a9928d1f5bd8c',
        // auth.currentUser.photoURL ? auth.currentUser.photoURL : generalUser;
        content,
        userID: 'ID_DEL_USUARIO', // se usa??
        userName: 'Nombre de usuario',
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
      // Crea la tarjeta del post y agrega al contenedor de tus posts
      // createPostCard(content, myPosts);
      // myPostsContainer.appendChild(postCard);
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
  header.append(name, pictureUser, profileName);
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
