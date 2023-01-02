import { RefObject, useEffect } from "react";

function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: () => void
): void {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref && ref?.current && !ref?.current.contains(event.target as Node)) {
        handler();
      }
      console.log(ref.current);
      return;
    };
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref.current]);
}
export default useOutsideClick;
