<template>
  <UiUCard>
    <div class="space-y-3">
      <h2 class="text-sm font-semibold text-surface-700">History</h2>

      <div v-if="props.entries.length === 0" class="py-6 text-center">
        <p class="text-sm text-surface-400">No weight entries yet.</p>
        <p class="text-xs text-surface-400">Start logging to track your progress.</p>
      </div>

      <div v-else class="divide-y divide-surface-100">
        <div
          v-for="entry in recentEntries"
          :key="entry.id"
          class="flex items-center justify-between py-2.5"
        >
          <div>
            <p class="text-sm font-medium text-surface-900">{{ entry.weightKg }} kg</p>
            <p class="text-xs text-surface-400">
              {{ formatDate(entry.entryDate) }}
              <span v-if="entry.note"> · {{ entry.note }}</span>
            </p>
          </div>
          <button
            class="rounded-lg p-1.5 text-surface-400 transition-colors hover:bg-red-50 hover:text-red-500"
            @click="emit('delete', entry.id)"
          >
            <Trash2 :size="14" />
          </button>
        </div>
      </div>
    </div>
  </UiUCard>
</template>

<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next'
import type { WeightEntry } from '../../../shared/types'

interface Props {
  entries: WeightEntry[]
}

const props = defineProps<Props>()
const emit = defineEmits<{ delete: [id: string] }>()

const recentEntries = computed(() =>
  [...props.entries]
    .sort((a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime())
    .slice(0, 15),
)

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>
