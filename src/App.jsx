import { useState } from "react";

const C = {
  bg: "#080b10", card: "#0f1318", cardHover: "#141920",
  border: "#1e2530", borderBright: "#2e3a48",
  accent: "#e8c84a", red: "#e05540", teal: "#3dc9a8",
  blue: "#4a9edd", purple: "#9b72cf",
  text: "#f0ece4", muted: "#7a8694", dim: "#3e4a56",
};

const SCHEDULE = [
  { day: "MON", label: "Lower Power", type: "strength", color: C.red, sessionKey: "lowerPower" },
  { day: "TUE", label: "Upper Push", type: "strength", color: C.red, sessionKey: "upperPush" },
  { day: "WED", label: "Speed Run", type: "run", color: C.blue, sessionKey: null },
  { day: "THU", label: "Upper Pull", type: "strength", color: C.red, sessionKey: "upperPull" },
  { day: "FRI", label: "Easy Run", type: "run", color: C.blue, sessionKey: null },
  { day: "SAT", label: "Lower Strength", type: "strength", color: C.red, sessionKey: "lowerStrength" },
  { day: "SUN", label: "Long Run + Yoga", type: "recovery", color: C.purple, sessionKey: null },
];

const SESSIONS = {
  lowerPower: {
    title: "Lower Power", subtitle: "Posterior chain density — Chun-Li session",
    color: C.red, icon: "🍑",
    warmup: [
      { name: "Hip circles + hip airplanes", sets: "2×12/leg" },
      { name: "Glute bridges bodyweight", sets: "2×15" },
    ],
    primary: [
      { name: "Hip Thrust ⭐", sets: "4×6–8", note: "Heavy. Progressive overload priority #1", star: true },
      { name: "Romanian Deadlift ⭐", sets: "4×8", note: "Hinge not squat. Feel the hamstring stretch.", star: true },
      { name: "Bulgarian Split Squat ⭐", sets: "3×10/leg", note: "Rear foot elevated. Glute focus.", star: true },
    ],
    accessories: [
      { name: "Cable/Band Kickbacks", sets: "3×15/leg", note: "Squeeze at top" },
      { name: "Lateral Band Walks", sets: "3×20 steps", note: "Constant tension" },
      { name: "Seated Calf Raise ⭐", sets: "4×15", note: "Soleus — never skip", star: true },
      { name: "Standing Calf Raise ⭐", sets: "3×15", note: "Gastrocnemius — both heads matter", star: true },
    ],
    finisher: [
      { name: "Hip flexor stretch", sets: "1 min/side" },
      { name: "Hamstring doorframe stretch", sets: "1 min/side" },
      { name: "Pigeon pose", sets: "90 sec/side" },
    ],
  },
  upperPush: {
    title: "Upper Push + Shoulders", subtitle: "Shoulder cap development — the visual separator",
    color: C.red, icon: "💪",
    warmup: [
      { name: "Band pull-aparts", sets: "2×15" },
      { name: "Arm circles + shoulder CARs", sets: "2×10" },
    ],
    primary: [
      { name: "Overhead Press ⭐", sets: "4×6–8", note: "Seated or standing. Progressive overload priority.", star: true },
      { name: "Incline DB Press", sets: "4×10", note: "Upper chest emphasis" },
      { name: "Lateral Raises ⭐", sets: "4×15", note: "EVERY upper session. Shoulder cap builder.", star: true },
    ],
    accessories: [
      { name: "Cable Lateral Raise", sets: "3×15/side", note: "Constant tension version" },
      { name: "DB Front Raise", sets: "3×12", note: "Slow and controlled" },
      { name: "Tricep Pushdown", sets: "3×15", note: "Full extension" },
      { name: "Overhead Tricep Extension", sets: "3×12", note: "Long head stretch" },
    ],
    finisher: [
      { name: "Cross-body shoulder stretch", sets: "1 min/side" },
      { name: "Doorframe chest stretch", sets: "1 min" },
      { name: "Wrist circles + flexion", sets: "2×10" },
    ],
  },
  upperPull: {
    title: "Upper Pull + Arms", subtitle: "Back width + bicep definition",
    color: C.red, icon: "🏋️",
    warmup: [
      { name: "Dead hang", sets: "2×20–30 sec" },
      { name: "Scapular pull-ups", sets: "2×10" },
    ],
    primary: [
      { name: "Pull-Up / Lat Pulldown ⭐", sets: "4×6–8", note: "Pull-ups if possible. Progressive overload priority.", star: true },
      { name: "Seated Cable Row ⭐", sets: "4×10", note: "Elbows close. Full retraction at top.", star: true },
      { name: "Lateral Raises ⭐", sets: "4×15", note: "Every upper session — no exceptions.", star: true },
    ],
    accessories: [
      { name: "Single-arm DB Row", sets: "3×12/side", note: "Big range of motion" },
      { name: "Face Pulls", sets: "3×15", note: "Rear delt + rotator cuff health" },
      { name: "DB Bicep Curl", sets: "3×12", note: "Supinate at top" },
      { name: "Hammer Curl", sets: "3×12", note: "Brachialis thickness" },
    ],
    finisher: [
      { name: "Dead hang", sets: "30–60 sec" },
      { name: "Lat stretch (arm overhead, lean)", sets: "1 min/side" },
      { name: "Neck diagonal pull", sets: "30 sec/side" },
    ],
  },
  lowerStrength: {
    title: "Lower Strength", subtitle: "Quad + glute balance — athletic foundation",
    color: C.red, icon: "⚡",
    warmup: [
      { name: "Bodyweight squats", sets: "2×10" },
      { name: "Hip flexor stretch", sets: "2×1 min" },
      { name: "Bodyweight hip airplanes", sets: "2×12/leg" },
    ],
    primary: [
      { name: "Goblet Squat ⭐", sets: "4×10", note: "Progressive overload priority", star: true },
      { name: "Step-Ups ⭐", sets: "4×10/side", note: "Progressive overload priority", star: true },
      { name: "Squat Jumps", sets: "5×10", note: "Power development" },
    ],
    accessories: [
      { name: "Sissy Squat / Spanish Squat", sets: "3×15", note: "Knee health" },
      { name: "DB Front Squat", sets: "3×30 sec hold", note: "Isometric strength" },
      { name: "Standing Calf Raise ⭐", sets: "4×15", note: "Never skip", star: true },
      { name: "Seated Calf Raise ⭐", sets: "3×15", note: "Both heads", star: true },
      { name: "Tibialis Raises", sets: "2×15/leg", note: "Shin + ankle health" },
    ],
    finisher: [
      { name: "Couch stretch", sets: "1 min/side" },
      { name: "Seated forward fold", sets: "2 min" },
      { name: "Ankle circles", sets: "2×10/side" },
    ],
  },
};

