import { StyleSheet } from "react-native";

export const GStyles = StyleSheet.create({
  row:{
    flexDirection:"row",
    alignItems:"center",
    gap: 10
  },
  rowWrap:{
    flexDirection:"row",
    alignItems:"center",
    gap: 10,
    flexWrap:"wrap"
  },
  rowBetween:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  center:{
    justifyContent:"center",
    alignItems:"center",
  },
  centerFull:{
    justifyContent:"center",
    alignItems:"center",
    flex:1,
  },
  between:{
    justifyContent:"space-between"
  },
  flex:{
    flex:1,
  },
  flexGrow :{
    flexGrow: 1,
  },
  flexWrap:{
    flexWrap:"wrap"
  },
  widthFull:{
    width:"100%"
  },
  heightFull:{
    height:"100%"
  }
})