
import moment from 'moment';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState, useCallback } from 'react';
import {
    ActivityIndicator as ActivityIndicatorRN,
    Alert as AlertRN,
    AppState,
    FlatList as FlatListRN, Image as ImageRN,
    Platform, StyleSheet, Text as TextRN,
    TextInput as TextInputRN, TouchableOpacity, View,
    ScrollView as ScrollViewRN
} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import ModalRN from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSafeArea } from 'react-native-safe-area-context';
import { default as AntDesignRN } from 'react-native-vector-icons/AntDesign';
import { default as EvilIconsRN } from 'react-native-vector-icons/EvilIcons';
import { default as FontAwesomeRN } from 'react-native-vector-icons/FontAwesome';
import { default as FontAwesome5RN } from 'react-native-vector-icons/FontAwesome5';
import { default as IoniconsRN } from 'react-native-vector-icons/Ionicons';
import { default as EntypoRN } from 'react-native-vector-icons/Entypo';
import { default as MaterialCommunityIconsRN } from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as MaterialIconsRN } from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import constants from '../../../common/constants';
import { _sleep } from '../../../common/index';
import Utils from '../../../library/utils/Utils';
import { palette as appColors } from '../../../themes/palette';
import StylesCus from '../../../themes/StylesCus';
import { change_alias } from '../../utils/i18n/translate';
import { checkAndRequest, PERMISSIONS } from '../../utils/Permission';
import { default as IoniconsFont } from '../iconVector/IoniconsFont';
import { default as CollapsibleRN } from 'react-native-collapsible';
import { default as SliderRN } from '@react-native-community/slider';
import { TextInputMask } from 'react-native-masked-text'
//#region 
const MIME_TYPE = {
    "text/html": "html htm shtml",
    "text/css": "css",
    "text/xml": "xml",
    "image/gif": "gif",
    "image/jpeg": "jpeg jpg",
    "application/x-javascript": "js",
    "application/atom+xml": "atom",
    "application/rss+xml": "rss",
    "text/mathml": "mml",
    "text/plain": "txt",
    "text/vnd.sun.j2me.app-descriptor": "jad",
    "text/vnd.wap.wml": "wml",
    "text/x-component": "htc",
    "image/png": "png",
    "image/tiff": "tif tiff",
    "image/vnd.wap.wbmp": "wbmp",
    "image/x-icon": "ico",
    "image/x-jng": "jng",
    "image/x-ms-bmp": "bmp",
    "image/svg+xml": "svg",
    "image/webp": "webp",
    "application/java-archive": "jar war ear",
    "application/mac-binhex40": "hqx",
    "application/msword": "doc",
    "application/pdf": "pdf",
    "application/postscript": "ps eps ai",
    "application/rtf": "rtf",
    "application/vnd.ms-excel": "xls",
    "application/vnd.ms-powerpoint": "ppt",
    "application/vnd.wap.wmlc": "wmlc",
    "application/vnd.google-earth.kml+xml": "kml",
    "application/vnd.google-earth.kmz": "kmz",
    "application/x-7z-compressed": "7z",
    "application/x-cocoa": "cco",
    "application/x-java-archive-diff": "jardiff",
    "application/x-java-jnlp-file": "jnlp",
    "application/x-makeself": "run",
    "application/x-perl": "pl pm",
    "application/x-pilot": "prc pdb",
    "application/x-rar-compressed": "rar",
    "application/x-redhat-package-manager": "rpm",
    "application/x-sea": "sea",
    "application/x-shockwave-flash": "swf",
    "application/x-stuffit": "sit",
    "application/x-tcl": "tcl tk",
    "application/x-x509-ca-cert": "der pem crt",
    "application/x-xpinstall": "xpi",
    "application/xhtml+xml": "xhtml",
    "application/zip": "zip",
    "application/octet-stream": "msi msp msm",
    "audio/midi": "mid midi kar",
    "audio/mpeg": "mp3",
    "audio/ogg": "ogg",
    "audio/x-realaudio": "ra",
    "video/3gpp": "3gpp 3gp",
    "video/mpeg": "mpeg mpg",
    "video/quicktime": "mov",
    "video/x-flv": "flv",
    "video/x-mng": "mng",
    "video/x-ms-asf": "asx asf",
    "video/x-ms-wmv": "wmv",
    "video/x-msvideo": "avi",
    "video/mp4": "m4v mp4"
}
//#endregion

//#region Hook custom
const useStateCallback = (initialState, callback) => {
    const [state, setState] = useState(initialState);

    useEffect(() => callback(state), [state, callback]);

    return [state, setState];
};

const useStateCallbackLayout = (initialState, callback) => {
    const [state, setState] = useState(initialState);

    useLayoutEffect(() => callback(state), [state, callback]);

    return [state, setState];
};

const useStateSetCallback = initialValue => {
    const callbackRef = useRef(null);

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (callbackRef.current) {
            callbackRef.current(value);

            callbackRef.current = null;
        }
    }, [value]);

    const setValueWithCallback = (newValue, callback) => {
        callbackRef.current = callback;

        return setValue(newValue);
    };

    return [value, setValueWithCallback];
};
const useForceUpdate = function () {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
        setTick(tick => tick + 1);
    }, [])
    return update;
}
//#endregion

//#region  Alert
let Alert = {
    Confirm: (callback, cancelPress, mess, title, textButtonCancel, textButtonOK, textAskMe, askMePress) => {
        AlertRN.alert(
            title || 'Thông báo',
            mess || 'Bạn có muốn xóa?',
            (
                textAskMe != null ? [
                    {
                        text: textAskMe || 'Nhắc tôi sau',
                        onPress: () => {
                            if (askMePress) askMePress();
                        }
                    }
                ] :
                    []
            ).concat([
                {
                    text: textButtonCancel || 'Hủy',
                    onPress: () => {
                        if (cancelPress) cancelPress();
                    },
                    style: 'cancel',
                },
                {
                    text: textButtonOK || 'Đồng ý',
                    onPress: () => {
                        if (callback) callback();
                    }
                },
            ]),
            { cancelable: false },
        );
    },
    Alert: (mess, title, callback) => {
        AlertRN.alert(
            title || 'Thông báo',
            mess || 'Có lỗi xẩy ra, vui lòng thử lại.',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        if (callback) callback();
                    }
                },
            ],
            { cancelable: false }
        );
    },
}
//#endregion

//#region  ViewHorizontal
var ViewHorizontal = (props) => {
    const { children } = props
    return (
        <View
            {...props}
            style={[
                {
                    flexDirection: 'row'
                },
                props.style
            ]}
        >
            {children}
        </View>
    )
}
//#endregion

//#region  ViewHorizontalCenter
var ViewHorizontalCenter = (props) => {

    const { children, style, styleContainer } = props;
    return (
        <View
            style={[
                {
                    flexDirection: 'row',
                },
                styleContainer
            ]}
        >
            <View
                style={[
                    {
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    style
                ]}
            >
                {children}
            </View>
        </View>
    )
}
//#endregion

//#region ActivityIndicator
const ActivityIndicator = React.forwardRef((props, ref) => {
    const { children, styleContainer, initValue = true, value = null } = props;
    const [isToggle, setIsToggle] = useState(value || initValue);

    useEffect(() => {
        if (value != null && value != isToggle)
            setIsToggle(value)
    }, [value])

    React.useImperativeHandle(ref, () => ({
        toggle: flag => {
            flag = flag == null ? !isToggle : flag;
            setIsToggle(flag);
        }
    }))
    return (
        isToggle &&
        <ActivityIndicatorRN size='large' color={appColors.primary} {...props} />
    )
})
//#endregion

//#region ViewCenter
const ViewCenter = (props) => {
    const { children, styleContainer } = props
    return (
        <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', }, styleContainer]}>
            {children}
        </View>
    )
}
//#endregion

//#region EmptyComponent
const EmptyComponent = ({ styleContainer, text = 'Không có dữ liệu', icon = null } = {}) => {
    return (
        <ViewIcon
            styleContainer={[{ alignItems: 'center', paddingVertical: 20, paddingHorizontal: 10 }, styleContainer]}
            styleVertical={{ justifyContent: 'center', marginTop: 10 }}
            iconTop={icon || <Ionicons icon={IoniconsFont.albumsOutline} color={appColors.lightGrey} size={50} />}
            styleText={{ color: appColors.materialGrey, textAlign: 'center', fontSize: 16, }}
        >
            {text}
        </ViewIcon>
    )
}
//#endregion

//#region ViewBoxShadown
const ViewBoxShadown = (props) => {
    const { children, style } = props
    return (
        <View
            {...props}
            style={[
                {
                    backgroundColor: '#fff',
                    padding: 10,
                    marginVertical: 10,
                    ...StylesCus.boxShadow
                },
                style
            ]}
        >
            {children}
        </View>
    )
}
//#endregion

//#region Loading
const Loading = forwardRef((props, ref) => {
    const { initValue = false, style } = props;
    const [isShow, setIsShow] = useState(initValue);
    const isActive = useSelector(state => state.debug.isActive)

    const toggle = (flag) => {
        flag = flag == null ? !isShow : flag;
        setIsShow(flag);
    }

    useImperativeHandle(
        ref,
        () => ({
            toggle
        }),
    )
    return (
        isShow &&
        <View
            style={[
                {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,.7)'
                },
                style
            ]}>
            <ActivityIndicatorRN size='large' color={'#fff'} />
            {
                isActive &&
                <Button
                    onPress={() => toggle(false)}
                >
                    {'Hiden'}
                </Button>
            }
        </View>
    );
});
//#endregion

