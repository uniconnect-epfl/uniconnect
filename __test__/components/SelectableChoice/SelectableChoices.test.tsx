import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import SelectableChoices from '../../../components/SelectableChoices/SelectableChoices'

describe('SelectableChoices', () => {
    const choices = ['Option 1', 'Option 2', 'Option 3']

    it('should render correctly with the initial choice', () => {
        const { getByText } = render(<SelectableChoices choices={choices} startingChoice="Option 2" selectBarWidth={80} onChoiceChange={() => {}}/>)
        expect(getByText('Option 2')).toBeTruthy()
    })

    it('should call onChoiceChange when a choice is pressed', () => {
        const onChoiceChangeMock = jest.fn()
        const { getByText } = render(<SelectableChoices choices={choices} startingChoice="Option 1" onChoiceChange={onChoiceChangeMock} selectBarWidth={80} />)

        const optionToPress = getByText('Option 2')
        fireEvent.press(optionToPress)

        expect(onChoiceChangeMock).toHaveBeenCalledWith('Option 2')
        expect(onChoiceChangeMock).toHaveBeenCalledTimes(1)
    })

    it('should update the selected choice visually when a different choice is pressed', () => {
        const { getByText, rerender } = render(<SelectableChoices choices={choices} startingChoice="Option 1" selectBarWidth={80} onChoiceChange={() => {}} />)

        const optionToPress = getByText('Option 3')
        fireEvent.press(optionToPress)

        rerender(<SelectableChoices choices={choices} startingChoice="Option 3" selectBarWidth={80} onChoiceChange={() => {}} />)
    })
})
