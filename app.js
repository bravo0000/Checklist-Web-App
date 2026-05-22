/* ==========================================================================
   JavaScript Core Logic - Buriram Room Checklist (Interactive & Premium)
   ========================================================================== */

// --- Default Checklist Structure ---
const DEFAULT_CATEGORIES = [
    {
        id: "power",
        title: "ระบบไฟฟ้าและพลังงาน",
        icon: "🔌",
        color: "var(--color-power)",
        bgColor: "var(--color-power-bg)",
        tab: "outgoing",
        items: [
            { id: "power-1", text: "ถอดปลั๊กเครื่องใช้ไฟฟ้าทุกชนิดที่ไม่ได้ใช้ (ทีวี, ไมโครเวฟ, พัดลม, คอมฯ)", checked: false, custom: false },
            { id: "power-2", text: "ปิดสวิตช์เครื่องทำน้ำอุ่น", checked: false, custom: false },
            { id: "power-3", text: "ตรวจสอบและปิดเครื่องปรับอากาศทุกเครื่อง", checked: false, custom: false },
            { id: "power-4", text: "ปิดคัตเอาท์/เบรกเกอร์ไฟบางจุด (ที่ยกเว้นตู้เย็นได้)", checked: false, custom: false },
            { id: "power-5", text: "ปิดสวิตช์ไฟแสงสว่างทุกดวงในห้อง", checked: false, custom: false }
        ]
    },
    {
        id: "water",
        title: "ระบบน้ำและสุขาภิบาล",
        icon: "💧",
        color: "var(--color-water)",
        bgColor: "var(--color-water-bg)",
        tab: "outgoing",
        items: [
            { id: "water-1", text: "ปิดวาล์วน้ำหลักของห้องพักให้สนิทเพื่อป้องกันการรั่วซึม", checked: false, custom: false },
            { id: "water-2", text: "ตรวจสอบก๊อกน้ำทุกจุด (ห้องน้ำ, ซิงค์ครัว, ระเบียง) ว่าปิดดีแล้ว", checked: false, custom: false },
            { id: "water-3", text: "กดชักโครกและทำความสะอาดโถสุขภัณฑ์เบื้องต้นเพื่อป้องกันคราบสะสม", checked: false, custom: false }
        ]
    },
    {
        id: "security",
        title: "ความปลอดภัยและห้องพัก",
        icon: "🔒",
        color: "var(--color-security)",
        bgColor: "var(--color-security-bg)",
        tab: "outgoing",
        items: [
            { id: "security-1", text: "ตรวจสอบและปิดวาล์วถังแก๊สหุงต้มให้สนิท (ถ้ามี)", checked: false, custom: false },
            { id: "security-2", text: "ปิดและล็อกหน้าต่าง ประตูกระจกบานเลื่อนระเบียงทุกบานให้แน่นหนา", checked: false, custom: false },
            { id: "security-3", text: "รูดม่านปิดเพื่อพรางสายตาและป้องกันแสงแดดส่องถนอมของในห้อง", checked: false, custom: false },
            { id: "security-4", text: "ตรวจสอบล็อกประตูหลัก และล็อกกลอนเสริม (Double Lock) เมื่อออก", checked: false, custom: false }
        ]
    },
    {
        id: "clean",
        title: "ความสะอาดและขยะ",
        icon: "🧹",
        color: "var(--color-clean)",
        bgColor: "var(--color-clean-bg)",
        tab: "outgoing",
        items: [
            { id: "clean-1", text: "เคลียร์ของกินที่อาจเน่าเสียง่ายออกจากตู้เย็นและชั้นวางของ", checked: false, custom: false },
            { id: "clean-2", text: "รวบรวมขยะทุกถังในห้อง มัดปากถุง และนำไปทิ้งที่จุดทิ้งขยะรวมของตึก", checked: false, custom: false },
            { id: "clean-3", text: "ล้างจานชาม ช้อนส้อม และแก้วน้ำที่ค้างในอ่างให้เรียบร้อยเพื่อกันแมลง", checked: false, custom: false },
            { id: "clean-4", text: "ตรวจสอบว่าไม่มีผ้าเปียกค้างทิ้งไว้ในเครื่องซักผ้าเพื่อกันเชื้อรา", checked: false, custom: false },
            { id: "clean-5", text: "ล้างและเก็บคว่ำแก้วน้ำส่วนตัวให้แห้งสนิทก่อนปิดห้องพัก (แก้วน้ำเก็บก่อนเย็น)", checked: false, custom: false }
        ]
    },
    {
        id: "travel",
        title: "ของใช้ส่วนตัวและเดินทาง",
        icon: "🎒",
        color: "var(--color-travel)",
        bgColor: "var(--color-travel-bg)",
        tab: "outgoing",
        items: [
            { id: "travel-1", text: "เช็คความพร้อมของรถยนต์ส่วนตัว และตรวจสอบเติมระดับลมยาง (ลมยาง)", checked: false, custom: false },
            { id: "travel-2", text: "จัดเตรียมยาประจำตัวและกล่องยาปฐมพยาบาลพกพา", checked: false, custom: false },
            { id: "travel-3", text: "ชาร์จแบตเตอรี่สำรอง (Power bank) และอุปกรณ์ไอทีให้เต็ม", checked: false, custom: false },
            { id: "travel-4", text: "ตรวจกระเป๋าเดินทาง: บัตรประชาชน กระเป๋าเงิน และเช็คเงินสดให้เพียงพอ", checked: false, custom: false },
            { id: "travel-5", text: "จัดเตรียมเสื้อผ้าและชุดลำลองสำหรับท่องเที่ยว/พักผ่อน 5 วัน (ชุดลำลอง)", checked: false, custom: false },
            { id: "travel-6", text: "เตรียมโน๊ตบุ๊กพร้อมสายชาร์จและอุปกรณ์เสริมให้ครบถ้วน (โน๊ตบุ๊ก)", checked: false, custom: false },
            { id: "travel-7", text: "เตรียมสาย LAN และปลั๊กไฟพ่วงสามตาสำหรับทำงาน (สายlan, ปลั๊กไฟพ่วง)", checked: false, custom: false },
            { id: "travel-8", text: "เตรียมลำโพงขนาดเล็กพกพา และกาแฟสำหรับเดินทาง (ลำโพงเล็ก, กาแฟ)", checked: false, custom: false },
            { id: "travel-9", text: "จัดเตรียมเหล้าของฝากสำหรับนำกลับไปฝากที่บ้านบุรีรัมย์ (เหล้าของฝาก)", checked: false, custom: false },
            { id: "travel-10", text: "เตรียมขนย้ายพัดลม 2 ตัว สำหรับเอากลับบ้าน (พัดลมสองตัว)", checked: false, custom: false },
            { id: "travel-11", text: "ชุดอุปกรณ์ดูแลรถยนต์ (ชุดล้างรถ, ชุดเคลือบสี, ชุดทำความสะอาดภายในรถ)", checked: false, custom: false },
            { id: "travel-12", text: "ตรวจสอบและเตรียมใบรับประกันฟิล์มรถยนต์ (ใบประกันฟิล์ม)", checked: false, custom: false }
        ]
    },
    {
        id: "exam",
        title: "เตรียมสอบ ก.พ. (วันอาทิตย์)",
        icon: "📝",
        color: "var(--color-exam)",
        bgColor: "var(--color-exam-bg)",
        tab: "outgoing",
        items: [
            { id: "exam-1", text: "พิมพ์บัตรประจำตัวสอบ ก.พ. ลงกระดาษ พร้อมลงลายมือชื่อให้เรียบร้อย", checked: false, custom: false },
            { id: "exam-2", text: "จัดเตรียมบัตรประชาชนตัวจริง (หรือบัตรอื่นที่ราชการออกให้และไม่หมดอายุ)", checked: false, custom: false },
            { id: "exam-3", text: "เตรียมดินสอดำ 2B หรือเข้มกว่า + ยางลบ + กบเหลาดินสอ", checked: false, custom: false },
            { id: "exam-4", text: "เตรียมปากกาลูกลื่นสีน้ำเงิน (สำหรับใช้เซ็นชื่อหน้าห้องสอบ)", checked: false, custom: false },
            { id: "exam-5", text: "ตรวจสอบระเบียบการแต่งกาย (เสื้อมีคอสุภาพ, กางเกงสุภาพไม่ขาด, รองเท้าหุ้มส้น ห้ามแตะ)", checked: false, custom: false },
            { id: "exam-6", text: "ตรวจสอบรหัสที่นั่งสอบ ตึกสอบ และแผนที่เดินทางล่วงหน้าอย่างน้อย 1.5 ชม.", checked: false, custom: false },
            { id: "exam-7", text: "จัดชุดสุภาพสำหรับเข้าสอบ ก.พ. (ชุดไปเข้าสอบ)", checked: false, custom: false },
            { id: "exam-8", text: "ชุดหนังสืออ่านสอบ ก.พ. หรือเอกสารเก็งแนวข้อสอบสำหรับอ่านหน้าห้อง", checked: false, custom: false }
        ]
    },
    {
        id: "return-luggage",
        title: "สัมภาระและของฝาก",
        icon: "🎁",
        color: "var(--color-travel)",
        bgColor: "var(--color-travel-bg)",
        tab: "incoming",
        items: [
            { id: "return-luggage-1", text: "จัดเตรียมของฝากจากบุรีรัมย์กลับไปฝากเพื่อน/ที่ทำงาน (เช่น ลูกชิ้นยืนกินบุรีรัมย์, ของกินท้องถิ่น)", checked: false, custom: false },
            { id: "return-luggage-2", text: "ตรวจสอบกระเป๋าเสื้อผ้าและของใช้ส่วนตัว (เช็คผ้าที่ใส่แล้วกลับมาซัก)", checked: false, custom: false },
            { id: "return-luggage-3", text: "เช็คขวดเหล้า/เหล้าของฝากที่เหลือ (นำกลับหรือเก็บไว้ที่บ้าน)", checked: false, custom: false },
            { id: "return-luggage-4", text: "เก็บแก้วน้ำเก็บความเย็นล้างสะอาดและแพ็คใส่กระเป๋า (แก้วน้ำเก็บก่อนเย็น)", checked: false, custom: false }
        ]
    },
    {
        id: "return-gadgets",
        title: "ไอทีและเครื่องใช้ไฟฟ้า",
        icon: "💻",
        color: "var(--color-power)",
        bgColor: "var(--color-power-bg)",
        tab: "incoming",
        items: [
            { id: "return-gadgets-1", text: "ตรวจสอบและเก็บโน๊ตบุ๊กพร้อมอะแดปเตอร์สายชาร์จ (โน๊ตบุ๊ก)", checked: false, custom: false },
            { id: "return-gadgets-2", text: "เก็บสาย LAN และปลั๊กไฟพ่วงสามตาที่นำไปใช้ทำงานกลับมาด้วย (สายlan, ปลั๊กไฟพ่วง)", checked: false, custom: false },
            { id: "return-gadgets-3", text: "ตรวจสอบและเก็บลำโพงพกพาขนาดเล็ก (ลำโพงเล็ก)", checked: false, custom: false },
            { id: "return-gadgets-4", text: "ชาร์จแบตเตอรี่สำรอง (Power Bank) ให้เต็มสำหรับการเดินทางขากลับ", checked: false, custom: false }
        ]
    },
    {
        id: "return-docs",
        title: "เอกสารและบัตรสำคัญ",
        icon: "🪪",
        color: "var(--color-exam)",
        bgColor: "var(--color-exam-bg)",
        tab: "incoming",
        items: [
            { id: "return-docs-1", text: "ตรวจสอบกระเป๋าเงิน บัตรประชาชน และเช็คเงินสดคงเหลือสำหรับการเดินทาง", checked: false, custom: false },
            { id: "return-docs-2", text: "เก็บหนังสือสอบ ก.พ. และชีทเอกสารติวสอบกลับห้องพัก (ชุดหนังสือสอบ กพ)", checked: false, custom: false },
            { id: "return-docs-3", text: "ตรวจสอบและเก็บใบรับประกันฟิล์มรถยนต์กลับห้อง (ใบประกันฟิล์ม)", checked: false, custom: false },
            { id: "return-docs-4", text: "เก็บกุญแจห้องพัก / คีย์การ์ดคอนโด (สำคัญมาก! ห้ามลืมไว้ที่บ้านเด็ดขาด)", checked: false, custom: false }
        ]
    },
    {
        id: "return-prep",
        title: "เตรียมรถและของชิ้นใหญ่",
        icon: "🚗",
        color: "var(--color-security)",
        bgColor: "var(--color-security-bg)",
        tab: "incoming",
        items: [
            { id: "return-prep-1", text: "ตรวจสอบพัดลม 2 ตัว (นำกลับมาด้วย หรือฝากไว้ที่บ้านแล้วให้ติ๊กผ่าน) (พัดลมสองตัว)", checked: false, custom: false },
            { id: "return-prep-2", text: "เก็บชุดล้างรถ ชุดเคลือบสี และชุดทำความสะอาดภายในรถกลับขึ้นท้ายรถ (ชุดล้างรถ, เคลือบสี)", checked: false, custom: false },
            { id: "return-prep-3", text: "เช็คความพร้อมของรถยนต์ขากลับ ตรวจสอบลมยาง และเติมลมยางให้เหมาะสม (ลมยาง)", checked: false, custom: false },
            { id: "return-prep-4", text: "เก็บขวดกาแฟ/แก้วกาแฟพกพา และกาแฟที่เหลือกลับห้อง (กาแฟ)", checked: false, custom: false }
        ]
    }
];

