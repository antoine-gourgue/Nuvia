import type { WeightEntry } from '../../shared/types'
import type { CreateWeightPayload } from '../../shared/schemas'
import { weightRepository } from '../repositories/weightRepository'

export const weightService = {
  async getWeightHistory(userId: string, limit = 30): Promise<WeightEntry[]> {
    return weightRepository.findByUser(userId, limit)
  },

  async logWeight(userId: string, data: CreateWeightPayload): Promise<WeightEntry> {
    return weightRepository.create(userId, data)
  },

  async deleteWeight(id: string): Promise<boolean> {
    return weightRepository.delete(id)
  },
}
