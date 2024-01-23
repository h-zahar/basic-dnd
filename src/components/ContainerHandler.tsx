import { MouseEventHandler } from "react";

const ContainerHandler = ({
  handleContainerMouseDown,
}: {
  handleContainerMouseDown: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "calc(100% - 31px)",
        width: 30,
        height: 30,
        border: "1px solid lightblue",
        textAlign: "center",
        cursor: "grab",
      }}
      onMouseDown={handleContainerMouseDown}
    ></div>
  );
};

export default ContainerHandler;
