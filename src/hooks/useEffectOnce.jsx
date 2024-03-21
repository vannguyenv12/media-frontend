import { useRef, useEffect } from 'react';
const useEffectOnce = (callback) => {
  const calledOnce = useRef(null);

  useEffect(() => {
    if (!calledOnce.current) {
      callback();
      calledOnce.current = true;
    }
  }, []);
};

export default useEffectOnce;
