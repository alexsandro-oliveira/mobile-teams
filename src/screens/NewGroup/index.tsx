import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Hightlight } from '@components/Hightlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { groupCreate } from '@storage/group/groupCreate'

import { Container, Content, Icon } from './styles'
import { AppError } from '@utils/AppError'
import { Alert } from 'react-native'

export function NewGroup() {
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'Informe o nome do grupo')
      }

      await groupCreate(group)
      navigation.navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message)
      } else {
        Alert.alert('Novo Grupo', 'Erro ao criar novo grupo')
        console.log(error)
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Hightlight
          title="Nova turma"
          subtitle="crie uma nova turma para adicionar pessoas"
        />

        <Input placeholder="Nome da turma" onChangeText={setGroup} />

        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  )
}
