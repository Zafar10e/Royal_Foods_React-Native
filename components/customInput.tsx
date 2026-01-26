import { Text, View } from 'react-native';


const CustomInput = ({ placeholder = 'Enter text', value, onChangeText, label, secureTextEntry = false, keyboardType = 'default' }: CustomInputProps) => {
 return (
  <View>
   <Text>CustomInput</Text>
  </View>
 )
}

export default CustomInput;