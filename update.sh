#!/bin/bash 

# update the auth directory
cd /home/jpbutler/code2/ticketing/auth
npm update @dogslobber/common
# now update the tickets directory
cd /home/jpbutler/code2/ticketing/tickets
npm update @dogslobber/common
# and then return to our starting directory
cd /home/jpbutler/code2/ticketing
