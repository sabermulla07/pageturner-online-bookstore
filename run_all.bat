@echo off
title Launch Online Book Store Application
echo ======================================================================
echo  Launching Online Book Store (React + Spring Boot + MySQL)
echo ======================================================================
echo [1/2] Starting Spring Boot Backend (Port 8080)...
start "Online Book Store Backend" cmd /c "cd /d "%~dp0backend" && .\mvnw.cmd spring-boot:run"

echo Waiting 8 seconds for backend to start...
timeout /t 8 /nobreak >nul

echo [2/2] Starting React Frontend (Port 5173 / 5174)...
start "Online Book Store Frontend" cmd /c "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ======================================================================
echo  Application is running!
echo  Backend API: http://localhost:8080/api/books
echo  Frontend UI: http://localhost:5173
echo ======================================================================
pause
