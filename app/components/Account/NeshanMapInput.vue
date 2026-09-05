<template>
  <ClientOnly>
    <div class="garnet-neshan-map" v-if="NeshanMap">
      <component
        :is="NeshanMap"
        ref="mapRef"
        defaultType="dreamy"
        :mapKey="mapKey"
        :center="{ latitude: 35.69973063872774, longitude: 51.33759623344799 }"
        persistent-popup-container-class="d-none"
        :zoom="7"
        :poi="true"
        :traffic="false"
        :hide-layers="true"
        :popup-on-marker-hover="false"
        :hide-search-container="true"
        :popup-on-result-hover="false"
        :reverse-on-click="canEditLatLng"
        @on-click="markersIconCallback"
        @on-init="onInit"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import MapMarker from "/images/map-marker.png"

/* ================= PROPS & EMITS ================= */

const props = defineProps({
  returnString: { type: Boolean, default: false },
  inputLatLng: { type: Array as () => number[] | null, default: null },
  canEditLatLng: { type: Boolean, default: true },
})

const emit = defineEmits<{
  (e: "handleLatLng", value: string | number[]): void
}>()

/* ================= STATE ================= */

const mapKey = "web.ec543d117994443fa87d0a5c71cb915e"

const mapRef = ref<any>(null)
const vectorLayer = ref<any>(null)
const NeshanMap = ref<any>(null)

// OpenLayers refs (به صورت let تعریف می‌کنیم تا بعداً مقداردهی شوند)
let FeatureCtor: any
let PointCtor: any
let VectorSourceCtor: any
let VectorLayerCtor: any
let StyleCtor: any
let IconCtor: any
let fromLonLatFn: any

/* ================= CLIENT ONLY IMPORT ================= */

onMounted(async () => {
  // کامپوننت نقشه
  const neshanVue = await import("@neshan-maps-platform/vue3-openlayers")

  // کلاس‌های OL به صورت جدا
  const { default: Feature } = await import(
    "@neshan-maps-platform/ol/Feature"
  )
  const { default: Point } = await import(
    "@neshan-maps-platform/ol/geom/Point"
  )
  const { default: VectorSource } = await import(
    "@neshan-maps-platform/ol/source/Vector"
  )
  const { default: VectorLayer } = await import(
    "@neshan-maps-platform/ol/layer/Vector"
  )
  const { default: Style } = await import(
    "@neshan-maps-platform/ol/style/Style"
  )
  const { default: Icon } = await import(
    "@neshan-maps-platform/ol/style/Icon"
  )
  const { fromLonLat } = await import("@neshan-maps-platform/ol/proj")

  // انتساب به متغیرهایی که بالا تعریف کردیم
  FeatureCtor = Feature
  PointCtor = Point
  VectorSourceCtor = VectorSource
  VectorLayerCtor = VectorLayer
  StyleCtor = Style
  IconCtor = Icon
  fromLonLatFn = fromLonLat

  NeshanMap.value = neshanVue.default
})

/* ================= METHODS ================= */

function markersIconCallback(point: any) {
  if (!props.canEditLatLng) return

  const map = mapRef.value?.state?.map
  if (!map) return

  if (vectorLayer.value) {
    map.removeLayer(vectorLayer.value)
    vectorLayer.value = null
  }

  const latLng = props.returnString
    ? `${point.coords[1]},${point.coords[0]}`
    : [point.coords[1], point.coords[0]]

  emit("handleLatLng", latLng)
}

function onInit() {
  if (!props.inputLatLng?.length) return

  const map = mapRef.value?.state?.map
  if (!map) return
  if (!PointCtor || !FeatureCtor) return // اگر هنوز لود نشده باشند

  const marker = new FeatureCtor({
    geometry: new PointCtor(
      fromLonLatFn([props.inputLatLng[1], props.inputLatLng[0]])
    ),
  })

  marker.setStyle(
    new StyleCtor({
      image: new IconCtor({
        src: MapMarker,
        anchor: [0.5, 1],
        scale: 0.3,
      }),
    })
  )

  vectorLayer.value = new VectorLayerCtor({
    source: new VectorSourceCtor({
      features: [marker],
    }),
  })

  map.addLayer(vectorLayer.value)
}
</script>

<style>
@import "@neshan-maps-platform/vue3-openlayers/dist/style.css";

.garnet-neshan-map {
  width: 100%;
  height: 400px;
}
</style>
