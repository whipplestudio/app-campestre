import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { styles } from './Style';

interface SectionCardProps {
  title: string;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, rightAction, style, children }) => {
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
