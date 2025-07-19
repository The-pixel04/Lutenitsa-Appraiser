import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraiseCard } from './appraise-card';

describe('AppraiseCard', () => {
  let component: AppraiseCard;
  let fixture: ComponentFixture<AppraiseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppraiseCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppraiseCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
