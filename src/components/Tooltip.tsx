import { CSSProperties } from "react";
import ReactDOM from "react-dom";

const Tooltip = ({
  position,
  content,
  direction,
  containerHeight,
  containerWidth,
}: {
  position: { parentbox: { x: number; y: number }; x: number; y: number };
  content: string;
  direction: string;
  containerHeight: number;
  containerWidth: number;
}) => {
  let topValue = 0;
  let leftValue = 0;

  if (direction === "top") {
    topValue =
      position.y - position?.parentbox?.y <= 50
        ? position.y + 105
        : position.y - 40;
    leftValue = position.x + 35;
  } else if (direction === "left") {
    leftValue =
      position.x - position?.parentbox?.x <= 45
        ? position.x + 105
        : position.x - 45;
    topValue = position.y + 35;
  } else if (direction === "bottom") {
    topValue =
      Math.abs(position.y - position?.parentbox?.y - (containerHeight - 100)) <=
      40
        ? position.y - 45
        : position.y + 105;
    leftValue = position.x + 35;
  } else if (direction === "right") {
    topValue = position.y + 35;
    leftValue =
      Math.abs(position.x - position?.parentbox?.x - (containerWidth - 100)) <=
      45
        ? position.x - 45
        : position.x + 105;
  }

  const tooltipStyle: CSSProperties = {
    position: "fixed",
    top: `${topValue}px`,
    left: `${leftValue}px`,
    border: "1px solid #ccc",
    padding: "5px",
    color: "#000",
    background: "#fff",
    zIndex: 1000,
  };

  return ReactDOM.createPortal(
    <div style={tooltipStyle}>{content}</div>,
    document.body
  );
};

export default Tooltip;
