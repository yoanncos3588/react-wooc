import "../cypress/commands";
import mock from "../services/mock/mock";
import FormUser from "./FormUser";

const buttonSend = "[data-test-id='btn-send-data']";

function populateForm() {
  for (const key in mock.user.complete) {
    if (key === "billingcountry" || key === "shippingcountry") {
      cy.get(`[data-test-id='${key}']`).click();
      cy.contains("France").then((li) => {
        if (li) {
          li[0].click();
        }
      });
    } else {
      cy.get(`[data-test-id='${key}']`).find("input").type(mock.user.complete[key]);
    }
  }
}

describe("<FormUser />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FormUser />);
  });
  it("should enable and disable create account button", () => {
    cy.mount(<FormUser />);
    cy.get(buttonSend).should("have.attr", "disabled");
    populateForm();
    cy.get(buttonSend).should("not.have.attr", "disabled");
  });
  it("should display success alert", () => {
    cy.mount(<FormUser />);
    cy.intercept("POST", `${import.meta.env.VITE_API_URL_WOO}/customers`, {
      statusCode: 200,
    }).as("signupOK");
    populateForm();
    cy.get(buttonSend).click();
    cy.wait("@signupOK");
    cy.get("[data-test-id='alert-success'").should("be.visible");
  });
  it("should display error alert", () => {
    cy.mount(<FormUser />);
    cy.intercept("POST", `${import.meta.env.VITE_API_URL_WOO}/customers`, {
      statusCode: 400,
    }).as("signupKO");
    populateForm();
    cy.get(buttonSend).click();
    cy.wait("@signupKO");
    cy.get("[data-test-id='alert-error'").should("be.visible");
  });
});
