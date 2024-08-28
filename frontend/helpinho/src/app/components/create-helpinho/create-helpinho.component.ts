import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CreateHelpinhoStepOneComponent } from '../create-helpinho-step-one/create-helpinho-step-one.component';
import { CreateHelpinhoStepTwoComponent } from '../create-helpinho-step-two/create-helpinho-step-two.component';
import { CreateHelpinhoStepThreeComponent } from '../create-helpinho-step-three/create-helpinho-step-three.component';
import { CreateHelpinhoStepFourComponent } from '../create-helpinho-step-four/create-helpinho-step-four.component';
import { FormDataService } from '../../services/form-data.service';
import { CreateHelpinhoService } from '../../services/createHelpinho.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-helpinho',
  standalone: true,
  imports: [CommonModule,CreateHelpinhoStepOneComponent,CreateHelpinhoStepTwoComponent,CreateHelpinhoStepThreeComponent,CreateHelpinhoStepFourComponent],
  templateUrl: './create-helpinho.component.html',
  styleUrl: './create-helpinho.component.css'
})
export class CreateHelpinhoComponent {
  constructor(
    private router: Router,
    private formDataService: FormDataService,
    private createHelpinhoService: CreateHelpinhoService,
    private toastr: ToastrService,
  ) {}

  currentStep:number = 1;
  buttonPreviousText:string = "Voltar";

  showSuccess(message:string) {
    this.toastr.success(message);
  }

  showError(message:string) {
    this.toastr.error(message);
  }

  nextStep() {
    if (this.currentStep < 4) {
      const actuallyStep: any = {
        1: "stepOne",
        2: "stepTwo",
        3: "stepThree" 
      }
      
      // Acessa o nome do passo usando a chave atual
      const stepName = actuallyStep[this.currentStep];

      const data = this.formDataService.getData(stepName)

      if (!data) {
        return this.showError("Favor preencher todos os dados antes de prosseguir");
      }

      return this.currentStep++;

    }
  }

  previousStep() {
    if(this.currentStep > 1) {
      this.currentStep--;
    }
  }

  saveAllData(): void {
    const allData = {
      ...this.formDataService.getData('stepOne'),
      ...this.formDataService.getData('stepTwo'),
      ...this.formDataService.getData('stepThree'),
    };

    console.log(allData)
    if(!allData.title || !allData.category || !allData.description || !allData.value) {
      return this.showError("Favor preencher todos os dados")
    }

    const formHelpinhoData = {
      title: allData.title,
      category: allData.category,
      description: allData.description,
      image: "https://encurtador.com.br/SW7Dl",
      value: allData.value
    }

    this.createHelpinhoService.createHelpinho(formHelpinhoData).subscribe({
      next: (response) => {
        this.showSuccess(response.message);

        this.router.navigate([`/helpinho/${response.helpinhoId}`]);
      },
      error: (err: string) => {
        return this.showError(`Ocorreu um erro ao tentar criar o helpinho: ${err}`);
      }
    })

  }
}