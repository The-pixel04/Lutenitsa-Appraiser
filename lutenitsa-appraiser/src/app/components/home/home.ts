import { Component } from '@angular/core';
import { Slideshow } from "../slideshow/slideshow";

@Component({
  selector: 'app-home',
  imports: [Slideshow],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  slideshowFinished = false;

  onSlideshowComplete() {
    this.slideshowFinished = true;
  }
}
