<template>
  <div class="flex flex-col gap-5">

    <!-- هدر + فیلتر وضعیت -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="font-display text-xl md:text-2xl text-ink">تیکت‌های پشتیبانی</h2>
        <p v-if="loading" class="mt-2 h-3 w-28 animate-pulse rounded-full bg-ink/10" />
        <p v-else class="text-[12.5px] text-inkSoft mt-1">{{ faNumber(tickets.length) }} تیکت {{ statusFilter === 'closed' ? 'بسته‌شده' : 'باز' }}</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1.5 bg-ink/[0.04] rounded-full p-1">
          <button
            v-for="f in statusFilters"
            :key="f.value"
            type="button"
            class="px-4 py-2 rounded-full text-[12.5px] font-bold transition-colors whitespace-nowrap"
            :class="statusFilter === f.value ? 'bg-ink text-cream' : 'text-inkSoft hover:text-ink'"
            @click="statusFilter = f.value"
          >
            {{ f.label }}
          </button>
        </div>

        <button
          type="button"
          class="hidden sm:flex items-center gap-1.5 text-[13px] font-bold text-cream bg-accent px-5 py-2.5 rounded-full hover:bg-accentHover transition-colors"
          @click="openNewTicketModal"
        >
          <Icon name="tabler:plus" class="text-[16px]" /> ارسال تیکت جدید
        </button>
      </div>
    </div>

    <!-- اسکلت لودینگ -->
    <div v-if="loading" class="flex flex-col gap-4 animate-pulse" aria-busy="true">
      <div v-for="item in 3" :key="item" class="overflow-hidden rounded-[20px] border border-ink/[0.06] bg-cardLight">
        <div class="flex items-center justify-between border-b border-ink/[0.06] px-5 py-4">
          <div class="h-4 w-40 rounded-full bg-ink/10" />
          <div class="h-6 w-24 rounded-full bg-ink/10" />
        </div>
        <div class="flex items-center gap-4 p-5">
          <div class="h-10 w-10 rounded-xl bg-ink/[0.07]" />
          <div class="flex-1 space-y-3"><div class="h-4 w-3/5 rounded-full bg-ink/10" /><div class="h-3 w-24 rounded-full bg-ink/[0.07]" /></div>
          <div class="h-10 w-28 rounded-full bg-ink/[0.07]" />
        </div>
      </div>
    </div>

    <!-- لیست تیکت‌ها -->
    <div v-else-if="tickets.length" class="flex flex-col gap-4">
      <div
        v-for="item in tickets"
        :key="item.id"
        class="rounded-[20px] border border-ink/[0.06] bg-cardLight overflow-hidden"
      >
        <div class="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-ink/[0.06] bg-ink/[0.015]">
          <div class="flex items-center gap-4 text-[12px] text-inkSoft">
            <span class="flex items-center gap-1.5 font-bold text-ink font-latin" dir="ltr">
              <Icon name="tabler:ticket" class="text-[14px] text-accent" />
              #{{ faNumber(item.id) }}
            </span>
            <span v-if="item.department_title" class="flex items-center gap-1.5">
              <Icon name="tabler:building-store" class="text-[13px]" />
              {{ item.department_title }}
            </span>
            <span class="flex items-center gap-1.5">
              <Icon name="tabler:calendar" class="text-[13px]" />
              {{ faDate(item.updated_at) }}
            </span>
          </div>
          <span
            class="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full"
            :class="statusMeta(item.status_text).classes"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            {{ statusMeta(item.status_text).label }}
          </span>
        </div>

        <div class="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div class="w-11 h-11 rounded-xl bg-ink/[0.05] flex items-center justify-center text-inkSoft shrink-0">
            <Icon name="tabler:message-2" class="text-[19px]" />
          </div>

          <div class="min-w-0 flex-1">
            <p class="text-[14px] font-bold text-ink line-clamp-1">{{ item.title }}</p>
            <p v-if="item.product_title_fa" class="text-[11.5px] text-inkSoft mt-1 line-clamp-1">محصول: {{ item.product_title_fa }}</p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <button
              type="button"
              class="flex items-center gap-1.5 text-[12.5px] font-bold text-cream bg-accent px-4 py-2.5 rounded-full hover:bg-accentHover transition-colors whitespace-nowrap"
              @click="openDetail(item)"
            >
              جزئیات
              <Icon name="tabler:chevron-left" class="text-[13px] rtl:rotate-180" />
            </button>
            <button
              v-if="item.status !== 7"
              type="button"
              class="flex items-center gap-1.5 text-[12.5px] font-bold text-inkSoft border border-ink/10 px-4 py-2.5 rounded-full hover:border-red-300 hover:text-red-500 transition-colors whitespace-nowrap"
              @click="openCloseModal(item)"
            >
              بستن تیکت
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- حالت خالی -->
    <div v-else class="rounded-[22px] border border-dashed border-ink/15 bg-cardLight py-16 text-center">
      <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ink/5 text-ink/30">
        <Icon name="tabler:message-off" class="text-[28px]" />
      </div>
      <p class="mt-4 text-[14px] font-bold text-ink">
        {{ statusFilter === 'closed' ? 'تیکت بسته‌شده‌ای وجود ندارد' : 'هنوز تیکتی ثبت نکرده‌اید' }}
      </p>
      <p class="mt-1 text-[12.5px] text-inkSoft">برای طرح سوال یا مشکل خود، یک تیکت جدید ارسال کنید.</p>
      <button
        type="button"
        class="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-cream bg-accent px-5 py-2.5 rounded-full hover:bg-accentHover transition-colors"
        @click="openNewTicketModal"
      >
        <Icon name="tabler:plus" class="text-[16px]" /> ارسال تیکت جدید
      </button>
    </div>

    <!-- دکمه شناور موبایل -->
    <button
      type="button"
      class="sm:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-ink text-cream px-6 py-3.5 rounded-full shadow-xl text-[13px] font-bold"
      @click="openNewTicketModal"
    >
      <Icon name="tabler:plus" class="text-[16px]" /> تیکت جدید
    </button>

    <!-- مودال ارسال تیکت جدید -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="newTicketModal"
          class="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-[2px] p-0 sm:p-4"
          @click.self="closeNewTicketModal"
        >
          <div class="w-full sm:max-w-xl max-h-[92vh] overflow-y-auto rounded-t-[24px] sm:rounded-3xl bg-cardLight p-6">
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-center gap-3">
                <span class="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon name="tabler:ticket" />
                </span>
                <div>
                  <h3 class="text-[15px] font-bold text-ink">ارسال تیکت جدید</h3>
                  <p class="mt-0.5 text-[11px] text-inkSoft">
                    {{ newTicketStep === 1 ? 'واحد مورد نظر خود را انتخاب کنید' : 'موضوع و توضیحات تیکت را وارد کنید' }}
                  </p>
                </div>
              </div>
              <button type="button" class="w-9 h-9 grid place-items-center rounded-full bg-ink/5 hover:bg-red-50 hover:text-red-500" @click="closeNewTicketModal">
                <Icon name="tabler:x" />
              </button>
            </div>

            <!-- مرحله ۱: انتخاب دپارتمان -->
            <div v-if="newTicketStep === 1">
              <div v-if="departmentsLoading" class="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-pulse">
                <div v-for="i in 6" :key="i" class="h-24 rounded-2xl bg-ink/[0.06]" />
              </div>
              <div v-else-if="departments.length" class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button
                  v-for="(dep, idx) in departments"
                  :key="dep.id"
                  type="button"
                  class="flex flex-col items-center justify-center gap-2 rounded-2xl border border-ink/[0.07] bg-card py-5 px-2 hover:border-accent/40 hover:bg-accent/5 transition-colors"
                  @click="selectDepartment(dep)"
                >
                  <span class="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                    <Icon :name="departmentIcon(idx)" class="text-[20px]" />
                  </span>
                  <span class="text-[12.5px] font-bold text-ink text-center line-clamp-2">{{ dep.title }}</span>
                </button>
              </div>
              <p v-else class="text-center text-[12.5px] text-inkSoft py-8">در حال حاضر واحدی برای ثبت تیکت وجود ندارد.</p>
            </div>

            <!-- مرحله ۲: فرم تیکت -->
            <form v-else class="flex flex-col gap-4" @submit.prevent="submitNewTicket">
              <button type="button" class="flex items-center gap-1 self-start text-[12px] font-bold text-inkSoft hover:text-accent transition-colors" @click="newTicketStep = 1">
                <Icon name="tabler:arrow-right" class="rtl:rotate-180 text-[13px]" /> تغییر واحد
              </button>

              <div class="flex items-center gap-2 text-[12px] font-bold text-accent bg-accent/10 rounded-xl px-3.5 py-2.5 w-fit">
                <Icon name="tabler:building-store" class="text-[14px]" />
                {{ selectedDepartmentTitle }}
              </div>

              <div>
                <label class="block text-[12px] font-bold text-inkSoft mb-1.5">عنوان تیکت</label>
                <input
                  v-model="newForm.title"
                  type="text"
                  placeholder="مثلاً مشکل در پرداخت سفارش"
                  class="ticket-field"
                />
              </div>

              <div v-if="products.length || productsLoading">
                <label class="block text-[12px] font-bold text-inkSoft mb-1.5">محصول مرتبط (اختیاری)</label>
                <UiBaseSelect
                  v-model="newForm.product"
                  :options="productOptions"
                  placeholder="در صورت وجود، محصول مرتبط را انتخاب کنید"
                  :disabled="productsLoading"
                />
              </div>

              <div>
                <label class="block text-[12px] font-bold text-inkSoft mb-1.5">اهمیت</label>
                <div class="flex items-center gap-2">
                  <button
                    v-for="p in priorityOptions"
                    :key="p.value"
                    type="button"
                    class="flex-1 py-2.5 rounded-xl text-[12.5px] font-bold border transition-colors"
                    :class="newForm.priority === p.value ? 'bg-ink text-cream border-ink' : 'border-ink/10 text-inkSoft hover:border-ink/20'"
                    @click="newForm.priority = p.value"
                  >
                    {{ p.label }}
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-[12px] font-bold text-inkSoft mb-1.5">توضیحات</label>
                <textarea
                  v-model="newForm.description"
                  rows="5"
                  placeholder="مشکل یا سوال خود را با جزئیات شرح دهید..."
                  class="ticket-field resize-none leading-relaxed"
                />
              </div>

              <div>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="flex items-center gap-1.5 text-[12px] font-bold text-inkSoft border border-ink/10 rounded-full px-3.5 py-2 hover:border-accent/40 hover:text-accent transition-colors disabled:opacity-50"
                    :disabled="uploadingNew"
                    @click="fileInputNew?.click()"
                  >
                    <Icon :name="uploadingNew ? 'tabler:loader-2' : 'tabler:paperclip'" :class="uploadingNew && 'animate-spin'" class="text-[14px]" />
                    {{ uploadingNew ? 'در حال آپلود...' : 'پیوست فایل' }}
                  </button>
                  <input ref="fileInputNew" type="file" multiple class="hidden" @change="onNewFilesChange" />
                </div>
                <div v-if="newFiles.length" class="flex flex-wrap gap-2 mt-2.5">
                  <span v-for="f in newFiles" :key="f.file" class="inline-flex items-center gap-1.5 bg-ink/5 text-inkSoft text-[11px] px-2.5 py-1.5 rounded-full">
                    <Icon name="tabler:file-text" class="text-[12px]" />
                    <span class="max-w-[140px] truncate">{{ f.file.split('/').pop() }}</span>
                    <button type="button" class="hover:text-red-500" @click="removeFile(newFiles, f)"><Icon name="tabler:x" class="text-[12px]" /></button>
                  </span>
                </div>
              </div>

              <button
                type="submit"
                :disabled="creating"
                class="w-full h-12 rounded-full bg-accent text-cream text-[13.5px] font-bold flex items-center justify-center gap-2 hover:bg-accentHover transition-colors disabled:opacity-60"
              >
                <Icon v-if="creating" name="tabler:loader-2" class="animate-spin text-[16px]" />
                {{ creating ? 'در حال ارسال...' : 'ارسال تیکت' }}
              </button>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- مودال جزئیات تیکت -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="detailModal" class="fixed inset-0 z-[100] bg-cream flex flex-col">
          <div class="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-ink/[0.06] bg-cardLight shrink-0">
            <span class="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
              <Icon name="tabler:ticket" class="text-[18px]" />
            </span>
            <div class="min-w-0 flex-1">
              <p class="text-[14px] font-bold text-ink truncate">{{ detailTicket?.title || 'در حال بارگذاری...' }}</p>
              <p v-if="detailTicket" class="text-[11px] text-inkSoft mt-0.5">تیکت #{{ faNumber(detailTicket.id) }}</p>
            </div>
            <button type="button" class="w-9 h-9 grid place-items-center rounded-full bg-ink/5 hover:bg-red-50 hover:text-red-500 shrink-0" @click="closeDetail">
              <Icon name="tabler:x" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto">
            <div class="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 grid lg:grid-cols-[1fr_300px] gap-6 items-start">

              <!-- گفتگو -->
              <div class="flex flex-col gap-4 order-2 lg:order-1">
                <div v-if="detailLoading" class="flex flex-col gap-4 animate-pulse">
                  <div class="h-20 w-3/4 rounded-2xl bg-ink/[0.06]" />
                  <div class="h-20 w-3/4 rounded-2xl bg-ink/[0.06] self-end" />
                </div>

                <template v-else-if="detailTicket">
                  <div
                    v-for="(detail, idx) in detailTicket.ticket_details"
                    :key="idx"
                    class="flex"
                    :class="detail.type === 1 ? 'justify-start' : 'justify-end'"
                  >
                    <div class="max-w-[85%] sm:max-w-[70%] rounded-2xl p-4" :class="detail.type === 1 ? 'bg-[#A1D6CB]/25' : 'bg-[#577BC1]/10'">
                      <p class="text-[13px] text-ink leading-7 whitespace-pre-wrap" v-html="detail.description" />
                      <div v-if="detail.ticket_files?.length" class="flex flex-wrap gap-2 mt-2">
                        <a
                          v-for="(file, fi) in detail.ticket_files"
                          :key="fi"
                          :href="file.file"
                          target="_blank"
                          class="flex items-center gap-1.5 bg-white/60 text-ink/70 text-[11px] px-2.5 py-1.5 rounded-full hover:text-accent transition-colors"
                        >
                          <Icon name="tabler:paperclip" class="text-[12px]" /> پیوست {{ faNumber(fi + 1) }}
                        </a>
                      </div>
                      <div class="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-ink/10">
                        <span class="flex items-center gap-1.5 text-[11px] font-bold text-ink/60">
                          <Icon :name="detail.type === 1 ? 'tabler:user' : 'tabler:headset'" class="text-[13px]" />
                          {{ detail.type === 1 ? 'شما' : [detail.operator_first_name, detail.operator_last_name].filter(Boolean).join(' ') || 'کارشناس پشتیبانی' }}
                        </span>
                        <span class="text-[10.5px] text-ink/40 font-latin" dir="ltr">{{ formatDateTime(detail.created_at) }}</span>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- باکس پاسخ -->
                <div v-if="detailTicket && detailTicket.status !== 7" class="rounded-2xl bg-cardLight border border-ink/[0.06] p-4 mt-2">
                  <textarea
                    v-model="replyText"
                    rows="3"
                    placeholder="پاسخ خود را بنویسید..."
                    class="ticket-field resize-none leading-relaxed"
                  />
                  <div class="flex items-center justify-between gap-3 mt-3">
                    <div class="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        class="flex items-center gap-1.5 text-[12px] font-bold text-inkSoft border border-ink/10 rounded-full px-3.5 py-2 hover:border-accent/40 hover:text-accent transition-colors disabled:opacity-50"
                        :disabled="uploadingReply"
                        @click="fileInputReply?.click()"
                      >
                        <Icon :name="uploadingReply ? 'tabler:loader-2' : 'tabler:paperclip'" :class="uploadingReply && 'animate-spin'" class="text-[14px]" />
                        پیوست
                      </button>
                      <input ref="fileInputReply" type="file" multiple class="hidden" @change="onReplyFilesChange" />
                      <span v-for="f in replyFiles" :key="f.file" class="inline-flex items-center gap-1.5 bg-ink/5 text-inkSoft text-[11px] px-2.5 py-1.5 rounded-full">
                        <span class="max-w-[100px] truncate">{{ f.file.split('/').pop() }}</span>
                        <button type="button" class="hover:text-red-500" @click="removeFile(replyFiles, f)"><Icon name="tabler:x" class="text-[12px]" /></button>
                      </span>
                    </div>
                    <button
                      type="button"
                      :disabled="replySending"
                      class="shrink-0 flex items-center gap-1.5 text-[12.5px] font-bold text-cream bg-accent px-5 py-2.5 rounded-full hover:bg-accentHover transition-colors disabled:opacity-60"
                      @click="sendReply"
                    >
                      <Icon :name="replySending ? 'tabler:loader-2' : 'tabler:send-2'" :class="replySending && 'animate-spin'" class="text-[14px]" />
                      ارسال پاسخ
                    </button>
                  </div>
                </div>
                <div v-else-if="detailTicket" class="rounded-2xl bg-green-50 text-green-700 text-[12.5px] font-bold text-center py-4">
                  این تیکت بسته شده است.
                </div>
              </div>

              <!-- اطلاعات تیکت -->
              <div v-if="detailTicket" class="order-1 lg:order-2 rounded-2xl bg-cardLight border border-ink/[0.06] p-5 flex flex-col gap-3 text-[12.5px]">
                <div class="flex items-center justify-between">
                  <span class="text-inkSoft">وضعیت</span>
                  <span class="font-bold px-2.5 py-1 rounded-full text-[11px]" :class="statusMeta(detailTicket.status_text).classes">
                    {{ statusMeta(detailTicket.status_text).label }}
                  </span>
                </div>
                <div class="h-px bg-ink/[0.06]" />
                <div class="flex items-center justify-between"><span class="text-inkSoft">شماره تیکت</span><strong class="text-ink font-latin">#{{ faNumber(detailTicket.id) }}</strong></div>
                <div class="flex items-center justify-between"><span class="text-inkSoft">تاریخ ثبت</span><strong class="text-ink">{{ formatDateTime(detailTicket.created_at) }}</strong></div>
                <div class="flex items-center justify-between"><span class="text-inkSoft">آخرین بروزرسانی</span><strong class="text-ink">{{ formatDateTime(detailTicket.updated_at) }}</strong></div>
                <div v-if="detailTicket.department_title" class="flex items-center justify-between"><span class="text-inkSoft">دپارتمان</span><strong class="text-ink">{{ detailTicket.department_title }}</strong></div>
                <div v-if="detailTicket.priority || detailTicket.priority_text" class="flex items-center justify-between"><span class="text-inkSoft">اهمیت</span><strong class="text-ink">{{ priorityLabel(detailTicket) }}</strong></div>
                <div v-if="detailTicket.product_title_fa" class="flex items-center justify-between gap-3"><span class="text-inkSoft shrink-0">محصول</span><strong class="text-ink text-left">{{ detailTicket.product_title_fa }}</strong></div>

                <button
                  v-if="detailTicket.status !== 7"
                  type="button"
                  class="mt-2 flex items-center justify-center gap-1.5 text-[12.5px] font-bold text-red-500 border border-red-200 rounded-full px-4 py-2.5 hover:bg-red-50 transition-colors"
                  @click="openCloseModal(detailTicket)"
                >
                  <Icon name="tabler:circle-check" class="text-[14px]" /> بستن تیکت
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- مودال بستن و امتیازدهی -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="closeModal" class="fixed inset-0 z-[110] flex items-center justify-center bg-ink/40 backdrop-blur-[2px] p-4" @click.self="closing || (closeModal = false)">
          <div class="w-full max-w-sm rounded-3xl bg-cardLight p-6 text-center">
            <div class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/10 text-accent">
              <Icon name="tabler:star-filled" class="text-[22px]" />
            </div>
            <p class="mt-4 mb-1 text-[15px] font-bold text-ink">به پاسخ کارشناس امتیاز دهید</p>
            <p class="mb-4 text-[12.5px] text-inkSoft leading-6">پس از ثبت امتیاز، این تیکت بسته خواهد شد.</p>

            <div class="flex items-center justify-center gap-1.5 mb-2" @mouseleave="hoverRating = 0">
              <button
                v-for="s in 5" :key="s"
                type="button"
                class="transition-transform duration-150 hover:scale-110"
                @mouseenter="hoverRating = s"
                @click="ratingValue = s"
              >
                <Icon
                  name="tabler:star-filled"
                  class="text-[28px]"
                  :class="(hoverRating || ratingValue) >= s ? 'text-gold' : 'text-ink/15'"
                />
              </button>
            </div>
            <p class="text-[13px] font-bold text-ink mb-5">{{ ratingLabels[ratingValue - 1] }}</p>

            <div class="flex gap-2">
              <button
                type="button"
                class="flex-1 py-2.5 rounded-full border border-ink/10 text-[13px] font-bold text-inkSoft hover:bg-ink/5 transition-colors"
                :disabled="closing"
                @click="closeModal = false"
              >
                انصراف
              </button>
              <button
                type="button"
                class="flex-1 py-2.5 rounded-full bg-red-500 text-white text-[13px] font-bold hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-1.5"
                :disabled="closing"
                @click="confirmClose"
              >
                <Icon v-if="closing" name="tabler:loader-2" class="animate-spin text-[15px]" />
                بستن تیکت
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, watch } from 'vue';
import { toast } from 'vue-sonner';
import { faDate, faNumber, faDigits } from '~/utils/format.ts';

