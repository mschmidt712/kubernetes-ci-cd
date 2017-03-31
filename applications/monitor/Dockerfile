FROM node:7

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install
RUN npm install -g nodemon

# Bundle app source
COPY . /usr/src/app

RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl

RUN chmod +x ./kubectl; mv ./kubectl /usr/local/bin/kubectl

#Setup the kubectl API
RUN kubectl proxy --port:2345 &

#Expose port 3001 so the monitor service is reachable
EXPOSE 3001

CMD ["nodemon", "index.js"]
