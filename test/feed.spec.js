// // import { render, screen } from '@testing-library/dom';
// Para renderizar elementos en el DOM virtual
/* import {
  db, collection, onSnapshot, getDocs, querySnapshot,
} from 'firebase/firestore'; */ // Importa las funciones de Firestore que usas en tu función
import JSDOMEnvironment from "jest-environment-jsdom";
import feed from '../src/routes/feed.js';
// import { addPost, loadUserPosts } from '../src/routes/posts';

jest.mock('../src/firebase/firebaseConfig');

describe('Deberia cargar los posts de Firebase en el feed', () => {
  it('deberia pintar 1 post cuando hay 1 post en firestore', () => {
    // 1. asegurar condiciones para la prueba
    document.body.innerHTML = '<div id="posts"></div>';
    // 2. ejecutar la funcion que se quiere probar
    feed().loadPosts();
    // 3. confirmaciones
    setTimeout(
      () => {
        const postCard = document.getElementById('post');
        expect(postCard.children).toHaveLength(1);
        done();
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
