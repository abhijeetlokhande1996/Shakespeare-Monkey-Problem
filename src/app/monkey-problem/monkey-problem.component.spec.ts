import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyProblemComponent } from './monkey-problem.component';

describe('MonkeyProblemComponent', () => {
  let component: MonkeyProblemComponent;
  let fixture: ComponentFixture<MonkeyProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonkeyProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonkeyProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
