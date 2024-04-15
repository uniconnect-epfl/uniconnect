import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import ExpandableDescription from '../../../components/ExpandableDescription/ExpandableDescription'
import { TouchableOpacity } from 'react-native'

describe('ExpandableDescription', () => {
  
  it('renders the screen', () => {
    const component = render(
        <ExpandableDescription
            description='salue'
        />
    )
    expect(component).toBeTruthy()
  })

  it('renders correct text', () => {
    const description = "hfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vo"
    const { getByText } = render(
        <ExpandableDescription
            description={description}
        />
    )
    expect(getByText(description)).toBeTruthy()
  })

  it('renders long text only when expanding', () => {
    const description = "hfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vohfjdklahfjd fhei lv hsnrei vruie vei veiu eul nesbua bfwzuag fwua feuo vo "
    const { UNSAFE_getByType, getByText } = render(
        <ExpandableDescription
            description={description}
        />
    )
    expect(getByText(description).props.numberOfLines).toBe(4)
    fireEvent.press(UNSAFE_getByType(TouchableOpacity))
    expect(getByText(description).props.numberOfLines).toBeFalsy()
  })
  
})