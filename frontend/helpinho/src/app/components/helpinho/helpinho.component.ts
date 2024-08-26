import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HelpinhoService } from '../../services/helpinho.service';
import { CommonModule } from '@angular/common';
import { Donor, Helpinho } from '../../types/helpinho';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-helpinho',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './helpinho.component.html',
  styleUrl: './helpinho.component.css'
})
export class HelpinhoComponent implements OnInit {
  helpinho: Helpinho[] = [];
  helpinhoId: string | null = null;
  donors: Donor[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private helpinhoService: HelpinhoService,
    private toastr: ToastrService
  ) {}

  showSuccess(message:string) {
    this.toastr.success(message);
  }

  showError(message:string) {
    this.toastr.error(message);
  }

  // Método para copiar a URL
  copy(inputElement: HTMLInputElement): void {
    // Cria um elemento temporário para a cópia
    const tempInput = document.createElement('input');
    tempInput.value = inputElement.value;
    document.body.appendChild(tempInput);

    // Seleciona o texto no elemento temporário
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // Para dispositivos móveis

    // Copia o texto para a área de transferência
    document.execCommand('copy');
    document.body.removeChild(tempInput); // Remove o elemento temporário

    this.toastr.success("Texto copiado com sucesso");
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: { get: (arg0: string) => string | null; }) => {
      this.helpinhoId = params.get('id');

      if(!this.helpinhoId) {
        this.showError("Sentimos muito, mas o helpinho pesquisado não foi encontrado");
        this.router.navigate(["/"])
        return 
      }

      this.helpinhoService.searchHelpinho(this.helpinhoId).subscribe({
        next: (data: Helpinho) => {
          this.helpinho = data.result;
          this.donors = this.helpinho[0].donors;
        },
        error: (err) => {
          this.showError("Sentimos muito, mas o helpinho pesquisado não foi encontrado");
          return this.router.navigate(["/"])
        }
      })
    });
  }
}
