import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from './styles';
import { globalStyles } from '../../../assets/global/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LowBar from '../../../components/LowBar/LowBar';
import InputField from '../../../components/InputField/InputField';
import Divider from '../../../components/divider/divider';
import { TextInput } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import MyDateInputComponent from '../../../components/DatePicker/DatePicker';

const InformationScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [desc, setDesc] = useState(false);
  const [loc, setLoc] = useState(false);
  const firstRef = useRef<TextInput>(null);
  const thirdRef = useRef<TextInput>(null);
  const lastRef = useRef<TextInput>(null);
  const [dateModal, setDateModal] = useState(false);
  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const onPress = () => {
    setDateModal(!dateModal);
    setHasBeenTouched(true);
  };

  const opacity = !hasBeenTouched ? 0.2 : 1

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <Image
          source={require('../../../assets/icon.png')}
          style={styles.image}
        />

        <View>
          <InputField
            label="First name*"
            placeholder="First name"
            returnKeyType="next"
            onSubmitEditing={() => firstRef.current?.focus()}
          />
          <InputField
            label="Last name*"
            placeholder="Last name"
            returnKeyType="next"
            ref={firstRef}
            onSubmitEditing={() => thirdRef.current?.focus()}
          />

          <TouchableOpacity style={styles.section} onPress={onPress}>
            <Text style={[styles.label, globalStyles.text]}>
              {'Date of Birth*'}
            </Text>
            <View style={styles.input}>
              <Text
                style={[
                  globalStyles.text,
                  { opacity: opacity},
                ]}
              >
                {!hasBeenTouched
                  ? 'JJ.MM.YYYY'
                  : '' +
                    date.getUTCDate().toString() +
                    '.' +
                    (date.getUTCMonth() + 1).toString() +
                    '.' +
                    date.getFullYear().toString() +
                    ''}
              </Text>
            </View>
          </TouchableOpacity>

          <InputField
            label="Location"
            placeholder="Location"
            returnKeyType="next"
            ref={thirdRef}
            onSubmitEditing={() => lastRef.current?.focus()}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.locationButton]}
              onPress={() => setLoc(!loc)}
            >
              <Ionicons name="location-outline" size={20} color="black" />
              <Text
                style={[
                  styles.buttonText,
                  styles.locationText,
                  globalStyles.text,
                ]}
              >
                Use my location?
              </Text>
              {!loc && <Entypo name="cross" color="red" />}
              {loc && <AntDesign name="check" color="green" />}
            </TouchableOpacity>
          </View>

          <Divider />

          {desc && <TextInput style={styles.description}></TextInput>}

          <TouchableOpacity
            style={[styles.button, styles.buttonContainer]}
            onPress={() => setDesc(!desc)}
          >
            <Text style={[styles.buttonText, globalStyles.text]}>
              Add a description now
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <LowBar nextScreen="Interests" />
        </View>

        {dateModal && (
          <MyDateInputComponent
            date={date}
            setDate={setDate}
            setDateModal={setDateModal}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default InformationScreen;
