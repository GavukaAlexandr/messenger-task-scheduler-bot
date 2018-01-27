FROM node:carbon-alpine
VOLUME [ "/home/cert/task-scheduler.tk" ]
WORKDIR /home/www/
COPY . /home/www/
RUN npm install
EXPOSE 3000
CMD node app.js

