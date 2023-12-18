import { useState } from "react";

const CustomCheckbox = ({ onChange }: { onChange: () => void }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onChange();
    };

    return (
        <div
            className="w-4 h-4 border-2 border-trueIndigo-500 rounded-sm cursor-pointer relative"
            onClick={handleCheckboxChange}
        >
            {isChecked && (
                <svg
                    className="w-4 h-4 text-trueIndigo-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            )}
        </div>
    );
};

export default CustomCheckbox;