//#region Text
const FontCustom = {
    'Arial': Platform.select({
        android: 'arial',
        ios: 'arial'
    }),
    Roboto_Black: Platform.select({
        android: 'Roboto-Black',
        ios: 'Roboto-Black'
    }),
    Roboto_BlackItalic: Platform.select({
        android: 'Roboto-BlackItalic',
        ios: 'Roboto-BlackItalic'
    }),
    Roboto_Bold: Platform.select({
        android: 'Roboto-Bold',
        ios: 'Roboto-Bold'
    }),
    Roboto_BoldItalic: Platform.select({
        android: 'Roboto-BoldItalic',
        ios: 'Roboto-BoldItalic'
    }),
    Roboto_Italic: Platform.select({
        android: 'Roboto-Italic',
        ios: 'Roboto-Italic'
    }),
    Roboto_Light: Platform.select({
        android: 'Roboto-Light',
        ios: 'Roboto-Light'
    }),
    Roboto_LightItalic: Platform.select({
        android: 'Roboto-LightItalic',
        ios: 'Roboto-LightItalic'
    }),
    Roboto_Medium: Platform.select({
        android: 'Roboto-Medium',
        ios: 'Roboto-Medium'
    }),
    Roboto_MediumItalic: Platform.select({
        android: 'Roboto-MediumItalic',
        ios: 'Roboto-MediumItalic'
    }),
    Roboto_Regular: Platform.select({
        android: 'Roboto-Regular',
        ios: ''
    }),
    Roboto_Thin: Platform.select({
        android: 'Roboto-Thin',
        ios: 'Roboto-Thin'
    }),
    Roboto_ThinItalic: Platform.select({
        android: 'Roboto-ThinItalic',
        ios: 'Roboto-ThinItalic'
    }),
    'ProximaNovaLg_Black': Platform.select({
        android: 'ProximaNovaLg_Black',
        ios: 'ProximaNova-Black'
    }),
    'ProximaNovaLg_BlackItalic': Platform.select({
        android: 'ProximaNovaLg_BlackItalic',
        ios: 'ProximaNova-BlackIt'
    }),
    'ProximaNovaLg_Bold_Italic': Platform.select({
        android: 'ProximaNovaLg_Bold_Italic',
        ios: 'ProximaNova-BoldIt'
    }),
    'ProximaNovaLg_Bold': Platform.select({
        android: 'ProximaNovaLg_Bold',
        ios: 'ProximaNova-Bold'
    }),
    'ProximaNovaLg_Light_Italic': Platform.select({
        android: 'ProximaNovaLg_Light_Italic',
        ios: 'ProximaNova-LightIt'
    }),
    'ProximaNovaLg_Light': Platform.select({
        android: 'ProximaNovaLg_Light',
        ios: 'ProximaNova-Light'
    }),
    'ProximaNovaLg_Regular_Italic': Platform.select({
        android: 'ProximaNovaLg_Regular_Italic',
        ios: 'ProximaNova-RegularIt'
    }),
    'ProximaNovaLg_Regular': Platform.select({
        android: 'ProximaNovaLg_Regular',
        ios: 'ProximaNova-Regular'
    }),
    'ProximaNovaLg_Semibold_Italic': Platform.select({
        android: 'ProximaNovaLg_Semibold_Italic',
        ios: 'ProximaNova-SemiboldIt'
    }),
    'ProximaNovaLg_Semibold': Platform.select({
        android: 'ProximaNovaLg_Semibold',
        ios: 'ProximaNova-Semibold'
    }),
    'ProximaNovaLg_Thin_Italic': Platform.select({
        android: 'ProximaNovaLg_Thin_Italic',
        ios: 'ProximaNova-ThinIt'
    }),
    'ProximaNovaLg_Thin': Platform.select({
        android: 'ProximaNovaLg_Thin',
        ios: 'ProximaNovaT-Thin'
    }),
}
const Text = (props) => {
    const { style, children, required = false } = props;
    var _style = StyleSheet.flatten([
        {
            color: 'black',
            // textAlign: 'justify',
            // fontFamily: FontCustom.Roboto_Light,
            // fontFamily: FontCustom.ProximaNovaLg_Bold,
        },
        style
    ])

    return (
        <TextRN
            {...props}
            allowFontScaling={false}
            style={_style}
        >
            {children == null ? null : children.constructor == String ? children : children.constructor == Object ? JSON.stringify(children) : (children + '')}
            {
                required &&
                <TextRN style={{ color: appColors.materialRed }}>{' *'}</TextRN>
            }
        </TextRN>
    )
}
//#endregion

//#region Button
const Button = (props) => {
    const { style, children, styleText } = props;
    const isShowTouchable = useSelector(state => state.debug.isShowTouchable);

    var _style = StyleSheet.flatten([
        {
            paddingVertical: 8,
            paddingHorizontal: 8,
            backgroundColor: '#f4f4f4',
            justifyContent: 'center',
            alignItems: 'center'
        },
        style,
        isShowTouchable && {
            borderColor: '#00d6ff',
            borderWidth: 1
        }
    ])
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            {...props}
            style={_style}
        >
            {
                children == null ? null : children.constructor == String ?
                    <Text
                        style={[{}, styleText]}
                    >{children}</Text>
                    : children
            }
        </TouchableOpacity>
    )
}
//#endregion

//#region Image
const Image = (props) => {
    var {
        source = { uri: '' },
        autoHeight = false,
        style
    } = props;
    const imgSize = useRef({
        w: 1, h: 1
    })
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    var isFetchImage = async (uri) => {
        return new Promise((resolve, reject) => {
            ImageRN.prefetch(uri).then(status => {
                resolve(true)
            }, error => {
                resolve(false)
            });
        });
    }
    var load = async () => {
        setIsLoading(true);
        setIsError(false);
        if (source.constructor == Number) {
            var info = ImageRN.resolveAssetSource(source);
            imgSize.current = {
                w: info.width,
                h: info.height,
            }
            setIsLoading(false);
        }
        else if (source.uri != null && source.uri.constructor == String) {
            if (autoHeight == true) {
                ImageRN.getSize(source.uri, async (w, h) => {
                    imgSize.current = {
                        w, h
                    }
                    var isLoaded = await isFetchImage(source.uri);
                    setIsLoading(false);
                    setIsError(isLoaded ? false : true);
                }, (error) => {
                    setIsError(true);
                })
            }
            else {
                var isLoaded = await isFetchImage(source.uri);
                setIsLoading(false);
                setIsError(isLoaded ? false : true);
            }
        }
    }

    useEffect(() => {
        load();
    }, [source]);

    var _style = StyleSheet.flatten([{ width: 1, height: 1 }, style])

    return (
        isError ?
            <View>
                <Text>
                    {'Image error.'}
                </Text>
            </View>
            : isLoading ?
                <View
                    style={{
                        width: _style.width,
                        height: _style.height,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <ActivityIndicatorRN size="small" color={appColors.materialGrey} />
                </View>
                : <FastImage
                    resizeMode={"contain"}
                    {...props}
                    style={[
                        _style,
                        autoHeight ? {
                            height: (_style.width / imgSize.current.w) * imgSize.current.h
                        } : {}
                    ]}
                    source={source}
                    onLayout={function (event) {
                    }}
                />
    )
}
//#endregion

//#region Modal
const Modal = forwardRef((props, ref) => {
    const {
        onBackdropPress,
        onModalHide,
        children,
        title,
        styleModal,
        styleContainer,
        styleContent,
        isHidenClickBackrop = true,
        titleComponent = null
    } = props;
    const refLoading = useRef();
    const insets = useSafeArea();
    const [isShow, setIsShow] = useStateSetCallback(false)
    useImperativeHandle(ref, () => ({
        toggle,
        toggleLoading
    }))

    const toggle = (flag, callback) => {
        return new Promise((resolve, reject) => {
            flag = flag == null ? !isShow : flag
            setIsShow(flag, currentFlag => (callback || resolve)(currentFlag));
        });
    }
    const toggleLoading = (flag) => {
        refLoading.current?.toggle(flag)
    }
    return (
        <>
            <ModalRN
                {...props}
                isVisible={isShow}
                onBackdropPress={() => {
                    isHidenClickBackrop && toggle(false);
                    onBackdropPress != null && onBackdropPress()
                }}
                onModalHide={() => {

                    onModalHide != null && onModalHide()
                }}
                useNativeDriver={true}
                style={[
                    {
                        flexShrink: 1,
                        paddingTop: Math.max(insets.top, 8),
                        paddingBottom: Math.max(insets.bottom, 8),
                    },
                    styleModal
                ]}
            >
                <View
                    style={[
                        {
                            backgroundColor: 'white',
                            paddingVertical: 8,
                            borderRadius: 10,
                            flexShrink: 1,
                            width: '100%'
                        },
                        styleContainer
                    ]}
                >
                    {
                        titleComponent != null ? titleComponent : (title || '') == '' ? null : title.constructor == String ?
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        flex: 1
                                    }}
                                >
                                    {title}
                                </Text>
                                <Button
                                    style={{
                                        backgroundColor: 'transparent'
                                    }}
                                    onPress={() => toggle(false)}
                                >
                                    <Ionicons
                                        name='close'
                                        size={25}
                                    />
                                </Button>
                            </View>
                            : title
                    }
                    <View
                        style={[
                            {
                                flexShrink: 1,
                            },
                            (title || '') != '' && {
                                borderColor: '#f2f2f2', borderTopWidth: 1,
                                paddingVertical: 8,
                                paddingHorizontal: 15,
                            },
                            styleContent
                        ]}
                    >
                        {children}
                    </View>
                    <Loading ref={refLoading} />
                </View>
            </ModalRN>
        </>
    )
})
//#endregion

