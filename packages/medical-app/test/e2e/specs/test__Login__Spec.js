/*
  global page
*/

// TODO: Create PageObjects to target elements in the page. (Based on data-bdd or similar attribute)
describe('Login Page', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:8000/');
  });

  it('should display welcome message on the page', async () => {
    await expect(page).toMatch('Bienvenido');
    await expect(page).toMatch('Por favor ingresa tus credenciales para continuar');
  });

  it('should display error message on bad login attempt', async () => {
    await page.type('input[type="email"]', 'some.weird@username.com');
    await page.type('input[type="password"]', 'temporal123');
    await page.click('button');
    await expect(page).toMatch('password incorrecto');
  });

  it('should login in and redirect to patients list page', async () => {
    await page.type('input[type="email"]', 'jaycorpstudios@me.com');
    await page.type('input[type="password"]', 'temporal');
    await page.click('button');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await expect(page).toMatch('Listado de pacientes');
  });
});
