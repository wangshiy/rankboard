import { useEffect, useRef } from "react";

const useAnimationFrame = (callback: Function, running: boolean) => {
  const savedCallback = useRef(callback);
  const requestId = useRef(0);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
      if (running) {
        requestId.current = window.requestAnimationFrame(tick);
      }
    }
    if (running) {
      const animationFrame =
        window.requestAnimationFrame || window.webkitRequestAnimationFrame;
      const cancelAnimationFrame =
        window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
      requestId.current = animationFrame(tick);

      return () => cancelAnimationFrame(requestId.current);
    }
  }, [running]);
};

export default useAnimationFrame;
