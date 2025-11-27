import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';

//Obtener el toekn
import { useAuthStore } from '../../auth/store/useAuthStore';

// Get user information from auth service
// const getUserInfo = () => {
//   // Using mock user data from auth service
//   return {
//     id: '22308', // Member number as requested
//     name: 'Mariana Landy Jimenez',
//     address: 'Privada Jazmín No. 101 Col. Montealegre',
//     city: 'Tampico, Tamaulipas',
//     postalCode: '89210',
//     memberSince: new Date('2020-05-15'),
//     membershipType: 'Premium',
//   };
// };

// Mock data for account statements with detailed information
export const accountStatementService = {
  getAccountStatements: async (clubMemberId?: number, page: number = 1, limit: number = 5) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/account-statements/member/${clubMemberId}?page=${page}&limit=${limit}`, 
        {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${useAuthStore.getState().token}` 
          },
        }
      );
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Error al obtener los estados de cuenta');
      }

      const data = await response.json();
      return data.data;
      
    } catch (error) {
      console.error('Error en getAccountStatements:', error);
      throw error;
    }
  },
  
  getAccountStatementById: async (id: string) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/account-statements/${id}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useAuthStore.getState().token}`
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Error al obtener el estado de cuenta');
      }

      const data = await response.json();
      return data.data
    } catch (error) {
      console.error('Error en getAccountStatementById:', error);
      throw error;
    }
  },
  
  downloadAccountStatement: async (id: string) => {
    try {
      // Find the statement to download
      const statement = await accountStatementService.getAccountStatementById(id);
      
      if (!statement) {
        throw new Error('Statement not found');
      }

      // Get the asset based on the file name
      let assetModule;
      if (statement.fileName.includes('agosto')) {
        assetModule = require('../../../../assets/estados-cuenta/22308-agosto.pdf');
      } else if (statement.fileName.includes('septiembre')) {
        assetModule = require('../../../../assets/estados-cuenta/22308-septiembre.pdf');
      } else {
        throw new Error('Unknown file');
      }

      // Create an Asset object from the module
      const asset = Asset.fromModule(assetModule);
      
      // Download the asset if not already downloaded
      if (!asset.localUri) {
        await asset.downloadAsync();
      }

      // Get the destination path in the document directory
      const destinationUri = `${FileSystem.documentDirectory}${statement.fileName}`;
      
      // Copy the asset file to the document directory
      await FileSystem.copyAsync({
        from: asset.localUri || asset.uri,
        to: destinationUri,
      });

      // Return the destination URI
      return destinationUri;
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  }
};