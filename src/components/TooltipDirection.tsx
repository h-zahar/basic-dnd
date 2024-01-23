const TooltipDirection = ({
  direction,
  setDirection,
}: {
  direction: string;
  setDirection: (direction: string) => void;
}) => {
  return (
    <>
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
    </>
  );
};

export default TooltipDirection;
