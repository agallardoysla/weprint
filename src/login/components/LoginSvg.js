import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { TextInput, StyleSheet, View } from 'react-native'
import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';

import styles from '../styles/styles';

const LoginSvg = ({ }) => {
    return (
        <View style={{ height: 88, width: '100%' }}>
            <Svg>
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                        <Stop offset="0%" style="stop-color:rgb(255, 115, 134);stop-opacity:1;" />
                        <Stop offset="25%" style="stop-color:rgb(255, 129, 122);stop-opacity:1;" />
                        <Stop offset="53%" style="stop-color:rgb(255, 144, 111);stop-opacity:1;" />
                        <Stop offset="78%" style="stop-color:rgb(255, 160, 104);stop-opacity:1;" />
                        <Stop offset="100%" style="stop-color:rgb(255, 177, 101);stop-opacity:1;" />
                    </LinearGradient>
                </Defs>
                <Path dfill="url(#grad1)" fill-opacity="1" d="M0,160L60,176C120,192,240,224,360,224C480,224,600,192,720,202.7C840,213,960,267,1080,256C1200,245,1320,171,1380,133.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
            </Svg>
        </View>

    );
};

export default LoginSvg;
