import { useEffect, useState } from "react";

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        const handleMatch = (event) => {
            setMatches(event.matches);
        };

        mediaQuery.addEventListener("change", handleMatch);

        // Initial check
        setMatches(mediaQuery.matches);

        return () => {
            mediaQuery.removeEventListener("change", handleMatch);
        };
    }, [query]);

    return matches;
};

export default useMediaQuery;