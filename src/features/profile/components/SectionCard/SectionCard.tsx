import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { styles } from './Style';
import { sectionCardProps } from '../../interfaces/interfaces';

const SectionCard: React.FC<sectionCardProps> = ({ title, rightAction, style, children }) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {rightAction}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default SectionCard;
