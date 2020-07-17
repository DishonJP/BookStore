import React from 'react'
import { Text, View, TextInput, ScrollView, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Dropdown } from 'react-native-material-dropdown'
import { orderBook } from '../store/actions/actionCreator'

class CheckoutScreen extends React.Component {
    state = {
        name: "",
        email: "",
        address: "",
        contactNo: null,
        paymentOption: null
    }

    handleOnChangetext = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value
        })
    }


    render() {
        const payMethods = [{ value: "Cash on Delivery" }, { value: "Credit/Debit/ATM Cards" }];
        return (
            <View style={{
                height: "100%",
                backgroundColor: "#fff",
                marginBottom: 40
            }}>
                <ScrollView style={styles.container}>
                    <Text style={styles.customerText}>Customer Details</Text>
                    <TextInput style={styles.textInput} placeholder="Customer name" />
                    <TextInput style={styles.textInput} placeholder="Email Id" keyboardType="email-address" />
                    <TextInput style={styles.textInput} placeholder="Shipping Address" dataDetectorTypes="address" />
                    <TextInput style={styles.textInput} placeholder="Contact No" keyboardType="phone-pad"
                        maxLength={10}
                        dataDetectorTypes="phoneNumber" />
                    <Dropdown label="Payment Option"
                        onChangeText={(value) => this.handleOnChangetext("paymentOption", value)}
                        animationDuration={10}
                        data={payMethods}
                    />
                    {this.state.paymentOption === "Credit/Debit/ATM Cards" ? <View>
                        <Text style={styles.customerText}>Enter card Details</Text>
                        <View style={styles.card}>
                            <View style={styles.flex}>
                                <Text>Card no       : </Text>
                                <TextInput style={styles.cardInput} keyboardType="phone-pad" />
                            </View>
                            <View style={styles.flex}>
                                <Text>CVV             : </Text>
                                <TextInput style={styles.cvv} keyboardType="phone-pad" secureTextEntry={true} />
                            </View>
                            <View style={styles.flex}>
                                <Text>Card Name : </Text>
                                <TextInput style={styles.cardInput} />
                            </View>
                        </View>
                    </View> : null}
                    <Text style={styles.customerText}>Added Books</Text>
                    <View style={{ marginBottom: 50 }}>
                        {this.props.books.map(book => {
                            return <View style={styles.book} key={book.id}>
                                <Text>BookName : {book.title}</Text>
                                <Text>count : {book.count}</Text>
                            </View>
                        })}
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={()=>{
                    this.props.orderBook(this.props.books);
                    this.props.navigation.push('OrderSummary')
                }} style={styles.addCart}>
                    <Text style={styles.cartText}>Order</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

CheckoutScreen.navigationOptions = () => ({
    headerTintColor: "#fff",
    headerStyle: {
        backgroundColor: "#800000"
    }
})

const styles = StyleSheet.create({
    customerText: {
        fontSize: 20,
        alignSelf: "center"
    },
    container: {
        padding: 10,
    },
    card: {
        padding: 10,
        backgroundColor: "#ffc7c7",
        marginTop: 15,
        borderRadius: 5,
        overflow: "hidden",
        marginBottom: 10
    },
    textInput: {
        borderBottomColor: "#800000",
        borderBottomWidth: 1,
        padding: 2,
        fontSize: 16,
        marginVertical: 15
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%"
    },
    cardInput: {
        borderBottomColor: "#800000",
        borderBottomWidth: 1,
        padding: 2,
        fontSize: 16,
        marginVertical: 15,
        flex: 1
    },
    cvv: {
        borderWidth: 1,
        borderColor: "#800000",
        width: 35,
        padding: 0,
        paddingHorizontal: 5
    },
    book: {
        marginTop: 15,
        padding: 5,
        backgroundColor: "#f6f0e2",
        borderRadius: 5
    },
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
})

const mapStateToProps = state => {
    return {
        books: state.books.filter(el => el.toCart === true)
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        orderBook:(books)=>dispatch(orderBook(books))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CheckoutScreen)