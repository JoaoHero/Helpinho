import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHelpinhoStepThreComponent } from './create-helpinho-step-three.component';

describe('CreateHelpinhoStepThreComponent', () => {
  let component: CreateHelpinhoStepThreComponent;
  let fixture: ComponentFixture<CreateHelpinhoStepThreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHelpinhoStepThreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHelpinhoStepThreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
