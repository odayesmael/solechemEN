import { useState } from 'react';
import { QuoteModal } from './QuoteModal';

interface QuoteButtonProps {
  productName: string;
  className?: string;
  children?: React.ReactNode;
}

export function QuoteButton({ productName, className, children }: QuoteButtonProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(true)} className={className}>
        {children || 'Request Quote'}
      </button>
      {show && <QuoteModal productName={productName} onClose={() => setShow(false)} />}
    </>
  );
}
