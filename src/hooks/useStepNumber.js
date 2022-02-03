import { useEffect, useState } from 'react';

export const useStepNumber = () => {
    const [stepNumber, setStepNumber] = useState(0);

    useEffect(() => {
        const stepNumberSaved = localStorage.getItem("stepNumber");
        stepNumberSaved && setStepNumber(JSON.parse(stepNumberSaved));

    }, []);

    return {stepNumber, setStepNumber};
}