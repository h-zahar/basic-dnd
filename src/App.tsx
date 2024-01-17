import { useState } from "react";

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  let startPosition = { x: 0, y: 0 };
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    startPosition = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

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
    const maxX = parentRect?.width && parentRect.width - 100;
    const maxY = parentRect?.height && parentRect.width - 100;

    const boundedX = Math.min(Math.max(newX, 0), maxX ? maxX : 0);
    const boundedY = Math.min(Math.max(newY, 0), maxY ? maxY : 0);

    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <div
        id="container"
        style={{
          width: "400px",
          height: "400px",
          position: "relative",
          border: "1px solid #ccc",
        }}
      >
        <div
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
        ></div>
      </div>
    </div>
  );
};

export default App;
