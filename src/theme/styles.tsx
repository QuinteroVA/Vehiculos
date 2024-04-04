import { StyleSheet } from "react-native"

export const styles=StyleSheet.create({
  content:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    gap:10
  },
  inputs:{
    width:"90%"
  },
  buttons:{
    width: "40%",
    margin:10
  },
  textNavigation: {
    marginTop:10,
    fontSize:15,
    color: '#976fc4',
    fontWeight:'bold'
  },
  contentHome:{
    flex:1,
    marginVertical:50,
    marginHorizontal:20
  },
  headerHome:{
    flexDirection:'row',
    gap:15,
    alignItems:'center'
  }
})