import { useState, useEffect } from "react";

export default function useDebounce(value, delay = 500)
{
    const [debounce, setdebounce] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setdebounce(value), delay)

        return () => clearTimeout(timer)
    },[value, delay])

    return debounce
}