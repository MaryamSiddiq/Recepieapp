describe('HomePage Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/uicomponent'); // Adjust URL as per your application setup
    });
  
    it('should add a new recipe', () => {
      // Fill out the form
      cy.get('input[type="text"]').eq(0).type('New Recipe Name');
      cy.get('input[type="text"]').eq(1).type('30 minutes');
      cy.get('textarea').eq(0).type('Test description for new recipe');
      
      // Add ingredients
      cy.get('input[type="text"]').eq(2).type('Ingredient 1');
      cy.get('button').contains('Add Ingredient').click();
      cy.get('input[type="text"]').eq(3).type('Ingredient 2');
      
      // Add steps
      cy.get('textarea').eq(1).type('Step 1');
      cy.get('input[type="number"]').eq(0).type('10');
      cy.get('button').contains('Add Step').click();
      cy.get('textarea').eq(2).type('Step 2');
      cy.get('input[type="number"]').eq(1).type('15');
      
      // Upload an image
      const fileName = 'background.jpg';
      
      // Load file content using cy.fixture
      cy.fixture(fileName, 'binary').then((fileContent) => {
        // Convert binary string to Blob
        const blob = Cypress.Blob.binaryStringToBlob(fileContent, 'image/jpeg');
        
        // Create a File object
        const testFile = new File([blob], fileName, { type: 'image/jpeg' });
        
        // Mock file input and trigger change event
        cy.get('input[type="file"]').then(($input) => {
          // Attach the file to the input
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
          
          // Use type assertion to inform TypeScript about the input type
          const input = $input[0] as HTMLInputElement;
          input.files = dataTransfer.files;
          
          // Trigger the change event
          cy.wrap($input).trigger('change', { force: true });
        });
      });
      
      // Submit the form
      cy.get('form').submit();
      
      // Wait for the form submission to complete and assert the new recipe is added
    });
  
    it('should display the uploaded image', () => {
      // Upload an image
      const fileName = 'background.jpg';
  
      // Load file content using cy.fixture
      cy.fixture(fileName, 'binary').then((fileContent) => {
        // Convert binary string to Blob
        const blob = Cypress.Blob.binaryStringToBlob(fileContent, 'image/jpeg');
  
        // Create a File object
        const testFile = new File([blob], fileName, { type: 'image/jpeg' });
  
        // Mock file input and trigger change event
        cy.get('input[type="file"]').then(($input) => {
          // Attach the file to the input
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
  
          // Use type assertion to inform TypeScript about the input type
          const input = $input[0] as HTMLInputElement;
          input.files = dataTransfer.files;
  
          // Trigger the change event
          cy.wrap($input).trigger('change', { force: true });
        });
      });
  
      // Verify the image is displayed
      cy.get('img').should('be.visible');
    });
   
  });
  