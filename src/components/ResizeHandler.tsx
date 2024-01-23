import React from "react";

const ResizeHandler = ({
  containerWidth,
  containerHeight,
  onResizeMouseDown,
}: {
  containerWidth: number;
  containerHeight: number;
  onResizeMouseDown: (e: React.MouseEvent, handler: string) => void;
}) => {
  return (
    <>
      <div
        id="resize-bottom"
        style={{
          width: `${containerWidth}px`,
          height: 5,
          cursor: "ns-resize",
          position: "absolute",
          top: "99.2%",
          left: 0,
          zIndex: 1000,
        }}
        onMouseDown={(e) => onResizeMouseDown(e, "bottom")}
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
          zIndex: 1000,
        }}
        onMouseDown={(e) => onResizeMouseDown(e, "top")}
      ></div>
      <div
        id="resize-left"
        style={{
          height: `${containerHeight}px`,
          width: 5,
          cursor: "ew-resize",
          position: "absolute",
          left: -1,
          top: -2.5,
          zIndex: 1000,
        }}
        onMouseDown={(e) => onResizeMouseDown(e, "left")}
      ></div>
      <div
        id="resize-right"
        style={{
          height: `${containerHeight}px`,
          width: 5,
          cursor: "ew-resize",
          position: "absolute",
          top: 0,
          left: "99.5%",
          zIndex: 1000,
        }}
        onMouseDown={(e) => onResizeMouseDown(e, "right")}
      ></div>

      <div
        id="resize-tl"
        style={{
          width: 5,
          height: 5,
          cursor: "nwse-resize",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1200,
        }}
        onMouseDown={(e) => onResizeMouseDown(e, "top-left")}
      ></div>
      <div
        id="resize-tr"
        style={{
          width: 5,
          height: 5,
          cursor: "nesw-resize",
          position: "absolute",
          top: 0,
          left: "99.5%",
          zIndex: 1200,
        }}
        onMouseDown={(e) => onResizeMouseDown(e, "top-right")}
      ></div>
      <div
        id="resize-bl"
        style={{
          width: 5,
          height: 5,
          cursor: "nesw-resize",
          position: "absolute",
          top: "99.5%",
          left: -1,
          zIndex: 1200,
        }}
        onMouseDown={(e) => onResizeMouseDown(e, "bottom-left")}
      ></div>
      <div
        id="resize-br"
        style={{
          width: 5,
          height: 5,
          cursor: "nwse-resize",
          position: "absolute",
          top: "99.5%",
          left: "99.5%",
          zIndex: 1200,
        }}
        onMouseDown={(e) => onResizeMouseDown(e, "bottom-right")}
      ></div>
    </>
  );
};

export default ResizeHandler;
