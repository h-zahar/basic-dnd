import throttle from "../utils/throttle";
import { HookProps } from "../types/hookProps";

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
  let initialPaddingX = 0;
  let initialPaddingY = 0;

  let cursor = "auto";

  const handleResizeMove = (e: MouseEvent) => {
    document.body.style.cursor = cursor;

    const newX = e.clientX - containerPosition.x;
    const newY = e.clientY - containerPosition.y;

    if (handlerString === "bottom") {
      yHigh =
        yHigh <= 0
          ? 0
          : Math.min(
              yHigh,
              initialHeight -
                (startPosition.y - e.clientY + initialPaddingY) -
                100
            );

      setPosition({ x: position.x, y: yHigh <= 0 ? 0 : yHigh });

      setContainerHeight(
        Math.max(
          100,
          containerHeight + (e.clientY - startPosition.y - initialPaddingY)
        )
      );
    } else if (handlerString === "top") {
      yHigh =
        e.clientY - startPosition.y - initialPaddingY >= initialHeight - 100
          ? initialHeight - 100 || 0
          : Math.max(yHigh, e.clientY - startPosition.y - initialPaddingY);

      if (e.clientY - startPosition.y - initialPaddingY <= newY)
        setPosition({
          y:
            e.clientY - startPosition.y - initialPaddingY >= yHigh
              ? 0
              : yHigh - (e.clientY - startPosition.y - initialPaddingY),
          x: position.x,
        });

      setContainerPosition({
        x: containerPosition.x,
        y: Math.min(
          startPosition.y + containerHeight - 100,
          containerPosition.y + (e.clientY - startPosition.y - initialPaddingY)
        ),
      });

      setContainerHeight(
        Math.max(
          100,
          containerHeight - (e.clientY - startPosition.y - initialPaddingY)
        )
      );
    } else if (handlerString === "left") {
      xHigh =
        e.clientX - startPosition.x - initialPaddingX >= initialWidth - 100
          ? initialWidth - 100 || 0
          : Math.max(xHigh, e.clientX - startPosition.x - initialPaddingX);

      if (e.clientX - startPosition.x - initialPaddingX <= newX)
        setPosition({
          x:
            e.clientX - startPosition.x - initialPaddingX >= xHigh
              ? 0
              : xHigh - (e.clientX - startPosition.x - initialPaddingX),
          y: position.y,
        });

      setContainerPosition({
        x: Math.min(
          startPosition.x + containerWidth - 100,
          containerPosition.x + (e.clientX - startPosition.x - initialPaddingX)
        ),
        y: containerPosition.y,
      });

      setContainerWidth(
        Math.max(
          100,
          containerWidth - (e.clientX - startPosition.x - initialPaddingX)
        )
      );
    } else if (handlerString === "right") {
      xHigh =
        xHigh <= 0
          ? 0
          : Math.min(
              xHigh,
              initialWidth -
                (startPosition.x - e.clientX + initialPaddingX) -
                100
            );

      setPosition({ x: xHigh <= 0 ? 0 : xHigh, y: position.y });

      setContainerWidth(
        Math.max(
          100,
          containerWidth + (e.clientX - startPosition.x - initialPaddingX)
        )
      );
    } else if (handlerString === "bottom-right") {
      yHigh =
        yHigh <= 0
          ? 0
          : Math.min(
              yHigh,
              initialHeight -
                (startPosition.y - e.clientY + initialPaddingY) -
                100
            );

      xHigh =
        xHigh <= 0
          ? 0
          : Math.min(
              xHigh,
              initialWidth -
                (startPosition.x - e.clientX + initialPaddingX) -
                100
            );

      setPosition({ x: xHigh <= 0 ? 0 : xHigh, y: yHigh <= 0 ? 0 : yHigh });

      setContainerWidth(
        Math.max(
          100,
          containerWidth + (e.clientX - startPosition.x - initialPaddingX)
        )
      );
      setContainerHeight(
        Math.max(
          100,
          containerHeight + (e.clientY - startPosition.y - initialPaddingY)
        )
      );
    } else if (handlerString === "top-right") {
      yHigh =
        e.clientY - startPosition.y - initialPaddingY >= initialHeight - 100
          ? initialHeight - 100 || 0
          : Math.max(yHigh, e.clientY - startPosition.y - initialPaddingY);

      xHigh =
        xHigh <= 0
          ? 0
          : Math.min(
              xHigh,
              initialWidth -
                (startPosition.x - e.clientX + initialPaddingX) -
                100
            );

      if (e.clientY - startPosition.y - initialPaddingY <= newY)
        setPosition({
          y:
            e.clientY - startPosition.y - initialPaddingY >= yHigh
              ? 0
              : yHigh - (e.clientY - startPosition.y - initialPaddingY),
          x: xHigh <= 0 ? 0 : xHigh,
        });

      setContainerPosition({
        x: containerPosition.x,
        y: Math.min(
          startPosition.y + containerHeight - 100,
          containerPosition.y + (e.clientY - startPosition.y - initialPaddingY)
        ),
      });

      setContainerHeight(
        Math.max(
          100,
          containerHeight - (e.clientY - startPosition.y - initialPaddingY)
        )
      );

      setContainerWidth(
        Math.max(
          100,
          containerWidth + (e.clientX - startPosition.x - initialPaddingX)
        )
      );
    } else if (handlerString === "bottom-left") {
      yHigh =
        yHigh <= 0
          ? 0
          : Math.min(
              yHigh,
              initialHeight -
                (startPosition.y - e.clientY + initialPaddingY) -
                100
            );

      xHigh =
        e.clientX - startPosition.x - initialPaddingX >= initialWidth - 100
          ? initialWidth - 100 || 0
          : Math.max(xHigh, e.clientX - startPosition.x - initialPaddingX);

      if (e.clientX - startPosition.x - initialPaddingX <= newX)
        setPosition({
          x:
            e.clientX - startPosition.x - initialPaddingX >= xHigh
              ? 0
              : xHigh - (e.clientX - startPosition.x - initialPaddingX),
          y: yHigh <= 0 ? 0 : yHigh,
        });

      setContainerPosition({
        x: Math.min(
          startPosition.x + containerWidth - 100,
          containerPosition.x + (e.clientX - startPosition.x - initialPaddingX)
        ),
        y: containerPosition.y,
      });

      setContainerHeight(
        Math.max(
          100,
          containerHeight + (e.clientY - startPosition.y - initialPaddingY)
        )
      );

      setContainerWidth(
        Math.max(
          100,
          containerWidth - (e.clientX - startPosition.x - initialPaddingX)
        )
      );
    } else if (handlerString === "top-left") {
      yHigh =
        e.clientY - startPosition.y - initialPaddingY >= initialHeight - 100
          ? initialHeight - 100 || 0
          : Math.max(yHigh, e.clientY - startPosition.y - initialPaddingY);

      xHigh =
        e.clientX - startPosition.x - initialPaddingX >= initialWidth - 100
          ? initialWidth - 100 || 0
          : Math.max(xHigh, e.clientX - startPosition.x - initialPaddingX);

      if (e.clientX - startPosition.x - initialPaddingX <= newX)
        setPosition({
          x:
            e.clientX - startPosition.x - initialPaddingX >= xHigh
              ? 0
              : xHigh - (e.clientX - startPosition.x - initialPaddingX),
          y:
            e.clientY - startPosition.y - initialPaddingY >= yHigh
              ? 0
              : yHigh - (e.clientY - startPosition.y - initialPaddingY),
        });

      setContainerPosition({
        x: Math.min(
          startPosition.x + containerWidth - 100,
          containerPosition.x + (e.clientX - startPosition.x - initialPaddingX)
        ),
        y: Math.min(
          startPosition.y + containerHeight - 100,
          containerPosition.y + (e.clientY - startPosition.y - initialPaddingY)
        ),
      });

      setContainerHeight(
        Math.max(
          100,
          containerHeight - (e.clientY - startPosition.y - initialPaddingY)
        )
      );

      setContainerWidth(
        Math.max(
          100,
          containerWidth - (e.clientX - startPosition.x - initialPaddingX)
        )
      );
    }
  };

  const handleResizeUp = () => {
    document.removeEventListener("mousemove", throttledHandleResizeMove);
    document.removeEventListener("mouseup", throttledHandleResizeUp);
    setTimeout(() => (document.body.style.cursor = "auto"), 200);
  };

  const onResizeMouseDown = (e: React.MouseEvent, handler: string) => {
    e.preventDefault();
    e.stopPropagation();

    cursor =
      document.getElementById(e.currentTarget.id!)?.style?.cursor || "auto";

    document.body.style.cursor = cursor;

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
    initialPaddingX = e.clientX - startPosition.x;
    initialPaddingY = e.clientY - startPosition.y;

    const parentRect = document
      .getElementById("container")
      ?.getBoundingClientRect();

    initialHeight = parentRect?.height || 0;
    initialWidth = parentRect?.width || 0;

    document.addEventListener("mousemove", throttledHandleResizeMove);
    document.addEventListener("mouseup", throttledHandleResizeUp);
  };

  const throttledHandleResizeMove = throttle(handleResizeMove, 15);
  const throttledHandleResizeUp = throttle(handleResizeUp, 10);

  return {
    onResizeMouseDown,
  };
};

export default useResize;
