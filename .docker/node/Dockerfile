FROM node:13.8-alpine3.10

USER root
RUN npm install nodemon -g

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app
RUN npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

USER node

COPY --chown=node:node . .

EXPOSE 3008

#CMD ["npm", "start"]