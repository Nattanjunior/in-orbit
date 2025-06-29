import { Button } from "../ui/button";

/**
 * Botão para cadastrar meta.
 */
export function DefaultButton() {
  return (
    <div className="flex justify-center">
      <Button className="bg-[#A259FF] hover:bg-[#7C3AED] text-white font-medium px-6 py-2 rounded-md text-sm" aria-label="Cadastrar meta">
        + Cadastrar meta
      </Button>
    </div>
  );
} 