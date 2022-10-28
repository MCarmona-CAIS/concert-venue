import { generateNewBand } from "@/__tests__/__mocks__/fakeData/newBand";
import { generateNewShow } from "@/__tests__/__mocks__/fakeData/newShow";
import { generateRandomId } from "@/lib/features/reservations/utils";

it("Should load refreshed page from cache after new band is added", () => {
  // check that the new band is not on page
  cy.task("db:reset").visit("/bands");
  cy.findByRole("heading", { name: /avalanche of cheese/i }).should("not.exist");
  // add new band via post request to api
  const bandId = generateRandomId();
  const newBand = generateNewBand(bandId);
  const secret = Cypress.env("REVALIDATION_SECRET");

  cy.request("POST", `/api/bands?secret=${secret}`, { newBand })
    .then((response) => expect(response.body.revalidated).to.equal(true));

  // reload page; new band should appear
  cy.reload();
  cy.findByRole("heading", { name: /avalanche of cheese/i }).should("exist");

  // reset ISR to initial db conditions
  cy.resetDbAndClearIsrCache();
});

it("Should load refreshed page from cache after new show is added", () => {
  // check that the new band is not on page
  cy.task("db:reset").visit("/shows");
  cy.findByRole("heading", { name: /avalanche of cheese/i }).should("not.exist");
  // add new band via post request to api
  const showId = generateRandomId();
  const newShow = generateNewShow(showId);
  const secret = Cypress.env("REVALIDATION_SECRET");

  cy.request("POST", `/api/shows?secret=${secret}`, { newShow })
    .then((response) => expect(response.body.revalidated).to.equal(true));

  // reload page; new band should appear
  cy.reload();
  cy.findByRole("heading", { name: /avalanche of cheese/i }).should("exist");

  // reset ISR to initial db conditions
  cy.resetDbAndClearIsrCache();
});

export {};