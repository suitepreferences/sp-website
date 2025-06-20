import { useState, useEffect } from "react";

export const useCountdown = (targetDateString) => {
    const targetDate = new Date(targetDateString).getTime();

    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference < 0) {
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });
        };

        calculateTimeRemaining(); // Set initial state
        const intervalId = setInterval(calculateTimeRemaining, 1000);

        return () => clearInterval(intervalId);
    }, [targetDate]);

    return countdown;
};
