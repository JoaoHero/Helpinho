import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DonateService } from '../../services/donate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
export class DonateComponent implements OnInit {
  helpinhoId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private donateService: DonateService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: { get: (arg0: string) => string | null; }) => {
      this.helpinhoId = params.get('id');
  })}

  formulario = new FormGroup({
    donationAmount: new FormControl(100, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]), // Regex para valores monetários
    cardNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]), // Regex para números de cartão
    cardName: new FormControl('', [Validators.required]),
    expireDate: new FormControl('', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]), // Regex para MM/YY
    cvcCard: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}$/)]), // Regex para CVC
  });

  showSuccess(message:string) {
    this.toastr.success(message);
  }

  showError(message:string) {
    this.toastr.error(message);
  }

  isLoading = false; // Estado inicial do botão
  buttonText = 'Finalizar pagamento'; // Texto inicial do botão

  onSubmitReactiveForm(): void {
    if (this.formulario.valid && this.helpinhoId) {
      const formData = {
        donationAmount: this.formulario.value.donationAmount!,
        cardNumber: this.formulario.value.cardNumber!,
        cardName: this.formulario.value.cardName!,
        expireDate: this.formulario.value.expireDate!,
        cvcCard: this.formulario.value.cvcCard!,
      }

      this.isLoading = true; // Alterando o estado de carregamento
      this.buttonText = 'Finalizando...'; // Alterando texto

      this.donateService.donate(this.helpinhoId, formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.buttonText = "Finalizar pagamento"

          if (response.error) {
            this.showError(response.message);
          } else {
            this.showSuccess('Help realizado com sucesso!');
            setTimeout(() => {
              window.location.href = `/helpinho/${this.helpinhoId}`;
            }, 1000);
          }

        },
        error: (err) => {
          console.log("Erro:", err)
        }
      });

    } else {
      if (!this.helpinhoId) {
        this.showError('ID do helpinho não encontrado.');
      } else {
        this.showError('Por favor, preencha todos os campos corretamente.');
      }
    }
  }
}
