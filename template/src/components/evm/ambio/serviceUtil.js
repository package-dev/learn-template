import {syncDisk as syncDiskApp, reset as resetApp } from './service/app/appStore';
import {syncDisk as syncDiskRoom, reset as resetRoom } from './service/room/roomStore';
import {syncDisk as syncDiskHome, reset as resetHome } from './service/home/homeStore';
import {syncDisk as syncDiskUser, reset as resetUser } from './service/user/userStore';
import {syncDisk as syncDiskDevice, reset as resetDevice } from './service/device/deviceStore';
import {syncDisk as syncDiskDeviceRoom, reset as resetDeviceRoom } from './service/deviceRoom/deviceRoomStore';
import {syncDisk as syncDiskDeviceLWT, reset as resetDeviceLWT } from './service/deviceLWT/deviceLWTStore';
import {syncDisk as syncDiskDevicePower, reset as resetDevicePower } from './service/devicePower/devicePowerStore';
import {syncDisk as syncDiskDeviceState, reset as resetDeviceState } from './service/deviceState/deviceStateStore';
import {syncDisk as syncDiskDevicePhysical, reset as resetDevicePhysical } from './service/devicePhysical/devicePhysicalStore';
import {syncDisk as syncDiskDeviceShare, reset as resetDeviceShare } from './service/deviceShare/deviceShareStore';
import {syncDisk as syncDiskFetch, reset as resetFetch } from './service/fetch/fetchStore';
import {syncDisk as syncDiskCommand, reset as resetCommand } from './service/command/commandStore';
import {syncDisk as syncDiskShopCart, reset as resetShopCart } from './service/shopCart/shopCartStore';
import {getAllHomeInfo, getAllHomeInfoOwner, getAPIHomelist} from "./service/home/homeAction";
import {getHomeId, setHomeId} from "./service/app/appAction";
import {getAllDeviceInfo, getAPIDevicelist} from "./service/device/deviceAction";
import {getAPIDevicePhysicallist} from "./service/devicePhysical/devicePhysicalAction";
import {getAPIDeviceSharelist} from "./service/deviceShare/deviceShareAction";
import {checkSyncCommand} from "./service/command/commandAction";
import {log, logInfo} from "./debug";
import {sleep, toast} from "./funcUtil";

export async function syncDisk() {
    await syncDiskApp();
    await syncDiskRoom();
    await syncDiskHome();
    await syncDiskUser();
    await syncDiskDevice();
    await syncDiskDeviceRoom();
    await syncDiskDeviceLWT();
    await syncDiskDevicePower();
    await syncDiskDeviceState();
    await syncDiskCommand();
    await syncDiskDevicePhysical();
    await syncDiskDeviceShare();
    await syncDiskShopCart();
    await syncDiskFetch();
    return true;
}

export async function resetService() {
    resetApp();
    resetRoom();
    resetHome();
    resetUser();
    resetDevice();
    resetDeviceRoom();
    resetDeviceLWT();
    resetDevicePower();
    resetDeviceState();
    resetDevicePhysical();
    resetDeviceShare();
    resetShopCart();
    resetFetch();
    return true;
}

export function checkDataSyncLocalReady() {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i <= 50; i++) {
            let allCommand = checkSyncCommand();
            let allHome = await getAllHomeInfo();
            let allRoom = true;
            let allDevice = false;
            // let allDeviceShare = false;
            if (getHomeId()) {
                allDevice = await getAllDeviceInfo(["device_id"]);
                // getAPIDeviceSharelist();
                // allDeviceShare = true;
                /*allRoom = await getAllRoomInfo(["id"]);
                if (allRoom) {
                    _.each(allRoom, ({id}) => {
                        getAllDeviceRoom(id);
                    })
                    getAllDeviceRoom("all");
                    getAllDeviceRoom("share");
                }*/
            }
            if (allCommand !== false && allHome !== false && allRoom !== false && allDevice !== false) { // sync ok
                resolve(true);
                break;
            }
            if (i === 10 || i === 20 || i === 30 || i === 40) toast("Tải dữ liệu lỗi! vui lòng tắt ứng dụng thử lại sau!");
            if (i === 5 && allHome && !allRoom && !allDevice) {
                let tempHome = getAllHomeInfoOwner();
                setHomeId(tempHome[0]["id"]);
                toast("Lỗi chuyển nhà! do đồng bộ dữ liệu lỗi!");
            }
            if (i >= 50) resolve(false);
            log("waiting for ready!", allCommand ? "command ok" : "command fail", allHome ? "home ok" : "home fail", allRoom ? "room ok" : "room fail", allDevice ? "device ok" : "device fail", allDevice);
            await sleep(1000);
        }
    });
}

export function syncServer() {
    // return false;
    logInfo("syncServer ===> ");
    return new Promise(async (resolve, reject) => {
        getAPIHomelist();
        // getAPIRoomlist();
        getAPIDevicelist();
        getAPIDevicePhysicallist();
        // getAPIRoomDevice("all");
        // getAPIDeviceSharelist();
        // getAPIRoomDevice("share");
        // pubProccesser("model_cmds", {});
        resolve(true);
    });
}