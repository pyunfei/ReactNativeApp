// sku逻辑
// 获得对象的key
const getObjKeys = obj => {
  if (obj !== Object(obj)) throw new TypeError('Invalid object');
  var keys = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      keys[keys.length] = key;
    }
  }
  return keys;
};

const getCombFlags = (m, n) => {
  if (!n || n < 1) {
    return [];
  }

  var aResult = [];
  var aFlag = [];
  var bNext = true;
  var i, j, iCnt1;

  for (i = 0; i < m; i++) {
    aFlag[i] = i < n ? 1 : 0;
  }
  aResult.push(aFlag.concat());

  while (bNext) {
    iCnt1 = 0;
    for (i = 0; i < m - 1; i++) {
      if (aFlag[i] === 1 && aFlag[i + 1] === 0) {
        for (j = 0; j < i; j++) {
          aFlag[j] = j < iCnt1 ? 1 : 0;
        }
        aFlag[i] = 0;
        aFlag[i + 1] = 1;
        var aTmp = aFlag.concat();
        aResult.push(aTmp);
        if (
          aTmp
            .slice(-n)
            .join('')
            .indexOf('0') === -1
        ) {
          bNext = false;
        }
        break;
      }
      aFlag[i] === 1 && iCnt1++;
    }
  }
  return aResult;
};

const combInArray = aData => {
  if (!aData || !aData.length) {
    return [];
  }
  var len = aData.length;
  var aResult = [];

  for (var n = 1; n < len; n++) {
    var aaFlags = getCombFlags(len, n);
    while (aaFlags.length) {
      var aFlag = aaFlags.shift();
      var aComb = [];
      for (var i = 0; i < len; i++) {
        aFlag[i] && aComb.push(aData[i]);
      }
      aResult.push(aComb);
    }
  }
  return aResult;
};

// 替换sku前缀为数字+下划线组合为空字符串
export const replaceSpace = str => {
  // eslint-disable-next-line
  return str.replace(/^(\d+)\_/, '');
};

// 初始化sku
export const initSku = (Attrs, Skus) => {
  const newAttrs = Attrs.map(attr => {
    const newValues = attr.values.map(val =>
      Object.assign({}, { value: val }, { isActive: false, notClick: false })
    );
    return Object.assign({}, attr, { values: newValues });
  });
  const newData = {};
  Skus.filter(v => v.stock > 0).forEach(sku => {
    const pair = sku.attrText
      .split(',')
      .sort((a, b) => a.replace(/:/, '').localeCompare(b.replace(/:/, '')))
      .join(',');
    newData[pair] = sku;
  });
  const skuKeys = getObjKeys(newData);
  const newSKUResult = {};
  for (let i = 0; i < skuKeys.length; i++) {
    const skuKey = skuKeys[i];
    const sku = newData[skuKey];
    const skuKeyAttrs = skuKey.split(',');
    skuKeyAttrs.sort((a, b) =>
      a.replace(/:/, '').localeCompare(b.replace(/:/, ''))
    );
    const combArr = combInArray(skuKeyAttrs);
    for (let j = 0; j < combArr.length; j++) {
      var key = combArr[j].join(',');
      // 把所有key的情况的结果存放到结果集SKUResult
      if (newSKUResult[key]) {
        // SKU信息key属性·
        // newSKUResult[key].count += sku.count;
        newSKUResult[key].prices.push(sku.price);
      } else {
        newSKUResult[key] = {
          // count: sku.count,
          prices: [sku.price],
        };
      }
    }
    newSKUResult[skuKeyAttrs.join(',')] = {
      // count: sku.count,
      prices: [sku.price],
    };
  }
  for (let i = 0; i < newAttrs.length; i++) {
    for (let j = 0; j < newAttrs[i].values.length; j++) {
      const firstId = newAttrs[i].name;
      const secondId = newAttrs[i].values[j].value;
      const newId = `${firstId}:${secondId}`;
      const isNotExist = !newSKUResult[newId];
      if (isNotExist) {
        newAttrs[i].values[j].notClick = true;
      }
    }
  }
  let attrText = '请选择';
  Attrs.forEach(attr => {
    attrText += ` ${replaceSpace(attr.name)}`;
  });
  return {
    newSKUResult,
    newData,
    newAttrs,
    attrText,
  };
};

