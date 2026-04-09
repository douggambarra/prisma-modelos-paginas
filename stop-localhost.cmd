@echo off
setlocal
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":4173" ^| findstr "LISTENING"') do (
  taskkill /PID %%p /F >nul 2>&1
)
echo Servidor da porta 4173 finalizado.
