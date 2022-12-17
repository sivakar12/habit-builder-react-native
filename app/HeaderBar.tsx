import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { colorPalette } from './StyleConstants'

const HeaderBarStyled = styled.View`
  flexDirection: row;
  alignItems: center;
  justifyContent: space-between;
  width: 100%;
  backgroundColor: ${props => props.theme.colorPalette.background};
  paddingHorizontal: ${props => props.theme.padding}px;
`
const TopButtonContainer = styled.TouchableOpacity`
  width: 50px
`

const TopText = styled.Text`
  fontSize: ${props => props.theme.fontSizes[0]};
  textAlign: center;
  fontFamily: PassionOne_400Regular;
  color: ${props => props.theme.colorPalette.accent}
`
type HeaderBarProps = {
  title: string
  showBack: boolean,
  handleBack: () => void,
  handleMenu: () => void
}

const HeaderBar = ({ title, showBack, handleBack, handleMenu }: HeaderBarProps) => {
  return (
    <HeaderBarStyled>
      <TopButtonContainer onPress={handleBack}>
        { showBack && <TopText>&lt;</TopText> }
      </TopButtonContainer>
      <TopText>{title}</TopText>
      <TopButtonContainer onPress={handleMenu}>
        <TopText>⋮</TopText>
      </TopButtonContainer>
    </HeaderBarStyled>
  )
}

export default HeaderBar