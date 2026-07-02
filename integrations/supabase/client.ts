export const supabase = {
  auth: {
    getSession: async () => {
      // Return a mock session so the app allows access
      return {
        data: {
          session: {
            user: { id: 'mock-user-id', email: 'user@example.com' },
            access_token: 'mock-token'
          }
        },
        error: null
      };
    }
  }
};