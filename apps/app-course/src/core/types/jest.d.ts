import '@types/jest';

declare global {
    // Asegura que los tipos de Jest estén disponibles globalmente
    const describe: jest.Describe;
    const it: jest.It;
    const test: jest.It;
    const expect: jest.Expect;
    const beforeAll: jest.Lifecycle;
    const beforeEach: jest.Lifecycle;
    const afterAll: jest.Lifecycle;
    const afterEach: jest.Lifecycle;
    const jest: jest.Jest;
}