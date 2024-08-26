import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHelpinhoStepForComponent } from './create-helpinho-step-four.component';

describe('CreateHelpinhoStepForComponent', () => {
  let component: CreateHelpinhoStepForComponent;
  let fixture: ComponentFixture<CreateHelpinhoStepForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHelpinhoStepForComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHelpinhoStepForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
