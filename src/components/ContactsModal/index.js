import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';

const ContactsModal = ({customButton = null}) => {

  const [visible, setVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      {customButton !== null ? (
        <TouchableWithoutFeedback onPress={() => setVisible(true)}>
            {customButton}
        </TouchableWithoutFeedback>
      ) : (
        <Button onPress={() => setVisible(true)}>TOGGLE MODAL</Button>
      )}

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <Text>Welcome to UI Kitten 😻</Text>
          <Button onPress={() => setVisible(false)}>DISMISS</Button>
        </Card>
      </Modal>
    </View>
  );
};

export default ContactsModal;

const styles = StyleSheet.create({
  container: {
    // minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});