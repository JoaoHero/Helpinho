import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-create-helpinho-step-thre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-helpinho-step-three.component.html',
  styleUrl: './create-helpinho-step-three.component.css'
})
export class CreateHelpinhoStepThreeComponent{
  selectedValue: string = '';
  isChecked: { [key: string]: boolean } = {};

  constructor(private formDataService: FormDataService) {}

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
    this.saveData();
  }

  saveData() {
    // Encontrar a categoria selecionada
    const selectedValue = Object.keys(this.isChecked).find(key => this.isChecked[key]);

    // Armazenar a categoria selecionada no formato desejado
    this.formDataService.setData('stepThree', {
      value: selectedValue || ''
    });
  }
}
