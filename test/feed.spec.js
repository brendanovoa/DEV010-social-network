import { initializeApp } from 'firebase/app';

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import {
  addDoc, deleteDoc, getDoc, onSnapshot, updateDoc,
} from 'firebase/firestore';

import {
  app,
  db,
  auth,
  createUse,
  singIn,
  resetEmail,
  emailVerification,
  googleCount,
  onGetPosts,
  deletePost,
  editPost, 
  stateChanged,
  updatePost,
  addLike,
  removeLike,
} from '../src/firebase/firebaseConfig';

// import addPost from '../src/routes/posts';
// import loadPosts from '../src/routes/feed';
// import * as posts from '../src/routes/posts';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

describe('deletePost', () => {
  it('debería ser una función', () => {
    expect(typeof deletePost).toBe('function');
  });

  it('Deberia llamar a la funcion deleteDoc cuando es ejecutada', async () => {
    await deletePost('bjidjg');
    expect(deleteDoc).toHaveBeenCalled();
  });
});

describe('updatePost', () => {
  test('debería editar post', async () => {
    updateDoc.mockReturnValueOnce({ constainer: 'newText' });
    const response = await updatePost('12345', 'newText');
    expect(response.constainer).toBe('newText');
  });

  test('debería llamar a la función updateDoc cuando es ejecutada', async () => {
    await updatePost('12345', 'newText');
    expect(updateDoc).toHaveBeenCalled();
  });
});

describe('addLike', () => {
  test('debería dar like a post', async () => {
    updateDoc.mockReturnValueOnce({ likes: 'like' });
    const response = await addLike('12345', 'like');
    expect(response.likes).toBe('like');
  });

  test('debería llamar a la función updateDoc cuando es ejecutada', async () => {
    await addLike('add', 'like');
    expect(updateDoc).toHaveBeenCalled();
  });
});

describe('removeLike', () => {
  test('debería quitar like a post', async () => {
    updateDoc.mockReturnValueOnce({ likes: '' });
    const response = await removeLike('add', 'removelike');
    expect(response.likes).toBe('');
  });

  test('debería llamar a la función updateDoc cuando es ejecutada', async () => {
    await removeLike('add', 'removelike');
    expect(updateDoc).toHaveBeenCalled();
  });
});

describe('onGetPosts', () => {
  it('debería ser una función', () => {
    expect(typeof onGetPosts).toBe('function');
  });

  it('Deberia llamar a la funcion onSnapshot cuando es ejecutada', async () => {
    onGetPosts('bjidjg');
    expect(onSnapshot).toHaveBeenCalled();
  });
});

describe('createPost', () => {
  test('debería crear un post', async () => {
    addDoc.mockReturnValueOnce({ container: 'info' });
    const response = createPost('contenido');
    expect(response).toBe();
  });

  test('debería llamar a la función addDoc cuando es ejecutada', async () => {
    addDoc('contenido');
    expect(addDoc).toHaveBeenCalled();
  });
});

describe('inicioGoogle', () => {
  it('debería ser una funciónn que crea cuenta con google', () => {
    expect(typeof signInWithPopup).toBe('function');
  });
});
