import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Modal, Text, Divider } from "@ui-kitten/components";
import { SCREEN_WIDTH } from "../../constants/sizes";

const MessageModal = ({
  heading,
  message,
  buttonTitle = "Continue",
  visible,
  setVisible,
  onPress,
  body,
  isBackdropPressable
}) => {
  if (visible) {
    return (
      <View style={styles.container}>
        <Modal visible={visible} onBackdropPress={isBackdropPressable ? () => setVisible(false) : null} backdropStyle={styles.backdrop}>
          <Card style={styles.card} disabled={true}>
            <Text style={styles.heading} category="h4">
              {heading}
            </Text>
            {body && (
              <View
                style={{
                  marginBottom: SCREEN_WIDTH / 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {body}
              </View>
            )}
            <Text style={{ textAlign: body ? "center" : "auto" }} category="c2">
              {message}
            </Text>
            <Divider style={styles.divider} />
            <Button status="success" onPress={onPress}>
              {buttonTitle}
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
