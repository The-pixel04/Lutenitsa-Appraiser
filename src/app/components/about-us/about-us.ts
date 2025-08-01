import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-about-us',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {
}
