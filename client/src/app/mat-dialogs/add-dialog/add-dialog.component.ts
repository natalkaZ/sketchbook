import { Component, OnInit, Inject, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { NotesService } from 'app/shared/services/notes.service';
import { Note } from 'app/shared/services/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  @ViewChild('cfcAutosize')
  @ViewChild('input') inputRef: ElementRef;

  form: FormGroup;
  imageNote: File;
  imagePreview = '';
  isNew = true;

  note: Note;
  title: string;
  description: string;
  image: any;
  _noteId: number;

  notes$: Observable<Note[]>;
  refreshNote = true;
  noteColor: any;

  contentFCAutosize: CdkTextareaAutosize;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngZone: NgZone,
    private notesService: NotesService,
    public snackBar: MatSnackBar) {
  }

  ngOnInit() {

    if (this.data) {
      this.isNew = this.data.isNew,
      this.refreshNote = this.data.refreshNote;
      this.note = this.data.note,
      this._noteId = this.data._noteId,
      this.title = this.data.title,
      this.description = this.data.description,
      this.imagePreview = this.data.image,
      this.noteColor = this.data.noteColor;
      // console.log("this.noteColor: " + this.noteColor)
    }

    this.form = new FormGroup({
      title: new FormControl(this.title ? this.title : null, [
        Validators.required,
        Validators.pattern(/^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ'а-яА-ЯёЁa-zA-Z0-9\s]*$/),
        Validators.minLength(2)
      ]),
      description: new FormControl(this.description ? this.description : null, [
        Validators.maxLength(100)
      ]),
      image: new FormControl(this.image ? this.image : null, [])
    });

    this.image = this.imagePreview;
  }

  resizeTextArea() {
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.contentFCAutosize.resizeToFitContent(true));
  }

  upload() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.imageNote = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);

  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onSubmit() {
    let obs$;
    this.form.disable();
    if (this.isNew) {
      obs$ = this.notesService.create(this.form.value.title, this.form.value.description, this.imageNote);
    } else {
      obs$ = this.notesService.update(this.data.note._id, this.form.value.title, this.form.value.description, this.imageNote);
    }

    obs$.subscribe(
      note => {
        this.note = note;
        this.openSnackBar('Changes saved!!!', 'OK');
        this.form.enable();
      },
      error => {
        this.openSnackBar(error.error.message, 'OK');
        this.form.enable();
      }
    );
  }

  add() {
    this.dialogRef.close(this.refreshNote);
    this.dialogRef.afterClosed()
      .subscribe(data => {
        this.refreshNote = data.refreshNote;
      });
  }

  edit() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
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
