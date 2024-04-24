import { ReactNode } from 'react';

interface AuthButtonsProps {
  children: ReactNode;
}

function AuthButtons({ children }: AuthButtonsProps) {
  return <div className="mt-6 flex gap-4">{children}</div>;
}

export default AuthButtons;
