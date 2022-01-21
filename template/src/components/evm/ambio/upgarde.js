import {useState, useEffect} from 'react';
import CodePush from 'react-native-code-push';
import {has} from 'underscore';
import {alertMessage, openLink} from './until';
import deviceInfo from './deviceInfo';

/**
 */
export async function checkAppUpdateAPI(onStart, onSuccess, onFail, onEnd) {
  /*try {
    isFunction(onStart) && await onStart();
    let response = await pubProc('check_app_update', {});
    if (response) {
      isFunction(onSuccess) && (await onSuccess(response));
      return response;
    }else if (has(response, 'message')) throw new Error(response.message)
    else throw new Error('fail');
  } catch (error) {
    isFunction(onFail) && onFail(error.message);
  } finally {
    isFunction(onEnd) && onEnd();
  }*/
}

export async function checkAppUpdate() {
  return checkAppUpdateAPI(false, res => {
    if (has(res, 'update') && res['update'] && has(res, 'update_link')) {
      return alertMessage({
        title: 'Cập nhật phần mềm',
        message: 'Phần mềm có phiển bản mới, bạn có muốn cập nhật?',
        buttons: [
          {name: 'Để sau'},
          {name: 'Cập nhật', action: () => openLink(res['update_link'])},
        ],
      });
    }
  });
}

/**
 *
 * @param {Boolean} auto
 */
export function useUpgradeApp(auto = false) {
  const [syncMessage, setSyncMessage] = useState(null);
  const [progress, setProgress] = useState(false);

  const codePushStatusDidChange = syncStatus => {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        setSyncMessage('Kiểm tra cập nhật');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setSyncMessage('Đang trong quá trình cập nhật');
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        setSyncMessage('Yêu cầu chấp nhận');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setSyncMessage('Đang tải dữ liệu cập nhật');
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        setSyncMessage('Phần mềm đã cập nhật');
        setProgress(false);
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        setSyncMessage('Update cancelled by user.');
        setProgress(false);
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        setSyncMessage(
          'Đã cập nhật thành công, phần mềm sẽ được khởi động lại',
        );
        setProgress(false);
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        setSyncMessage('Xảy ra lỗi, vui lòng kiểm tra kết nối');
        setProgress(false);
        break;
    }
  };

  const codePushDownloadDidProgress = ({receivedBytes, totalBytes}) => {
    setProgress({receivedBytes, totalBytes});
  };

  const upgradeApp = async () => {
    let rs = await CodePush.sync(
      {
        updateDialog: auto
          ? null
          : {
              appendReleaseDescription: false,
              descriptionPrefix: '\n\nNhững thay đổi:\n',
              mandatoryContinueButtonLabel: 'Tiếp tục',
              mandatoryUpdateMessage:
                'Có bản cập nhật ứng dụng Nhà Khôn mới, bạn phải cài ngay!',
              optionalIgnoreButtonLabel: 'Bỏ qua',
              optionalInstallButtonLabel: 'Cài ngay',
              optionalUpdateMessage:
                'Có bản cập nhật ứng dụng Nhà Khôn mới, bạn có muốn cài đặt ngay?',
              title: 'Cập nhật ứng dụng',
            },
        installMode: CodePush.InstallMode.IMMEDIATE,
      },
      codePushStatusDidChange,
      codePushDownloadDidProgress,
    );
    return rs;
  };

  const formatBytes = bytes => {
    if (!bytes) return;
    var marker = 1024;
    var decimal = 3;
    var kiloBytes = marker;
    var megaBytes = marker * marker;
    var gigaBytes = marker * marker * marker;
    // var teraBytes = marker * marker * marker * marker;

    if (bytes < kiloBytes) {
      return bytes + ' Bytes';
    } else if (bytes < megaBytes) {
      return (bytes / kiloBytes).toFixed(decimal) + ' KB';
    } else if (bytes < gigaBytes) {
      return (bytes / megaBytes).toFixed(decimal) + ' MB';
    }
    return (bytes / gigaBytes).toFixed(decimal) + ' GB';
  };

  useEffect(() => {
    if (auto) upgradeApp();
  }, []);

  return {
    syncMessage,
    rawProgress: progress,
    progress: progress
      ? {
          receivedBytes: formatBytes(progress['receivedBytes']),
          totalBytes: formatBytes(progress['totalBytes']),
        }
      : {},
  };
}

export function useCheckingUpgradeApp() {
  const [data, setData] = useState(false);
  const _setData = async () => {
    let isUpgrade = await CodePush.checkForUpdate();
    if (isUpgrade && isUpgrade?.failedInstall !== true) setData(isUpgrade);
    // setData({});
  };

  useEffect(() => {
    _setData();
  }, []);

  return data;
}

/**
 *
 * @param {Function} convert
 */
export function useAppVersion(convert = info => info) {
  let {native_ver, build, js_ver} = deviceInfo.getParamDefault();
  return {native_ver, js_ver, isBeta: build === "9999"};
}
