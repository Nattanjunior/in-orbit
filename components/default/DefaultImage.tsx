import Image from 'next/image';

/**
 * Exibe a imagem ilustrativa principal.
 */
export function DefaultImage() {
  return (
    <div className="flex justify-center mb-6">
      <Image
        src="/lets-start.png"
        alt="Ilustração de foguete e pessoa"
        width={220}
        height={180}
        className="object-contain select-none"
        priority
      />
    </div>
  );
} 