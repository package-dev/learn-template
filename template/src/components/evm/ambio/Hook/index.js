import {
  useState as useStateRN,
  useEffect as useEffectRN,
  useCallback as useCallbackRN,
  useRef as useRefRN,
  useLayoutEffect as useLayoutEffectRN,
  useMemo as useMemoRN,
} from 'react';
import { AppState, BackHandler, Platform } from 'react-native';
import { isBoolean, isFunction, isNumber } from 'underscore';

export * from '../NetInfo/hook';
export const useEffect = useEffectRN;
export const useRef = useRefRN;
export const useCallback = useCallbackRN;
export const useLayoutEffect = useLayoutEffectRN;
export const useMemo = useMemoRN;
/**
 *
 * @param {Any} value
 */
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useIsMountedRef() {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  });
  return isMountedRef;
}
/**
 *
 * @param {Function} action
 */
export function useUnMount(action) {
  useEffect(() => {
    if (typeof action == 'function') return action;
  }, [action]);
}
/**
 *
 * @param {Any} init
 */
export function useState(init) {
  const [data, setData] = useStateRN(init);
  const isMountedRef = useIsMountedRef();

  const _setData = useCallback(
    (value) => {
      if (isMountedRef.current) setData(value);
    },
    [isMountedRef.current],
  );

  return [data, _setData];
}
/**
 *
 * @param {Function} action
 */
export function useLoading(init = false, action = () => false) {
  const [loading, setLoading] = useState(init);
  const newAction = async () => {
    await setLoading(true);
    isFunction(action) && (await action());
    await setLoading(false);
  };
  return { loading, newAction };
}
/**
 *
 * @param {Object} navigation -- use for ios
 * @param {Function} handler --handling for back event
 */
export function useBackEvent(handler, navigation, ...rest) {
  const shouldBack = useRef(false)
  const numBack = useRef(0);
  useEffect(() => {
    if (Platform.OS == 'android') {
      var backHandle = BackHandler.addEventListener('hardwareBackPress', () => {
        if (isFunction(handler)) {
          let actionHandle = async (to = 0) => {
            if(isNumber(to) && to > 0 ) navigation.popToTop(to)
            else navigation.goBack();
          }
          let val = handler(actionHandle);
          if (isBoolean(val)) return val;
        }
        return true;
      });
      return () => backHandle && backHandle.remove();
    } else {
      navigation.addListener('beforeRemove', (e) => {
        numBack.current = numBack.current + 1;
        const action = e.data.action;
        let actionHandle = async (to = 0) => {
          await navigation.dispatch(action);
          if(isNumber(to)&& to > 0) navigation.popToTop(to);
        }
        if (!isFunction(handler) || shouldBack.current) return actionHandle();
          e.preventDefault();
        return handler(actionHandle);
      });
    }
  }, [handler, navigation, shouldBack,...rest]);

  return ()=> shouldBack.current = true;
}

/**
 *
 * @param {Number} timeToCount
 * @param {Number} interval
 */
export function useCountDown(timestamp, options = {}) {
  const { intervalTime = 1000, now = () => Date.now() } = options;
  const [timeLeft, setTimeLeft] = useState(
      () => new Date(timestamp) - new Date(now())
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 0) {
          clearInterval(interval);

          return 0;
        }

        return current - intervalTime;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [intervalTime, timestamp]);

  return timeLeft;
}
/**
 * 
 * @param {Function} callback 
 * @param {Number} timeout 
 * @param {Object} options 
 */
export function useCountDownAction({ timer, interval = 1000, autostart = false, expireImmediate = false, resetOnExpire = true, onExpire, onReset }) {
  const [countdown, setCountdown] = useState(timer);
  const [canStart, setCanStart] = useState(autostart);
  const [isRunning, setIsRunning] = useState(false);

  function start() {
    // must explicitly call reset() before starting an expired timer
    if (countdown !== 0) {
      setCanStart(true);
    }
  }

  function pause() {
    setCanStart(false);
    setIsRunning(false);
  }

  function initStopped(time) {
    setCanStart(false);
    setIsRunning(false);
    setCountdown(time);
  }

  const reset = useCallback(() => {
    initStopped(timer);
    if (onReset && typeof onReset === 'function') {
      onReset();
    }
  }, [timer, onReset]);

  const expire = useCallback(() => {
    initStopped(resetOnExpire ? timer : 0);
    if (onExpire && typeof onExpire === 'function') {
      onExpire();
    }
  }, [timer, onExpire, resetOnExpire]);

  const countdownRef = useRef(timer);
  useEffect(() => {
    countdownRef.current = countdown;
  }, [countdown]);

  useEffect(() => {
    function tick() {
      if (
        countdownRef.current / 1000 <= 0 ||
        (expireImmediate && (countdownRef.current - interval) / 1000 <= 0)
      ) {
        expire();
      } else {
        setCountdown(prev => prev - interval);
      }
    }

    let id;
    if (canStart) {
      id = setInterval(tick, interval);
      if (!isRunning) {
        setIsRunning(true);
      }
    }
    return () => clearInterval(id);
  }, [expire, canStart, interval, expireImmediate, isRunning]);

  return { countdown,  start, reset, pause, isRunning,};
}
/**
 * 
 * @param {Object} initData 
 * @param {Number} initPage 
 * @param {Boolean} initLoading 
 * @param {Promise} request 
 * @param {Function} signData
 * 
 */
export function useLoadMoreData(initData = [], initPage = 1, initLoading = false, request = async (params, onStart, onSuccess, onFail, onEnd) => { }, setParams = (page) => [page], signData = (oldData, newData) => [...oldData, ...newData], searchBy) {
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState(initLoading);
  const dataSearch = useRef(initData);
  const page = useRef(initPage);
  const [finished, setFinished] = useState(false)
  const error = useRef(error);
  const loadMore = async () => {
    !loading && await setLoading(true);
    if(!finished) page.current = page.current + 1;
  } 
  const stopLoad = () =>{
   if(!finished) setFinished(true);
  }
  const refresh = async () => {
    finished && await setFinished(false);
    if(page.current != initPage) page.current = initPage;
    loading != initLoading && await setLoading(initLoading);
    await _setData(true)
  }
  const search = (input) => {
    const newData = dataSearch.current.filter(item => {
      const itemData = isFunction(searchBy) ? searchBy(item).toUpperCase() : '';
      const textData = input.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
  }

  const _setData = async (isReload) => {
    const onSuccess = async (newData) => {
      loading && await setLoading(false);
      let dataSigned = isReload? signData(initData, newData) : isFunction(signData) && await signData(data, newData);
      if (dataSigned != data) {
        await setData(dataSigned);
        dataSearch.current = dataSigned;
      }
    }
    const onFail = (newError) => {
      loading && setLoading(false);
      if(newError != error.current ) error.current = newError;
    }
    const onEnd = () => loading && setLoading(false);
    const params = isFunction(setParams) ? setParams(page.current) : [page.current]
    isFunction(request) && await request(...params, false, onSuccess, onFail, onEnd)
  }

  useEffect(() => {
    _setData()
    return () => {
      stopLoad();
    }
  }, [loading, page]);

  return { data, loading, loadMore, refresh, error, stopLoad, search }
}

/**
 * 
 * @param {Function} handler 
 */
export function useAppState(handler) {
  const [appStateVisible, setAppStateVisible] = useState(AppState.currentState);
  const _handleAppStateChange = async(nextAppState) => {
    setAppStateVisible(nextAppState);
    isFunction(handler) && handler(nextAppState);
  };

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  return appStateVisible === "unknown" ? "active" : appStateVisible; // if unknown default active
}