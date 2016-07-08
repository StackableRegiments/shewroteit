FROM node:4-onbuild

ENV APP /srv/shewroteit

COPY . $APP

WORKDIR $APP

EXPOSE 3000

RUN npm install

CMD npm start