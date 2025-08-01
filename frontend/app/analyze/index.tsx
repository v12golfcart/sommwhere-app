import { StyleSheet, ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/theme';
import { Page, WineResultCard, SommPromptInput } from '../../src/components';

export default function AnalyzeScreen() {
  const insets = useSafeAreaInsets();

  // Mock data for now - will be replaced with actual API response
  const mockWineResults = [
    {
      varietal: 'Cabernet Sauvignon',
      wineName: 'Insignia',
      winery: 'Joseph Phelps',
      year: '2019',
      region: 'Napa Valley, CA',
      tastingNotes:
        'Rich and opulent with layers of dark fruit, cassis, and espresso. Velvety tannins frame a long, complex finish with hints of dark chocolate and cedar.',
    },
    {
      varietal: 'Pinot Noir',
      wineName: 'Russian River Valley',
      winery: 'Williams Selyem',
      year: '2021',
      region: 'Sonoma County, CA',
      tastingNotes:
        'Elegant and refined with bright cherry and raspberry notes. Silky texture with subtle earth and spice undertones.',
    },
  ];

  const handleSave = (wineName: string) => {
    console.log('Save wine:', wineName);
  };

  const handleDrink = (wineName: string) => {
    console.log('Drink wine:', wineName);
  };

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
          {mockWineResults.map((wine, index) => (
            <WineResultCard
              key={index}
              varietal={wine.varietal}
              wineName={wine.wineName}
              winery={wine.winery}
              year={wine.year}
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
