import {Linking} from "react-native";
import messaging from '@react-native-firebase/messaging';
import {getAppInfo} from '@serviceApp';
import {warningAlert} from '@lib/until';
import {log, logError, logWarn, logInfo} from '@lib/./debug';

const deepLinksConf = {
    screens: {
        account_historyLogin: 'historyLogin',
        /*Profile: {
          path: 'user/:id/:section?',
          parse: {
            id: (id) => `user-${id}`,
          },
          stringify: {
            id: (id) => id.replace(/^user-/, ''),
          },
        },*/
        // Comics: 'comics/:comicsId',
        // Quiz: 'quiz/:quizGroupId/:title',
        // PersonalityTest: 'personality/:testId',
    },
};

const linking = {
    prefixes: [
        'gratiotambiosmart://'
        // , 'https://app.gratiot.nhaantoan'
    ],
    config: deepLinksConf,
    subscribe(listener) {
        const onReceiveURL = ({url}) => listener(url);

        // Listen to incoming links from deep linking
        Linking.addEventListener('url', onReceiveURL);

        const HandleLink = (url) => {
            if (url) {
                let {isSigned} = getAppInfo(["isSigned"]);
                if (isSigned) listener(url);
            }
        }

        const unsubscribe = messaging().onMessage(async message => {
            const url = message?.data?.link;
            const body = message?.notification?.body;
            const title = message?.notification?.title;
            logInfo("onMessage ==> ", message, url);
            if (url) {
                warningAlert(
                    ()=>{
                        HandleLink(url);
                    },
                    ()=>{},
                    title,
                    body,
                    "Xem",
                    "Đóng"
                );
            }
        });

        // Listen to firebase push notifications
        const unsubscribeNotification = messaging().onNotificationOpenedApp(
            (message) => {
                const url = message?.data?.link;

                logInfo("onNotificationOpenedApp ==> ", message, url);
                HandleLink(url);
            }
        );

        messaging()
            .getInitialNotification()
            .then(message => {
                const url = message?.data?.link;
                logInfo('Notification caused app to open from quit state:', message, url);
                if (url) {
                    let handleCheck = async () => {
                        let {loading} = getAppInfo(["loading"]);
                        if (!loading) {
                            HandleLink(url);
                        } else {
                            setTimeout(handleCheck, 500);
                        }
                    }
                    setTimeout(handleCheck, 1000);
                }
            });

        return () => {
            // Clean up the event listeners
            Linking.removeEventListener('url', onReceiveURL);
            unsubscribeNotification();
            unsubscribe();
        };
    },
};

export default linking;