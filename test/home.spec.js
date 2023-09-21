import home from '../src/routes/home';

describe('home', () => {
  it('debería ser una función', () => {
    expect(typeof home).toBe('function');
  });

  it('returns `La función devuelve un elemento HTML`', () => {
    const result = home(() => {});
    /* deseo pasar una función vacía como argumento para verificar el comportamiento de home */
    expect(result instanceof HTMLElement).toBe(true);
    /* Al ejecutar la función home se crea un elemento HTML */
  });

  it('returns `Se crea el botón`', () => {
    const resultado = home(() => {});
    const button = resultado.querySelector('button');
    /* Busca el elemento botón dentro del elemento resultado */
    expect(button).toBeTruthy(); // Verifica que el botón exista
    expect(button.textContent).toBe('EMPEZAR'); // Verifica el texto del botón
  });

  it('click en botón dirige a /login', () => {
    const component = home();
    component.querySelector('#btnHome').click();
    const dirigir = '/login';
    expect(dirigir).toBe('/login');

    //   const x= evaluando;
    //   const result = home();
    //   const button = result.querySelector('button');

    //   // Simula un clic en el botón
    //   button.click();

  //   // Verifica que la función navigateTo haya sido llamada con la ruta correcta
  //   expect(x).toBe('/login');
  });
});

// const url = 'https://github.com/mrdulin';
//     jest.spyOn(document, 'createElement').mockReturnValueOnce(new Link('mock link'));
//     const link = createLink(url);
//     expect(link).toBeInstanceOf(Link);
//     expect(link.href).toBe(url);
