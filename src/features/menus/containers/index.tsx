import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import styles from './Style';

const index = () => {
  const { menus, setMenus } = useStore();
  const { t } = useTranslation();
  const [selectedMenuType, setSelectedMenuType] = useState<'daily' | 'weekly' | 'special'>('daily');
  const [isLoading, setIsLoading] = useState(true);

  // Cargar menús al montar el componente
  useEffect(() => {
    // Aquí podrías hacer una llamada a tu API para cargar los menús
    // Por ahora, usamos los datos de ejemplo del store
    setIsLoading(false);
  }, []);

  // Filtrar menús por tipo
  const filteredMenus = (menus || []).filter(menu => menu.type === selectedMenuType);

  const renderMenuItem = ({ item }: { item: any }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemCategory}>{item.category}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('menus.title')}</Text>
        
        {filteredMenus.length === 0 && (
          <Text style={styles.noMenusText}>
            {t('menus.noMenusAvailable')}
          </Text>
        )}

        {/* Menu Type Selector */}
        <View style={styles.tabContainer}>
          <Text style={styles.sectionTitle}>
            {t('menus.selectMenuType')}
          </Text>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedMenuType === 'daily' && styles.activeTab,
            ]}
            onPress={() => setSelectedMenuType('daily')}
          >
            <Text
              style={[
                styles.tabText,
                selectedMenuType === 'daily' && styles.activeTabText,
              ]}
            >
              {t('menus.dailyMenu')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              selectedMenuType === 'weekly' && styles.activeTab,
            ]}
            onPress={() => setSelectedMenuType('weekly')}
          >
            <Text
              style={[
                styles.tabText,
                selectedMenuType === 'weekly' && styles.activeTabText,
              ]}
            >
              {t('menus.weeklyMenu')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              selectedMenuType === 'special' && styles.activeTab,
            ]}
            onPress={() => setSelectedMenuType('special')}
          >
            <Text
              style={[
                styles.tabText,
                selectedMenuType === 'special' && styles.activeTabText,
              ]}
            >
              {t('menus.specialMenu')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Menu List */}
        <ScrollView style={styles.menuList}>
          {filteredMenus.length > 0 ? (
            filteredMenus.map(menu => (
              <View key={menu.id} style={styles.menuCard}>
                <Text style={styles.menuTitle}>{menu.name}</Text>
                <Text style={styles.menuDate}>
                  {new Date(menu.date).toLocaleDateString()}
                </Text>
                {menu.items.map((item: any) => (
                  <View key={item.id} style={styles.menuItem}>
                    <View style={styles.menuItemHeader}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPrice}>${item.price}</Text>
                    </View>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Text style={styles.itemCategory}>{item.category}</Text>
                  </View>
                ))}
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {t('menus.dailyMenu')} no disponible
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};


export default index;