import React from 'react';
import { View, Text, FlatList, ListRenderItem, ViewStyle } from 'react-native';
import { styles } from './Style';
import { COLORS } from '../../../../shared/theme/colors';

interface Vehicle {
  id: string | number;
  plate: string;
  model: string;
  isActive: boolean;
}

interface VehiclesProps {
  vehicles: Vehicle[];
  onAddVehicle?: () => void;
  style?: ViewStyle;
}

const Vehicles: React.FC<VehiclesProps> = ({
  vehicles = [],
  onAddVehicle,
  style,
}) => {
  const renderItem: ListRenderItem<Vehicle> = ({ item }) => (
    <View style={styles.vehicleItem}>
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehiclePlate}>{item.plate}</Text>
        <Text style={styles.vehicleModel}>{item.model}</Text>
      </View>
      <View style={[
        styles.statusBadge,
        item.isActive ? styles.activeBadge : styles.inactiveBadge
      ]}>
        <Text style={[
          styles.statusText,
          item.isActive ? styles.activeText : styles.inactiveText
        ]}>
          {item.isActive ? 'Activo' : 'Inactivo'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay vehículos registrados</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
      {onAddVehicle && (
        <View style={styles.addButtonContainer}>
          <Text style={styles.addButton} onPress={onAddVehicle}>
            + Agregar vehículo
          </Text>
        </View>
      )}
    </View>
  );
};

export default Vehicles;
