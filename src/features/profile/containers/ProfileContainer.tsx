import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';

const ProfileContainer = () => {
  const { currentUser, updateProfile, logout } = useStore();
  const { t } = useTranslation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [membershipType, setMembershipType] = useState(currentUser?.membershipType || '');

  const handleSave = () => {
    if (currentUser) {
      updateProfile({ name, email, membershipType });
      setIsEditing(false);
      Alert.alert(t('common.success'), 'Profile updated successfully');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Reset form values to current user values
    setName(currentUser?.name || '');
    setEmail(currentUser?.email || '');
    setMembershipType(currentUser?.membershipType || '');
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No user data available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('profile.title')}</Text>

        <View style={styles.profileCard}>
          {/* Profile Header */}
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {currentUser.name.charAt(0)}
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{currentUser.name}</Text>
              <Text style={styles.memberId}>ID: {currentUser.id}</Text>
            </View>
          </View>

          {/* Profile Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('profile.name')}</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
              ) : (
                <Text style={styles.value}>{currentUser.name}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('profile.email')}</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              ) : (
                <Text style={styles.value}>{currentUser.email}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('profile.membershipType')}</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={membershipType}
                  onChangeText={setMembershipType}
                />
              ) : (
                <Text style={styles.value}>{currentUser.membershipType}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('profile.memberSince')}</Text>
              <Text style={styles.value}>
                {new Date(currentUser.memberSince).toLocaleDateString()}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {isEditing ? (
              <>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.buttonText}>{t('profile.save')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                  <Text style={styles.cancelButtonText}>{t('common.cancel')}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <Text style={styles.buttonText}>{t('profile.edit')}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1F2937',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  memberId: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#9CA3AF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  logoutButton: {
    flex: 0.4,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#EF4444',
  },
});

export default ProfileContainer;