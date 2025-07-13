const botToken = "8040046212:AAGlhEHjICyKJYww35tflD0QIVx_iktsmfQ";
const chatId = "5058927918";

const pubgPackages = [
  "60 يوسي - 50 جنيه", "120 يوسي - 100 جنيه", "325 يوسي - 240 جنيه",
  "660 يوسي - 465 جنيه", "720 يوسي - 510 جنيه", "985 يوسي - 690 جنيه",
  "1800 يوسي - 1150 جنيه", "3850 يوسي - 2300 جنيه", "8100 يوسي - 4550 جنيه"
];

const freefirePackages = [
  "50 جوهرة - 30 جنيه", "100 جوهرة - 65 جنيه", "210 جوهرة - 150 جنيه",
  "310 جوهرة - 165 جنيه", "520 جوهرة - 265 جنيه", "1060 جوهرة - 520 جنيه",
  "2200 جوهرة - 1035 جنيه"
];

const tiktokPackages = [
  "10000 مشاهده - 20 جنيه",
  "20000 مشاهده - 40 جنيه",
  "30000 مشاهده - 60 جنيه",
  "40000 مشاهده - 80 جنيه",
  "50000 مشاهده - 100 جنيه"
];

function updatePackages() {
  const game = document.getElementById("game").value;
  const packageSelect = document.getElementById("package");
  packageSelect.innerHTML = "";

  const selectedPackages = game === "pubg" ? pubgPackages :
                           game === "freefire" ? freefirePackages :
                           tiktokPackages;

  selectedPackages.forEach(pack => {
    const option = document.createElement("option");
    option.value = pack;
    option.textContent = pack;
    packageSelect.appendChild(option);
  });

  const idLabel = document.querySelector('label[for="pubgId"]');
  if (game === "tiktok") {
    idLabel.innerText = "🔗 رابط فيديو التيك توك:";
  } else {
    idLabel.innerText = "🆔 ID الخاص بك:";
  }
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
  const selectedPackage = document.getElementById("package").value;
  const screenshot = document.getElementById("screenshot").files[0];

  const gameName = game === "pubg" ? "ببجي موبايل 🔥" :
                   game === "freefire" ? "فري فاير 💎" :
                   "مشاهدات تيك توك 🎯";

  const message = `طلب شحن جديد 📩\n\n🎮 النوع: ${gameName}\n${game === "tiktok" ? "🔗 رابط الفيديو:" : "🆔 ID:"} ${userId}\n💰 الباقة: ${selectedPackage}\n💳 الدفع: فودافون كاش`;

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
