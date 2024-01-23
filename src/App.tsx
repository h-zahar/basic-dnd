import { useState } from "react";
import Tooltip from "./components/Tooltip";
import useResize from "./hooks/useResize";
import ResizeHandler from "./components/ResizeHandler";
import ContainerHandler from "./components/ContainerHandler";
import TooltipDirection from "./components/TooltipDirection";

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [absolutePosition, setAbsolutePosition] = useState({
    parentbox: { x: 0, y: 0 },
    x: 0,
    y: 0,
  });
  const [containerPosition, setContainerPosition] = useState({
    x: 610,
    y: 150,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState("top");
  // const [deltaHeight, setDeltaHeight] = useState(0);

  const [containerHeight, setContainerHeight] = useState(400);
  const [containerWidth, setContainerWidth] = useState(400);

  const { onResizeMouseDown } = useResize({
    position,
    setPosition,
    containerHeight,
    containerWidth,
    setContainerHeight,
    setContainerWidth,
    setContainerPosition,
    containerPosition,
  });

  const handleMouseOver = () => {
    const parentRect = document
      .getElementById("container")
      ?.getBoundingClientRect();
    const dragboxRect = document
      .getElementById("dragbox")
      ?.getBoundingClientRect();
    setAbsolutePosition({
      parentbox: { x: parentRect?.x || 0, y: parentRect?.y || 0 },
      y: dragboxRect?.y || 0,
      x: dragboxRect?.x || 0,
    });
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  let startPosition = { x: 0, y: 0 };
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    startPosition = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    setIsDragging(true);

    const parentRect = document
      .getElementById("container")
      ?.getBoundingClientRect();
    const dragboxRect = document
      .getElementById("dragbox")
      ?.getBoundingClientRect();
    setAbsolutePosition({
      parentbox: { x: parentRect?.x || 0, y: parentRect?.y || 0 },
      y: dragboxRect?.y || 0,
      x: dragboxRect?.x || 0,
    });

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const newX =
      e.clientX - (startPosition.x === 0 ? e.clientX : startPosition.x);
    const newY =
      e.clientY - (startPosition.y === 0 ? e.clientY : startPosition.y);

    const parentRect = document
      .getElementById("container")
      ?.getBoundingClientRect();

    const dragboxRect = document
      .getElementById("dragbox")
      ?.getBoundingClientRect();

    const maxX = parentRect?.width && parentRect.width - 100;
    const maxY = parentRect?.height && parentRect.height - 100;

    const boundedX = Math.min(Math.max(newX, 0), maxX ? maxX : 0);
    const boundedY = Math.min(Math.max(newY, 0), maxY ? maxY : 0);

    setPosition({ x: boundedX, y: boundedY });
    setAbsolutePosition({
      parentbox: { x: parentRect?.x || 0, y: parentRect?.y || 0 },
      y: dragboxRect?.y || 0,
      x: dragboxRect?.x || 0,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const tooltipContent = "Hiii!";

  let startContainerPosition = { x: 610, y: 150 };
  const handleContainerMouseDown = (e: React.MouseEvent) => {
    startContainerPosition = {
      x: e.clientX - containerPosition.x,
      y: e.clientY - containerPosition.y,
    };

    document.addEventListener("mousemove", handleContainerMouseMove);
    document.addEventListener("mouseup", handleContainerMouseUp);
  };

  const handleContainerMouseMove = (e: MouseEvent) => {
    const newX =
      e.clientX -
      (startContainerPosition.x === 0 ? e.clientX : startContainerPosition.x);
    const newY =
      e.clientY -
      (startContainerPosition.y === 0 ? e.clientY : startContainerPosition.y);

    const parentRect = document
      .getElementById("main-container")
      ?.getBoundingClientRect();

    const maxX = parentRect?.width && parentRect.width - containerWidth;
    const maxY = parentRect?.height && parentRect.height - containerHeight;

    const boundedX = Math.min(Math.max(newX, 0), maxX ? maxX : 0);
    const boundedY = Math.min(Math.max(newY, 0), maxY ? maxY : 0);

    setContainerPosition({ x: boundedX, y: boundedY });
  };

  const handleContainerMouseUp = () => {
    document.removeEventListener("mousemove", handleContainerMouseMove);
    document.removeEventListener("mouseup", handleContainerMouseUp);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div
        style={{
          marginBottom: 70,
          marginTop: 60,
          position: "fixed",
          top: 10,
          left: "45%",
        }}
      >
        <TooltipDirection direction={direction} setDirection={setDirection} />
      </div>
      <div
        id="main-container"
        style={{
          alignItems: "center",
          height: "99.5vh",
        }}
      >
        <div
          id="container"
          style={{
            width: `${containerWidth}px`,
            height: `${containerHeight}px`,
            position: "relative",
            top: `${containerPosition.y}px`,
            left: `${containerPosition.x}px`,
            border: "1px solid #ccc",
            overflow: "hidden",
          }}
        >
          <ContainerHandler
            handleContainerMouseDown={handleContainerMouseDown}
          />

          <ResizeHandler
            containerWidth={containerWidth}
            containerHeight={containerHeight}
            onResizeMouseDown={onResizeMouseDown}
          />

          <div
            id="dragbox"
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "lightblue",
              position: "absolute",
              top: `${position.y}px`,
              left: `${position.x}px`,
              cursor: "move",
            }}
            onMouseDown={handleMouseDown}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          ></div>
          {!isDragging && isHovered && (
            <Tooltip
              position={absolutePosition}
              direction={direction}
              content={tooltipContent}
              containerHeight={containerHeight}
              containerWidth={containerWidth}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
