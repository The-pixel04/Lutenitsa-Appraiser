import { inject, Injectable } from "@angular/core";
import { ErrorService } from "./error.service";
import { catchError, from, Observable, throwError } from "rxjs";
import { SupabaseService } from "./supabase.service";

@Injectable({
    providedIn: 'root'
})

export class CommentService {
    private errorService = inject(ErrorService);

    constructor(private supaBase: SupabaseService) { }


    addComment(appraiseId: number, comment: string, userId: string, email: string): Observable<void> {
        return from(
            this.supaBase.getClient()
                .from('comments')
                .insert([{ appraiseId, comment, userId, email }])
                .then(res => {
                    if (res.error) throw res.error;
                })
        ).pipe(
            catchError(error => {
                this.errorService.setError(error.message || 'Unknown error');
                return throwError(() => error);
            })
        );
    }
}