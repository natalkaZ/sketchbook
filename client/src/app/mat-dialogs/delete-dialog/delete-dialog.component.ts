import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Note } from 'app/shared/services/interfaces';
import { NotesService } from 'app/shared/services/notes.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})

export class DeleteDialogComponent implements OnInit {
  refreshNote = true;
  note: Note;
  title: string;
  description: string;
  image: any;
  message: string;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public snackBar: MatSnackBar,
              private notesService: NotesService) {
  }

  ngOnInit() {
    if (this.data) {
      this.refreshNote = this.data.refreshNote;
      this.note = this.data.note,
      this.title = this.data.title,
      this.description = this.data.description;
    }
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  delete(note) {
    this.note = note;
    this.notesService.delete(this.note._id)
      .subscribe(
        res => {
          this.message = res.message;
          this.openSnackBar('Note ' + this.title + ' has been deleted!!!', 'OK');
        },
        error => {
          this.openSnackBar(error.error.message, 'OK');
        }
      );

    this.refreshNote = true;
    this.dialogRef.close(this.refreshNote);
    this.dialogRef.afterClosed()
      .subscribe(data => {
        this.refreshNote = data.refreshNote;
      });
  }

  cansel() {
    this.refreshNote = false;
    this.dialogRef.close(this.refreshNote);
    this.dialogRef.afterClosed()
      .subscribe(data => {
        this.refreshNote = data.refreshNote;
      });
  }

}
