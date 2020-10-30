import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note, Message } from './interfaces';

@Injectable({
    providedIn: 'root'
})

export class NotesService {
    constructor(private http: HttpClient) {}

    fetch(): Observable<Note[]> {
        return this.http.get<Note[]>('/api/notes');
    }

    getById(id: string): Observable<Note> {
        return this.http.get<Note>(`/api/notes/${id}`);
    }

    create(title: string, description?: string, image?: File): Observable<Note> {
        const fd = new FormData();

        if (image) {
            fd.append('image', image, image.name);
        }

        fd.append('description', description);
        fd.append('title', title);

        return this.http.post<Note>('api/notes/', fd);
    }

    update(id: string, title: string, description?: string, image?: File): Observable<Note> {
        const fd = new FormData();

        if (image) {
            fd.append('image', image, image.name);
        }

        fd.append('description', description);
        fd.append('title', title);

        return this.http.patch<Note>(`/api/notes/${id}`, fd);
    }

    delete(id: string): Observable<Message> {
        return this.http.delete<Message>(`/api/notes/${id}`);
    }

}
