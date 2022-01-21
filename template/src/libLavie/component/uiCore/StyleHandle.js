export const StyleHandle = {
  layout: (alignItems = 'flex-start', justifyContent = 'flex-start') => ({
    alignItems,
    justifyContent,
  }),
  center: () => ({
    alignItems: 'center',
    justifyContent: 'center',
  }),
  alignCenter: () => ({
    alignItems: 'center',
  }),
  contentCenter: () => ({
    justifyContent: 'center',
  }),
  size: (width, height) => {
    const tempStyle = {};
    if (typeof width === 'number') {
      tempStyle.width = width;
    }
    if (typeof height === 'number') {
      tempStyle.height = height;
    }
    return tempStyle;
  },
  margin: (top = 0, right = 0, bottom = 0, left = 0) => {
    return {
      marginTop: top,
      marginRight: right,
      marginBottom: bottom,
      marginLeft: left,
    };
  },
  padding: (top = 0, right = 0, bottom = 0, left = 0) => {
    return {
      paddingTop: top,
      paddingRight: right,
      paddingBottom: bottom,
      paddingLeft: left,
    };
  },
  radius: (topLeft = 0, topRight = 0, bottomLeft = 0, bottomRight = 0) => {
    return {
      borderTopLeftRadius: topLeft,
      borderTopRightRadius: topRight,
      borderBottomLeftRadius: bottomLeft,
      borderBottomRightRadius: bottomRight,
    };
  },
  borderColor: (
    topLeft = '#fffff',
    topRight = '#fffff',
    bottomLeft = '#fffff',
    bottomRight = '#fffff',
  ) => {
    return {
      borderTopLeftColor: topLeft,
      borderTopRightColor: topRight,
      borderBottomLeftColor: bottomLeft,
      borderBottomRightColor: bottomRight,
    };
  },
  border: (direction = 'all', width = 1, color = 'black', style = 'solid') => {
    const tempStyle = {};
    if (direction === 'all') {
      tempStyle.borderWidth = width;
      tempStyle.borderColor = color;
      tempStyle.borderStyle = style;
    } else {
      const directions = direction.split(' ');
      for (const d of directions) {
        if (/Top|Right|Bottom|Left/.test(d)) {
          tempStyle[`border${d}Width`] = width;
          tempStyle[`border${d}Color`] = color;
          tempStyle.borderStyle = style;
        }
      }
    }
    return tempStyle;
  },
  flex: (value = 1) => ({
    flex: value,
  }),
  bgColor: (color = 'white') => ({
    backgroundColor: color,
  }),
  color: (color = 'white') => ({
    color,
  }),
  /**
   * alignSelf: String
   * one of [auto, baseline, center, flex-start, flex-end, stretch], default is stretch
   */
  alignSelf: (alignSelf = 'stretch') => ({
    alignSelf,
  }),
  textAlign: (textAlign = 'center') => ({
    textAlign,
  }),
  font: (size = 14, height, weight = 'normal') => ({
    fontSize: size,
    lineHeight: height || size,
    fontWeight: weight,
  }),
  position: (mode = 'absolute', top, right, bottom, left) => {
    const tempStyle = {position: mode};
    if (typeof top === 'number') {
      tempStyle.top = top;
    }
    if (typeof right === 'number') {
      tempStyle.right = right;
    }
    if (typeof bottom === 'number') {
      tempStyle.bottom = bottom;
    }
    if (typeof left === 'number') {
      tempStyle.left = left;
    }
    return tempStyle;
  },
  direction: (direction = 'row') => ({
    flexDirection: direction,
  }),
};

