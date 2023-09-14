import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Note {
  id?: number;
  userId?: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotesService {

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(catchError((error) => throwError(() => error)));
  }

  getById(id: number): Observable<Note> {
    return this.http.get<Note>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>('https://jsonplaceholder.typicode.com/posts',note);
  }
}
