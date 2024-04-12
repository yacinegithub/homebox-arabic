<template>
  <div>
    <AppImportDialog v-model="modals.import" />
    <BaseContainer class="flex flex-col gap-4 mb-6">
      <BaseCard>
        <template #title>
          <BaseSectionHeader>
            <MdiFileChart class="mr-2" />
            <span> التقارير </span>
            <template #description> إنشاء تقارير مختلفة للمخزون الخاص بك. </template>
          </BaseSectionHeader>
        </template>
        <div class="border-t px-6 pb-3 border-gray-300 divide-gray-300 divide-y">
          <DetailAction @action="navigateTo('/reports/label-generator')">
            <template #title>ملصقات معرف الأصول</template>
           يُنشئ ملف PDF قابلاً للطباعة من الملصقات لمجموعة من معرفات الأصول. هذه ليست محددة للمخزون الخاص بك لذلك أنت
             قادرون على طباعة الملصقات مسبقًا وتطبيقها على المخزون الخاص بك عند استلامها.
            <template #button>
              مولد الملصقة
              <MdiArrowRight class="ml-2" />
            </template>
          </DetailAction>
          <DetailAction @action="getBillOfMaterials()">
            <template #title>فاتورة المواد</template>
            ينشئ ملف TSV (قيم مفصولة بعلامات جدولة) يمكن استيراده إلى برنامج جدول بيانات. هذا ال
             ملخص للمخزون الخاص بك مع العنصر الأساسي ومعلومات التسعير.
            <template #button> إنشاء الفاتورة </template>
          </DetailAction>
        </div>
      </BaseCard>
      <BaseCard>
        <template #title>
          <BaseSectionHeader>
            <MdiDatabase class="mr-2" />
            <span> تصدير و استيراد </span>
            <template #description>
              استيراد وتصدير المخزون الخاص بك من وإلى ملف CSV. يعد هذا مفيدًا لترحيل مخزونك إلى ملف
               مثيل جديد من هوم بوكس.
            </template>
          </BaseSectionHeader>
        </template>
        <div class="border-t px-6 pb-3 border-gray-300 divide-gray-300 divide-y">
          <DetailAction @action="modals.import = true">
            <template #title>استيراد مخزون</template>
            يستورد تنسيق CSV القياسي لـ Homebox. هذا <b>لن</b> يحل محل أي عناصر موجودة في جهازك
             جرد. وسوف تضيف فقط عناصر جديدة.
          </DetailAction>
          <DetailAction @action="getExportTSV()">
            <template #title> تصدير المخزون</template>
            يصدر تنسيق CSV القياسي لـ Homebox. سيؤدي هذا إلى تصدير كافة العناصر الموجودة في المخزون الخاص بك.
          </DetailAction>
        </div>
      </BaseCard>
      <BaseCard>
        <template #title>
          <BaseSectionHeader>
            <MdiAlert class="mr-2" />
            <span> إجراءات المخزون </span>
            <template #description>
              قم بتطبيق الإجراءات على المخزون الخاص بك بكميات كبيرة. هذه إجراءات لا رجعة فيها. <b>كن حذرًا.</b>
            </template>
          </BaseSectionHeader>
        </template>
        <div class="border-t px-6 pb-3 border-gray-300 divide-gray-300 divide-y">
          <DetailAction @action="ensureAssetIDs">
            <template #title>تأكد من معرفات الأصول</template>
            يضمن أن جميع العناصر الموجودة في المخزون الخاص بك تحتوي على حقل معرف الأصول صالح. ويتم ذلك من خلال إيجاد أعلى
             حقل "معرف_الأصول" الحالي في قاعدة البيانات وتطبيق القيمة التالية على كل عنصر يحتوي على "معرف_الأصول" غير محدد
             مجال. ويتم ذلك بترتيب الحقل create_at.
          </DetailAction>
          <DetailAction @action="ensureImportRefs">
            <template #title>يضمن استيراد المراجع</template>
          يضمن أن جميع العناصر الموجودة في المخزون الخاص بك تحتوي على حقل import_ref صالح. ويتم ذلك عن طريق توليد عشوائيا
             سلسلة مكونة من 8 أحرف لكل عنصر يحتوي على حقل import_ref غير محدد.
          </DetailAction>
          <DetailAction @action="resetItemDateTimes">
            <template #title> أوقات تاريخ العنصر صفر</template>
            يعيد تعيين قيمة الوقت لجميع حقول التاريخ والوقت في مخزونك إلى بداية التاريخ. هذا هو ل
             إصلاح الخلل الذي تم تقديمه في وقت مبكر من تطوير الموقع والذي تسبب في زيادة القيمة الزمنية
             تم تخزينها مع الوقت الذي تسبب في حدوث مشكلات في حقول التاريخ التي تعرض قيمًا دقيقة.
            <a class="link" href="https://github.com/hay-kot/homebox/issues/236" target="_blank">
              راجع Github العدد رقم 236# لمزيد من التفاصيل.
            </a>
          </DetailAction>
          <DetailAction @action="setPrimaryPhotos">
            <template #title>تعيين الصور الأساسية</template>
           في الإصدار v0.10.0 من Homebox، تمت إضافة حقل الصورة الأساسي إلى المرفقات من نوع الصورة. هذا الفعل
             سيتم تعيين حقل الصورة الأساسي إلى الصورة الأولى في مجموعة المرفقات في قاعدة البيانات، إذا لم يكن كذلك
             تم تعيينها بالفعل. <a class="link" href="https://github.com/hay-kot/homebox/pull/576">See GitHub PR #576</a>
          </DetailAction>
        </div>
      </BaseCard>
    </BaseContainer>
  </div>
