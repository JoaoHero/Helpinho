export interface StepOneData {
    category: string;
  }
  
  export interface StepTwoData {
    title: string;
    description: string;
    file: any; // Ajuste o tipo conforme o formato do arquivo
  }
  
  export interface StepThreeData {
    category: string;
  }
  
  export interface FormData {
    stepOne?: StepOneData;
    stepTwo?: StepTwoData;
    stepThree?: StepThreeData;
  }