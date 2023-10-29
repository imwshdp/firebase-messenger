build:
	docker build -t mwshdp/messenger .

run:
	docker run -d -p 5173:5173 --rm --name messenger mwshdp/messenger

stop:
	docker stop messenger