</template>

<script setup lang="ts">
  import MdiFileChart from "~icons/mdi/file-chart";
  import MdiArrowRight from "~icons/mdi/arrow-right";
  import MdiDatabase from "~icons/mdi/database";
  import MdiAlert from "~icons/mdi/alert";

  definePageMeta({
    middleware: ["auth"],
  });
  useHead({
    title: "الرئيسية | ملف التعريف",
  });

  const modals = ref({
    item: false,
    location: false,
    label: false,
    import: false,
  });

  const api = useUserApi();
  const confirm = useConfirm();
  const notify = useNotifier();

  function getBillOfMaterials() {
    const url = api.reports.billOfMaterialsURL();
    window.open(url, "_blank");
  }

  function getExportTSV() {
    const url = api.items.exportURL();
    window.open(url, "_blank");
  }

  async function ensureAssetIDs() {
    const { isCanceled } = await confirm.open(
      "هل أنت متأكد أنك تريد التأكد من أن جميع الأصول لها معرف؟ قد يستغرق هذا بعض الوقت ولا يمكن التراجع عنه."
    );

    if (isCanceled) {
      return;
    }

    const result = await api.actions.ensureAssetIDs();

    if (result.error) {
      notify.error("فشل في التأكد من معرفات الأصول.");
      return;
    }

    notify.success(`${result.data.completed} تم تحديث الأصول.`);
  }

  async function ensureImportRefs() {
    const { isCanceled } = await confirm.open(
      "هل أنت متأكد أنك تريد التأكد من أن جميع الأصول تحتوي على import_ref؟ قد يستغرق هذا بعض الوقت ولا يمكن التراجع عنه."
    );

    if (isCanceled) {
      return;
    }

    const result = await api.actions.ensureImportRefs();

    if (result.error) {
      notify.error("فشل في التأكد من استيراد المراجع.");
      return;
    }

    notify.success(`${result.data.completed} تم تحديث الأصول.`);
  }

  async function resetItemDateTimes() {
    const { isCanceled } = await confirm.open(
      "هل أنت متأكد أنك تريد إعادة تعيين كافة قيم التاريخ والوقت؟ قد يستغرق هذا بعض الوقت ولا يمكن التراجع عنه."
    );

    if (isCanceled) {
      return;
    }

    const result = await api.actions.resetItemDateTimes();

    if (result.error) {
      notify.error("فشل في إعادة تعيين قيم التاريخ والوقت.");
      return;
    }

    notify.success(`${result.data.completed} تم تحديث الأصول.`);
  }

  async function setPrimaryPhotos() {
    const { isCanceled } = await confirm.open(
      "هل أنت متأكد أنك تريد تعيين الصور الأساسية؟ قد يستغرق هذا بعض الوقت ولا يمكن التراجع عنه."
    );

    if (isCanceled) {
      return;
    }

    const result = await api.actions.setPrimaryPhotos();

    if (result.error) {
      notify.error("فشل في تعيين الصور الأساسية.");
      return;
    }

    notify.success(`${result.data.completed} تم تحديث الأصول.`);
  }
</script>

<style scoped></style>
