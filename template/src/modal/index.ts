import React, { ReactNode } from 'react';
import { ModalProps } from 'react-native-modal';

export type IBaseModalConfig = Partial<ModalProps>

export interface RefBaseModal {
  show: ({ child, config } : {child: ReactNode, config?: IBaseModalConfig}) => void;
  hide: () => void;
}

export const appModal = React.createRef<RefBaseModal>();