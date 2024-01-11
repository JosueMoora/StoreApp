import { StyleSheet } from 'react-native';

export const loginStyle = StyleSheet.create({
    margin: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
        gap: 10,
        height: 600,
        marginBottom: 50,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    label: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    input: {
        color: 'white',
        fontSize: 20,
    },
    btn: {
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    register:{
        fontSize: 15,
        color: 'white',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: 'white',
    },
})
