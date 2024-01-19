import { useState } from "react";
import Tooltip from "./components/Tooltip";

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
  const [deltaHeight, setDeltaHeight] = useState(0);

  const [containerHeight, setContainerHeight] = useState(400);
  const [containerWidth, setContainerWidth] = useState(400);

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
    // console.log(e.clientX);
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
    // const parentRect = document
    //   .getElementById("main-container")
    //   ?.getBoundingClientRect();
    // const dragboxRect = document
    //   .getElementById("container")
    //   ?.getBoundingClientRect();
    // setContainerPosition({
    //   y: dragboxRect?.y || 0,
    //   x: dragboxRect?.x || 0,
    // });
    // console.log(e.clientX, e.clientY);

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

    // const dragboxRect = document
    //   .getElementById("container")
    //   ?.getBoundingClientRect();

    const maxX = parentRect?.width && parentRect.width - containerWidth;
    const maxY = parentRect?.height && parentRect.height - containerHeight;
    // console.log(maxX, maxY);

    const boundedX = Math.min(Math.max(newX, 0), maxX ? maxX : 0);
    const boundedY = Math.min(Math.max(newY, 0), maxY ? maxY : 0);

    setContainerPosition({ x: boundedX, y: boundedY });
    // setAbsolutePosition({
    //   parentbox: { x: parentRect?.x || 0, y: parentRect?.y || 0 },
    //   y: dragboxRect?.y || 0,
    //   x: dragboxRect?.x || 0,
    // });
    // console.log(e.clientX, e.clientY);
  };

  const handleContainerMouseUp = () => {
    document.removeEventListener("mousemove", handleContainerMouseMove);
    document.removeEventListener("mouseup", handleContainerMouseUp);
  };
  // console.log(containerPosition);

  let bottomStartPosition = { x: 0, y: 0 };
  const handleResizeBottomMouseDown = (e: React.MouseEvent) => {
    bottomStartPosition = { x: e.clientX, y: e.clientY };

    document.addEventListener("mousemove", handleResizeBottomMove);
    document.addEventListener("mouseup", handleResizeBottomUp);
  };

  const handleResizeBottomMove = (e: MouseEvent) => {
    // const newX =
    // e.clientX - (startPosition.x === 0 ? e.clientX : startPosition.x);
    const newY = e.clientY - (position.y === 0 ? e.clientY : position.y);

    const parentRect = document
      .getElementById("container")
      ?.getBoundingClientRect();

    const dragboxRect = document
      .getElementById("dragbox")
      ?.getBoundingClientRect();

    // const maxX = parentRect?.width && parentRect.width - 100;
    const maxY = parentRect?.height && parentRect.height - 100;

    // const boundedX = Math.min(Math.max(newX, 0), maxX ? maxX : 0);
    const boundedY = Math.min(Math.max(newY, 0), maxY ? maxY : 0);

    if (maxY! <= position.y) setPosition({ x: position.x, y: boundedY });
    setContainerHeight(
      Math.max(100, containerHeight + (e.clientY - bottomStartPosition.y))
    );
  };

  const handleResizeBottomUp = () => {
    document.removeEventListener("mousemove", handleResizeBottomMove);
    document.removeEventListener("mouseup", handleResizeBottomUp);
  };

  let rightStartPosition = { x: 0, y: 0 };
  const handleRightMouseDown = (e: React.MouseEvent) => {
    rightStartPosition = { x: e.clientX, y: e.clientY };

    document.addEventListener("mousemove", handleRightMove);
    document.addEventListener("mouseup", handleRightUp);
  };

  const handleRightMove = (e: MouseEvent) => {
    const newX = e.clientX - (position.x === 0 ? e.clientX : position.x);
    // const newY = e.clientY - (position.y === 0 ? e.clientY : position.y);

    const parentRect = document
      .getElementById("container")
      ?.getBoundingClientRect();

    const dragboxRect = document
      .getElementById("dragbox")
      ?.getBoundingClientRect();

    const maxX = parentRect?.width && parentRect.width - 100;
    // const maxY = parentRect?.height && parentRect.height - 100;

    const boundedX = Math.min(Math.max(newX, 0), maxX ? maxX : 0);
    // const boundedY = Math.min(Math.max(newY, 0), maxY ? maxY : 0);

    if (maxX! <= position.x) setPosition({ x: boundedX, y: position.y });
    setContainerWidth(
      Math.max(100, containerWidth + (e.clientX - rightStartPosition.x))
    );
  };

  const handleRightUp = () => {
    document.removeEventListener("mousemove", handleRightMove);
    document.removeEventListener("mouseup", handleRightUp);
  };

  let brStartPosition = { x: 0, y: 0 };
  const handleBottomRightDown = (e: React.MouseEvent) => {
    brStartPosition = { x: e.clientX, y: e.clientY };

    document.addEventListener("mousemove", handleBottomRightMove);
    document.addEventListener("mouseup", handleBottomRightUp);
  };

  const handleBottomRightMove = (e: MouseEvent) => {
    const newX = e.clientX - (position.x === 0 ? e.clientX : position.x);
    const newY = e.clientY - (position.y === 0 ? e.clientY : position.y);

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

    if (maxX! <= position.x)
      maxY! <= position.y
        ? setPosition({ x: boundedX, y: boundedY })
        : setPosition({ x: boundedX, y: position.y });
    else if (maxY! <= position.y)
      maxX! <= position.x
        ? setPosition({ x: boundedX, y: boundedY })
        : setPosition({ x: position.x, y: boundedY });

    setContainerWidth(
      Math.max(100, containerWidth + (e.clientX - brStartPosition.x))
    );
    setContainerHeight(
      Math.max(100, containerHeight + (e.clientY - brStartPosition.y))
    );
  };

  const handleBottomRightUp = () => {
    document.removeEventListener("mousemove", handleBottomRightMove);
    document.removeEventListener("mouseup", handleBottomRightUp);
  };

  // console.log(containerWidth);

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
        <label style={{ marginRight: "10px" }}>Direction: </label>
        <select
          value={direction}
          onChange={(e) => {
            setDirection(e.target.value);
          }}
        >
          <option value={""} disabled>
            Direction
          </option>
          <option value={"top"}>Top</option>
          <option value={"left"}>Left</option>
          <option value={"right"}>Right</option>
          <option value={"bottom"}>Bottom</option>
        </select>
      </div>
      <div
        id="main-container"
        style={{
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          // border: "1px solid blue",
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
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "calc(100% - 31px)",
              width: 30,
              height: 30,
              border: "1px solid black",
              textAlign: "center",
              cursor: "grab",
            }}
            onMouseDown={handleContainerMouseDown}
          >
            #
          </div>

          <div
            id="resize-bottom"
            style={{
              width: `${containerWidth}px`,
              height: 5,
              cursor: "ns-resize",
              position: "absolute",
              top: "100%",
              left: 0,
            }}
            onMouseDown={handleResizeBottomMouseDown}
          ></div>
          <div
            id="resize-top"
            style={{
              width: `${containerWidth}px`,
              height: 5,
              cursor: "ns-resize",
              position: "absolute",
              top: -2,
              left: 0,
            }}
          ></div>
          <div
            id="resize-left"
            style={{
              height: `${containerHeight}px`,
              width: 5,
              cursor: "ew-resize",
              position: "absolute",
              left: -1,
              top: 0,
            }}
          ></div>
          <div
            id="resize-right"
            style={{
              height: `${containerHeight}px`,
              width: 5,
              cursor: "ew-resize",
              position: "absolute",
              top: 0,
              left: "100%",
            }}
            onMouseDown={handleRightMouseDown}
          ></div>

          <div
            id="resize-tl"
            style={{
              width: 5,
              height: 5,
              cursor: "nwse-resize",
              position: "absolute",
              top: -5,
              left: -5,
            }}
          ></div>
          <div
            id="resize-tr"
            style={{
              width: 5,
              height: 5,
              cursor: "nesw-resize",
              position: "absolute",
              top: -5,
              left: "100.5%",
            }}
          ></div>
          <div
            id="resize-bl"
            style={{
              width: 5,
              height: 5,
              cursor: "nesw-resize",
              position: "absolute",
              top: "100.5%",
              left: -5,
            }}
          ></div>
          <div
            id="resize-br"
            style={{
              width: 5,
              height: 5,
              cursor: "nwse-resize",
              position: "absolute",
              top: "100.5%",
              left: "100.5%",
            }}
            onMouseDown={handleBottomRightDown}
          ></div>
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
