// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import addPost from '../src/routes/posts';

describe('addPost', () => {
  it('Agrega un post', async () => {
    const mockPostData = {
      content: 'Este es un nuevo post',
    };

    const postId = addPost(mockPostData);

    expect(postId).toBeDefined();
  });
});
