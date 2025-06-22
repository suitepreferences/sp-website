import { useState, useRef, useEffect, useCallback } from "react";
import debounce from "../utils/debounce";

function useHeaderScroll(setIsMenuOpen) {
    const lastScrollY = useRef(0);
    const [showHeader, setShowHeader] = useState(true);

    const debouncedHandleScroll = useCallback(() => {
        const debounced = debounce(() => {
            const currentScrollY = window.scrollY;
            const scrollThreshold = 30;

            if (Math.abs(currentScrollY - lastScrollY.current) > scrollThreshold) {
                setShowHeader(currentScrollY < lastScrollY.current);
            }

            lastScrollY.current = currentScrollY;
            setIsMenuOpen(false);
        }, 100);

        return debounced();
    }, [setIsMenuOpen]);

    useEffect(() => {
        window.addEventListener("scroll", debouncedHandleScroll);
        return () => {
            window.removeEventListener("scroll", debouncedHandleScroll);
        };
    }, [debouncedHandleScroll]);

    return showHeader;
}

export default useHeaderScroll;
