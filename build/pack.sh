#!/bin/bash
rm -rf jmvc
mkdir jmvc
cd jmvc

cp ../../.htaccess .
cp ../../index.html .
cp ../../robots.txt .

mkdir app
cd app

cp -R ../../../app/extensions .
cp -R ../../../app/testsuite .


mkdir controllers
mkdir i18n
mkdir interfaces
mkdir models
mkdir views
cp ../../../app/controllers/404.js controllers/
cp -R ../../../app/views/core views/

cp ../../../app/jmvc.js .
cp ../../../app/jmvc.min.js .


cd ..
cp -r ../../srv .
mkdir -p media/css/core


cp ../../media/css/core/jmvc.min.css media/css/core/
cp ../../media/css/reset.css media/css/







cd ..
zip -r jmvc.zip jmvc/
rm -rf jmvc/