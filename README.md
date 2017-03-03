# Models for ERP Micro Services - E-Commerce

## Build the docker image
'''
docker build --tag e-commerce-db .
docker run --detach --publish 5432:5432 --name e-commerce-db-1 e-commerce-db
'''

## Inspect the database
'''
docker run --detach --publish 5050:5050 --name pgadmin --link ecommerce-db-1:ecommerce-db-1 thajeztah/pgadmin4
'''
