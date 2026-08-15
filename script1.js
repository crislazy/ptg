const SUPABASE_URL = "https://qoagzjhzajlswnapdvmz.supabase.co";
const SUPABASE_KEY = "sb_publishable_4e9Hy6jqo7hXy-4X9L2cvw_3K912QK4";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const counter = document.getElementById("grass-count");

let cooldown = false;

async function loadCount() {
    const { data, error } = await supabaseClient
        .from("stats")
        .select("clicks")
        .eq("id", 1)
        .single();

    if (error) {
        console.error("Failed to load grass count:", error);
        return;
    }

    counter.textContent = data.clicks;
}

loadCount();