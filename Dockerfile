FROM ubuntu

COPY . ./AE

RUN apt-get install

CMD [ "npm run Minusrus-Scenario" ]