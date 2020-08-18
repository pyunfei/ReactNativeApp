/**
 * ping ++
 * */
import { NativeModules } from 'react-native';
const PingppModule = NativeModules.PingppModule;

/**
 *
 * @param object 字典对象
 * @param urlScheme
 */
export function createPayment(object, urlScheme) {
  object.urlScheme = urlScheme;
  PingppModule.createPayment(object, (result) => {
    console.log('ping++ creactPayment:', result);
  });
}

/***
 *
 * @param object 字典对象
 * @param urlScheme
 */
export function createPay(object, urlScheme) {
  object.urlScheme = urlScheme;
  PingppModule.createPay(object, (result) => {
    console.log('ping ++ createPay:', result);
  });
}

//  是否开启调试模式
export function setDebugModel(enable = false) {
  PingppModule.setDebugModel(enable);
}
