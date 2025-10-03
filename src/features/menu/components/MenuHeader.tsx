import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../shared/theme/colors';
import Button from '../../../shared/components/Button';

interface MenuHeaderProps {
  menuCount: number;
  onDownloadPress: () => void;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ menuCount, onDownloadPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.iconContainer}>
          <Ionicons name="restaurant-outline" size={40} color={COLORS.primary} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Menús</Text>
          <Text style={styles.description}>Restaurante del Club</Text>
          <Text style={styles.menuCount}>{menuCount} menús</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="Descargar Todo"
          onPress={onDownloadPress}
          variant="outline"
          style={styles.downloadButton}
          titleStyle={styles.downloadButtonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 4,
  },
  menuCount: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  buttonContainer: {
    marginLeft: 16,
  },
  downloadButton: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  downloadButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MenuHeader;