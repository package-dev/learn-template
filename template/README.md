```
sudo rm -rf /tmp/metro-*
npm start --reset-cache

git add . && git commit -m "" && git push

sudo chmod -R 777 android

sudo ./gradlew cleanBuildCache

react-native run-android --deviceId=emulator-5554
adb devices -l
adb -s emulator-5554 shell
adb -s emulator-5555 install helloWorld.apk
npx react-native start --port 8083
sudo chmod 755 android/gradlew
sudo chmod -R 0777 /tmp
adb reverse tcp:8081 tcp:8081
sudo ./gradlew --stop
sudo ./gradlew clean

source ~/.profile
nvm ls-remote
nvm install 16.13.0

npm i -g npm@latest
sudo npm cache clean -f

sudo rm -rf node_modules

npm install -g appcenter-cli
appcenter login

npx react-native run-android --variant=release
cd android && ./gradlew assembleRelease
sudo ln -s $(which node) /usr/local/bin/node

```