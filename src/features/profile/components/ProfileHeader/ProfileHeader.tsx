import React from 'react';
import { View, Text, Image, ViewStyle } from 'react-native';
import { styles } from './Style';
import useMessages from '../../hooks/useMessages';

interface ProfileHeaderProps {
  name: string;
  memberId: string | number;
  membershipType: string;
  isActive?: boolean;
  photoUrl?: string;
  style?: ViewStyle;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  memberId,
  membershipType,
  isActive = true,
  photoUrl,
  style,
}) => {
  const { messages } = useMessages();
  const avatar = photoUrl ? (
    <Image source={{ uri: photoUrl }} style={styles.avatarImage} />
  ) : (
    <View style={styles.avatarPlaceholder}>
      <Text style={styles.avatarText}>{name?.charAt(0) ?? '?'}</Text>
    </View>
  );

  return (
    <View style={[styles.header, style]}>
      {avatar}
      <View style={styles.userInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.memberId}>ID: {memberId}</Text>
        <View style={styles.row}>
          <Text style={styles.membershipType}>{membershipType}</Text>
          <View style={[styles.statusPill, isActive ? styles.active : styles.inactive]}>
            <Text style={[styles.statusText, isActive ? styles.activeText : styles.inactiveText]}>
              {isActive ? messages.HEADER.ACTIVE : messages.HEADER.INACTIVE}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
