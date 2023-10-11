// import { async } from 'regenerator-runtime';

// import { initializeApp } from 'firebase/app';
import { deleteDoc } from 'firebase/firestore';
import { addPost, deletePost } from '../src/routes/posts';
import { auth, db } from '../src/firebase/firebaseConfig';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

describe('addPost Function', () => {
  it('should add a new post', async () => {
    const mockPostData = {
      content: 'This is a new post',
    };

    const postId = await addPost(mockPostData);

    expect(postId).toBeDefined();
  });
});

describe('deletePost Function', () => {
  beforeEach(() => {
    // Realizar configuración previa a las pruebas si es necesario
  });

  afterEach(() => {
    // Limpiar el estado después de cada prueba
  });

  it('should be a function', () => {
    expect(typeof deletePost).toBe('function');
  });

  it('should call deleteDoc when executed', async () => {
    const postId = 'examplePostId';

    await deletePost(postId);

    expect(deleteDoc).toHaveBeenCalledWith(db, `posts/${postId}`);
  });
});
