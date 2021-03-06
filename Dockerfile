FROM postgres:10

ENV POSTGRES_DB=e_commerce-database
ENV POSTGRES_USER=e_commerce-database
ENV POSTGRES_PASSWORD=e_commerce-database

RUN apt-get update -qq && \
    apt-get install -y apt-utils postgresql-contrib

COPY build/database_up.sql /docker-entrypoint-initdb.d/
