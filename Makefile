rm:
	pm2 stop website && pm2 delete website

start:
	pm2 start npm --name website -- run start -- -p 8080

update:
	git pull && npm install && npm run build && make rm && make start


.PHONY:
	rm start update