// 选择sku时获取对应的结果
export const getSkuResult = (index, cindex, params) => {
  const { attrs, SKUResult } = params;
  const itemInfo = JSON.parse(JSON.stringify(attrs));
  const itemChildInfo = JSON.parse(JSON.stringify(attrs[index].values));
  // 选中自己，兄弟节点取消选中
  if (!itemChildInfo[cindex].notClick) {
    if (itemChildInfo[cindex].isActive) {
      itemChildInfo[cindex].isActive = false;
    } else {
      for (let i = 0; i < itemChildInfo.length; i++) {
        itemChildInfo[i].isActive = false;
      }
      itemChildInfo[cindex].isActive = true;
    }
  }
  itemInfo[index].values = itemChildInfo;
  const changeId = [];
  for (let i = 0; i < itemInfo.length; i++) {
    for (let j = 0; j < itemInfo[i].values.length; j++) {
      if (itemInfo[i].values[j].isActive) {
        const currentId = `${itemInfo[i].name}:${itemInfo[i].values[j].value}`;
        changeId.push(currentId);
      }
    }
  }
  if (changeId.length) {
    const notSelect = [];
    const notSelectId = [];
    const len = changeId.length;
    for (let i = 0; i < itemInfo.length; i++) {
      for (let j = 0; j < itemInfo[i].values.length; j++) {
        if (
          itemInfo[index].values[cindex].value !== itemInfo[i].values[j].value
        ) {
          const newId = `${itemInfo[i].name}:${itemInfo[i].values[j].value}`;
          notSelect.push({
            index: i,
            cindex: j,
            id: newId,
          });
          notSelectId.push(newId);
        }
      }
    }
    for (let i = 0; i < changeId.length; i++) {
      const indexes = notSelectId.indexOf(changeId[i]);
      if (indexes > -1) {
        notSelect.splice(indexes, 1);
      }
    }
    for (let i = 0; i < notSelect.length; i++) {
      let newAttrIds = [];
      let siblingsId = '';
      for (let m = 0; m < itemInfo[notSelect[i].index].values.length; m++) {
        if (itemInfo[notSelect[i].index].values[m].isActive) {
          siblingsId = `${itemInfo[notSelect[i].index].name}:${itemInfo[notSelect[i].index].values[m].value}`;
        }
      }
      if (siblingsId !== '') {
        for (let j = 0; j < len; j++) {
          changeId[j] !== siblingsId && newAttrIds.push(changeId[j]);
        }
      } else {
        newAttrIds = changeId.concat();
      }
      newAttrIds = newAttrIds.concat(
        `${itemInfo[notSelect[i].index].name}:${itemInfo[notSelect[i].index].values[notSelect[i].cindex].value}`
      );
      newAttrIds.sort((a, b) =>
        a.replace(/:/, '').localeCompare(b.replace(/:/, ''))
      );
      if (!SKUResult[newAttrIds.join(',')]) {
        itemInfo[notSelect[i].index].values[
          notSelect[i].cindex
        ].notClick = true;
        itemInfo[notSelect[i].index].values[
          notSelect[i].cindex
        ].isActive = false;
      } else {
        itemInfo[notSelect[i].index].values[
          notSelect[i].cindex
        ].notClick = false;
      }
    }
  } else {
    for (let i = 0; i < itemInfo.length; i++) {
      for (let j = 0; j < itemInfo[i].values.length; j++) {
        const itemId = `${itemInfo[i].name}:${itemInfo[i].values[j].value}`;
        if (SKUResult[itemId]) {
          itemInfo[i].values[j].notClick = false;
        } else {
          itemInfo[i].values[j].notClick = true;
          itemInfo[i].values[j].isActive = false;
        }
      }
    }
  }
  let activeCount = 0;
  let selectText = '已选:';
  let notSelectText = '请选择 ';
  itemInfo.forEach(item => {
    const isActive = item.values.find(v => v.isActive);
    if (isActive) {
      activeCount++;
      const activeVal = isActive;
      const selectName = activeVal.value;
      selectText += `"${selectName}"`;
    } else {
      notSelectText += ` ${replaceSpace(item.name)}`;
    }
  });
  const attrPair = changeId
    .sort((a, b) => a.replace(/:/, '').localeCompare(b.replace(/:/, '')))
    .join(',');
  const attrText = activeCount === itemInfo.length ? selectText : notSelectText;
  return {
    attrText,
    itemInfo,
    attrPair,
  };
};
