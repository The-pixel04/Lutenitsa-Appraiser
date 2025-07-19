import { Component, Input } from '@angular/core';
import { Appraise } from '../../../models/appraise.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appraise-card',
  imports: [DatePipe],
  templateUrl: './appraise-card.html',
  styleUrl: './appraise-card.css'
})
export class AppraiseCard {
  @Input() appraise!: Appraise;

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}
