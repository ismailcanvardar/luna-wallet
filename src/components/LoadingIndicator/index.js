import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from '@ui-kitten/components';

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner status={props.status} size='small' />
  </View>
);

export default LoadingIndicator;

const styles = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});