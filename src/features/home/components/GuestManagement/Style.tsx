import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8FAFC', // Light blue-tinged background
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: COLORS.gray800,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.gray800,
    marginLeft: 10,
  },
  guestSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 12,
    textAlign: 'center',
  },
  pasesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: COLORS.gray500,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  pasesText: {
    fontSize: 15,
    color: COLORS.gray700,
    fontWeight: '500',
  },
  activeLabel: {
    backgroundColor: '#93C5FD', // Soft blue
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  activeLabelText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 12,
  },
  filledButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderWidth: 0,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: COLORS.gray500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  filledButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7', // Light yellow pastel background
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    color: COLORS.gray800,
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
});

export default styles;