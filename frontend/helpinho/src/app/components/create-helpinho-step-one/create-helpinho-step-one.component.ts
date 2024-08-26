import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-create-helpinho-step-one',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './create-helpinho-step-one.component.html',
  styleUrl: './create-helpinho-step-one.component.css'
})
export class CreateHelpinhoStepOneComponent {
  isChecked: { [key: string]: boolean } = {};

  constructor(
    private formDataService: FormDataService,
  ) {}

  onCheckboxChange(event: Event, key: string): void {
      const checkbox = event.target as HTMLInputElement;
      // Desmarcar todos os checkboxes
      for (const k in this.isChecked) {
          if (this.isChecked.hasOwnProperty(k)) {
              this.isChecked[k] = false;
          }
      }

      // Marcar apenas o checkbox selecionado
      this.isChecked[key] = checkbox.checked;
      // Armazenar a categoria selecionada ou uma string vazia se nenhum checkbox estiver selecionado
      this.saveData();
  }

  saveData() {
    // Encontrar a categoria selecionada
    const selectedCategory = Object.keys(this.isChecked).find(key => this.isChecked[key]);

    // Armazenar a categoria selecionada no formato desejado
    this.formDataService.setData('stepOne', {
      category: selectedCategory || ''
    });
  }
}