// --- App State Configuration ---
let appData = [];
let activeTab = "outgoing";
let celebrationTriggered = {
    outgoing: false,
    incoming: false
};
const STORAGE_KEY = "buriram_checklist_data_v1";
const THEME_KEY = "buriram_checklist_theme";
const NOTES_KEY = "buriram_checklist_notes";

// --- Elements References ---
const categoriesGrid = document.getElementById("categoriesGrid");
const progressBar = document.getElementById("progressBar");
const completedCountEl = document.getElementById("completedCount");
const totalCountEl = document.getElementById("totalCount");
const percentTextEl = document.getElementById("percentText");
const motivationalMessage = document.getElementById("motivationalMessage");
const quickStatusGrid = document.getElementById("quickStatusGrid");
const themeToggleBtn = document.getElementById("themeToggle");
const resetBtn = document.getElementById("resetBtn");
const toastContainer = document.getElementById("toastContainer");
const travelNotesEl = document.getElementById("travelNotes");
const saveStatusEl = document.getElementById("saveStatus");

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    loadData();
    renderApp();
    updateProgress();
    initNotes();
    setupGlobalEvents();
});

// --- Notes Management ---
let saveTimeout = null;

function initNotes() {
    if (!travelNotesEl) return;
    
    // Load saved notes from Local Storage
    const savedNotes = localStorage.getItem(NOTES_KEY) || "";
    travelNotesEl.value = savedNotes;
    
    // Real-time auto-saving listener
    travelNotesEl.addEventListener("input", () => {
        if (saveStatusEl) {
            saveStatusEl.textContent = "กำลังพิมพ์... ✍️";
            saveStatusEl.classList.add("saving");
        }
        
        // Debounce saving to prevent heavy disk I/O on every keystroke
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            try {
                localStorage.setItem(NOTES_KEY, travelNotesEl.value);
                if (saveStatusEl) {
                    saveStatusEl.textContent = "บันทึกอัตโนมัติแล้ว 💾";
                    saveStatusEl.classList.remove("saving");
                }
            } catch (e) {
                console.error("Error auto-saving notes:", e);
                if (saveStatusEl) {
                    saveStatusEl.textContent = "เกิดข้อผิดพลาดในการบันทึก ⚠️";
                }
            }
        }, 600); // 600ms debounce
    });
}

