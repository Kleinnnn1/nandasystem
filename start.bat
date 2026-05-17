@echo off
title N&A School Supplies POS - Starting...
color 0A

echo.
echo  ================================================
echo   N^&A School Supplies POS System
echo   Starting up, please wait...
echo  ================================================
echo.

:: Check if XAMPP MySQL is running
echo  [1/3] Checking MySQL...
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo  [OK] MySQL is already running
) else (
    echo  [..] Starting MySQL...
    start "" "C:\xampp\mysql\bin\mysqld.exe" --defaults-file="C:\xampp\mysql\bin\my.ini"
    timeout /t 3 /nobreak >nul
    echo  [OK] MySQL started
)

echo.

:: Start the backend server
echo  [2/3] Starting backend server...
cd /d "%~dp0server"
if not exist "node_modules" (
    echo  [..] Installing server dependencies...
    call npm install
)
start "N&A POS Backend" /min cmd /c "node index.js"
timeout /t 2 /nobreak >nul
echo  [OK] Backend server started

echo.

:: Start the POS application
echo  [3/3] Launching POS application...
timeout /t 1 /nobreak >nul

:: Check if installed version exists
if exist "%LOCALAPPDATA%\Programs\N&A School Supplies POS\N&A School Supplies POS.exe" (
    start "" "%LOCALAPPDATA%\Programs\N&A School Supplies POS\N&A School Supplies POS.exe"
) else if exist "%~dp0client\release\win-unpacked\N&A School Supplies POS.exe" (
    start "" "%~dp0client\release\win-unpacked\N&A School Supplies POS.exe"
) else (
    echo  [ERROR] POS application not found!
    echo  Please install "N&A School Supplies POS Setup.exe" first.
    pause
    exit
)

echo  [OK] POS application launched
echo.
echo  ================================================
echo   System is ready!
echo   You can close this window.
echo  ================================================
timeout /t 3 /nobreak >nul
exit