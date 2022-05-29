#! /bin/bash

zip -r django.zip frontend backend requirements.txt ebdjango manage.py .ebextensions -x frontend/node_modules/**\*