definePageMeta({ layout: 'account' });
useSeoMeta({ title: 'تیکت‌های پشتیبانی | ماهلین اسکین‌کر' });

const customizer = useCustomizerStore();

// ─── لیست تیکت‌ها ──────────────────────────────────────────
const tickets = ref([]);
const loading = ref(true);
const statusFilter = ref('open');
const statusFilters = [
  { value: 'open', label: 'باز' },
  { value: 'closed', label: 'بسته‌شده' },
];

let pollInterval = null;

function loadTickets() {
  loading.value = true;
  useGarnetApiFetch('tickets/indexByUserId', {
    status: statusFilter.value === 'closed' ? '7' : '1,2,3,4,5,6',
  })
    .then((response) => {
      if (response?.error) throw new Error(response.error?.data?.message || response.error?.message || 'خطا در دریافت تیکت‌ها');
      tickets.value = response.Tickets || [];
    })
    .catch((error) => toast.error(error?.message || 'خطا در دریافت تیکت‌ها'))
    .finally(() => { loading.value = false; });
}

watch(statusFilter, loadTickets);

// ─── وضعیت‌ها ──────────────────────────────────────────────
const STATUS_META = {
  created: { label: 'ثبت شده', classes: 'bg-amber-50 text-amber-600' },
  pending: { label: 'در انتظار بررسی', classes: 'bg-amber-50 text-amber-600' },
  processing: { label: 'در حال بررسی', classes: 'bg-amber-50 text-amber-600' },
  operator_reply: { label: 'پاسخ کارشناس', classes: 'bg-red-50 text-red-600' },
  user_reply: { label: 'پاسخ شما ثبت شد', classes: 'bg-amber-50 text-amber-600' },
  awaiting_user_reply: { label: 'منتظر پاسخ شما', classes: 'bg-red-50 text-red-600' },
  completed: { label: 'بسته شده', classes: 'bg-green-50 text-green-700' },
  unknown: { label: 'نامشخص', classes: 'bg-amber-50 text-amber-600' },
};
function statusMeta(text) {
  return STATUS_META[text] || STATUS_META.unknown;
}

