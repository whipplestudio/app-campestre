import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { styles } from './Style';
import Button from '@/src/shared/components/Button/Button';
import useMessages from '../../hooks/useMessages';
import Input from '@/src/shared/components/Input/Input';

interface EmergencyContactProps {
  name: string;
  relationship: string;
  phone: string;
  style?: ViewStyle;
  isEditingContactEmergency: boolean;
  onNameChange: (text: string) => void;
  onRelationshipChange: (text: string) => void;
  onPhoneChange: (text: string) => void;
  rightAction?: React.ReactNode;
}

const EmergencyContact: React.FC<EmergencyContactProps> = ({
  name,
  relationship,
  phone,
  style,
  isEditingContactEmergency,
  onNameChange,
  onRelationshipChange,
  onPhoneChange,
  rightAction
}) => {
  const { messages } = useMessages();
  return (
    <View style={[styles.container, style]}>
      <View style={styles.contactInfo}>
        <View style={styles.detailRow}>
          {isEditingContactEmergency ? (
            <><Text style={styles.detailLabel}>{messages.EMERGENCY.NAME}:</Text><Input
              value={name}
              onChangeText={onNameChange}
              placeholder={messages.EMERGENCY.NAME}
              style={styles.input} /></>
        ) : (
          <Text style={styles.contactName}>{name || messages.CONTAINER.NO_SPECIFIED}</Text>
        )}
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{messages.EMERGENCY.RELATIONSHIP}:</Text>
          {isEditingContactEmergency ? (
            <Input
            value={relationship}
            onChangeText={onRelationshipChange}
            placeholder={messages.EMERGENCY.RELATIONSHIP}
            style={styles.input}
          />
        ) : (
          <Text style={styles.detailValue}>
            {relationship || messages.CONTAINER.NO_SPECIFIED}
          </Text>
        )}
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{messages.EMERGENCY.PHONE}:</Text>
          {isEditingContactEmergency ? (
            <Input
            value={phone}
            onChangeText={onPhoneChange}
            placeholder={messages.EMERGENCY.PHONE}
            style={styles.input}
          />
        ) : (
          <Text style={[styles.detailValue, styles.phone]}>
            {phone || messages.CONTAINER.NO_SPECIFIED}
          </Text>
        )}
        </View>
      </View>
    </View>
  );
};

export default EmergencyContact;