const RUN_SESSIONS = {
  WED: {
    title: "Speed / Hill Run", color: C.blue, icon: "⚡", zone: "Zone 4–5", zoneColor: C.red,
    structure: [
      { label: "Warm-up", detail: "10 min easy jog + dynamic stretches", duration: "10 min" },
      { label: "Main Set", detail: "6–8 × 400m at hard effort (5K pace), 90 sec recovery jog between each", duration: "25–30 min" },
      { label: "Alternative", detail: "Hill repeats: 8–10 × 30 sec uphill sprint, walk back down", duration: "25 min" },
      { label: "Cool-down", detail: "10 min easy jog + static stretches", duration: "10 min" },
    ],
    note: "This is your hardest cardio day. Effort should be uncomfortable but controlled — not all-out sprint.",
  },
  FRI: {
    title: "Easy Run", color: C.blue, icon: "🌿", zone: "Zone 2", zoneColor: C.teal,
    structure: [
      { label: "Duration", detail: "30–45 minutes total", duration: "30–45 min" },
      { label: "Pace", detail: "Conversational — you should be able to hold a full sentence", duration: "Zone 2" },
      { label: "Heart Rate", detail: "120–140 bpm. If above 145, slow down.", duration: "Monitor" },
      { label: "Focus", detail: "Recovery run. The goal is blood flow, not fitness gain.", duration: "Mental reset" },
    ],
    note: "Most people ruin easy runs by going too hard. This run should feel almost embarrassingly slow. That's correct.",
  },
  SUN: {
    title: "Long Run + Yoga", color: C.purple, icon: "🧘", zone: "Zone 2", zoneColor: C.teal,
    structure: [
      { label: "Long Run", detail: "50–75 min at easy conversational pace. Zone 2 entirely.", duration: "50–75 min" },
      { label: "Recovery Walk", detail: "5–10 min walk immediately after the run", duration: "5–10 min" },
      { label: "Yoga", detail: "20–30 min: hip flexors, hamstrings, glutes, ankles, spine. YouTube: Yoga with Adriene 'Runners Yoga'", duration: "20–30 min" },
      { label: "Nutrition", detail: "Eat within 30 min of finishing. Protein + carbs.", duration: "Post-run" },
    ],
    note: "Sunday yoga is non-negotiable. This is what keeps your tissues healthy as training volume builds.",
  },
};