// ─── تاریخ و ساعت ──────────────────────────────────────────
function formatDateTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  d.setHours(d.getHours() + (customizer.timeZoneString?.H ?? 0));
  d.setMinutes(d.getMinutes() + (customizer.timeZoneString?.M ?? 0));
  const time = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  return `${faDate(d)} - ${faDigits(time)}`;
}

// ─── دپارتمان‌ها ───────────────────────────────────────────
const departments = ref([]);
const departmentsLoading = ref(false);
const DEPARTMENT_ICONS = ['tabler:headset', 'tabler:credit-card', 'tabler:package', 'tabler:truck', 'tabler:settings', 'tabler:message-2'];
function departmentIcon(idx) {
  return DEPARTMENT_ICONS[idx % DEPARTMENT_ICONS.length];
}
function loadDepartments() {
  departmentsLoading.value = true;
  useGarnetApiFetch('/tickets/indexDepartments')
    .then((response) => {
      if (response?.error) throw new Error(response.error?.data?.message || 'خطا در دریافت دپارتمان‌ها');
      departments.value = (response.TicketDepartments || []).map((d) => ({ id: d.id, title: d.title }));
    })
    .catch((error) => toast.error(error?.message || 'خطا در دریافت دپارتمان‌ها'))
    .finally(() => { departmentsLoading.value = false; });
}

