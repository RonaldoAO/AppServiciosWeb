import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'flex-end',
    },
    button:{
        backgroundColor:'#D65C56',
        height:35,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 35, 
        marginVertical:10,
        marginHorizontal:70,
    },
    buttonText:{
        fontSize:15,
        fontWeight:'600',
        color:'white',
        letterSpacing:0.5
    },
    content:{
        height:35,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10,
        marginHorizontal:70,
    },
    contentText:{
        fontSize:13,
        fontWeight:'300',
        color:'white',
        letterSpacing:0.5
    },
    link:{
        fontWeight:'600',
        color:'#D65C56',
    },
    textInput:{
        height:50,
        borderBottomWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        marginHorizontal:50,
        marginVertical:10,
        paddingLeft:10,
    },
    form:{
        zIndez:1,
        marginBottom:100,
    },
    form2:{
        zIndex:2,
        marginBottom:-350,
    },
    form3:{
        zIndez:1,
        marginBottom:80,
    },
    closeButtomContainer:{
        height:40,
        width: 40,
        justifyContent: 'center',
        alignSelf:'center',
        shadowColor: "#000",
        shadowOffset:{
            width:0,
            height:5,
        },
        shadowOpacity:0.34,
        shadowRadius:3.84,
        elevation:5,
        backgroundColor:'white',
        alignItems:'center',
        borderRadius:20,
        borderColor:'white',
        top:-70
    },
    main_container: {
        flex: 1,
        backgroundColor: '#fff',
      },
  });
  
export default styles;