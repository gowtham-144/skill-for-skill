import 'next-auth';

// Define the shape of the user object in the session
declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Add the 'id' property here
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    id: string; // Also extend the default 'User' type if needed
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string; // And for JWT tokens
  }
}