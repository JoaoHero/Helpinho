import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUserApresentationComponent } from './home-user-apresentation.component';

describe('HomeUserApresentationComponent', () => {
  let component: HomeUserApresentationComponent;
  let fixture: ComponentFixture<HomeUserApresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeUserApresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUserApresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
