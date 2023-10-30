# Firebase real time messenger

Messenger application, based on firebase technologies: database and storage.
Application configuration of firebase provides real time watching and observing on changes in database's collections.

Authentication is implemented using firebase tools: login via email / password and login via Google Account.

Check production build of application by following the [link](https://firebase-messenger.vercel.app/).

## Backend stack:

- `Firebase Authentication`
- `Firebase Storage`
- `Firestore Database`

## Frontend stack:

- `React`
- `React Router`
- `Redux Toolkit`
- `Sass`

## CI/CD:

- `GitHub Actions`
- `Docker`
- `Vercel`

# Other technologies

- Vite as building tool
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
Before running app locally, make sure that you created _.env_ or _.env.local_ file with your firebase configuration environment. That file must have this structure:

`VITE_FIREBASE_API_KEY`=_[YOUR FIREBASE API_KEY]_ \
`VITE_FIREBASE_AUTH_DOMAIN`=_[YOUR FIREBASE AUTH_DOMAIN]_ \
`VITE_FIREBASE_PROJECT_ID`=_[YOUR FIREBASE PROJECT_ID]_ \
`VITE_FIREBASE_STORAGE_BUCKET`=_[YOUR FIREBASE STORAGE_BUCKET]_ \
`VITE_FIREBASE_MESSAGING_SENDER_ID`=_[YOUR FIREBASE MESSAGING_SENDER_ID]_ \
`VITE_FIREBASE_APP_ID`=_[YOUR FIREBASE APP_ID]_

**_Using GitHub repository code_** \
Clone the GitHub repository using https / ssh / Github CLI. \
Install Node.js from [official download page](https://nodejs.org/en). \
Open folder with the cloned GitHub code using your IDE and write next commands on your terminal: `yarn install` and then `yarn dev`. Alternatively you may build application by next commands chain: `yarn build` and then `yarn preview`.

**_Using DockerHub_** \
Clone docker image from DockerHub using docker with `git pull mwshdp/messenger` command. \
Next step run container by the command according to your preferences or just use: `docker run -d -p 4173:4173 --rm --name messenger mwshdp/messenger`. As you may noticed the port for connecting is _localhost:4173_. \
 \
You also may use make commands with Makefile in the root folder. First of course make sure that _make_ util is installed on your computer. For example, to run docker container you may use `make run` command with a pre-configured docker command.

If you want to build new docker image with your firebase configuration, check the _Makefile_ at the root folder and pick the build command. However, be aware that this command is suitable for Windows OS. If you want to build an image using a UNIX, check out for command with special env saving variables syntax.
