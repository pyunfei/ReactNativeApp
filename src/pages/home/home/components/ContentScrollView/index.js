import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Text, FlatList, ScrollView, RefreshControl, View } from 'react-native';
import Loading from '@/components/Loading';
import Divider from '@/components/Divider';
import StatusView, { StateEmpty, StateLoad } from '@/components/StatusView';
import i18n from '@/locales';
import { themeMap } from '@/utils/scaleStyle';

const lang = i18n.t('app');
function Component(
  {
    isEnd,
    refreshing,
    data,
    onRefresh,
    onEndReached,
    renderItem,
    renderSticky,
    renderHeader,
    ...restProps
  },
  ref
) {
  const renderEmpty = () => {
    return <StatusView status={data ? StateEmpty : StateLoad} tips={lang.nodata} />;
  };

  const renderFooter = () => {
    if (!data || data.length === 0) {
      return null;
    } else if (isEnd) {
      return (
        <Text style={{ lineHeight: 30, alignSelf: 'center', color: themeMap.$BlackM }}>
          {lang.nomoredata}
        </Text>
      );
    } else {
      return <Loading />;
    }
  };

  const renderDivider = () => {
    return <Divider height={20} color={themeMap.$PageBg} />;
  };
  const handleOnRefresh = () => {
    onRefresh();
  };
  const handleOnEndReached = e => {
    var offsetY = e.nativeEvent.contentOffset.y; // 滑动距离
    var contentSizeHeight = e.nativeEvent.contentSize.height; // scrollView contentSize高度
    var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; // scrollView高度
    // 偏差值10
    if (offsetY + oriageScrollHeight >= contentSizeHeight - 10) {
      onEndReached();
    }
  };
  return data ? (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />}
      onMomentumScrollEnd={handleOnEndReached}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...restProps}
      stickyHeaderIndices={[0]}
    >
      {renderSticky()}
      {renderHeader()}
      {data &&
        data.map((item, index) => {
          return (
            <View key={index}>
              {renderItem(item)}
              {renderDivider()}
            </View>
          );
        })}
      {renderFooter()}
    </ScrollView>
  ) : (
    renderEmpty()
  );
}

const ContentScrollView = forwardRef(Component);

ContentScrollView.propTypes = {
  isEnd: PropTypes.bool,
  renderItem: PropTypes.func,
  renderSticky: PropTypes.func,
  renderHeader: PropTypes.func,
};

ContentScrollView.defaultProps = {
  isEnd: true,
  renderItem: () => {},
  renderSticky: () => {},
  renderHeader: () => {},
};

export default ContentScrollView;
