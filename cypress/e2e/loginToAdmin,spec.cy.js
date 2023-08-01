const login = require("../fixtures/login.json");
const goodLogin = require("../fixtures/loginPositive.json");

it("Should login", () => {
  cy.visit("http://qamid.tmweb.ru/admin");
  cy.get('[for="email"] > .login__input').type(goodLogin.login);
  cy.get('[for="pwd"] > .login__input').type(goodLogin.password);
  cy.get(".login__button").click(); //.wait(3000);
  cy.contains("Доступные залы:").should("be.visible");
});
login.forEach((login) => {
  it("Should login with negative login or password ", () => {
    cy.visit("http://qamid.tmweb.ru/admin");
    cy.get('[for="email"] > .login__input').type(login.login);
    cy.get('[for="pwd"] > .login__input').type(login.password);
    cy.get(".login__button").click(); //.wait(3000);
    cy.contains("Ошибка авторизации!").should("be.visible");
  });
});
