import React, { memo } from 'react';
import { View, Text, Clipboard, Platform, PermissionsAndroid } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import PressView from '@/components/PressView';
import Button from '@/components/Button';
import styleJss from './style';
import i18n from '@/locales';
import LoadImg from '@/components/Image';
import { withNavigation } from 'react-navigation';
import LayoutGradient from '@/components/GradientLayout';
import { connect } from 'react-redux';
import { tbAuth } from '@/utils/helper';
import { DocumentDirectoryPath, downloadFile } from 'react-native-fs';
import Toast from '@/components/Toast';

function Index({ pictureList, copyContent, navigation, itemid, showImage, isLogin, title }) {
  const formatPictureList = pictureList.reduce((result, value) => {
    result.push({ url: value });
    return result;
  }, []);
  function goTo() {
    return navigation.push('productDetailHDK', { itemId: itemid });
  }
  /*
   * 根据不同的手机系统判断存储方式
   * */
  function savePicture({ resolve, reject, url }) {
    if (Platform.OS === 'ios') {
      CameraRoll.saveToCameraRoll(url, 'photo')
        .then(_ => resolve(true))
        .catch(_ => reject('请赋予应用存储权限'));
    } else {
      const storeLocation = `${DocumentDirectoryPath}`;
      const pathName = new Date().getTime() + Math.random(1000, 9999) + '.png';
      const downloadPath = `${storeLocation}/${pathName}`;
      const ret = downloadFile({ fromUrl: url, toFile: downloadPath });
      ret.promise
        .then(res => {
          if (res && res.statusCode === 200) {
            CameraRoll.saveToCameraRoll('file://' + downloadPath, 'photo')
              .then(_ => resolve(true))
              .catch(_ => reject('保存失败'));
          } else {
            reject('下载失败');
          }
        })
        .catch(_ => reject('下载失败'));
    }
  }
  async function requestStoresPermission() {
    if (Platform.OS !== 'ios') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          cacheData();
        } else {
          Toast.showError('请赋予应用存储权限');
        }
      } catch (err) {
        Toast.showError('授权失败');
      }
    } else {
      cacheData();
    }
  }
  function cacheData() {
    Toast.showLoading();
    const result = formatPictureList.map(({ url }) => {
      return new Promise((resolve, reject) => {
        savePicture({ resolve, reject, url });
      });
    });
    Promise.all(result)
      .then(_ => {
        Clipboard.setString(copyContent.replace(/&lt;br&gt;/g, ','));
        Toast.hide();
        Toast.showSuccess('图片保存成功！文案复制成功');
      })
      .catch(error => {
        Toast.hide();
        Toast.showError(error);
      });
  }
  function copyComment() {
    if (isLogin) {
      // fetchAuthUrlAction();
      const params = {
        type: 'pwdShare',
        itemId: itemid,
        title,
      };
      tbAuth(params);
    } else {
      navigation.push('authLogin');
    }
    // 淘宝授权逻辑
  }
  return (
    <View style={styleJss.fullScreen}>
      <View style={pictureList.length === 4 ? styleJss.pictureListToCenter : styleJss.pictureList}>
        {pictureList.map((value, index) => (
          <PressView key={index} onPress={() => showImage(index, formatPictureList)}>
            <LoadImg style={styleJss.picture} src={value} />
          </PressView>
        ))}
      </View>
      <View style={styleJss.footer}>
        <Text style={styleJss.commandText}>{copyContent.replace(/&lt;br&gt;/g, ',')}</Text>
      </View>
      <View style={styleJss.toBeBetween}>
        <View>
          {/* <Text style={styleJss.pollenText}>预计赚取{calcMoney({
          distribution,
          returnProfit: reduceNum,
        })}花粉</Text>
        <Image
          style={styleJss.pollenIcon}
          source={require('@/assets/image/pollen.png')}
        /> */}
        </View>
        <View style={styleJss.toBeLeVel}>
          <PressView debounceTime={500} onPress={requestStoresPermission}>
            <LayoutGradient style={styleJss.buyButton}>
              <Text style={styleJss.buyText}>一键保存</Text>
            </LayoutGradient>
          </PressView>
          <PressView onPress={goTo}>
            <LayoutGradient style={styleJss.buyButton}>
              <Text style={styleJss.buyText}>立即{i18n.t('group.buy')}</Text>
            </LayoutGradient>
          </PressView>
          {/* <PressView onPress={copyComment}>
            <View style={styleJss.shareButton}>
              <Text style={styleJss.shareText}>分享淘口令</Text>
            </View>
          </PressView> */}
          <Button
            title="分享淘口令"
            onPress={copyComment}
            textStyle={styleJss.shareText}
            style={styleJss.shareButton}
          />
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    authUrl: state.productReducer.authUrl,
    userData: state.userReducer.userData,
    isLogin: state.userReducer.isLogin,
  };
};

export default connect(mapStateToProps)(withNavigation(memo(Index)));