const PRINCIPLES = [
  { icon: "📈", title: "Progressive Overload", body: "Add weight or reps on Hip Thrust, RDL, OHP, Pull-Up, Split Squat, and Lateral Raise every 2 weeks minimum. These 6 lifts build your physique." },
  { icon: "🎯", title: "Lateral Raises Every Upper Day", body: "4×15, no exceptions. The shoulder cap is the single biggest visual separator between 'athletic' and 'muscular.'" },
  { icon: "🦵", title: "Calf Work Twice a Week", body: "Calves are highly visible on a lean frame. Seated targets soleus, standing targets gastrocnemius. You need both." },
  { icon: "🥩", title: "Protein 1.8–2g per kg bodyweight", body: "Without adequate protein, training stimulus doesn't convert to visible muscle regardless of how hard you lift." },
  { icon: "🏃", title: "Keep Easy Runs Genuinely Easy", body: "Zone 2, conversational pace. Running easy runs too hard bleeds recovery that should go to muscle protein synthesis." },
  { icon: "🧘", title: "Sunday Yoga Non-Negotiable", body: "Protects tissue quality and keeps hips and hamstrings healthy for the week ahead. 20 minutes is enough." },
];

function Tag({ label, color }) {
  return (
    <span style={{
      fontSize: 10, padding: "3px 8px", borderRadius: 20,
      background: color + "18", color, border: `1px solid ${color}40`,
      letterSpacing: "0.05em", fontFamily: "monospace",
    }}>{label}</span>
  );
}

