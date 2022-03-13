#!/bin/bash

function warn {
  read -p "WARNING !!! You are about to run a migration to a production database ! Continue (y/n) ? " choice
  case "$choice" in 
    y|Y ) NODE_ENV=production sequelize db:migrate;;
    n|N ) echo "no";;
    * ) echo "Invalid response";;
  esac
}

read -p "Welcome to Migration tool ! In which database environnment would you like to run migrations (dev/test/prod) ? " database 
case "$database" in 
  dev|development ) NODE_ENV=development sequelize db:migrate;;
  test ) NODE_ENV=test sequelize db:migrate;;
  production|prod ) warn;;
  * ) echo "Invalid environnment";;
esac


