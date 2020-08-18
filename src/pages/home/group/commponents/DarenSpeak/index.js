import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import Loading from '@/components/Loading';
import NewWork from '../NewWork';
import SwipeList from '../SwiperList';
import BrowseList from '../BrowseList';
import request from '@/lib/request';
import { API_GET_TALENT_INFO } from '@/reducer/productReducer';

function Index({ navigation, setStatusObj }) {
  const [data, setData] = useState(null);
  const [clickDataList, setClickDataList] = useState([]);
  const [id, setId] = useState(0);
  const goToDetail = function (id) {
    navigation.push('darenSpeakDetails', { id });
  };
  const getData = () => {
    request
      .get(API_GET_TALENT_INFO, {
        query: {
          talentcat: id,
        },
      })
      .then(value => {
        setClickDataList(value.data.clickdata);
        if (!data) {
          setData(value);
        }
      }).catch(_ => setStatusObj('ERROR'));
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    );
  }
  return (
    <View>
      {data && (
        <ScrollView>
          <SwipeList list={data.data.topdata} goToDetail={goToDetail} />
          <NewWork list={data.data.newdata} goToDetail={goToDetail} />
          <BrowseList
            tableList={[
              '全部',
              ...Object.keys(data.data.talent_Category).reduce(
                (result, value) => {
                  result.push(data.data.talent_Category[value]);
                  return result;
                },
                []
              ),
            ]}
            goToDetail={goToDetail}
            list={clickDataList}
            id={id}
            setId={setId}
          />
        </ScrollView>
      )}
    </View>
  );
}

export default withNavigation(Index);
