declare  namespace Cypress {
  interface Chainable {
    resetDbAndClearIsrCache:() => Chainable<null>;
  }
  interface Chainable {
    signIn: (email: string, password: string) => Chainable<null>;
  }
}
