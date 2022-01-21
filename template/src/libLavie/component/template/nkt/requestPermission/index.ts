import { check, RESULTS, Permission, PERMISSIONS, request, } from 'react-native-permissions';
import { Platform } from 'react-native';
import DropDownAlert from '../../library/utils/dropDownHolder';
import { translate } from '../../library/utils/i18n/translate';
export async function useMediaPermission() {
    const statusRead = await request(
        Platform.select({
            android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        }),
    );
    const statusWrite = await request(
        Platform.select({
            android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        }),
    );
    const statusCamera = await request(
        Platform.select({
            android: PERMISSIONS.ANDROID.CAMERA,
            ios: PERMISSIONS.IOS.CAMERA,
        }),
    );
    const checkPermission = await request(
        Platform.select({
            android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        }),
    );
    const statusLocation = await request(
        Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        }),
    );
    return { statusRead, statusWrite, statusCamera, statusLocation, checkPermission };
}

export function checkPermission(
    permission: Permission,
    onUnAvailable?: Function,
    onDenied?: Function,
    onGranted?: Function,
    onBlocked?: Function,
) {
    return new Promise((resolve, reject) => {
        check(permission)
            .then(result => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        /*
                     This feature is not available (on this device / in this context)
                     */
                        onUnAvailable && onUnAvailable();
                        break;
                    case RESULTS.DENIED:
                        /*
                     The permission has not been requested / is denied but requestable
                     */
                        onDenied && onDenied();
                        break;
                    case RESULTS.GRANTED:
                        /*
                    The permission is granted
                     */
                        onGranted && onGranted();
                        break;
                    case RESULTS.BLOCKED:
                        /*
                    The permission is denied and not requestable anymore
                     */
                        onBlocked && onBlocked();
                        break;
                }
                resolve(true);
            })
            .catch(() => {
                DropDownAlert.showWarning(
                    translate('dialog:lbTitleWarning'),
                    translate('error:permissionBlockPhoto'),
                );
                resolve(false);
            });
    })
}
