import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

//Hooks
import { useHeader } from '../Hooks/useHeader';
  
//Styles
import styles from './Style';

//Interfaces
import { MainHeaderProps } from '../Interfaces';

// Theme
import { COLORS } from '../../../../shared/theme/colors';

const MainHeader: React.FC<MainHeaderProps> = ({
  title,
  showMenu = true,
  showNotifications = true
}) => {

  const { toggleDrawer, handleNotifications } = useHeader();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showMenu && (
          <TouchableOpacity onPress={toggleDrawer} style={styles.iconButton}>
            <Ionicons name="menu-outline" size={24} color={COLORS.primaryLight} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        {showNotifications && (
          <TouchableOpacity onPress={handleNotifications} style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.primaryLight} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MainHeader;
