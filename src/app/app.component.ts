import {  Component, OnDestroy, OnInit } from '@angular/core';
import { Note, NotesService } from './services/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  notes: Note[];
  noteTitle: string;
  noteText: string;

  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notesService.getNotes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((notes) => (this.notes = notes));
  }

  addNote() {
    this.notesService.addNote({ title: this.noteTitle, body: this.noteText })
      .subscribe((note: Note) => {
        this.notes.unshift(note);

        this.noteTitle = '';
        this.noteText = '';
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
