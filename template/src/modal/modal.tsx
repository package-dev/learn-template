import { IBaseModalConfig, RefBaseModal } from '@/modal';
import React, {
  forwardRef,
  ReactNode,
  Ref,
  useImperativeHandle,
  useState,
} from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

interface IBaseModalState
{
  visible: boolean,
  config?: IBaseModalConfig | null
}

const BaseModal = forwardRef(
  (props, ref: Ref<RefBaseModal>) =>
  {
    useImperativeHandle(ref, () => ({
      show,
      hide,
    }));
        
    const [state, setState] = useState<IBaseModalState>({
      visible: false,
    });
    
    const show = ({ child, config } : {child: ReactNode, config?: IBaseModalConfig }) =>
    {
      setState({ visible: true, config: { ...config, children: child } });
    };
    
    const hide = () =>
    {
      setState(prev => ({ ...prev, visible: false }));
      setTimeout(() => {
        setState({ visible: false });
      }, 300);
    };
        
    return (
      <Modal
        backdropColor={'#fff'}
        backdropOpacity={0.8}
        statusBarTranslucent
        useNativeDriver
        hideModalContentWhileAnimating
        {...state.config}
        isVisible={state.visible}
      >
        {state.config?.children ?? <View/>}
      </Modal>
    );
  }
);
  
BaseModal.displayName = 'BaseModal';
  
export default BaseModal;