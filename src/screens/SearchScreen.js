import React from 'react'
import {Text,View,ScrollView,StyleSheet,TextInput} from 'react-native'
import { connect } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

class SearchScreen extends React.Component{
    render(){
        return(
            <View style={{
                height:"100%",
                backgroundColor:"#fff"
            }}>
                <View style={styles.header}>
                <View
                style={styles.search}>
                    <Feather
                        style={{ marginHorizontal: 10 }}
                        name="search" size={25} />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Search..."
                    />
                    <EvilIcons
                        style={{ 
                            position:"absolute",
                            right:10    
                        }}
                        name="close" size={25} />
                </View>
                </View>
                <Text>Search</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    search: {
        backgroundColor: "#eee",
        borderRadius: 6,
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        width:"90%"
    },
    header:{
        height:80,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#800000"
    },
    textInput:{
        fontSize:18,
        width:"90%"
    }
})

SearchScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const mapStateToProps=state=>{
    return{
        books:state.books
    }
}

export default connect(mapStateToProps)(SearchScreen)