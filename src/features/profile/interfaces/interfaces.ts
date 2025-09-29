import { ViewStyle } from "react-native";
import { EmergencyContact, FamilyMember, UserProfile, Vehicle } from "../../../interfaces";

<<<<<<< HEAD

export interface userProfile extends UserProfile {}
export interface vehicle extends Vehicle {}
export interface familyMember extends FamilyMember {}
export interface emergencyContact extends EmergencyContact {}
=======
export interface userProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipType?: string;
  memberSince?: Date | string; // Acepta tanto Date como string
  familyMembers?: familyMember[];
  vehicles?: vehicle[];
  emergencyContact?: emergencyContact;
}
>>>>>>> a78befbfb6e13b1edfae9e9bb9b9c9f329468856

// Tipo para la actualización del perfil
export interface updateProfileData extends Omit<Partial<userProfile>, 'memberSince'> {
  memberSince?: Date; // Al actualizar, forzamos que sea Date
}

export interface vehiclesProps {
  vehicles?: Vehicle[];
  onAddVehicle?: () => void;
  style?: ViewStyle;
}
