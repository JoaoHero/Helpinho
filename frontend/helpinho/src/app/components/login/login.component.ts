import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loginm',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    formulario = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false)
    })
  
  constructor(
    private loginService: LoginService, 
    private router: Router,
    private toastr: ToastrService
  ) {}

  isLoading = false; // Estado inicial do botão
  buttonText = 'Entrar'; // Texto inicial do botão

  showSuccess(message:string) {
    this.toastr.success(message);
  }

  showError(message:string) {
    this.toastr.error(message);
  }

  ngOnInit(): void {
    // Preenche automaticamente o e-mail se estiver salvo
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        this.formulario.controls['email'].setValue(rememberedEmail);
        this.formulario.controls['rememberMe'].setValue(true); // marca o checkbox
    }
  }

  // ReactiveForm
  onSubmitReactiveForm(): void {
    const email = this.formulario.value.email;
    const password = this.formulario.value.password;
    const rememberMe = this.formulario.value.rememberMe;

    if (!email) {
      return this.showError("É necessário informar um e-mail para continuar")
    };

    if (!password) {
      return this.showError("É necessário informar uma senha para continuar")
    }

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email as string)
    }

    if (this.formulario.valid) {
      const credentials = {
        email: email as string,
        password: password as string
    };

    this.isLoading = true; // Alterando o estado de carregamento
    this.buttonText = 'Entrando...'; // Alterando texto

    this.loginService.login(credentials).subscribe({
      next: (response) => {
        this.showSuccess(response.message);
        sessionStorage.setItem('token', response.token);

        setInterval(() => {
          this.isLoading = false; // Voltando ao estado inicial
          this.buttonText = 'Entrar'; // Voltando ao texto inicial
          window.location.href = '/'; // Redireciona e recarrega a página
        }, 2000);
      },
      error: (err) => {
        this.showError(err.error.message);
        this.isLoading = false;
        this.buttonText = 'Entrar';
      }
    });

    } else {
      this.showError("Formulário invalido");
    }
  }
}
