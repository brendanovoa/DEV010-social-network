// import { async } from 'regenerator-runtime';
import { initializeApp } from 'firebase/app';
import { deleteDoc } from 'firebase/firestore';
import { addPost } from '../src/routes/posts';
import { deletePost } from '../src/firebase/firebaseConfig';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

describe('addPost', () => {
  it('Agrega un post', async () => {
    const mockPostData = {
      content: 'Este es un nuevo post',
    };

    const postId = addPost(mockPostData);

    expect(postId).toBeDefined();
  });
});

describe('deletePost', () => {
  it('debería ser una función', () => {
    expect(typeof deletePost).toBe('function');
  });

  it('Deberia llamar a la funcion deleteDoc cuando es ejecutada', async () => {
    await deletePost('bjidjg');
    expect(deleteDoc).toHaveBeenCalled();
  });
});
