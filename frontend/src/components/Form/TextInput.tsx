import { FieldError, UseFormRegister } from "react-hook-form";

type FormFieldProps = {
    type: string;
    fieldName: string;
    placeholder: string;
    name: string;
    register: any;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
  };

function TextInput({type, fieldName, placeholder, name, register, error, valueAsNumber}: FormFieldProps) {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{fieldName}</span>
            </div>
            <input 
                type={type}
                placeholder={placeholder}
                className="input input-bordered input-sm w-full max-w-xs bg-white" 
                {...register(name, { valueAsNumber })}/>
            <div className="label">
            {
                error && (<span className="label-text-alt text-red-700">{error.message}</span>)
            }
            </div>
            
        </label>
    )
}

export default TextInput