import React, { useState, useRef, useEffect } from "react";

interface MinutesDropdownProps {
    value: number;
    onChange: (value: number) => void;
}

const MinutesDropdown: React.FC<MinutesDropdownProps> = ({
    value,
    onChange,
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    return (
        <div ref={ref} className="relative w-full sm:w-40">
            <div
                onClick={() => setOpen(!open)}
                className="flex items-stretch border rounded-xl h-10 cursor-pointer overflow-hidden bg-white select-none">

                <div className="flex items-center justify-center px-3 pointer-events-none">
                    <img src="/images/Icon.svg" alt="clock" className="w-4 h-4" />
                </div>

                <div className="flex-1 flex items-center px-3 text-sm pointer-events-none">
                    {String(value).padStart(2, "0")}
                </div>

                <div className="flex items-center px-3 border-l text-sm text-gray-500 pointer-events-none">
                    Min
                </div>
            </div>


            {open && (
                <div className="absolute z-50 mt-0.5 w-full max-h-52 overflow-y-auto border rounded-xl bg-white shadow-md">
                    {Array.from({ length: 61 }, (_, i) => (
                        <div key={i}
                            className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer"
                            onClick={() => {
                                onChange(i);
                                setOpen(false);
                            }}>
                            {String(i).padStart(2, "0")}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MinutesDropdown;