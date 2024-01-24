import throttle from "../utils/throttle";

interface HookProps {
  position: { x: number; y: number };
  containerHeight: number;
  containerWidth: number;
  containerPosition: { x: number; y: number };
  setPosition: (position: { x: number; y: number }) => void;
  setContainerPosition: (containerPosition: { x: number; y: number }) => void;
  setContainerWidth: (width: number) => void;
  setContainerHeight: (height: number) => void;
}

const useResize = ({
  position,
  containerHeight,
  containerWidth,
  containerPosition,
  setPosition,
  setContainerPosition,
  setContainerWidth,
  setContainerHeight,
}: HookProps) => {
  let startPosition = { x: 0, y: 0 };
  let handlerString = "";
  let xHigh = 0;
  let yHigh = 0;
  let initialHeight = 300;
  let initialWidth = 300;

  const handleResizeMove = (e: MouseEvent) => {
    const newX = e.clientX - containerPosition.x;
    const newY = e.clientY - containerPosition.y;

    if (handlerString === "bottom") {
      yHigh =
        yHigh <= 0
          ? 0
          : Math.min(
              yHigh,
              initialHeight - (startPosition.y - e.clientY) - 100
            );

      setPosition({ x: position.x, y: yHigh <= 0 ? 0 : yHigh });

      setContainerHeight(
        Math.max(100, containerHeight + (e.clientY - startPosition.y))
      );
    } else if (handlerString === "top") {
      yHigh =
        e.clientY - startPosition.y >= initialHeight - 100
          ? initialHeight - 100 || 0
          : Math.max(yHigh, e.clientY - startPosition.y);

      if (e.clientY - startPosition.y <= newY)
        setPosition({
          y:
            e.clientY - startPosition.y >= yHigh
              ? 0
              : yHigh - (e.clientY - startPosition.y),
          x: position.x,
        });

      setContainerPosition({
        x: containerPosition.x,
        y: Math.min(
          startPosition.y + containerHeight - 100,
          containerPosition.y + (e.clientY - startPosition.y)
        ),
      });

      setContainerHeight(
        Math.max(100, containerHeight - (e.clientY - startPosition.y))
      );
    } else if (handlerString === "left") {
      xHigh =
        e.clientX - startPosition.x >= initialWidth - 100
          ? initialWidth - 100 || 0
          : Math.max(xHigh, e.clientX - startPosition.x);

      if (e.clientX - startPosition.x <= newX)
        setPosition({
          x:
            e.clientX - startPosition.x >= xHigh
              ? 0
              : xHigh - (e.clientX - startPosition.x),
          y: position.y,
        });

      setContainerPosition({
        x: Math.min(
          startPosition.x + containerWidth - 100 - 2,
          containerPosition.x + (e.clientX - startPosition.x) - 2
        ),
        y: containerPosition.y,
      });

      setContainerWidth(
        Math.max(100, containerWidth - (e.clientX - startPosition.x))
      );
    } else if (handlerString === "right") {
      xHigh =
        xHigh <= 0
          ? 0
          : Math.min(xHigh, initialWidth - (startPosition.x - e.clientX) - 100);

      setPosition({ x: xHigh <= 0 ? 0 : xHigh, y: position.y });

      setContainerWidth(
        Math.max(100, containerWidth + (e.clientX - startPosition.x))
      );
    } else if (handlerString === "bottom-right") {
      yHigh =
        yHigh <= 0
          ? 0
          : Math.min(
              yHigh,
              initialHeight - (startPosition.y - e.clientY) - 100
            );

      xHigh =
        xHigh <= 0
          ? 0
          : Math.min(xHigh, initialWidth - (startPosition.x - e.clientX) - 100);

      setPosition({ x: xHigh <= 0 ? 0 : xHigh, y: yHigh <= 0 ? 0 : yHigh });

      setContainerWidth(
        Math.max(100, containerWidth + (e.clientX - startPosition.x))
      );
      setContainerHeight(
        Math.max(100, containerHeight + (e.clientY - startPosition.y))
      );
    } else if (handlerString === "top-right") {
      yHigh =
        e.clientY - startPosition.y >= initialHeight - 100
          ? initialHeight - 100 || 0
          : Math.max(yHigh, e.clientY - startPosition.y);

      xHigh =
        xHigh <= 0
          ? 0
          : Math.min(xHigh, initialWidth - (startPosition.x - e.clientX) - 100);

      if (e.clientY - startPosition.y <= newY)
        setPosition({
          y:
            e.clientY - startPosition.y >= yHigh
              ? 0
              : yHigh - (e.clientY - startPosition.y),
          x: xHigh <= 0 ? 0 : xHigh,
        });

      setContainerPosition({
        x: containerPosition.x,
        y: Math.min(
          startPosition.y + containerHeight - 100,
          containerPosition.y + (e.clientY - startPosition.y)
        ),
      });

      setContainerHeight(
        Math.max(100, containerHeight - (e.clientY - startPosition.y))
      );

      setContainerWidth(
        Math.max(100, containerWidth + (e.clientX - startPosition.x))
      );
    } else if (handlerString === "bottom-left") {
      yHigh =
        yHigh <= 0
          ? 0
          : Math.min(
              yHigh,
              initialHeight - (startPosition.y - e.clientY) - 100
            );

      xHigh =
        e.clientX - startPosition.x >= initialWidth - 100
          ? initialWidth - 100 || 0
          : Math.max(xHigh, e.clientX - startPosition.x);

      if (e.clientX - startPosition.x <= newX)
        setPosition({
          x:
            e.clientX - startPosition.x >= xHigh
              ? 0
              : xHigh - (e.clientX - startPosition.x),
          y: yHigh <= 0 ? 0 : yHigh,
        });

      setContainerPosition({
        x: Math.min(
          startPosition.x + containerWidth - 100,
          containerPosition.x + (e.clientX - startPosition.x)
        ),
        y: containerPosition.y,
      });

      setContainerHeight(
        Math.max(100, containerHeight + (e.clientY - startPosition.y))
      );

      setContainerWidth(
        Math.max(100, containerWidth - (e.clientX - startPosition.x))
      );
    } else if (handlerString === "top-left") {
      yHigh =
        e.clientY - startPosition.y >= initialHeight - 100
          ? initialHeight - 100 || 0
          : Math.max(yHigh, e.clientY - startPosition.y);

      xHigh =
        e.clientX - startPosition.x >= initialWidth - 100
          ? initialWidth - 100 || 0
          : Math.max(xHigh, e.clientX - startPosition.x);

      if (e.clientX - startPosition.x <= newX)
        setPosition({
          x:
            e.clientX - startPosition.x >= xHigh
              ? 0
              : xHigh - (e.clientX - startPosition.x),
          y:
            e.clientY - startPosition.y >= yHigh
              ? 0
              : yHigh - (e.clientY - startPosition.y),
        });

      setContainerPosition({
        x: Math.min(
          startPosition.x + containerWidth - 100,
          containerPosition.x + (e.clientX - startPosition.x)
        ),
        y: Math.min(
          startPosition.y + containerHeight - 100,
          containerPosition.y + (e.clientY - startPosition.y)
        ),
      });

      setContainerHeight(
        Math.max(100, containerHeight - (e.clientY - startPosition.y))
      );

      setContainerWidth(
        Math.max(100, containerWidth - (e.clientX - startPosition.x))
      );
    }
  };

  const handleResizeUp = () => {
    document.removeEventListener("mousemove", throttledHandleResizeMove);
    document.removeEventListener("mouseup", handleResizeUp);
  };

  const onResizeMouseDown = (e: React.MouseEvent, handler: string) => {
    e.preventDefault();
    e.stopPropagation();
    handlerString = handler;

    startPosition = {
      x: handlerString.includes("left")
        ? containerPosition.x
        : containerPosition.x + containerWidth,
      y: handlerString.includes("top")
        ? containerPosition.y
        : containerPosition.y + containerHeight,
    };
    xHigh = position.x;
    yHigh = position.y;

    const parentRect = document
      .getElementById("container")
      ?.getBoundingClientRect();

    initialHeight = (parentRect?.height || 0) - 2;
    initialWidth = (parentRect?.width || 0) - 2;
    // const throttledHandleResizeMove = handleResizeMove;

    document.addEventListener("mousemove", throttledHandleResizeMove);
    document.addEventListener("mouseup", handleResizeUp);
  };

  const throttledHandleResizeMove = throttle(handleResizeMove, 15);

  return {
    onResizeMouseDown,
  };
};

export default useResize;
