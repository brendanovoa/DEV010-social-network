import UserRegister from '../src/routes/userRegister';
import { createUse } from '../src/firebase/firebaseConfig';

// Creas el mock de todas las funciones
jest.mock('../src/firebase/firebaseConfig', () => ({
  createUse: jest.fn(),
}));
// Test de funcion para crear cuenta
describe('buttonLogin', () => {

  it('debería llamar a ingresar UserRegister al hacer click', () => {
    createUse.mockResolvedValue({});
    // Crea los elementos necesarios para el test
    const component = UserRegister();
    component.querySelector('#btnLogin').click();
    expect(createUse).toHaveBeenCalled();
  });
});
