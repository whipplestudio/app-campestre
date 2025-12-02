import { useState } from 'react';
import { Alert } from 'react-native';
import { getMemberData as getMemberDataFromService } from '../services/homeService';

export interface GuestUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

export interface Guest {
  id: number;
  relationship: string;
  user: GuestUser;
}

export interface MemberData {
  id: number;
  guests: Guest[];
}

export const useMemberData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [memberData, setMemberData] = useState<MemberData | null>(null);

  const getMemberData = async (memberId: number): Promise<MemberData | null> => {
    setLoading(true);
    setError(null);

    const result = await getMemberDataFromService(memberId);

    if (result.success && result.data) {
      setMemberData(result.data);
      setLoading(false);
      return result.data;
    } else {
      Alert.alert('Error', result.error || 'Error al obtener los datos del socio');
      setLoading(false);
      return null;
    }
  };

  return {
    getMemberData,
    loading,
    error,
    memberData,
    clearMemberData: () => setMemberData(null),
  };
};