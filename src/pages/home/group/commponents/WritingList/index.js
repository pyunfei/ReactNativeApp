import React, { memo } from 'react';
import WritingItem from '@/pages/home/group/commponents/WritingItem';
import request from '@/lib/request';
import { API_GET_EDITOR, API_GET_SELECTED } from '@/reducer/productReducer';
import FlatListPro from '@/components/FlatListPro';
import i18n from '@/locales';

const RenderItem = memo(function Index({
  item: {
    itempic,
    show_time: showTime,
    itemendprice,
    content,
    title,
    show_comment: showComment,
    copy_comment: copyComment,
    copy_content: copyContent,
    itemid,
  },
  showImage,
  index,
}) {
  return (
    <WritingItem
      content={content}
      title={title}
      key={index}
      itempic={itempic}
      showTime={showTime}
      itemendprice={itemendprice}
      showComment={showComment}
      copyContent={copyContent}
      copyComment={copyComment}
      itemid={itemid}
    />
  );
});
function Index({ tabLabel, showImage, setStatusObj }) {
  const url =
    tabLabel === i18n.t('group.friend') ? API_GET_SELECTED : API_GET_EDITOR;
  const fetchProductDetail = minId => {
    return request
      .get(url, {
        query: {
          minId: minId.query.pageNo,
          back: 5,
        },
      })
      .then(res => {
        return res.data;
      }).catch(_ => setStatusObj('ERROR'));
  };
  return (
    <FlatListPro
      fetchRequest={fetchProductDetail}
      pageSize={5}
      renderItem={({ item, index }) => (
        <RenderItem item={item} index={index} showImage={showImage} />
      )}
    />
  );
}

export default Index;
