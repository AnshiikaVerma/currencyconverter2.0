const API_KEY = "3cec4aa2d943c9a8229603dd";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.getElementById("result");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const amountInput = document.querySelector(".amount input");

// Populate currency dropdowns
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let option = document.createElement("option");
        option.innerText = currCode;
        option.value = currCode;
        select.append(option);
    }
}

// Currency conversion logic
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amtVal = amountInput.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amountInput.value = "1";
    }

    try {
        const res = await fetch(`${BASE_URL}${fromCurr.value}`);
        const data = await res.json();

        if (!data.conversion_rates) {
            msg.textContent = "Invalid API response.";
            return;
        }

        const rate = data.conversion_rates[toCurr.value];
        const total = (amtVal * rate).toFixed(2);
        msg.innerText = `${amtVal} ${fromCurr.value} = ${total} ${toCurr.value}`;
    } catch (error) {
        msg.textContent = "An error occurred while fetching exchange rates.";
    }
});document.addEventListener("DOMContentLoaded", () => {
    const shareBtn = document.getElementById("share-btn");

if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
        const shareData = {
            title: "Currency Converter",
            text: msg.innerText !== "Conversion Result:" ? msg.innerText : "Check out this currency converter I built!",
            url: window.location.href
        };

        // Disable the button to prevent multiple clicks
        shareBtn.disabled = true;

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                console.log("Shared successfully");
            } else {
                alert("Sharing not supported on this browser.");
            }
        } catch (err) {
            console.error("Error sharing:", err);
        } finally {
            // Re-enable the button after sharing is done
            shareBtn.disabled = false;
        }
    });
}

});


// Share button logic (should be outside)
document.getElementById("share-btn").addEventListener("click", async () => {
    const shareData = {
        title: "Currency Converter",
        text: msg.innerText !== "Conversion Result:" ? msg.innerText : "Check out this currency converter I built!",
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
            console.log("Shared successfully");
        } else {
            alert("Sharing not supported on this browser.");
        }
    } catch (err) {
        console.error("Error sharing:", err);
    }
});
