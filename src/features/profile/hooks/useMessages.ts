import { useTranslation } from 'react-i18next';

const useMessages = () => {
  const { t } = useTranslation();
  const messages = {
    CONTAINER: {
      TITLE: t('profile.title'),
      EDIT: t('profile.edit'),
      SAVE: t('profile.save'),
      CANCEL: t('common.cancel'),
      LOGOUT: t('common.logout'),
    },
    HEADER: {
      MEMBER_ID: t('profile.memberId'),
      MEMBERSHIP_TYPE: t('profile.membershipType'),
      ACTIVE: t('common.active'),
      INACTIVE: t('common.inactive'),
    },
    PERSONAL: {
      TITLE: t('profile.sections.personalInfo'),
      NAME: t('profile.name'),
      EMAIL: t('profile.email'),
      PHONE: t('profile.phone'),
      ADDRESS: t('profile.address'),
      MEMBER_SINCE: t('profile.memberSince'),
    },
    FAMILY: {
      TITLE: t('profile.sections.familyMembers'),
      NAME: t('profile.name'),
      RELATIONSHIP: t('profile.relationship'),
      AGE: t('profile.age'),
      STATUS: t('profile.status'),
    },
    VEHICLES: {
      TITLE: t('profile.sections.vehicles'),
      ADD: t('profile.addVehicle'),
      PLATE: t('profile.plate'),
      MODEL: t('profile.model'),
      STATUS: t('profile.status'),
    },
    EMERGENCY: {
      TITLE: t('profile.sections.emergencyContact'),
      NAME: t('profile.name'),
      RELATIONSHIP: t('profile.relationship'),
      PHONE: t('profile.phone'),
    },
  };

  return { messages };
};

export default useMessages;
