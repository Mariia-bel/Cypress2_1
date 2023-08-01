const login = require("../fixtures/loginPositive.json");
const booking = require("../fixtures/bookingTickets.json");
const seats = require("../fixtures/seats.json");

it("Should be create and delete hall", () => {
  cy.visit("http://qamid.tmweb.ru/admin");
  cy.get(login.loginField).type(login.login);
  cy.get(login.pwdField).type(login.password);
  cy.get(login.loginButton).click();
  cy.get(booking.createHall).click();
  cy.get(booking.fieldOfHallName).type(booking.hallNameCreate);
  cy.get(booking.buttonOfAcceptHall).click();
  cy.contains(booking.hallNameCreate).should("be.visible").wait(2000);
  cy.get(booking.hallNameDelete).click();
  cy.contains("Удалить").click();
});
it("Should booking tickets", () => {
  cy.visit("http://qamid.tmweb.ru/admin");
  cy.get(login.loginField).type(login.login);
  cy.get(login.pwdField).type(login.password);
  cy.get(login.loginButton).click();
  cy.get(booking.activeFilmInAdmin).then(($film) => {
    const filmName = $film.text();
    cy.visit("http://qamid.tmweb.ru/client/index.php");
    cy.get(booking.selectDay).click();
    cy.get(booking.movie).first().contains("10:00").click();
    seats.forEach((seat) => {
      cy.get(
        `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
      ).click();
    });
    cy.get(booking.acceptSeat).click();
    cy.contains("Вы выбрали билеты:").should("be.visible");
  });
});
