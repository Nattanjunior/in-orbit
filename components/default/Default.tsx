import { DefaultIconTitle } from "./DefaultIconTitle";
import { DefaultImage } from "./DefaultImage";
import { DefaultDescription } from "./DefaultDescription";
import { DefaultButton } from "./DefaultButton";

/**
 * Componente principal de estado vazio para metas.
 */
export default function Default() {
  return (
    <section
      className="w-screen h-screen flex flex-col items-center justify-center bg-[#18181B] rounded-none p-4"
      aria-label="Estado vazio de metas"
    >
      <DefaultIconTitle />
      <DefaultImage />
      <DefaultDescription />
      <DefaultButton />
    </section>
  );
} 