// ─── محصولات کاربر (اختیاری) ───────────────────────────────
const products = ref([]);
const productsLoading = ref(false);
const productOptions = computed(() =>
  products.value.map((p) => ({ label: p.title_fa, value: p.product_id }))
);
function loadProducts() {
  productsLoading.value = true;
  useGarnetApiFetch('/invoices/indexDetailsByUser')
    .then((response) => {
      if (response?.error) throw new Error('');
      products.value = response.InvoiceDetails || [];
    })
    .catch(() => { products.value = []; })
    .finally(() => { productsLoading.value = false; });
}

// ─── مودال تیکت جدید ───────────────────────────────────────
const newTicketModal = ref(false);
const newTicketStep = ref(1);
const creating = ref(false);
const uploadingNew = ref(false);
const fileInputNew = ref(null);
const newFiles = ref([]);
const priorityOptions = [
  { value: 1, label: 'کم' },
  { value: 2, label: 'عادی' },
  { value: 3, label: 'زیاد' },
];
const newForm = reactive({ department: null, product: null, priority: 1, title: '', description: '' });

const selectedDepartmentTitle = computed(() => departments.value.find((d) => d.id === newForm.department)?.title || '');

function resetNewForm() {
  Object.assign(newForm, { department: null, product: null, priority: 1, title: '', description: '' });
  newFiles.value = [];
}

