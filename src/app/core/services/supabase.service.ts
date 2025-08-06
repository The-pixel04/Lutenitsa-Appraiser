import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      environment.apiUrl,
      environment.apiKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
    );
  }

  getClient() {
    return this.client;
  }
}