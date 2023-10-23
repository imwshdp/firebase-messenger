# Firebase real time messenger

Messenger application, based on firebase technologies: database and storage.
Application configuration of firebase provides real time watching and observing on changes in database's collections.

Authentication is implemented using firebase tools: login via email / password and login via Google Account.

Check hosted application by following the [link]().

## Backend stack:

- `Firebase Authentication`
- `Firebase Storage`
- `Firestore Database`

## Frontend stack:

- `React`
- `React Router`
- `Redux Toolkit`
- `Sass`

# Other technologies

- Vite for building
- Eslint + Prettier for code style
- Framer as beautiful animations source
- husky for github hooks

# Something interesting from the insides

- Redux error slice, watched for rejected actions and working as error boundary widget
- Firebase typization using types converter util
- Firebase errors parser for most popular asynchronous errors
- Form validation implemented with redux store logic
- React custom hooks, controlling specific events as scrolling and debounce
- Infinite scroll for messages history
- Responsive design with media queries

# Local running

Clone the repository using Git, then use Node.js terminal with command `yarn dev`.
