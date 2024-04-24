import { ReactNode } from 'react';

interface AuthInputsProps {
  children: ReactNode;
}

function AuthInputs({ children }: AuthInputsProps) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

export default AuthInputs;
