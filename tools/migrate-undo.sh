#!/bin/bash

function warn {
  read -p "WARNING !!! You are about to revert all the previous migrations to a production database ! Continue (y/n) ? " choice
  case "$choice" in 
    y|Y ) NODE_ENV=production sequelize db:migrate:undo:all;;
    n|N ) echo "no";;
    * ) echo "Invalid response";;
  esac
}

read -p "Welcome to Migration tool ! In which database environnment would you like to undo migrations (dev/test/prod) ? " database 
case "$database" in 
  dev|development ) NODE_ENV=development sequelize db:migrate:undo:all;;
  test ) NODE_ENV=test sequelize db:migrate:undo:all;;
  production|prod ) warn;;
  * ) echo "Invalid environnment";;
esac
