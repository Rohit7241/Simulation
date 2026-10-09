import { useEffect, useState, useCallback } from "react";
import unstopLogo from "./unstop";

/* ---------- QUESTIONS (from your reference PDF) ---------- */
const E = "Electrical Engineering", S = "Subject Matter", M = "MAT";
const QUESTIONS = [
  { s: E, q: "Power diode is", o: ["a three terminal semiconductor device", "a two terminal semiconductor device", "a four terminal semiconductor device", "a three terminal analog device"] },
  { s: E, q: "What is the relationship between torque and speed in constant type loads?", o: ["Torque linearly increases with increase in speed", "Torque is independent of speed", "Torque non-linearly increases with an increase in speed", "Torque non-linearly decreases with an increase in speed"] },
  { s: E, q: "AC drives can be used to control: a) Induction motor b) Synchronous motor", o: ["Only a", "Only b", "Both a & b", "Neither a nor b"] },
  { s: E, q: "Which of the following statements is not true about Renewable Energy?", o: ["They do not cause pollution", "Their transportation is difficult", "They cause ecological imbalance", "All of the above"] },
  { s: E, q: "Which of the statements is correct about Solar Energy?", o: ["It is a renewable and conventional source of energy", "It is a non-renewable and non-conventional source of energy", "It is a renewable and non-conventional source of energy", "It is a non-renewable source of energy"] },
  { s: E, q: "The three terminals of the IGBT are", o: ["base, emitter & collector", "gate, source & drain", "gate, emitter & collector", "base, source & drain"] },
  { s: E, q: "Which of the following is NOT used for making variable frequency drives?", o: ["Phase controller", "Pulse-width modulation", "Current source inverter", "Voltage source inverter"] },
  { s: E, q: "What type of load is a variable frequency drive typically used for?", o: ["Resistive loads", "Inductive loads", "Capacitive loads", "All of the above"] },
  { s: E, q: "Which method can be used to measure power in three phase unbalanced load system?", o: ["One wattmeter method", "Two wattmeter method", "Three voltmeter method", "Three ammeter method"] },
  { s: E, q: "What is the primary function of a variable frequency drive (VFD)?", o: ["To control the speed of an electric motor", "To convert AC power to DC power", "To protect electrical equipment from power surges", "All of the above"] },
  { s: E, q: "Which of the following determines light intensity in a CRT?", o: ["current", "fluorescent screen", "voltage", "momentum of electrons"] },
  { s: E, q: "A lightning stroke discharges impulse current of 10kA (peak) on 400kV line having surge impedance of 250 ohms. Magnitude of transient overvoltage wave in either direction, assuming equal distribution from point of strike, is", o: ["2500kV", "1250kV", "1650kV", "2900kV"] },
  { s: E, q: "A 200 MW capacity generator has a speed regulation of 4% for a frequency drop of 0.05 Hz. Find the power input supplied by the turbine for maintaining constant frequency.", o: ["10MW", "5MW", "15MW", "20MW"] },
  { s: E, q: "A thermal generating station has an installed capacity of 15 MW and supplies a daily load of 10 MW for 12 hours and 5 MW for remaining 12 hours. The plant capacity factor for the station is", o: ["1", "0.25", "0.75", "0.5"] },
  { s: S, q: "What is the main advantage of using an ensemble learning method like Random Forest over a single decision tree?", o: ["Simplicity of implementation", "Reduced risk of overfitting", "Faster training time", "Better handling of missing data"] },
  { s: S, q: "The specific speed of a hydraulic turbine depends upon", o: ["Discharge and power developed", "Speed and head of water", "Speed, power developed and head of water", "Speed and power developed"] },
  { s: S, q: "What device is installed to protect a vessel from excessive pressure and catastrophic rupture?", o: ["Pressure Gauge", "Pressure Safety Valve", "Flange guards", "Insulation"] },
  { s: M, q: "A school bus travels from Veldhoven to Roosendaal. There are 4 children in the bus. And each child has 4 backpacks with him. There are 4 dogs sitting in each backpack. And every dog has 4 puppies with her. All these dogs have 4 legs, with 4 toes at each leg. What is the total number of toes in the bus?", o: ["4960", "5120", "5170", "5270"] },
  { s: M, q: "In a class, there are 18 boys who are over 160 cm tall. If these constitute three-fourths of the boys and the total number of boys is two-thirds of the total number of students in the class, what is the number of girls in the class?", o: ["6", "12", "18", "24"] },
  { s: M, q: "Calvin borrowed $8,600 at a rate of 8% per annum on simple interest to buy a house. If the tenure is 6 years, what is the total amount he has to pay?", o: ["$12,827", "$17,282", "$12,728", "$18,272"] },
  { s: M, q: "A shopkeeper sells one transistor for Rs. 840 at a gain of 20% and another for Rs. 960 at a loss of 4%. His total gain or loss percent is", o: ["5 15/17 % loss", "5 15/17 % gain", "6 2/3 % gain", "None of these"] },
  { s: M, q: "Observe the pattern in the given figures and find the missing numeral in the second figure. Figure 1: 7, 6 → 127. Figure 2: 11, 9 → ?. Figure 3: 8, 5 → 387.", o: ["547", "694", "602", "586"] },
  { s: M, q: "Choose the alternative that will replace the question mark (?) in the circle: 150, 302, ?, 17, 36, 74", o: ["627", "606", "522", "1247"] },
  { s: M, q: "Choose the alternative that will replace the question mark (?) in the circle: ?, 4, 9, 19, 39, 79", o: ["246", "159", "320", "129"] },
  { s: M, q: "Assuming the given statement is correct, which of the given conclusions logically follows?\nStatement: George has three sisters and one brother.\nI. There are five children in the family.\nII. The number of sisters is greater than the number of brothers in the family.", o: ["Only conclusion I follows the statement.", "Only conclusion II follows the statement.", "Neither I nor II follows the statement.", "Both I and II follow the statement."] },
  { s: M, q: "Two bus tickets from city A to B and three tickets from city A to C cost Rs. 77, but three tickets from city A to B and two tickets from city A to C cost Rs. 73. What are the fares for cities B and C from A?", o: ["Rs. 4, Rs. 23", "Rs. 13, Rs. 17", "Rs. 15, Rs. 14", "Rs. 17, Rs. 13"] },
  { s: M, q: "It is 17:00 when Bronson leaves work. If the minute hand moves clockwise by 60 degrees by the time he reaches home, what time does Bronson reach home?", o: ["17:10", "17:20", "17:30", "17:40"] },
  { s: M, q: "Which number from the given series is the odd one out?\n78, 91, 101, 120", o: ["78", "91", "101", "120"] },
  { s: M, q: "What is the smallest positive number in the series 81, 72, 63, ...?", o: ["0", "9", "10", "18"] },
  { s: M, q: "If 50 workers can build 50 walls in 25 days, how many days will it take for 25 workers to build 25 walls?", o: ["12.5 days", "50 days", "25 days", "10 days"] },
  { s: M, q: "Find out the wrong number in the series: 10, 26, 74, 218, 654, 1946, 5834", o: ["26", "74", "218", "654", "1946"] },
  { s: M, q: "Find out the wrong number in the series: 15, 16, 34, 105, 424, 2124, 12576", o: ["16", "34", "105", "424", "2124"] },
  { s: M, q: "There are five competitors for three seats in a car: Liam, Noah, William, Dale, and Mason. Liam and Noah must be together and William and Dale cannot be together in the car. How many different combinations of three people could go in the car?", o: ["2", "3", "4", "5"] },
  { s: M, q: "Fill in the blank: In view of the fact that there are mitigating circumstances, we must consider this a ________ offence.", o: ["heinous", "venal", "criminal", "propitious", "venial"] },
  { s: M, q: "Fill in the blank: In a film, the heroine turns down a prestigious scholarship so that the young hero may receive it; once more, the woman ________ her own ________ to those of the man.", o: ["prefers, ambitions", "sacrifices, losses", "surrenders, talents", "accommodates, beliefs", "subordinates, interests"] },
  { s: M, q: "Choose the meaning of the idiom/phrase: He was undecided. He let the grass grow under his feet.", o: ["loitered around", "stayed out", "sat unmoving", "moved away"] },
  { s: M, q: "Choose the meaning of the idiom/phrase: I met him after a long time, but he gave me the cold shoulder.", o: ["scolded me", "insulted me", "abused me", "ignored me"] },
  { s: M, q: "Choose the meaning of the idiom/phrase: Although he has failed in the written examination, he is using backstairs influence to get the job.", o: ["Political influence", "Backing influence", "Deserving and proper influence", "Secret and unfair influence"] },
  { s: M, q: "Choose the meaning of the idiom/phrase: The accounts of the murder made her flesh creep.", o: ["Made her sad", "Surprised her", "Made her cry bitterly", "Fill her with horror"] },
];

