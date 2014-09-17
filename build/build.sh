#!/bin/bash
#-------------------------
# MALTA MULTISTART SCRIPT |
#-------------------------
now=$(date +"%T")

# maybe clean log
logsize=$(ls -nl malta.log | awk '{print $5}' | tr -d '[:alpha:]')
echo -e '#################################\n> STARTING MALTA\n'
echo 'LOG SIZE '$logsize

if [ $logsize -gt 60000 ]
then
    echo 'CLEANING malta.log'
    echo '' > malta.log
fi
echo -e "\nSTARTED @ $now" >> malta.log

# tasks
malta build.json >> malta.log 2>&1 &

# show live message queue
echo -e '---------------------------------\nLOG CONTENT:\n.........\n......\n...'
tail -f malta.log 

