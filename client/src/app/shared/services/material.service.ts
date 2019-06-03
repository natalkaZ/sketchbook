import { Injectable } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Injectable({
    providedIn: 'root'
})

export class MaterialService {
    notes = []
    
    constructor(){}

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
    }
}