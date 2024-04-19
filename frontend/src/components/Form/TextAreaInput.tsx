import { FieldError } from 'react-hook-form';

type FormFieldProps = {
    fieldName: string;
    placeholder: string;
    name: string;
    register: any;
    error: FieldError | undefined;
  };

const TextAreaInput = ({fieldName, placeholder, name, register, error}: FormFieldProps) => {
    return (
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text font-semibold">{fieldName}</span>
            </div>
            <textarea 
                id={name}
                placeholder={placeholder}
                className={"input input-bordered input-sm w-full h-40 bg-white " + (error && "border-red-700")}
                {...register(name)}/>
            <div className="label">
            {
                error && (<span className="label-text-alt text-red-700">{error.message}</span>)
            }
            </div>
            
        </label>
    )
}

export default TextAreaInput