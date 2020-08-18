import { globalStore } from '@/app.js';
import BigNumber from 'bignumber.js';
import { isEmpty } from 'lodash';

const getUserData = () => {
  const {
    userData: { level = 11 },
  } = globalStore.getState().userReducer;
  return level;
};

/**
 * 计算花粉收益
 * @param {Object} award - 收益数据
 * @param {Boolean} isShowTotal - 是否显示完整收益（立即到账 + 延时到账）
 */
export const calcPollen = (award, isShowTotal = true) => {
  const level = getUserData();

  if (isEmpty(award)) {
    return 0;
  }
  const { returnPollen } = award[0];
  const levelProfits = award[1];
  if (isNaN(returnPollen) || isEmpty(levelProfits)) {
    return 0;
  }

  const res =
    isShowTotal && !!levelProfits[level]
      ? BigNumber(returnPollen).plus(BigNumber(levelProfits[level].returnPollen))
      : BigNumber(returnPollen);

  return res.dp(0, 3).toNumber();
};

/**
 * 计算返佣收益
 * @param {Object} award - 收益数据
 * @param {Boolean} isShowTotal - 是否显示完整收益（立即到账 + 延时到账）
 */
export const calcMoney = (award, isShowTotal = true) => {
  const level = getUserData();
  const fixed = 2;

  if (isEmpty(award)) {
    return (0).toFixed(fixed);
  }
  const { returnMoney } = award[0];
  const levelProfits = award[1];
  if (isNaN(returnMoney) || isEmpty(levelProfits)) {
    return (0).toFixed(fixed);
  }

  const temp =
    isShowTotal && !!levelProfits[level]
      ? BigNumber(returnMoney).plus(levelProfits[level].returnMoney)
      : BigNumber(returnMoney);

  return temp.div(100).toFixed(fixed, 3);
};

// 计算购物金收益
export const calcDeduction = award => {
  if (isEmpty(award)) {
    return 0;
  }
  const { returnDeduction } = award[0];
  if (isNaN(returnDeduction)) {
    return 0;
  }

  const res = BigNumber(returnDeduction)
    .div(100)
    .dp(2, 3)
    .toNumber();

  return res;
};
