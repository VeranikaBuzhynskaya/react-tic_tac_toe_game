import { useEffect, useState } from 'react';

export const useHistory = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null)}]);

    useEffect(() => {
        const historySaved = localStorage.getItem("history");
        historySaved && setHistory(JSON.parse(historySaved));

    }, []);

    return {history, setHistory};
}