@echo off
title N&A School Supplies POS - Stopping...
color 0C

echo.
echo  ================================================
echo   N^&A School Supplies POS System
echo   Shutting down...
echo  ================================================
echo.

:: Stop the backend server
echo  [1/2] Stopping backend server...
taskkill /FI "WINDOWTITLE eq N&A POS Backend" /F >nul 2>&1
taskkill /IM "node.exe" /F >nul 2>&1
echo  [OK] Backend server stopped

echo.

:: Stop MySQL
echo  [2/2] Stopping MySQL...
taskkill /IM "mysqld.exe" /F >nul 2>&1
echo  [OK] MySQL stopped

echo.
echo  ================================================
echo   System stopped successfully.
echo  ================================================
timeout /t 2 /nobreak >nul
exit