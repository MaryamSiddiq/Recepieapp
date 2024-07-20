// cypress/integration/homePage.spec.ts

describe('HomePage Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/HomePage');
    });
  
    it('should display the navbar', () => {
      cy.get('.header').should('exist');
    });
  
    it('should display the recipe categories heading', () => {
      cy.get('h1').should('contain', 'Recipe Categories');
    });
    it('should display initial categories correctly', () => {
      const initialCategories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert'];
      initialCategories.forEach(category => {
        cy.get('h3').contains(category).should('be.visible');
      });
    });
  
    it('should allow adding a new category', () => {
      const newCategoryName = 'Snacks';
      const newCategoryImagePath = 'background.jpg'; // Ensure you have an image file at this path
  
      // Upload a new category
      cy.get('input[placeholder="Enter new category name"]').type(newCategoryName);
  
      cy.fixture(newCategoryImagePath, 'binary').then((fileContent) => {
        // Convert binary string to Blob
        const blob = Cypress.Blob.binaryStringToBlob(fileContent, 'image/jpeg');
  
        // Create a File object
        const testFile = new File([blob], newCategoryImagePath, { type: 'image/jpeg' });
  
        // Mock file input and trigger change event
        cy.get('input[type="file"]').then(($input) => {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
          const input = $input[0] as HTMLInputElement;
          input.files = dataTransfer.files;
          cy.wrap($input).trigger('change', { force: true });
        });
      });
  
      cy.wait(1000); // Wait for the file to be processed
      cy.get('button').contains('Add Category').click();
    
      // Verify the new category is added
      cy.get('h3').contains(newCategoryName).should('be.visible');
    });
  
  
    it('should navigate to the uicomponent page when clicking on a category', () => {
      cy.get('a').first().click();
      cy.wait(1000); // Adjust wait time as necessary
      cy.url().should('include', '/uicomponent');
    });
    
});
