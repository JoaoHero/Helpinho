import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpinhosLoadingComponent } from './helpinhos-loading.component';

describe('HelpinhosLoadingComponent', () => {
  let component: HelpinhosLoadingComponent;
  let fixture: ComponentFixture<HelpinhosLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpinhosLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpinhosLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