function openNewTicketModal() {
  resetNewForm();
  newTicketStep.value = 1;
  newTicketModal.value = true;
  if (!departments.value.length) loadDepartments();
  if (!products.value.length) loadProducts();
}
function closeNewTicketModal() {
  if (creating.value) return;
  newTicketModal.value = false;
}
function selectDepartment(dep) {
  newForm.department = dep.id;
  newTicketStep.value = 2;
}

function submitNewTicket() {
  if (!newForm.title.trim() || !newForm.description.trim()) {
    toast.error('عنوان و توضیحات تیکت ضروری است');
    return;
  }
  creating.value = true;
  useGarnetApiFetch('/tickets/create', {
    description: newForm.description.trim().replace(/\n/g, '<br>'),
    department: newForm.department,
    title: newForm.title.trim(),
    priority: newForm.priority,
    type: 1,
    product_id: newForm.product ? parseInt(newForm.product) : null,
    ticket_files: newFiles.value,
  })
    .then((response) => {
      if (response?.error) throw new Error(response.error?.data?.message || 'خطا در ارسال تیکت');
      if (!response?.Ticket) throw new Error(response?.msg || 'خطا در ارسال تیکت');
      tickets.value.unshift(response.Ticket);
      toast.success('تیکت شما با موفقیت ثبت شد');
      newTicketModal.value = false;
    })
    .catch((error) => toast.error(error?.message || 'خطا در ارسال تیکت'))
    .finally(() => { creating.value = false; });
}

