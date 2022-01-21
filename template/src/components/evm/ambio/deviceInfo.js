import {Platform} from "react-native";
import sha1 from "sha1";
import device_info from "react-native-device-info";
import * as RNLocalize from "react-native-localize";
import {set, get} from "./models/deviceInfo";
import {IDFA} from "react-native-idfa";
import pack from "../../package";
import CodePush from "react-native-code-push";
import {AppConfig} from "./config";
import {log} from "./debug";

let VERSION = pack.version;

export class DeviceInfo {

    initialState = {
        platform: Platform.OS,
        version: VERSION,
        app_key: AppConfig.app_key,
        native_ver: device_info.getVersion(),
        js_ver: "v0",
        os_ver: device_info.getSystemVersion(),
        model: device_info.getModel(),
        build: device_info.getBuildNumber(),
        country: RNLocalize.getCountry(),
        type: AppConfig.type,
        name: AppConfig.name,
    };

    constructor() {
        device_info.getDeviceName().then(deviceName => {
            this.initialState = {
                ...this.initialState,
                device_name: deviceName
            }
        });

        CodePush.getUpdateMetadata().then(meta => {
            // console.warn(meta);
            if (meta)
                this.initialState = {
                    ...this.initialState,
                    js_ver: meta.label,
                }
        })
        get().then(data => {
            if (data) {
                // đã có thông tin device info
                let {client_id, device_id} = data;

                this.initialState = {
                    ...this.initialState,
                    client_id: client_id,
                    device_id: device_id,
                }
            } else {
                // chưa có thông tin device info

                // gen client_id
                const timeUnix = new Date().getTime();
                // const timeStamp = Math.floor(timeUnix / 1000);
                /*let client_id =
                    timeUnix +
                    "_" +
                    sha1(
                        device_info.getDeviceId() +
                        device_info.getUniqueId() +
                        device_info.getBrand()
                    ).substring(0, 5);*/
                // gen device_id
                let device_id = "";
                return IDFA.getIDFA()
                    .then(idfa => {
                        log("tandc getIDFA ok", idfa);
                        device_info.isEmulator().then(isEmulator => {
                            if (idfa !== "" && !isEmulator) {
                                device_id = idfa;
                            } else {
                                // gen GRATIOT0-0000-0000-0000-000000000000
                                device_id =
                                    "AMBIO000-" +
                                    Math.random()
                                        .toString(36)
                                        .substr(2, 4)
                                        .toUpperCase() +
                                    "-" +
                                    Math.random()
                                        .toString(36)
                                        .substr(2, 4)
                                        .toUpperCase() +
                                    "-" +
                                    Math.random()
                                        .toString(36)
                                        .substr(2, 4)
                                        .toUpperCase() +
                                    "-" +
                                    Math.floor(timeUnix / 10);
                            }

                            // log("tandc getDeviceInfo device_id", device_id);

                            set(AppConfig.code + device_id, device_id);

                            this.initialState = {
                                ...this.initialState,
                                client_id: AppConfig.code + device_id,
                                device_id: device_id,
                            }
                        });
                    })
                    .catch(e => {
                        log("tandc getIDFA error", e);

                        // toast("Hệ thống lấy thông tin device lỗi!");

                        device_id =
                            "AMBIO000-" +
                            Math.random()
                                .toString(36)
                                .substr(2, 4)
                                .toUpperCase() +
                            "-" +
                            Math.random()
                                .toString(36)
                                .substr(2, 4)
                                .toUpperCase() +
                            "-" +
                            Math.random()
                                .toString(36)
                                .substr(2, 4)
                                .toUpperCase() +
                            "-" +
                            Math.floor(timeUnix / 10);

                        set(AppConfig.code + device_id, device_id);
                        this.initialState = {
                            ...this.initialState,
                            client_id: AppConfig.code + device_id,
                            device_id: device_id,
                        }

                        // console.error(e);
                    });
            }
        });
    }

    getParamDefault() {
        return {
            app_key: AppConfig.app_key,
            client_id: this.initialState.client_id,
            native_ver: this.initialState.native_ver,
            js_ver: this.initialState.js_ver,
            os: this.initialState.platform,
            os_ver: this.initialState.os_ver,
            model: this.initialState.model,
            device_id: this.initialState.device_id,
            build: this.initialState.build,
            country: this.initialState.country,
            type: this.initialState.type,
            name: this.initialState.name,
            device_name: this.initialState.device_name
        };
    }
}

let deviceInfo = new DeviceInfo();

module.exports = {
    /**
     * ### getParamDefault
     * @return {Object} trả về các tham số mặc định
     */
    getParamDefault() {
        return deviceInfo.getParamDefault();
    },
}

