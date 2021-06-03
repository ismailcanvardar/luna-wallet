import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import {
  Button,
  Card,
  Modal,
  Text,
  ListItem,
  Divider,
} from "@ui-kitten/components";
import { shortenAddress } from "../../utils/addressShortener";
import { SCREEN_WIDTH } from "../../constants/sizes";

const ContactsModal = ({ customButton = null, setRecipientAddress }) => {
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
        <Card style={{ width: SCREEN_WIDTH / 1.5 }} disabled={true}>
          <Text category="h4">Contacts</Text>
          <Divider style={{ marginTop: SCREEN_WIDTH / 50 }} />
          <ListItem
            title={"Test contact 1"}
            onPress={() =>
              setRecipientAddress("0x888Db2Df996cB9CeBc8556dDBD87CF835614a78d")
            }
            description={shortenAddress(
              "0x888Db2Df996cB9CeBc8556dDBD87CF835614a78d"
            )}
          />
          <ListItem
            title={"Test contact 2"}
            onPress={() =>
              setRecipientAddress("0xfBd7aaeb0d72a6AE8A67378d00746f396ae2C2c3")
            }
            description={shortenAddress(
              "0xfBd7aaeb0d72a6AE8A67378d00746f396ae2C2c3"
            )}
          />
          <Divider style={{ marginBottom: SCREEN_WIDTH / 50 }} />
          <Button size="small" onPress={() => setVisible(false)}>
            DISMISS
          </Button>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
