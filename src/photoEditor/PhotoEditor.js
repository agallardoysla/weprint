import React, {useEffect} from 'react';
import {View, Text} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {
  PESDK,
  PhotoEditorModal,
  Configuration,
} from 'react-native-photoeditorsdk';

function PhotoEditor() {
  useEffect(() => {
    PESDK.unlockWithLicense(require('./pesdk_android_license'));
  }, []);
  //pesdk_android_license
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          PESDK.openEditor(require('../assets/img/slidetab1.png'));
        }}>
        <Text>Editar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PhotoEditor;
