import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Modal, Text, Divider } from "@ui-kitten/components";
import { SCREEN_WIDTH } from "../../constants/sizes";

const MessageModal = ({ heading, message, visible, setVisible, onPress }) => {
  if (visible) {
    return (
      <View style={styles.container}>
        <Modal visible={visible} backdropStyle={styles.backdrop}>
          <Card style={styles.card} disabled={true}>
            <Text style={styles.heading} category="h4">
              {heading}
            </Text>
            <Text category="c2">
              {message}
            </Text>
            <Divider style={styles.divider} />
            <Button status="success" onPress={onPress}>
              Continue
            </Button>
          </Card>
        </Modal>
      </View>
    );
  }

  return <></>;
};

export default MessageModal;

const styles = StyleSheet.create({
  container: {},
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  card: { width: SCREEN_WIDTH / 1.2 },
  heading: {
    paddingBottom: SCREEN_WIDTH / 20,
  },
  divider: {
    marginVertical: SCREEN_WIDTH / 20,
  },
});
