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

const steamPackages = [
  "EA SPORTS FC 25 (250 جنيه)",
  "GTA 5 (250 جنيه)",
  "GTA 4 (250 جنيه)",
  "Cyberpunk 2077 (250 جنيه)",
  "Red Dead Redemption 2 (250 جنيه)"
];

function updatePackages() {
  const game = document.getElementById("game").value;
  const packageSelect = document.getElementById("package");
  packageSelect.innerHTML = "";

  const selectedPackages = game === "pubg" ? pubgPackages :
                           game === "freefire" ? freefirePackages :
                           steamPackages;

  selectedPackages.forEach(pack => {
    const option = document.createElement("option");
    option.value = pack;
    option.textContent = pack;
    packageSelect.appendChild(option);
  });

  const idLabel = document.querySelector('label[for="pubgId"]');
  if (game === "steam") {
    idLabel.innerText = "📱 رقم واتساب للتسليم:";
  } else {
    idLabel.innerText = "🆔 ID الخاص بك:";
  }
}

function updatePaymentInfo() {
  const paymentMethod = document.getElementById("payment").value;
  const cashNumber = document.getElementById("cashNumber");
  const note = document.querySelector(".note");

  switch (paymentMethod) {
    case "فودافون كاش":
      cashNumber.innerText = "01015506479";
      note.innerText = "✅ التحويل: فودافون كاش";
      break;
    case "Payeer":
      cashNumber.innerText = "P1130934908";
      note.innerText = "✅ التحويل: Payeer";
      break;
    case "Binance Pay":
      cashNumber.innerText = "542662939";
      note.innerText = "✅ التحويل: Binance Pay";
      break;
    case "فوري":
      cashNumber.innerText = "01288390497";
      note.innerText = "✅ التحويل: فوري";
      break;
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
  const payment = document.getElementById("payment").value;
  const screenshot = document.getElementById("screenshot").files[0];

  const gameName = game === "pubg" ? "ببجي موبايل 🔥" :
                   game === "freefire" ? "فري فاير 💎" :
                   "ألعاب ستيم 🎮";

  const message = `طلب شحن جديد 🎮\n\n🎮 اللعبة: ${gameName}\n${game === "steam" ? "📱 رقم واتساب:" : "🆔 ID:"} ${userId}\n💰 الباقة: ${selectedPackage}\n💳 الدفع: ${payment}`;

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
  updatePaymentInfo();
});

window.onload = updatePackages;