//#region Header
const Header = (props) => {
    const insets = useSafeArea();
    const {
        style,
        styleContainer,
        styleTextTitle,
        title,
        rightComponent = null
    } = props;
    return (
        <View
            style={[
                {
                    backgroundColor: appColors.primary,
                    width: '100%',
                },
                styleContainer
            ]}
        >
            <View
                style={{
                    height: insets.top
                }}
            />
            <View
                style={{
                    justifyContent: 'center',
                }}
            >
                {
                    title == null ? null : title.constructor == String ?
                        <Text
                            style={[
                                {
                                    textAlign: 'center',
                                    fontSize: 20,
                                    // textTranform: 'capitalize',
                                    color: appColors.white,
                                    paddingVertical: 10
                                },
                                styleTextTitle
                            ]}
                        >
                            {title}
                        </Text>
                        : title
                }
                <Button
                    style={{
                        backgroundColor: appColors.transparent,
                        position: 'absolute',
                        height: '100%',
                        paddingHorizontal: 8,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigateBack()}
                >
                    <AntDesign name='left' color={appColors.white} size={28} />
                </Button>
                {
                    rightComponent != null &&
                    <View
                        style={{
                            position: 'absolute',
                            height: '100%',
                            paddingHorizontal: 8,
                            justifyContent: 'center',
                            right: 0
                        }}
                    >
                        {rightComponent}
                    </View>
                }
            </View>
        </View>
    )
}
//#endregion

//#region  Icon
//https://oblador.github.io/react-native-vector-icons/
class Icon extends React.PureComponent {
    static Type = {
        Ionicons: IoniconsRN,
        AntDesign: AntDesignRN,
        Entypo: EntypoRN,
        EvilIcons: EvilIconsRN,
        MaterialIcons: MaterialIconsRN,
        MaterialCommunityIcons: MaterialCommunityIconsRN,
        FontAwesome: FontAwesomeRN,
        FontAwesome5: FontAwesome5RN,
    }
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        var { type, size, color, name, icon } = this.props;
        type = type == null || type == '' ? 'Ionicons' : type;
        size = size || 24;
        color = color || 'black';
        name = name || icon || '';

        var IconView = Icon.Type[type];
        return (
            <IconView {...this.props} size={size} color={color} name={name} />
        );
    }
}
Icon.defaultProps = {
    type: '',
    size: '',
    name: '',
    icon: '',
    color: ''
}

var Ionicons = (props) => {
    return <Icon {...props} type='Ionicons' />
}

var AntDesign = (props) => {
    return <Icon {...props} type='AntDesign' />
}

var EvilIcons = (props) => {
    return <Icon {...props} type='EvilIcons' />
}

var MaterialIcons = (props) => {
    return <Icon {...props} type='MaterialIcons' />
}

var MaterialCommunityIcons = (props) => {
    return <Icon {...props} type='MaterialCommunityIcons' />
}

var FontAwesome = (props) => {
    return <Icon {...props} type='FontAwesome' />
}

var FontAwesome5 = (props) => {
    return <Icon {...props} type='FontAwesome5' />
}
//#endregion

//#region ViewIcon
class ViewIcon extends React.PureComponent {
    render() {
        var {
            iconTop, iconBottom, iconLeft, iconRight, children,
            styleContainer,
        } = this.props;
        return (
            <View
                style={[
                    {},
                    iconTop != null || iconBottom != null && {
                        alignItems: 'center'
                    },
                    styleContainer
                ]}
            >
                {iconTop}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    {iconLeft != null &&
                        <View
                            style={[
                                {
                                    marginRight: 5
                                },
                                this.props.styleIconLeftContainer
                            ]}
                        >
                            {iconLeft}
                        </View>
                    }
                    {children != null && children.constructor == String ?
                        <Text
                            style={[
                                {},
                                this.props.styleText
                            ]}
                        >{children}</Text>
                        : children
                    }
                    {iconRight != null &&
                        <View>
                            {iconRight}
                        </View>
                    }
                </View>
                {iconBottom}
            </View>
        )
    }
}
ViewIcon.defaultProps = {
    iconTop: null,
    iconBottom: null,
    iconLeft: null,
    iconRight: null,
    styleContainer: null,
    styleIconLeftContainer: null,
    styleText: null,
}
//#endregion

//#region Card
const Card = (props) => {
    const {
        children,
        title = null,
        styleContainer,
        styleTitleText,
        styleContainerTitleText,
        styleContent,
    } = props

    return (
        <View
            style={[
                {
                    backgroundColor: appColors.white,
                    marginHorizontal: 10,
                    ...StylesCus.boxShadow
                },
                styleContainer
            ]}
        >
            {
                title == null ? null : title.constructor == String ?
                    <ViewHorizontal
                        style={[
                            {
                                padding: 8,
                            },
                            styleContainerTitleText
                        ]}
                    >
                        <Text
                            style={[
                                {
                                    fontSize: 18
                                },
                                styleTitleText
                            ]}
                        >
                            {title}
                        </Text>
                    </ViewHorizontal>
                    : title
            }
            <View
                style={[
                    {
                        paddingHorizontal: 15
                    },
                    title != null && {
                        borderColor: '#f2f2f2',
                        borderTopWidth: 1,
                        paddingVertical: 8
                    },
                    styleContent
                ]}
            >
                {children}
            </View>
        </View>
    )
}
//#endregion

