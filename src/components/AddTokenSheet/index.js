import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Input, Divider } from "@ui-kitten/components";
import { Portal } from "react-native-portalize";
import { BlurView } from "expo-blur";
import BottomSheet from "reanimated-bottom-sheet";
import { SCREEN_WIDTH } from "../../constants/sizes";

const AddTokenSheet = () => {
  const renderContent = () => (
    <BlurView
      intensity={100}
      style={{
        padding: SCREEN_WIDTH / 12,
        height: "100%",
      }}
    >
      <Text category="h5">Add Token</Text>
      <Divider style={styles.divider} />
      <Input style={styles.input} placeholder="Token contract address" />
      <Input style={styles.input} placeholder="Token symbol" />
      <Input style={styles.input} placeholder="Decimals of precision" />
      <Button status="success">Add</Button>
    </BlurView>
  );

  const renderHeader = () => {
    return (
      <View style={{width: SCREEN_WIDTH, alignItems: "center", paddingBottom: SCREEN_WIDTH / 50}}>
        <View style={{width: SCREEN_WIDTH / 4, backgroundColor: "black", opacity: 0.25, height: 6, borderRadius: "100%"}}/>
      </View>
    );
  };

  const sheetRef = React.useRef(null);

  return (
    <>
      <Button
        status="info"
        appearance="ghost"
        onPress={() => sheetRef.current.snapTo(0)}
      >
        Add new asset
      </Button>
      <Portal>
        <BottomSheet
          ref={sheetRef}
          snapPoints={["75%", "50%", 0]}
          borderRadius={10}
          renderContent={renderContent}
          renderHeader={renderHeader}
          initialSnap={2}
        />
      </Portal>
    </>
  );
};

export default AddTokenSheet;

const styles = StyleSheet.create({
  divider: {
    marginVertical: SCREEN_WIDTH / 50,
  },
  input: {
    marginBottom: SCREEN_WIDTH / 20,
  },
});