// --- Theme Management ---
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute("data-theme", "dark");
        document.querySelector(".sun-icon").style.display = "none";
        document.querySelector(".moon-icon").style.display = "block";
    } else {
        document.documentElement.removeAttribute("data-theme");
        document.querySelector(".sun-icon").style.display = "block";
        document.querySelector(".moon-icon").style.display = "none";
    }
}

function toggleTheme() {
    const isDark = document.documentElement.hasAttribute("data-theme");
    if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem(THEME_KEY, "light");
        document.querySelector(".sun-icon").style.display = "block";
        document.querySelector(".moon-icon").style.display = "none";
        showToast("💡 เปลี่ยนเป็นโหมดสว่างแล้ว");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem(THEME_KEY, "dark");
        document.querySelector(".sun-icon").style.display = "none";
        document.querySelector(".moon-icon").style.display = "block";
        showToast("🌙 เปลี่ยนเป็นโหมดมืดแล้ว");
    }
}

// --- Local Storage Management ---
function loadData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        try {
            appData = JSON.parse(savedData);
            
            // Sync with default schema to ensure no category is lost
            DEFAULT_CATEGORIES.forEach(defaultCat => {
                const existingCat = appData.find(c => c.id === defaultCat.id);
                if (!existingCat) {
                    appData.push(JSON.parse(JSON.stringify(defaultCat)));
                } else {
                    // Update tab property and other default metadata
                    existingCat.tab = defaultCat.tab;
                    existingCat.title = defaultCat.title;
                    existingCat.icon = defaultCat.icon;
                    existingCat.color = defaultCat.color;
                    existingCat.bgColor = defaultCat.bgColor;
                    
                    // Check if default items are missing in local storage data (e.g. if schema was updated)
                    defaultCat.items.forEach(defaultItem => {
                        const existingItem = existingCat.items.find(item => item.id === defaultItem.id);
                        if (!existingItem) {
                            existingCat.items.push(JSON.parse(JSON.stringify(defaultItem)));
                        } else {
                            // Update the text in case it changed in the source code
                            existingItem.text = defaultItem.text;
                        }
                    });
                }
            });
        } catch (e) {
            console.error("Error loading checklist data. Resetting...", e);
            appData = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
        }
    } else {
        // Deep clone default categories
        appData = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
        saveData();
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}

