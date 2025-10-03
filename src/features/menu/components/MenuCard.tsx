import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../../shared/components/Button';
import Card from '../../../shared/components/Card';
import { COLORS } from '../../../shared/theme/colors';

interface Menu {
  id: string;
  name: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'drinks' | 'specials';
  uploadDate: string;
  fileSize: string;
  rating: number;
  isFeatured: boolean;
  image?: string;
}

interface MenuCardProps {
  menu: Menu;
  onDownloadPress: () => void;
  onViewPress: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, onDownloadPress, onViewPress }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        {/* Menu Image Space */}
        <View style={styles.imageContainer}>
          {menu.image ? (
            <Image source={{ uri: menu.image }} style={styles.image} />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="image-outline" size={40} color={COLORS.gray400} />
              <Text style={styles.placeholderText}>Imagen del menú</Text>
            </View>
          )}
          {/* Overlay View Icon */}
          <TouchableOpacity 
            style={styles.overlayViewButton} 
            onPress={onViewPress}
          >
            <Ionicons name="eye-outline" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        
        {/* Menu Info */}
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.menuName} numberOfLines={2}>{menu.name}</Text>
            {menu.isFeatured && (
              <View style={styles.featuredTag}>
                <Ionicons name="star" size={12} color={COLORS.white} />
                <Text style={styles.featuredText}>Destacado</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.description} numberOfLines={2}>{menu.description}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color={COLORS.gray500} />
              <Text style={styles.metaText}>{menu.uploadDate}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Ionicons name="document-text-outline" size={14} color={COLORS.gray500} />
              <Text style={styles.metaText}>{menu.fileSize}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Ionicons name="star" size={14} color={COLORS.warning} />
              <Text style={styles.metaText}>{menu.rating}</Text>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <Button
              text="Descargar"
              onPress={onDownloadPress}
              icon={<Ionicons name="download-outline" size={16} color={COLORS.white} />}
              style={styles.downloadButton}
              titleStyle={styles.buttonText}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: COLORS.gray100,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  overlayViewButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  placeholderText: {
    fontSize: 8,
    color: COLORS.gray500,
    textAlign: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  menuName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
    marginRight: 8,
  },
  featuredTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warning,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  featuredText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: '600',
    marginLeft: 2,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 10,
    lineHeight: 18,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.gray600,
    marginLeft: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 8,
    marginRight: 8,
  },
  viewButton: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MenuCard;