# Models for ERP Micro Services - E-Commerce

## Build the docker image
'''
docker build --tag erp-ecommerce-db .
docker run --detach --publish 5432:5432 --name erp-ecommerce-db-1 erp-ecommerce-db
'''

## Inspect the database
'''
docker run --detach --publish 5050:5050 --name pgadmin --link erp-ecommerce-db-1:erp-ecommerce-db-1 thajeztah/pgadmin4
'''