// ─── آپلود فایل (مشترک) ─────────────────────────────────────
function uploadFiles(fileList, targetRef, loadingRef) {
  if (!fileList || !fileList.length) return;
  const formData = new FormData();
  Array.from(fileList).forEach((file, index) => formData.append('files' + index, file));
  formData.append('destinationFolder', 'tickets');
  loadingRef.value = true;
  useGarnetApiFetch('/uploadImage', formData, true)
    .then((response) => {
      if (response?.code !== 2000 || !response.UploadedImages) throw new Error('خطا در آپلود فایل');
      response.UploadedImages.forEach((url) => targetRef.value.push({ file: url }));
      toast.success('فایل با موفقیت آپلود شد');
    })
    .catch((error) => toast.error(error?.message || 'خطا در آپلود فایل'))
    .finally(() => { loadingRef.value = false; });
}
function onNewFilesChange(e) {
  uploadFiles(e.target.files, newFiles, uploadingNew);
  e.target.value = '';
}
function onReplyFilesChange(e) {
  uploadFiles(e.target.files, replyFiles, uploadingReply);
  e.target.value = '';
}
function removeFile(arr, fileObj) {
  const index = arr.findIndex((f) => f === fileObj);
  if (index !== -1) arr.splice(index, 1);
}

// ─── جزئیات تیکت ────────────────────────────────────────────
const detailModal = ref(false);
const detailLoading = ref(false);
const detailTicket = ref(null);
const replyText = ref('');
const replyFiles = ref([]);
const replySending = ref(false);
const uploadingReply = ref(false);
const fileInputReply = ref(null);

