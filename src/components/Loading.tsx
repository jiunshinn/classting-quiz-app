import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../constants/colors';
import * as Progress from 'react-native-progress';

function BaseLoading() {
  return (
    <View style={styles.container}>
      <Progress.Circle size={30} indeterminate={true} color={colors.main} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BaseLoading;