//#region TextInput
class TextInput extends React.Component {
    constructor(props) {
        super(props)

        if (this.props.onRef != null)
            this.props.onRef(this);

        const { input } = this.props;
        var initValue = '';
        if (input != null) {//redux-form
            initValue = input.value || '';
        }
        else {
            initValue = this.props.value || '';
        }
        this.state = {
            value: initValue,
            secureTextEntry: this.props.secureTextEntry
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        const { input: inputNext } = nextProps;
        const { input } = this.props;
        if (inputNext != null) {//redux-form
            if (inputNext.value != this.state.value)
                this.setState(s => s.value = (inputNext.value || '') + '')
        }
        else {
            if (nextProps.value != this.state.value)
                this.setState(s => s.value = nextProps.value)
        }
    }

    clearText = () => {
        this.setState(s => s.value = '', () => {
            this.props.onClearText('');
            this.props.onChangeText('');
            if (this.props.input != null) {//redux-form
                this.props.input.onChange('');
            }
        })
    }

    onChangeText = (txt) => {
        this.setState(s => s.value = txt, () => {
            this.props.onChangeText(txt)
        })
        if (this.props.input != null) {//redux-form
            this.props.input.onChange(txt);
        }
    }

    setText = (text) => {
        this.setState(s => s.value = text)
    }

    getText = (text) => {
        return this.state.value;
    }

    focus = () => {
        this.refInput?.focus();
    }
    render() {
        const {
            meta: { touched = false, error = null, warning } = {}
        } = this.props;

        const {
            style,
            label,
            leftIcon,
            styleLabel,
            styleLeftIcon,
            styleContainer,
            styleContainerText,
            onChangeText,
            secureTextEntry = false,
            requiredLabel = false,
            editable = true,
            rightComponent,
            ...inputProps
        } = this.props;

        const { multiline } = inputProps;

        var isError = touched == true && error != null;
        return (
            <View
                style={[
                    {
                        width: '100%'
                    },
                    label && { marginTop: 10 },
                    styleContainer
                ]}
            >
                {label != null &&
                    <Text style={[{}, styleLabel]} required={requiredLabel}>
                        {label}
                    </Text>
                }
                <ViewHorizontal style={{ width: '100%', }}>
                    <View
                        style={[
                            {
                                flex: 1,
                                padding: 5,
                                borderColor: '#f2f2f2',
                                borderWidth: 1,
                                paddingLeft: 8,
                                paddingRight: 8,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 3
                            },
                            label && { marginTop: 8 },
                            styleContainerText,
                            multiline && { alignItems: 'flex-start', justifyContent: 'flex-start' },
                            isError && { borderColor: appColors.materialRed }
                        ]}
                    >
                        {leftIcon &&
                            <View
                                style={[
                                    {
                                        marginRight: 8
                                    },

                                ]}
                            >
                                {leftIcon}
                            </View>
                        }
                        <TextInputRN
                            {...inputProps}
                            ref={e => this.refInput = e}
                            secureTextEntry={this.state.secureTextEntry}
                            placeholderTextColor='#ccc'
                            style={[
                                {
                                    height: 32,
                                    padding: 0,
                                    flex: 1,
                                    fontSize: 16
                                },
                                multiline == true && {
                                    height: null,
                                    minHeight: 32,
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    textAlignVertical: 'top'
                                },
                                style
                            ]}
                            editable={editable}
                            value={this.state.value}
                            onChangeText={txt => this.onChangeText(txt)}
                        />
                        {
                            !editable ? null
                                : (this.state.value == null ? '' : this.state.value).toString().trim() != '' ?
                                    !secureTextEntry ?
                                        <Button
                                            style={{
                                                backgroundColor: appColors.transparent,
                                                padding: 5
                                            }}
                                            onPress={() => this.clearText()}
                                        >
                                            <Ionicons icon={IoniconsFont.close} size={16} color={appColors.materialGrey} />
                                        </Button>
                                        :
                                        <Button
                                            style={{
                                                backgroundColor: appColors.transparent,
                                                padding: 5
                                            }}
                                            onPress={() => this.setState(s => s.secureTextEntry = !this.state.secureTextEntry)}
                                        >
                                            <Ionicons icon={this.state.secureTextEntry ? IoniconsFont.eye : IoniconsFont.eyeOff} size={16} color={appColors.materialGrey} />
                                        </Button>
                                    : null
                        }
                    </View>
                    {rightComponent}
                </ViewHorizontal>
                {
                    isError &&
                    <Text
                        style={{
                            fontSize: 12,
                            marginTop: 5,
                            color: appColors.materialRed
                        }}
                    >
                        {error}
                    </Text>
                }
            </View>
        )
    }
}
TextInput.defaultProps = {
    label: null,
    leftIcon: null,
    styleLeftIcon: null,
    styleLabel: null,
    styleContainer: null,
    styleContainerText: null,
    onChangeText: () => { },
    onClearText: () => { },
    inputProps: {},
    requiredLabel: false,
}
//#endregion

//#region
var TextDate = (props) => {
    const {
        styleContainer,
        styleText,
        label,
        style,
        valueDate,
        format = 'DD/MM/YYYY',
        formatSet = 'DD/MM/YYYY',
        input: { value: valueReduxForm, onChange: onChangeReduxForm } = {},
        requiredLabel = false,
        ...propsInput
    } = props;
    const {
        input: inputReduxForm,
        meta: metaReduxForm,
    } = props;

    const refInput = useRef();
    const lastValue = useRef(-9999);
    const [dateText, setDateText] = useState('');
    var {
        meta: { touched = false, error = null, warning } = {}
    } = props;

    useEffect(() => {
        if (valueReduxForm == null || valueReduxForm == '') {
            setDisplay('');
            setValue(new Date('s'));
        }
        else if (valueReduxForm.constructor == String && valueReduxForm != 'Invalid Date') {
            var date = moment(valueReduxForm);
            if (date.isValid()) {
                setDisplay(date.format(format));
                setValue(date.toDate());
            }
            else {
                setDisplay(valueReduxForm);
                setValue(new Date('s'));
            }
        }
        else if (valueReduxForm.constructor == Date && valueReduxForm != 'Invalid Date') {
            if (valueReduxForm.format(format) != dateText) {
                setDisplay(valueReduxForm.format(format));
                setValue(valueReduxForm);
            }
        }
        else {
            setDisplay('');
            setValue(new Date('s'));
        }
    }, [valueReduxForm])

    const setValue = (value) => {
        if (value != lastValue.current) {
            lastValue.current = value;
            onChangeReduxForm(value);
        }
    }
    const setDisplay = (text, handlerInput) => {
        handlerInput = handlerInput == null ? false : handlerInput;

        if (handlerInput) {
            if (text.length == format.length) {
                var date = moment(text, format);
                if (date.isValid()) {
                    setValue(date.toDate());
                }
                else {
                    setValue(new Date('s'));
                }
            }
            else {
                setValue(new Date('s'));
            }
        }
        setDateText(text);
    }
    var isError = metaReduxForm != null && touched == true && error != null;
    var isValid = touched == true && (valueReduxForm == null || valueReduxForm.constructor != Date || valueReduxForm == 'Invalid Date');
    return (
        <View
            style={[
                {
                    marginTop: 10
                },
                styleContainer
            ]}
        >
            {label != null &&
                <Text required={requiredLabel}>
                    {label}
                </Text>
            }
            <View
                style={[
                    {
                        padding: 5,
                        borderColor: '#f2f2f2',
                        borderWidth: 1,
                        paddingLeft: 8,
                        paddingRight: 8,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 3
                    },
                    // (isError || isValid === true) && { borderColor: appColors.materialRed },
                    isError && { borderColor: appColors.materialRed },
                    label != null && { marginTop: 5 }
                ]}
            >
                <TextInputMask
                    {...propsInput}
                    type={'datetime'}
                    style={[
                        {
                            height: 30,
                            flex: 1,
                            fontSize: 16,
                            padding: 0,
                        },
                        style
                    ]}
                    options={{
                        format: format
                    }}
                    placeholder={format}
                    value={dateText}
                    onChangeText={t => {
                        setDisplay(t, true)
                    }}
                    ref={refInput}
                />
                {dateText != null && dateText != '' &&
                    <Button
                        style={{
                            backgroundColor: appColors.transparent,
                            padding: 5
                        }}
                        onPress={() => setDisplay('', true)}
                    >
                        <Ionicons icon={IoniconsFont.close} size={16} color={appColors.materialGrey} />
                    </Button>
                }
            </View>
            {
                // (isError || isValid) === true &&
                isError &&
                <Text
                    style={{
                        fontSize: 12,
                        marginTop: 5,
                        color: appColors.materialRed
                    }}
                >
                    {isValid === true ? 'Hãy nhập hợp lệ.' : error}
                </Text>
            }
        </View>
    )
}
//#endregion

//#region  HiddenField
const HiddenField = forwardRef((props, ref) => {

    const {
        input: { value: valueReduxForm, onChange: onChangeReduxForm } = {}
    } = props;
    const {
        input: inputReduxForm,
        meta: metaReduxForm,
    } = props;

    const {
        meta: { touched = false, error = null, warning } = {}
    } = props;

    useEffect(() => {
        return () => {
        }
    }, [])

    useImperativeHandle(
        ref,
        () => {
            setValue
        },
    )

    const setValue = (value) => {
        inputReduxForm && onChangeReduxForm(value);
    }
    return null;
})
//#endregion

//#region  SelectorImage
const SelectorImage = (props) => {
    const {
        children,
        onSelected = () => { }
    } = props;

    const refModal = useRef();

    const clickButton = () => {
        refModal.current?.toggle()
    }

    const clickSelectImg = async () => {
        await refModal.current?.toggle(false);
        await _sleep(500)
        var PermissionConfigs = [
            {
                permission: PERMISSIONS.SELECT_IMAGE,
                name: 'Library',
                description: 'Used to open library',
            },
        ]
        var permissionMiss = await checkAndRequest(PermissionConfigs);
        if (permissionMiss.length > 0) {
            ViewCus.Alert.Confirm(
                () => openSettings(),
                null,
                permissionMiss.map(e => '{0} - {1}'.format(e.name, e.description)).join('\n'),
                null,
                null,
                'Mở cài đặt'
            )
            return;
        }
        await _sleep(200);
        ImagePicker.openPicker({
            // width: 300,
            // height: 400,
            cropping: true
        }).then(image => {
            var extension = MIME_TYPE[image.mime];
            extension = extension.indexOf(' ') >= 0 ? extension.split(' ')[0] : extension

            var fileName = image.filename != null ? image.filename : '{0}.{1}'.format(new Date().format('hh-mm-ss-MM-DD-YYYY'), extension);
            onSelected({
                ...image,
                blob: {
                    uri: image.path,
                    name: fileName,
                    type: image.mime,
                    size: image.size
                }
            });
        });;
    }
    const clickCamera = async () => {
        await refModal.current?.toggle(false);
        await _sleep(500)
        var PermissionConfigs = [
            {
                permission: PERMISSIONS.CAMERA,
                name: 'Camera',
                description: 'Used to take picture',
            },
            {
                permission: PERMISSIONS.SAVE_IMAGE,
                name: 'Library',
                description: 'Used to save image to library',
            },
        ]
        var permissionMiss = await checkAndRequest(PermissionConfigs);
        if (permissionMiss.length > 0) {
            Alert.Confirm(
                () => openSettings(),
                null,
                permissionMiss.map(e => '{0} - {1}'.format(e.name, e.description)).join('\n'),
                null,
                null,
                'Mở cài đặt'
            )
            return;
        }

        await _sleep(400);

        var isEmulator = await deviceInfoModule.isEmulator();
        if (isEmulator) {
            Alert.Alert('The camera cannot be opened in the emulator.')
            return;
        }
        ImagePicker.openCamera({
            cropping: true,
        }).then(image => {
            var extension = MIME_TYPE[image.mime];
            extension = extension.indexOf(' ') >= 0 ? extension.split(' ')[0] : extension

            var fileName = image.filename != null ? image.filename : '{0}.{1}'.format(new Date().format('hh-mm-ss-MM-DD-YYYY'), extension);
            onSelected({
                ...image,
                blob: {
                    uri: image.path,
                    name: fileName,
                    type: image.mime,
                    size: image.size
                }
            });
        });
    }

    return (
        <>
            <Modal
                ref={refModal}
                styleModal={{
                    justifyContent: 'flex-end',
                    padding: 0,
                    paddingHorizontal: 0
                }}
                styleContainer={{
                    paddingHorizontal: 0,
                    borderRadius: 0
                }}
            >
                <Button
                    style={{
                        backgroundColor: appColors.transparent,
                        paddingVertical: 10,
                    }}
                    styleText={{
                        fontSize: 18
                    }}
                    onPress={clickSelectImg}
                >
                    {'Chọn từ thư viện'}
                </Button>
                <Button
                    style={{
                        borderColor: '#f2f2f2',
                        borderTopWidth: 1,
                        backgroundColor: appColors.transparent,
                        paddingVertical: 10,
                    }}
                    styleText={{
                        fontSize: 18
                    }}
                    onPress={clickCamera}
                >
                    {'Chụp ảnh'}
                </Button>
            </Modal>
            <Button
                style={{
                    backgroundColor: appColors.transparent
                }}
                onPress={clickButton}
            >
                {children}
            </Button>
        </>
    )
}
//#endregion

//#region  Selector
class Selector extends React.Component {
    constructor(props) {
        super(props);

        var initValue = [];
        const { input, optionParentId } = this.props;

        var optionsTemp = this.props.options.map((e, index) => ({ item: e, index }));
        if (optionParentId == null)
            this.options = optionsTemp
        else
            this.optionsWithParent = optionsTemp

        if (input != null) {//redux-form
            initValue = input.value != null ? this.getIndexOfValue(input.value) : [];
        }
        else {
            initValue = this.props.value != null ? this.getIndexOfValue(this.props.value) : [];
        }
        this.state = {
            isVisible: false,
            isSearch: false,
            isShow: false,
            txtSearch: '',
            options: [],
            selected: [],
            // selected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            selected: initValue,
            disable: this.props.disable1 || this.props.disable,
        }
    }

