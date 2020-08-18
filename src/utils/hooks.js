import { useEffect, useState, useRef } from 'react';
import { throttle } from 'lodash';

/**
 * @param {Function} value 触发函数
 * @param {number} delay 节流时间
 */
export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // 如果值发生更改，则取消超时(也适用于延迟更改或卸载)
    // . .在延期期内。清除超时并重新启动。
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue];
}

export function useInterval(callback, delay, nextTime) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, nextTime]);
}

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * Idea stolen from: https://stackoverflow.com/a/55075818/1526448
 * @param {Function} effect
 * @param {Array<any>} dependencies
 */
export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
}

/* 因为RN已经默认为scroll触发事件进行了节流，所以设置默认函数节流时间为0 */
const DEFAULT_OPTIONS = { throttleWait: 0, triggerDistance: 300 };

/**
 * @param {Function} fetchMore 滚动到指定位置触发的函数
 * @param {Object} options 滚动参数，throttleWait:函数节流时间，triggerDistance：触发滚动函数的位置
 */
export function useInfiniteScroll(fetchMore, options) {
  const [loading, setLoading] = useState(null);
  const { throttleWait, triggerDistance } = Object.assign(
    {},
    DEFAULT_OPTIONS,
    options
  );
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const throttleScroll = throttle(function (container) {
    if (!container.nativeEvent) {
      return null;
    }
    const scrollTop = container.nativeEvent.contentOffset.y;
    const clientHeight = container.nativeEvent.layoutMeasurement.height;
    const scrollHeight = container.nativeEvent.contentSize.height;
    if (
      !loading &&
      scrollTop > lastScrollTop &&
      scrollTop + clientHeight + triggerDistance >= scrollHeight
    ) {
      setLoading(true);
      setLastScrollTop(scrollTop);
    }
  }, throttleWait);

  useEffect(() => {
    async function fetchData() {
      if (loading) {
        setLoading(false);
        await fetchMore();
      }
    }
    fetchData();
  }, [fetchMore, loading]);
  return [throttleScroll, loading];
}
