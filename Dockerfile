FROM node:carbon
WORKDIR /src/app
COPY package*.json
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "nodemon" ]