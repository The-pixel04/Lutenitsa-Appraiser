import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

}
