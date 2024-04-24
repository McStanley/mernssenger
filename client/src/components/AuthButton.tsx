import { ReactNode } from 'react';

interface AuthButtonProps {
  children: ReactNode;
}

function AuthButton({ children }: AuthButtonProps) {
  return (
    <button className="rounded-full bg-lime-700 px-4 py-2 font-medium text-white hover:bg-lime-800">
      {children}
    </button>
  );
}

export default AuthButton;
