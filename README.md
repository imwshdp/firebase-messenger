# Firebase real time messenger

Messenger application, based on firebase technologies: database and storage.
Application configuration of firebase provides real time watching and observing on changes in database's collections.

Authentication is implemented using firebase tools: login via email / password and login via Google Account.

Check hosted application by following the [link](https://firebase-messenger.vercel.app/).

## Backend stack:

- `Firebase Authentication`
- `Firebase Storage`
- `Firestore Database`

## Frontend stack:

- `React`
- `React Router`
- `Redux Toolkit`
- `Sass`

## CI / CD:

- `GitHub Actions`
- `Docker`

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

**Attention !** \
Before running app locally, make sure that you created _.env_ or _.env.local_ file with your firebase configuration. That file must have this structure:

`VITE_FIREBASE_API_KEY`=_[YOUR FIREBASE API_KEY]_ \
`VITE_FIREBASE_AUTH_DOMAIN`=_[YOUR FIREBASE AUTH_DOMAIN]_ \
`VITE_FIREBASE_PROJECT_ID`=_[YOUR FIREBASE PROJECT_ID]_ \
`VITE_FIREBASE_STORAGE_BUCKET`=_[YOUR FIREBASE STORAGE_BUCKET]_ \
`VITE_FIREBASE_MESSAGING_SENDER_ID`=_[YOUR FIREBASE MESSAGING_SENDER_ID]_ \
`VITE_FIREBASE_APP_ID`=_[YOUR FIREBASE APP_ID]_

**_Using GitHub repository code_** \
Clone the GitHub repository using https / ssh / Github CLI. \
Install Node.js from [official download page](https://nodejs.org/en). \
Open folder with the cloned GitHub code using your IDLE and write next terminal commands: `yarn install` and then `yarn dev`.

**_Using DockerHub_** \
Clone docker image from DockerHub using docker with `git pull mwshdp/messenger` command. \
Next step run container by the command according to your preferences or just use: `docker run -d -p 5173:5173 --rm --name messenger mwshdp/messenger`. Note that the port for connecting the vite build is 5173. \
 \
You also may use make commands with Makefile in the root folder. But make sure that make is installed on your computer! For example, for run docker container you may use `make run` command.
