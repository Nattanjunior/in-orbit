/**
 * Exibe o texto de descrição do estado vazio.
 */
export function DefaultDescription() {
  return (
    <p className="text-center text-sm text-zinc-400 mb-4 max-w-xs mx-auto">
      Você ainda não cadastrou nenhuma meta,<br />
      que tal <span className="underline cursor-pointer">cadastrar um</span> agora mesmo?
    </p>
  );
} 