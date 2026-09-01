@echo off
REM ---------------------------------------------------------------------------
REM Clears stale Git lock files that block GitHub Desktop from committing.
REM
REM Git writes a .lock file while it works and deletes it when it finishes. If
REM something cannot delete it afterwards, the lock is left behind and every
REM later commit fails with "A lock file already exists in the repository".
REM
REM This deletes ONLY those three lock files. It does not touch your code, your
REM commits, or your history. Safe to run whenever that error appears — but
REM close GitHub Desktop first, so nothing is mid-write.
REM ---------------------------------------------------------------------------

echo.
echo Clearing stale Git locks in %~dp0
echo.

del /f /q "%~dp0.git\HEAD.lock"             2>nul && echo   removed HEAD.lock
del /f /q "%~dp0.git\index.lock"            2>nul && echo   removed index.lock
del /f /q "%~dp0.git\objects\maintenance.lock" 2>nul && echo   removed maintenance.lock

echo.
echo Done. Reopen GitHub Desktop and commit again.
echo.
pause
