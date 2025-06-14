"use client";

import Image from "next/image";
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import GoalForm from "@/src/components/GoalForm"

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-gray-300 p-8">
      <div className="flex flex-col gap-8 items-center text-center max-w-lg">
        <div className="flex items-center gap-2 mb-8">
          <Image
            src="/Group.png"
            alt="in.orbit logo"
            width={24}
            height={24}
            priority
          />
          <span className="text-xl font-semibold text-gray-300">in.orbit</span>
        </div>
        <Image
          src="/lets-start.png"
          alt="Illustration of a person and a rocket"
          width={320}
          height={320}
          priority
        />
        <p className="text-lg mt-8 leading-relaxed">
          Você ainda não cadastrou nenhuma meta, que tal{" "}
          <span className="underline cursor-pointer text-purple-400" onClick={() => setIsSidebarOpen(true)}>cadastrar uma</span> agora mesmo?
        </p>
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 mt-4 text-base">
              <span className="text-xl">+</span> Cadastrar meta
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[500px] bg-[#1a1a1a] text-gray-300 border-l border-gray-700 p-6 overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-white">Cadastrar meta</SheetTitle>
              <SheetDescription className="text-gray-400">
                Adicione atividades que <span className="text-purple-400">te fazem bem</span> e que você <br/> quer continuar praticando toda semana.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4">
              <GoalForm onClose={() => setIsSidebarOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
