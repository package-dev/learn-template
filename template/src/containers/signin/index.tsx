import React from 'react';
import { View, Button, Text } from 'react-native';

import { navigate } from '@/navigations/Navigator';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginRequest } from '@/store/authenticated/actions';
import { t } from '@/locales';
import { appModal } from '@/modal';
import { ScreenName } from '@/navigations/model';

const Signin = () =>
{
  const authenticated = useAppSelector(state => state.authenticated);
  const dispatch = useAppDispatch();
    
  const handleSignin = () =>
  {
    console.log('authenticated: ', authenticated);
    dispatch(loginRequest({ username: 'abc', password: 'xyz' }));
    navigate(ScreenName.Root);
  };
    
  const handleShowModal = () =>
  {
      appModal.current?.show({
        child: renderAbc(),
        config: {
          onDismiss: () => { console.log('dismiss'); },
          onModalHide: () => console.log('hide ne'),
          backdropColor: '#333'
        }
      });
  };
    
  const renderAbc = () =>
  {
    return (
      <View style={{ backgroundColor: 'red' }}>
        <Text>
          {'Modal ne'}
        </Text>
      </View>
    );
  };

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Button title={t('authenticated.login')} onPress={handleSignin} />
      <Button title={'Show modal'} onPress={handleShowModal} />
    </View>
  );
};

export default Signin;
