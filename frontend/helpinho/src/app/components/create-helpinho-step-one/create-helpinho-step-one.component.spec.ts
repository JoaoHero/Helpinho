import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHelpinhoStepOneComponent } from './create-helpinho-step-one.component';

describe('CreateHelpinhoStepOneComponent', () => {
  let component: CreateHelpinhoStepOneComponent;
  let fixture: ComponentFixture<CreateHelpinhoStepOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHelpinhoStepOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHelpinhoStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
