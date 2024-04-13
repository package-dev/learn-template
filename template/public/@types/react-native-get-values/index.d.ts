import { Platform } from "react-native";
declare const iOSGetter: (key: string) => Promise<any>;
declare const androidGetter: (key: string) => Promise<any>;
export default Platform.OS === "ios" ? iOSGetter : androidGetter;
