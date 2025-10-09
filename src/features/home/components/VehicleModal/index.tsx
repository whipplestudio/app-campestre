import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Modal from '../../../../shared/components/Modal/Modal';
import Select from '../../../../shared/components/Select/Select';
import { COLORS } from '../../../../shared/theme/colors';
import { useProfileStore } from '../../../profile/store/useProfileStore';

interface VehicleModalProps {
  visible: boolean;
  onClose: () => void;
  onVehicleSelect: (vehicleId: string, vehicleName: string) => void;
}

const VehicleModal: React.FC<VehicleModalProps> = ({ visible, onClose, onVehicleSelect }) => {
  const { profile } = useProfileStore();
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');

  const vehicles = profile?.vehicles?.filter(v => v.isActive) || [];
  
  const vehicleOptions = vehicles.map(vehicle => ({
    label: `${vehicle.model} - ${vehicle.plate}`,
    value: vehicle.id.toString(),
  }));

  const handleVehicleChange = (value: string | number) => {
    setSelectedVehicle(value.toString());
  };

  const handleConfirm = () => {
    if (!selectedVehicle) {
      return;
    }
    
    // Find the selected vehicle to get its name
    const selectedVehicleData = vehicles.find(v => v.id.toString() === selectedVehicle);
    if (selectedVehicleData) {
      onVehicleSelect(selectedVehicle, selectedVehicleData.model);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title="Seleccionar vehículo"
      onCancel={onClose}
      onConfirm={handleConfirm}
      confirmText="Solicitar"
      cancelText="Cancelar"
      disableConfirmButton={!selectedVehicle} // Disable confirm button when no vehicle is selected
    >
      <View style={{ padding: 10 }}>
        <Select
          placeholder="Elige tu vehículo"
          options={vehicleOptions}
          selectedValue={selectedVehicle}
          onValueChange={handleVehicleChange}
        />
      </View>
    </Modal>
  );
};

export default VehicleModal;