const SUPABASE_URL = "https://qoagzjhzajlswnapdvmz.supabase.co";
const SUPABASE_KEY = "sb_publishable_4e9Hy6jqo7hXy-4X9L2cvw_3K912QK4";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const button = document.getElementById("touch-grass");
const counter = document.getElementById("grass-count");
const message = document.getElementById("message");
const counterWrapper = document.getElementById("counter-wrapper");

const COOLDOWN_MS = 3000;

function animateCounter(target) {
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * eased);

        counter.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            counter.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(tick);
}

function getLastTouchTime() {
    return parseInt(localStorage.getItem("ptg_last_touch") || "0", 10);
}

function setLastTouchTime(ts) {
    localStorage.setItem("ptg_last_touch", ts.toString());
}

function getStreak() {
    return parseInt(localStorage.getItem("ptg_streak") || "0", 10);
}

function setStreak(n) {
    localStorage.setItem("ptg_streak", n.toString());
}

function updateStreak() {
    const now = new Date();
    const today = now.toDateString();
    const lastDay = localStorage.getItem("ptg_last_day") || "";

    if (lastDay === today) return;

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastDay === yesterday.toDateString()) {
        setStreak(getStreak() + 1);
    } else if (lastDay !== today) {
        setStreak(1);
    }

    localStorage.setItem("ptg_last_day", today);
}

function getTimeSince(ts) {
    const diff = Date.now() - ts;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "just now";
}

function renderUserInfo() {
    const lastTouch = getLastTouchTime();
    const streak = getStreak();
    const infoEl = document.getElementById("user-info");

    if (!infoEl) return;

    let html = "";

    if (streak > 0) {
        html += `<div class="streak-badge">🔥 ${streak} day streak</div>`;
    }

    if (lastTouch > 0) {
        html += `<p class="info-line">You last touched grass ${getTimeSince(lastTouch)}</p>`;
    }

    infoEl.innerHTML = html;
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
        message.textContent = "Couldn't load the grass count 😭";
        return;
    }

    animateCounter(data.clicks);
}

async function touchGrass() {
    const now = Date.now();
    if (now - getLastTouchTime() < COOLDOWN_MS) {
        message.textContent = "Slow down! 🌱";
        return;
    }

    button.disabled = true;
    message.textContent = "Touching grass... 🌱";

    const { error } = await supabaseClient.rpc("touch_grass");

    if (error) {
        console.error("Failed to touch grass:", error);
        message.textContent = "Something went wrong 😭";
        button.disabled = false;
        return;
    }

    setLastTouchTime(now);
    updateStreak();
    window.location.href = "/grass";
}

button.addEventListener("click", touchGrass);

loadCount();
renderUserInfo();