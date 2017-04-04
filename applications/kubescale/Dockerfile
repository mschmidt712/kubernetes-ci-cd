FROM node:6

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN apt-get update

RUN apt-get install -y apache2

RUN npm install -g loadtest

RUN npm install -g nodemon

RUN npm install

RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl

RUN chmod +x ./kubectl; mv ./kubectl /usr/local/bin/kubectl

CMD ["nodemon", "index.js"]