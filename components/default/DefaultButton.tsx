import { FormMetasSheet } from "../forms/FormMetas";

/**
 * Botão para cadastrar meta (agora abre o formulário Sheet).
 */
export function DefaultButton() {
  return (
    <div className="flex justify-center w-full">
      <FormMetasSheet />
    </div>
  );
} 