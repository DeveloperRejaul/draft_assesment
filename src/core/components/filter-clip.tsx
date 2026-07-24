import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../constance/colors";
import { typography } from "../constance/typography";

export default function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.chip, active && styles.activeChip]}>
      <Text style={[typography.text_sm_medium, active ? styles.activeChipText : styles.chipText]}>{label}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.slate100,
    marginRight: 8,
  },

  activeChip: {
    backgroundColor: colors.brandPink500,
  },
  chipText: {
    color: colors.slate600,
  },
  activeChipText: {
    color: colors.white,
  },
})