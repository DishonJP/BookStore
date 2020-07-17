import React from 'react'
import { Text, View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import Header from '../components/Header'
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { addToCart, wishlist } from '../store/actions/actionCreator';

class BookScreen extends React.Component {

    state = {
        book: null,
        index: null
    }

    UNSAFE_componentWillReceiveProps(props) {
        const book = this.props.navigation.state.params
        let currentBook = props.books.find(el => el.title === book.title)
        this.setState({
            ...this.state,
            book: currentBook,
            index: book.index
        })
    }

    componentDidMount() {
        const book = this.props.navigation.state.params
        if (book) {
            let currentBook = this.props.books.find(el => el.title === book.title)
            this.setState({
                ...this.state,
                book: currentBook,
                index: book.index
            })
        }
    }

    render() {
        return this.state.book ? (
            <SafeAreaView style={styles.SafeAreaView}>
                <Header navigation={this.props.navigation} />
                <ScrollView style={styles.container}>
                    {!this.state.book.wishlist ? <AntDesign
                        onPress={() => this.props.toWishlist(this.state.book)}
                        style={{
                            alignSelf: "flex-end",
                            position: "absolute",
                            top: 15,
                            color: "#800000"
                        }}
                        name="hearto" size={20}
                    /> :
                        <AntDesign
                            onPress={() => this.props.toWishlist(this.state.book)}
                            style={{
                                alignSelf: "flex-end",
                                position: "absolute",
                                top: 15,
                                color: "#800000"
                            }}
                            name="heart" size={20}
                        />}
                    <Image style={styles.image} source={{ uri: this.state.book.thumbnailUrl }} />
                    <View style={styles.line}></View>
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText}>Title : </Text>
                        <Text style={styles.text}>{this.state.book.title}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText}>Author : </Text>
                        <Text style={styles.text}>{this.state.book.authors[0]}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText}>PageCount :</Text>
                        <Text style={styles.text}>{this.state.book.pageCount}</Text>
                    </View>
                    <View style={styles.descrip}>
                        <Text style={styles.titleText}>Short Description</Text>
                        <Text style={styles.text}>             {this.state.book.shortDescription}</Text>
                    </View>
                    <View style={styles.descrip}>
                        <Text style={styles.titleText}>Full Description</Text>
                        <Text style={styles.text}>             {this.state.book.longDescription}</Text>
                    </View>
                </ScrollView>
                {!this.state.book.toCart ? <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            ...this.state,
                            book: {
                                ...this.state.book,
                                toCart: true
                            }
                        })
                        this.props.addToCart(this.state.book, this.state.index)
                    }}
                    style={styles.addCart}>
                    <Text style={styles.cartText}>Add to cart</Text>
                </TouchableOpacity> :
                    <View
                        style={styles.addedCart}>
                        <Text style={styles.cartText}>Added to cart</Text>
                    </View>}
            </SafeAreaView>
        ) : null
    }
}
BookScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    SafeAreaView: {
        backgroundColor: "#fff",
        height: "100%"
    },
    addCart: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: 'center',
        backgroundColor: "#800000",
        zIndex: 100
    },
    addedCart: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: 'center',
        backgroundColor: "#c8b8ac",
        zIndex: 100
    },
    cartText: {
        fontSize: 20,
        color: "#fff",
        padding: 20
    },
    container: {
        paddingHorizontal: 10,
        marginBottom: 70
    },
    image: {
        height: 250,
        width: "60%",
        marginHorizontal: "20%",
        marginTop: 20
    },
    textContainer: {
        flex: 1,
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center"
    },
    titleText: {
        fontSize: 20,
        color: "#800000",
        fontWeight: "500"
    },
    descrip: {
        marginTop: 10
    },
    text: {
        lineHeight: 25,
        fontSize: 16
    },
    line: {
        marginVertical: 10,
        borderTopWidth: 1,
        borderColor: "lightgrey",
        width: "100%"
    }
})

const mapStateToProps = state => {
    return {
        books: state.books
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (book, index) => dispatch(addToCart(book, index)),
        toWishlist:(book)=>dispatch(wishlist(book))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookScreen);