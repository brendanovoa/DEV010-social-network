// import JSDOMEnvironment from "jest-environment-jsdom";
import feed from '../src/routes/feed.js';

jest.mock('../src/firebase/firebaseConfig');

return {
    getAuth: jest.fn(),
}

describe('Feed', () => {
  it('deberia pintar 1 post cuando hay 1 post en firestore', (done) => {
    // 1. asegurar condiciones para la prueba
    document.body.innerHTML = '<div id="post"></div>';
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
