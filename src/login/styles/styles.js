const React = require('react-native');
const { Dimensions } = React;
const { width, height } = Dimensions.get('window');
import { tamañoLetra } from '../../constantes/Temas'

export default {
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    logo: {
        flex: 1,
        width: '80%',
        height: 125,
        bottom: '80%',
        justifyContent: 'center',
        alignSelf: 'center',

        resizeMode: 'contain'
    },
    borderColorEmail: {
        borderColor: '#c1c1c1'
    },
    titleform: {
        fontSize: tamañoLetra.subtituloContainer
    },
    subtitleform: {
        marginTop: 5,
        fontSize: tamañoLetra.textSubtitles,
        color: '#c1c1c1'
    },
    card: {
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#fff',
        height: '70%',
        width: '90%',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 3,
        marginVertical: 6,
        alignSelf: 'center',
        

    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 20,
        
    },
    button: {
        alignItems: 'center',
        marginTop: 40
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10, 
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    loginInput: {
        height: 45,
        width: '100%',
        borderColor: '#c1c1c1',
        borderWidth: 1,
        borderRadius: 20,
        alignSelf: 'center',
        textAlign: 'center'
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        bottom: '10%',
    },
    signUp: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        width: '95%',
        height: 50,
        bottom: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: '5%',
    },
    textSignUp: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    forgotPassword: {
        color: '#48B2FF',
        marginTop: 15,
        alignSelf: 'center',
        fontSize: tamañoLetra.textSubtitles
    }
}
