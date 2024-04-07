import { useLocalSearchParams } from "expo-router";
import { View, Text } from 'react-native'
const index = () => {
  const params = useLocalSearchParams();
  console.log("params", params);
  
  return (
    <View>
      <Text>category page</Text>
    </View>
  )
}
export default index;