import { StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.gray50,
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: COLORS.primaryExtraDark,
    },
  });

  export default styles;