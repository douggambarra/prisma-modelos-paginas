@echo off
cd /d "%~dp0"
echo Iniciando localhost em http://localhost:4173
start "Urupema Localhost" cmd /k "npm.cmd run dev:local"
