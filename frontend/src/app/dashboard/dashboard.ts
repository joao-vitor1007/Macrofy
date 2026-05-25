import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, inject, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { LucideAngularModule, Send, User, Bot, LogOut } from 'lucide-angular';
import { generateDietPlan, calculateFoodMacros } from '../../utils/dietGenerator';


export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  macros?: Macros;
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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './dashboard.html',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms {{delay}}ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ], { params: { delay: 0 } })
    ]),
    trigger('fadeInDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('400ms 100ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('fadeInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('400ms 200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class Dashboard implements OnInit {
  private router = inject(Router);

  readonly Send = Send;
  readonly User = User;
  readonly Bot = Bot;
  readonly LogOut = LogOut;

  messages: Message[] = [
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! 👋 Sua dieta foi gerada com base no seu perfil. Registre suas refeições aqui e eu vou calcular os macros automaticamente!',
    }
  ];
  inputValue = '';
  consumedMacros: Macros = { calories: 0, protein: 0, carbs: 0, fats: 0 };
  dietPlan: DietPlan | null = null;

 
  ngOnInit() {
    const profileData = localStorage.getItem('userProfile');
    if (!profileData) {
      this.router.navigate(['/onboarding']);
      return;
    }

    const profile = JSON.parse(profileData);
    this.dietPlan = generateDietPlan(profile);
  }

  handleSendMessage() {
    if (!this.inputValue.trim() || !this.dietPlan) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: this.inputValue,
    };

    this.messages.push(userMessage);
    
    const currentInput = this.inputValue;
    this.inputValue = '';

    setTimeout(() => {
      const macros = calculateFoodMacros(currentInput);
      
      this.consumedMacros = {
        calories: this.consumedMacros.calories + macros.calories,
        protein: this.consumedMacros.protein + macros.protein,
        carbs: this.consumedMacros.carbs + macros.carbs,
        fats: this.consumedMacros.fats + macros.fats,
      };

      const remaining = {
        calories: this.dietPlan!.dailyMacros.calories - this.consumedMacros.calories,
        protein: this.dietPlan!.dailyMacros.protein - this.consumedMacros.protein,
        carbs: this.dietPlan!.dailyMacros.carbs - this.consumedMacros.carbs,
        fats: this.dietPlan!.dailyMacros.fats - this.consumedMacros.fats,
      };

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Registrado! 📊\n\n**Macros calculados:**\n• Calorias: ${macros.calories} kcal\n• Proteínas: ${macros.protein}g\n• Carboidratos: ${macros.carbs}g\n• Gorduras: ${macros.fats}g\n\n**Restante do dia:**\n• Calorias: ${remaining.calories} kcal\n• Proteínas: ${remaining.protein}g\n• Carboidratos: ${remaining.carbs}g\n• Gorduras: ${remaining.fats}g`,
        macros,
      };

      this.messages.push(assistantMessage);
    }, 500);
  }

  // TODO: implementar token, e na hora de fazer logout remover o token
  handleLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    
  }

  getPercentage(consumed: number, total: number): number {
    return Math.min((consumed / total) * 100, 100);
  }
}