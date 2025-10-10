// Mock service for home-related data
import { UserProfile } from '../../../interfaces/user.interface';
import { authService } from '../../auth/services/authService';

// Get user vehicles (mock implementation)
export const getVehiclesForCurrentUser = async (): Promise<any[]> => {
  // In a real app, this would fetch from the server
  // For now, we'll return the vehicles from the auth service
  const user = await authService.getCurrentUser();
  return user?.vehicles || [];
};

// Call waiter service (mock implementation)
export const callWaiter = async (): Promise<{ success: boolean; message?: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock success response
  return {
    success: true,
    message: "Mesero llamado, llegará en 7 minutos",
  };
};

// Request vehicle service (mock implementation)
export const requestVehicle = async (vehicleId: string): Promise<{ success: boolean; message?: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock success response
  return {
    success: true,
    message: `Auto solicitado, llega en 5 minutos`,
  };
};