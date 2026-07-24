import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constance/colors";
import { typography } from "../constance/typography";

export default function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaItem}>
      <Text style={[typography.text_sm_medium, styles.metaLabel]}>{label}</Text>
      <Text style={[typography.text_md_semibold, styles.metaValue]}>{value}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  metaItem: {
    minWidth: '45%',
    backgroundColor: colors.slate50,
    borderRadius: 14,
    padding: 12,
  },
  metaLabel: {
    color: colors.slate500,
    marginBottom: 4,
  },
  metaValue: {
    color: colors.slate800,
  },
})