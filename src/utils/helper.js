import * as WeChat from 'react-native-wechat-lib';
import { Clipboard, Linking } from 'react-native';
import { API_GET_USER } from '@/reducer/userReducer';
import { getTPWD } from '@/reducer/productReducer';
import request from '@/lib/request';
import RNAlibc from '@/lib/RNAlibc';
import Toast from '@/components/Toast';
import BigNumber from 'bignumber.js';
import { globalStore } from '@/app.js';
import ModalAuth from '@/components/ModalTBAuth';
import DeviceInfo from 'react-native-device-info';
import codePush from 'react-native-code-push';
import config from '@/config';

const remainStr = val => (val >= 10 ? `${val}` : `0${val}`);

// 倒计时helper
export const limitHelper = remain => {
  const days = remainStr(parseInt(remain / (60 * 60 * 1000 * 24)));
  const hours = remainStr(parseInt((remain / (60 * 60 * 1000)) % 24));
  const mins = remainStr(parseInt((remain / (60 * 1000)) % 60));
  const secs = remainStr(parseInt((remain / 1000) % 60));
  return {
    days,
    hours,
    mins,
    secs,
  };
};

// 旋转矩阵
export const rotateMatrix = deg => {
  const rotateDeg = (deg / 180) * Math.PI;
  return [
    Math.cos(rotateDeg),
    Math.sin(rotateDeg),
    0,
    0,
    -Math.sin(rotateDeg),
    Math.cos(rotateDeg),
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
  ];
};

// 微信登录逻辑封装
export async function WXLogin(onSuccess, onReject, onNotInstalled) {
  const isInstalled = await WeChat.isWXAppInstalled();
  if (isInstalled) {
    try {
      // 发送授权请求
      const res = await WeChat.sendAuthRequest('snsapi_userinfo');
      console.log(res);
      onSuccess(res);
    } catch (e) {
      if (e instanceof WeChat.WechatError) {
        console.error(e.stack);
      } else {
        console.error(e);
      }
    }
  } else {
    onNotInstalled('请先安装微信客户端再进行登录');
  }
}

// 判断是否安装微信
export function isInstallWX() {
  return WeChat.isWXAppInstalled();
}

// 微信分享逻辑
export async function WXShare(params, shareType = 'session', onSuccess = () => {}) {
  const shareFunc = {
    session: 'shareToSession',
    timeline: 'shareToTimeline',
  };
  const isInstalled = await WeChat.isWXAppInstalled();
  if (isInstalled) {
    const shareParams = Object.assign({}, { type: 'news' }, params);
    try {
      await WeChat[shareFunc[shareType]](shareParams);
      onSuccess();
    } catch (e) {}
  } else {
    Toast.showWarn('请先安装微信客户端再进行分享');
  }
}

/**
 *
 * @param params {url :商店url , authUrl: 淘宝授权url, type: 类型, itemId: 需要拿淘口令时传入，shopId：需要调店铺时传入, title: 商品标题}
 * @desc type: shop - 跳店铺、TPWD - 跳优惠券链接、 pwdShare - 复制淘口令打开微信、 空 - 跳链接
 * @param openCb
 */
