import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Button, Modal, Card } from "@ui-kitten/components";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SCREEN_WIDTH } from "../../constants/sizes";

// Set value transfers data to upper component by using props
const BarcodeScanner = ({ value, setValue, style, customButton = null }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const handleBarCodeScanned = async ({ type, data }) => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status === "granted") {
      setHasPermission(status === "granted");
      setCameraOpen(true);
    }

    if (data) {
      setValue(data);
      setCameraOpen(false);
    }
  };

  // if (value.length > 0) {
  //   return <></>;
  // }

  if (!cameraOpen) {
    if (customButton !== null) {
      return (
        <TouchableWithoutFeedback onPress={handleBarCodeScanned}>
          {customButton}
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <Button status="info" style={style} onPress={handleBarCodeScanned}>
          Tap to Scan
        </Button>
      );
    }
  }

  return (
    <>
      <Modal
        visible={cameraOpen}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setCameraOpen(false)}
      >
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={{
            height: SCREEN_WIDTH * 1.2,
            width: SCREEN_WIDTH / 1.2,
          }}
        />
      </Modal>
    </>
  );
};

export default BarcodeScanner;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
  },
});
