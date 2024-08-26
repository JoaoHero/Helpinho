import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpinhoListComponent } from './helpinho-list.component';

describe('HelpinhoListComponent', () => {
  let component: HelpinhoListComponent;
  let fixture: ComponentFixture<HelpinhoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpinhoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpinhoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
