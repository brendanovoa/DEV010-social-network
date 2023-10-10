// import { async } from 'regenerator-runtime';
import { deletePost } from '../src/firebase/firebaseConfig';
import addPost from '../src/routes/posts';

/* jest.mock('../src/firebase/firebaseConfig', () => ({
  deletePost: jest.fn(),
})); */

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
  it('Elimina un post', async () => {
    const mockDeleteData = {
      content: 'Quiero eliminar este post',
    };

    const postId = deletePost(mockDeleteData);

    expect(postId).toBeDefined();
  });
});
