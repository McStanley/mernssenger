import { ReactNode } from 'react';

interface AuthButtonProps {
  disabled?: boolean;
  children: ReactNode;
}

function AuthButton({ disabled, children }: AuthButtonProps) {
  return (
    <button
      disabled={disabled}
      className="rounded-full bg-lime-700 px-4 py-2 font-medium text-white hover:bg-lime-800"
    >
      {children}
    </button>
  );
}

export default AuthButton;
