import { Component } from '@angular/core';

@Component({
    selector: 'app-overlay',
    template: `
        <div id="overlay">
            <div class="spinner">
                <app-spinner></app-spinner>
            </div>
        </div>
    `,
    styles: [`
        #overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 2;
        }
        
        .spinner {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
    `]
})
export class OverlayComponent {}