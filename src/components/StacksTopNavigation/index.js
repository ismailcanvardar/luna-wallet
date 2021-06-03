import React from "react";
import { Text, Divider, Layout, Icon, Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";

const BackIcon = (props) => <Icon {...props} name="arrow-ios-back" />;

const StacksTopNavigation = ({ title }) => {
  const { goBack } = useNavigation();

  return (
    <>
      <Layout style={{ flexDirection: "row", alignItems: "center" }}>
        <Button
          appearance="ghost"
          size="large"
          status="basic"
          accessoryLeft={BackIcon}
          onPress={goBack}
        />
        <Text category="h4">{title}</Text>
      </Layout>
      <Divider />
    </>
  );
};

export default StacksTopNavigation;
