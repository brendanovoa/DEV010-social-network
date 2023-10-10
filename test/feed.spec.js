
import { render } from '@testing-library/dom'; // Importa la biblioteca de pruebas DOM
import { collection, doc, setDoc } from 'firebase/firestore'; // Importa las funciones de Firestore necesarias para el mock
import { loadPosts } from '../src/routes/feed'; // Importa la función loadPosts
import { db } from '../src/firebase/firebaseConfig'; // Importa la instancia de Firestore

// Crear un mock de Firestore para simular la carga de datos
jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'), // Importa las funciones reales de Firestore
  collection: jest.fn(),
  onSnapshot: jest.fn(),
}));

// Simula la respuesta de Firestore con un post
const mockSnapshot = {
  docs: [
    {
      id: 'post-1',
      data: () => ({
        userName: 'Usuario de Prueba',
        avatar: 'avatar.png',
        content: 'Contenido de la publicación',
        createdAt: new Date(),
        likes: [],
        likesCount: 0,
      }),
    },
  ],
};

// Configura el comportamiento del mock de Firestore
collection.mockReturnValueOnce({
  onSnapshot: jest.fn((callback) => {
    // Simula el comportamiento de onSnapshot
    callback(mockSnapshot);
  }),
});

describe('Feed', () => {
  it('debería pintar 1 post cuando hay 1 post en Firestore', async () => {
    // Configura un elemento en el DOM para renderizar el feed
    const container = document.createElement('div');
    container.id = 'postContainer';
    document.body.appendChild(container);

    // Llama a la función loadPosts
    await loadPosts(container);

    // Espera un tiempo suficiente para que loadPosts termine (puede ser necesario ajustar esto)
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Verifica que se haya pintado un post en el feed
    const postElement = container.querySelector('.post-card');
    expect(postElement).not.toBeNull();

    // Puedes realizar más aserciones según tus necesidades
  });
});

// import { loadPosts } from '../src/routes/feed';

// jest.mock('../src/firebase/firebaseConfig');

// describe('Deberia cargar los posts de Firebase en el feed', () => {
//   it('deberia pintar 1 post cuando hay 1 post en firestore', () => {
//     // 1. asegurar condiciones para la prueba
//     document.body.innerHTML = '<div id="posts"></div>';
//     // 2. ejecutar la funcion que se quiere probar
//     loadPosts();
//     // 3. confirmaciones
//     setTimeout(
//         () => {
//           const postCard = document.getElementById('post');
//           expect(postCard.children).toHaveLength(1);
//           done();
//         },
//         1000,
//       );
//     });
//   });
