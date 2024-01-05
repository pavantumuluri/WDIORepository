@echo off
allure generate allure-results --clean
start "Allure Report" "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" allure-report/index.html