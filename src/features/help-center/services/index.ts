import { useAuthStore } from '../../auth/store/useAuthStore';
import { FAQ, HelpCenterResponse } from '../interfaces';

export const helpCenterService = {
  // Obtener preguntas frecuentes
  getFAQs: async (): Promise<HelpCenterResponse> => {
    const { token } = useAuthStore.getState();
    if (!token) {
      throw new Error('No authentication token available');
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/help-center`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 400) {
          throw new Error(`Petición inválida. Verifica los parámetros. Detalles: ${errorText}`);
        } else if (response.status === 401) {
          throw new Error('No autorizado. Por favor inicia sesión nuevamente.');
        } else if (response.status === 404) {
          throw new Error('No encontrado. Detalles: ' + errorText);
        } else {
          throw new Error(`Error en la solicitud: ${response.status}. Detalles: ${errorText}`);
        }
      }

      const result: HelpCenterResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
    }
  },
};