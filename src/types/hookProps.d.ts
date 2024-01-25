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

export { HookProps };
