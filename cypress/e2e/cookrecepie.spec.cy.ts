describe('CookRecipePage Tests', () => {
  const recipe = {
    name: 'Test Recipe',
    cookingTime: '30 minutes',
    description: 'Test description',
    ingredients: ['Ingredient A', 'Ingredient B'],
    steps: [{ description: 'Step 1', time: 4 }],  // 1 minute for simplicity
    imageUrl: 'https://example.com/image.jpg',
  };

  beforeEach(() => {
    const encodedRecipe = encodeURIComponent(JSON.stringify(recipe));
    cy.visit(`http://localhost:3000/recepiedetail?recipe=${encodedRecipe}`);
  });

  it('should render the recipe page', () => {
    cy.get('h1').contains(`Cooking: ${recipe.name}`).should('be.visible');
  });

  it('should display the recipe steps', () => {
    recipe.steps.forEach((step, index) => {
      cy.get('h2').contains(`Step ${index + 1}: ${step.description}`).should('be.visible');
    });
  });

  it('should display ingredients list', () => {
    cy.get('h4').contains('Ingredients:').should('be.visible');
    recipe.ingredients.forEach((ingredient) => {
      cy.get('li').contains(ingredient).should('be.visible');
    });
  });

  it('should display recipe description and total cooking time', () => {
    cy.get('p').contains(recipe.description).should('be.visible');
    cy.get('p').contains(`Total Cooking Time: ${recipe.cookingTime}`).should('be.visible');
  });

  it('should start the timer for the first step', () => {
    // Wait for the component to render the timer
    cy.wait(4000);
    cy.get('h3').contains('Time Remaining:').should('be.visible');
  });

});
