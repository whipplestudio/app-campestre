import React from 'react';
import { View, Text, TextInput, ViewStyle } from 'react-native';
import { styles } from './Style';
import Input from '../../../../shared/components/Input/Input';
import useMessages from '../../hooks/useMessages';
import { userProfile } from '../../interfaces/interfaces';

const PersonalInfo: React.FC<userProfile> = ({
  name,
  email,
  phone,
  address,
  memberSince,
  isEditing = false,
  onNameChange = () => {},
  onEmailChange = () => {},
  onPhoneChange = () => {},
  onAddressChange = () => {},
  style,
}) => {
  const { messages } = useMessages();
  const formatDate = (date: string | Date | undefined): string => {
    if (!date) return messages.CONTAINER.NO_SPECIFIED;
    
    try {
      const d = new Date(date);
      // Check if the date is valid
      if (isNaN(d.getTime())) return messages.CONTAINER.NO_SPECIFIED;
      
      return d.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return messages.CONTAINER.NO_SPECIFIED;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>{messages.PERSONAL.NAME}</Text>
          {isEditing ? (
            <Input
              value={name}
              onChangeText={onNameChange}
              placeholder={messages.FAMILY.NAME}
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>{name || messages.CONTAINER.NO_SPECIFIED}</Text>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>{messages.PERSONAL.EMAIL}</Text>
          {isEditing ? (
            <Input
              value={email}
              onChangeText={onEmailChange}
              placeholder={messages.CONTAINER.EXAMPLE_EMAIL}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>{email || messages.CONTAINER.NO_SPECIFIED}</Text>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>{messages.PERSONAL.PHONE}</Text>
          {isEditing ? (
            <Input
              value={phone}
              onChangeText={onPhoneChange}
              placeholder="(999) 123-4567"
              keyboardType="phone-pad"
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>{phone || messages.CONTAINER.NO_SPECIFIED}</Text>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>{messages.PERSONAL.ADDRESS}</Text>
          {isEditing ? (
            <Input
              value={address}
              onChangeText={onAddressChange}
              placeholder={messages.CONTAINER.EXAMPLE_ADDRESS}
              multiline
              style={[styles.input, styles.multilineInput]}
            />
          ) : (
            <Text style={styles.value}>{address || messages.CONTAINER.NO_SPECIFIED}</Text>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>{messages.PERSONAL.MEMBER_SINCE}</Text>
          <Text style={styles.value}>{formatDate(memberSince)}</Text>
        </View>
      </View>
    </View>
  );
};

export default PersonalInfo;
