FROM postgres:latest

ENV POSTGRES_DB=e_commerce
ENV POSTGRES_USER=e_commerce
ENV POSTGRES_PASSWORD=e_commerce

# Copy all migration files to init directory
# PostgreSQL will execute these in alphabetical order on first run
COPY sql/V_ecom*.sql /docker-entrypoint-initdb.d/

# Ensure the container uses UTF-8 encoding
ENV LANG=en_US.utf8
