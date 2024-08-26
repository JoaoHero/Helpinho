import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../services/form-data.service';
import { Helpinho } from '../../types/helpinho';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-helpinho-step-for',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-helpinho-step-four.component.html',
  styleUrl: './create-helpinho-step-four.component.css'
})
export class CreateHelpinhoStepFourComponent implements OnInit {
  formData: any = {};
  stepOneCategory: string = 'Não definido';
  stepTwoTitle: string = 'Não definido';
  stepTwoDescription: string = 'Não definido';
  stepTwoFile: any = 'Não definido';
  stepThreeValue: string = 'Não definido';
  imageSrc: string | ArrayBuffer | null = null;
  errorMessage: string = '';

  constructor(private formDataService: FormDataService) {}

  ngOnInit(): void {
    // Obtendo todos os dados do serviço
    this.formData = this.formDataService.getAllData();
    this.displayData();
  }

  displayData(): void {
    // Acessar os dados diretamente
    this.stepOneCategory = this.formData?.stepOne?.category || this.stepOneCategory;
    this.stepTwoTitle = this.formData?.stepTwo?.title || this.stepTwoTitle;
    this.stepTwoDescription = this.formData?.stepTwo?.description || this.stepTwoDescription;
    this.stepTwoFile = this.formData?.stepTwo?.file || this.stepTwoFile;
    this.stepThreeValue = this.formData?.stepThree?.value || this.stepThreeValue;
  }
}