npm run build
cd ./build
echo "REACT_APP_API_URL=//api.tizjourney-films.nomo.nomoredomains.monster" > .env
cd ..
scp -r ./build/* kostya@84.252.134.210:/home/kostya/frontend

