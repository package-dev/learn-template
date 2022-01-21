import React from 'react';
import * as IconC from './Icon';
import PropTypes from 'prop-types';
import {has} from 'underscore';
import {normalizeText, Typography} from '../Typography';
import {Block} from '../Block';

export const Icon = ({family, size, color, ...rest}) => {
  if (has(IconC, family)) {
    let IconRender = IconC[family];
    return <IconRender {...rest} size={normalizeText(size)} color={color} />;
  }
  return null;
};

Icon.propTypes = {
  family: PropTypes.string,
};
Icon.defaultProps = {
  size: 30,
};

export const InfoIcon = ({
  info,
  infoSize,
  infoColor,
  containerStyle,
  size,
  color,
  ...rest
}) => (
  <Block center style={containerStyle}>
    <Icon size={size} color={color} {...rest} />
    {info ? (
      <Typography small size={infoSize} color={infoColor} {...rest}>
        {info}
      </Typography>
    ) : null}
  </Block>
);

InfoIcon.propTypes = {
  info: PropTypes.string,
  infoSize: PropTypes.number,
  infoColor: PropTypes.string,
  containerStyle: PropTypes.object,
};

InfoIcon.defaultProps = {
  info: '',
  infoColor: 'white',
};
