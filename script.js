const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const password = passwordInput.value;

    // Button ko temporarily disable karo
    const button = loginForm.querySelector("button");
    button.disabled = true;
    button.textContent = "Checking... 🔐";

    try {
       const response = await fetch("https://birthday-backend-2.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password: password })
        });

        const data = await response.json();

        if (data.success) {

            message.textContent = "🎉 Surprise Unlocked! 🎁";

            // Confetti 🎉
            for (let i = 0; i < 35; i++) {
                const confetti = document.createElement("div");

                confetti.textContent = "🎉";
                confetti.style.position = "fixed";
                confetti.style.left = Math.random() * 100 + "vw";
                confetti.style.top = "-30px";
                confetti.style.fontSize = (15 + Math.random() * 20) + "px";
                confetti.style.zIndex = "9999";
                confetti.style.pointerEvents = "none";

                document.body.appendChild(confetti);

                confetti.animate(
                    [
                        { transform: "translateY(0) rotate(0deg)" },
                        {
                            transform:
                                `translateY(110vh) rotate(${Math.random() * 720}deg)`
                        }
                    ],
                    {
                        duration: 1500 + Math.random() * 1500,
                        easing: "ease-out"
                    }
                );

                setTimeout(() => {
                    confetti.remove();
                }, 3200);
            }

            // Birthday page par jao 🎂
            setTimeout(() => {
                window.location.href = "birthday.html";
            }, 1800);

        } else {

            // ❌ Wrong password
            message.textContent = "Oops! Wrong password 😅❌";

            passwordInput.value = "";

            // Input ko shake karo
            passwordInput.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(-8px)" },
                    { transform: "translateX(8px)" },
                    { transform: "translateX(-6px)" },
                    { transform: "translateX(6px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 400
                }
            );

            button.disabled = false;
            button.textContent = "Unlock My Surprise 🎁";
        }

    } catch (error) {

        message.textContent =
            "Server se connection nahi ho raha ❌";

        button.disabled = false;
        button.textContent = "Unlock My Surprise 🎁";
    }
});