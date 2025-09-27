import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  searchContainerFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 8,
    color: COLORS.gray400,
  },
  input: {
    flex: 1,
    height: '100%',
    color: COLORS.gray800,
    fontSize: 16,
    padding: 0,
    fontFamily: 'System',
  },
  clearButton: {
    padding: 4,
    color: COLORS.gray400,
  },
  clearButtonActive: {
    color: COLORS.gray600,
  },
  loadingIndicator: {
    marginLeft: 8,
  },
});
