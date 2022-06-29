#! /bin/bash
cd admin-client && npm  install && npm run start ;
cd ../agent-client && npm run build && ng serve ;
cd ../backend && npm run build && npm run dev
