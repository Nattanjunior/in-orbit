import { z } from "zod";

export const frequencias = [
  { value: "1", label: "1x na semana", emoji: "🥲" },
  { value: "2", label: "2x na semana", emoji: "🙂" },
  { value: "3", label: "3x na semana", emoji: "😃" },
  { value: "4", label: "4x na semana", emoji: "😁" },
  { value: "5", label: "5x na semana", emoji: "😎" },
  { value: "6", label: "6x na semana", emoji: "🤓" },
  { value: "7", label: "Todos dias da semana", emoji: "🔥" },
];

export const formMetasSchema = z.object({
  meta: z.string().min(1, "A meta é obrigatória"),
  frequencia: z.enum(["1", "2", "3", "4", "5", "6", "7"], {
    required_error: "Selecione a frequência",
  }),
});

export type FormMetasValues = z.infer<typeof formMetasSchema>; 