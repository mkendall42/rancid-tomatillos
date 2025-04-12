// Mock data to use for testing:
import posters from '../fixtures/movie_posters.json'
import details from '../fixtures/movie_details.json' 

//Where is the best place to put these?
Cypress.Commands.add('setPatchIntercept', (index, updatedPosterObject) => {
  //I ended up having to do this one this way (intercept was being lost otherwise - scope issue?)
  cy.intercept("PATCH", `/api/v1/movies/${posters[index].id}`, {
    statusCode: 200,
    body: updatedPosterObject
  })
})

function changePosterVoteCount(index, delta) {
  return {
    "id": posters[index].id,
    "title": posters[index].title,
    "poster_path": posters[index].poster_path,
    "vote_count": posters[index].vote_count + delta
  }
}


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

  describe('Main page - vote count specific tests', () => {
    it('can upvote to increase vote count by one', () => {
      const posterIndex = 1
      const updatedPoster = changePosterVoteCount(posterIndex, 1)

      cy.get('.movie-container').get('.movie-poster').eq(posterIndex).find('.vote-count').should('have.text', posters[posterIndex].vote_count)
  
      //Prepare intercept; then send request to increase vote by one (no need to test return JSON because it's stubbed)
      cy.setPatchIntercept(posterIndex, updatedPoster)
  
      //Check that vote count element increases by one
      cy.get('.movie-poster').eq(posterIndex).find('#up-vote').should('have.class', 'vote-button')
        .click().get('.movie-poster').eq(posterIndex).find('.vote-count').should('have.text', posters[posterIndex].vote_count + 1)
    })

    it('can downvote to decrease vote count by one', () => {
      const posterIndex = 1
      const updatedPoster = changePosterVoteCount(posterIndex, -1)

      cy.get('.movie-container').get('.movie-poster').eq(posterIndex).find('.vote-count').should('have.text', posters[posterIndex].vote_count)
  
      cy.setPatchIntercept(posterIndex, updatedPoster)

      cy.get('.movie-poster').eq(posterIndex).find('#down-vote').should('have.class', 'vote-button')
        .click().get('.movie-poster').eq(posterIndex).find('.vote-count').should('have.text', posters[posterIndex].vote_count - 1)
    })

    it('sad path: movie id does not exist', () => {
      //How would I implement this in any fancier way?  Stubbing seems silly (we're setting it up to fail on purpose);
      //and hitting the real API isn't ideal (though it doesn't change votes at least).
      //For now, hitting the real API:
      cy.request({
        url: "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies",
        method: "PATCH",
        body: { "vote_direction": "up" },
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(404)
      })
    })

    //More tests to potentially implement:
    // - upvote + downvote combo is correct; also does not disturb another movie's stats.  NOTE: is this really needed?  Also, requires click()s without immediate assertions...
    // - sad path: MAYBE - incorrect PATH body gives error.  Note: wouldn't this require an actual API call to really be sure?...
    // - sad path: MAYBE - downvoting when vote count = 0 does nothing (though I think negative votes should be allowed!)
  })

})

describe('Details Page', () => {
  beforeEach(() => {
    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies", {
      statusCode: 200,
      fixture: "movie_posters"
    })

    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/155", {
      statusCode: 200,
      fixture: "movie_details"
    })

    cy.visit('http://localhost:3000/')
  })

	it('has the details for the movie', () =>{
		cy.get('.details-button').first().click()
		.get('h3').should('have.text', 'Overview')
		.get('.genre-tag').first().should('have.text', 'Animation')
	})

	it('has the details for the movie', () =>{
		cy.get('.details-button').first().click()
		cy.get('.home-button').click()
    .get('.movie-poster').should('have.length', 4)
	})
})

describe('Invalid Page', () => {
  it('Returns error message if invalid page is visited', () => {
    cy.visit("http://localhost:3000/potato")
      .get('.error-page').should('have.text', 'Movie not found')
  })

  it('Return error message for additional routing paths (i.e. after valid movie id', () => {
    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/155", {
      statusCode: 200,
      fixture: "movie_details"
    })

    cy.visit("http://localhost:3000/155/banana")
    .get('h1').contains('rancid tomatillos')
    .get('.error-page').should('have.text', 'Movie not found')
  })
})
