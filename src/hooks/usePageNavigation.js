import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing page navigation and scroll behavior.
 * Handles both full page changes and anchor link scrolling within the 'home' page.
 */
export const usePageNavigation = () => {
    const [currentPage, setCurrentPage] = useState("home");
    const [pendingScrollId, setPendingScrollId] = useState(null);

    /**
     * Centralized navigation handler.
     * If target starts with '#', it's an anchor link; otherwise, it's a full page change.
     * @param {string} target - The page name or anchor ID (e.g., "home", "privacy", "#pricing").
     */
    const handleNavigation = useCallback((target) => {
        if (target.startsWith("#")) {
            const id = target.substring(1);
            // If not on the home page, navigate to home first, then scroll.
            if (currentPage !== "home") {
                setCurrentPage("home");
                setPendingScrollId(id); // Store ID to scroll to once home page is rendered
            } else {
                // Already on home page, just scroll directly
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
                setPendingScrollId(null); // Clear any old pending scroll
            }
        } else {
            // This is a full page change
            setCurrentPage(target);
            window.scrollTo(0, 0); // Always scroll to top when changing full pages
            setPendingScrollId(null); // Clear pending scroll on full page change
        }
    }, [currentPage]); // Re-create if currentPage changes

    // Effect to handle pending scrolls once the target page ('home') is rendered
    useEffect(() => {
        if (pendingScrollId && currentPage === "home") {
            const element = document.getElementById(pendingScrollId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
                setPendingScrollId(null); // Clear the pending scroll after execution
            }
        }
    }, [currentPage, pendingScrollId]); // Re-run when page changes or scroll ID is set

    return { currentPage, handleNavigation };
};
