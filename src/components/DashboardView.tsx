"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import GoalForm from "@/src/components/GoalForm";
import { format, startOfWeek, endOfWeek, isSameWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Activity, Goal } from '@prisma/client';

// Definindo um tipo para a Activity que inclui a relação com a Goal
type ActivityWithGoal = Activity & { goal: Goal };

interface DashboardViewProps {
  initialGoals: (Goal & { activities: ActivityWithGoal[]; })[];
  userId: string;
}

const DashboardView: React.FC<DashboardViewProps> = ({ initialGoals, userId }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Obter a data atual
  const now = new Date();
  const startOfCurrentWeek = startOfWeek(now, { locale: ptBR });
  const endOfCurrentWeek = endOfWeek(now, { locale: ptBR });

  let completedGoalsCount = 0;
  let totalGoalsCount = 0;

  initialGoals.forEach(goal => {
    totalGoalsCount += goal.frequency; // Frequência desejada da meta
    completedGoalsCount += goal.activities.length; // Quantidade de atividades concluídas para esta meta na semana
  });

  const progress = totalGoalsCount > 0 ? Math.round((completedGoalsCount / totalGoalsCount) * 100) : 0;

  const formattedStartDate = format(startOfCurrentWeek, "dd", { locale: ptBR });
  const formattedEndDate = format(endOfCurrentWeek, "dd 'de' MMMM", { locale: ptBR });

  // Filtrar as atividades da semana para exibição na seção "Sua semana"
  const activitiesThisWeek: ActivityWithGoal[] = initialGoals.flatMap(goal => 
    goal.activities.filter(activity => isSameWeek(activity.date, now, { locale: ptBR }))
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-gray-300 p-8">
      <div className="max-w-lg w-full flex flex-col items-center">
        {/* Header com data e botão de cadastrar meta */}
        <div className="w-full flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Image
              src="/Group.png"
              alt="in.orbit logo"
              width={24}
              height={24}
              priority
            />
            <span className="text-xl font-semibold text-gray-300">{formattedStartDate} a {formattedEndDate}</span>
          </div>
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 text-base">
                <span className="text-xl">+</span> Cadastrar meta
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[500px] bg-[#1a1a1a] text-gray-300 border-l border-gray-700 p-6 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-white">Cadastrar meta</SheetTitle>
                <SheetDescription className="text-gray-400">
                  Adicione atividades que <span className="text-purple-400">te fazem bem</span> e que você quer continuar praticando toda semana.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4">
                <GoalForm onClose={() => setIsSidebarOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Barra de progresso */}
        <div className="w-full mb-8">
          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>Você completou {completedGoalsCount} de {totalGoalsCount} metas nessa semana.</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Botões de sugestão */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {['Meditar', 'Praticar exercício', 'Acordar cedo'].map((suggestion, index) => (
            <button key={index} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 hover:border-gray-500 transition-colors duration-200 flex items-center gap-2">
              <span className="text-xl">+</span> {suggestion}
            </button>
          ))}
        </div>

        {/* Sua semana */}
        <div className="w-full text-left">
          <h2 className="text-2xl font-bold text-white mb-4">Sua semana</h2>
          {activitiesThisWeek.length > 0 ? (
            <ul className="space-y-3">
              {activitiesThisWeek.map((activity: ActivityWithGoal, index) => (
                <li key={index} className="flex items-center justify-between p-3 rounded-xl border border-gray-700">
                  <span className="text-lg text-gray-300">{activity.goal.title} - {format(activity.date, 'dd/MM/yyyy HH:mm', { locale: ptBR })}</span>
                  {activity.completed && <span className="text-green-400">Concluído</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-400">Você ainda não completou nenhuma meta essa semana.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardView; 