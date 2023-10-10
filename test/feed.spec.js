import { loadPosts } from '../src/routes/feed';

jest.mock('../src/firebase/firebaseConfig');

describe('Deberia cargar los posts de Firebase en el feed', () => {
  it('deberia pintar 1 post cuando hay 1 post en firestore', () => {
    // 1. asegurar condiciones para la prueba
    document.body.innerHTML = '<div id="posts"></div>';
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
