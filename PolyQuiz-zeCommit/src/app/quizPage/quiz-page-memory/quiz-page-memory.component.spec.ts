import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPageMemoryComponent } from './quiz-page-memory.component';

describe('QuizPageMemoryComponent', () => {
  let component: QuizPageMemoryComponent;
  let fixture: ComponentFixture<QuizPageMemoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizPageMemoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizPageMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
