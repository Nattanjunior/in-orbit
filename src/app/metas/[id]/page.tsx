import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { format, startOfWeek, endOfWeek, isSameWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Activity, Goal } from '@prisma/client';

// Componente de Cliente para a UI do Dashboard
import DashboardView from '@/src/components/DashboardView'; 

interface GoalPageProps {
  params: { id: string };
}

export default async function GoalPage({ params }: GoalPageProps) {
  const userId = params.id; // O ID do usuário vem da URL

  // Obter a data atual
  const now = new Date();
  const startOfCurrentWeek = startOfWeek(now, { locale: ptBR });
  const endOfCurrentWeek = endOfWeek(now, { locale: ptBR });

  // Buscar metas e atividades para a semana atual
  const goals = await prisma.goal.findMany({
    where: {
      userId: userId,
    },
    include: {
      activities: {
        where: {
          date: {
            gte: startOfCurrentWeek,
            lte: endOfCurrentWeek,
          },
          completed: true, // Apenas atividades concluídas nesta semana
        },
        include: { // IMPORTANTE: Incluir a relação com a Goal aqui para acessar goal.title
          goal: true, 
        }
      },
    },
  });

  // if (!goals || goals.length === 0) { 
  //   // Se não houver metas para o usuário, você pode decidir renderizar uma
  //   // página vazia ou redirecionar, dependendo do que for mais adequado para UX
  //   // Por enquanto, vamos permitir que o DashboardView lide com metas vazias.
  // }

  // Os dados necessários para o dashboard serão passados para o DashboardView
  return <DashboardView initialGoals={goals} userId={userId} />;
} 