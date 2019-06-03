import { trigger, transition, animate, style, state, query, stagger, animateChild } from '@angular/animations';

export let fade = trigger('fade', [

    state('void', style({opacity: 0})),

    transition(':enter, :leave', [ // void <=> *
      animate(500)
    ])
  ]);

export let slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({transform: 'translateY(-100%)'}),
    animate('1000ms ease-in', style({transform: 'translateY(0%)'}))
  ]),
  transition(':leave', [
    animate('1000ms ease-in', style({transform: 'translateY(-100%)'}))
  ])
]);

export let pageAnimations = trigger('pageAnimations', [
    transition(':enter', [
      query('.example-box', [
        style({opacity: 0, transform: 'translateY(-100px)'}),
        stagger(-300, [
          animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
        ])
      ], { optional: true })
    ])
  ]);

export let items = trigger('items', [
    transition(':enter', [
      style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
      animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
        style({ transform: 'scale(1)', opacity: 1 }))  // final
    ]),

    transition(':leave', [
      style({ transform: 'scale(1)', opacity: 1, height: '*' }),
      animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
       style({
         transform: 'scale(0.5)', opacity: 0,
         height: '0px', margin: '0px'
       }))
    ])
  ]);

export let list = trigger('list', [
    transition(':enter', [
      query('@items', stagger(300, animateChild()))
    ]),
  ]);