    refModal = null;
    options = [];

    getKeyBySelected(selected) {
        var value = this.props.multiple ? selected.map(e => this.props.optionKey(e, null)) : this.props.optionKey(selected, null);
        return value;
    }
    getIndexOfValue(value) {
        var options = this.options.map((e, index) => {
            {
                return {
                    key: this.props.optionKey(e.item, e.index),
                    index
                }
            }
        })

        var selected = (this.props.multiple ? value : [value]).map((e, index) => {
            var find = options.filter(e1 => e1.key == e)[0];
            return find == null ? null : find.index;
        }).filter(e => e != null);
        return selected;
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        const { input: inputNext } = nextProps;
        const { input } = this.props;
        if (inputNext != null) {//redux-form
            var selected = this.getIndexOfValue(inputNext.value)
            if (JSON.stringify(selected) != JSON.stringify(this.state.selected))
                this.setState(s => s.selected = selected);
        }
        else {
            if (nextProps.value != null && nextProps.value != this.props.value) {
                var selected = this.getIndexOfValue(nextProps.value);
                if (JSON.stringify(selected) != JSON.stringify(this.state.selected)) {
                    this.setState(s => s.selected = selected);
                }
            }
        }
    }

    toggleModal = () => {
        this.refModal.toggle();
    }

    renderOption = (e, index) => {
        var isSelected = this.state.selected?.indexOf(index) >= 0;
        return (
            <Button
                style={[
                    {
                        backgroundColor: this.props.multiple ? 'white' : isSelected ? 'rgba(205,205,205,1)' : index % 2 ? 'white' : '#f9f9f9',
                        paddingVertical: 15,
                    },
                    this.props.styleOptionContainer,
                    {
                        flexDirection: 'row'
                    }
                ]}
                onPress={() => this.clickOption(e, index, isSelected)}
            >
                {
                    this.props.multiple &&
                    <View style={{
                        width: 40
                    }}>
                        {isSelected && <Ionicons icon={IoniconsFont.checkmarkSharp} color={appColors.success} size={18} />}
                    </View>
                }
                {this.props.optionRender != null ?
                    this.props.optionRender.apply(this, e, index) :
                    <Text
                        style={[{
                            // textAlign: 'center',
                            flex: 1,
                            flexWrap: 'wrap'
                        },
                        this.props.styleOptionLabel
                        ]}
                    >
                        {this.props.optionLabel(e, index)}
                    </Text>
                }
            </Button>
        )
    }

    onModalShow = () => {
        this.setState(s => {
            s.isShow = true;
            s.txtSearch = '';
            return s;
        }, () => this.searchOptions(''))
    }

    onModalHide = () => {
        this.setState(s => s.isShow = false)
    }

    timeoutSearch = null;
    onChangeTextSearch = (txt) => {
        // txt = txt.trim()
        this.setState(s => s.txtSearch = txt, () => {
            this.timeoutSearch != null && clearTimeout(this.timeoutSearch);
            this.timeoutSearch = setTimeout(() => {
                this.searchOptions(txt);
            }, txt == '' ? 0 : 1000);
        });
    }

    searchOptions = (txt) => {
        txt = txt == null ? '' : txt;
        var options = this.options.map((e, index) => {
            var label = change_alias(this.props.optionLabel(e.item, e.index));
            if (label.toLocaleLowerCase().indexOf(change_alias(txt).toLocaleLowerCase()) < 0) return null;
            return e
        }).filter(e => e != null);

        this.setState(s => s.options = options)
    }

    clickOption = (e, index, isSelected) => {
        if (this.props.multiple) {
            var selected = [];
            if (isSelected)
                selected = this.state.selected.filter(e => e != index);
            else
                selected = this.state.selected.concat([index]);

            selected.sort((a, b) => a > b ? 1 : a < b ? -1 : 0);
            this.setState(s => s.selected = selected);
        }
        else {
            this.setState(s => {
                s.selected = [index];
                s.isVisible = false;
                return s;
            }, () => (this.refModal.toggle(), this.trigger()))
        }
    }

    clickClearOption = (e, index) => {
        var selected = this.state.selected.filter(e => e != index);
        this.setState(s => s.selected = selected);
    }

    updateDisable = (flag) => {
        this.setState(s => s.disable = flag)
        return this;
    }

    updateParentId = (parentId) => {
        if (this.props.optionParentId == null) return this;
        var options = this.optionsWithParent.filter((e, index) => {
            var _parentId = this.props.optionParentId(e.item, e.index);
            return _parentId == parentId;
        });
        this.options = options.map((e, index) => {
            e.index = index;
            return e;
        });
        this.setState(s => s.selected = []);
        if (this.props.input != null) {//redux-form
            this.props.input.onChange('');
        }
        return this;
    }
    updateOptions = (options, value) => {
        options = options == null ? [] : options.constructor != Array ? [options] : options
        var optionsTemp = options.map((e, index) => ({ item: e, index }));
        this.props.optionParentId == null ? this.options = optionsTemp : this.optionsWithParent = optionsTemp
        var selected = [];
        if (value !== undefined)
            selected = this.getIndexOfValue(value);
        this.setState(s => s.selected = selected, () => {
        });
        if (this.props.input != null) {//redux-form
            this.props.input.onChange(value);
        }
        return this;
    }

    updateSelect = (value) => {
        var selected = this.getIndexOfValue(value);
        this.setState(s => s.selected = selected)
        return this;
    }

    select = (value) => {
        var selected = this.getIndexOfValue(value);
        this.setState(s => s.selected = selected)
        if (this.props.input != null) {//redux-form
            selected = this.props.multiple ? selected.map(e => this.options[e]?.item) : this.options[selected[0]]?.item;
            var value = this.getKeyBySelected(selected);
            if (value == undefined) {
                value = -1
            }
            this.props.input.onChange(value);
        }
        return this;
    }

    trigger = () => {
        var selected = this.props.multiple ? this.state.selected.map(e => this.options[e]?.item) : this.options[this.state.selected[0]]?.item;
        var index = this.props.multiple ? this.state.selected : this.state.selected[0];
        this.props.onSelected(selected, index)
        if (this.props.input != null) {//redux-form
            var value = this.getKeyBySelected(selected);
            this.props.input.onChange(value);
        }
        return this;
    }

