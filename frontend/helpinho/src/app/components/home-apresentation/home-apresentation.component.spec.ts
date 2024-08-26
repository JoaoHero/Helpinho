import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeApresentationComponent } from './home-apresentation.component';

describe('HomeApresentationComponent', () => {
  let component: HomeApresentationComponent;
  let fixture: ComponentFixture<HomeApresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeApresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeApresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
