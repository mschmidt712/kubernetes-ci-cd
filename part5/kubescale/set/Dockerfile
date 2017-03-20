FROM node:6
RUN apt-get update
RUN apt-get install -y curl

COPY . /app

WORKDIR /app

COPY up.sh /up.sh

COPY down.sh /down.sh

RUN npm install

CMD ["npm", "start"]