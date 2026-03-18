<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="props.open"
        class="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      >
        <div class="fixed inset-0 bg-text-strong/30" @click="emit('close')" />
        <Transition
          enter-active-class="duration-200 ease-out"
          enter-from-class="translate-y-full sm:translate-y-0 sm:scale-95 sm:opacity-0"
          enter-to-class="translate-y-0 sm:scale-100 sm:opacity-100"
          leave-active-class="duration-150 ease-in"
          leave-from-class="translate-y-0 sm:scale-100 sm:opacity-100"
          leave-to-class="translate-y-full sm:translate-y-0 sm:scale-95 sm:opacity-0"
        >
          <div
            v-if="props.open"
            role="dialog"
            aria-modal="true"
            :class="[
              'relative z-10 w-full bg-surface-card shadow-xl',
              'rounded-t-2xl sm:rounded-2xl',
              'max-h-[90vh] overflow-y-auto',
              sizeClasses[props.size],
            ]"
          >
            <div class="flex items-center justify-center pb-0 pt-3 sm:hidden">
              <div class="h-1 w-10 rounded-full bg-border-soft" />
            </div>
            <div class="p-5 sm:p-6">
              <slot />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
type SheetSize = 'sm' | 'md' | 'lg'

interface Props {
  open: boolean
  size?: SheetSize
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const emit = defineEmits<{
  close: []
}>()

const sizeClasses: Record<SheetSize, string> = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
}
</script>
