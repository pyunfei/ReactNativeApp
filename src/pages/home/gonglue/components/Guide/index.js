import React, { useContext } from 'react';
import { View, Text, ScrollView, Clipboard } from 'react-native';
import * as WeChat from 'react-native-wechat-lib';
import { NavigationContext } from 'react-navigation';
import { useSelector } from 'react-redux';
import Button from '@/components/Button';
import Toast from '@/components/Toast';
import { themeMap } from '@/utils/scaleStyle';
import { isInstallWX } from '@/utils/helper';
import px from '@/utils/scalePx';
import { WX_NAMEID, CUSTOMER_SERVICE_WECHAT } from '@/constant';
import { H5_PREFIX, OSS_PREFIX } from '@/config';

import styles from './style.scss';

function Guide() {
  const guideList = [
    {
      title: '成长任务1：免费升级店长赚钱',
      content: [
        `创建1个大于50人的微信群即可升级店长，赶快加趣比比小助手微信${CUSTOMER_SERVICE_WECHAT}，升级店长开启赚钱特权。`,
      ],
      button: '复制微信号',
      event: () => handleCopyWX(),
    },
    {
      title: '成长任务2：学习分享赚钱技能',
      content: ['学习分享赚钱技能，学习如何分享商品和活动页，以及如何邀请好友绑定为自己的比友。'],
      button: '查看',
      event: () => handleWebView('taskB'),
    },
    {
      title: '成长任务3：给群友发免费福利',
      content: ['一键分享“新人0元购”活动到微信群，邀请群成员注册账号，并领取0元购买福利 '],
      button: '分享0元购',
      event: () => handleShareLyg(),
    },
    {
      title: '成长任务4：学习社群赚钱技巧',
      content: ['快快查看秘籍，齐齐来赚钱'],
      button: '查看',
      event: () => handleWebView('taskD'),
    },
    {
      title: '成长任务5：推荐好友加入平台 ',
      content: [
        '邀请身边好友成为店长，您将获得他推广收益20%的额外平台奖励。',
        '注：通过您转发的小程序注册自动成为您的直属用户，无需输入邀请码；好友升级为店长您将获得收益',
      ],
      button: '邀请好友',
      event: () => handleInvite(),
    },
  ];

  const navigation = useContext(NavigationContext);
  const {
    isLogin,
    userData: { inviteCode },
  } = useSelector(state => state.userReducer);

  const handleCopyWX = () => {
    Clipboard.setString(CUSTOMER_SERVICE_WECHAT);
    Toast.showSuccess('复制成功');
  };

  const handleWebView = url => {
    navigation.push('webview', {
      source: {
        uri: `${H5_PREFIX}/${url}`,
      },
    });
  };

  const handleRouteLogin = () => {
    navigation.push('authLogin');
  };

  const handleShareLyg = () => {
    if (!isLogin) {
      return handleRouteLogin();
    }
    const webpageUrl = `${H5_PREFIX}/download/?code=${inviteCode}`;
    const shareParams = {
      title: '快来薅羊毛，新人首单0元！',
      userName: WX_NAMEID,
      path: `/pages/launch/index?pg=webView&invite=${inviteCode}&src=${H5_PREFIX}/lingYuanGou`,
      thumbImageUrl: `${OSS_PREFIX}/qietu/LingYuanHeader.png`,
      webpageUrl,
    };
    if (isInstallWX) {
      WeChat.shareMiniProgram(shareParams);
    } else {
      Toast.showWarn('请先安装微信客户端再进行分享');
    }
  };

  const handleInvite = () => {
    if (!isLogin) {
      return handleRouteLogin();
    }
    navigation.push('inviteFriends');
  };

  // 虚线
  const renderDashLine = ({ style }) => {
    const len = 20;
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(i);
    }
    return (
      <View className={styles.dashLine} style={style}>
        {arr.map((item, index) => {
          return (
            <Text className={styles.dashItem} key={`dash${index}`}>
              {' '}
            </Text>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: px(20),
        paddingLeft: px(24),
        width: px(750),
      }}
    >
      {guideList.map(({ title, content, button, event }, index, array) => {
        const isFirst = index === 0;
        const isLast = index === array.length - 1;
        const dashLineStyle = {};

        isFirst &&
          Object.assign(dashLineStyle, {
            top: px(20),
          });

        return (
          <View key={index} className={styles.itemWrapper}>
            <View className={styles.titleWrapper}>
              <Text className={styles.title}>{title}</Text>
              {button && (
                <Button
                  title={button}
                  style={{
                    marginRight: px(23),
                    paddingLeft: 0,
                    paddingRight: 0,
                    width: px(144),
                    height: px(44),
                    borderRadius: px(22),
                  }}
                  textStyle={{
                    fontSize: px(themeMap.$FontSizeS),
                    color: themeMap.$BlackS,
                  }}
                  onPress={event}
                />
              )}
            </View>
            <View className={styles.contentWrapper} style={button && { width: px(488) }}>
              {content.map((item, i) => {
                return (
                  <Text key={i} className={styles.content}>
                    {item}
                  </Text>
                );
              })}
            </View>
            <View className={styles.dot} />
            {renderDashLine({ style: dashLineStyle })}
            {!isLast && <View className={styles.divider} />}
          </View>
        );
      })}
    </ScrollView>
  );
}

export default Guide;
