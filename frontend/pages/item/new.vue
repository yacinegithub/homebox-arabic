<script setup>
  definePageMeta({
    middleware: ["auth"],
  });

  const show = reactive({
    identification: true,
    purchase: false,
    sold: false,
    extras: false,
  });

  const form = reactive({
    name: "",
    description: "",
    notes: "",

    // Item Identification
    serialNumber: "",
    modelNumber: "",
    manufacturer: "",

    // Purchase Information
    purchaseTime: "",
    purchasePrice: "",
    purchaseFrom: "",

    // Sold Information
    soldTime: "",
    soldPrice: "",
    soldTo: "",
    soldNotes: "",
  });

  function submit() {
    console.log("Submitted!");
  }
</script>

<template>
  <BaseContainer cmp="section">
    <BaseSectionHeader> إضافة عنصر إلى المخزون الخاص بك </BaseSectionHeader>
    <form class="max-w-3xl mx-auto my-5 space-y-6" @submit.prevent="submit">
      <div class="divider collapse-title px-0 cursor-pointer">معلومات مطلوبة</div>
      <div class="bg-base-200 card">
        <div class="card-body">
          <FormTextField v-model="form.name" label="الإسم" />
          <FormTextArea v-model="form.description" label="شرح" limit="1000" />
        </div>
      </div>

      <div class="divider">
        <button class="btn btn-sm" @click="show.identification = !show.identification">معلومات المنتج</button>
      </div>
      <div v-if="show.identification" class="card bg-base-200">
        <div class="card-body grid md:grid-cols-2">
          <FormTextField v-model="form.serialNumber" label="رقم تسلسلي" />
          <FormTextField v-model="form.modelNumber" label="رقم النموذج" />
          <FormTextField v-model="form.manufacturer" label="الصانع" />
        </div>
      </div>
      <div class="">
        <button class="btn btn-sm" @click="show.purchase = !show.purchase"> معلومات الشراء</button>
        <div class="divider"></div>
      </div>
      <div v-if="show.purchase" class="card bg-base-200">
        <div class="card-body grid md:grid-cols-2">
          <FormTextField v-model="form.purchaseTime" label="وقت الشراء" />
          <FormTextField v-model="form.purchasePrice" label="ثمن الشراء" />
          <FormTextField v-model="form.purchaseFrom" label="تم الشراء من" />
        </div>
      </div>

      <div class="divider">
        <button class="btn btn-sm" @click="show.sold = !show.sold">معلومات البيع</button>
      </div>
      <div v-if="show.sold" class="card bg-base-200">
        <div class="card-body">
          <div class="grid md:grid-cols-2 gap-2">
            <FormTextField v-model="form.soldTime" label="وقت البيع" />
            <FormTextField v-model="form.soldPrice" label="ثمن البيع" />
            <FormTextField v-model="form.soldTo" label="بيع لـ" />
          </div>
          <FormTextArea v-model="form.soldNotes" label="ملاحطة البيع" limit="1000" />
        </div>
      </div>
      <div class="divider">
        <button class="btn btn-sm" @click="show.extras = !show.extras">إضافات</button>
      </div>
      <div v-if="show.extras" class="card bg-base-200">
        <div class="card-body">
          <FormTextArea v-model="form.notes" label="Notes" limit="1000" />
        </div>
      </div>
    </form>
  </BaseContainer>
</template>
