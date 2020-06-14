import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const selector = (state) => state.valueContainer.value;
const updateSelector = (state) => state.forcedUpdateCounter;

export const PrimaryComponent = () => {
  const [startTimer, setStartTimer] = useState(false);

  const value = useSelector(selector);
  const updateCount = useSelector(updateSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!startTimer) {
      return;
    }

    dispatch({
      type: "setValue",
      value: "unset",
    });

    let timeout = undefined;
    let tickCount = 0;

    timeout = setInterval(() => {
      if (tickCount > 4) {
        setStartTimer(false);
        clearInterval(timeout);
        timeout = undefined;
      }

      dispatch({
        type: "setValue",
        value: `${tickCount} Ticks`,
      });

      tickCount += 1;
    }, 10);
  }, [startTimer]);

  return (
    <div>
      <div>{value}</div>
      <button onClick={() => setStartTimer(true)}>Click</button>
      <div>{updateCount}</div>
      <button
        onClick={() =>
          dispatch({
            type: "forceUpdate",
          })
        }
      >
        Update
      </button>
    </div>
  );
};
