import React from "react";
import { StyleSheet, View, Text, Image, Button, Alert, TouchableOpacity, SafeAreaView } from "react-native";
import { AntDesign } from '@expo/vector-icons';


const Welcome = () => {

    const title = "Schedule Me";

    return(
        <SafeAreaView>
            <View style={styles.styledCon}>
                <View style={styles.innerCon}>
                    <Image style={styles.pageLogo} source={require('../assets/images/home.jpg')} />
                    <Text style={styles.pageTitle}>Schedule Me 📝</Text>
                    <Text style={styles.subTitle}>Schedule Your Expenses, Workout and Everything in One Place...</Text>
                    <TouchableOpacity 
                        onPress={() => Alert.alert('Button with adjusted color pressed')}
                        style={styles.button}>
                        <Text style={styles.btnText}>Start  <AntDesign name="arrowright" size={33} color="black" /></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    styledCon: {
        flex: 1,
        padding: '25px',
        backgroundColor: '#ffffff',
    },
    innerCon: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    pageLogo: {
        width: '300px',
        height: '350px',
    },
    pageTitle: {
        marginTop: '5%',
        fontSize: '45px',
        fontAlign: 'center',
        fontWeight: 'bolder',
        color: 'black',
        padding: '10px',
    },
    subTitle: {
        fontSize: '20px',
        fontAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        padding: '10px',
        justifyContent: 'center',
        textAlign: 'center',
    },
    button: {
        width: '50%',
        height: '60px',
        marginTop: '10%',
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderColor: 'grey',
        borderWidth: 2,
        boxShadow: '5px 5px 5px #888888',
    },
    btnText: {
        fontSize: '40px',
        fontAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        padding: '10px',
        justifyContent: 'center',
        textAlign: 'center',
    }
})

export default Welcome;