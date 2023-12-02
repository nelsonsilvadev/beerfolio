# BeerFolio

<img src="https://beerfolio.app/github.png" alt="BeerFolio - Logo">

An innovative and immersive web platform for discovering, rating and curating a personalized collection of beers.

> There's a lot of notes within the source code, search for `Note:`

### How to Set Everything Up (assuming Node and Yarn/npm are installed)

- Open your terminal `:)`
- Clone the repository
  - `git clone https://github.com/nelsonsilvadev/beerfolio.git`
- Enter to the repository directory
  - `cd beerfolio`
- Install all the dependencies
  - `yarn install` or `npm install`
- To start everything up
  - `yarn start` or `npm run start`
- Open your browser to create your beer collection
  - [http://localhost:3000/](http://localhost:3000/)

### Development Notes

#### Architecture

Beerfolio is built using Next.js and React, leveraging TypeScript for robust and scalable development. The application utilizes PunkAPI for an extensive collection of beer data. State management is efficiently handled through the React Context API, ensuring seamless data flow across components. Performance optimization is achieved with debounced interactions, reducing unnecessary processing and improving user experience. The project is hosted on Vercel for reliable and fast delivery, and it also employs Local Storage for client-side data persistence, enhancing the application's usability and personalization.

#### Why's

- **Next.js and React:** Next.js makes the app fast and easy to find on Google. React helps us build a cool-looking app in a simple way.
- **TypeScript:** It catches mistakes early on, making the code more reliable and easier to understand.
- **PunkAPI:** It gives us lots of beer information so we can offer you a big variety without extra work.
- **React Context API:** It's an easy way for the app's different parts to share information without getting too complex.
- **Debounced Interactions:** It prevents the app from reacting too quickly or unnecessarily, especially when searching, keeping it running smoothly.
- **Vercel Hosting:** Vercel works really well with Next.js, ensuring the app runs fast and can be easily updated.
- **Local Storage:** It saves your choices in your browser for a more personal experience without needing a complicated database.

### Random Thoughts

- Considering adding pagination for the collection to manage a large number of beers more efficiently.
- Experimented with a light/dark mode, but decided to prioritize other features first.
- Planning to add Jest tests for thorough coverage and reliability.
- Bought a domain and created a logo, giving the project a more professional feel.
- Considering enhancing accessibility features, though it wasn't the main focus initially.
- SEO optimization wasn't a primary concern during development but should be considered in future updates.

### Final Comment

This small project has the potential to evolve into a large community platform, connecting beer enthusiasts worldwide, and transforming into a comprehensive ecosystem for sharing, learning and celebrating the diverse world of beers. _Beautiful stuff._

### Reminder

- Keep it fun, manageable and remember - quality over quantity, just like a good brew! 🍻
