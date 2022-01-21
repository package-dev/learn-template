import React from 'react';
import { View as RNView, ViewProps, StyleSheet, FlexAlignType, ColorValue } from 'react-native';


interface Props extends ViewProps {
  margin?: number
  marginV?: number
  marginH?: number
  marginT?: number
  marginR?: number
  marginB?: number
  marginL?: number
  padding?: number
  paddingV?: number
  paddingH?: number
  paddingT?: number
  paddingR?: number
  paddingB?: number
  paddingL?: number,
  alignItems?: FlexAlignType,
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | undefined;
  flex?: number | undefined
  backgroundColor?: ColorValue | undefined;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | undefined;
  height?: number | string | undefined;
  width?: number | string | undefined;
  border?: number
  borderT?: number
  borderR?: number
  borderL?: number
  borderB?:number
  radius?: number
  trRadius?: number
  tlRadius?: number
  brRadius?: number
  blRadius?: number
  borderColor?: ColorValue | undefined;
  bbColor?: ColorValue | undefined;
  btColor?: ColorValue | undefined;
  brColor?: ColorValue | undefined;
  blColor?: ColorValue | undefined;
    
}

const View = ({
  margin,
  padding,
  marginB,
  marginH,
  marginL,
  marginR,
  marginT,
  marginV,
  paddingB,
  paddingH,
  paddingL,
  paddingR,
  paddingT,
  paddingV,
  children,
  flex,
  flexDirection,
  flexWrap,
  height,
  width,
  border,
  borderT,
  borderR,
  borderL,
  borderB,
  radius,
  trRadius,
  tlRadius,
  brRadius,
  blRadius,
  borderColor,
  bbColor,
  btColor,
  brColor,
  blColor,
  alignItems,
  justifyContent,
  backgroundColor,
  style,
  ...props
}: Props) =>
{
  const marginLeft = (marginL || marginH || margin || 0).w();
  const marginRight = (marginR || marginH || margin || 0).w();
  const marginTop = (marginT || marginV || margin || 0).w();
  const marginBottom = (marginB || marginB || margin || 0).w();
  const paddingTop = (paddingT || paddingV || padding || 0).w();
  const paddingBottom = (paddingB || paddingV || padding || 0).w();
  const paddingRight = (paddingR || paddingH || padding || 0).w();
  const paddingLeft = (paddingL || paddingH || padding || 0).w();
  const borderTopWidth = (borderT || border || 0).w();
  const borderRightWidth = (borderR || border || 0).w();
  const borderLeftWidth = (borderL || border || 0).w();
  const borderBottomWidth = (borderB || border || 0).w();
  const borderTopRightRadius = (trRadius || radius || 0).w();
  const borderTopLeftRadius = (tlRadius || radius || 0).w();
  const borderBottomRightRadius = (brRadius || radius || 0).w();
  const borderBottomLeftRadius = (blRadius || radius || 0).w();
  const borderBottomColor = bbColor || borderColor;
  const borderTopColor = btColor || borderColor;
  const borderRightColor = brColor || borderColor;
  const borderLeftColor = blColor || borderColor;
    
  return (
    <RNView
      {...props}
      style={StyleSheet.flatten([
        style,
        {
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
          paddingLeft,
          paddingRight,
          paddingBottom,
          paddingTop,
          flex,
          flexDirection,
          alignItems,
          justifyContent,
          backgroundColor,
          flexWrap,
          height,
          width,
          borderTopWidth,
          borderRightWidth,
          borderLeftWidth,
          borderBottomWidth,
          borderTopRightRadius,
          borderTopLeftRadius,
          borderBottomRightRadius,
          borderBottomLeftRadius,
          borderBottomColor,
          borderTopColor,
          borderRightColor,
          borderLeftColor
        }
      ])} >
      {children}
    </RNView>
  );
};

export default View;
