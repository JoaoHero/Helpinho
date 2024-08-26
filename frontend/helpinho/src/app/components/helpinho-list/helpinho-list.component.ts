import { Component, OnInit } from '@angular/core';
import { Helpinho } from '../../types/helpinho';
import { HelpinhosListService } from '../../services/helpinhosList.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HelpinhosLoadingComponent } from '../helpinhos-loading/helpinhos-loading.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-helpinho-list',
  standalone: true,
  imports: [CommonModule,RouterModule,HelpinhosLoadingComponent],
  templateUrl: './helpinho-list.component.html',
  styleUrl: './helpinho-list.component.css'
})
export class HelpinhoListComponent implements OnInit{
  helpinhos: Helpinho[] = [];
  helpinhosLoading:boolean = true;
  filteredHelpinhos: Helpinho[] = []; 
  
  constructor(
    private helpinhosListService: HelpinhosListService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.helpinhosListService.getHelpinhos().subscribe(
      (data: any) => {
        this.helpinhos = data.result;
        this.helpinhosLoading = false;
        this.filteredHelpinhos = this.helpinhos;

        return this.helpinhos;
      },
      (error) => {
        this.helpinhosLoading = false;
        this.toastr.error('Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.');
      }
    );
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value;
    this.filterHelpinhos(searchText);
  }

  filterHelpinhos(searchText: string) {
    this.filteredHelpinhos = this.helpinhos.filter(helpinho => 
      helpinho.title.toLowerCase().includes(searchText.toLowerCase()) ||
      helpinho.description.toLowerCase().includes(searchText.toLowerCase()) ||
      helpinho.category.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
