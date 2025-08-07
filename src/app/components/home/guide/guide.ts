import { Component } from '@angular/core';
import { trigger, transition, style, animate, stagger, query, useAnimation } from '@angular/animations';
import { bounceIn, pulse } from 'ng-animate';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-guide',
    imports: [RouterLink],
    templateUrl: './guide.html',
    styleUrl: './guide.css',
    animations: [
        trigger('stepAnimation', [
            transition('* => *', [
                query(':enter', [
                    style({ opacity: 0, transform: 'translateY(20px)' }),
                    stagger(100, [
                        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
                    ])
                ], { optional: true })
            ])
        ]),
        trigger('pulse', [
            transition('* => *', useAnimation(pulse, {
                params: { timing: 1, delay: 0 }
            }))
        ]),
        trigger('bounce', [
            transition(':enter', useAnimation(bounceIn, {
                params: { timing: 1, delay: 0 }
            }))
        ])
    ]
})
export class Guide {
    currentStep = 0;
    steps = [
        {
            emoji: '🔍',
            title: 'Explore the Catalog',
            description: 'Browse through different lutenitsa brands and varieties'
        },
        {
            emoji: '⭐',
            title: 'Rate Your Experience',
            description: 'Evaluate taste, texture, aroma, and appearance'
        },
        {
            emoji: '📝',
            title: 'Share Your Thoughts',
            description: 'Add comments about what you liked or disliked'
        },
        {
            emoji: '📊',
            title: 'See Community Ratings',
            description: 'Compare your ratings with others'
        }
    ];

    nextStep() {
        this.currentStep = (this.currentStep + 1) % this.steps.length;
    }

    prevStep() {
        this.currentStep = (this.currentStep - 1 + this.steps.length) % this.steps.length;
    }
}