const N = QUESTIONS.length;
const SECONDS = 60;
const TEAM_ID = "1145356-U314WV2H";

/* ---------- STYLES ---------- */
const css = `
*{box-sizing:border-box}
html,body,#root{height:100%;margin:0}
body{font-family:'Poppins',system-ui,sans-serif;color:#374151;background:#fff}
:fullscreen{background:#fff}

.page{height:100vh;width:100vw;display:flex;justify-content:center;background:#eef2f7;overflow:hidden}
.shell{width:100vw;height:100vh;display:flex;flex-direction:column;background:#fff}.top{background:#fff;flex-shrink:0}
.row1{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:10px 24px}
.nav{display:flex;align-items:center;justify-content:center;gap:28px;padding:0 48px}
.sel{border:none;background:transparent;font:500 13px Poppins,sans-serif;color:#4b5563;cursor:pointer}
.pal{display:flex;align-items:center;gap:8px}
.arr{border:none;background:none;font-size:18px;color:#6b7280;cursor:pointer;padding:0 4px}
.n{min-width:30px;height:30px;border-radius:6px;border:none;background:transparent;font:500 13px Poppins,sans-serif;color:#6b7280;cursor:pointer}
.n.done{background:#d1fae5;color:#065f46}
.n.cur{background:#111827;color:#fff}
.band{background:#e3f0fd;border-top:1px solid #cfe3f7;border-bottom:1px solid #cfe3f7;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:2px 24px;min-height:0}
.mail{font-size:11px;line-height:1.2;color:#6b7280}
.tleft{display:flex;align-items:center;justify-content:center;gap:6px;font-size:13px;font-weight:500;color:#1c6fd6}
.tleft.low{color:#dc2626}

.body{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr}.qpane{position:relative;overflow:hidden;background:#f1f3f5}
.qin{position:relative;z-index:2;height:100%;overflow:auto;padding:20px 32px}
.qhead{display:flex;align-items:center;justify-content:space-between;margin:18px 0 14px}
.qno{font-size:17px;font-weight:600;color:#1f2937}
.marks{font-weight:600;font-size:14px;color:#1f2937}
.qtxt{font-size:14.5px;line-height:1.7;white-space:pre-line;max-width:70ch}
.ans{background:#fff;overflow:auto;padding:20px 32px;border-left:1px solid #e5e7eb}
.ans h4{margin:18px 0 14px;font-size:14px;font-weight:600;color:#374151}
.opt{display:flex;align-items:center;gap:14px;padding:12px 16px;margin-bottom:12px;font-size:14px;cursor:pointer;border:1px solid #d1d5db;border-radius:8px;background:#fff}
.opt:hover{border-color:#111827}
.opt input{width:16px;height:16px;accent-color:#111827;flex-shrink:0}
.sel-opt{border-color:#111827;background:#f3f4f6}

.bar{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:12px 24px;border-top:1px solid #e5e7eb;flex-shrink:0;background:#fff}
.barr{display:flex;align-items:center;justify-content:flex-end;gap:22px}
.team{font-size:13px;color:#4b5563}
.btn{background:#111827;color:#fff;border:none;border-radius:20px;padding:8px 26px;font:500 13px Poppins,sans-serif;cursor:pointer}
.btn.red{background:#dc2626;justify-self:start}
.btn.sub{background:#9ca3af}
.link{background:none;border:none;font:500 13px Poppins,sans-serif;color:#374151;cursor:pointer;padding:0}
.link:disabled{opacity:.4;cursor:not-allowed}
.btn:disabled{opacity:.4;cursor:not-allowed}

/* Watermark: tilted, only over the question pane */
.wmwrap{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:3}
.wm{position:absolute;top:50%;left:50%;width:150vmax;height:150vmax;transform:translate(-50%,-50%) rotate(-18deg);
  display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));grid-auto-rows:70px;user-select:none}
.wm div{display:flex;align-items:center;justify-content:center;text-align:center;font-size:12.5px;line-height:1.35;color:rgba(55,65,81,.2)}

/* Start / ended screens fill the whole viewport */
.center{min-height:100vh;width:100vw;display:flex;align-items:center;justify-content:center;background:#f6f9fd}
.card{width:420px;max-width:92vw;padding:32px;border:1px solid #e5e7eb;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,.06);background:#fff}
.card h1{margin:12px 0 4px;font-size:20px;color:#1f2937}
.card p{margin:0 0 18px;color:#6b7280;font-size:13px}
.card label{display:block;font-size:12px;font-weight:600;margin:12px 0 4px}
.card input{width:100%;padding:10px 12px;border:1px solid #d1d5db;border-radius:8px;font-size:14px}
.card .btn{width:100%;margin-top:22px;padding:11px}
.ph{display:flex;gap:8px}
.ph span{padding:10px 12px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;background:#f9fafb}
.err{color:#dc2626;font-size:12px;margin-top:8px}

@media(max-width:800px){
  .shell{width:100vw}
  .body{grid-template-columns:1fr;overflow:auto}
  .qpane{min-height:240px}
  .row1{grid-template-columns:1fr;gap:8px}
  .nav{flex-wrap:wrap;gap:8px;padding:0}
  .band{grid-template-columns:1fr;gap:4px;justify-items:center}
}
`;

