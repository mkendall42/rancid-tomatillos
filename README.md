<h1 align="center">🔐 Rancid Tomatillos 🔐</h1>
<p align="center">
   A webpage for searching and reviewing movies
</p>



---

<h2 align="center">✨ Overview ✨</h2>

<p align="center">This is the front end of a web application that makes API calls to TMDB to display movie posters. It allows users to click to upvote or downvote a movie. It also displays a short overview of the movie when clicked on.
</p>

This is the main landing page that a viewer will see.  It displays a grid of all movies (55) in a poster format, with the image, title, and vote count present, as well as upvote and downvote buttons.  
<img width="500" align="center" src="./RT-screenshot/Screenshot 2025-04-12 at 2.11.18 PM.png">

When the user scales their screen (or is on a different device), the movie posters and grid should scale accordingly:  
<img width="500" align="center" src="./RT-screenshot/Screenshot 2025-04-12 at 2.12.18 PM.png">

If the user begins entering text into the search bar (top right corner), the search text will be displayed, and the movies will be filtered to only display (still in a grid fashion) the movies with titles that contain the search text (case insensitive).  
<img width="500" align="center" src="./RT-screenshot/Screenshot 2025-04-12 at 2.11.40 PM.png">

When a user clicks on the up or down arrows, it will upvote / downvote for the respective movie - both by changing the displayed vote count, and by sending an API call to update the vote count in the database (checking is also handled in the code).  Two examples are below:  
<img width="500" align="center" src="./RT-screenshot/Screenshot 2025-04-12 at 2.13.47 PM.png">
<img width="500" align="center" src="./RT-screenshot/Screenshot 2025-04-12 at 2.13.58 PM.png">

If a user clicks on the image of a poster, it will route to a new URL which displays detailed information about the movie.  This initiates an API call to get the additional information and format it appropriately.  This also toggles visibility of the home button to return the user to the main viewing page again:  
<img width="500" align="center" src="./RT-screenshot/Screenshot 2025-04-12 at 2.12.47 PM.png">

If an invalid URL is visited, it will automatically route the user to an error page.  
<img width="500" align="center" src="./RT-screenshot/Screenshot 2025-04-12 at 2.13.06 PM.png">

<h2 align="center"> Tools, challenges, and wins</h2>
<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Version">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/CSS-264de4?style=for-the-badge&logo=css3&logoColor=white" alt="CSS">
</p>

1. Tools:
   - React
   - Cypress
   - Vite
   - Render (for deployment)
   - Existing backend for API calls (hosted from Turing)
2. Challenges:
   - Render deployment: we were initially attempting to build a static site, but after a 2-hour build failure (and follow up), we figured out that a web service deployment was necessary (due to the Vite server needing to be run dynamically).  Additionally, we at first encountered a couple of errors that Render discovered in our React code that React did not complain about natively.
   - Error handling: we created an ErrorPage container to handle any invalid URL, but we would like to make it more general purpose.  We had tried utilizing an `error` state variable, but would like a way to automatically redict / render this route and container whenever the value gets changed, but were unable to implement this in a consistent way (at least not yet).
   - Code organization: our App.js file is somewhat cluttered at this point, due to needing several callback functions and reused code.  We wonder if there are standard / best practice ways to move some of these methods to other files, or what is recommended.  We did some local refactoring, and tried to utilize components effectively, but were not certain beyond this.
   - CSS: we definitely struggled with this.  It rarely throws errors, but there are many hidden mechanisms which seem to allow or override attributes.  In many cases, "it either works or it doesn't".  We were able to find ways to get posters to generally scale, for instance, but still feel there is more that can be done here.
3. Wins:
   - Visual presentation: despite our CSS struggles, we feel that at least most of the website presents the movie posters cleanly (and similar to the comp, with some personal choices added); it also should scale to different devices in most cases.
   - Search function: we were pleased to be able to complete the optional extension (with the exception of formatting).  We felt this was especially valuable since it is utilized on so many real websites.
   - Solving 'mysteries': as an example, we dealt with an issue for some time on displaying movie details, and later realized it was due to an asynchronous call (our selected movie variable was often showing up as undefined since the data had not yet arrived).
   - Collaboration: we worked well together.  We found a way to keep a regular rhythm for checking in and staying synchronized, and found ways to combine driver/navigator coding with divvying up more self-contained tasks, as well as working diligently through any merge conflicts that arose.

<h2 align="center"> 🛠️ TODO / Roadmap</h2>
  
- [ ] Add accessibility elements
- [ ] Create filtering by movie genre
- [ ] Refine search functionality
   - [ ] Use search icon instead of default form
   - [ ] Hide search bar when user is on the details page
- [ ] Refine CSS styling on the page
- [ ] Make error page more general purpose (i.e. anytime the `error` state var gets set, that page is automatically loaded with appropriate message)

<h2 align="center">Deployment:</h2>
<!-- <a ref="https://rancid-tomatillos-website.onrender.com/">   -->

[Link to Rancid Tomatillos Website](https://rancid-tomatillos-website.onrender.com/)

<h2 align="center">Contributor GitHub Profiles</h2>

[Patrick Little](https://github.com/little-Patrick)  
[Mark Kendall](https://github.com/mkendall42)


