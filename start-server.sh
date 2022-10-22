
if [ "$1" = "" ] 
then
    echo "please provide either locally or productionmode as a parameter when calling this shell script"

else


if [ "$1" = "locally" ]
then

    echo "starting the server locally"
    deno run --allow-read --allow-net --allow-write --allow-env --unstable start-server.ts 8048

fi


if [ "$1" = "productionmode" ]
then
    echo "starting the server in production mode"
    pm2 start start-server.ts --interpreter="deno" --interpreter-args="run --allow-read --allow-write --allow-env --allow-net --unstable" -- 11443
fi 
fi 
