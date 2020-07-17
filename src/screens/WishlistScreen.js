import React from 'react'
import {Text,View,ScrollView,StyleSheet,TouchableOpacity,Image} from 'react-native'
import { connect } from 'react-redux'
import { addToCart } from '../store/actions/actionCreator'

class WishlistScreen extends React.Component{
    render(){
        return(
            <View style={{
                height:"100%",
                backgroundColor:"#f6f0e2"
            }}>
               {this.props.books? <ScrollView>
                    {this.props.books.map(el=>{
                        return <View key={el.id} style={styles.bookBox}>
                        
                        <Image style={styles.image} source={{ uri: el.thumbnailUrl }} />
                        {!el.toCart?<TouchableOpacity
                        onPress={()=>this.props.addToCart(el)}
                        style={styles.remove}>
                            <Text style={styles.removeText}>
                                Add to cart
                                        </Text>
                        </TouchableOpacity>:<Text>Already added</Text>}
                        </View>
                    })}
                </ScrollView>:null}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    bookBox: {
        paddingVertical: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "grey",
        position: "relative"
    },
    removeText: {
        padding: 10,
        backgroundColor: "#800000",
        color: "#fff",
        borderRadius: 3
    },
    image: {
        height: 150,
        width: 100,
        marginHorizontal: 20
    },
})

WishlistScreen.navigationOptions = () => ({
    headerTintColor: "#fff",
    headerStyle: {
        backgroundColor: "#800000"
    }
})

const mapStateToProps=state=>{
    return{
        books:state.books.filter(el=>el.wishlist===true)
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        addToCart:(book)=>dispatch(addToCart(book))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WishlistScreen)