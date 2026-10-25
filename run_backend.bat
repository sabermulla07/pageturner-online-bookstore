@echo off
title Online Book Store - Spring Boot Backend
cd /d "%~dp0backend"
echo ======================================================================
echo  Starting Online Book Store Backend (Spring Boot + MySQL)
echo  MySQL Database: online_bookstore_db (Port 3306)
echo  MySQL Password: S@ber06
echo  Server URL:     http://localhost:8080
echo ======================================================================
.\mvnw.cmd spring-boot:run
pause
