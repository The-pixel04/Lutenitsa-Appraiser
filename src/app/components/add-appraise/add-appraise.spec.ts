import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppraise } from './add-appraise';

describe('AddAppraise', () => {
  let component: AddAppraise;
  let fixture: ComponentFixture<AddAppraise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAppraise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAppraise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
