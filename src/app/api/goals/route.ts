import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { activity, frequency } = await request.json();

    if (!activity) {
      return NextResponse.json({ error: 'A atividade é obrigatória.' }, { status: 400 });
    }

    const userId = 'clx8n5gq30000y1n3k2z9t1q5'; 

    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email: 'placeholder@example.com',
          name: 'Placeholder User',
        },
      });
    }

    let parsedFrequency: number;
    if (frequency === 'Todos dias da semana') {
      parsedFrequency = 7;
    } else {
      parsedFrequency = parseInt(frequency.split('x')[0]);
    }

    if (isNaN(parsedFrequency)) {
      return NextResponse.json({ error: 'Frequência inválida.' }, { status: 400 });
    }

    const newGoal = await prisma.goal.create({
      data: {
        title: activity,
        frequency: parsedFrequency,
        user: { 
          connect: { id: user.id },
        },
      },
    });

    return NextResponse.json(newGoal, { status: 201 });
  } catch (error) {
    console.error('Erro ao cadastrar meta:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
} 