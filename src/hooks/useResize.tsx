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
    // const newX =
    // e.clientX - (startPosition.x === 0 ? e.clientX : startPosition.x);

    const newX =
      e.clientX - (position.x === 0 ? e.clientX : containerPosition.x);
    const newY =
      e.clientY - (position.y === 0 ? e.clientY : containerPosition.y);

    const parentRect = document
      .getElementById("container")
      ?.getBoundingClientRect();

    // const dragboxRect = document
    //   .getElementById("dragbox")
    //   ?.getBoundingClientRect();

    // const maxX = parentRect?.width && parentRect.width - 100;
    const maxX = parentRect?.width && parentRect.width - 100;
    const maxY = parentRect?.height && parentRect.height - 100;

    // const boundedX = Math.min(Math.max(newX, 0), maxX ? maxX : 0);
    const boundedX = Math.min(Math.max(newX, 0), maxX ? maxX : 0);
    const boundedY = Math.min(Math.max(newY, 0), maxY ? maxY : 0);

    if (handlerString === "bottom") {
      if (maxY! <= position.y) setPosition({ x: position.x, y: boundedY });
      setContainerHeight(
        Math.max(100, containerHeight + (e.clientY - startPosition.y))
      );
    } else if (handlerString === "top") {
      // const boundedX = Math.min(Math.max(newX, 0), maxX ? maxX : 0);
      // const boundedY = maxY ? maxY : 0;
      // console.log(maxY);
      yHigh =
        e.clientY - startPosition.y >= initialHeight - 100
          ? initialHeight - 100 || 0
          : Math.max(yHigh, e.clientY - startPosition.y);

      // console.log(yHigh, e.clientY - startPosition.y);

      if (e.clientY - startPosition.y <= newY)
        setPosition({
          y:
            e.clientY - startPosition.y >= yHigh
              ? 0
              : yHigh - (e.clientY - startPosition.y),
          // : 0,
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
      // const boundedX = maxX ? maxX : 0;
      // console.log(xHigh);
      xHigh =
        e.clientX - startPosition.x >= initialWidth - 100
          ? initialWidth - 100 || 0
          : Math.max(xHigh, e.clientX - startPosition.x);

      // console.log(yHigh, e.clientY - startPosition.y);

      if (e.clientX - startPosition.x <= newX)
        setPosition({
          x:
            e.clientX - startPosition.x >= xHigh
              ? 0
              : xHigh - (e.clientX - startPosition.x),
          // : 0,
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
      // const boundedY = Math.min(Math.max(newY, 0), maxY ? maxY : 0);

      if (maxX! <= position.x) setPosition({ x: boundedX, y: position.y });
      setContainerWidth(
        Math.max(100, containerWidth + (e.clientX - startPosition.x))
      );
    } else if (handlerString === "bottom-right") {
      if (maxX! <= position.x)
        maxY! <= position.y
          ? setPosition({ x: boundedX, y: boundedY })
          : setPosition({ x: boundedX, y: position.y });
      else if (maxY! <= position.y)
        maxX! <= position.x
          ? setPosition({ x: boundedX, y: boundedY })
          : setPosition({ x: position.x, y: boundedY });

      setContainerWidth(
        Math.max(100, containerWidth + (e.clientX - startPosition.x))
      );
      setContainerHeight(
        Math.max(100, containerHeight + (e.clientY - startPosition.y))
      );
    } else if (handlerString === "top-right") {
      const boundedY = maxY ? maxY : 0;
      //   const boundedX = maxX ? maxX : 0;

      if (maxY! <= position.y)
        maxX! <= position.x
          ? setPosition({ x: boundedX, y: boundedY })
          : setPosition({ x: position.x, y: boundedY });
      else if (maxX! <= position.x)
        maxY! <= position.y
          ? setPosition({ x: boundedX, y: boundedY })
          : setPosition({ x: boundedX, y: position.y });

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
      const boundedX = maxX ? maxX : 0;
      if (maxY! <= position.y)
        maxX! <= position.x
          ? setPosition({ x: boundedX, y: boundedY })
          : setPosition({ x: position.x, y: boundedY });
      else if (maxX! <= position.x)
        maxY! <= position.y
          ? setPosition({ x: boundedX, y: boundedY })
          : setPosition({ x: boundedX, y: position.y });

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
      const boundedY = maxY ? maxY : 0;
      const boundedX = maxX ? maxX : 0;

      if (maxY! <= position.y)
        maxX! <= position.x
          ? setPosition({ x: boundedX, y: boundedY })
          : setPosition({ x: position.x, y: boundedY });
      else if (maxX! <= position.x)
        maxY! <= position.y
          ? setPosition({ x: boundedX, y: boundedY })
          : setPosition({ x: boundedX, y: position.y });

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
    document.removeEventListener("mousemove", handleResizeMove);
    document.removeEventListener("mouseup", handleResizeUp);
  };

  const onResizeMouseDown = (e: React.MouseEvent, handler: string) => {
    e.preventDefault();
    e.stopPropagation();
    handlerString = handler;

    startPosition = { x: e.clientX, y: e.clientY };
    xHigh = position.x;
    yHigh = position.y;

    const parentRect = document
      .getElementById("container")
      ?.getBoundingClientRect();

    initialHeight = (parentRect?.height || 0) - 2;
    initialWidth = (parentRect?.width || 0) - 2;

    document.addEventListener("mousemove", handleResizeMove);
    document.addEventListener("mouseup", handleResizeUp);
  };

  return {
    onResizeMouseDown,
  };
};

export default useResize;
