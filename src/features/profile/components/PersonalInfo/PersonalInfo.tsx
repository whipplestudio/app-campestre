import React from 'react';
import { View, Text, TextInput, ViewStyle } from 'react-native';
import { styles } from './Style';
import Input from '../../../../shared/components/Input/Input';

interface PersonalInfoProps {
  name: string;
  email: string;
  //phone: string;
  //address: string;
  memberSince: string | Date;
  isEditing?: boolean;
  onNameChange?: (text: string) => void;
  onEmailChange?: (text: string) => void;
  onPhoneChange?: (text: string) => void;
  onAddressChange?: (text: string) => void;
  style?: ViewStyle;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  name,
  email,
  //phone,
  //address,
  memberSince,
  isEditing = false,
  onNameChange = () => {},
  onEmailChange = () => {},
  onPhoneChange = () => {},
  onAddressChange = () => {},
  style,
}) => {
  const formatDate = (date: string | Date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Nombre</Text>
          {isEditing ? (
            <Input
              value={name}
              onChangeText={onNameChange}
              placeholder="Nombre completo"
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>{name || 'No especificado'}</Text>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Correo electrónico</Text>
          {isEditing ? (
            <Input
              value={email}
              onChangeText={onEmailChange}
              placeholder="correo@ejemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>{email || 'No especificado'}</Text>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Teléfono</Text>
          {isEditing ? (
            <Input
              //value={phone}
              onChangeText={onPhoneChange}
              placeholder="(999) 123-4567"
              keyboardType="phone-pad"
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>{/*phone || */'No especificado'}</Text>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Dirección</Text>
          {isEditing ? (
            <Input
              //value={address}
              onChangeText={onAddressChange}
              placeholder="Calle, número, colonia, ciudad"
              multiline
              style={[styles.input, styles.multilineInput]}
            />
          ) : (
            <Text style={styles.value}>{/*address || */'No especificada'}</Text>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Socio desde</Text>
          <Text style={styles.value}>{formatDate(memberSince)}</Text>
        </View>
      </View>
    </View>
  );
};

export default PersonalInfo;
