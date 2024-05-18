import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import ContactList from "../../../../screens/Contacts/ContactList/ContactList"

import { mockContacts } from "../../../../screens/Contacts/mockContacts"

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
  }
})

describe("ContactList", () => {
  const contacts = mockContacts
  const mockFunc = jest.fn()

  beforeEach(() => {
    mockFunc.mockClear()
  })

  it("renders the screen", () => {
    const component = render(
      <ContactList onContactPress={() => mockFunc} contacts={contacts} />
    )
    expect(component).toBeTruthy()
  })

  it("filters contacts based on search input", () => {
    const component = render(
      <ContactList onContactPress={() => mockFunc} contacts={contacts} />
    )

    fireEvent.changeText(
      component.getByPlaceholderText("Search..."),
      "Isabella"
    )
    expect(component.getByText("Isabella Rodriguez")).toBeTruthy()
    expect(component.queryByText("Bob Johnson")).toBeNull()
    expect(component.queryByText("Henry Taylor")).toBeNull()

    fireEvent.changeText(component.getByPlaceholderText("Search..."), "")
    expect(component.getByText("Bob Johnson")).toBeTruthy()
  })

  it("displays correct contact details", () => {
    const component = render(
      <ContactList onContactPress={() => mockFunc} contacts={contacts} />
    )
    expect(component.getByText("Bob Johnson")).toBeTruthy()
    expect(
      component.getByText(
        "Nulla euismod ex at magna consequat, eget venenatis risus maximus."
      )
    ).toBeTruthy()
  })
})
