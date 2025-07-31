import { Injectable, signal, inject } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { User } from "../../models/user.model";
import { catchError, from, map, Observable, tap, throwError } from "rxjs";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { ErrorService } from "./error.service";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private apiUrl = environment.apiUrl;
    private apiKey = environment.apiKey;
    private _isAuthenticated = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);
    private supaBase: SupabaseClient;
    private errorService = inject(ErrorService);

    public isAuthenticated = this._isAuthenticated.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    constructor() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isAuthenticated.set(true);
        }

        this.supaBase = createClient(
            this.apiUrl,
            this.apiKey,
            {
                auth: {
                    detectSessionInUrl: false,
                    autoRefreshToken: false
                }
            }
        );
    }

    register(email: string, password: string, rePassword: string): Observable<User> {
        if (password !== rePassword) {
            this.errorService.setError("Passwords don't match");
            throw new Error("Passwords don't match");
        }

        return from(
            this.supaBase.auth.signUp({
                email,
                password,
            })
        ).pipe(
            map(response => {
                if (response.error || !response.data.user) {
                    throw response.error || new Error("User registration failed");
                }
                console.log(response.data)
                return response.data.user as User
            }),
            catchError(error => {
                this.errorService.setError(error?.message || "User registration failed");
                return throwError(() => error);
            }),
            tap((user) => {
                this._currentUser.set(user);
                this._isAuthenticated.set(true);
                localStorage.setItem('currentUser', JSON.stringify(user));
            }),
        )
    }

    login(email: string, password: string): Observable<User> {
        return from(
            this.supaBase.auth.signInWithPassword({
                email,
                password,
            })
        ).pipe(
            map(response => {
                if (response.error || !response.data.user) {
                    throw response.error || new Error("User login failed");
                }
                return response.data.user as User;
            }),
            catchError(error => {
                this.errorService.setError(error?.message || "User login failed")
                return throwError(() => error);
            }),
            tap((user) => {
                this._currentUser.set(user);
                this._isAuthenticated.set(true);
                localStorage.setItem('currentUser', JSON.stringify(user));
            }),
        )
    }

    logout(): Observable<void> {
        return from(
            this.supaBase.auth.signOut()
        ).pipe(
            tap(() => {
                this._currentUser.set(null);
                this._isAuthenticated.set(false);
                localStorage.removeItem('currentUser');
            }),
            map(() => void 0)
        )
    }
}