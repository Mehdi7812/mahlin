<script setup>
import { ref, reactive, computed, onMounted, nextTick, watch } from "vue";
import { toast } from "vue-sonner";

const props = defineProps({
  additional: { type: String, default: "" },
});

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const customizer = useCustomizerStore();

/* =========================================================
 * قوانین اعتبارسنجی — برای تغییر سیاست‌ها فقط همین‌جا را عوض کنید
 * ========================================================= */
const RULES = {
  PASSWORD_MIN: 6,
  PASSWORD_MAX: 64,
  NAME_MIN: 2,
  NAME_MAX: 40,
  MIN_AGE: 0,
  MAX_AGE: 100,
};

/* =========================================================
 * State
 * ========================================================= */
const mobile = ref("");
const presenter = ref("");
const password = ref("");
const password_confirm = ref("");
const changePass = ref(false);

const errors = reactive({
  mobile: "",
  password: "",
  password_confirm: "",
  presenter: "",
  first_name: "",
  last_name: "",
  national_code: "",
  birth_date: "",
  terms: "",
});

// فرم مشخصات کاربر جدید
const profileForm = reactive({
  first_name: "",
  last_name: "",
  birth_date: "",
  national_code: "",
});
const acceptedTerms = ref(false);

const loading = ref(false);
const formStep = ref("getMobile"); // getMobile | otp | profile | password | changePassword | presenter
const mobileExist = ref(false);
const lastCheckedMobile = ref(null);
const otpKey = ref(0);
const skipOtpSend = ref(false);
const otpTimer = ref(200);
const otpInterval = ref(null);
const otpAlreadySent = ref(false);
const verificationCode = ref(false);

const allowRegister = ref(true);
const allowLoginWithPassword = ref(true);
const logoSrc = ref("/logo/mahlin-lockup.png");
const getPresenter = ref(false);
const backTo = ref("/");

const getMobileInput = ref(null);
const getPresenterInput = ref(null);
const profileFirstNameInput = ref(null);
const passwordInput = ref(null);
const newPasswordInput = ref(null);

const showPassword = ref(false);
const showPasswordConfirm = ref(false);

// ماسک درخشش دقیقاً به شکل لوگو (فقط روی قسمت‌های غیرشفاف PNG می‌تابد)
const logoMaskStyle = computed(() => ({
  "--logo-url": `url("${logoSrc.value}")`,
}));

/* ---------- افکت دکمه‌ها: نورِ دنبال‌کننده‌ی ماوس + موج کلیک ---------- */
const vBtnFx = {
  mounted(el) {
    const setPos = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    const ripple = (e) => {
      if (el.disabled) return;
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2;
      const wave = document.createElement("span");
      wave.className = "mh-btn-ripple";
      wave.style.width = wave.style.height = `${size}px`;
      wave.style.left = `${e.clientX - r.left - size / 2}px`;
      wave.style.top = `${e.clientY - r.top - size / 2}px`;
      wave.addEventListener("animationend", () => wave.remove(), { once: true });
      el.appendChild(wave);
    };

    el.addEventListener("pointermove", setPos);
    el.addEventListener("pointerenter", setPos);
    el.addEventListener("pointerdown", ripple);
    el._mhBtnFx = { setPos, ripple };
  },
  unmounted(el) {
    const h = el._mhBtnFx;
    if (!h) return;
    el.removeEventListener("pointermove", h.setPos);
    el.removeEventListener("pointerenter", h.setPos);
    el.removeEventListener("pointerdown", h.ripple);
    delete el._mhBtnFx;
  },
};

// بارگذاری داینامیک پکیج تقویم (فقط سمت کلاینت)
const DatePicker = ref(null);
if (import.meta.client) {
  const pickerModule = await import("vue3-persian-datetime-picker");
  DatePicker.value = pickerModule.default;
}

/* =========================================================
 * Helpers: ارقام و نرمال‌سازی
 * ========================================================= */
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";

const toEnDigits = (str) =>
  String(str ?? "")
    .replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(AR_DIGITS.indexOf(d)));

const toFaDigits = (n) => String(n).replace(/\d/g, (d) => FA_DIGITS[d]);
const onlyDigits = (str) => toEnDigits(str).replace(/\D/g, "");

/* ---------- موبایل ---------- */
const MOBILE_REGEX = /^09\d{9}$/;

// پشتیبانی از +98 / 0098 / 98 / 9xxxxxxxxx
const normalizeMobile = (str) => {
  let d = onlyDigits(str);
  if (d.startsWith("0098")) d = "0" + d.slice(4);
  else if (d.startsWith("98") && d.length === 12) d = "0" + d.slice(2);
  else if (d.startsWith("9") && d.length === 10) d = "0" + d;
  return d;
};

const validateMobile = (value, label = "شماره موبایل") => {
  if (!value) return `${label} را وارد کنید`;
  if (!MOBILE_REGEX.test(value)) return `${label} باید ۱۱ رقم و با ۰۹ شروع شود`;
  return "";
};

/* ---------- نام و نام خانوادگی ---------- */
// فقط حروف فارسی، فاصله و نیم‌فاصله
const PERSIAN_NAME_REGEX =
  /^[\u0621-\u063A\u0641-\u064A\u067E\u0686\u0698\u06A9\u06AF\u06CC\u06C0\u200C ]+$/;

const normalizeName = (str) =>
  String(str ?? "")
    .replace(/[\u064A\u0649]/g, "\u06CC") // ي ى → ی
    .replace(/\u0643/g, "\u06A9") // ك → ک
    .replace(/\u0640/g, "") // کشیده (ـ)
    .replace(/[\u064B-\u0652]/g, "") // اعراب
    .replace(/\s+/g, " ")
    .replace(/\u200C{2,}/g, "\u200C")
    .replace(/ ?\u200C ?/g, "\u200C")
    .replace(/^[\s\u200C]+|[\s\u200C]+$/g, "");

const validateName = (value, label) => {
  if (!value) return `${label} را وارد کنید`;
  if (!PERSIAN_NAME_REGEX.test(value)) return `${label} فقط باید با حروف فارسی نوشته شود`;
  const letters = value.replace(/[\s\u200C]/g, "");
  if (letters.length < RULES.NAME_MIN) {
    return `${label} باید حداقل ${toFaDigits(RULES.NAME_MIN)} حرف باشد`;
  }
  if (value.length > RULES.NAME_MAX) {
    return `${label} نباید بیشتر از ${toFaDigits(RULES.NAME_MAX)} کاراکتر باشد`;
  }
  return "";
};

