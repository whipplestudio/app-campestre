import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  listContent: {
    paddingBottom: 8,
  },
  vehicleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehiclePlate: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: 4,
  },
  vehicleModel: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  activeBadge: {
    backgroundColor: '#DEF7EC',
  },
  inactiveBadge: {
    backgroundColor: '#FDE8E8',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeText: {
    color: COLORS.primaryDark,
  },
  inactiveText: {
    color: COLORS.error,
  },
  emptyContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.gray500,
    fontStyle: 'italic',
  },
  addButtonContainer: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  addButton: {
    color: COLORS.primary,
    fontWeight: '600',
    padding: 8,
  },
});
