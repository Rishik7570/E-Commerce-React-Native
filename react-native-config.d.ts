declare module 'react-native-config' {
    export interface NativeConfig {
        API_KEY?: string;
        API_HOST?: string;
    }
    export const Config: NativeConfig;
    export default Config;
  }