    render() {
        const {
            meta: { touched = false, error = null, warning } = {},
            disable,
            requiredLabel
        } = this.props;

        var isError = touched == true && error != null;
        return (
            <View
                style={[
                    { width: '100%', },
                    this.props.label && {
                        marginTop: 10
                    },
                    this.props.styleContainer
                ]}
            >
                {this.props.label && <Text required={requiredLabel}>{this.props.label}</Text>}
                <Button
                    style={[
                        {
                            borderColor: '#f2f2f2',
                            borderWidth: 1,
                            borderRadius: 3,
                            backgroundColor: appColors.transparent,
                            minHeight: 45,
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        this.props.label && { marginTop: 8 },
                        this.props.multiple && { flexDirection: 'row', flexWrap: 'wrap', },
                        this.state.disable && { backgroundColor: '#f9f9f9' },
                        this.props.styleButtonContainer,
                        isError && { borderColor: appColors.materialRed }
                    ]}
                    styleText={{}}
                    {...(this.state.disable == true ? { activeOpacity: 1 } : {})}
                    onPress={() => !this.state.disable && this.toggleModal()}
                >
                    {this.options.length <= 0 || (this.state.selected || []).length <= 0 ?
                        <Text style={[{ color: '#ccc', }, this.props.stylePlaceholder,]} >
                            {this.props.children != null && this.props.children.constructor == String ? this.props.children : this.props.placeholder}
                        </Text>
                        : this.props.multiple ? this.state.selected.map((e, index) => {
                            return (
                                <View
                                    key={index}
                                    style={[
                                        {
                                            backgroundColor: appColors.transparent,
                                            borderColor: '#f2f2f2',
                                            borderWidth: 1,
                                            padding: 5,
                                            borderRadius: 3,
                                            margin: 3,
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        },
                                    ]}
                                    onPress={() => this.toggleModal()}
                                >
                                    <Text>
                                        {
                                            this.props.buttonRenderMultiple != null ?
                                                this.props.buttonRenderMultiple(this.options[e].item, e)
                                                : this.props.optionLabel(this.options[e].item, e)
                                        }
                                    </Text>
                                    <Button
                                        style={{
                                            backgroundColor: appColors.transparent,
                                            padding: 3,
                                        }}
                                        onPress={() => this.clickClearOption(this.options[e].item, e)}
                                    >
                                        <Ionicons icon={IoniconsFont.close} size={18} />
                                    </Button>
                                </View>
                            )
                        })
                            : <>
                                {this.props.buttonRender != null ?
                                    this.props.buttonRender(this.options[this.state.selected[0]]?.item, this.state.selected[0])
                                    :
                                    <Text
                                        style={[{}, this.state.disable && { color: '#555555' }]}
                                        numberOfLines={1}
                                    >
                                        {this.props.optionLabel(this.options[this.state.selected[0]]?.item, this.state.selected[0])}
                                    </Text>
                                }
                                {this.state.disable == false && <Button
                                    style={{
                                        backgroundColor: appColors.transparent, padding: 5,
                                        position: 'absolute', right: 0
                                    }}
                                    onPress={() => this.select(-1)} >
                                    <Ionicons icon={IoniconsFont.close} size={16} color={appColors.materialGrey} />
                                </Button>}
                            </>

                    }
                </Button>
                {
                    isError &&
                    <Text
                        style={{
                            fontSize: 12,
                            marginTop: 5,
                            color: appColors.materialRed
                        }}
                    >
                        {error}
                    </Text>
                }
                <Modal
                    ref={e => this.refModal = e}
                    title={this.props.title}
                    isVisible={this.state.isVisible}
                    onToggleModal={e => this.setState(s => s.isVisible = e)}
                    scrollHorizontal={true}
                    propagateSwipe={true}
                    style={{
                    }}
                    styleContentContainer={{
                        width: constants.window.width * .8,
                    }}
                    styleContent={{
                        padding: 0
                    }}
                    onModalShow={() => this.onModalShow()}
                    onModalHide={() => this.onModalHide()}
                    titleComponent1={
                        !this.props.isSearch ? null : <TextInput
                            style={{
                                color: 'black'
                            }}
                            styleContainer={{
                                flex: 1,
                            }}
                            value={this.state.txtSearch}
                            placeholder='Tìm kiếm'
                            onChangeText={txt => this.onChangeTextSearch(txt)}
                            leftIcon={
                                <Ionicons icon={IoniconsFont.search} color='#cdcdcd' />
                            }
                        />
                    }
                >
                    {
                        this.props.isSearch && <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <TextInput
                                style={{
                                    color: 'black'
                                }}
                                styleContainer={{
                                    flex: 1,
                                }}
                                value={this.state.txtSearch}
                                placeholder='Tìm kiếm'
                                onChangeText={txt => this.onChangeTextSearch(txt)}
                                leftIcon={
                                    <Ionicons icon={IoniconsFont.search} color='#cdcdcd' />
                                }
                            />
                        </View>
                    }
                    {this.state.isShow &&
                        <FlatListRN
                            style={{
                                flexShrink: 1
                            }}
                            data={this.state.options}
                            keyExtractor={(item, index) => index + 'a'}
                            renderItem={({ index, item }) => this.renderOption(item.item, item.index)}
                        />
                    }
                    {this.props.multiple &&
                        <Button
                            style={{
                                backgroundColor: appColors.headerColor
                            }}
                            styleText={{
                                color: 'white',
                                fontSize: 16
                            }}
                            onPress={() => (this.refModal.toggle(), this.trigger())}
                        >
                            {'Xong'}
                        </Button>
                    }
                </Modal>
            </View>
        )
    }
}
Selector.defaultProps = {
    value: null,
    isSearch: true,
    requiredLabel: false,
    label: null,
    placeholder: 'Chọn',
    title: '',
    styleContainer: null,
    styleButton: null,
    styleButtonContainer: null,
    buttonRender: null,
    buttonRenderMultiple: null,
    options: [],
    optionLabel: (e, index) => e,
    optionKey: (e, index) => { },
    // optionParentId: (e, index) => { },
    optionParentId: null,
    optionRender: null,
    // (e, index) => {
    //     return <Text>{this.props.optionLabel(e, index)}</Text>
    // },
    styleOptionContainer: null,
    styleOption: null,
    styleOptionLabel: null,
    onSelected: (e, index) => { },
    multiple: false,
    disable: false
}
//#endregion


//#region DatePicker
const DatePicker = (props) => {
    const {
        label = null,
        styleContainer,
        styleInput,
        placeholder = 'Chọn',
        displayFormatDate = 'DD/MM/YYYY',
        initValueFormat,
        onSelected = (data) => { },
        datepickerProps: datepickerProps,
        value = null,
        input: { value: valueReduxForm, onChange: onChangeReduxForm } = {},
        requiredLabel = false
    } = props;
    const {
        input: inputReduxForm,
        meta: metaReduxForm,
    } = props;

    const {
        meta: { touched = false, error = null, warning } = {}
    } = props;

    const convertDateString = (date) => {
        return (date || '') == '' ? null : date.constructor == String ? moment(date, initValueFormat).toDate() : date
    }

    inputReduxForm != null && onChangeReduxForm(convertDateString(inputReduxForm != null ? valueReduxForm : value));
    const [date, setDate] = useStateSetCallback(convertDateString(inputReduxForm != null ? valueReduxForm : value));
    const [isShow, setIsShow] = useStateSetCallback(false);

    useMemo(() => {
        if (valueReduxForm != date) {
            setDate(convertDateString(valueReduxForm));
        }
    }, [valueReduxForm])
    useEffect(() => {

        return () => {
        }
    }, [])

    const togglePicker = (flag) => {
        flag = flag == null ? !isShow : flag;
        setIsShow(flag);
    }
    const _onConfirm = async (date) => {
        await setIsShow(false);
        await setDate(date);
        onSelected(date);
        inputReduxForm != null && onChangeReduxForm(date);
    }
    const _onCancel = (date) => {
        setIsShow(false);
    }

    var isError = metaReduxForm != null && touched == true && error != null;
    return (
        <>
            <DateTimePickerModal
                isVisible={isShow}
                mode="date"
                {...datepickerProps}
                date={date || new Date()}
                locale="vi_VN"
                onConfirm={_onConfirm}
                onCancel={_onCancel}
            />
            <View
                style={[
                    {},
                    label != null && { marginTop: 10 },
                    styleContainer
                ]}
            >
                {label &&
                    <Text required={requiredLabel}>
                        {label}
                    </Text>
                }
                <Button style={[
                    {
                        flexDirection: 'row',
                        borderWidth: 1,
                        backgroundColor: '#ffffff',
                        borderColor: '#f2f2f2',
                        borderRadius: 5,
                        height: 45,
                    },
                    label != null && { marginTop: 8 },
                    styleInput,
                    isError && { borderColor: appColors.materialRed }
                ]}
                    onPress={() => togglePicker()}
                >
                    {
                        (date || '') == '' ?
                            <Text style={{
                                color: '#828282'
                            }}>
                                {placeholder}
                            </Text>
                            :
                            <Text style={{

                            }}>
                                {moment(date).format(displayFormatDate || 'DD/MM/YYYY')}
                            </Text>
                    }
                </Button>
                {
                    isError &&
                    <Text
                        style={{
                            fontSize: 12,
                            marginTop: 5,
                            color: appColors.materialRed
                        }}
                    >
                        {error}
                    </Text>
                }
            </View>
        </>
    )
}
//#endregion

//#region ComponentDynamic
const ComponentDynamic = React.memo(forwardRef((props, ref) => {
    const {
        render = () => null,
        styleContainer,
        initValue,
        ...rest
    } = props;
    const [data, setData] = useStateSetCallback(initValue)

    useImperativeHandle(
        ref,
        () => ({
            setData: _setData,
            setDataPart: (d, callback) => _setData({ ...data, ...d }, callback),
            getData: () => data,
        })
    )

    const _setData = (data, callback) => {
        setData(data, callback == null ? () => { } : callback);
    }

    return styleContainer == null ? render(data) :
        (
            <View
                {...rest}
                style={[
                    {},
                    styleContainer
                ]}
            >
                {render(data)}
            </View>
        )
}))
//#endregion

//#region Prompt
const Prompt = forwardRef((props, ref) => {
    const {
        title = null,
        label = null,
        buttonText = 'Đồng ý',
        styleButtonText = {},
        styleButton = {},
        validate = {},
        onPress = () => { },
        render = null,
        style,
        styleInput,
        ...propsInput
    } = props;
    const refInput = useRef();
    const refModal = useRef();
    const refErrors = useRef();
    const refCustomComponent = useRef();

    var _callback, flagTouch = false, currentValue;

    useImperativeHandle(
        ref,
        () => ({
            toggle,
            setText,
        })
    )

    useEffect(() => {
    }, [])

    const toggle = async (flag, value, callback) => {
        await refModal.current?.toggle(flag);
        if (flag == true) {
            value = value == null ? '' : value;
            render == null ? setText(value) : (currentValue = value), refCustomComponent.current?.setData(value);
            _callback = callback;
        }
        else {
            flagTouch = false;
            _callback = null;
        }
    }
    const setText = (t) => refInput.current?.setText(t);

    const onModalHide = () => {
        flagTouch = false;
        _callback = null;
    }
    const onValidate = () => {
        var obj = {
            data: render == null ? refInput.current?.getText() : currentValue,
        };
        var valids = Utils.objectValid.valid(obj, {
            data: {
                displayName: label,
                ...validate
            }
        }, { lan: 'redux-form' });
        refErrors.current?.setData(valids.map(e => e.message));
        return valids.length > 0 ? null : obj;
    }
    const clickSubmit = () => {
        flagTouch = true;
        var obj = onValidate();
        if (obj == null) return;
        (_callback || onPress)(obj.data);
        toggle();
    }
    return (
        <Modal
            ref={refModal}
            title={title}
            onModalHide={() => onModalHide()}
        >
            {
                render == null ? <TextInput
                    label={label}
                    ref={refInput}
                    style={[
                        styleInput
                    ]}
                    onChangeText={() => flagTouch && onValidate()}
                    onClearText={() => onValidate()}
                    {...propsInput}
                />
                    :
                    <ComponentDynamic
                        ref={refCustomComponent}
                        render={(value) => {
                            return render((value) => {
                                currentValue = value;
                                flagTouch && onValidate();
                            }, value)
                        }}
                    />
            }

            <ComponentDynamic
                ref={refErrors}
                render={(errors) => {
                    return errors != null && errors.length > 0 &&
                        <View
                            style={{
                                marginTop: 10
                            }}
                        >
                            {errors.map((e, index) => (
                                <Text key={index} style={{ color: appColors.materialRed }}>
                                    {e}
                                </Text>
                            ))}
                        </View>
                }}
            />
            <Button
                style={[
                    {
                        marginTop: 20,
                        backgroundColor: '#09a5e4'
                    },
                    styleButton
                ]}
                styleText={[
                    {
                        color: appColors.white
                    },
                    styleButtonText
                ]}
                onPress={() => clickSubmit()}
            >
                {buttonText}
            </Button>
        </Modal>
    )
})
//#endregion

//#region RadioGroup
const RadioGroup = (props) => {
    const {
        render = () => { },
        renderError = null,
        options = [],
        value,
        label,
        styleContainer,
        onChange: onChangeValue = () => { },
        requiredLabel = false,
        input: { value: valueReduxForm, onChange: onChangeReduxForm } = {},
    } = props;
    const {
        meta: { touched = false, error = null, warning } = {}
    } = props;
    const {
        input: inputReduxForm,
        meta: metaReduxForm,
    } = props;

    const refComponentRender = useRef();
    useEffect(() => {
        refComponentRender.current?.setData(valueReduxForm);
    }, [valueReduxForm]);

    const optionsRadio = options.map((e, index) => {
        const { value, label, name, ...propsRadio } = e;
        return {
            name: name != null ? name : ('Radio' + index),
            component: (props) => {
                return React.createElement(
                    Radio,
                    {
                        ...propsRadio,
                        ...props,
                        selected: value == 0 ? value === valueReduxForm : value == valueReduxForm,
                        children: label,
                        onPress: () => onChange(value)
                    }
                )
            }
        }
    }).toObject(e => e.name, e => e.component);

    const onChange = (value) => {
        onChangeValue(value);
        inputReduxForm != null && onChangeReduxForm(value);
    }
    var isError = metaReduxForm != null && touched == true && error != null;
    return (
        <View
            style={[
                {},
                label != null && { marginTop: 10 },
                styleContainer
            ]}
        >
            {
                label != null && <Text required={requiredLabel}>{label}</Text>
            }
            <ComponentDynamic
                ref={refComponentRender}
                initValue={valueReduxForm}
                {...label != null && { styleContainer: { marginTop: 8 } }}
                render={value => {
                    // if (value !== valueReduxForm) return null;
                    var component = render({
                        value: valueReduxForm,
                        onChange: onChange,
                        error,
                        RadioComponent: optionsRadio
                    })
                    return component != null ? component :
                        Object.keys(optionsRadio).map((key, index) => {
                            var RadioOption = optionsRadio[key];
                            return <RadioOption key={index} />
                        })
                }}
            />
            {
                isError && (
                    renderError ? renderError(error) :
                        <Text
                            style={{
                                fontSize: 12,
                                marginTop: 5,
                                color: appColors.materialRed
                            }}
                        >
                            {error}
                        </Text>
                )
            }
        </View>
    )
}
//#endregion

//#region Radio
const Radio = (props) => {
    const {
        label,
        styleContainer,
        styleText,
        value,
        valueRadio,
        children,
        onPress: _onPressCallback = () => { },
        selected: _selected = null,
        iconRadio: {
            selected: iconSelected,
            deselect: iconDeselect
        } = {},
        input: { value: valueReduxForm, onChange: onChangeReduxForm } = {},
        requiredLabel = false
    } = props;

    const {
        meta: { touched = false, error = null, warning } = {}
    } = props;

    const {
        input: inputReduxForm,
        meta: metaReduxForm,
    } = props;
    const [selected, setSelected] = useState(_selected != null ? _selected : inputReduxForm != null ? valueReduxForm == valueRadio : valueRadio == value);

    useEffect(() => {
        var temp = valueReduxForm == valueRadio;
        if (temp !== selected)
            setSelected(temp);
    }, [valueReduxForm])
    useEffect(() => {
        if (_selected != null)
            setSelected(_selected);
    }, [_selected])

    const onPress = () => {
        _onPressCallback(inputReduxForm == null ? valueRadio : inputReduxForm);
        inputReduxForm != null && onChangeReduxForm(valueRadio);
    }

    var isError = metaReduxForm != null && touched == true && error != null;
    return (
        <View
            style={[
                {},
                styleContainer
            ]}

            importantForAccessibility={'auto'}
        // importantForAccessibility={'no-hide-descendants'}
        >
            {label &&
                <Text required={requiredLabel}>
                    {label}
                </Text>
            }
            <Button
                style={[
                    {
                        backgroundColor: appColors.transparent,
                        paddingHorizontal: 0,
                        paddingVertical: 3,
                        flexDirection: 'row',
                        justifyContent: 'flex-start'
                    },
                    label != null && { marginTop: 8 },
                    isError && { borderColor: appColors.materialRed }
                ]}
                onPress={onPress}
                accessible={false}
            >
                <View
                    style={{
                        marginRight: 8
                    }}
                    accessible={false}
                >
                    {
                        selected ? iconSelected != null ? iconSelected : <Ionicons
                            accessible={false}
                            // accessibilityLabel={'Đã chọn' + children}
                            icon={IoniconsFont.radioButtonOnOutline} />
                            : iconDeselect != null ? iconDeselect : <Ionicons
                                accessible={false}
                                icon={IoniconsFont.radioButtonOffOutline} />
                    }
                </View>
                {
                    (children || '').constructor == String ?
                        <Text style={[{}, styleText]} accessible={false}
                            accessibilityLabel={`${selected ? 'Đã chọn' : ''}` + children}
                        >{children}</Text>
                        : children
                }
            </Button>
            {
                isError &&
                <Text
                    style={{
                        fontSize: 12,
                        marginTop: 5,
                        color: appColors.materialRed
                    }}
                >
                    {error}
                </Text>
            }
        </View>
    )
}
//#endregion

//#region Checkbox
const Checkbox = (props) => {
    const {
        label,
        styleContainer,
        styleButton,
        styleText,
        children,
        typeCheckNumber = true,
        selected: _selected = null,
        disabled: _disabled = null,
        onPress: onPressNormal = () => { },
        iconCheckbox: {
            selected: iconSelected,
            deselect: iconDeselect
        } = {},
        input: { value: valueReduxForm, onChange: onChangeReduxForm } = {},
        requiredLabel = false
    } = props;
    const {
        input: inputReduxForm,
        meta: metaReduxForm,
    } = props;

    const {
        meta: { touched = false, error = null, warning } = {}
    } = props;

    var initValue = _selected != null ? _selected : inputReduxForm != null ? valueReduxForm : null;
    initValue = typeCheckNumber ?
        (initValue == true ? 1 : initValue == false ? 0 : null)
        : initValue;
    const [selected, setSelected] = useState(initValue);
    useEffect(() => {
        if (inputReduxForm != null && valueReduxForm !== selected)
            setSelected(valueReduxForm);
    }, [valueReduxForm])

    useEffect(() => {

    }, [])

    const onPress = () => {
        if (_disabled === true) return
        var temp = typeCheckNumber ?
            (selected == 0 ? 1 : 0)
            : (selected == false ? true : false)
        setSelected(temp);
        onPressNormal(temp);
        inputReduxForm != null && onChangeReduxForm(temp);
    }

    var isError = metaReduxForm != null && touched == true && error != null;
    return (
        <View
            style={[
                {},
                styleContainer
            ]}
        >
            {label &&
                <Text label={requiredLabel}>
                    {label}
                </Text>
            }
            <Button
                style={[
                    {
                        backgroundColor: appColors.transparent,
                        paddingHorizontal: 0,
                        paddingVertical: 3,
                        flexDirection: 'row',
                        justifyContent: 'flex-start'
                    },
                    styleButton,
                    label != null && { marginTop: 8 },
                    isError && { borderColor: appColors.materialRed }
                ]}
                onPress={onPress}
            >
                <View
                    style={{
                        marginRight: 8
                    }}

                >
                    {
                        (typeCheckNumber ? selected == 1 : selected == true) ? iconSelected != null ? iconSelected : <Ionicons accessible={true}
                            accessibilityLabel={"Đã chọn " + children} icon={IoniconsFont.checkboxOutline} />
                            : iconDeselect != null ? iconDeselect : <Ionicons icon={IoniconsFont.squareOutline} />
                    }
                </View>
                {
                    (children || '').constructor == String ?
                        <Text
                            style={[{}, styleText]}>{children}</Text>
                        : children
                }
            </Button>
            {
                isError &&
                <Text
                    style={{
                        fontSize: 12,
                        marginTop: 5,
                        color: appColors.materialRed
                    }}
                >
                    {error}
                </Text>
            }
        </View>
    )
}
//#endregion

//#region Slider
class Slider extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.initValue || 0
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        const { input: inputNext } = nextProps;
        const { input, label, toFixed } = this.props;
        if (inputNext != null) {//redux-form
            if (inputNext.value != this.state.value) {
                this.setState({ value: inputNext.value })
            }
        }
        else {
            if (nextProps.value != this.state.value)
                this.setState(s => s.value = nextProps.value)
        }
    }

