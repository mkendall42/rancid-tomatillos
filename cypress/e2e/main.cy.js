// Mock data to use for testing:
import posters from '../fixtures/movie_posters.json'
// import details from '../fixtures/movie_details.json' 

//Where is the best place to put these?
function setPatchIntercept(index, updatedPosterObject) {
  //NOTE: this doesn't seem to work inside a given test
  cy.intercept("PATCH", `/api/v1/movies/${posters[index].id}`, {
    statusCode: 200,
    body: updatedPosterObject
  })
}

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
      // setPatchIntercept(posterIndex, updatedPoster)

      cy.get('.movie-container').get('.movie-poster').eq(posterIndex).find('.vote-count').should('have.text', posters[posterIndex].vote_count)
  
      //Prepare intercept; then send request to increase vote by one (no need to test return JSON because it's stubbed)
      cy.intercept("PATCH", `/api/v1/movies/${posters[posterIndex].id}`, {
        statusCode: 200,
        body: updatedPoster
      })
  
      //Check that vote count element increases by one
      cy.get('.movie-poster').eq(posterIndex).find('#up-vote').should('have.class', 'vote-button')
        .click().get('.movie-poster').eq(posterIndex).find('.vote-count').should('have.text', posters[posterIndex].vote_count + 1)
    })

    it('can downvote to decrease vote count by one', () => {
      const posterIndex = 1
      const updatedPoster = changePosterVoteCount(posterIndex, -1)

      cy.get('.movie-container').get('.movie-poster').eq(posterIndex).find('.vote-count').should('have.text', posters[posterIndex].vote_count)
  
      cy.intercept("PATCH", `/api/v1/movies/${posters[posterIndex].id}`, {
        statusCode: 200,
        body: updatedPoster
      })
  
      cy.get('.movie-poster').eq(posterIndex).find('#down-vote').should('have.class', 'vote-button')
        .click().get('.movie-poster').eq(posterIndex).find('.vote-count').should('have.text', posters[posterIndex].vote_count - 1)
    })
    
    //More tests to implement:
    // - sad path: invalid movie id
    // - upvote + downvote combo is correct; also does not disturb another movie's stats
    // - sad path: MAYBE - incorrect PATH body gives error.  Note: wouldn't this require an actual API call to really be sure?...
  })

})