/* ---------- کد ملی ---------- */
const validateNationalCode = (code) => {
  if (!code) return "کد ملی را وارد کنید";
  if (!/^\d{10}$/.test(code)) return "کد ملی باید ۱۰ رقم باشد";
  if (/^(\d)\1{9}$/.test(code)) return "کد ملی نامعتبر است"; // مثل 0000000000 که چک‌دیجیت را پاس می‌کند

  const check = +code[9];
  const sum = Array.from({ length: 9 }).reduce((acc, _, i) => acc + +code[i] * (10 - i), 0);
  const remainder = sum % 11;
  const isValid = remainder < 2 ? check === remainder : check === 11 - remainder;

  return isValid ? "" : "کد ملی نامعتبر است";
};

/* ---------- تاریخ تولد ---------- */
function toGregorianStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const yearsAgo = (years) => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - years);
  return d;
};

const maxBirthDate = computed(() => toGregorianStr(yearsAgo(RULES.MIN_AGE)));
const minBirthDate = computed(() => toGregorianStr(yearsAgo(RULES.MAX_AGE)));

const parseGregorian = (str) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(toEnDigits(str));
  if (!m) return null;
  const [y, mo, d] = [+m[1], +m[2], +m[3]];
  const date = new Date(y, mo - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) return null;
  return date;
};

const calcAge = (birth, today = new Date()) => {
  const age = today.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());
  return beforeBirthday ? age - 1 : age;
};

const validateBirthDate = (value) => {
  if (!value) return "تاریخ تولد را وارد کنید";
  const date = parseGregorian(value);
  if (!date) return "تاریخ تولد نامعتبر است";
  if (date > new Date()) return "تاریخ تولد نمی‌تواند در آینده باشد";
  const age = calcAge(date);
  if (age < RULES.MIN_AGE) return `حداقل سن برای ثبت‌نام ${toFaDigits(RULES.MIN_AGE)} سال است`;
  if (age > RULES.MAX_AGE) return "تاریخ تولد نامعتبر است";
  return "";
};

