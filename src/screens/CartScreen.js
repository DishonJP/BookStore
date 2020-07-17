import React from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import CartBooks from '../components/CartBooks'

class CartScreen extends React.Component {

    state = {
        book: null
    }

    UNSAFE_componentWillReceiveProps(props){
        const cartBooks = props.books.filter(el => el.toCart === true)
        this.setState({
            book:cartBooks
        })
    }

    componentDidMount() {
        if (this.props.books) {
            const cartBooks = this.props.books.filter(el => el.toCart === true)
            this.setState({
                book: cartBooks
            })
        }
    }

    render() {
        if (!this.state.book) {
            return null
        }

        return (
            <View style={{
                height:"100%",
                backgroundColor:"#f6f0e2"
            }}>
                <ScrollView style={{
                    marginBottom:60
                }}>
                    {this.state.book.map((el, index) => {
                        return <CartBooks el={el} index={index}/>
                    })}
                </ScrollView>
                {this.state.book.length!==0?<TouchableOpacity
                onPress={()=>this.props.navigation.push('Checkout')}
                    style={styles.addCart}>
                    <Text style={styles.cartText}>Proceed to Checkout</Text>
                </TouchableOpacity>:null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    addCart: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: 'center',
        backgroundColor: "#800000",
        zIndex: 100
    },
    cartText: {
        fontSize: 20,
        color: "#fff",
        padding: 20
    },
    image: {
        height: 150,
        width: 100,
        marginHorizontal: 20
    },
    bookBox: {
        paddingVertical: 20,
        display:"flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center",
        borderBottomWidth:1,
        borderColor:"grey",
        position:"relative"
    },
    remove:{
        position:"absolute",
        bottom:21,
        right:40
    },
    removeText:{
        padding:10,
        backgroundColor:"#800000",
        color:"#fff",
        borderRadius:3
    }
})

CartScreen.navigationOptions = () => ({
    headerTintColor: "#fff",
    headerStyle: {
        backgroundColor: "#800000"
    }
})

const mapStateToProps = state => {
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(CartScreen);