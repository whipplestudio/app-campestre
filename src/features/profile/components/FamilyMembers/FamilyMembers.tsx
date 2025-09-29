import React from 'react';
import { FlatList, ListRenderItem, Text, View, ViewStyle } from 'react-native';
import { styles } from './Style';
import useMessages from '../../hooks/useMessages';

interface FamilyMember {
  id: string | number;
  name: string;
  relationship: string;
  age: number;
  isActive: boolean;
}

interface FamilyMembersProps {
  members: FamilyMember[];
  onAddMember?: () => void;
  style?: ViewStyle;
}

const FamilyMembers: React.FC<FamilyMembersProps> = ({
  members = [],
  onAddMember,
  style,
}) => {
  const { messages } = useMessages();
  const renderItem: ListRenderItem<FamilyMember> = ({ item }) => (
    <View style={styles.memberItem}>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <View style={styles.memberDetails}>
          <Text style={styles.detailText}>{item.relationship}</Text>
          <Text style={styles.detailText}>• {item.age} {messages.FAMILY.AGE}</Text>
        </View>
      </View>
      <View style={[
        styles.statusBadge,
        item.isActive ? styles.activeBadge : styles.inactiveBadge
      ]}>
        <Text style={[
          styles.statusText,
          item.isActive ? styles.activeText : styles.inactiveText
        ]}>
          {item.isActive ? messages.FAMILY.ACTIVE : messages.FAMILY.INACTIVE}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={members}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{messages.FAMILY.NO_FAMILYMEMBERS}</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
      {onAddMember && (
        <View style={styles.addButtonContainer}>
          <Text style={styles.addButton} onPress={onAddMember}>
            + {messages.FAMILY.ADD_MEMBER}
          </Text>
        </View>
      )}
    </View>
  );
};

export default FamilyMembers;
