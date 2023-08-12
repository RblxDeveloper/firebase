// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCZPH-NmvFyCvHM7RnH4I2DOtv9IcLeRok",
    authDomain: "tokyo-crane-387308.firebaseapp.com",
    projectId: "tokyo-crane-387308",
    databaseURL: "https://tokyo-crane-387308.firebaseio.com",
    storageBucket: "tokyo-crane-387308.appspot.com",
    messagingSenderId: "123484594812",
    appId: "1:123484594812:web:139045cf67ca0e9f579ff9",
    measurementId: "G-63RDF1V5ZD"
  };

firebase.initializeApp(firebaseConfig);

const scInput = document.getElementById("scInput");
const passwordInput = document.getElementById("passwordInput");
const messageDiv = document.getElementById("message");
const redeemBtn = document.getElementById("redeemBtn");

// Check if a code is already redeemed
function checkCodeRedemption(code) {
    const database = firebase.database();

    return database.ref('redeemedCodes').child(code).once('value')
        .then(snapshot => snapshot.exists());
}

// Redeem a code
function redeemCode(code, username) {
    const database = firebase.database();

    return database.ref('redeemedCodes').child(code).set(username);
}

redeemBtn.addEventListener("click", async () => {
    const code = scInput.value;
    const username = passwordInput.value;

    if (!code || !username) {
        messageDiv.textContent = "Invalid input.";
        return;
    }

    try {
        const isRedeemed = await checkCodeRedemption(code);

        if (isRedeemed) {
            messageDiv.textContent = "Code already redeemed.";
        } else {
            await redeemCode(code, username);
            messageDiv.textContent = "Code redeemed successfully.";
        }
    } catch (error) {
        messageDiv.textContent = "An error occurred.";
        console.error(error);
    }
});