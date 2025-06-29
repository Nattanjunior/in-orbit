"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formMetasSchema, frequencias, FormMetasValues } from "@/lib/validators/formMetas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter, SheetTrigger } from "../ui/sheet";
import { toast } from "sonner";
import { CheckSquare, Check } from "lucide-react";
import { useState } from "react";

export function FormMetasSheet() {
  const [open, setOpen] = useState(false);
  const form = useForm<FormMetasValues>({
    resolver: zodResolver(formMetasSchema),
    defaultValues: { meta: "", frequencia: undefined },
  });

  function onSubmit(data: FormMetasValues) {
    setTimeout(() => {
      toast.success("Meta cadastrada com sucesso!", { description: `Atividade: ${data.meta}` });
      setOpen(false);
      form.reset();
    }, 1200);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-[#A259FF] hover:bg-[#7C3AED] text-white font-medium px-6 py-2 rounded-md text-sm" aria-label="Cadastrar meta">
          + Cadastrar meta
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="max-w-sm w-full bg-[#18181B] text-white p-6 border-black h-full max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
        <SheetHeader>
          <SheetTitle className="flex text-white items-center gap-2 text-lg font-bold">
            Cadastrar meta
          </SheetTitle>
          <SheetDescription className="text-zinc-400 text-sm">
            Adicione atividades que <span className="text-[#A259FF] underline">te fazem bem</span> e que você quer continuar praticando toda semana.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-6" aria-label="Formulário de cadastro de meta">
          <div className="flex flex-col gap-2">
            <Label htmlFor="meta">Qual a atividade?</Label>
            <Input
              id="meta"
              aria-label="Qual a atividade"
              placeholder="Praticar exercícios, meditar, etc..."
              {...form.register("meta")}
              aria-invalid={!!form.formState.errors.meta}
              className="bg-zinc-900 border-zinc-800 placeholder:text-zinc-500"
            />
            {form.formState.errors.meta && (
              <span className="text-xs text-red-400" role="alert">{form.formState.errors.meta.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Quantas vezes na semana?</Label>
            <div className="flex flex-col gap-2" role="radiogroup" aria-label="Frequência semanal">
              {frequencias.map((freq) => {
                const checked = form.watch("frequencia") === freq.value;
                return (
                  <label
                    key={freq.value}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg border cursor-pointer transition-all ${checked ? "border-[#f472b6]" : "border-zinc-800"}`}
                    aria-checked={checked}
                    tabIndex={0}
                  >
                    <span className="relative flex items-center justify-center w-5 h-5 mr-2">
                      <input
                        type="radio"
                        value={freq.value}
                        {...form.register("frequencia")}
                        className="opacity-0 absolute w-full h-full cursor-pointer"
                        aria-label={freq.label}
                      />
                      <span className={`block w-5 h-5 rounded-full border-2 ${checked ? "border-[#f472b6]" : "border-zinc-700"} bg-transparent transition-colors`}></span>
                      {checked && (
                        <Check className="w-3.5 h-3.5 text-[#f472b6] absolute" strokeWidth={3} />
                      )}
                    </span>
                    <span className="flex-1">{freq.label}</span>
                    <span aria-hidden="true">{freq.emoji}</span>
                  </label>
                );
              })}
            </div>
            {form.formState.errors.frequencia && (
              <span className="text-xs text-red-400" role="alert">{form.formState.errors.frequencia.message}</span>
            )}
          </div>
          <SheetFooter className="flex flex-row gap-2 mt-4">
            <SheetClose asChild>
              <Button type="button" variant="outline" className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 w-1/2" aria-label="Fechar">Fechar</Button>
            </SheetClose>
            <Button type="submit" className="bg-[#A259FF] hover:bg-[#7C3AED] text-white font-medium w-1/2" aria-label="Salvar">Salvar</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
} 