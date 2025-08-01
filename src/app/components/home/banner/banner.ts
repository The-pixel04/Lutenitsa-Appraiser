import { Component, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.html',
  styleUrl: './banner.css'
})
export class Banner implements OnDestroy {
  @Input() slideshowFinished = true;
  peppers = ['🍅', '🌶️', '🧄', '🧅'];
  animatedPeppers: string[] = [];
  private intervalId: any;

  ngOnInit() {
    this.animatePeppers();
  }

  animatePeppers() {
    this.intervalId = setInterval(() => {
      this.animatedPeppers = Array.from({ length: 5 },
        () => this.peppers[Math.floor(Math.random() * this.peppers.length)]
      );
    }, 1500);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
