import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Modal,
  Text,
  List,
  ListItem,
  Avatar,
  Divider,
  Icon,
} from "@ui-kitten/components";
import defaultTokens from "../../constants/defaultTokens.json";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/sizes";

const CheckmarkIcon = (props) => <Icon {...props} name="checkmark" />;

const TokensModal = ({ selectedToken, setSelectedToken }) => {
  const [visible, setVisible] = React.useState(false);

  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        onPress={() => {
          setSelectedToken(index);
          console.log(index);
        }}
        accessoryRight={selectedToken === index && CheckmarkIcon}
        title={`${item.token_symbol}`}
        accessoryLeft={() => <Avatar source={{ uri: item.logoURI }} />}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Button
        appearance="outline"
        status="info"
        size="small"
        onPress={() => setVisible(true)}
      >
        Select a Token
      </Button>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <Text category="h5">Select a Token</Text>
          <Divider style={styles.divider} />
          <List
            showsVerticalScrollIndicator={false}
            style={styles.list}
            data={defaultTokens}
            renderItem={renderItem}
            ListHeaderComponent={
              <ListItem
                title={`ETH`}
                onPress={() => setSelectedToken(-1)}
                accessoryRight={selectedToken === -1 && CheckmarkIcon}
                accessoryLeft={() => (
                  <Avatar
                    source={{
                      uri: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
                    }}
                  />
                )}
              />
            }
          />
        </Card>
      </Modal>
    </View>
  );
};

export default TokensModal;

const styles = StyleSheet.create({
  container: {
    maxHeight: SCREEN_HEIGHT / 3,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  list: {
    backgroundColor: null,
    width: SCREEN_WIDTH / 1.75,
  },
  divider: {
    marginVertical: SCREEN_WIDTH / 50,
  },
});
