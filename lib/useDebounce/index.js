import { useState, useEffect } from "react";

/**
 *  Wait till delay in order to update.
 * @param {*} value to be asigned to the state variable returned
 * @param integer delay in millsecs
 * @returns a new state that is updated with delay
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update the debounced value after the delayed timeout
    const timeOutID = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // Delete the scheduled when cleaning the hook up
    return () => clearTimeout(timeOutID);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
