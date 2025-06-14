import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface GoalFormProps {
  onClose: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ onClose }) => {
  const [activity, setActivity] = useState('');
  const [frequency, setFrequency] = useState('1x na semana');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Atividade:', activity);
    console.log('Frequência:', frequency);
    // Aqui você adicionaria a lógica para salvar a meta
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label htmlFor="activity" className="text-gray-300 text-sm font-medium mb-2 block">
          Qual a atividade?
        </label>
        <input
          type="text"
          id="activity"
          placeholder="Praticar exercícios, meditar, etc..."
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div>
        <p className="text-gray-300 text-sm font-medium mb-3">Quantas vezes na semana?</p>
        <div className="flex flex-col gap-3">
          {[
            { value: '1x na semana', label: '1x na semana', emoji: '😔' },
            { value: '2x na semana', label: '2x na semana', emoji: '🙁' },
            { value: '3x na semana', label: '3x na semana', emoji: '😎' },
            { value: '4x na semana', label: '4x na semana', emoji: '🤩' },
            { value: '5x na semana', label: '5x na semana', emoji: '🤗' },
            { value: '6x na semana', label: '6x na semana', emoji: '🥳' },
            { value: 'Todos dias da semana', label: 'Todos dias da semana', emoji: '🔥' },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${frequency === option.value ? 'bg-purple-800 border-2 border-purple-400' : 'bg-[#2a2a2a] border border-gray-700 hover:border-gray-500'}`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  value={option.value}
                  checked={frequency === option.value}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${frequency === option.value ? 'border-purple-400 bg-purple-500' : 'border-gray-500'}`}
                >
                  {frequency === option.value && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </span>
                <span className="text-gray-300">{option.label}</span>
              </div>
              <span className="text-2xl">{option.emoji}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="button"
          className="bg-[#2a2a2a] hover:bg-gray-700 text-gray-300 font-bold py-3 px-6 rounded-xl transition-colors duration-200 flex-1"
          onClick={onClose}
        >
          Fechar
        </button>
        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 flex-1"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default GoalForm; 