import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Note, NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent implements OnInit {
  note$: Observable<Note>;
  notes: Note[];
  currentId: number;

  constructor(
    private notesService: NotesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.note$ = this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        return this.notesService.getById(+params['id']).pipe(
          catchError(() => {
            this.router.navigate(['/']);
            return EMPTY
          })
        );
      })
    );
  }
}
