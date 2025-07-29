import React from 'react';
import { KeyboardAvoidingView, ScrollView, Platform, View, StyleSheet } from 'react-native';
import { colors } from '../theme';

interface Props {
  children: React.ReactNode;
  footer?: React.ReactNode;
  bounces?: boolean;
}

export default function KeyboardAvoidingContainer({ children, footer, bounces = true }: Props) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={bounces}
      >
        {children}
      </ScrollView>
      {footer && <View style={styles.footer}>{footer}</View>}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollView: {},
  scrollContent: {
    flexGrow: 1,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 34, // Account for safe area
    paddingTop: 16,
    backgroundColor: colors.background,
  },
});
