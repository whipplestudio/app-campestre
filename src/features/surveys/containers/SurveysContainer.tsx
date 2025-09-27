import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useStore, SurveyResponse } from '../../../store';
import { useTranslation } from 'react-i18next';

const SurveysContainer = () => {
  const { addSurveyResponse } = useStore();
  const { t } = useTranslation();
  
  const [satisfaction, setSatisfaction] = useState(3); // Default to neutral
  const [improvements, setImprovements] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Create survey response object
    const response: SurveyResponse = {
      satisfaction,
      improvements,
      comments,
      submittedAt: new Date().toISOString(),
    };

    // Add to store
    addSurveyResponse(response);
    
    setIsSubmitting(false);
    
    // Reset form
    setSatisfaction(3);
    setImprovements('');
    setComments('');
    
    Alert.alert(t('common.success'), t('surveys.thankYou'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t('surveys.title')}</Text>
        <Text style={styles.subtitle}>{t('surveys.subtitle')}</Text>

        {/* Satisfaction Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{t('surveys.question1')}</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.ratingButton,
                  satisfaction === value && styles.selectedRatingButton,
                ]}
                onPress={() => setSatisfaction(value)}
              >
                <Text
                  style={[
                    styles.ratingText,
                    satisfaction === value && styles.selectedRatingText,
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.ratingLabels}>
            <Text style={styles.ratingLabel}>1 - {t('common.error')}</Text>
            <Text style={styles.ratingLabel}>{t('common.ok')} - 3</Text>
            <Text style={styles.ratingLabel}>5 - {t('common.success')}</Text>
          </View>
        </View>

        {/* Improvements Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{t('surveys.question2')}</Text>
          <TextInput
            style={styles.textInput}
            value={improvements}
            onChangeText={setImprovements}
            placeholder={t('surveys.question2')}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Comments Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{t('surveys.question3')}</Text>
          <TextInput
            style={styles.textInput}
            value={comments}
            onChangeText={setComments}
            placeholder={t('surveys.question3')}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? t('common.loading') : t('surveys.submit')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#6B7280',
  },
  questionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ratingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRatingButton: {
    backgroundColor: '#4A90E2',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  selectedRatingText: {
    color: '#FFFFFF',
  },
  ratingLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SurveysContainer;