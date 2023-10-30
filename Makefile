build:
	docker build -t mwshdp/messenger --build-arg VITE_FIREBASE_API_KEY=%VITE_FIREBASE_API_KEY% --build-arg VITE_FIREBASE_AUTH_DOMAIN=%VITE_FIREBASE_AUTH_DOMAIN% --build-arg VITE_FIREBASE_PROJECT_ID=%VITE_FIREBASE_PROJECT_ID% --build-arg VITE_FIREBASE_STORAGE_BUCKET=%VITE_FIREBASE_STORAGE_BUCKET% --build-arg VITE_FIREBASE_MESSAGING_SENDER_ID=%VITE_FIREBASE_MESSAGING_SENDER_ID% --build-arg VITE_FIREBASE_APP_ID=%VITE_FIREBASE_APP_ID% .

run:
	docker run -d -p 4173:4173 --rm --name messenger mwshdp/messenger

stop:
	docker stop messenger
