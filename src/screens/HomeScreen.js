import React from 'react'
import { Text, View, SafeAreaView, StatusBar, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { getBooks, wishlist } from '../store/actions/actionCreator'
import AntDesign from 'react-native-vector-icons/AntDesign'

class HomeScreen extends React.Component {
    state = {
        currentPage: 1
    }
    componentDidMount() {
        this.props.getBooks();
    }
    render() {
        const pageCount = this.props.books ? Math.floor(this.props.books.length / 20) : 0;
        let pages = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push(<TouchableOpacity key={i} onPress={() => {
                this.scroll.scrollTo({x: 0, y: 0, animated: true})
                this.setState({
                    ...this.state,
                    currentPage: i
                })
            }}>
                <Text style={styles.number}>{i}</Text>
            </TouchableOpacity>)
        }
        return (
            <React.Fragment>
                <StatusBar backgroundColor="#800000" />
                <SafeAreaView style={styles.SafeAreaView}>
                    <Header navigation={this.props.navigation} />
                    {this.props.books ? (<ScrollView ref={(c)=>{this.scroll=c}}>
                        <View style={styles.body}>
                            {this.props.books.map((el, index) => {
                                let page;
                                for (let i = 1; i <= pageCount; i++) {
                                    
                                    if (this.state.currentPage === i && index < 20 * i && index>=(i-1)*20) {
                                        page = (
                                            <View key={index} style={styles.box}>
                                                <View>
                                                    {!el.wishlist?<AntDesign
                                                        onPress={()=>this.props.toWishlist(el)}
                                                        style={{
                                                            alignSelf: "flex-end",
                                                            position: "relative",
                                                            top: -5,
                                                            color: "#800000"
                                                        }}
                                                        name="hearto" size={20}
                                                    />:
                                                    <AntDesign
                                                        onPress={()=>this.props.toWishlist(el)}
                                                        style={{
                                                            alignSelf: "flex-end",
                                                            position: "relative",
                                                            top: -5,
                                                            color: "#800000"
                                                        }}
                                                        name="heart" size={20}
                                                    />}
                                                </View>
                                                <TouchableOpacity onPress={()=>this.props.navigation.push('Book',{title:el.title,index})}>
                                                    <Image style={styles.image} source={{ uri: el.thumbnailUrl }} />
                                                </TouchableOpacity>
                                                <Text style={styles.text}>Title : {el.title}</Text>
                                                <Text style={styles.text}>Author : {el.authors[0]}</Text>
                                            </View>
                                        )
                                        break;
                                    }
                                }
                                return page
                            })}
                        </View>
                        <View style={styles.pages}>
                            {pages}
                        </View>
                    </ScrollView>
                    ) : (<View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center"
                    }}><ActivityIndicator size="large" color="#800000" />
                    </View>)}
                </SafeAreaView>
            </React.Fragment>
        )
    }
}

HomeScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    SafeAreaView: {
        backgroundColor: "#fff",
        height: "100%"
    },
    body: {
        flexDirection: "row",
        flexWrap: "wrap",
        height: 3000
    },
    box: {
        width: "50%",
        borderWidth: 1,
        borderColor: "lightgrey",
        height: 300,
        padding: 10,
        overflow: "hidden"
    },
    image: {
        height: 200,
        width: "60%",
        marginHorizontal: "20%"
    },
    text: {
        fontSize: 16,
        color: "#222"
    },
    pages: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 20
    },
    number: {
        padding: 10,
        borderWidth: 1,
        borderColor: "grey",
        backgroundColor: "lightgray",
        marginRight: 10,
        textAlign: "center"
    }
})

const mapStateToProps = state => {
    return {
        books: state.books
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBooks: () => dispatch(getBooks()),
        toWishlist:(book)=>dispatch(wishlist(book))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);