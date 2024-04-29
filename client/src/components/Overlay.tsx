import { MouseEventHandler, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface OverlayProps {
  handleClick: () => void;
  children: ReactNode;
}

function Overlay({ handleClick, children }: OverlayProps) {
  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      handleClick();
    }
  };

  const overlay = (
    <div
      className="fixed top-0 z-30 flex h-dvh w-screen justify-center bg-black bg-opacity-70 p-8"
      onClick={onClick}
    >
      <div className="m-auto flex max-h-full max-w-full basis-[400px] flex-col overflow-x-auto">
        {children}
      </div>
    </div>
  );

  return createPortal(overlay, document.getElementById('root')!);
}

export default Overlay;
