@echo off
REM ===========================================================================
REM  UPDATE-CONTENT-LIST.bat  --  rebuilds scripts\academy-content-needs.json,
REM  the list of names every Academy must supply.
REM
REM  Run it after a slot is converted. The list is counted from the platform's
REM  own code, so when the platform stops asking for a name, this is what
REM  takes it off every school's bill. It changes nothing else.
REM
REM  Then run RUN-THE-CHECKS.bat as usual.
REM ===========================================================================
cd /d "%~dp0"
echo.
echo   Before:
powershell -NoProfile -Command "(Get-Content scripts\academy-content-needs.json | ConvertFrom-Json).names.Count"
echo.
node scripts\scan-content-needs.mjs
echo.
echo   After:
powershell -NoProfile -Command "(Get-Content scripts\academy-content-needs.json | ConvertFrom-Json).names.Count"
echo.
pause