const Logo = () => (
  <img src={unstopLogo} alt="unstop" style={{ height: 36, display: "block" }} />
);
const SECS = [...new Set(QUESTIONS.map((x) => x.s))];

/* ---------- WATERMARK (email, phone below it) ---------- */
function Watermark({ user }) {
  return (
    <div className="wmwrap" aria-hidden="true">
      <div className="wm">
        {Array.from({ length: 700 }, (_, i) => (
          <div key={i}>
            <span>
              {user.email}
              <br />+91{user.phone}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- APP ---------- */
export default function App() {
  const [stage, setStage] = useState("start"); // start | test | ended
  const [user, setUser] = useState({ phone: "", email: "" });
  const [error, setError] = useState("");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [left, setLeft] = useState(SECONDS);
  const [round, setRound] = useState(1);

  const endTest = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    setStage("ended");
  }, []);

  const next = useCallback(() => {
    setIdx((i) => {
      if (i === N - 1) {
        setRound((r) => r + 1);
        setAnswers({});
        return 0;
      } // loop
      return i + 1;
    });
  }, []);
  const prev = () => setIdx((i) => Math.max(0, i - 1));

  const start = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(user.phone)) return setError("Enter a 10-digit phone number.");
    if (!/^\S+@\S+\.\S+$/.test(user.email)) return setError("Enter a valid email.");
    setError("");
    try {
      await document.documentElement.requestFullscreen();
    } catch {} // needs a click
    setIdx(0);
    setRound(1);
    setAnswers({});
    setStage("test");
  };

  useEffect(() => {
    if (stage !== "test") return;
    setLeft(SECONDS);
    const id = setInterval(() => setLeft((l) => l - 1), 1000);
    return () => clearInterval(id);
  }, [stage, idx, round]);

  useEffect(() => {
    if (stage === "test" && left <= 0) next();
  }, [left, stage, next]);

  useEffect(() => {
    if (stage !== "test") return;
    const onKey = (e) => e.key === "Escape" && endTest();
    const onFs = () => !document.fullscreenElement && setStage("ended");
    window.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFs);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFs);
    };
  }, [stage, endTest]);

  const q = QUESTIONS[idx];
  const winStart = Math.min(idx, Math.max(N - 5, 0));
  const win = Array.from({ length: Math.min(5, N) }, (_, i) => winStart + i);

  return (
    <>
      <style>{css}</style>

      {stage === "start" && (
        <div className="center">
          <form className="card" onSubmit={start}>
            <Logo />
            <h1>Practice test</h1>
            <p>Enter your details. The test opens in full screen. Press Esc to exit.</p>
            <label>Email</label>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="you@example.com"
            />
            <label>Phone number</label>
            <div className="ph">
              <span>+91</span>
              <input
                inputMode="numeric"
                maxLength={10}
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value.replace(/\D/g, "") })}
                placeholder="10-digit number"
              />
            </div>
            {error && <div className="err">{error}</div>}
            <button className="btn" type="submit">Start test</button>
          </form>
        </div>
      )}

      {stage === "ended" && (
        <div className="center">
          <div className="card">
            <Logo />
            <h1>Test ended</h1>
            <p>
              You completed {round - 1} full round(s) and stopped on question {idx + 1} of {N}.
            </p>
            <button className="btn" onClick={() => setStage("start")}>Back to start</button>
          </div>
        </div>
      )}

      {stage === "test" && (
        <div className="page">
          <div className="shell">
          <div className="top">
            <div className="row1">
              <Logo />
              <div className="nav">
                <select
                  className="sel"
                  value={q.s}
                  onChange={(e) => setIdx(QUESTIONS.findIndex((x) => x.s === e.target.value))}
                >
                  {SECS.map((s) => <option key={s}>{s}</option>)}
                </select>
                <div className="pal">
                  <button className="arr" onClick={prev} aria-label="Previous">‹</button>
                  {win.map((i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className={`n ${i === idx ? "cur" : answers[i] !== undefined ? "done" : ""}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button className="arr" onClick={next} aria-label="Next">›</button>
                  <button className="n" onClick={() => setIdx(N - 1)}>{N}</button>
                </div>
              </div>
              <div />
            </div>
            <div className="band">
              <span className="mail">
                {user.email}
                <br />+91{user.phone}
              </span>
              <span className={`tleft ${left <= 10 ? "low" : ""}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                Question Time Left {Math.max(left, 0)} sec
              </span>
              <div />
            </div>
          </div>

          <div className="body">
              <div className="qpane">
                <Watermark user={user} />
                <div className="qin">
                  <div className="qhead">
                    <span className="qno">Question {idx + 1}.</span>
                    <span className="marks">Marks : 1.00</span>
                  </div>
                  <div className="qtxt">{q.q}</div>
                </div>
              </div>
              <div className="ans">
                <h4>Answer</h4>
                {q.o.map((opt, i) => (
                  <label key={i} className={`opt ${answers[idx] === i ? "sel-opt" : ""}`}>
                    <input
                      type="radio"
                      name={`q${idx}`}
                      checked={answers[idx] === i}
                      onChange={() => setAnswers({ ...answers, [idx]: i })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="bar">
              <button className="btn red" onClick={endTest}>Finish</button>
              <span className="team">Team ID: {TEAM_ID}</span>
              <div className="barr">
                <button className="link" onClick={prev} disabled={idx === 0}>‹ Previous</button>
                <button className="link" onClick={next}>Skip ›</button>
                <button className="btn sub" onClick={endTest}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}