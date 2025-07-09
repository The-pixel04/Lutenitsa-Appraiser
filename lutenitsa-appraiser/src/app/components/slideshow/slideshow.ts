import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './slideshow.html',
  styleUrl: './slideshow.css'
})
export class Slideshow implements OnInit {
  @Output() slideshowComplete = new EventEmitter<void>();
  slides = [
    'https://foodmag.eu/image/cache/catalog/ProductPictures/MlechniProdukti/KashkavaliSirene/sireneOsmonweb-700x700.jpg',
    'https://cdncloudcart.com/16372/products/images/42601/cuski-cerveni-kalifornia-1-kg-image_6585e8a32a599_800x800.jpeg',
    'https://cdncloudcart.com/16372/products/images/41931/patladzan-1-kg-image_6585e60368221_1920x1920.jpeg',
    'https://cdncloudcart.com/16372/products/images/41797/cerveni-domati-1-kg-image_6585c6b5f001b_1920x1920.jpeg'
  ];

  currentIndex = 0;
  transitionSpeed = 300;
  isActive = true;
  private intervalId!: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.startSlideshow();
  }

  startSlideshow() {
    this.intervalId = setInterval(() => {
      this.goToNextSlide();
    }, this.transitionSpeed);
  }

  goToNextSlide() {
    this.currentIndex++;

    if (this.currentIndex >= this.slides.length) {
      this.stopSlideshow();
    }
  }

  stopSlideshow() {
    clearInterval(this.intervalId);
    this.isActive = false;
    this.slideshowComplete.emit()
  }
}
