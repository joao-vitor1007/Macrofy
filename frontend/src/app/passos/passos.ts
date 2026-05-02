import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { LucideAngularModule, ArrowRight, ArrowLeft } from 'lucide-angular';

export interface UserProfile {
  gender: string;
  age: string;
  height: string;
  weight: string;
  activity: string;
  goal: string;
}

export interface StepOption {
  value: string;
  label: string;
  desc?: string;
}

export interface Step {
  id: keyof UserProfile;
  title: string;
  type?: 'input';
  placeholder?: string;
  suffix?: string;
  options?: (string | StepOption)[];
}

@Component({
  selector: 'app-passos',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './passos.html',
  animations: [
    trigger('stepAnimation', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('itemAnimation', [
      transition(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          animate('300ms {{delay}}ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
        ],
        { params: { delay: 0 } },
      ),
    ]),
  ],
})
export class PassosComponent {
  // Nome da classe atualizado
  private router = inject(Router);

  readonly ArrowRight = ArrowRight;
  readonly ArrowLeft = ArrowLeft;

  step = 0;
  profile: UserProfile = {
    gender: '',
    age: '',
    height: '',
    weight: '',
    activity: '',
    goal: '',
  };

  steps: Step[] = [
    { id: 'gender', title: 'Qual é o seu gênero?', options: ['Masculino', 'Feminino', 'Outro'] },
    {
      id: 'age',
      title: 'Quantos anos você tem?',
      type: 'input',
      placeholder: 'Ex: 25',
      suffix: 'anos',
    },
    {
      id: 'height',
      title: 'Qual é a sua altura?',
      type: 'input',
      placeholder: 'Ex: 175',
      suffix: 'cm',
    },
    {
      id: 'weight',
      title: 'Qual é o seu peso atual?',
      type: 'input',
      placeholder: 'Ex: 70',
      suffix: 'kg',
    },
    {
      id: 'activity',
      title: 'Qual é o seu nível de atividade física?',
      options: [
        { value: 'low', label: 'Baixo', desc: 'Pouco ou nenhum exercício' },
        { value: 'moderate', label: 'Moderado', desc: 'Exercício 3-5 vezes por semana' },
        {
          value: 'high',
          label: 'Praticante assíduo',
          desc: 'Exercício intenso 6-7 vezes por semana',
        },
      ],
    },
    {
      id: 'goal',
      title: 'Qual é o seu objetivo?',
      options: [
        { value: 'gain', label: 'Ganhar massa', desc: 'Aumentar massa muscular' },
        { value: 'lose', label: 'Secar', desc: 'Perder gordura corporal' },
        { value: 'maintain', label: 'Comer saudável', desc: 'Manter peso e saúde' },
      ],
    },
  ];

  get currentStep() {
    return this.steps[this.step];
  }
  get progressPercentage() {
    return Math.round(((this.step + 1) / this.steps.length) * 100);
  }
  get canProceed() {
    return !!this.profile[this.currentStep.id];
  }

  handleOptionSelect(option: string | StepOption) {
    const value = typeof option === 'string' ? option : option.value;
    this.profile[this.currentStep.id] = value;

    if (this.step < this.steps.length - 1) {
      setTimeout(() => this.step++, 300);
    } else {
      setTimeout(() => this.finishOnboarding(), 300);
    }
  }

  handleNext() {
    if (this.step === this.steps.length - 1) {
      this.finishOnboarding();
    } else {
      this.step++;
    }
  }

  handleBack() {
    if (this.step > 0) this.step--;
  }

  private finishOnboarding() {
    localStorage.setItem('userProfile', JSON.stringify(this.profile));
    this.router.navigate(['/dashboard']);
  }

  getOptionValue(option: string | StepOption): string {
    return typeof option === 'string' ? option : option.value;
  }

  getOptionLabel(option: string | StepOption): string {
    return typeof option === 'string' ? option : option.label;
  }

  getOptionDesc(option: string | StepOption): string | undefined {
    return typeof option === 'string' ? undefined : option.desc;
  }

  isSelected(option: string | StepOption): boolean {
    return this.profile[this.currentStep.id] === this.getOptionValue(option);
  }
}
