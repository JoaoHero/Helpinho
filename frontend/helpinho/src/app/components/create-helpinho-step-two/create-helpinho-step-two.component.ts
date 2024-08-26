import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-create-helpinho-step-two',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-helpinho-step-two.component.html',
  styleUrls: ['./create-helpinho-step-two.component.css']
})
export class CreateHelpinhoStepTwoComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  form: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private formDataService: FormDataService) {
    this.form = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    // Carregar dados do serviço ao inicializar o componente
    const savedData = this.formDataService.getData('stepTwo');
    if (savedData) {
      this.form.setValue({
        title: savedData.title || '',
        description: savedData.description || ''
      });
    }

    // Atualizar dados no serviço sempre que o formulário mudar
    this.form.valueChanges.subscribe(value => {
      this.formDataService.setData('stepTwo', {
        ...value,
      });
    });
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.formDataService.setData('stepTwo', {
        ...this.form.value,
      });
    }
  }
}