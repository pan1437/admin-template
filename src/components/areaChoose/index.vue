<template>
  <el-cascader
    ref="areaSelect"
    v-if="show && showArea"
    clearable
    style="width: 200px;"
    v-model="regionModel"
    :props="region"
    @change="change"
  ></el-cascader>
</template>

<script>
import { region } from '@/apis/comminApi'
export default {
  name: 'areaChoose',
  props: {
    expandTrigger: {
      type: String,
      default: 'click'
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    firstLevel: {
      type: Object,
      default: () => {
        return {}
      }
    },
    level: {
      type: Number,
      default: 2
    },
    regionList: {
      type: Array,
      default: () => {
        return []
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    regionModel: {
      get() {
        return this.regionList
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },
  watch: {
    'firstLevel.code': {
      handler(val, olVal) {
        if (val != olVal) {
          this.showArea = false
          this.$nextTick(() => {
            this.showArea = true
          })
        }
      },
      deep: true
    },
    level(val, olVal) {
      if (val != olVal) {
        this.showArea = false
        this.$nextTick(() => {
          this.showArea = true
        })
      }
    }
  },
  data() {
    return {
      areaValue: [],
      showArea: true,
      region: {
        expandTrigger: this.expandTrigger,
        checkStrictly: this.checkStrictly,
        lazy: true,
        lazyLoad: (node, resolve) => {
          const { level } = node
          switch (level) {
            case 0:
              region({
                superior_code: this.firstLevel.code || undefined
              }).then(res => {
                let provinces = []
                res.data.forEach(element => {
                  provinces.push({
                    value: element,
                    label: element.short_name,
                    leaf: level >= this.level
                  })
                })
                const nodes = provinces

                resolve(nodes)
              })
              break
            case 1:
              region({ superior_code: node.value.code }).then(res => {
                let cities = []
                res.data.forEach(element => {
                  cities.push({
                    value: element,
                    label: element.short_name,
                    leaf: level >= this.level
                  })
                })
                const nodes = cities
                resolve(nodes)
              })
              break
            case 2:
              region({ superior_code: node.value.code }).then(res => {
                let counties = []
                res.data.forEach(element => {
                  counties.push({
                    value: element,
                    label: element.short_name,
                    leaf: level >= this.level
                  })
                })
                const nodes = counties
                resolve(nodes)
              })
              break

            case 3:
              region({ superior_code: node.value.code }).then(res => {
                let street = []
                res.data.forEach(element => {
                  street.push({
                    value: element,
                    label: element.short_name,
                    leaf: level >= this.level
                  })
                })
                const nodes = street
                resolve(nodes)
              })
              break

            case 4:
              resolve()
              break
          }
        }
      }
    }
  },
  destroyed() {
    this.region = {}
  },
  methods: {
    change(e) {
      this.$emit('input', e)
    }
  }
}
</script>
