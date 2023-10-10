// import { render, screen } from '@testing-library/dom';
// Para renderizar elementos en el DOM virtual
/* import {
  db, collection, onSnapshot, getDocs, querySnapshot,
} from 'firebase/firestore'; */ // Importa las funciones de Firestore que usas en tu función
import { loadPosts } from '../src/routes/feed';
// import { addPost, loadUserPosts } from '../src/routes/posts';

jest.mock('../src/firebase/firebaseConfig');
// Mock si se importa desde firestore
/* jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  onSnapshot: jest.fn(),
  getDocs: jest.fn(),
  querySnapshot: jest.fn(),
})); */
// Mock si se importa desde firebaseConfig
/* jest.mock('../src/firebase/firebaseConfig', () => ({
  db: {
    collection: jest.fn(() => ({
      onSnapshot: jest.fn(),
    })),
  },
})); */

describe('loadPosts', () => {
  // Antes de cada prueba, crea un div con un ID específico para simular el contenedor del muro
  let muro;

  beforeEach(() => {
    muro = document.createElement('div');
    muro.id = 'myPosts';
    document.body.appendChild(muro);
  });

  // Después de cada prueba, elimina el contenedor del muro creado anteriormente
  afterEach(() => {
    document.body.removeChild(muro);
  });

  it('debería cargar las publicaciones desde Firestore y mostrarlas en el muro', () => {
    // Supongamos que tienes una función de Firestore mockeada que devuelve datos simulados
    // Puedes utilizar jest.fn() para crear función mock de Firestore para collection y onSnapshot
    const firestoreMock = {
      collection: jest.fn(() => ({
        onSnapshot: jest.fn(callback => {
          // Simular datos de publicaciones en Firestore
          const fakeData = [
            { id: 'post1', avatar: 'avatar1.jpg', content: 'Publicación 1' },
            { id: 'post2', avatar: 'avatar2.jpg', content: 'Publicación 2' },
          ];

          // Llamar al callback con los datos simulados
          callback(fakeData);
        }),
      })),
    };

    // Llamar a la función loadPosts pasando el muro como argumento
    loadPosts(muro, firestoreMock);

    // Verificar que las publicaciones se hayan cargado y mostrado correctamente
    const postElements = muro.querySelectorAll('.post-card');
    expect(postElements.length).toBe(2); // Debería haber 2 tarjetas de publicación

    // Puedes realizar más verificaciones específicas según tu implementación
    // Por ejemplo, verificar que las imágenes, contenidos, etc., coincidan con los datos simulados.
  });
});

/*
describe('Prueba para loadPosts', () => {
  beforeEach(() => {
    // Restablece los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  it('Debería cargar y mostrar tarjetas de usuario', async () => {
    // Mock de datos de ejemplo que simula la respuesta de Firestore
    const mockData = [
      { id: '1', content: 'Primer post' },
      { id: '2', content: 'Segundo post' },
    ];

    // Mock de la función getDocs de Firestore
    getDocs.mockResolvedValue({ docs: mockData });

    // Ejecuta la función que deseas probar
    await loadPosts();

    // Verifica que se haya llamado a las funciones de Firestore correctamente
    expect(collection).toHaveBeenCalledWith(expect.anything(), 'posts'); 
    // Verifica que se haya llamado a collection con los argumentos correctos
    expect(getDocs).toHaveBeenCalled(); // Verifica que se haya llamado a getDocs

    // Verifica que las tarjetas se hayan mostrado en el DOM
    expect(screen.getByText('Primer post')).toBeInTheDocument();
    expect(screen.getByText('Segundo post')).toBeInTheDocument();
  });
});

describe('Deberia cargar los posts de Firebase en el feed', () => {
  it('deberia pintar 1 post cuando hay 1 post en firestore', () => {
    // 1. asegurar condiciones para la prueba
    document.body.innerHTML = '<div id="myPosts"></div>';
    // 2. ejecutar la funcion que se quiere probar
    loadPosts();
    // 3. confirmaciones
    setTimeout(
      () => {
        const posts = document.getElementById('posts');
        expect(posts.children).toHaveLength(1);
      },
      1000,
    );
  });
});

describe('loadPosts', () => {
  it('debería cargar las publicaciones correctamente', () => {
    const mockOnSnapshot = jest.fn();
    const muroMock = document.createElement('div');

    // Mockea el comportamiento de onSnapshot
    db.collection.mockReturnValue({ onSnapshot: mockOnSnapshot });

    // Llama a la función que estás probando
    loadPosts(muroMock);

    // Simula una actualización de Firestore (puedes ajustar los datos según tus necesidades)
    const snapshotData = {
      docs: [
        { data: () => ({ id: 'post1', content: 'Contenido 1' }) },
        { data: () => ({ id: 'post2', content: 'Contenido 2' }) },
      ],
    };

    mockOnSnapshot.mock.calls[0][0](snapshotData); // Llama función callback en onSnapshot

    // Verifica que la función haya llamado a onSnapshot y actualizado el contenido en muroMock
    expect(db.collection).toHaveBeenCalledWith('posts');
    expect(mockOnSnapshot).toHaveBeenCalled();
    expect(muroMock.innerHTML).toContain('Contenido 1');
    expect(muroMock.innerHTML).toContain('Contenido 2');
  });
});

*/
