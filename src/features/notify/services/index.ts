import { useAuthStore } from '../../auth/store/useAuthStore';

// Interface for notification data
export interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  sentDate: string;
  active: boolean;
  visibleUntil: string;
  createdAt: string;
  updatedAt: string;
}

// Interface for pagination metadata
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Interface for the API response
export interface NotificationResponse {
  success: boolean;
  data: {
    notifications: Notification[];
    meta: PaginationMeta;
  };
  timestamp: string;
  messageId: string;
  traceId: string;
}

// Interface for service response
interface ServiceResponse {
  success: boolean;
  data?: {
    notifications: Notification[];
    meta: PaginationMeta;
  };
  message?: string;
  error?: string;
  status: number;
}

// Service class for handling notification API calls
export class NotificationService {
  private baseUrl: string = `${process.env.EXPO_PUBLIC_API_URL}/notify`;

  // Fetch notifications from the API
  async getNotifications(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    order: string = 'asc',
    orderBy: string = 'title',
    active: boolean = true
  ): Promise<ServiceResponse> {
    try {
      const {token } = useAuthStore.getState();
        if (!token) {
          return {
            success: false,
            error: 'No authentication token available',
            status: 401
          };
        }

      const searchParam = search ? encodeURIComponent(search) : '';
      const url = `${this.baseUrl}?page=${page}&limit=${limit}&search=${searchParam}&order=${order}&orderBy=${orderBy}&active=${active}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'accept': '*/*',
          },
      });

      if (!response.ok) {
        let errorMessage = 'Error al cargar las notificaciones';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
            break;
          case 403:
            errorMessage = 'Acceso prohibido: No tienes permisos para ver notificaciones';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
          default:
            const errorData = await response.json().catch(() => ({}));
            errorMessage = errorData.message || `Error en la solicitud: ${response.status}`;
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      const data = await response.json();
      console.log('Notifications data:', data);

      return {
        success: true,
        data: data.data,
        message: 'Notificaciones cargadas exitosamente',
        status: response.status
      };
    } catch (error: any) {
      console.error('Error fetching notifications:', error);
      return {
        success: false,
        error: error.message || 'Error desconocido al obtener las notificaciones',
        status: 500
      };
    }
  }
}

// Export a singleton instance of the service
export const notificationService = new NotificationService();