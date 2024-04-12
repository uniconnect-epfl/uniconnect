import React from 'react'
import { View, Platform, Pressable } from 'react-native'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'

import styles from './styles'

interface MyDateInputComponentProps {
  date: Date
  setDate: (date: Date) => void
  setDateModal: (val: boolean) => void
}

const MyDateInputComponent: React.FC<MyDateInputComponentProps> = ({
  date,
  setDate,
  setDateModal,
}) => {
  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date
    setDate(currentDate)
  }

  return (
    <Pressable style={styles.absView} onPress={() => setDateModal(false)}>
      <View style={styles.dateContainer}>
        <DateTimePicker
          // minimumDate={}
          // maximumDate={}
          testID="dateTimePicker"
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => onChange(event, selectedDate)}
        />
      </View>
    </Pressable>
  )
}

export default MyDateInputComponent
