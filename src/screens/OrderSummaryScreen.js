import React from 'react'
import { Text, View, SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux';

class OrderSummaryScreen extends React.Component {
    render() {
        console.warn(this.props.books);
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>Status</Text>
                <ScrollView>
                    {this.props.books.map(book => {
                        return <View style={styles.book} key={book.id}>
                            <Image style={styles.image} source={{uri:book.thumbnailUrl}}/>
                            <View>
                            <Text>BookName : {book.title}</Text>
                            <Text>count : {book.count}</Text>
                            <Text>Order Date : {book.date}</Text>
                            <Text>status : working on</Text>
                            </View>
                        </View>
                    })}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

OrderSummaryScreen.navigationOptions = () => ({
    headerTintColor: "#fff",
    headerStyle: {
        backgroundColor: "#800000"
    }
})

const styles = StyleSheet.create({
    book: {
        marginTop: 15,
        padding: 5,
        backgroundColor: "#f6f0e2",
        borderRadius: 5,
        flexDirection:"row"
    },
    container:{
        height:"100%",
        backgroundColor:"#fff",
        padding:10
    },
    text:{
        fontSize:20,
        alignSelf:"center"
    },
    image:{
        height:80,
        width:60,
        marginRight:10
    }
});

const mapStateToProps = (state) => {
    return {
        books: state.books.filter(el => el.order === true)
    }
}

export default connect(mapStateToProps)(OrderSummaryScreen);