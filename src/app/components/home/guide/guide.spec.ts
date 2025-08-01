import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Guide } from './guide';

describe('Guide', () => {
  let component: Guide;
  let fixture: ComponentFixture<Guide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Guide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Guide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
