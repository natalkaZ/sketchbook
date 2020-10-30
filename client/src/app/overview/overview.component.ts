import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DeleteDialogComponent } from 'app/mat-dialogs/delete-dialog/delete-dialog.component';
import { AddDialogComponent } from 'app/mat-dialogs/add-dialog/add-dialog.component';
import { NotesService } from 'app/shared/services/notes.service';
import { Note } from 'app/shared/services/interfaces';
import { Observable } from 'rxjs';
import { items } from 'app/shared/classes/animations';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    items
  ]
})

export class OverviewComponent implements OnInit {

  addDialogRef: MatDialogRef<AddDialogComponent>;
  delDialogRef: MatDialogRef<DeleteDialogComponent>;

  @ViewChild('floating') floatingRef: ElementRef;

  note: Note;
  title: string;
  _noteId: number;
  description: string;
  imageSrc: File;
  isNew = true;
  noteSelected: any;

  notes: Note[] = [];
  notes$: Observable<Note[]>;
  data: any;
  refreshNote = true;
  noteColor: any;

  constructor(public dialog: MatDialog,
              private notesService: NotesService,
              private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.notes$ = this.notesService.fetch();
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }

  getBackgroundColor() {
    const element = document.querySelector('.mat-card');
    const style = getComputedStyle(element);
    const backgroundColor = style.backgroundColor;
    return this.noteColor = backgroundColor;
  }

  addNote() {
    this.isNew = true;
    this.refreshNote = true;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    dialogConfig.data = {
      isNew: this.isNew,
      refreshNote: this.refreshNote,
      note: this.note,
      noteId: this._noteId,
      title: this.title,
      description: this.description,
      image: this.imageSrc
    };

    this.addDialogRef = this.dialog.open(AddDialogComponent, dialogConfig);

    this.addDialogRef
      .afterClosed()
      .subscribe(data => {
        this.refreshNote = data;
        this.refresh();
      });
  }

  editNote(note: Note) {
    this.note = note;
    this.isNew = false;
    this.getBackgroundColor();

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    if (this.note) {
      dialogConfig.data = {
        isNew: this.isNew,
        refreshNote: this.refreshNote,
        note: this.note,
        noteId: this.note._noteId,
        title: this.note.title,
        description: this.note.description,
        image: this.note.imageSrc,
        noteColor: this.noteColor
      };
    }

    this.addDialogRef = this.dialog.open(AddDialogComponent, dialogConfig);

    this.addDialogRef
      .afterClosed()
      .subscribe(data => {
        this.refreshNote = data;
        this.refresh();
      });
  }

  deleteNote(note: Note) {
    this.note = note;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    if (this.note) {
      dialogConfig.data = {
        isNew: this.isNew,
        refreshNote: this.refreshNote,
        note: this.note,
        noteId: this.note._noteId,
        title: this.note.title,
        description: this.note.description,
        image: this.note.imageSrc
      };
    }

    this.delDialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    this.delDialogRef
      .afterClosed()
      .subscribe(data => {
        this.refreshNote = data;
        this.refresh();
      });
  }

  refresh() {
    if (this.refreshNote) {
      this.notes$ = this.notesService.fetch();
      this.changeDetectorRefs.detectChanges();
    }
    this.refreshNote = !this.refreshNote;
    return false;
  }

}
