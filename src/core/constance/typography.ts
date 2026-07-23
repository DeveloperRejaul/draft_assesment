import { StyleSheet } from "react-native";
import { s } from "../utils/size";

const base = StyleSheet.create({
  title_2xl:{
    fontSize: 72,
    lineHeight: 90,
    letterSpacing: -2,
  },
  title_xl:{
    fontSize: 60,
    lineHeight: 72,
    letterSpacing: -2,
  },
  title_lg:{
    fontSize: 48,
    lineHeight: 60,
    letterSpacing: -2,
  },
  title_md:{
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: -2,
  },
  title_sm:{
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: 0,
  },
  title_xs:{
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  text_xl:{
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 0,
  },
  text_lg:{
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0,
  },
  text_md:{
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  text_sm:{
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  text_xs:{
    fontSize: s(12),
    lineHeight: 18,
    letterSpacing: 0,
  }
})

export const typography = StyleSheet.create({
  title_2xl_regular:{
    ...base.title_2xl,
    fontWeight:"400",
  },
  title_2xl_medium:{
    ...base.title_2xl,
    fontWeight:"500",
  },
  title_2xl_semibold:{
    ...base.title_2xl,
    fontWeight:"600",
  },
  title_2xl_bold:{
    ...base.title_2xl,
    fontWeight:"700",
  },

  title_xl_regular:{
    ...base.title_xl,
    fontWeight:"400",
  },
  title_xl_medium:{
    ...base.title_xl,
    fontWeight:"500"
  },
  title_xl_semibold:{
    ...base.title_xl,
    fontWeight:"600",
  },
  title_xl_bold:{
    ...base.title_xl,
    fontWeight:"700",
  },

  title_lg_regular:{
    ...base.title_lg,
    fontWeight:"400",
  },
  title_lg_medium:{
    ...base.title_lg,
    fontWeight:"500",
  },
  title_lg_semibold:{
    ...base.title_lg,
    fontWeight:"600",
  },
  title_lg_bold:{
    ...base.title_lg,
    fontWeight:"700",
  },

  title_md_regular:{
    ...base.title_md,
    fontWeight:"400",
  },
  title_md_medium:{
    ...base.title_md,
    fontWeight:"500",
  },
  title_md_semibold:{
    ...base.title_md,
    fontWeight:"600",
  },
  title_md_bold:{
    ...base.title_md,
    fontWeight:"700",
  },

  title_sm_regular:{
    ...base.title_sm,
    fontWeight:"400",
  },
  title_sm_medium:{
    ...base.title_sm,
    fontWeight:"500",
  },
  title_sm_semibold:{
    ...base.title_sm,
    fontWeight:"600",
  },
  title_sm_bold:{
    ...base.title_sm,
    fontWeight:"700",
  },

  title_xs_regular:{
    ...base.title_xs,
    fontWeight:"400",
  },
  title_xs_medium:{
    ...base.title_xs,
    fontWeight:"500",
  },
  title_xs_semibold:{
    ...base.title_xs,
    fontWeight:"600",
  },
  title_xs_bold:{
    ...base.title_xs,
    fontWeight:"700",
  },

  text_xl_regular:{
    ...base.text_xl,
    fontWeight:"400",
  },
  text_xl_medium:{
    ...base.text_xl,
    fontWeight:"500",
  },
  text_xl_semibold:{
    ...base.text_xl,
    fontWeight:"600",
  },
  text_xl_bold:{
    ...base.text_xl,
    fontWeight:"700",
  },

  text_lg_regular:{
    ...base.text_lg,
    fontWeight:"400",
  },
  text_lg_medium:{
    ...base.text_lg,
    fontWeight:"500",
  },
  text_lg_semibold:{
    ...base.text_lg,
    fontWeight:"600",
  },
  text_lg_bold:{
    ...base.text_lg,
    fontWeight:"700",
  },

  text_md_regular:{
    ...base.text_md,
    fontWeight:"400",
  },
  text_md_medium:{
    ...base.text_md,
    fontWeight:"500",
  },
  text_md_semibold:{
    ...base.text_md,
    fontWeight:"600",
  },
  text_md_bold:{
    ...base.text_md,
    fontWeight:"700",
  },

  text_sm_regular:{
    ...base.text_sm,
    fontWeight:"400",
  },
  text_sm_medium:{
    ...base.text_sm,
    fontWeight:"500",
  },
  text_sm_semibold:{
    ...base.text_sm,
    fontWeight:"600",
  },
  text_sm_bold:{
    ...base.text_sm,
    fontWeight:"700",
  },

  text_xs_regular:{
    ...base.text_xs,
    fontWeight:"400",
  },
  text_xs_medium:{
    ...base.text_xs,
    fontWeight:"500",
  },
  text_xs_semibold:{
    ...base.text_xs,
    fontWeight:"600",
  },
  text_xs_bold:{
    ...base.text_xs,
    fontWeight:"700",
  },
})