    onpressPrice = (value) => {
        this.setState({ value: value }, () => {
            if (this.props.input != null) {//redux-form
                this.props.input.onChange(value);
            }
        })
    }
    render() {
        var {
            meta: { touched = false, error = null, warning } = {}
        } = this.props;
        const {
            styleLabel,
            label,
            style,
            isShowValue,
            suffix,
            styleContainer,
            toFixed,
            requiredLabel,
            formatter,
            ...sliderProps
        } = this.props;

        var { value } = this.state;
        value = value == null || value.constructor != Number ? 0 : toFixed <= 0 ? value : value.toFixed(toFixed)
        formatter != null && (value = formatter(value));

        var isError = touched == true && error != null;
        return (
            <View
                style={[
                    { paddingHorizontal: 8 },
                    label != null && { marginTop: 15 },
                    styleContainer
                ]}
            >
                {label != null &&
                    <Text
                        style={[
                            {}, styleLabel
                        ]}
                        required={requiredLabel}
                    >
                        {label}
                    </Text>
                }
                {isShowValue &&
                    <Text style={{
                        fontSize: 14, textAlign: 'center', fontWeight: '500', margin: 15,
                    }}
                    >
                        {'{0} {1}'.format(value, suffix || '')}
                    </Text>
                }
                <SliderRN
                    minimumTrackTintColor={'rgba(0,190,212,1)'}
                    {...sliderProps}
                    {
                    ...(!isError ? {} : {

                        thumbTintColor: 'red'
                    })
                    }
                    style={[
                        { width: '100%', opacity: 1, height: 10, marginTop: 5, marginBottom: 10 },
                        style,
                        isError && { borderColor: appColors.materialRed }
                    ]}
                    value={this.state.value}
                    onValueChange={this.onpressPrice}
                />{
                    isError &&
                    <Text
                        style={{
                            fontSize: 12,
                            marginTop: 10,
                            color: appColors.materialRed
                        }}
                    >
                        {error}
                    </Text>
                }
            </View>
        );
    }

}

