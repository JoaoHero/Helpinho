import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHelpinhoStepTwoComponent } from './create-helpinho-step-two.component';

describe('CreateHelpinhoStepTwoComponent', () => {
  let component: CreateHelpinhoStepTwoComponent;
  let fixture: ComponentFixture<CreateHelpinhoStepTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHelpinhoStepTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHelpinhoStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
