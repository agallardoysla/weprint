import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { TextInput } from 'react-native'

import styles from '../styles/styles';

const RegisterInput = ({
    placeholder,
    onChangeText,
    value,
    selectTextOnFocus,

}) => {
    return (
        
            <TextInput
                placeholder={placeholder}
                onChangeText={onChangeText}
                selectTextOnFocus={selectTextOnFocus}
                value={value}
                {...attributes}
                style={styles.loginInput}
            />
        
    );
};

export default RegisterInput;
