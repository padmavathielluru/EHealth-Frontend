import React, { useState, useRef, useEffect } from "react";

interface CustomDropdownProps {
    label?: string;
    options: string[];
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    label,
    options,
    value,
    onChange,
    placeholder = "Select",
}) => {
    const [open, setOpen] = useState(false);
    // const [selected, setSelected] = useState("");
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown",handleClickOutside);
}, []);

return (
    <div ref={ref} className="relative ">
        <label className="block text-sm text-gray-500 mb-2">
            {label}
        </label>

        <div onClick={() => setOpen(!open)}
        tabIndex={0}
        className="flex items-center text-gray-400 justify-between border rounded-lg w-[370px] h-[40px] px-3 py-2 cursor-pointer bg-white text-gray-400 focus-within:ring-1 focus-within:ring-blue-500 hover:border-blue-400 outline-none">
           <span className={value ? "text-gray-700" : "text-gray-400"}>
          {value || placeholder}
        </span>
            <img src="/images/fi_chevron-down.svg"
            alt="dropdown"
            className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : "" }`}/>
        </div>

        {open && (
            <div className="absolute z-10 mt-1 bg-white border rounded-xl shadow-md ">
                {options.map((opt) => (
                    <div key={opt} onClick={() => {
                         onChange(opt); 
                        setOpen(false);
                    }} className="w-[370px] h-[30px] pl-3 items-center text-sm hover:bg-blue-100 cursor-pointer">
                        {opt}
                        </div>
                ))}
                </div>
        )}
    </div>
);
};

export default CustomDropdown;