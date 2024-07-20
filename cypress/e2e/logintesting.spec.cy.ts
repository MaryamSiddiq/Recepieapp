// cypress/integration/loginForm.spec.ts

describe('LoginForm Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should render the login form', () => {
    cy.get('form').should('exist');
  });

  it('should allow input for email and password', () => {
    cy.get('input[type="email"]').type('test@example.com').should('have.value', 'test@example.com');
    cy.get('input[type="password"]').type('password').should('have.value', 'password');
  });

  it('should toggle password visibility', () => {
    cy.get('input[type="password"]').should('have.attr', 'type', 'password');
    cy.get('span').contains('👁️').click();
    cy.get('input[id="password"]').should('have.attr', 'type', 'text');
    cy.get('span').contains('👁️').click();
    cy.get('input[id="password"]').should('have.attr', 'type', 'password');
  });
  it('should submit the form and redirect to the homepage', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password');
    cy.get('button[type="submit"]').click();
  
    // Wait for the URL to include '/HomePage'
    cy.url().should('include', '/HomePage');
  });
  

  it('should display logo, headings, and input fields correctly', () => {
    cy.get('img[alt="Logo"]').should('be.visible');
    cy.get('h3').should('contain', 'Continue by Logging In');
    cy.get('label[for="email"]').should('contain', 'Email');
    cy.get('label[for="password"]').should('contain', 'Password');
    cy.get('h4').should('contain', 'Already have an account?');
  });
});
