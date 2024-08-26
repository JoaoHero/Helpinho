import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { passwordValidator } from '../../utils/verifyPassword';
import { DirectivesModule } from '../../directives/directives.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,CommonModule, DirectivesModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formulario = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    documentNumber: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, passwordValidator])
  })

  constructor(
    private registerService: RegisterService, 
    private router: Router,
    private toastr: ToastrService,
  ) {}

  showSuccess(message:string) {
    this.toastr.success(message);
  }

  showError(message:string) {
    this.toastr.error(message);
  }

  isLoading = false; // Estado inicial do botão
  buttonText = 'Registrar'; // Texto inicial do botão

  onSubmitReactiveForm(): void {
    if (this.formulario.valid) {
      const formData = {
        name: this.formulario.value.name!,
        email: this.formulario.value.email!,
        documentNumber: this.formulario.value.documentNumber!,
        date: this.formulario.value.date!,
        password: this.formulario.value.password!
      };

      this.isLoading = true; // Alterando o estado de carregamento
      this.buttonText = 'Registrando...'; // Alterando texto
  
      this.registerService.register(formData).subscribe({
        next: (response) => {
          this.showSuccess(response.message);
  
          setTimeout(() => {
            this.isLoading = false; // Voltando ao estado inicial
            this.buttonText = 'Registrar'; // Voltando ao texto inicial
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.showError(err.error.message);
          this.isLoading = false;
          this.buttonText = 'Registrar';
        }
      });
  
    } else {
      this.showError("Formulário inválido. Por favor, verifique os campos e tente novamente.");
    }
  }
}
