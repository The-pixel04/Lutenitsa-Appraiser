import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slideshow } from './slideshow';

describe('Slideshow', () => {
  let component: Slideshow;
  let fixture: ComponentFixture<Slideshow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slideshow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Slideshow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
