import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formData: any = {};

  // Método para definir dados
  setData(key: string, value: any) {
    this.formData[key] = value;
  }

  // Método para obter dados
  getData(key: string): any {
    return this.formData[key];
  }

  // Método para obter todos os dados
  getAllData(): any {
    return this.formData;
  }
}