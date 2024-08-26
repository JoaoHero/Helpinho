import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHelpinhoComponent } from './create-helpinho.component';

describe('CreateHelpinhoComponent', () => {
  let component: CreateHelpinhoComponent;
  let fixture: ComponentFixture<CreateHelpinhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHelpinhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHelpinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
