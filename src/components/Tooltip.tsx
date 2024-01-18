import { CSSProperties } from "react";
import ReactDOM from "react-dom";

const Tooltip = ({
  position,
  content,
  direction,
}: {
  position: { parentbox: { x: number; y: number }; x: number; y: number };
  content: string;
  direction: string;
}) => {
  const tooltipStyle: CSSProperties = {
    position: "fixed",
    top: `${
      direction === "top"
        ? position.y - position?.parentbox?.y <= 50
          ? position.y + 105
          : position.y - 40
        : position.y + 35
    }px`,
    left: `${
      direction === "left"
        ? position.x - position?.parentbox?.x <= 45
          ? position.x + 105
          : position.x - 45
        : position.x + 35
    }px`,
    border: "1px solid #ccc",
    padding: "5px",
    backgroundColor: "#fff",
    zIndex: 1000,
  };

  return ReactDOM.createPortal(
    <div style={tooltipStyle}>{content}</div>,
    document.body
  );
};

export default Tooltip;
