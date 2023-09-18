// importamos la funcion que vamos a testear
import home from '../src/routes/home';

describe('home', () => {
  it('debería ser una función', () => {
    expect(typeof home).toBe('function');
  });

  it('returns `La función devuelve un elemento HTML`', () => {
    const result = home(() => {});
    /* deseo pasar una función vacía como argumento para verificar el comportamiento de home */
    expect(result instanceof HTMLElement).toBe(true);
    /* La expresión instanceof en JavaScript se utiliza para comprobar si un objeto es una
    instancia de una clase o constructor específico. */
  });
});

// const url = 'https://github.com/mrdulin';
//     jest.spyOn(document, 'createElement').mockReturnValueOnce(new Link('mock link'));
//     const link = createLink(url);
//     expect(link).toBeInstanceOf(Link);
//     expect(link.href).toBe(url);
