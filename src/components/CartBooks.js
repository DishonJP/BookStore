import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux'
import { removeFromCart, increamentCount, decrementCount } from '../store/actions/actionCreator'

class CartBooks extends React.Component {
    state = {
        book:this.props.el
    }

    UNSAFE_componentWillReceiveProps(props){
        this.setState({
            ...this.state,
            book:props.el
        })
    }

    handlePress=()=>{
        this.props.removeFromCart(this.state.book)
    }
    render() {
        return (
            <View key={this.state.book.id} style={styles.bookBox}>
                <TouchableOpacity
                onPress={()=>this.handlePress()}
                style={styles.remove}>
                    <Text style={styles.removeText}>
                        Remove from cart
                                </Text>
                </TouchableOpacity>
                <Image style={styles.image} source={{ uri: this.state.book.thumbnailUrl }} />
                {this.state.book.count === 1 ? <Feather
                    name="minus-square"
                    style={{
                        color: "grey",
                        marginHorizontal: 10
                    }}
                    size={30}
                /> :
                    <Feather
                        onPress={() => {
                            this.props.decrementCount(this.state.book,this.state.count)
                        }}
                        name="minus-square"
                        style={{
                            color: "#800000",
                            marginHorizontal: 10
                        }}
                        size={30}
                    />}
                <Text>{this.state.book.count}</Text>
                <Feather
                    onPress={() => {
                        this.props.increamentCount(this.state.book,this.state.count)
                    }}
                    name="plus-square"
                    style={{
                        color: "#800000",
                        marginLeft: 10
                    }}
                    size={30}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: 100,
        marginHorizontal: 20
    },
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
    remove: {
        position: "absolute",
        bottom: 21,
        right: 40
    },
    removeText: {
        padding: 10,
        backgroundColor: "#800000",
        color: "#fff",
        borderRadius: 3
    }
})

const mapDispatchToProps=dispatch=>{
    return{
        removeFromCart:(book)=>dispatch(removeFromCart(book)),
        increamentCount:(book,count)=>dispatch(increamentCount(book,count)),
        decrementCount:(book,count)=>dispatch(decrementCount(book,count))
    }
}

export default connect(null,mapDispatchToProps)(CartBooks);