// نمایش جلالیِ تاریخ ذخیره‌شده (میلادی) داخل اینپوت
function toJalaliDisplay(gregorianStr) {
  if (!gregorianStr) return "";
  const [y, m, d] = gregorianStr.split("-").map(Number);
  if (!y || !m || !d) return "";

  const utcDate = new Date(Date.UTC(y, m - 1, d));
  const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).formatToParts(utcDate);

  const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}/${get("month")}/${get("day")}`;
}
const birthDateDisplay = computed(() => toJalaliDisplay(profileForm.birth_date));

/* ---------- رمز عبور ---------- */
const PERSIAN_CHAR_REGEX = /[\u0600-\u06FF\u200C]/;
const PRINTABLE_ASCII_REGEX = /^[\x21-\x7E]+$/;

const passwordChecks = computed(() => {
  const pw = password.value || "";
  return [
    { key: "len", label: `حداقل ${toFaDigits(RULES.PASSWORD_MIN)} کاراکتر`, ok: pw.length >= RULES.PASSWORD_MIN },
  ];
});

// فقط هشدار (غیرمسدودکننده) برای ورود؛ ممکن است رمزهای قدیمی حروف فارسی داشته باشند
const loginPasswordLooksPersian = computed(() => PERSIAN_CHAR_REGEX.test(password.value || ""));

const validateNewPassword = (pw) => {
  if (!pw) return "رمز عبور را وارد کنید";
  if (PERSIAN_CHAR_REGEX.test(pw)) {
    return "رمز عبور نباید حروف یا اعداد فارسی داشته باشد؛ زبان صفحه‌کلید را انگلیسی کنید";
  }
  if (/\s/.test(pw)) return "رمز عبور نباید فاصله داشته باشد";
  if (!PRINTABLE_ASCII_REGEX.test(pw)) return "رمز عبور فقط می‌تواند شامل حروف انگلیسی، عدد و علائم باشد";
  if (pw.length < RULES.PASSWORD_MIN) return `رمز عبور باید حداقل ${toFaDigits(RULES.PASSWORD_MIN)} کاراکتر باشد`;
  if (pw.length > RULES.PASSWORD_MAX) return `رمز عبور نباید بیشتر از ${toFaDigits(RULES.PASSWORD_MAX)} کاراکتر باشد`;
  if (!/\d/.test(pw)) return "رمز عبور باید حداقل یک عدد داشته باشد";

  const mobileTail = (mobile.value || "").slice(1); // 9xxxxxxxxx
  if (mobileTail && pw.includes(mobileTail)) return "رمز عبور نباید شامل شماره موبایل شما باشد";
  if (profileForm.national_code && pw.includes(profileForm.national_code)) {
    return "رمز عبور نباید شامل کد ملی شما باشد";
  }
  return "";
};

const validatePasswordConfirm = (pw, confirm) => {
  if (!confirm) return "تکرار رمز عبور را وارد کنید";
  if (pw !== confirm) return "تکرار رمز عبور با رمز عبور یکسان نیست";
  return "";
};

/* ---------- معرف ---------- */
const validatePresenter = (value) => {
  const err = validateMobile(value, "شماره موبایل معرف");
  if (err) return err;
  if (value === mobile.value) return "نمی‌توانید شماره خودتان را به‌عنوان معرف وارد کنید";
  return "";
};

/* ---------- اعتبارسنجی کامل مرحله‌ی مشخصات ---------- */
const validateProfile = () => {
  profileForm.first_name = normalizeName(profileForm.first_name);
  profileForm.last_name = normalizeName(profileForm.last_name);
  profileForm.national_code = onlyDigits(profileForm.national_code);

  errors.first_name = validateName(profileForm.first_name, "نام");
  errors.last_name = validateName(profileForm.last_name, "نام خانوادگی");
  errors.national_code = profileForm.national_code ? validateNationalCode(profileForm.national_code) : "";
  errors.birth_date = validateBirthDate(profileForm.birth_date);
  errors.terms = acceptedTerms.value ? "" : "برای ادامه باید قوانین و شرایط را بپذیرید";

  return !errors.first_name && !errors.last_name && !errors.national_code && !errors.birth_date && !errors.terms;
};

/* ---------- blur handlers ---------- */
const onNameBlur = (field, label) => {
  profileForm[field] = normalizeName(profileForm[field]);
  if (profileForm[field]) errors[field] = validateName(profileForm[field], label);
};

const onNationalCodeBlur = () => {
  if (profileForm.national_code) errors.national_code = validateNationalCode(profileForm.national_code);
};

const onPasswordConfirmBlur = () => {
  if (password_confirm.value) {
    errors.password_confirm = validatePasswordConfirm(password.value, password_confirm.value);
  }
};

/* ---------- پاک‌سازی ورودی‌ها هنگام تایپ ---------- */
watch(mobile, (v) => {
  const s = onlyDigits(v).slice(0, 14);
  if (s !== v) mobile.value = s;
});

watch(presenter, (v) => {
  const s = onlyDigits(v).slice(0, 14);
  if (s !== v) presenter.value = s;
});

watch(
  () => profileForm.national_code,
  (v) => {
    const s = onlyDigits(v).slice(0, 10);
    if (s !== v) profileForm.national_code = s;
  }
);

watch(
  () => profileForm.birth_date,
  (v) => {
    if (v) errors.birth_date = validateBirthDate(v);
  }
);

watch(acceptedTerms, (v) => {
  if (v) errors.terms = "";
});

/* =========================================================
 * UI helpers
 * ========================================================= */
const stepOrder = ["getMobile", "otp", "profile", "password", "changePassword", "presenter"];
const stepIndex = computed(() => {
  const idx = stepOrder.indexOf(formStep.value);
  return idx === -1 ? 0 : idx;
});
const progressPercent = computed(() => (stepIndex.value / (stepOrder.length - 1)) * 100);

const stepIcon = computed(() => {
  switch (formStep.value) {
    case "getMobile":
      return "tabler:device-mobile-message";
    case "otp":
      return "tabler:shield-check";
    case "password":
      return "tabler:lock-password";
    case "changePassword":
      return "tabler:key";
    case "profile":
      return "tabler:id";
    default:
      return "tabler:users-plus";
  }
});

const stepMeta = computed(() => {
  switch (formStep.value) {
    case "otp":
      return { title: "کد تایید را وارد کنید", subtitle: "کد ۵ رقمی ارسال شده را وارد نمایید" };
    case "password":
      return { title: "رمز عبور خود را وارد کنید", subtitle: "برای ورود امن، رمز عبورتان را وارد کنید" };
    case "changePassword":
      return mobileExist.value
        ? { title: "تغییر رمز عبور", subtitle: "یک رمز عبور قوی و امن انتخاب کنید" }
        : { title: "انتخاب رمز عبور", subtitle: "یک رمز عبور قوی و امن انتخاب کنید" };
    case "presenter":
      return { title: "ثبت معرف", subtitle: "در صورت داشتن معرف، شماره را وارد کنید" };
    case "profile":
      return { title: "تکمیل مشخصات", subtitle: "برای ادامه، اطلاعات هویتی‌تان را وارد کنید" };
    default:
      return { title: allowRegister.value ? "ورود | ثبت‌نام" : "ورود", subtitle: "به دنیای ماهلین خوش آمدید" };
  }
});

async function focusStepInput(step) {
  if (!import.meta.client) return;
  await nextTick();

  const inputByStep = {
    getMobile: getMobileInput,
    password: passwordInput,
    profile: profileFirstNameInput,
    changePassword: newPasswordInput,
    presenter: getPresenterInput,
  };

  const focusInput = () => {
    if (formStep.value !== step) return;
    inputByStep[step]?.value?.focus();
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(focusInput);
  });
  setTimeout(focusInput, 350);
}

watch(formStep, focusStepInput, { immediate: true });

onMounted(() => {
  if (props.additional && props.additional !== "") {
    try {
      const obj = JSON.parse(props.additional);
      allowRegister.value = obj.allowRegister === "true";
      allowLoginWithPassword.value = obj.allowLoginWithPassword === "true";
      backTo.value = obj.routeAfterLogin && obj.routeAfterLogin !== "" ? obj.routeAfterLogin : backTo.value;
      logoSrc.value = obj.logoSrc && obj.logoSrc !== "" ? obj.logoSrc : logoSrc.value;
      getPresenter.value = obj.getPresenter === "true";
    } catch (e) {
      /* ignore malformed additional config */
    }
  }
  if (route.query.back) {
    backTo.value = route.query.back;
  }
  getUserInfo();
});

/* =========================================================
 * OTP
 * ========================================================= */
const startOtpTimer = () => {
  if (otpInterval.value) clearInterval(otpInterval.value);
  otpTimer.value = 200;
  otpInterval.value = setInterval(() => {
    if (otpTimer.value <= 0) {
      clearInterval(otpInterval.value);
    } else {
      otpTimer.value -= 1;
    }
  }, 1000);
};

const resetOtpForNewMobile = () => {
  skipOtpSend.value = false;
  otpAlreadySent.value = false;
  otpKey.value++;
  if (otpInterval.value) {
    clearInterval(otpInterval.value);
    otpInterval.value = null;
  }
  otpTimer.value = 200;
};

const goToForgetPassword = () => {
  changePass.value = true;
  skipOtpSend.value = false;
  otpKey.value++;
  password.value = "";
  password_confirm.value = "";
  errors.password = "";
  errors.password_confirm = "";
  formStep.value = "otp";
};

const editMobileNumber = () => {
  formStep.value = "getMobile";
  errors.mobile = "";
  lastCheckedMobile.value = null; // با تغییر شماره دوباره از سرور بررسی می‌شود
  verificationCode.value = false;
  skipOtpSend.value = false;
  otpAlreadySent.value = false;
  if (otpInterval.value) {
    clearInterval(otpInterval.value);
    otpInterval.value = null;
  }
};

/* =========================================================
 * Actions
 * ========================================================= */
const checkUser = async () => {
  if (loading.value) return;

  mobile.value = normalizeMobile(mobile.value);
  errors.mobile = validateMobile(mobile.value);
  if (errors.mobile) return;

  if (lastCheckedMobile.value === mobile.value) {
    skipOtpSend.value = true;
    formStep.value = mobileExist.value ? "password" : "otp";
    return;
  }

  loading.value = true;
  resetOtpForNewMobile();
  useGarnetApiFetch("users/isUserByMobile", { mobile: mobile.value })
    .then((response) => {
      loading.value = false;
      switch (response.code) {
        case 2000: // کاربر وجود دارد
          lastCheckedMobile.value = mobile.value;
          otpAlreadySent.value = false;
          skipOtpSend.value = true;
          otpKey.value++;
          mobileExist.value = true;
          formStep.value = "password";
          break;
        case 2002: // کاربر جدید
          lastCheckedMobile.value = mobile.value;
          skipOtpSend.value = false;
          otpKey.value++;
          mobileExist.value = false;
          if (allowRegister.value) {
            formStep.value = "otp";
          } else {
            toast.error(t("mobile_not_exist"));
          }
          break;
        case 2001: // مسدود
          mobileExist.value = false;
          toast.error(t(response.msg));
          break;
      }
    })
    .catch((error) => {
      loading.value = false;
      toast.error(t(error));
    });
};

function submitLogin() {
  if (loading.value) return;

  mobile.value = normalizeMobile(mobile.value);
  const mobileError = validateMobile(mobile.value);
  if (mobileError) {
    errors.mobile = mobileError;
    formStep.value = "getMobile";
    return;
  }

  errors.password = password.value ? "" : "رمز عبور را وارد کنید";
  if (errors.password) return;

  loading.value = true;
  useGarnetApiFetch("auth/loginMobile", {
    mobile: mobile.value,
    password: password.value,
    callBackInfo: true,
    callBackToken: true,
  })
    .then(async (response) => {
      if (response.code === 2000) {
        if (!setAuthToken(response.token)) {
          toast.error("ورود انجام نشد: توکن معتبر از سرور دریافت نشد");
          return;
        }
        customizer.Set_Token(response.token);
        customizer.Set_Auth(true);

        const user = response?.userInfo ?? response?.User;
        if (user) {
          customizer.userInfo = user;
        } else {
          const userResponse = await useGarnetApiFetch("users/userInfo");
          const fetchedUser = userResponse?.User ?? userResponse?.userInfo;
          if (!fetchedUser) {
            throw new Error(userResponse?.error?.message || "اطلاعات کاربر دریافت نشد");
          }
          customizer.userInfo = fetchedUser;
        }
        customizer.auth = true;
        router.push(backTo.value);
      } else {
        toast.error(t(response.error));
      }
    })
    .catch((error) => {
      toast.error(t(error));
    })
    .finally(() => {
      loading.value = false;
    });
}

const changePassword = () => {
  if (loading.value) return;

  errors.password = validateNewPassword(password.value);
  errors.password_confirm = validatePasswordConfirm(password.value, password_confirm.value);
  if (errors.password || errors.password_confirm) return;

  if (!verificationCode.value) {
    toast.error("کد تایید معتبر نیست. لطفاً دوباره کد تایید دریافت کنید.");
    return;
  }

  // کاربر جدید: مشخصات + رمز با هم به createUnAuth ارسال می‌شود
  if (!mobileExist.value) {
    if (!validateProfile()) {
      formStep.value = "profile";
      return;
    }
    submitRegister();
    return;
  }

  // فراموشی رمز عبور برای کاربر موجود
  loading.value = true;
  useGarnetApiFetch("users/forgetPasswordByVerificationCode", {
    mobile: mobile.value,
    password: password.value,
    verificationCode: verificationCode.value,
  })
    .then((response) => {
      loading.value = false;
      switch (response.code) {
        case 2000:
          toast.success("رمز عبور با موفقیت ثبت شد. لطفا دوباره وارد شوید.");
          if (getPresenter.value) {
            formStep.value = "presenter";
          } else {
            router.push("/login");
          }
          break;
        case 2001:
          toast.error("کد احراز صحیح نیست");
          break;
        case 2002:
          toast.error("پارامتر های ارسالی صحیح نیست");
          break;
        case 2003:
          toast.error("کاربر یافت نشد یا اجازه ورود به این بخش را ندارد");
          break;
        default:
          toast.error(t(response.error));
      }
    })
    .catch((error) => {
      loading.value = false;
      toast.error(t(error));
    });
};

// ثبت‌نام کامل کاربر جدید (مشخصات + رمز عبور)
const submitRegister = () => {
  loading.value = true;

  useGarnetApiFetch("users/createUnAuth", {
    mobile: mobile.value,
    first_name: profileForm.first_name,
    last_name: profileForm.last_name,
    birth_date: profileForm.birth_date,
    national_code: profileForm.national_code,
    verificationCode: verificationCode.value,
    password: password.value,
    callBackInfo: true,
    callBackToken: true,
  })
    .then((response) => {
      switch (response.code) {
        case 2000: {
          // اگر سرور توکن معتبر برنگرداند، کاربر را لاگین‌شده فرض نمی‌کنیم
          if (!setAuthToken(response.token)) {
            toast.success("ثبت‌نام انجام شد. لطفاً با رمز عبور خود وارد شوید.");
            mobileExist.value = true;
            lastCheckedMobile.value = mobile.value;
            password.value = "";
            password_confirm.value = "";
            formStep.value = "password";
            break;
          }

          customizer.Set_Token(response.token);
          customizer.Set_Auth(true);
          customizer.userInfo = response?.userInfo ?? response?.User ?? [];

          toast.success("ثبت‌نام با موفقیت انجام شد");

          if (getPresenter.value) {
            formStep.value = "presenter";
          } else {
            router.push(backTo.value);
          }
          break;
        }
        case 2009:
          errors.national_code = "شماره موبایل و کد ملی متعلق به یک نفر نیست";
          toast.error(errors.national_code);
          formStep.value = "profile";
          break;
        case 2001:
          errors.national_code = "این کد ملی از قبل ثبت شده است";
          toast.error(errors.national_code);
          formStep.value = "profile";
          break;
        default:
          toast.error(response.message || response.msg || t(response.error));
      }
    })
    .catch((error) => {
      toast.error(t(error));
    })
    .finally(() => {
      loading.value = false;
    });
};

const verificationCodePassed = (e) => {
  if (!mobileExist.value) {
    verificationCode.value = e;
    formStep.value = "profile";
  } else if (getPresenter.value) {
    formStep.value = "presenter";
  } else {
    router.push(backTo.value);
  }
};

const verificationCodePassedForget = (e) => {
  formStep.value = "changePassword";
  verificationCode.value = e;
  changePass.value = false;
};

const getUserInfo = () => {
  if (!getAuthToken()) return;

  useGarnetApiFetch("users/userInfo")
    .then((response) => {
      // 401 به‌صورت سراسری در useGarnetApiFetch هندل می‌شود (خروج + پاک کردن توکن)
      if (isUnauthorizedResponse(response)) return;

      const user = response?.User ?? response?.userInfo;
      if (!user) return;

      if (user.status === 0) {
        authLogout();
      } else {
        customizer.userInfo = user;
        customizer.auth = true;
        router.push(backTo.value);
      }
    })
    .catch((error) => {
      toast.error(t(error));
    });
};

const setPresenter = async () => {
  if (loading.value) return;

  presenter.value = normalizeMobile(presenter.value);
  errors.presenter = validatePresenter(presenter.value);
  if (errors.presenter) return;

  loading.value = true;
  useGarnetApiFetch("users/setPresenterByMobile", { mobile: presenter.value })
    .then((response) => {
      loading.value = false;
      switch (response.code) {
        case 2000:
          toast.success("معرف ثبت شد.");
          router.push(backTo.value);
          break;
        case 2002:
          errors.presenter = "شماره موبایل معرف در سیستم وجود ندارد";
          break;
        case 2001:
          toast.error(t(response.msg));
          break;
      }
    })
    .catch((error) => {
      loading.value = false;
      toast.error(t(error));
    });
};

// عبور از مرحله‌ی مشخصات به مرحله‌ی رمز عبور
const submitProfile = () => {
  if (!validateProfile()) return;
  formStep.value = "changePassword";
};
</script>

<template>
  <div
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-cream to-orange-50 px-4 py-10 font-body"
    dir="rtl"
  >
    <!-- بلاب‌های تزئینی پس‌زمینه -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-blob"></div>
      <div class="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-pink-200/30 blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative z-10 w-full max-w-[440px]">
      <div
        class="animate-card-in overflow-hidden rounded-[2rem] border border-white/60 bg-cardLight/90 shadow-2xl shadow-accent/10 backdrop-blur-xl"
      >
        <!-- نوار پیشرفت -->
        <div class="h-1 w-full bg-ink/5">
          <div
            class="h-full bg-gradient-to-l from-accent to-accentHover transition-all duration-500 ease-out"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>

        <!-- هدر مشترک -->
        <div class="flex flex-col items-center px-7 pt-8">
          <!-- لوگوی انیمیشنی -->
          <div class="logo-stage relative mb-5">
            <span class="logo-halo" aria-hidden="true"></span>
            <div class="logo-float relative">
              <img :src="logoSrc" alt="ماهلین" class="logo-img relative h-12 w-auto" />
              <span class="logo-shine" :style="logoMaskStyle" aria-hidden="true"></span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <Transition name="pop" mode="out-in">
              <div
                :key="formStep"
                class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 text-accent"
              >
                <Icon :name="stepIcon" class="text-[27px]" />
              </div>
            </Transition>

            <Transition name="fade-slide" mode="out-in">
              <div :key="formStep + '-title'" class="text-center">
                <h2 class="text-lg font-bold text-ink">{{ stepMeta.title }}</h2>
                <p class="mt-1 text-xs text-inkSoft">{{ stepMeta.subtitle }}</p>
              </div>
            </Transition>
          </div>
        </div>

        <Transition name="fade-slide" mode="out-in">
          <!-- 1) دریافت شماره موبایل -->
          <div v-if="formStep === 'getMobile'" key="getMobile" class="px-7 pb-8 pt-6">
            <div class="mb-2">
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-inkSoft/60">
                  <Icon name="tabler:phone-call" class="text-[18px]" />
                </span>

                <input
                  ref="getMobileInput"
                  v-model="mobile"
                  type="tel"
                  inputmode="numeric"
                  autocomplete="tel"
                  dir="ltr"
                  placeholder="09xxxxxxxxx"
                  class="w-full rounded-2xl border bg-white/70 py-3.5 pl-4 pr-11 text-sm text-ink outline-none transition-all duration-200 placeholder:text-inkSoft/50"
                  :class="errors.mobile ? 'border-red-400 focus:ring-4 focus:ring-red-100' : 'border-ink/10 focus:border-accent focus:ring-4 focus:ring-accent/10'"
                  :aria-invalid="!!errors.mobile"
                  @input="errors.mobile = ''"
                  @keyup.enter="checkUser()"
                />
              </div>
              <Transition name="fade-slide">
                <p v-if="errors.mobile" class="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v5M12 16h.01" />
                  </svg>
                  {{ errors.mobile }}
                </p>
              </Transition>
            </div>

            <button
              type="button"
              v-btn-fx
              :disabled="loading"
              class="group relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-l from-accent to-accentHover py-3.5 text-sm font-medium text-white shadow-lg shadow-accent/25 mh-btn disabled:cursor-not-allowed disabled:opacity-60"
              @click="checkUser()"
            >
              <svg v-if="loading" class="relative z-10 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span v-else class="relative z-10">ادامه</span>
              <svg v-if="!loading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="relative z-10 transition-transform group-hover:-translate-x-1">
                <path d="M10 6l-6 6 6 6M4 12h16" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <div class="mt-6 flex items-center justify-center gap-1.5 text-xs text-inkSoft/80">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" />
              </svg>
              ورود شما به معنای پذیرش قوانین حریم‌ خصوصی است
            </div>
          </div>

          <!-- 2) کد تایید -->
          <div v-else-if="formStep === 'otp'" key="otp" class="px-7 pb-8 pt-2">
            <p v-if="mobileExist" class="mb-5 text-center text-sm leading-6 text-inkSoft">
              کد تایید برای شماره
              <span class="font-medium text-ink" dir="ltr">{{ mobile }}</span>
              پیامک شد
            </p>
            <p v-else class="mb-5 text-center text-sm leading-6 text-inkSoft">
              حساب کاربری با شماره موبایل
              <span class="font-medium text-ink" dir="ltr">{{ mobile }}</span>
              وجود ندارد. کد تایید برای این شماره ارسال گردید.
            </p>

            <div class="rounded-2xl border border-dashed border-accent/30 bg-accent/5 p-4">
              <LoginOtpInput
                v-if="changePass"
                :key="`otp-forget-${otpKey}`"
                :fields="5"
                :target="mobile"
                :call-back-token="false"
                send-type="ByMobile"
                :skip-initial-send="skipOtpSend"
                :timer-value="otpTimer"
                @on-send-code="startOtpTimer"
                @handle-complete="verificationCodePassedForget"
              />
              <LoginOtpInput
                v-else
                :key="`otp-login-${otpKey}`"
                :fields="5"
                :target="mobile"
                :call-back-token="mobileExist"
                send-type="ByMobile"
                :with-cart="false"
                :skip-initial-send="skipOtpSend"
                :timer-value="otpTimer"
                @on-send-code="startOtpTimer"
                @handle-complete="verificationCodePassed"
              />
            </div>

            <button
              v-if="mobileExist && !changePass && allowLoginWithPassword"
              type="button"
              class="mt-6 flex w-full items-center justify-center gap-1.5 text-sm text-inkSoft transition hover:text-accent"
              @click="formStep = 'password'"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" />
              </svg>
              ورود با رمز عبور
            </button>

            <button
              type="button"
              class="mt-4 -mb-4 flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-inkSoft transition hover:bg-ink/5 hover:text-ink mr-auto"
              @click="formStep = 'getMobile'"
            >
              بازگشت
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M14 6l-6 6 6 6" />
              </svg>
            </button>
          </div>

          <!-- 3) رمز عبور -->
          <div v-else-if="formStep === 'password'" key="password" class="px-7 pb-8 pt-2">
            <p class="mb-6 text-center text-sm text-inkSoft">
              ورود با شماره
              <span class="font-medium text-ink" dir="ltr">{{ mobile }}</span>
              <button type="button" class="mr-1 text-accent hover:underline" @click="formStep = 'getMobile'">ویرایش</button>
            </p>

            <div class="mb-2">
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-inkSoft/60">
                  <Icon name="tabler:lock" class="text-[18px]" />
                </span>
                <input
                  ref="passwordInput"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  placeholder="رمز عبور"
                  dir="ltr"
                  class="w-full rounded-2xl border bg-white/70 py-3.5 pl-11 pr-11 text-sm text-ink outline-none transition-all duration-200 placeholder:text-inkSoft/50"
                  :class="errors.password ? 'border-red-400 focus:ring-4 focus:ring-red-100' : 'border-ink/10 focus:border-accent focus:ring-4 focus:ring-accent/10'"
                  :aria-invalid="!!errors.password"
                  @input="errors.password = ''"
                  @keyup.enter="submitLogin()"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 left-3 flex items-center text-inkSoft/60 hover:text-accent"
                  @click="showPassword = !showPassword"
                >
                  <Icon :name="showPassword ? 'tabler:eye-off' : 'tabler:eye'" class="text-[18px]" />
                </button>
              </div>
              <Transition name="fade-slide">
                <p v-if="errors.password" class="mt-1.5 text-xs text-red-500">{{ errors.password }}</p>
              </Transition>
              <p v-if="!errors.password && loginPasswordLooksPersian" class="mt-1.5 text-xs text-amber-600">
                زبان صفحه‌کلید فارسی است؛ مطمئن شوید رمز را درست وارد می‌کنید.
              </p>
            </div>

            <button
              type="button"
              class="mb-5 mt-3 block w-full text-center text-sm text-inkSoft transition hover:text-accent"
              @click="goToForgetPassword"
            >
              فراموشی رمز عبور
            </button>

            <button
              type="button"
              v-btn-fx
              :disabled="loading"
              class="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-l from-accent to-accentHover py-3.5 text-sm font-medium text-white shadow-lg shadow-accent/25 mh-btn disabled:cursor-not-allowed disabled:opacity-60"
              @click="submitLogin()"
            >
              <svg v-if="loading" class="relative z-10 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span v-else class="relative z-10">ورود</span>
            </button>

            <div class="mt-6 flex items-center justify-center gap-1.5 text-xs text-inkSoft/80">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" />
              </svg>
              ورود شما به معنای پذیرش قوانین حریم‌ خصوصی است
            </div>
          </div>

          <!-- تکمیل مشخصات (فقط کاربر جدید) -->
          <div v-else-if="formStep === 'profile'" key="profile" class="px-7 pb-8 pt-2">
            <button
              type="button"
              class="mb-5 flex w-full items-center justify-between rounded-2xl border border-ink/10 bg-ink/[0.03] px-4 py-3 text-right transition-colors hover:border-accent/30 hover:bg-accent/5"
              @click="editMobileNumber"
            >
              <span class="flex items-center gap-2 text-xs text-inkSoft">
                <Icon name="tabler:device-mobile" class="text-[16px]" />
                <span dir="ltr" class="font-medium text-ink">{{ mobile }}</span>
              </span>
              <span class="flex items-center gap-1 text-xs font-medium text-accent">
                <Icon name="tabler:edit" class="text-[14px]" />
                ویرایش شماره
              </span>
            </button>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <input
                  ref="profileFirstNameInput"
                  v-model="profileForm.first_name"
                  type="text"
                  autocomplete="given-name"
                  placeholder="نام"
                  class="w-full rounded-2xl border bg-white/70 py-3.5 px-4 text-sm text-ink outline-none transition-all duration-200 placeholder:text-inkSoft/50"
                  :class="errors.first_name ? 'border-red-400 focus:ring-4 focus:ring-red-100' : 'border-ink/10 focus:border-accent focus:ring-4 focus:ring-accent/10'"
                  :aria-invalid="!!errors.first_name"
                  @input="errors.first_name = ''"
                  @blur="onNameBlur('first_name', 'نام')"
                />
                <p v-if="errors.first_name" class="mt-1.5 text-xs text-red-500">{{ errors.first_name }}</p>
              </div>
              <div>
                <input
                  v-model="profileForm.last_name"
                  type="text"
                  autocomplete="family-name"
                  placeholder="نام خانوادگی"
                  class="w-full rounded-2xl border bg-white/70 py-3.5 px-4 text-sm text-ink outline-none transition-all duration-200 placeholder:text-inkSoft/50"
                  :class="errors.last_name ? 'border-red-400 focus:ring-4 focus:ring-red-100' : 'border-ink/10 focus:border-accent focus:ring-4 focus:ring-accent/10'"
                  :aria-invalid="!!errors.last_name"
                  @input="errors.last_name = ''"
                  @blur="onNameBlur('last_name', 'نام خانوادگی')"
                />
                <p v-if="errors.last_name" class="mt-1.5 text-xs text-red-500">{{ errors.last_name }}</p>
              </div>
            </div>

            <div class="mt-3">
              <input
                v-model="profileForm.national_code"
                type="text"
                inputmode="numeric"
                autocomplete="off"
                dir="ltr"
                placeholder="کد ملی (اختیاری)"
                class="w-full rounded-2xl border bg-white/70 py-3.5 px-4 text-sm text-ink outline-none transition-all duration-200 placeholder:text-inkSoft/50"
                :class="errors.national_code ? 'border-red-400 focus:ring-4 focus:ring-red-100' : 'border-ink/10 focus:border-accent focus:ring-4 focus:ring-accent/10'"
                :aria-invalid="!!errors.national_code"
                @input="errors.national_code = ''"
                @blur="onNationalCodeBlur"
              />
              <p v-if="errors.national_code" class="mt-1.5 text-xs text-red-500">{{ errors.national_code }}</p>
            </div>

            <div class="mt-3">
              <ClientOnly>
                <div class="relative">
                  <input
                    id="birth-date-input"
                    type="text"
                    readonly
                    :value="birthDateDisplay"
                    placeholder="تاریخ تولد (۱۳۷۰/۰۱/۰۱)"
                    class="w-full rounded-2xl border bg-white/70 py-3.5 px-4 pl-10 text-sm text-ink outline-none transition-all duration-200 placeholder:text-inkSoft/50 cursor-pointer"
                    :class="errors.birth_date ? 'border-red-400 focus:ring-4 focus:ring-red-100' : 'border-ink/10 focus:border-accent focus:ring-4 focus:ring-accent/10'"
                    :aria-invalid="!!errors.birth_date"
                  />
                  <Icon name="tabler:calendar-event" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-inkSoft/60" />
                  <DatePicker
                    v-if="DatePicker"
                    v-model="profileForm.birth_date"
                    type="date"
                    locale="fa"
                    simple
                    :max="maxBirthDate"
                    :min="minBirthDate"
                    format="YYYY-MM-DD"
                    display-format="jYYYY/jMM/jDD"
                    custom-input="#birth-date-input"
                    append-to="body"
                  />
                </div>
                <template #fallback>
                  <input
                    type="text"
                    :value="profileForm.birth_date"
                    placeholder="تاریخ تولد (۱۳۷۰/۰۱/۰۱)"
                    disabled
                    class="w-full rounded-2xl border border-ink/10 bg-white/70 py-3.5 px-4 text-sm text-ink outline-none opacity-70"
                  />
                </template>
              </ClientOnly>
              <p v-if="errors.birth_date" class="mt-1.5 text-xs text-red-500">{{ errors.birth_date }}</p>
            </div>

            <label class="mt-4 flex cursor-pointer items-start gap-2 text-xs text-inkSoft">
              <input v-model="acceptedTerms" type="checkbox" class="mt-0.5 accent-accent" />
              <span>قوانین و شرایط استفاده از خدمات ماهلین را مطالعه کرده و می‌پذیرم</span>
            </label>
            <p v-if="errors.terms" class="mt-1.5 text-xs text-red-500">{{ errors.terms }}</p>

            <button
              type="button"
              v-btn-fx
              :disabled="loading"
              class="group relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-l from-accent to-accentHover py-3.5 text-sm font-medium text-white shadow-lg shadow-accent/25 mh-btn disabled:cursor-not-allowed disabled:opacity-60"
              @click="submitProfile()"
            >
              <span class="relative z-10">ادامه</span>
            </button>
          </div>

          <!-- 4) تعیین / تغییر رمز عبور -->
          <div v-else-if="formStep === 'changePassword'" key="changePassword" class="px-7 pb-8 pt-5">
            <button
              v-if="!mobileExist"
              type="button"
              class="mb-5 flex w-full items-center justify-between rounded-2xl border border-ink/10 bg-ink/[0.03] px-4 py-3 text-right transition-colors hover:border-accent/30 hover:bg-accent/5"
              @click="editMobileNumber"
            >
              <span class="flex items-center gap-2 text-xs text-inkSoft">
                <Icon name="tabler:device-mobile" class="text-[16px]" />
                <span dir="ltr" class="font-medium text-ink">{{ mobile }}</span>
              </span>
              <span class="flex items-center gap-1 text-xs font-medium text-accent">
                <Icon name="tabler:edit" class="text-[14px]" />
                ویرایش شماره
              </span>
            </button>
            <div class="mb-3">
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-inkSoft/60">
                  <Icon name="tabler:key" class="text-[18px]" />
                </span>
                <input
                  ref="newPasswordInput"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  placeholder="رمز عبور جدید"
                  dir="ltr"
                  class="w-full rounded-2xl border bg-white/70 py-3.5 pl-11 pr-11 text-sm text-ink outline-none transition-all duration-200 placeholder:text-inkSoft/50"
                  :class="errors.password ? 'border-red-400 focus:ring-4 focus:ring-red-100' : 'border-ink/10 focus:border-accent focus:ring-4 focus:ring-accent/10'"
                  :aria-invalid="!!errors.password"
                  @input="errors.password = ''"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 left-3 flex items-center text-inkSoft/60 hover:text-accent"
                  @click="showPassword = !showPassword"
                >
                  <Icon :name="showPassword ? 'tabler:eye-off' : 'tabler:eye'" class="text-[18px]" />
                </button>
              </div>
              <Transition name="fade-slide">
                <p v-if="errors.password" class="mt-1.5 text-xs text-red-500">{{ errors.password }}</p>
              </Transition>

              <ul class="mt-3 space-y-1.5 text-xs">
                <li
                  v-for="rule in passwordChecks"
                  :key="rule.key"
                  class="flex items-center gap-1.5 transition-colors"
                  :class="rule.ok ? 'text-green-600' : 'text-inkSoft'"
                >
                  <Icon :name="rule.ok ? 'tabler:circle-check' : 'tabler:circle'" class="text-[15px]" />
                  {{ rule.label }}
                </li>
              </ul>
            </div>

            <div class="mb-2">
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-inkSoft/60">
                  <Icon name="tabler:key" class="text-[18px]" />
                </span>
                <input
                  v-model="password_confirm"
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  autocomplete="new-password"
                  placeholder="تکرار رمز عبور جدید"
                  dir="ltr"
                  class="w-full rounded-2xl border bg-white/70 py-3.5 pl-11 pr-11 text-sm text-ink outline-none transition-all duration-200 placeholder:text-inkSoft/50"
                  :class="errors.password_confirm ? 'border-red-400 focus:ring-4 focus:ring-red-100' : 'border-ink/10 focus:border-accent focus:ring-4 focus:ring-accent/10'"
                  :aria-invalid="!!errors.password_confirm"
                  @input="errors.password_confirm = ''"
                  @blur="onPasswordConfirmBlur"
                  @keyup.enter="changePassword()"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 left-3 flex items-center text-inkSoft/60 hover:text-accent"
                  @click="showPasswordConfirm = !showPasswordConfirm"
                >
                  <Icon :name="showPasswordConfirm ? 'tabler:eye-off' : 'tabler:eye'" class="text-[18px]" />
                </button>
              </div>
              <Transition name="fade-slide">
                <p v-if="errors.password_confirm" class="mt-1.5 text-xs text-red-500">{{ errors.password_confirm }}</p>
              </Transition>
            </div>

            <button
              type="button"
              v-btn-fx
              :disabled="loading"
              class="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-l from-accent to-accentHover py-3.5 text-sm font-medium text-white shadow-lg shadow-accent/25 mh-btn disabled:cursor-not-allowed disabled:opacity-60"
              @click="changePassword()"
            >
              <svg v-if="loading" class="relative z-10 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span v-else class="relative z-10">{{ mobileExist ? "تغییر رمز" : "ثبت‌نام" }}</span>
            </button>
          </div>

          <!-- 5) ثبت معرف -->
          <div v-else-if="formStep === 'presenter'" key="presenter" class="px-7 pb-8 pt-2">
            <div class="mb-2">
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-inkSoft/60">
                  <Icon name="tabler:user-plus" class="text-[18px]" />
                </span>
                <input
                  ref="getPresenterInput"
                  v-model="presenter"
                  type="tel"
                  inputmode="numeric"
                  autocomplete="off"
                  dir="ltr"
                  placeholder="شماره موبایل معرف"
                  class="w-full rounded-2xl border bg-white/70 py-3.5 pl-4 pr-11 text-sm text-ink outline-none transition-all duration-200 placeholder:text-inkSoft/50"
                  :class="errors.presenter ? 'border-red-400 focus:ring-4 focus:ring-red-100' : 'border-ink/10 focus:border-accent focus:ring-4 focus:ring-accent/10'"
                  :aria-invalid="!!errors.presenter"
                  @input="errors.presenter = ''"
                  @keyup.enter="setPresenter()"
                />
              </div>
              <Transition name="fade-slide">
                <p v-if="errors.presenter" class="mt-1.5 text-xs text-red-500">{{ errors.presenter }}</p>
              </Transition>
            </div>

            <button
              type="button"
              v-btn-fx
              :disabled="loading"
              class="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-l from-accent to-accentHover py-3.5 text-sm font-medium text-white shadow-lg shadow-accent/25 mh-btn disabled:cursor-not-allowed disabled:opacity-60"
              @click="setPresenter()"
            >
              <svg v-if="loading" class="relative z-10 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span v-else class="relative z-10">بررسی</span>
            </button>

            <button
              type="button"
              class="mt-5 block w-full text-center text-sm text-inkSoft transition hover:text-accent"
              @click="router.push(backTo)"
            >
              معرف ندارم
            </button>
          </div>
        </Transition>
      </div>

      <p class="mt-6 text-center text-xs text-inkSoft/70">
        © {{ new Date().getFullYear() }} ماهلین — تمامی حقوق محفوظ است
      </p>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.6) rotate(-10deg);
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-card-in {
  animation: cardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes blob {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(20px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}
.animate-blob {
  animation: blob 10s infinite ease-in-out;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}

/* ================= Logo animation ================= */

/* ۱) ورود: از حالت محو و بلور، با کمی فنریت */
.logo-stage {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: logoIn 1s cubic-bezier(0.22, 1.2, 0.36, 1) 0.25s both;
}
@keyframes logoIn {
  0% {
    opacity: 0;
    filter: blur(10px);
    transform: translateY(12px) scale(0.82);
  }
  60% {
    opacity: 1;
    filter: blur(0);
  }
  100% {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0) scale(1);
  }
}

/* ۲) هاله‌ی نرمِ نفس‌کشنده پشت لوگو */
.logo-halo {
  position: absolute;
  inset: -40% -25%;
  z-index: 0;
  border-radius: 9999px;
  background: radial-gradient(closest-side, theme('colors.accent / 22%'), transparent 70%);
  filter: blur(6px);
  animation: haloBreath 4.5s ease-in-out 1.2s infinite;
  pointer-events: none;
}
@keyframes haloBreath {
  0%,
  100% {
    opacity: 0.55;
    transform: scale(0.92);
  }
  50% {
    opacity: 1;
    transform: scale(1.08);
  }
}

/* ۳) شناوری خیلی ملایم */
.logo-float {
  z-index: 1;
  animation: logoFloat 6s ease-in-out 1.3s infinite;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.logo-stage:hover .logo-float {
  transform: scale(1.06);
}
@keyframes logoFloat {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -4px;
  }
}
.logo-img {
  filter: drop-shadow(0 6px 14px theme('colors.accent / 18%'));
}

/* ۴) نوار درخشش که فقط روی شکل لوگو رد می‌شود */
.logo-shine {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    105deg,
    transparent 35%,
    rgba(255, 255, 255, 0.85) 50%,
    transparent 65%
  );
  background-size: 250% 100%;
  background-repeat: no-repeat;
  -webkit-mask-image: var(--logo-url);
  mask-image: var(--logo-url);
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  animation: logoShine 5.5s ease-in-out 1.4s infinite;
}
@keyframes logoShine {
  0% {
    background-position: 150% 0;
  }
  35%,
  100% {
    background-position: -50% 0;
  }
}

/* احترام به تنظیمات «کاهش حرکت» سیستم‌عامل */
@media (prefers-reduced-motion: reduce) {
  .logo-stage,
  .logo-halo,
  .logo-float,
  .logo-shine {
    animation: none !important;
  }
  .logo-shine {
    display: none;
  }
}
</style>

<style>
.vpd-content,
.vpd-addon-wrapper {
  background: theme('colors.cardLight') !important;
  border: 1px solid theme('colors.ink / 8%') !important;
  border-radius: 18px !important;
  box-shadow: 0 18px 40px -20px rgba(0, 0, 0, .25) !important;
  overflow: hidden;
  font-family: inherit;
}
.vpd-header {
  background: theme('colors.accent') !important;
  color: theme('colors.cream') !important;
}
.vpd-day-text {
  color: theme('colors.ink');
}
.vpd-day.vpd-selected .vpd-day-effect {
  background-color: theme('colors.accent') !important;
}
.vpd-day.vpd-selected .vpd-day-text {
  color: theme('colors.cream') !important;
}
.vpd-addon-list-item {
  color: theme('colors.inkSoft');
}
.vpd-addon-list-item.vpd-selected {
  background-color: theme('colors.accent') !important;
  color: theme('colors.cream') !important;
  border-radius: 10px;
}
.vpd-actions button {
  color: theme('colors.accent') !important;
}

/* ================= Primary button FX ================= */
.mh-btn {
  isolation: isolate;
  background-size: 200% 100%;
  background-position: 0% 0;
  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.35s ease,
    background-position 0.6s ease;
}

/* نورِ نرمی که دنبال ماوس حرکت می‌کند */
.mh-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  background: radial-gradient(
    140px circle at var(--mx, 50%) var(--my, 50%),
    rgba(255, 255, 255, 0.38),
    transparent 65%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

/* حلقه‌ی درخشان دور دکمه */
.mh-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

@media (hover: hover) {
  .mh-btn:not(:disabled):hover {
    transform: translateY(-2px);
    background-position: 100% 0;
    box-shadow:
      0 16px 32px -12px theme('colors.accent / 60%'),
      0 4px 10px -4px theme('colors.accent / 35%');
  }
  .mh-btn:not(:disabled):hover::before,
  .mh-btn:not(:disabled):hover::after {
    opacity: 1;
  }
}

.mh-btn:not(:disabled):active {
  transform: translateY(0) scale(0.97);
  transition-duration: 0.12s;
}

.mh-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px theme('colors.accent / 28%');
}

/* موج کلیک */
.mh-btn-ripple {
  position: absolute;
  z-index: 0;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 70%);
  transform: scale(0);
  pointer-events: none;
  animation: mhRipple 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
@keyframes mhRipple {
  to {
    transform: scale(1);
    opacity: 0;
  }
}

/* فلش دکمه‌ی «ادامه» با حرکت فنری */
.mh-btn svg:last-child {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@media (prefers-reduced-motion: reduce) {
  .mh-btn,
  .mh-btn:not(:disabled):hover,
  .mh-btn:not(:disabled):active {
    transform: none !important;
    transition: box-shadow 0.2s ease, opacity 0.2s ease !important;
  }
  .mh-btn-ripple {
    display: none;
  }
}
</style>
