import { useCallback, useState } from "react";

function useToggle(): [boolean, () => void] {
  const [state, setState] = useState<boolean>(false);
  const toggle = useCallback(() => setState((state) => !state), []);
  return [state, toggle];
}

export default useToggle;
