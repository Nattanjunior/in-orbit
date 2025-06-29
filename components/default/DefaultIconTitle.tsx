import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Exibe o ícone e o título lado a lado.
 * Props opcionais para customização futura.
 */
export function DefaultIconTitle() {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <Image
        src="/Group.png"
        alt="Logo in.orbit"
        width={40}
        height={40}
        priority
        className="select-none"
      />
      <h1 className="text-xl font-bold tracking-tight text-white font-sans">in.orbit</h1>
    </div>
  );
} 