// src/utils/dietGenerator.ts

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DietPlan {
  dailyMacros: Macros;
  meals: {
    name: string;
    time: string;
    macros: Macros;
    foods: string[];
  }[];
}

/**
 * Função 1: Gera a dieta baseada no perfil salvo no localStorage
 */
export function generateDietPlan(profile: any): DietPlan {
  // 1. Valores base caso o perfil venha vazio
  let baseCalories = 2000;
  let proteinRatio = 0.3; // 30% das calorias
  let carbsRatio = 0.45;  // 45% das calorias
  let fatsRatio = 0.25;   // 25% das calorias

  if (profile) {
    // Busca as respostas do usuário (adapte os nomes 'objetivo'/'goal' conforme seu passo a passo)
    // Converte tudo para minúsculo (JSON.stringify) para facilitar a busca da palavra
    const profileString = JSON.stringify(profile).toLowerCase();

    if (profileString.includes('perder') || profileString.includes('emagrecer') || profileString.includes('cutting')) {
      // Déficit calórico
      baseCalories = 1600;
      proteinRatio = 0.4; // Mais proteína para segurar a massa magra
      carbsRatio = 0.3;
      fatsRatio = 0.3;
    } else if (profileString.includes('ganhar') || profileString.includes('hipertrofia') || profileString.includes('bulking')) {
      // Superávit calórico
      baseCalories = 2700;
      proteinRatio = 0.3;
      carbsRatio = 0.5;   // Muito carboidrato para dar energia
      fatsRatio = 0.2;
    }
  }

  // 2. Calculando os macros diários reais
  // (Proteína = 4 kcal/g, Carbo = 4 kcal/g, Gordura = 9 kcal/g)
  const dailyMacros = {
    calories: baseCalories,
    protein: Math.round((baseCalories * proteinRatio) / 4),
    carbs: Math.round((baseCalories * carbsRatio) / 4),
    fats: Math.round((baseCalories * fatsRatio) / 9),
  };

  // 3. Montando as refeições do dia dividindo os macros totais
  return {
    dailyMacros,
    meals: [
      {
        name: 'Café da Manhã',
        time: '08:00',
        macros: {
          calories: Math.round(baseCalories * 0.25),
          protein: Math.round(dailyMacros.protein * 0.25),
          carbs: Math.round(dailyMacros.carbs * 0.25),
          fats: Math.round(dailyMacros.fats * 0.25),
        },
        foods: ['2 ovos mexidos', '1 fatia de pão integral', '1 xícara de café (sem açúcar)'],
      },
      {
        name: 'Almoço',
        time: '12:30',
        macros: {
          calories: Math.round(baseCalories * 0.35),
          protein: Math.round(dailyMacros.protein * 0.4),
          carbs: Math.round(dailyMacros.carbs * 0.3),
          fats: Math.round(dailyMacros.fats * 0.35),
        },
        foods: ['150g de peito de frango', '100g de arroz', 'Salada à vontade com 1 fio de azeite'],
      },
      {
        name: 'Lanche da Tarde',
        time: '16:00',
        macros: {
          calories: Math.round(baseCalories * 0.15),
          protein: Math.round(dailyMacros.protein * 0.15),
          carbs: Math.round(dailyMacros.carbs * 0.2),
          fats: Math.round(dailyMacros.fats * 0.1),
        },
        foods: ['1 iogurte natural', '1 fruta (ex: maçã ou banana)'],
      },
      {
        name: 'Jantar',
        time: '20:00',
        macros: {
          calories: Math.round(baseCalories * 0.25),
          protein: Math.round(dailyMacros.protein * 0.2),
          carbs: Math.round(dailyMacros.carbs * 0.25),
          fats: Math.round(dailyMacros.fats * 0.3),
        },
        foods: ['120g de carne magra moída', '100g de batata', 'Legumes no vapor'],
      }
    ]
  };
}

/**
 * Função 2: Calcula macros baseado no texto digitado no chat (Mock de IA)
 */
export function calculateFoodMacros(foodInput: string): Macros {
  const input = foodInput.toLowerCase();
  
  // Valores iniciais
  const macros = { calories: 0, protein: 0, carbs: 0, fats: 0 };

  // Busca a quantidade digitada (ex: "2 ovos" -> pega o número 2). Se não tiver, assume 1.
  const qtdMatch = input.match(/\d+/);
  const qtd = qtdMatch ? parseInt(qtdMatch[0], 10) : 1;

  // Lógica simples de palavras-chave para simular a inteligência da IA
  if (input.includes('ovo')) {
    macros.calories += 70 * qtd;
    macros.protein += 6 * qtd;
    macros.carbs += 1 * qtd;
    macros.fats += 5 * qtd;
  }
  
  if (input.includes('pão') || input.includes('pao')) {
    macros.calories += 140 * qtd;
    macros.protein += 4 * qtd;
    macros.carbs += 28 * qtd;
    macros.fats += 2 * qtd;
  }

  if (input.includes('frango')) {
    // Se digitou frango, assume que o multiplicador é de porções de 100g
    // Ex: "200g de frango" vai multiplicar por 2
    const portion = qtd > 10 ? qtd / 100 : qtd; 
    macros.calories += Math.round(165 * portion);
    macros.protein += Math.round(31 * portion);
    macros.carbs += 0;
    macros.fats += Math.round(4 * portion);
  }

  if (input.includes('arroz')) {
    const portion = qtd > 10 ? qtd / 100 : qtd;
    macros.calories += Math.round(130 * portion);
    macros.protein += Math.round(2 * portion);
    macros.carbs += Math.round(28 * portion);
    macros.fats += 0;
  }
  
  if (input.includes('whey')) {
    macros.calories += 120 * qtd;
    macros.protein += 24 * qtd;
    macros.carbs += 3 * qtd;
    macros.fats += 1 * qtd;
  }

  // Se a pessoa digitou um alimento que não está mapeado no IF acima
  if (macros.calories === 0) {
    // Retorna um valor "coringa" para o app não ficar zerado e as barras progredirem
    macros.calories = 150 * qtd;
    macros.protein = 5 * qtd;
    macros.carbs = 20 * qtd;
    macros.fats = 6 * qtd;
  }

  return macros;
}