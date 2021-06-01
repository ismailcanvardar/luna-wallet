import React from "react";
import { Icon, TopNavigationAction } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

const BackIcon = (props) => <Icon {...props} name="arrow-ios-back" />;

export default function TopNavigation() {
  const { goBack } = useNavigation();

  return <TopNavigationAction onPress={goBack} icon={BackIcon} />;
}

