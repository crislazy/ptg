const SUPABASE_URL = "https://qoagzjhzajlswnapdvmz.supabase.co";
const SUPABASE_KEY = "sb_publishable_4e9Hy6jqo7hXy-4X9L2cvw_3K912QK4";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const counter = document.getElementById("grass-count");
const counterWrapper = document.getElementById("counter-wrapper");
const shareBtn = document.getElementById("share-btn");

function launchConfetti() {
    const container = document.createElement("div");
    container.className = "confetti-container";
    document.body.appendChild(container);

    const colors = ["#a8d08d", "#e4f58a", "#fff8dc", "#b8dcff", "#76b852", "#f5c542"];

    for (let i = 0; i < 60; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti-piece";
        piece.style.left = Math.random() * 100 + "%";
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = (Math.random() * 2 + 1.5) + "s";
        piece.style.animationDelay = (Math.random() * 0.8) + "s";
        piece.style.width = (Math.random() * 8 + 6) + "px";
        piece.style.height = (Math.random() * 8 + 6) + "px";
        container.appendChild(piece);
    }

    setTimeout(() => container.remove(), 5000);
}

function animateCounter(target) {
    const duration = 1200;
    const start = performance.now();
    const from = 0;

    function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(from + (target - from) * eased);

        counter.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            counter.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(tick);
}

async function loadCount() {
    counterWrapper.style.opacity = "0.5";

    const { data, error } = await supabaseClient
        .from("stats")
        .select("clicks")
        .eq("id", 1)
        .single();

    counterWrapper.style.opacity = "1";

    if (error) {
        console.error("Failed to load grass count:", error);
        counter.textContent = "?";
        return;
    }

    animateCounter(data.clicks);
    renderShare();
}

function renderShare() {
    if (!shareBtn) return;
    const text = "I just touched grass! 🌱";
    const url = "https://pleasetouchgrass.fyi";
    shareBtn.addEventListener("click", () => {
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            "_blank",
            "width=550,height=420"
        );
    });
}

loadCount();
launchConfetti();