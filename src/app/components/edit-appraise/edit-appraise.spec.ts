import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppraise } from './edit-appraise';

describe('EditAppraise', () => {
  let component: EditAppraise;
  let fixture: ComponentFixture<EditAppraise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAppraise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAppraise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