// --- Rendering Logic ---
function renderApp() {
    categoriesGrid.innerHTML = "";
    quickStatusGrid.innerHTML = "";

    appData.forEach(category => {
        // Only render categories belonging to the active tab
        if (category.tab !== activeTab) return;
        // Create Quick Status icon card in the Dashboard
        const miniCard = document.createElement("div");
        miniCard.className = "mini-status-card";
        miniCard.id = `mini-status-${category.id}`;
        miniCard.innerHTML = `
            <span class="mini-status-icon">${category.icon}</span>
            <span class="mini-status-percent" id="mini-percent-${category.id}">0%</span>
        `;
        quickStatusGrid.appendChild(miniCard);

        // Create Category Card
        const card = document.createElement("section");
        card.className = "category-card animate-fade-in";
        card.style.setProperty("--category-color", category.color);
        card.style.setProperty("--category-bg", category.bgColor);

        // Card Header
        const header = document.createElement("div");
        header.className = "category-header";
        header.innerHTML = `
            <div class="category-title">
                <div class="category-icon-wrapper">${category.icon}</div>
                <h3>${category.title}</h3>
            </div>
            <span class="category-badge" id="badge-${category.id}">กำลังโหลด</span>
        `;
        card.appendChild(header);

        // Checklist UL
        const checklist = document.createElement("ul");
        checklist.className = "checklist";
        checklist.id = `list-${category.id}`;

        category.items.forEach(item => {
            const li = createChecklistItemElement(category.id, item);
            checklist.appendChild(li);
        });

        card.appendChild(checklist);

        // Custom Add Item Form
        const addForm = document.createElement("form");
        addForm.className = "add-custom-item-form";
        addForm.innerHTML = `
            <input type="text" class="input-custom-item" placeholder="เพิ่มรายการอื่นในหมวดหมู่นี้..." required>
            <button type="submit" class="btn-add-item" aria-label="เพิ่มเช็คลิส">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
        `;
        
        addForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const input = addForm.querySelector(".input-custom-item");
            const text = input.value.trim();
            if (text) {
                addCustomItem(category.id, text);
                input.value = "";
            }
        });

        card.appendChild(addForm);
        categoriesGrid.appendChild(card);
    });
}

