import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Button from '../../../shared/components/Button/Button';

//Style 
import styles from './Style';

// Components
import EmergencyContact from '../components/EmergencyContact/EmergencyContact';
import FamilyMembers from '../components/FamilyMembers/FamilyMembers';
import PersonalInfo from '../components/PersonalInfo/PersonalInfo';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import SectionCard from '../components/SectionCard/SectionCard';
import Vehicles from '../components/Vehicles/Vehicles';

import useMessages from '../hooks/useMessages';
import useProfile from '../hooks/useProfile';


const ProfileContainer = () => {
  const { messages } = useMessages();
  
  const {
    isEditing,
    isEditingContactEmergency,
    formData,
    currentUser,
    handleInputChange,
    handleSave,
    handleSaveContactEmergency,
    handleEdit,
    handleEditContactEmergency,
    handleCancel,
    handleCancelContactEmergency,
    handleLogout,
    handleAddVehicle,
    handleAddFamilyMember,
  } = useProfile();

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>
          {messages.CONTAINER.DATA_USER}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <ProfileHeader
          name={currentUser?.name || messages.CONTAINER.USER}
          memberId={currentUser?.id || 'N/A'}
          membershipType={currentUser?.membershipType || 'Premium'}
          isActive={true}
          style={styles.profileHeader}
        />

        {/* Información personal */}
        <SectionCard 
          title={messages.PERSONAL.TITLE}
          rightAction={
            isEditing ? (
              null
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
            phone={formData.phone}
            address={formData.address}
            memberSince={currentUser?.memberSince || new Date()}
            isEditing={isEditing}
            onNameChange={(text) => handleInputChange('name', text)}
            onEmailChange={(text) => handleInputChange('email', text)}
            onPhoneChange={(text) => handleInputChange('phone', text)}
            onAddressChange={(text) => handleInputChange('address', text)}
            />
            { isEditing && (
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
            )}
          
        </SectionCard>

        {/* Familiares */}
        <SectionCard title={messages.FAMILY.TITLE}>
          <FamilyMembers 
            members={currentUser?.familyMembers || []} 
            onAddMember={handleAddFamilyMember} 
          />
        </SectionCard>

        {/* Vehículos */}
        <SectionCard title={messages.VEHICLES.TITLE}>
          <Vehicles 
            vehicles={currentUser?.vehicles || []}
            onAddVehicle={handleAddVehicle}
          />
        </SectionCard>

        {/* Contacto de emergencia */}
        <SectionCard title={messages.EMERGENCY.TITLE}
          rightAction={
            isEditingContactEmergency ? (
              null
            ) : (
              <Button 
                title={messages.CONTAINER.EDIT}
                onPress={handleEditContactEmergency}
                variant="primary"
                style={styles.editButton}
              />
            )
          }
          >
          <EmergencyContact 
            name={currentUser?.emergencyContact?.name || messages.CONTAINER.NO_SPECIFIED}
            relationship={currentUser?.emergencyContact?.relationship || messages.CONTAINER.NO_SPECIFIED}
            phone={currentUser?.emergencyContact?.phone || messages.CONTAINER.NO_SPECIFIED}

            isEditingContactEmergency={isEditingContactEmergency}
            onNameChange={(text) => handleInputChange('name', text)}
            onRelationshipChange={(text) => handleInputChange('relationship', text)}
            onPhoneChange={(text) => handleInputChange('phone', text)}
          />
          { isEditingContactEmergency && (
            <View style={styles.editActions}>
              <Button 
                title={messages.CONTAINER.CANCEL}
                onPress={handleCancelContactEmergency}
                variant="secondary"
                style={[styles.actionButton, styles.cancelButton]}
                titleStyle={styles.cancelButtonText}
              />
              <View style={styles.buttonSpacer} />
              <Button 
                title={messages.CONTAINER.SAVE}
                onPress={handleSaveContactEmergency}
                variant="primary"
                style={[styles.actionButton, styles.saveButton]}
              />
            </View>
          )}
        </SectionCard>

        {/* Logout Button */}
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

export default ProfileContainer;