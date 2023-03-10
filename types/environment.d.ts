declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_API_URL: string;
        MONGODB_URI: string,
        MONGODB_URI_DEV: string,
        GOOGLE_ID: string,
        GOOGLE_SECRET: string
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}