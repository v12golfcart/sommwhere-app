import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme';

interface WineResultCardProps {
  varietal: string;
  wineName: string;
  winery: string;
  year?: string;
  region?: string;
  tastingNotes?: string;
  onSave?: () => void;
  onDrink?: () => void;
}

export const WineResultCard: React.FC<WineResultCardProps> = ({
  varietal,
  wineName,
  winery,
  year,
  region,
  tastingNotes,
  onSave,
  onDrink,
}) => {
  return (
    <View style={styles.card}>
      {/* Varietal pill */}
      <View style={styles.varietalPill}>
        <Text style={styles.varietalText}>{varietal}</Text>
      </View>

      {/* Wine header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.wineName}>{wineName}</Text>
          <Text style={styles.winery}>{winery}</Text>
        </View>
        {year && <Text style={styles.year}>{year}</Text>}
      </View>

      {/* Region subtitle */}
      {region && <Text style={styles.region}>{region}</Text>}

      {/* Divider */}
      <View style={styles.divider} />

      {/* Tasting notes */}
      {tastingNotes && (
        <Text style={styles.tastingNotes}>{tastingNotes}</Text>
      )}

      {/* Action buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drinkButton} onPress={onDrink}>
          <Text style={styles.drinkButtonText}>Drink</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // Varietal pill
  varietalPill: {
    backgroundColor: `${colors.primary}15`, // 15% opacity
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  varietalText: {
    fontSize: 12,
    fontFamily: 'PTSerif',
    color: colors.primary,
    fontWeight: '600',
  },
  
  // Header
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  headerLeft: {
    flex: 1,
    marginRight: 16,
  },
  wineName: {
    fontSize: 18,
    fontFamily: 'Marcellus',
    color: colors.text,
    marginBottom: 2,
  },
  winery: {
    fontSize: 16,
    fontFamily: 'PTSerif',
    color: colors.text,
  },
  year: {
    fontSize: 18,
    fontFamily: 'PTSerif',
    color: colors.text,
    fontWeight: '600',
  },
  
  // Region
  region: {
    fontSize: 14,
    fontFamily: 'PTSerif',
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: 16,
  },
  
  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  
  // Tasting notes
  tastingNotes: {
    fontSize: 15,
    fontFamily: 'PTSerif',
    color: colors.text,
    lineHeight: 22,
    marginBottom: 20,
  },
  
  // Buttons
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  saveButtonText: {
    fontSize: 14,
    fontFamily: 'PTSerif',
    color: colors.text,
    fontWeight: '500',
  },
  drinkButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  drinkButtonText: {
    fontSize: 14,
    fontFamily: 'PTSerif',
    color: colors.surface,
    fontWeight: '600',
  },
});