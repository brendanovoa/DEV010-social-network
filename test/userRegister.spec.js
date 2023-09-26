import userRegister from '../src/routes/userRegister';
import {

  createUse, emailVerification, googleCount,

} from '../src/firebase/firebaseConfig';

// Creas el mock de todas las funciones
jest.mock('../src/firebase/firebaseConfig', () => ({
  createUse: jest.fn(),
  resetEmail: jest.fn(),
  emailVerification: jest.fn(),
  googleCount: jest.fn(),
}));

// Test que sea una función
describe('userRegister', () => {
  let component;
  beforeEach(() => {
    // Crea el componente y agrega al DOM antes de cada prueba
    document.body.innerHTML = '';
    component = userRegister(() => {});
    document.body.appendChild(component);
  });

  it('debería ser una función', () => {
    expect(typeof userRegister).toBe('function');
  });

  it('returns `La función devuelve un elemento HTML`', () => {
    const result = userRegister(() => {});
    /* deseo pasar una función vacía como argumento para verificar el comportamiento de register */
    expect(result instanceof HTMLElement).toBe(true);
    /* Al ejecutar la función userRegister se crea un elemento HTML */
  });

  it('debería crear los elementos botón y linkLogin en la sección', () => {
    const resultado = userRegister(() => {});
    const buttonRegister = resultado.querySelector('button');
    const linkLogin = resultado.querySelector('.link');

    // Verifica que los elementos existan y tengan el contenido esperado
    expect(buttonRegister).toBeTruthy();
    expect(linkLogin).toBeTruthy();
    expect(resultado.tagName).toBe('SECTION');
    expect(buttonRegister.textContent).toBe('REGISTRARSE');
  });

  it('debería llamar a navigateTo al hacer clic en linkLogin', () => {
    // Crea un mock para la función navigateTo
    const mockNavigateTo = jest.fn();
    // Crea el componente de registro de usuario pasando la función mockNavigateTo
    const component = userRegister(mockNavigateTo);
    // Encuentra el elemento linkLogin dentro del componente
    const linkLogin = component.querySelector('.link');
    // Simula un clic en linkLogin
    linkLogin.click();
    // Verifica que la función navigateTo se haya llamado con la ruta correcta
    expect(mockNavigateTo).toHaveBeenCalledWith('/login');
  });
  
  // Verifica el registro con Google
  it('debería redirigir a /feed después de hacer clic en el botón de registro con Google', async () => {
    // Preparamos el mock
    googleCount.mockResolvedValue({});

    // Crear un spy para la función navigateTo
    const navigateTo = jest.fn();

    // Crear un componente de registro de usuario pasando navigateTo
    const component = userRegister(navigateTo);

    // Simular un clic en el botón de registro
    component.querySelector('.googleButton').click();

    // Esperar a que las promesas se resuelvan (puedes usar await o .then)
    await Promise.resolve();

    // Verificar que la función googleCount se haya llamado
    expect(googleCount).toHaveBeenCalled();

    // Verificar que navigateTo se haya llamado con la URL /feed
    expect(navigateTo).toHaveBeenCalledWith('/feed');
  });

  // Registro y verificación de email

  it('debería registrar un usuario con correo y contraseña válidos', async () => {
    // Preparamos el mock
    createUse.mockResolvedValueOnce({ user: { email: 'correo@example.com' } });

    emailVerification.mockResolvedValue();

    // Simular valores en los campos de correo electrónico y contraseña
    component.querySelector('.input[type="email"]').value = 'correo@example.com';
    component.querySelector('.input[type="password"]').value = 'contraseñaSegura123';

    // Simular clic en el botón de registro
    component.querySelector('#btnLogin').click();

    // Esperar a que las promesas se resuelvan (puedes usar await o .then)
    console.log(createUse);
    // const user = await createUse();
    // console.log(user);
    // createUse().then((user) => {
    //   console.log('Verificando email');
    //   expect(emailVerification).toHaveBeenCalled();
    //   // Verificar que la función emailVerification se haya llamado con el usuario simulado
    //   expect(emailVerification(user)).toHaveBeenCalledWith({
    //     user: { email: 'correo@example.com' },
    //   });
    // });
    return Promise.resolve().then(() => expect(emailVerification).toHaveBeenCalledWith({ user: { email: 'correo@example.com' } }));
  });
});

// Verifica que se crear una cuenta
describe('buttonLogin', () => {
  it('debería llamar a ingresar userRegister al hacer click', () => {
    createUse.mockResolvedValue({});
    // Crea los elementos necesarios para el test
    const component = userRegister();
    component.querySelector('#btnLogin').click();
    expect(createUse).toHaveBeenCalled();
  });
});

// Crear un spy para la función emailVerification
// const emailVerification = jest.spyOn(require('../src/firebase/fConf'), 'emailVerification');
// Crea un mock para la función navigateTo
// const mockNavigateTo = jest.fn();
// Enviamos el formulario dando clic en el botón `Registrarse`.
// component.querySelector('#registerForm').dispatchEvent(new Event('submit'));
// Verificamos visualmente que la aplicación redija a `/feed`.
// return Promise.resolve().then(() => expect(mockNavigateTo).toHaveBeenCalledWith('/feed'));

