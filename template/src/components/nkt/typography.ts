import {Platform} from 'react-native';

/**
 * Just the font names.
 *
 * The various styles of fonts are defined in the <Text /> component.
 */
export const typography = {
  /**
   * The primary font.  Used in most places.
   */
  primary: Platform.select({ios: 'Montserrat', android: 'Montserrat'}),

  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ios: 'Montserrat', android: 'Montserrat'}),

  helveticaNeue_bold: Platform.select({
    ios: 'HelveticaNeue-Bold',
    android: 'HelveticaNeue-Bold',
  }),
  helveticaNeue_regular: Platform.select({
    ios: 'HelveticaNeue',
    android: 'HelveticaNeue',
  }),
  helveticaNeue_medium: Platform.select({
    ios: 'HelveticaNeue-Medium',
    android: 'HelveticaNeue-Medium',
  }),
  helveticaNeue_italic: Platform.select({
    ios: 'HelveticaNeue-Italic',
    android: 'HelveticaNeue-Italic',
  }),
};
