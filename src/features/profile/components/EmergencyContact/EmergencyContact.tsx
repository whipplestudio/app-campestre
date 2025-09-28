import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { styles } from './Style';

interface EmergencyContactProps {
  name: string;
  relationship: string;
  phone: string;
  onEdit?: () => void;
  style?: ViewStyle;
}

const EmergencyContact: React.FC<EmergencyContactProps> = ({
  name,
  relationship,
  phone,
  onEdit,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.contactInfo}>
        <View style={styles.contactHeader}>
          <Text style={styles.contactName}>{name || 'No especificado'}</Text>
          {onEdit && (
            <Text style={styles.editButton} onPress={onEdit}>
              Editar
            </Text>
          )}
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Parentesco:</Text>
          <Text style={styles.detailValue}>
            {relationship || 'No especificado'}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Teléfono:</Text>
          <Text style={[styles.detailValue, styles.phone]}>
            {phone || 'No especificado'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EmergencyContact;
