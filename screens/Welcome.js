import React from "react";
import { StyleSheet, View, Text, Image, Button, Alert, TouchableOpacity, SafeAreaView } from "react-native";
import { AntDesign } from '@expo/vector-icons';


const Welcome = ({navigation}) => {

    const title = "Schedule Me";

    return(
        <SafeAreaView>
            <View style={styles.styledCon}>
                    <Image style={styles.pageLogo} source={require('../assets/images/welcome.png')} />
                    <Text style={styles.pageTitle}>Schedule Me 📝</Text>
                    <Text style={styles.subTitle}>Schedule Your Reminder, Workout and Everything in One Place...</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={styles.button}>
                        <Text style={styles.btnText}>Start  <AntDesign name="arrowright" size={33} color="black" /></Text>
                    </TouchableOpacity>

                    <View style={styles.row}>
                        <Text style={styles.copyright}>scheduleMe © 2021</Text>
                    </View>
            </View>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    styledCon: {
        flex: 1,
        width:"100%",
        height: "100%",
        backgroundColor: "white",
        padding: '25px',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'flex-end',
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
    },
    row: {
        fontSize: 20,
        fontWeight: 'bold',
        flexDirection: 'row',
        marginTop: 8,
        bottom: 0,
    },
    copyright: {
        justifyContent: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        alignItems: 'center',
    },
})

export default Welcome;