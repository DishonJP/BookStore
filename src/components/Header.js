import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux';

class Header extends React.Component {
    render() {
        return (
            <View style={styles.header}>
                <View style={styles.top}>
                    <View style={styles.align}>
                        <Feather
                            onPress={() => this.props.navigation.openDrawer()}
                            style={{
                                color: "#fff",
                                marginLeft: 10
                            }}
                            name="menu" size={25} />
                        <Text style={styles.text}>
                            BookStore
                    </Text>
                    </View>
                    <View style={{
                        flexDirection:"row",
                        alignItems:"center"
                    }}>
                    <Feather
                    onPress={()=>this.props.navigation.push('Wishlist')}
                        style={{
                            color: "#fff",
                            marginRight: 20,
                            alignSelf:'flex-end'
                        }}
                        name="heart" size={25} />
                    <Feather
                    onPress={()=>this.props.navigation.push('Cart')}
                        style={{
                            color: "#fff",
                            marginRight: 10
                        }}
                        name="shopping-cart" size={25} />
                    </View>
                    {this.props.cartCount>0?<Text style={styles.number}>{this.props.cartCount}</Text>:null}
                </View>
                <TouchableOpacity
                onPress={()=>this.props.navigation.push("Search")}
                style={styles.search}>
                    <Feather
                        style={{ marginHorizontal: 10 }}
                        name="search" size={25} />
                    <TextInput
                        editable={false}
                        placeholder="Search..."
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#800000",
        padding: 10
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        color: "#fff",
        marginLeft: 10,
        fontSize: 18
    },
    align: {
        flexDirection: "row",
        alignItems: "center"
    },
    search: {
        backgroundColor: "#eee",
        borderRadius: 6,
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center"
    },
    number: {
        position: "absolute",
        right: 0,
        top: -5,
        color: "#fff"
    }
})

const mapStateToProps=state=>{
    return{
        cartCount:state.cartCount
    }
}

export default connect(mapStateToProps)(Header);