function ExerciseRow({ ex, i }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{
        width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
        background: ex.star ? C.accent + "20" : C.dim + "30",
        border: `1px solid ${ex.star ? C.accent + "60" : C.dim}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 10, color: ex.star ? C.accent : C.muted, fontFamily: "monospace", marginTop: 2,
      }}>{i + 1}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ color: C.text, fontSize: 14, fontWeight: ex.star ? 600 : 400 }}>{ex.name}</span>
          <span style={{ fontSize: 11, color: C.accent, fontFamily: "monospace", background: C.accent + "15", padding: "2px 8px", borderRadius: 4 }}>{ex.sets}</span>
        </div>
        {ex.note && <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{ex.note}</div>}
      </div>
    </div>
  );
}

function SessionDetail({ session, onClose }) {
  const [tab, setTab] = useState("primary");
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000cc", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={onClose}>
      <div style={{ background: C.card, borderRadius: "20px 20px 0 0", border: `1px solid ${C.borderBright}`, borderBottom: "none", width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto", padding: "0 0 40px" }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: C.card, zIndex: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{session.icon}</div>
              <h2 style={{ color: C.text, fontSize: 20, margin: 0, fontWeight: 700 }}>{session.title}</h2>
              <p style={{ color: C.muted, fontSize: 13, margin: "4px 0 0" }}>{session.subtitle}</p>
            </div>
            <button onClick={onClose} style={{ background: C.dim + "40", border: "none", color: C.muted, width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 18 }}>×</button>
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", background: C.teal + "10", borderRadius: 8, border: `1px solid ${C.teal}30` }}>
            <div style={{ fontSize: 10, color: C.teal, letterSpacing: "0.1em", fontFamily: "monospace", marginBottom: 6 }}>WARM-UP</div>
            {session.warmup.map((w, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.muted, padding: "2px 0" }}>
                <span>{w.name}</span>
                <span style={{ color: C.teal, fontFamily: "monospace", fontSize: 12 }}>{w.sets}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {["primary", "accessories", "finisher"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "6px 14px", borderRadius: 20, border: `1px solid ${tab === t ? session.color : C.border}`,
                background: tab === t ? session.color + "20" : "transparent",
                color: tab === t ? session.color : C.muted, fontSize: 12, cursor: "pointer", fontFamily: "monospace",
              }}>{{ primary: "Main Lifts", accessories: "Accessories", finisher: "Mobility" }[t]}</button>
            ))}
          </div>
        </div>
        <div style={{ padding: "8px 24px" }}>
          {session[tab].map((ex, i) => <ExerciseRow key={i} ex={ex} i={i} />)}
        </div>
      </div>
    </div>
  );
}

function RunDetail({ session, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000cc", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={onClose}>
      <div style={{ background: C.card, borderRadius: "20px 20px 0 0", border: `1px solid ${C.borderBright}`, borderBottom: "none", width: "100%", maxWidth: 640, maxHeight: "85vh", overflowY: "auto", padding: "0 0 40px" }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "24px 24px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{session.icon}</div>
              <h2 style={{ color: C.text, fontSize: 20, margin: 0 }}>{session.title}</h2>
              <Tag label={session.zone} color={session.zoneColor} />
            </div>
            <button onClick={onClose} style={{ background: C.dim + "40", border: "none", color: C.muted, width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 18 }}>×</button>
          </div>
        </div>
        <div style={{ padding: "16px 24px" }}>
          {session.structure.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: "14px 0", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ minWidth: 80, fontSize: 11, color: session.color, fontFamily: "monospace", paddingTop: 2 }}>{s.duration}</div>
              <div>
                <div style={{ color: C.text, fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.5 }}>{s.detail}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 16, padding: "14px 16px", background: session.zoneColor + "10", borderRadius: 8, border: `1px solid ${session.zoneColor}30`, fontSize: 13, color: C.muted, lineHeight: 1.6, fontStyle: "italic" }}>
            💡 {session.note}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedRun, setSelectedRun] = useState(null);
  const typeIcon = { strength: "🏋️", run: "🏃", recovery: "🧘" };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'Georgia', serif", maxWidth: 640, margin: "0 auto" }}>
      <div style={{ padding: "32px 24px 20px", borderBottom: `1px solid ${C.border}`, background: `linear-gradient(180deg, #0d1520 0%, ${C.bg} 100%)` }}>
        <div style={{ fontSize: 11, color: C.accent, letterSpacing: "0.25em", fontFamily: "monospace", marginBottom: 8 }}>⚔ WARRIOR PROTOCOL</div>
        <h1 style={{ fontSize: "clamp(22px, 5vw, 32px)", fontWeight: 700, margin: "0 0 6px", color: C.text }}>Training Programme</h1>
        <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>Chun-Li / Maki physique · Strength + Endurance split</p>
        <div style={{ display: "flex", gap: 6, marginTop: 16, overflowX: "auto", paddingBottom: 4 }}>
          {SCHEDULE.map(s => (
            <button key={s.day} onClick={() => {
              if (s.sessionKey) setSelectedSession({ ...SESSIONS[s.sessionKey], color: s.color });
              else if (RUN_SESSIONS[s.day]) setSelectedRun(RUN_SESSIONS[s.day]);
            }} style={{ flexShrink: 0, padding: "6px 12px", borderRadius: 20, background: s.color + "15", border: `1px solid ${s.color}40`, color: s.color, fontSize: 11, fontFamily: "monospace", cursor: "pointer" }}>
              {s.day}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, padding: "0 24px" }}>
        {[{ key: "schedule", label: "Schedule" }, { key: "principles", label: "Principles" }].map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
            padding: "14px 0", marginRight: 24, background: "none", border: "none",
            borderBottom: `2px solid ${activeTab === t.key ? C.accent : "transparent"}`,
            color: activeTab === t.key ? C.accent : C.muted,
            fontSize: 13, cursor: "pointer", fontFamily: "monospace",
          }}>{t.label}</button>
        ))}
      </div>

      {activeTab === "schedule" && (
        <div style={{ padding: "16px 0" }}>
          {SCHEDULE.map(s => {
            const hasDetail = s.sessionKey || RUN_SESSIONS[s.day];
            return (
              <button key={s.day} onClick={() => {
                if (s.sessionKey) setSelectedSession({ ...SESSIONS[s.sessionKey], color: s.color });
                else if (RUN_SESSIONS[s.day]) setSelectedRun(RUN_SESSIONS[s.day]);
              }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 16, padding: "16px 24px", background: "none", border: "none", borderBottom: `1px solid ${C.border}`, cursor: hasDetail ? "pointer" : "default", textAlign: "left" }}
                onMouseEnter={e => { if (hasDetail) e.currentTarget.style.background = C.cardHover; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0, background: s.color + "15", border: `1px solid ${s.color}40`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 10, color: s.color, fontFamily: "monospace" }}>{s.day}</div>
                  <div style={{ fontSize: 16 }}>{typeIcon[s.type]}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: C.text, fontSize: 15, fontWeight: 600 }}>{s.label}</div>
                  <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>
                    {s.type === "strength" ? "Tap to view exercises" : s.type === "run" ? "Tap to view structure" : "Long run + yoga session"}
                  </div>
                </div>
                <Tag label={s.type} color={s.color} />
                {hasDetail && <div style={{ color: C.dim, fontSize: 18 }}>›</div>}
              </button>
            );
          })}
        </div>
      )}

      {activeTab === "principles" && (
        <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
          {PRINCIPLES.map((p, i) => (
            <div key={i} style={{ padding: "18px 20px", borderRadius: 12, background: C.card, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{p.icon}</span>
                <div>
                  <div style={{ color: C.text, fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{p.title}</div>
                  <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>{p.body}</div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ padding: "18px 20px", borderRadius: 12, background: C.accent + "08", border: `1px solid ${C.accent}30`, marginTop: 4 }}>
            <div style={{ fontSize: 11, color: C.accent, letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: 8 }}>⭐ PRIORITY LIFTS — TRACK THESE</div>
            {["Hip Thrust", "Romanian Deadlift", "Bulgarian Split Squat", "Overhead Press", "Pull-Up / Lat Pulldown", "Lateral Raise"].map((lift, i, arr) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <span style={{ color: C.text, fontSize: 13 }}>{lift}</span>
                <span style={{ fontSize: 11, color: C.muted, fontFamily: "monospace" }}>+weight/reps every 2 wks</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSession && <SessionDetail session={selectedSession} onClose={() => setSelectedSession(null)} />}
      {selectedRun && <RunDetail session={selectedRun} onClose={() => setSelectedRun(null)} />}
    </div>
  );
}