export async function tbAuth(params) {
  const { url = '', type = '', shopId = '', itemId = '', title = '' } = params;
  const coupon = { type: 'url', payload: { url } };
  const shop = { type: 'shop', payload: { shopId } };
  const detail = { type: 'detail', payload: { itemId } };
  try {
    const res = await request.get(API_GET_USER);
    if (res.topExpiredAt) {
      Toast.hide();
      if (type === 'shop') {
        alibcShow(shop);
      } else if (type === 'TPWD' || type === 'pwdShare') {
        Toast.showLoading();
        try {
          const res = await getTPWD({
            query: {
              itemId,
            },
          });
          Toast.hide();
          const params = {
            type: 'url',
            payload: {
              url: res.clickUrl,
            },
          };
          if (type === 'TPWD') {
            if (res.clickUrl) {
              alibcShow(params);
            } else {
              Toast.showError('淘口令获取异常');
            }
          }
          if (type === 'pwdShare') {
            const tpwd = `【${title}】点击链接，再选择浏览器打开；或复制这条信息，👉打开手机淘宝👈 ${res.model}`;
            Clipboard.setString(tpwd);
            Toast.showSuccess('复制成功');
            Linking.openURL('weixin://');
          }
        } catch (e) {
          Toast.hide();
          if (type === 'pwdShare') {
            Toast.showError('复制失败');
          } else {
            Toast.showError(e.response.data.message);
          }
        }
      } else if (type === 'detail') {
        alibcShow(detail);
      } else {
        alibcShow(coupon);
      }
    } else {
      ModalAuth.show();
    }
  } catch (e) {
    Toast.hide();
    Toast.showError(e.response.data.message);
  }
}

export function vip(userData) {
  return userData.level && userData.level !== 11;
}

// 跳转淘宝
export const alibcShow = param => {
  RNAlibc.show(param).catch(_ => {});
};

// 计算金额
export const calcPrice = (price, fixed = 2, isFixed = true) => {
  if (!price) {
    return BigNumber(0).toFixed(fixed);
  }
  const temp = BigNumber(price).div(BigNumber(100));
  const res = isFixed ? temp.toFixed(fixed) : temp.dp(fixed);
  return res;
};

// 计算蜜桃
export const calcHoneyData = data => {
  if (!data) {
    return 0;
  }
  const res = BigNumber(data)
    .div(BigNumber(100))
    .toNumber();
  return res;
};

export const getVersion = async () => {
  const appversion = await DeviceInfo.getVersion();
  const version = `v${appversion}`;
  return version;
};

export const getCodeVersion = async () => {
  const codepushversion = await codePush.getUpdateMetadata();
  let version = '';
  if (codepushversion) {
    version = codepushversion.label;
  }
  return version;
};

// 是否是店长
export const isShopOwner = () => {
  const { userData } = globalStore.getState().userReducer;
  const { level } = userData;
  return level && level >= 22;
};

// 获取下载链接
export const getDLUrl = () => {
  const {
    userData: { inviteCode },
  } = globalStore.getState().userReducer;
  return `${config.H5_PREFIX}/download/?code=${inviteCode}`;
};

// 通用分享
export const getCommonSharePath = () => {
  const {
    userData: { inviteCode },
  } = globalStore.getState().userReducer;
  return `/pages/launch/index?invite=${inviteCode}`;
};

// 解析分享路径
export const getItemSharePath = (itemId, gatherId = '') => {
  const {
    userData: { inviteCode },
  } = globalStore.getState().userReducer;
  if (gatherId) {
    return `/pages/launch/index?pg=productDetailSelf&itemId=${itemId}&invite=${inviteCode}&gatherId=${gatherId}`;
  } else {
    return `/pages/launch/index?pg=productDetailSelf&itemId=${itemId}&invite=${inviteCode}`;
  }
};

// 限制特殊字符
export function limitSpecialString(str) {
  // const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
  // const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
  const regEm = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

  if (regEm.test(str)) {
    return true;
  }
  return false;
}

// parse对象
export const parseObj = str => {
  if (Boolean(str) && str.startsWith('{') && str.endsWith('}')) {
    return JSON.parse(str);
  }
  return {};
};

// parse数组
export const parseArray = str => {
  if (Boolean(str) && str.startsWith('[') && str.endsWith(']')) {
    return JSON.parse(str);
  }
  return [];
};

// 销量单位转换
export const scaleSalesUnit = sales => {
  if (isNaN(sales)) {
    return 0;
  }
  if (sales <= 1000) {
    return '0.1万+';
  }
  if (sales >= 100000000) { //1亿
    return '9999万+'
  }
  const temp = BigNumber(sales)
    .div(10000)
    .dp(2)
    .toNumber();
  return `${temp}万+`;
};
