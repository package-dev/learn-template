import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Block, LoadingButton, Typography, widthPercentageToDP} from '@uiCore';
import Note from './Note';
import {isFunction} from 'underscore';
import {useIsFocused} from '@react-navigation/native';
import {Spancing} from "./index";
import {navigate} from "@lib/rootNavigation";

const QRScenner = ({onNext, type}) => {
  const isFocused = useIsFocused();
  const onSuccess = e => {
    if (isFunction(onNext)) onNext(e);
  };
  return (
      <Block>
        <Block flex>
          <Block
              middle
              center
              width={widthPercentageToDP(90)}
              height={widthPercentageToDP(100)}>
            {isFocused && (
                <QRCodeScanner
                    reactivate={true}
                    reactivateTimeout={4000}
                    showMarker={true}
                    onRead={onSuccess}
                    notAuthorizedView={
                      <Block flex>
                        <Typography>Cấp phép quyền truy cập camera</Typography>
                      </Block>
                    }
                    permissionDialogTitle={'Quyền truy cập camera'}
                    permissionDialogMessage={
                      'Vui lòng cho phép truy cập camera để quét mã qr'
                    }
                />
            )}
          </Block>
          <Typography center style={{margin: 10}}>Di chuyển camera đến vùng chứa mã QR để quét tự động</Typography>
          <Typography center style={{marginVertical: 20}}>Hoặc</Typography>
          <Spancing borderBottom={false} paddingVertical>
            <LoadingButton title={'Nhập mã bằng tay'} onPress={() => {
              navigate("addDevice_wifi_EnterQR",{onSuccess, type})
            }}/>
          </Spancing>
        </Block>
      </Block>
  );
};

export default QRScenner;
