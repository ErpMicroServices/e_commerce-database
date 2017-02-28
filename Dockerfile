FROM postgres:9.6.1

ENV POSTGRES_DB=EnterpriseKanban
ENV POSTGRES_USER=EnterpriseKanban
ENV POSTGRES_PASSWORD=EnterpriseKanban

RUN apt-get update -qq && \
    apt-get install -y apt-utils postgresql-contrib

ADD *.sql /docker-entrypoint-initdb.d/
