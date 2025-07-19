import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { from, map, Observable } from "rxjs";
import { Appraise } from "../../models/appraise.model";


@Injectable({
    providedIn: 'root'
})

export class AppraiseService {
    private apiUrl = environment.apiUrl;
    private supaBase: SupabaseClient;

    constructor() {
        this.supaBase = createClient(this.apiUrl, environment.apiKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: true,
                detectSessionInUrl: true
            }
        })
    }

    getAllAppraises(): Observable<Appraise[]> {
        return from(this.supaBase
            .from('appraises')
            .select('*'))
            .pipe(
                map(res => {
                    if (res.error) {
                        throw res.error
                    }
                    return res.data as Appraise[];
                })
            );
    }
}