const Dragbox = ({
  handleMouseDown,
  handleMouseOver,
  handleMouseOut,
  position,
}: {
  handleMouseDown: (event: React.MouseEvent) => void;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
  position: { x: number; y: number };
}) => {
  return (
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
  );
};

export default Dragbox;
