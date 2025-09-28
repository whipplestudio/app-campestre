import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../../shared/theme/colors';
import Button from '../../../shared/components/Button/Button';
import SectionCard from '../components/SectionCard/SectionCard';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import PersonalInfo from '../components/PersonalInfo/PersonalInfo';
import FamilyMembers from '../components/FamilyMembers/FamilyMembers';
import Vehicles from '../components/Vehicles/Vehicles';
import EmergencyContact from '../components/EmergencyContact/EmergencyContact';
import useMessages from '../hooks/useMessages';

// Datos de ejemplo - reemplazar con datos reales de tu aplicación
const MOCK_FAMILY_MEMBERS = [
  { id: 1, name: 'María López', relationship: 'Esposa', age: 35, isActive: true },
  { id: 2, name: 'Carlos Pérez', relationship: 'Hijo', age: 12, isActive: true },
  { id: 3, name: 'Ana Pérez', relationship: 'Hija', age: 8, isActive: true },
];

const MOCK_VEHICLES = [
  { id: 1, plate: 'ABC-1234', model: 'Toyota RAV4 2022', isActive: true },
  { id: 2, plate: 'XYZ-5678', model: 'Honda Civic 2020', isActive: false },
];

const MOCK_EMERGENCY_CONTACT = {
  name: 'Juan Pérez',
  relationship: 'Hermano',
  phone: '555-123-4567',
};

const ProfileContainer = () => {
  const { currentUser, updateProfile, logout } = useStore();
  const { t } = useTranslation();
  const { messages } = useMessages();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    //phone: currentUser?.phone || '',
    //address: currentUser?.address || '',
    membershipType: currentUser?.membershipType || 'Premium',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (currentUser) {
      updateProfile(formData);
      setIsEditing(false);
      Alert.alert(t('common.success'), 'Perfil actualizado exitosamente');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Reset form values to current user values
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      //phone: currentUser?.phone || '',
      //address: currentUser?.address || '',
      membershipType: currentUser?.membershipType || 'Premium',
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  const handleAddFamilyMember = () => {
    // Navegar a la pantalla de agregar familiar
    Alert.alert('Agregar familiar', 'Funcionalidad en desarrollo');
  };

  const handleAddVehicle = () => {
    // Navegar a la pantalla de agregar vehículo
    Alert.alert('Agregar vehículo', 'Funcionalidad en desarrollo');
  };

  const handleEditEmergencyContact = () => {
    // Navegar a la pantalla de editar contacto de emergencia
    Alert.alert('Editar contacto de emergencia', 'Funcionalidad en desarrollo');
  };

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No se encontraron datos del usuario</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Encabezado del perfil */}
        <ProfileHeader
          name={currentUser.name}
          memberId={currentUser.id}
          membershipType={formData.membershipType}
          isActive={true}
          style={styles.profileHeader}
        />

        {/* Información personal */}
        <SectionCard 
          title={messages.PERSONAL.TITLE}
          rightAction={
            isEditing ? (
              <View style={styles.editActions}>
                <Button 
                  title={messages.CONTAINER.CANCEL}
                  onPress={handleCancel}
                  variant="secondary"
                  style={[styles.actionButton, styles.cancelButton]}
                  titleStyle={styles.cancelButtonText}
                />
                <View style={styles.buttonSpacer} />
                <Button 
                  title={messages.CONTAINER.SAVE}
                  onPress={handleSave}
                  variant="primary"
                  style={[styles.actionButton, styles.saveButton]}
                />
              </View>
            ) : (
              <Button 
                title={messages.CONTAINER.EDIT}
                onPress={handleEdit}
                variant="primary"
                style={styles.editButton}
              />
            )
          }
        >
          <PersonalInfo
            name={formData.name}
            email={formData.email}
            //phone={formData.phone}
            //address={formData.address}
            memberSince={currentUser.memberSince || new Date()}
            isEditing={isEditing}
            onNameChange={(text) => handleInputChange('name', text)}
            onEmailChange={(text) => handleInputChange('email', text)}
            onPhoneChange={(text) => handleInputChange('phone', text)}
            onAddressChange={(text) => handleInputChange('address', text)}
          />
        </SectionCard>

        {/* Familiares */}
        <SectionCard title={messages.FAMILY.TITLE}>
          <FamilyMembers 
            members={MOCK_FAMILY_MEMBERS}
            onAddMember={handleAddFamilyMember}
          />
        </SectionCard>

        {/* Vehículos */}
        <SectionCard title={messages.VEHICLES.TITLE}>
          <Vehicles 
            vehicles={MOCK_VEHICLES}
            onAddVehicle={handleAddVehicle}
          />
        </SectionCard>

        {/* Contacto de emergencia */}
        <SectionCard title={messages.EMERGENCY.TITLE}>
          <EmergencyContact
            name={MOCK_EMERGENCY_CONTACT.name}
            relationship={MOCK_EMERGENCY_CONTACT.relationship}
            phone={MOCK_EMERGENCY_CONTACT.phone}
            onEdit={handleEditEmergencyContact}
          />
        </SectionCard>

        {/* Botón de cierre de sesión */}
        <View style={styles.logoutContainer}>
          <Button
            title={messages.CONTAINER.LOGOUT}
            onPress={handleLogout}
            variant="danger"
            style={styles.logoutButton}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  profileHeader: {
    marginBottom: 16,
  },
  logoutContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionButton: {
    minWidth: 100,
    paddingHorizontal: 12,
  },
  buttonSpacer: {
    width: 8,
  },
  saveButton: {
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: COLORS.gray200,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  cancelButtonText: {
  },
  logoutButton: {
    width: '100%',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: COLORS.error,
  },
});

export default ProfileContainer;