function openDetail(item) {
  detailModal.value = true;
  detailLoading.value = true;
  detailTicket.value = null;
  replyText.value = '';
  replyFiles.value = [];
  useGarnetApiFetch('/tickets/show', { ticketID: item.id, direction: 'asc' })
    .then((response) => {
      if (response?.error) throw new Error(response.error?.data?.message || 'خطا در دریافت جزئیات تیکت');
      if (!response?.Ticket) throw new Error('خطا در دریافت جزئیات تیکت');
      detailTicket.value = { ...response.Ticket, ticket_details: response.TicketDetail || [] };
    })
    .catch((error) => {
      toast.error(error?.message || 'خطا در دریافت جزئیات تیکت');
      detailModal.value = false;
    })
    .finally(() => { detailLoading.value = false; });
}
function closeDetail() {
  detailModal.value = false;
  detailTicket.value = null;
  replyText.value = '';
  replyFiles.value = [];
}

function sendReply() {
  if (!replyText.value.trim()) {
    toast.error('لطفاً متن پاسخ را وارد کنید');
    return;
  }
  replySending.value = true;
  useGarnetApiFetch('/tickets/createReply', {
    ticketID: detailTicket.value.id,
    description: replyText.value.trim().replace(/\n/g, '<br>'),
    type: 1,
    ticket_files: replyFiles.value,
  })
    .then((response) => {
      if (response?.error) throw new Error(response.error?.data?.message || 'خطا در ارسال پاسخ');
      if (!response?.Ticket) throw new Error('خطا در ارسال پاسخ');
      detailTicket.value = { ...response.Ticket, ticket_details: (response.TicketDetail || []).slice().reverse() };
      replyText.value = '';
      replyFiles.value = [];
      const idx = tickets.value.findIndex((t) => t.id === detailTicket.value.id);
      if (idx !== -1) {
        tickets.value[idx] = {
          ...tickets.value[idx],
          status: 5,
          status_text: 'user_reply',
          updated_at: detailTicket.value.updated_at,
        };
      }
    })
    .catch((error) => toast.error(error?.message || 'خطا در ارسال پاسخ'))
    .finally(() => { replySending.value = false; });
}

