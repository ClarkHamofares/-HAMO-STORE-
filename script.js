const botToken = "7660630227:AAHHkGi_mvwFjHSO91ETNYOKes99EFltJ0c";
const chatId = "5058927918";

const pubgPackages = [
  "60 يوسي - 55 جنيه",
  "120 يوسي - 110 جنيه",
  "325 يوسي - 250 جنيه",
  "660 يوسي - 475 جنيه",
  "720 يوسي - 530 جنيه",
  "985 يوسي - 725 جنيه",
  "1800 يوسي - 1200 جنيه",
  "3850 يوسي - 2300 جنيه",
  "8100 يوسي - 4600 جنيه"
];

const freefirePackages = [
  "50 جوهرة - 35 جنيه",
  "100 جوهرة - 70 جنيه",
  "210 جوهرة - 125 جنيه",
  "310 جوهرة - 175 جنيه",
  "520 جوهرة - 285 جنيه",
  "1060 جوهرة - 560 جنيه",
  "2200 جوهرة - 1150 جنيه"
];

// تحديث الباقات حسب نوع اللعبة
function updatePackages() {
  const game = document.getElementById("game").value;
  const packageSelect = document.getElementById("package");

  packageSelect.innerHTML = "";

  const selectedPackages = game === "pubg" ? pubgPackages : freefirePackages;

  selectedPackages.forEach(pack => {
    const option = document.createElement("option");
    option.value = pack;
    option.textContent = pack;
    packageSelect.appendChild(option);
  });
}

// تحديث بيانات الدفع حسب الاختيار
function updatePaymentInfo() {
  const paymentSelect = document.getElementById("payment").value;
  const cashNumber = document.getElementById("cashNumber");
  const note = document.querySelector(".note");

  if (paymentSelect === "فودافون كاش") {
    cashNumber.innerText = "01015506479";
    note.innerText = "✅ التحويل: فودافون كاش";
  } else if (paymentSelect === "Payeer") {
    cashNumber.innerText = "P1130934908";
    note.innerText = "✅ التحويل: Payeer";
  } else if (paymentSelect === "Binance Pay") {
    cashNumber.innerText = "542662939";
    note.innerText = "✅ التحويل: Binance Pay";
  }
}

// نسخ رقم الدفع
function copyCashNumber() {
  const cashNumber = document.getElementById("cashNumber").innerText;
  navigator.clipboard.writeText(cashNumber).then(() => {
    alert("📋 تم نسخ الرقم بنجاح!");
  });
}

// إرسال الطلب
document.getElementById("orderForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const gameType = document.getElementById("game").value;
  const pubgId = document.getElementById("pubgId").value;
  const selectedPackage = document.getElementById("package").value;
  const paymentMethod = document.getElementById("payment").value;
  const file = document.getElementById("screenshot").files[0];

  let gameName = (gameType === "pubg") ? "ببجي موبايل 🔥" : "فري فاير 💎";

  const message = `طلب شحن جديد 🎮\n\n🎮 اللعبة: ${gameName}\n🆔 ID: ${pubgId}\n💰 الباقة: ${selectedPackage}\n💳 الدفع: ${paymentMethod}`;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message })
  });

  if (file) {
    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("photo", file);

    await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
      method: "POST",
      body: formData
    });
  }

  alert("✅ تم إرسال الطلب بنجاح!");
  this.reset();
  updatePackages();
  updatePaymentInfo();
});

// أول ما تحمل الصفحة
window.onload = () => {
  updatePackages();
};
