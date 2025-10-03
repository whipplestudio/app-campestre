import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

interface FilterCounts {
  all: number;
  breakfast: number;
  lunch: number;
  dinner: number;
  drinks: number;
  specials: number;
}

interface MenuFilterProps {
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
  counts: FilterCounts;
}

const MenuFilter: React.FC<MenuFilterProps> = ({ selectedFilter, onSelectFilter, counts }) => {
  const filters = [
    { key: 'all', label: 'Todos', count: counts.all },
    { key: 'breakfast', label: 'Desayuno', count: counts.breakfast },
    { key: 'lunch', label: 'Almuerzo', count: counts.lunch },
    { key: 'dinner', label: 'Cena', count: counts.dinner },
    { key: 'drinks', label: 'Bebidas', count: counts.drinks },
    { key: 'specials', label: 'Especiales', count: counts.specials },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              selectedFilter === filter.key && styles.selectedFilterButton,
            ]}
            onPress={() => onSelectFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.key && styles.selectedFilterText,
              ]}
            >
              {filter.label}
            </Text>
            <View style={styles.countContainer}>
              <Text style={[
                styles.countText,
                selectedFilter === filter.key && styles.selectedCountText
              ]}>
                {filter.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    minWidth: 70,
    justifyContent: 'center',
  },
  selectedFilterButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.gray700,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 6,
  },
  selectedFilterText: {
    color: COLORS.white,
  },
  countContainer: {
    backgroundColor: COLORS.gray200,
    borderRadius: 6,
    minWidth: 24,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginLeft: 6,
  },
  selectedCountText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  countText: {
    color: COLORS.gray600,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default MenuFilter;