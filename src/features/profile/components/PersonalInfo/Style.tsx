import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    marginBottom: 16,
  },
  column: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 4,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: COLORS.gray900,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  input: {
    marginBottom: 0,
    paddingHorizontal: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 0,
    paddingLeft: 0,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
    paddingTop: 8,
  },
});