function createChecklistItemElement(categoryId, item) {
    const li = document.createElement("li");
    li.className = `checklist-item ${item.checked ? 'checked' : ''}`;
    li.id = `item-container-${item.id}`;

    // Left checkbox container
    const label = document.createElement("label");
    label.className = "checkbox-container";
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.checked;
    
    const checkmark = document.createElement("span");
    checkmark.className = "checkmark";
    
    label.appendChild(checkbox);
    label.appendChild(checkmark);
    li.appendChild(label);

    // Text label
    const textEl = document.createElement("span");
    textEl.className = "checklist-text";
    textEl.textContent = item.text;
    li.appendChild(textEl);

    // Right action button (Delete custom item if applicable)
    if (item.custom) {
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn-delete-task";
        deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`;
        deleteBtn.addEventListener("click", () => {
            removeCustomItem(categoryId, item.id);
        });
        li.appendChild(deleteBtn);
    }

    // Toggle event
    checkbox.addEventListener("change", (e) => {
        toggleItemChecked(categoryId, item.id, e.target.checked);
    });

    return li;
}

// --- Action Logic ---
function toggleItemChecked(categoryId, itemId, isChecked) {
    const category = appData.find(c => c.id === categoryId);
    if (!category) return;
    
    const item = category.items.find(i => i.id === itemId);
    if (!item) return;

    item.checked = isChecked;
    
    const li = document.getElementById(`item-container-${itemId}`);
    if (li) {
        if (isChecked) {
            li.classList.add("checked");
        } else {
            li.classList.remove("checked");
        }
    }

    saveData();
    updateProgress();
}

function addCustomItem(categoryId, text) {
    const category = appData.find(c => c.id === categoryId);
    if (!category) return;

    const newItem = {
        id: `${categoryId}-custom-${Date.now()}`,
        text: text,
        checked: false,
        custom: true
    };

    category.items.push(newItem);
    saveData();

    // Dynamically append the element to list
    const list = document.getElementById(`list-${categoryId}`);
    if (list) {
        const li = createChecklistItemElement(categoryId, newItem);
        list.appendChild(li);
    }

    updateProgress();
    showToast(`➕ เพิ่ม "${text.substring(0, 15)}${text.length > 15 ? '...' : ''}" ในหมวดหมู่ ${category.title}`);
}

function removeCustomItem(categoryId, itemId) {
    const category = appData.find(c => c.id === categoryId);
    if (!category) return;

    const itemIndex = category.items.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;

    const itemText = category.items[itemIndex].text;
    category.items.splice(itemIndex, 1);
    saveData();

    const li = document.getElementById(`item-container-${itemId}`);
    if (li) {
        li.style.animation = "slideInItem 0.2s reverse forwards";
        setTimeout(() => {
            li.remove();
            updateProgress();
        }, 200);
    } else {
        updateProgress();
    }

    showToast(`🗑️ ลบรายการ "${itemText.substring(0, 15)}${itemText.length > 15 ? '...' : ''}" เรียบร้อยแล้ว`);
}

// --- Dynamic Progress Tracking & Motivation ---
function updateProgress() {
    let totalItems = 0;
    let completedItems = 0;

    appData.forEach(category => {
        // Skip categories not in the active tab
        if (category.tab !== activeTab) return;

        const catTotal = category.items.length;
        const catCompleted = category.items.filter(i => i.checked).length;
        
        totalItems += catTotal;
        completedItems += catCompleted;

        // Calculate category percentage
        const catPercent = catTotal > 0 ? Math.round((catCompleted / catTotal) * 100) : 0;
        
        // Update category UI badges & mini cards
        const badge = document.getElementById(`badge-${category.id}`);
        if (badge) {
            badge.textContent = `${catCompleted}/${catTotal} สำเร็จ`;
        }

        const miniPercent = document.getElementById(`mini-percent-${category.id}`);
        const miniCard = document.getElementById(`mini-status-${category.id}`);
        if (miniPercent) {
            miniPercent.textContent = `${catPercent}%`;
        }
        if (miniCard) {
            if (catPercent === 100) {
                miniCard.classList.add("completed");
                miniCard.style.backgroundColor = category.bgColor;
                miniCard.style.borderColor = category.color;
            } else {
                miniCard.classList.remove("completed");
                miniCard.style.backgroundColor = "";
                miniCard.style.borderColor = "";
            }
        }
    });

    // Update global dashboard statistics
    completedCountEl.textContent = completedItems;
    totalCountEl.textContent = totalItems;
    
    const overallPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    percentTextEl.textContent = `${overallPercent}%`;
    progressBar.style.width = `${overallPercent}%`;

    // Adaptive motivational messaging
    let message = "";
    if (activeTab === "outgoing") {
        if (overallPercent === 0) {
            message = "ทริปบุรีรัมย์ 5 วันกำลังรออยู่! มาเริ่มตรวจเช็คห้องพักกันเถอะครับ 🚀";
        } else if (overallPercent > 0 && overallPercent <= 25) {
            message = "เริ่มต้นได้ยอดเยี่ยมครับ! ค่อยๆ ตรวจสอบทีละจุดเพื่อความสบายใจนะ ⚡";
        } else if (overallPercent > 25 && overallPercent <= 50) {
            message = "เดินทางมาได้ครึ่งทางแล้วครับ! ห้องพักของคุณปลอดภัยเพิ่มขึ้นเรื่อยๆ แล้ว 💡";
        } else if (overallPercent > 50 && overallPercent <= 75) {
            message = "สะสางไปได้เยอะมาก! ปิดเบรกเกอร์ เช็คหน้าต่าง ตรวจความเรียบร้อยอีกนิด 🧹";
        } else if (overallPercent > 75 && overallPercent < 100) {
            message = "เกือบ 100% แล้วครับ! อีกเพียงไม่กี่ข้อ คุณก็จะพร้อมออกเดินทางกลับบ้านอย่างหายห่วง! ✨";
        } else if (overallPercent === 100) {
            message = "สมบูรณ์แบบ 100%! ห้องพักปลอดภัย สะอาดเรียบร้อย เดินทางกลับบุรีรัมย์อย่างปลอดภัยและมีความสุขนะครับ! 🎉🚗🏡";
            triggerCelebration();
        }
    } else {
        if (overallPercent === 0) {
            message = "เตรียมตัวเดินทางกลับห้องพัก! มาเช็คของกันลืมกันเถอะครับ โน๊ตบุ๊ก ปลั๊กไฟ สายชาร์จพกมาครบยังนะ? 🎒";
        } else if (overallPercent > 0 && overallPercent <= 25) {
            message = "เช็คของขากลับไปบ้างแล้ว ดีมากครับ! ค่อยๆ เก็บของใส่กระเป๋าให้เรียบร้อยนะ 📦";
        } else if (overallPercent > 25 && overallPercent <= 50) {
            message = "ครึ่งทางแล้ว! อย่าลืมเก็บที่ชาร์จ โน๊ตบุ๊ก ลำโพงเล็ก และเหล้าของฝากที่เหลือนะ 💻";
        } else if (overallPercent > 50 && overallPercent <= 75) {
            message = "เก็บของสำคัญไปได้เยอะแล้ว! ตรวจสัมภาระชิ้นใหญ่ พัดลม ชุดล้างรถ เช็คลมยางก่อนขับกลับ 🚗";
        } else if (overallPercent > 75 && overallPercent < 100) {
            message = "เกือบครบ 100% แล้ว! อีกนิดเดียวจะเรียบร้อยครบถ้วน พร้อมขับขี่กลับบ้านอย่างปลอดภัย! 🌟";
        } else if (overallPercent === 100) {
            message = "เก็บของขากลับเรียบร้อย 100%! เดินทางกลับกรุงเทพฯ/ห้องพักอย่างปลอดภัย สบายใจ ไม่มีลืมของไว้ข้างหลังแน่นอน! 🎉🚗🏡";
            triggerCelebration();
        }
    }
    
    motivationalMessage.textContent = message;
}

// --- Premium Celebration Effect (Confetti burst) ---
function triggerCelebration() {
    if (celebrationTriggered[activeTab]) return; // Prevent double trigger
    celebrationTriggered[activeTab] = true;
    
    const tabName = activeTab === "outgoing" ? "ขากลับไปบุรีรัมย์" : "ขากลับห้องพัก";
    showToast(`🎉 ยอดเยี่ยม! คุณเช็คครบทุกอย่างสำหรับ${tabName}เรียบร้อยแล้ว`);
    
    // Canvas Confetti
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const colors = ["#ff6b35", "#ffb703", "#2196f3", "#4caf50", "#9c27b0", "#e91e63"];
    const particles = [];

    // Resize handler
    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Create particles
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height - height, // Start off-screen
            r: Math.random() * 6 + 4,
            d: Math.random() * height,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 5,
            tiltAngleIncremental: Math.random() * 0.07 + 0.02,
            tiltAngle: 0
        });
    }

    let animationFrameId;
    let opacity = 1;

    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach((p, index) => {
            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(p.d) + 3 + p.r / 2) * 0.5;
            p.x += Math.sin(p.tiltAngle);
            p.tilt = Math.sin(p.tiltAngle - index / 3) * 15;

            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = opacity;
            ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
            ctx.stroke();
        });

        // Fade out slowly
        if (particles.every(p => p.y > height)) {
            opacity -= 0.02;
        }

        if (opacity <= 0) {
            cancelAnimationFrame(animationFrameId);
            canvas.remove();
        } else {
            animationFrameId = requestAnimationFrame(draw);
        }
    }

    draw();

    // Automatically stop after 6 seconds if not already faded out
    setTimeout(() => {
        opacity = 0;
    }, 6000);
}

// --- Helper Utilities ---
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>${message}</span>`;
    toastContainer.appendChild(toast);
    
    // Auto remove toast DOM after transition ends
    setTimeout(() => {
        toast.remove();
    }, 3200);
}

function resetAllChecklists() {
    const tabName = activeTab === "outgoing" ? "ออกจากห้องพัก (ขาไป)" : "กลับจากบุรีรัมย์ (ขากลับ)";
    const confirmReset = confirm(`คุณต้องการรีเซ็ตเช็คลิสเฉพาะหมวด "${tabName}" หรือไม่?\n(หมายเหตุ: รายการที่คุณเพิ่มใหม่จะยังคงอยู่ แต่จะถูกปลดเช็คออกทั้งหมดเพื่อเริ่มตรวจเช็คใหม่)`);
    if (!confirmReset) return;

    appData.forEach(category => {
        if (category.tab === activeTab) {
            category.items.forEach(item => {
                item.checked = false;
            });
        }
    });

    saveData();
    celebrationTriggered[activeTab] = false; // Allow celebration to happen again for this tab
    
    renderApp();
    updateProgress();
    showToast(`🔄 รีเซ็ตเช็คลิส "${tabName}" เรียบร้อยแล้ว เริ่มเดินตรวจเช็คได้เลย!`);
}

// --- Setup Event Listeners ---
function setupGlobalEvents() {
    themeToggleBtn.addEventListener("click", toggleTheme);
    resetBtn.addEventListener("click", resetAllChecklists);

    // Tab Switcher Logic
    const tabOutgoingBtn = document.getElementById("tabOutgoingBtn");
    const tabIncomingBtn = document.getElementById("tabIncomingBtn");

    if (tabOutgoingBtn && tabIncomingBtn) {
        tabOutgoingBtn.addEventListener("click", () => {
            if (activeTab === "outgoing") return;
            activeTab = "outgoing";
            tabOutgoingBtn.classList.add("active");
            tabIncomingBtn.classList.remove("active");
            
            renderApp();
            updateProgress();
            showToast("🚪 เปลี่ยนเป็นเช็คลิส: ออกจากห้องพัก (ขาไป)");
        });

        tabIncomingBtn.addEventListener("click", () => {
            if (activeTab === "incoming") return;
            activeTab = "incoming";
            tabIncomingBtn.classList.add("active");
            tabOutgoingBtn.classList.remove("active");
            
            renderApp();
            updateProgress();
            showToast("🏡 เปลี่ยนเป็นเช็คลิส: กลับจากบุรีรัมย์ (ขากลับ)");
        });
    }
}
