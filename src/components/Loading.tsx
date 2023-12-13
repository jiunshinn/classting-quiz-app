import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import colors from '../constants/colors';

function BaseLoading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.main} />
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
