import { RegisterOptions, useFormContext } from 'react-hook-form';

interface AuthInputProps {
  type?: string;
  placeholder?: string;
  name: string;
  options?: RegisterOptions;
}

function AuthInput({
  type = 'text',
  placeholder,
  name,
  options,
}: AuthInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, options)}
        className="rounded-lg bg-gray-100 px-3 py-2"
      />
      {errors[name] && (
        <p className="ml-3 mt-1 text-left text-sm font-medium text-red-900">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}

export default AuthInput;
