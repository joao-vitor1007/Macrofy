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

export function generateDietPlan(profile: any): DietPlan {
  let baseCalories = 2000;
  let proteinRatio = 0.3;
  let carbsRatio = 0.45;
  let fatsRatio = 0.25;

  if (profile) {
    const profileString = JSON.stringify(profile).toLowerCase();

    if (profileString.includes('perder') || profileString.includes('emagrecer') || profileString.includes('cutting')) {
      baseCalories = 1600;
      proteinRatio = 0.4;
      carbsRatio = 0.3;
      fatsRatio = 0.3;
    } else if (profileString.includes('ganhar') || profileString.includes('hipertrofia') || profileString.includes('bulking')) {
      baseCalories = 2700;
      proteinRatio = 0.3;
      carbsRatio = 0.5;
      fatsRatio = 0.2;
    }
  }

  const dailyMacros = {
    calories: baseCalories,
    protein: Math.round((baseCalories * proteinRatio) / 4),
    carbs: Math.round((baseCalories * carbsRatio) / 4),
    fats: Math.round((baseCalories * fatsRatio) / 9),
  };

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

export function calculateFoodMacros(foodInput: string): Macros {
  const input = foodInput.toLowerCase();
  
  const macros = { calories: 0, protein: 0, carbs: 0, fats: 0 };

  const qtdMatch = input.match(/\d+/);
  const qtd = qtdMatch ? parseInt(qtdMatch[0], 10) : 1;

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

  if (macros.calories === 0) {
    macros.calories = 150 * qtd;
    macros.protein = 5 * qtd;
    macros.carbs = 20 * qtd;
    macros.fats = 6 * qtd;
  }

  return macros;
}