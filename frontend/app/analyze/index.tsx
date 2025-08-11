import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/theme';
import { Page, WineResultCard, SommPromptInput } from '../../src/components';
import { useCaptureSessionStore, useAuthStore } from '../../src/stores';
import { analyzeImage } from '../../src/services';

interface Wine {
  wineName: string;
  tastingNotes: string;
  varietal?: string;
  producer?: string;
  vintage?: string;
  region?: string;
}

interface WineResponse {
  wines: Wine[];
}

export default function AnalyzeScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wineResults, setWineResults] = useState<Wine[]>([]);
  // const insets = useSafeAreaInsets();

  // get data from store
  const photoUri = useCaptureSessionStore((state) => state.photoUri);
  const sommPrompt = useCaptureSessionStore((state) => state.sommPrompt);
  const tasteProfile = useAuthStore((state) => state.user?.tasteProfile);

  useEffect(() => {
    const analyze = async () => {
      if (!photoUri) {
        setError('No photo to analyze');
        return;
      }

      try {
        setLoading(true);
        const results = (await analyzeImage(photoUri, tasteProfile, sommPrompt)) as WineResponse;
        setWineResults(results.wines);
      } catch (err) {
        console.error('Error analyzing photo:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    analyze();
  }, []);

  const handleSave = (wineName: string) => {
    console.log('Save wine:', wineName);
  };

  const handleDrink = (wineName: string) => {
    console.log('Drink wine:', wineName);
  };

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // 64 for header height
    >
      <Page edges={['left', 'right', 'bottom']} style={styles.page}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          // keyboardDismissMode="on-drag"
        >
          {wineResults.map((wine, index) => (
            <WineResultCard
              key={index}
              varietal={wine.varietal}
              wineName={wine.wineName}
              producer={wine.producer}
              vintage={wine.vintage}
              region={wine.region}
              tastingNotes={wine.tastingNotes}
              onSave={() => handleSave(wine.wineName)}
              onDrink={() => handleDrink(wine.wineName)}
            />
          ))}
        </ScrollView>

        {/* Somm input bar */}
        <View style={styles.inputWrapper}>
          <View style={styles.inputInnerWrapper}>
            <SommPromptInput
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              iconColor={colors.primary}
              placeholderTextColor={colors.textMuted}
              placeholder="Ask me anything about these wines..."
            />
          </View>
        </View>
      </Page>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  scrollContent: {
    paddingBottom: 20, // Just some breathing room
  },
  inputWrapper: {
    // No longer absolute positioned
  },
  inputInnerWrapper: {
    backgroundColor: colors.background,
    paddingTop: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  inputContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: 16,
    marginBottom: 0,
  },
  input: {
    color: colors.text,
  },
});
