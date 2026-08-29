<template>
  <svg :width="size" :height="size" viewBox="0 0 64 64" fill="none" stroke="#A28466" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <g v-if="key === 'pump'">
      <rect x="22" y="26" width="20" height="28" rx="4"></rect>
      <rect x="25" y="6" width="14" height="20" rx="2"></rect>
      <line x1="26" y1="10" x2="38" y2="10"></line><line x1="26" y1="14" x2="38" y2="14"></line>
      <line x1="26" y1="18" x2="38" y2="18"></line><line x1="26" y1="22" x2="38" y2="22"></line>
      <path d="M20,4 h10"></path>
    </g>
    <path v-else-if="key === 'ampoule'" d="M29,8 L29,14 Q27,18 27,24 L27,48 Q27,55 32,55 Q37,55 37,48 L37,24 Q37,18 35,14 L35,8"></path>
    <g v-else-if="key === 'jar'">
      <rect x="14" y="30" width="36" height="22" rx="7"></rect>
      <rect x="12" y="22" width="40" height="10" rx="3"></rect>
      <line x1="12" y1="32" x2="52" y2="32"></line>
    </g>
    <g v-else-if="key === 'dropper'">
      <rect x="22" y="30" width="20" height="24" rx="4"></rect>
      <path d="M25,30 L28,16 h8 l3,14"></path>
      <rect x="27" y="4" width="10" height="12" rx="2"></rect>
      <line x1="32" y1="16" x2="32" y2="30"></line>
    </g>
    <g v-else-if="key === 'facetedPump'">
      <path d="M24,52 L22,24 L26,16 h12 l4,8 L42,52 Z"></path>
      <line x1="32" y1="16" x2="32" y2="52"></line>
      <rect x="27" y="8" width="10" height="8" rx="1"></rect>
      <line x1="27" y1="12" x2="37" y2="12"></line>
    </g>
    <g v-else-if="key === 'rollerVial'">
      <rect x="26" y="14" width="12" height="30" rx="4"></rect>
      <path d="M28,14 L28,10 Q28,6 32,6 Q36,6 36,10 L36,14"></path>
      <circle cx="32" cy="6" r="3"></circle>
    </g>
    <g v-else>
      <rect x="24" y="4" width="16" height="10" rx="3"></rect>
      <line x1="24" y1="14" x2="40" y2="14"></line>
      <path d="M24,14 L20,50 Q20,56 26,56 h12 Q44,56 44,50 L40,14"></path>
    </g>
  </svg>
</template>
<script setup>
const props = defineProps({ cat: { type: String, default: 'شوینده' }, size: { type: Number, default: 64 } });
const CAT_ICON = {
  'شوینده': 'pump', 'آبرسان': 'ampoule', 'ترمیم‌کننده و مرطوب‌کننده': 'jar',
  'ضدلک و روشن‌کننده': 'dropper', 'کرم جوانساز و لیفتینگ': 'facetedPump',
  'دورچشم': 'rollerVial', 'ضدآفتاب': 'tube'
};
const key = computed(() => CAT_ICON[props.cat] || 'jar');
</script>
