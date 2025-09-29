<template>
  <div>
    <!--    todo: eemalda productionist-->
    <!--    size_type_id,name,sequence-->
    <!--    130-150cm-->
    <!--    151-170cm-->
    <!--    171-200cm-->
    <!--    35-->
    <!--    36-->
    <select :value="selectedEquipmentSizeId" @change="handleEquipmentSizesDropdownChange" class="form-select">
      <option disabled :value="0">Vali suurus</option>
      <option v-for="equipmentSize in equipmentSizes" :key="equipmentSize.equipmentSizeId"
              :value="equipmentSize.equipmentSizeId">
        {{ equipmentSize.equipmentSizeName }}
      </option>
    </select>
  </div>
</template>

<script>

import EquipmentSizeService from "@/service/EquipmentSizeService";
import NavigationService from "@/service/NavigationService";

export default {
  name: 'EquipmentSizesDropdown',
  props: {
    selectedEquipmentSizeId: Number,
    selectedSizeTypeId: {
      type: Number,
      default: 'default'
    }
  },
  watch: {
    selectedSizeTypeId(newSelectedSizeTypeId) {
      if (newSelectedSizeTypeId !== 0) {
        this.getEquipmentSizes(newSelectedSizeTypeId)
      }

    },
  },

  data() {
    return {
      equipmentSizes: [
        {
          equipmentSizeId: 0,
          equipmentSizeName: "string"
        }
      ]
    }
  },
  methods: {
    handleEquipmentSizesDropdownChange(event) {
      this.$emit('event-new-equipment-size-selected', Number(event.target.value))
    },

    getEquipmentSizes(sizeTypeId) {
      EquipmentSizeService.sendGetEquipmentSizesRequest(sizeTypeId)
          .then(response => this.equipmentSizes = response.data)
          .catch(() => NavigationService.navigateToErrorView())
    },


  }

}
</script>