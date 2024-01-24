const throttle = (cb: (args: MouseEvent) => void, delay: number) => {
  let wait = false;
  let storedArgs: MouseEvent | null = null;

  const checkStoredArgs = () => {
    if (storedArgs === null) {
      wait = false;
    } else {
      cb(storedArgs);
      storedArgs = null;
      setTimeout(checkStoredArgs, delay);
    }
  };

  return (args: MouseEvent) => {
    if (wait) {
      storedArgs = args;
      return;
    }

    cb(args);
    wait = true;
    setTimeout(checkStoredArgs, delay);
  };
};

export default throttle;