Slider.defaultProps = {
    style: {},
    styleContainer: {},
    initValue: 0,
    minimumValue: 0,
    maximumValue: 100,
    step: 1,
    isShowValue: true,
    suffix: '',
    toFixed: -1,
    formatter: null
}

//#endregion


//#region Form
// const Field = forwardRef((props, ref) => {
const Field = (props) => {

    var _props = {
        ...props
    }
    delete _props['component']

    useImperativeHandle(
        null,
        () => ({
            a
        })
    )
    const a = () => { }
    return <View>
        {
            React.cloneElement(props.component, {
                ..._props,
                ref: e => { }
            })
        }
    </View>
}
const formGetChildField = (children, list) => {
    list = list == null ? [] : list;
    if (children == null) return list;
    if (children.constructor == Array) {
        for (let i = 0; i < children.length; i++) {
            const e = children[i];
            list = list.concat(formGetChildField(e));
        }
    }
    else {
        if (children.props != null) {
            if (children.props.nameField != null)
                list.push(children)

            if (children.props.children != null)
                return list = list.concat(formGetChildField(children.props.children));
        }
    }
    return list;
}
const Form = forwardRef((props, ref) => {
    const { children } = props;
    var fields = formGetChildField(children)
    fields[0] = React.cloneElement(fields[0], {
        styleContainer: {
            backgroundColor: 'red'
        }
    })
    return children
})
//#endregion

//#region ToggleView
const ToggleView = (props) => {
    const {
        children,
        initValue = false,
        title,
        styleContent,
        styleContainer,
        styleTextTitle,
        styleTitle,
        styleButton,

        ...propsCollapsed
    } = props;

    const refContent = useRef();
    const [isCollapsed, setCollapsed] = useState(!initValue)

    return (
        <View
            style={[
                {},
                styleContainer
            ]}
        >
            <Button
                style={[
                    {},
                    styleButton
                ]}
                onPress={() => {
                    setCollapsed(!isCollapsed);
                    refContent.current?.setData({ isCollapsed })
                }}
            >
                <ViewHorizontal
                    style={[
                        {
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        },
                        styleTitle
                    ]}
                >
                    {title == null ? null :
                        title.constructor == String ? <Text
                            style={[
                                {
                                    paddingVertical: 5,
                                    flex: 1
                                },
                                styleTextTitle
                            ]}
                        >
                            {title}
                        </Text>
                            : title
                    }
                    <Ionicons icon={!isCollapsed ? IoniconsFont.chevronDown : IoniconsFont.chevronUp} />
                </ViewHorizontal>
            </Button>
            <ComponentDynamic
                ref={refContent}
                render={({ isCollapsed = false } = {}) => (
                    isCollapsed && <View
                        style={[
                            {},
                            styleContent
                        ]}
                    >
                        {children}
                    </View>)
                }
            />
        </View>
    )
}
//#endregion

//#region Collapsible
const Collapsible = (props) => {
    const {
        children,
        initValue = false,
        title,
        styleContent,
        styleContainer,
        styleTextTitle,
        styleTitle,
        styleButton,

        ...propsCollapsed
    } = props

    const [isCollapsed, setCollapsed] = useState(!initValue)
    return (
        <View
            style={[
                {},
                styleContainer
            ]}
        >
            <Button
                style={[
                    {},
                    styleButton
                ]}
                onPress={() => setCollapsed(!isCollapsed)}
            >
                <ViewHorizontal
                    style={[
                        {
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        },
                        styleTitle
                    ]}
                >
                    {title == null ? null :
                        title.constructor == String ? <Text
                            style={[
                                {
                                    paddingVertical: 5,
                                    flex: 1
                                },
                                styleTextTitle
                            ]}
                        >
                            {title}
                        </Text>
                            : title
                    }
                    <Ionicons icon={!isCollapsed ? IoniconsFont.chevronDown : IoniconsFont.chevronUp} />
                </ViewHorizontal>
            </Button>
            <CollapsibleRN
                collapsed={isCollapsed}
                {...propsCollapsed}
            >
                <View
                    style={[
                        {},
                        styleContent
                    ]}
                >
                    {children}
                </View>
            </CollapsibleRN>
        </View>
    )
}
//#endregion

//#region Screen
const Screen = (props) => {
    const {
        onDeactive = () => { },
        onActive = () => { },
    } = props;


    const refNextAppState = useRef(null)

    const _handleAppStateChange = (nextAppState) => {
        if (['background', 'inactive'].indexOf(nextAppState) >= 0 && (refNextAppState.current == 'active' || refNextAppState.current == null)) {
            onDeactive();
        }
        else if (['background', 'inactive'].indexOf(refNextAppState.current) >= 0 && nextAppState == 'active') {
            onActive();
        }

        refNextAppState.current = nextAppState;
    };
    useEffect(() => {
        AppState.addEventListener('change', _handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', _handleAppStateChange);
        }
    }, [])
    const { style, children } = props
    return (
        <View
            style={[
                {
                    flex: 1
                },
                style
            ]}
        >
            {children}
        </View>
    )
}
//#endregion


export {
    useStateCallback,
    useStateCallbackLayout,
    useStateSetCallback,
    useForceUpdate,
};
export default {
    Alert,
    ViewHorizontal,
    ViewHorizontalCenter,
    ViewBoxShadown,
    ViewCenter,
    EmptyComponent,
    ActivityIndicator,
    Loading,
    Text,
    Button,
    Image,
    Modal,
    Header,
    Icon,
    Ionicons,
    AntDesign,
    EvilIcons,
    MaterialIcons,
    MaterialCommunityIcons,
    FontAwesome,
    FontAwesome5,
    ViewIcon,
    Screen,
    Card,
    FontCustom,
    Selector,
    DatePicker,
    TextDate,
    TextInput,
    HiddenField,
    Checkbox,
    Radio,
    RadioGroup,
    Form,
    SelectorImage,
    Field,
    Prompt,
    ComponentDynamic,
    Collapsible,
    ToggleView,
    Slider,
};
