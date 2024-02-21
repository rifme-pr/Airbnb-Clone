"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    disabled?: boolean;
    type?: string;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}

const Input = ({
    id, label, disabled, type = "Text", formatPrice, required, register, errors
}) => {
    return (
        <div className="w-full relative">
            {formatPrice && (
                 <BiDollar 
            size={24}
            className="text-neutral-700 absolute top-5 left-2"
            >

            </BiDollar>)}
            <input id={id} disabled={disabled} 
            
             {...register(id, {required}) }
             placeholder=" "
             type = {type}
             className={`peer w-full  p-4 pt-6 font-light
              bg-white border-2 border-pink-400 rounded-md 
               transition 
              disabled:opacity-70 disabled:cursor-not-allowed
              ${formatPrice ? "pl-9" : 'pl-4'}
              ${errors[id] ? "border-red-500" : "border-white"}
              ${errors[id] ? "focus:border-red-500" : "focus:border-black-300"}
              
              ` }
             
             />
               <label className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
               ${formatPrice ? "left-9" : "left-2"}
               peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
               ${errors[id] ? " text-red-500" : "text-zinc-400" }
               `}>
                {label}
               </label>
        </div>
    );
};

export default Input;