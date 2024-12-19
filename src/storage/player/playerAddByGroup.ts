import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@utils/AppError'

import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { playersGetByGroup } from './playerGetByGroup'
import { PlayerStorageDTO } from './PlayerStorageDTO'

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storagePlayers = await playersGetByGroup(group)

    const isPlayerAlreadyExists = storagePlayers.some(
      (player) => player.name === newPlayer.name
    )

    if (isPlayerAlreadyExists) {
      throw new AppError('Esta pessoa já existe.')
    }

    const storage = JSON.stringify([...storagePlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error
  }
}
