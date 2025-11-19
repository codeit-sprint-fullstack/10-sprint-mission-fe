import { useEffect } from "react";

function useResponsivePage(setPageSize, mode = "all") {
  useEffect(() => {
    const refresh = () => {
      const screenWidth = window.innerWidth;

      if (mode === "best") {
        if (screenWidth >= 1200) {
          setPageSize(4);
        } else if (screenWidth >= 744) {
          setPageSize(2);
        } else {
          setPageSize(1);
        }
      } else {
        if (screenWidth >= 1200) {
          setPageSize(10);
        } else if (screenWidth >= 744) {
          setPageSize(6);
        } else {
          setPageSize(4);
        }
      }
    };
    refresh();
    window.addEventListener("resize", refresh);
    return () => {
      window.removeEventListener("resize", refresh);
    };
  }, [setPageSize, mode]);
}

export default useResponsivePage;
