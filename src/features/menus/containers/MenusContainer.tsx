import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';

const MenusContainer = () => {
  const { menus } = useStore();
  const { t } = useTranslation();
  const [selectedMenuType, setSelectedMenuType] = useState<'daily' | 'weekly' | 'special'>('daily');

  // Filter menus by type
  const filteredMenus = menus.filter(menu => menu.type === selectedMenuType);

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

  const renderMenu = ({ item }: { item: any }) => (
    <View style={styles.menuCard}>
      <Text style={styles.menuTitle}>{item.name}</Text>
      <Text style={styles.menuDate}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
      <FlatList
        data={item.items}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
        style={styles.itemsList}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('menus.title')}</Text>

        {/* Menu Type Selector */}
        <View style={styles.tabContainer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1F2937',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  menuList: {
    flex: 1,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  menuDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  itemsList: {
    marginTop: 8,
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  itemDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: '#9CA3AF',
    backgroundColor: '#F3F4F6',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default MenusContainer;