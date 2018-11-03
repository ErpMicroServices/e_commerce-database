.PHONY = clean clean-files clean-docker docker

all : docker node_modules database_up.sql
	sudo docker commit new-e_commerce-database erpmicroservices/e_commerce-database:latest

docker :
	sudo docker build --tag new-e_commerce-database --rm .
	sudo docker run -d --publish 5432:5432 --name new-e_commerce-database new-e_commerce-database
	sleep 10

node_modules : package.json
	npm install

database_up.sql : sql/*.sql database_change_log.yml
	liquibase --changeLogFile=./database_change_log.yml --url='jdbc:postgresql://localhost/e_commerce-database' --username=e_commerce-database --password=e_commerce-database --outputFile=database_up.sql updateSql

clean : clean-docker clean-files

clean-files :
	-$(RM) -rf node_modules
	-$(RM) database_up.sql
	-$(RM) databasechangelog.csv

clean-docker :
	if sudo docker ps | grep -q new-e_commerce-database; then sudo docker stop new-e_commerce-database; fi
	if sudo docker ps -a | grep -q new-e_commerce-database; then sudo docker rm new-e_commerce-database; fi
	if sudo docker images | grep -q new-e_commerce-database; then sudo docker rmi new-e_commerce-database; fi
	if sudo docker images | grep -q erpmicroservices/e_commerce-database; then sudo docker rmi erpmicroservices/e_commerce-database; fi