function priorityLabel(ticket) {
  const map = { 1: 'کم', 2: 'عادی', 3: 'زیاد' };
  if (ticket?.priority && map[ticket.priority]) return map[ticket.priority];
  return ticket?.priority_text || '—';
}

// ─── بستن و امتیازدهی ───────────────────────────────────────
const closeModal = ref(false);
const closing = ref(false);
const closeTicketItem = ref(null);
const ratingValue = ref(3);
const hoverRating = ref(0);
const ratingLabels = ['خیلی ضعیف', 'ضعیف', 'متوسط', 'خوب', 'عالی'];

function openCloseModal(item) {
  closeTicketItem.value = item;
  ratingValue.value = 3;
  closeModal.value = true;
}
function confirmClose() {
  closing.value = true;
  useGarnetApiFetch('/tickets/changeStatusToCompleted', {
    ticketID: closeTicketItem.value.id,
    status: 7,
    score: ratingValue.value,
  })
    .then((response) => {
      if (response?.error) throw new Error(response.error?.data?.message || 'خطا در بستن تیکت');
      const idx = tickets.value.findIndex((t) => t.id === closeTicketItem.value.id);
      if (idx !== -1) {
        if (statusFilter.value === 'open') tickets.value.splice(idx, 1);
        else tickets.value[idx] = { ...tickets.value[idx], status: 7, status_text: 'completed' };
      }
      if (detailTicket.value && detailTicket.value.id === closeTicketItem.value.id) {
        detailTicket.value = { ...detailTicket.value, status: 7, status_text: 'completed' };
      }
      toast.success('تیکت با موفقیت بسته شد');
      closeModal.value = false;
    })
    .catch((error) => toast.error(error?.message || 'خطا در بستن تیکت'))
    .finally(() => { closing.value = false; });
}

// ─── چرخه حیات ──────────────────────────────────────────────
onMounted(() => {
  loadTickets();
  pollInterval = setInterval(loadTickets, 30000);
});
onUnmounted(() => clearInterval(pollInterval));
</script>

<style scoped>
.ticket-field {
  width: 100%;
  border-radius: 0.85rem;
  border: 1px solid rgb(63 55 51 / 0.12);
  background: var(--color-cream, #fbf8f3);
  padding: 0.8rem 1rem;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s ease;
}
.ticket-field:focus { border-color: var(--color-accent, #a28466); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
