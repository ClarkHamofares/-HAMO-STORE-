const botToken = "8040046212:AAGlhEHjICyKJYww35tflD0QIVx_iktsmfQ";
const chatId = "5058927918";

const pubgPackages = [
  "60 يوسي - 50 جنيه",
"120 يوسي - 100 جنيه",
"325 يوسي - 225 جنيه",
"660 يوسي - 435 جنيه",
"720 يوسي - 485 جنيه",
"985 يوسي - 690 جنيه",
"1500 يوسي - 995 جنيه",
"1800 يوسي - 1080 جنيه",
"3850 يوسي - 2180 جنيه",
"8100 يوسي - 4260 جنيه",
  "حزمة الشراء الأول - 55 جنيه",
  "حزمة الثانية مواد ترقية الأسلحة النارية - 155 جنيه",
  "حزمة الثالثة الشعار الخرافي - 245 جنيه",
  "Prime - 55 جنيه",
  "Prime Plus - 480 جنيه"
];

const freefirePackages = [
  "50 جوهرة - 30 جنيه", "100 جوهرة - 60 جنيه", "210 جوهرة - 120 جنيه",
  "310 جوهرة - 165 جنيه", "520 جوهرة - 265 جنيه", "1060 جوهرة - 520 جنيه",
  "2200 جوهرة - 1035 جنيه"
];

const tiktokPackages = [
  "10000 مشاهده - 4 جنيه", "20000 مشاهده - 8 جنيه", "30000 مشاهده - 12 جنيه",
  "40000 مشاهده - 16 جنيه", "50000 مشاهده - 20 جنيه", "أدخل قيمة أخرى"
];

const tiktokLikes = [
  "50 لايك - 7 جنيه", "100 لايك - 14 جنيه", "150 لايك - 21 جنيه",
  "200 لايك - 28 جنيه", "250 لايك - 35 جنيه", "300 لايك - 42 جنيه",
  "أدخل قيمة أخرى"
];

function updatePackages() {
  const game = document.getElementById("game").value;
  const packageSelect = document.getElementById("package");
  const customInputContainer = document.getElementById("customInputContainer");
  const pubgSubType = document.getElementById("pubgSubTypeContainer");

  packageSelect.innerHTML = "";
  customInputContainer.style.display = "none";
  pubgSubType.style.display = "none";

  if (game === "pubg") {
    pubgSubType.style.display = "block";
    updatePubgPackages();
  } else {
    const selectedPackages =
      game === "freefire" ? freefirePackages :
      game === "tiktok" ? tiktokPackages :
      game === "likes" ? tiktokLikes : [];

    selectedPackages.forEach(pack => {
      const option = document.createElement("option");
      option.value = pack;
      option.textContent = pack;
      packageSelect.appendChild(option);
    });
  }

  const idLabel = document.querySelector('label[for="pubgId"]');
  idLabel.innerText = ["tiktok", "likes"].includes(game)
    ? "🔗 رابط فيديو التيك توك:"
    : "🆔 ID الخاص بك:";
}

function updatePubgPackages() {
  const type = document.getElementById("pubgType").value;
  const packageSelect = document.getElementById("package");
  packageSelect.innerHTML = "";

  let list = [];

  if (type === "uc") list = pubgPackages.slice(0, 10);
  else if (type === "bundle") list = pubgPackages.slice(10, 13);
  else if (type === "prime") list = pubgPackages.slice(13, 15);

  list.forEach(pack => {
    const option = document.createElement("option");
    option.value = pack;
    option.textContent = pack;
    packageSelect.appendChild(option);
  });
}

function handleCustomInput(selectElement) {
  const customContainer = document.getElementById("customInputContainer");
  if (selectElement.value.includes("أدخل")) {
    customContainer.style.display = "block";
    calculateCustomPrice();
  } else {
    customContainer.style.display = "none";
    document.getElementById("customPrice").innerText = "";
  }
}

function calculateCustomPrice() {
  const game = document.getElementById("game").value;
  const quantity = parseInt(document.getElementById("customValue").value);
  const priceLabel = document.getElementById("customPrice");

  if (!quantity || quantity <= 0) {
    priceLabel.innerText = "";
    return;
  }

  let pricePerUnit = 0;
  let minAllowed = 0;

  if (game === "tiktok") {
    pricePerUnit = 0.0004;
    minAllowed = 10000;
  } else if (game === "likes") {
    pricePerUnit = 0.14;
    minAllowed = 50;
  }

  if (quantity < minAllowed) {
    priceLabel.innerText = `❌ الحد الأدنى هو ${minAllowed}`;
    return;
  }

  const total = quantity * pricePerUnit;
  priceLabel.innerText = `💰 السعر التقريبي: ${Math.round(total)} جنيه`;
}

function copyCashNumber() {
  const cashNumber = document.getElementById("cashNumber").innerText;
  navigator.clipboard.writeText(cashNumber).then(() => {
    alert("📋 تم نسخ الرقم بنجاح!");
  });
}

document.getElementById("orderForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const game = document.getElementById("game").value;
  const userId = document.getElementById("pubgId").value;
  const phone = document.getElementById("phone").value;
  const fullName = document.getElementById("fullName").value;
  const gender = document.getElementById("gender").value;
  const selectedPackage = document.getElementById("package").value;
  const customValue = document.getElementById("customValue")?.value;
  const customPrice = document.getElementById("customPrice")?.innerText;
  const customName = document.getElementById("customName")?.value;
  const customGender = document.getElementById("customGender")?.value;
  const screenshot = document.getElementById("screenshot").files[0];

  let gameName = game === "pubg" ? "شحن شدات ببجي والحزمة وPrime Plus و Prime 🔥"
    : game === "freefire" ? "فري فاير 💎"
    : game === "tiktok" ? "مشاهدات تيك توك 🎯"
    : game === "likes" ? "لايكات تيك توك ❤️"
    : "طلب غير معروف";

  let message = `📩 طلب شحن جديد\n\n🎮 النوع: ${gameName}\n${["tiktok", "likes"].includes(game) ? "🔗 رابط الفيديو:" : "🆔 ID:"} ${userId}\n`;

  if (selectedPackage.includes("أدخل")) {
    message += `📦 الكمية: ${customValue}\n${customPrice}\n👤 الاسم (خانة الكمية): ${customName}\n⚧️ الجنس: ${customGender}\n`;
  } else {
    message += `💰 الباقة: ${selectedPackage}\n`;
  }

  message += `\n🧾 معلومات المستخدم:\n👤 الاسم: ${fullName}\n⚧️ الجنس: ${gender}\n📞 الهاتف: ${phone}\n💳 الدفع: فودافون كاش`;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message })
  });

  if (screenshot) {
    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("photo", screenshot);

    await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
      method: "POST",
      body: formData
    });
  }

  alert("✅ تم إرسال الطلب بنجاح!");
  this.reset();
  updatePackages();
});

window.onload = updatePackages;


