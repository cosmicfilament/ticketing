#!/bin/bash -v

# republish the common directory to npm
# and push to github
#cd ../common
#npm run pub
#sleep 10
# update the auth directory
cd ../auth
npm update @dogslobber/common
# and update the tickets directory
cd ../tickets
npm update @dogslobber/common
# and update the orders directory
cd ../orders
npm update @dogslobber/common
# and then return to our starting directory
cd ../scripts
