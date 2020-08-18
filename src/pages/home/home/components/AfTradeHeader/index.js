import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import PressView from '@/components/PressView';
import PropTypes from 'prop-types';
import Image from '@/components/Image';
import styles, { itemStyle } from './style';
// import { themeMap } from '@/utils/scaleStyle';
import Layout from '@/utils/layout';
import images from './assets';

const width = Layout.screenWidth / 6;
export default class AfTradeList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    this.color = itemStyle.selectStyle;
  }

  onClick = (item, index) => {
    if (index === this.state.index) {
      return;
    }
    this.setState({
      index,
    });
    this.props.onPress(item);
  };

  itemView = ({ item, index }) => {
    const isCurrentIndex = this.state.index === index;
    const ystyle = { width: 0, height: 0 };
    const containerWidth = Math.min((width + (item.name.length - 2) * 17), 95); // 最大五个字长
    return (
      <PressView
        style={itemStyle.itemContainer}
        key={index}
        onPress={() => {
          this.onClick(item, index);
        }}
      >
        <View style={ StyleSheet.flatten([styles.headerItemStyle, { width: containerWidth }])}>
          <Text style={StyleSheet.flatten([styles.headerTitleStyle, isCurrentIndex && this.color])} numberOfLines={1} >{item.name}</Text>
          <Image src={images.ic_yuan} style={StyleSheet.flatten([ystyle, isCurrentIndex && itemStyle.yuanStyle])} />
        </View>
      </PressView>
    );
  };

  render() {
    const { data } = this.props;
    return (
      <View style={styles.sectionHeaderView}>
        <FlatList
          renderItem={this.itemView}
          extraData={this.state}
          data={data}
          bounces={false}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={null}
        />
      </View>
    );
  }
}

AfTradeList.propTypes = {
  data: PropTypes.array,
  onPress: PropTypes.any,
};
