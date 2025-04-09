// Mock data to use for testing:
import posters from '../fixtures/movie_posters.json'
// import details from '../fixtures/movie_details.json' 

describe('Main Page', () => {
  beforeEach(() => {
    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies", {
      statusCode: 200,
      fixture: "movie_posters"
    })
    cy.visit('http://localhost:3000/')

	})

  it('displays title on page load', () => {
    // hint: you'll want to add an intercept here if you are making a network request on page load!
    cy.get('h1')
    .contains('rancid tomatillos')
  })

	it('displays all movie posters', () => {
    cy.get('.movie-container').should('exist')
    .get('.movie-poster').should('have.length', 4)
	})

  it('has correct first and last movie posters', () => {
    cy.get('.movie-container').should('exist')
    .get('.movie-poster').first().find('h3').should('have.text', 'The Dark Knight')
    .get('.movie-poster').first().find('img').should('exist')
    .get('.movie-poster').first().find('.vote-count').should('have.text', '32544')
    .get('.movie-poster').last().find('h3').should('have.text', 'Pulp Fiction')
    .get('.movie-poster').last().find('img').should('exist')
    .get('.movie-poster').last().find('.vote-count').should('have.text', '27642')
  })
})


