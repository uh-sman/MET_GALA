/// <reference types="nativewind/types" />

declare global {
    namespace NodeJS {
        interface ProcessEnv {
          SUPABASE_URL: string;
          SUPABASE_ANON_PUBLIC_KEY: string;
        }
      }
}