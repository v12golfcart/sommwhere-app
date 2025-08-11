import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme';

interface Personalization {
  relevance: number;
  note: string;
}

interface WineResultCardProps {
  wineName: string;
  tastingNotes: string;
  varietal?: string;
  producer?: string;
  vintage?: string;
  region?: string;
  personalization?: Personalization | null;
  onSave?: () => void;
  onDrink?: () => void;
}

export const WineResultCard: React.FC<WineResultCardProps> = ({
  varietal,
  wineName,
  producer,
  vintage,
  region,
  tastingNotes,
  personalization,
  onSave,
  onDrink,
}) => {
  // Get emoji based on relevance score
  const getRelevanceEmoji = (relevance: number) => {
    if (relevance >= 0.8) return '🟢'; // green
    if (relevance >= 0.5) return '🟡'; // yellow
    return '🔴'; // red
  };

  return (
    <View style={styles.card}>
      {/* Varietal pill */}
      {varietal && (
        <View style={styles.varietalPill}>
          <Text style={styles.varietalText}>{varietal}</Text>
        </View>
      )}

      {/* Wine header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.wineName}>{wineName}</Text>
          {producer && <Text style={styles.producer}>{producer}</Text>}
        </View>
        {vintage && <Text style={styles.vintage}>{vintage}</Text>}
      </View>

      {/* Region subtitle */}
      {region && <Text style={styles.region}>{region}</Text>}

      {/* Divider */}
      <View style={styles.divider} />

      {/* Tasting notes */}
      {tastingNotes && <Text style={styles.tastingNotes}>{tastingNotes}</Text>}

      {/* Personalization */}
      {personalization && (
        <View style={styles.personalizationContainer}>
          <Text style={styles.personalization}>
            {getRelevanceEmoji(personalization.relevance)} {personalization.note}
          </Text>
        </View>
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
  producer: {
    fontSize: 16,
    fontFamily: 'PTSerif',
    color: colors.text,
  },
  vintage: {
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
  },

  // Personalization
  personalizationContainer: {
    marginTop: 4,
  },
  personalization: {
    marginTop: 16,
    fontSize: 15,
    fontFamily: 'PTSerif-Italic',
    fontStyle: 'italic',
    color: colors.text,
    lineHeight: 22,
  },

  // Buttons
  buttonRow: {
    marginTop: 16,
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
