import { Component } from '@angular/core';
import { Slideshow } from "../slideshow/slideshow";
import { Banner } from "./banner/banner";
import { Guide } from "./guide/guide";

@Component({
  selector: 'app-home',
  imports: [Slideshow, Banner, Guide],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  slideshowFinished = false;

  onSlideshowComplete() {
    this.slideshowFinished = true;
  }
}
