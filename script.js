const SUPABASE_URL = "https://qoagzjhzajlswnapdvmz.supabase.co";
const SUPABASE_KEY = "sb_publishable_4e9Hy6jqo7hXy-4X9L2cvw_3K912QK4";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const button = document.getElementById("touch-grass");
const counter = document.getElementById("grass-count");
const message = document.getElementById("message");

let cooldown = false;

async function loadCount() {
    const { data, error } = await supabaseClient
        .from("stats")
        .select("clicks")
        .eq("id", 1)
        .single();

    if (error) {
        console.error("Failed to load grass count:", error);
        message.textContent = "Couldn't load the grass count 😭";
        return;
    }

    counter.textContent = data.clicks;
}

async function touchGrass() {
    if (cooldown) return;

    cooldown = true;
    button.disabled = true;
    message.textContent = "Touching grass... 🌱";

    const { error } = await supabaseClient.rpc("touch_grass");

    if (error) {
        console.error("Failed to touch grass:", error);

        message.textContent = "Something went wrong 😭";
        cooldown = false;
        button.disabled = false;

        return;
    }

    window.location.href = "/grass";
}

button.addEventListener("click", touchGrass);

loadCount();