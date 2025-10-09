import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.gray800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
    marginLeft: 8,
  },
  rewardsContainer: {
    backgroundColor: COLORS.gray50,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  rewardsHeader: {
    alignItems: 'center',
    marginBottom: 10,
  },
  rewardsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray700,
    marginBottom: 5,
  },
  rewardsSubtitle: {
    fontSize: 12,
    color: COLORS.gray500,
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  starIcon: {
    marginRight: 8,
  },
  pointsText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  catalogButton: {
    marginTop: 10,
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    color: COLORS.gray700,
    fontSize: 12,
  },
});

export default styles;