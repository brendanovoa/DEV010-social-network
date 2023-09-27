import login from '../src/routes/login';
// import navigateTo from '../src/main';
import { googleCount, signIn, auth } from '../src/firebase/firebaseConfig';

jest.mock('../src/firebase/firebaseConfig', () => ({
  signIn: jest.fn(),
// googleCount: jest.fn(),
}));

describe('login', () => {
  let dirige = '';

  it('debería ser una función', () => {
    expect(typeof login).toBe('function');
  });

  it('debería crear los elementos botón y linkLogin en la sección', () => {
    const resultado = login(() => {});
    const buttonLogin = resultado.querySelector('button');
    const linkUserRegister = resultado.querySelector('.link');

    // Verifica que los elementos existan y tengan el contenido esperado
    expect(buttonLogin).toBeTruthy();
    expect(linkUserRegister).toBeTruthy();
    expect(resultado.tagName).toBe('SECTION');
    expect(buttonLogin.textContent).toBe('ENTRAR');
  });

  // describe('buttonLogin', () => {
  //   beforeEach(() => {
  //     auth.signIn = jest.fn();
  //     auth.googleCount = jest.fn();
  //   });

  //   it('Autenticación con correo electrónico y contraseña correcta, debería redireccionar a
  // feed', () => {
  //     // preparamos el mock
  //     signIn.mockResolvedValueOnce({ user: { email: 'correo@example.com' } });

  //     // Paso 1: Visualizar el formulario de login.
  //     const loginSection = login();

  //     // Paso 2: Completamos el formulario con un correo electrónico y contraseña correctos.
  //     loginSection.querySelector('.input[type="email"]').value = 'correo@example.com';
  //     loginSection.querySelector('.input[type="password"]').value = 'contraseñaSegura123';

  //     // Paso 3: Enviamos el formulario dando clic en el botón `Login`.
  //     loginSection.querySelector('#loginForm').dispatchEvent(new Event('submit'));

  //     // Paso 4: Verificamos visualmente que la aplicación redija a `/home`.
  //     return Promise.resolve().then(() => expect(navigateTo).toHaveBeenCalledWith('/feed'));
  //   });
  // });
  it('debería llamar a signIn al hacer click', async () => {
  // Configura el mock para que devuelva una promesa resuelta
    signIn.mockResolvedValue({ user: { /* Usuario simulado */ } });

    // Crea los elementos necesarios para el test
    const component = login();
    component.querySelector('#btnLogin').click();

    // Espera a que se resuelva la promesa y verifica si se llamó a la función signIn
    await expect(signIn).toHaveBeenCalled();
  });

  it('Dando click al botón ENTRAR debe dirigirse a /feed', async () => {
    // Crea un mock para la función navigateTo
    const mockNavigateTo = jest.fn();
    signIn.mockResolvedValue({ user: {/* Cuenta simulación */} });
    // Define una función simulada para navigateTo que almacene la ruta a la que se dirigió.
    const component = login(mockNavigateTo);

    // Encuentra el elemento btnlogin dentro del componente
    const btnlogin = component.querySelector('#btnLogin');

    btnlogin.click();

    // Espera a que se resuelva la promesa de signIn
    await Promise.resolve();

    expect(mockNavigateTo).toHaveBeenCalledWith('/feed');
  });

  // it('Dando click en el botón ENTRAR debe dirigirse a /feed', async () => {
  //   function navigateTo(ruta) {
  //     dirige = ruta;
  //   }
  //   const component = login(navigateTo);

  //   // Simular valores en los campos de correo electrónico y contraseña
  //   const emailInput = component.querySelector('.input[type="email"]');
  //   const passwordInput = component.querySelector('.input[type="password"]');
  //   emailInput.value = 'correo@example.com';
  //   passwordInput.value = 'contraseñaSegura123';

  //   // Mock la función signIn para que devuelva un usuario simulado
  //   signIn.mockResolvedValueOnce({ user: { email: 'correo@example.com' } });

  //   const submitButton = component.querySelector('#btnLogin');
  //   submitButton.click();

  //   // Espera un breve momento para que la
  //   expect(dirige).toBe('/feed');
  // });

  describe('buttonGoogle', () => {
    it('debería llamar a googleCount al hacer click', async () => {
      // Configura el mock para que devuelva una promesa resuelta
      googleCount.mockResolvedValue({ user: { /* Usuario simulado */ } });

      // Crea los elementos necesarios para el test
      const component = login();
      component.querySelector('.googleButton').click();

      // Espera a que se resuelva la promesa y verifica si se llamó a la función googleCount
      await expect(googleCount).toHaveBeenCalled();
    });
  });

  it('Dando click al botón debe dirigirse a /userRegister', () => {
    function navigateTo(ruta) {
      // Define una función simulada para navigateTo que almacene la ruta a la que se dirigió.
      dirige = ruta;
    }
    const component = login(navigateTo);
    component.querySelector('.link').click();
    expect(dirige).toBe('/userRegister');
  });
});
