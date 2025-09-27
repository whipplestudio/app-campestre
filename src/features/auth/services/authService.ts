// Mock login function that simulates an API call
const login = async (email: string, password: string): Promise<boolean> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock validation - in a real app, this would be a server call
      const isValid = email && password;
      resolve(!!isValid);
    }, 1000);
  });
};

export const authService = {
  login,
};
